<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Symfony\Component\DomCrawler\Crawler;
use Carbon\Carbon;

use App\Http\Controllers\Controller;

class PSEController extends Controller {
    /**
     * Declare init function.
     */
    public function init(Request $request) {
        /** check if request contains method equal to post. */
        if ($request->method() === 'POST') {
            /** forward prices function */
            if ($request->input('section') === 'prices') {
                return $this->stockprices($request->input('input'));
            }

            /** forward reports function */
            if ($request->input('section') === 'reports') {
                return $this->stockreports($request->input('input'));
            }

            /** forward dividends function */
            if ($request->input('section') === 'dividends') {
                return $this->stockdividends($request->input('input'));
            }

            /** forward sectors function */
            if ($request->input('section') === 'sectors') {
                return $this->stocksectors($request->input('input'));
            }

            /** forward sectors function */
            if ($request->input('section') === 'companies') {
                return $this->stockcompanies($request->all());
            }

            /** forward sectors function */
            if ($request->input('section') === 'average') {
                return $this->stockchart($request->all());
            }
        }
        /** check if request contains method equal to post. */
        if ($request->method() === 'GET') {
            /** forward trades function */
            if ($request->input('section') === 'stocks') {
                return $this->stocktrades();
            }

            /** forward lists function */
            if ($request->input('section') === 'lists') {
                return $this->stocklists();
            }
        }
    }

    /**
     * Declare stocklists function.
     */
    public function stocklists() {
        /** repository. */
        $result = [];

        /** create request. */
        $pages = Http::get('https://edge.pse.com.ph/cm/companySearch.ax?pNum=1')->body();

        /** make it crawlable. */
        $crawlerpages = new Crawler($pages);

        /** filter response. */
        $page = $crawlerpages->filter('span')->each(function ($node) {
            return $node->text();
        });

        if (!is_null($page)) {
            /** remove unwanted characters. */
            $replace = preg_replace("/[^\/\[\]0-9]/", "", $page[0]);

            /** explode in order to convert string to array. */
            $pieces = explode("/", $replace);

            /** explode again to get the desired array. */
            $expode = explode("][", $pieces[1]);

            /** save the pages count. */
            $result['count'] = $expode[0];
        }

        if (!is_null($result['count'])) {
            /** loop through the pages. */
            for ($i = 1; $i < $result['count']; $i++) {
                /** create request. */
                $lists = Http::get('https://edge.pse.com.ph/cm/companySearch.ax?pNum=' . $i)->body();

                /** make it crawlable. */
                $crawlerlists = new Crawler($lists);

                /** filter response. */
                $list = $crawlerlists->filter('tr > td')->each(function ($node) {
                    return $node->text();
                });

                /** check if list is not null. */
                if (!is_null($list)) {
                    /** chunk arrary into three equal parts. */
                    $group = array_chunk($list, 3);

                    /** loop group. */
                    foreach ($group as $key => $value) {
                        /** pointer. */
                        $stock = [];

                        /** loop value. */
                        foreach ($value as $k => $v) {
                            /** set key name. */
                            if ($k === 0) {
                                $stock['name'] = $v;
                            }

                            /** set key symbol. */
                            if ($k === 1) {
                                $stock['symbol'] = $v;
                            }

                            /** set key sector. */
                            if ($k === 2) {
                                $stock['sector'] = strtolower($this->helpers(['sanitized' => 'alpha', 'string' => $v]));
                            }
                        }
                        /** save to pointer. */
                        $result['stocks'][$i][$key] = $stock;
                    }
                }
            }
        }

        if (!is_null($result['stocks'])) {
            /** loop after chunking. */
            foreach ($result['stocks'] as $items) {
                /** loop again. */
                foreach ($items as $key => $value) {
                    /** query database to see if record exist. */
                    $check = DB::table('stock_trades')
                        ->select('symbol')
                        ->where('symbol', $value['symbol'])
                        ->first();

                    /** if not then insert else update. */
                    if (is_null($check)) {
                        DB::table('stock_trades')
                            ->where('symbol', $value['symbol'])
                            ->insert([
                                'name' => strip_tags($value['name']),
                                'symbol' => strip_tags($value['symbol']),
                                'sector' => strip_tags($value['sector']),
                                'created_at' => date('Y-m-d H:i:s'),
                                'updated_at' => date('Y-m-d H:i:s'),
                            ]);
                    } else {
                        DB::table('stock_trades')
                            ->where('symbol', $value['symbol'])
                            ->update([
                                'name' => strip_tags($value['name']),
                                'symbol' => strip_tags($value['symbol']),
                                'sector' => strip_tags($value['sector']),
                                'updated_at' => date('Y-m-d H:i:s'),
                            ]);
                    }
                }
            }
        }

        /** return something. */
        return response(['message' => 'All possible stocks were successfully added to the database.'], 200);
    }

    /**
     * Declare stocks function.
     */
    public function stockprices($data) {
        /** repository. */
        $result = [];

        /** create request. */
        $stockprices = Http::get('https://edge.pse.com.ph/companyPage/stockData.do?cmpy_id=' . $data['edge'])->body();

        /** make it crawlable. */
        $crawler_prices = new Crawler($stockprices);

        /** filter response. */
        $stockprice = $crawler_prices->filter('tr > td')->each(function ($node) {
            return $node->text();
        });

        if (count($stockprice) != 0) {
            /** variable pointer. */
            $amount = [];

            /** mapping value. */
            $stockdata['value'] = $stockprice['18'];

            /** save to database.. */
            if (array_key_exists("value", $stockdata)) {
                /** replace comma with nothing. */
                $price['value'] = $this->helpers(['sanitized' => 'decimal', 'string' => $stockdata['value']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $price['value'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $price['value']);
                    /** then turn negative using abs function. */
                    $amount['value'] = -abs($negative);
                } else {
                    $amount['value'] = $price['value'];
                }

                /** match string if has no value. */
                if ($price['value'] == '') {
                    $amount['value'] = 0.00;
                }

                /** convert into float value. */
                $result['value'] = floatval($amount['value']);
            }

            /** mapping year high price. */
            $stockdata['52WeekHigh'] = $stockprice['24'];

            /** save to database.. */
            if (array_key_exists("52WeekHigh", $stockdata)) {
                /** replace comma with nothing. */
                $price['high'] = $this->helpers(['sanitized' => 'decimal', 'string' => $stockdata['52WeekHigh']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $price['high'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $price['high']);
                    /** then turn negative using abs function. */
                    $price['high'] = -abs($negative);
                } else {
                    $amount['high'] = $price['high'];
                }

                /** match string if has no value. */
                if ($price['high'] == '') {
                    $amount['high'] = 0.00;
                }
            }

            /** mapping year low price. */
            $stockdata['52WeekLow'] = $stockprice['25'];

            /** save to database.. */
            if (array_key_exists("52WeekLow", $stockdata)) {
                /** replace comma with nothing. */
                $price['low'] = $this->helpers(['sanitized' => 'decimal', 'string' => $stockdata['52WeekLow']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $price['low'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $price['low']);
                    /** then turn negative using abs function. */
                    $amount['low'] = -abs($negative);
                } else {
                    $amount['low'] = $price['low'];
                }

                /** match string if has no value. */
                if ($price['low'] == '') {
                    $amount['low'] = 0.00;
                }
            }

            /** Compute year pice range. */
            if ($amount['high'] > 0 && $amount['low'] > 0) {
                $result['pricerange'] = $this->helpers(['sanitized' => 'subtract', 'one' => $amount['low'], 'two' => $amount['high']]);
            } else {
                $result['pricerange'] = floatval('0.00');
            }

            /** save to database.. */
            DB::table('stock_trades')
                ->where('edge', '=', $data['edge'])
                ->update([
                    'value' => strip_tags($result['value']),
                    'pricerange' => strip_tags($result['pricerange']),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);
        }

        /** fetch stock name. */
        $reports = DB::table('stock_trades')
            ->select('name')
            ->where('edge', '=', $data['edge'])
            ->first();

        /** return something. */
        return response(['message' => 'The ' . $reports->name . ' information was successfully updated.'], 200);
    }

    /**
     * Declare financials function.
     */
    public function stockreports($data) {
        /** repository. */
        $result = [];

        /** create request. */
        $financial = Http::get('https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=' . $data['edge'])->body();

        /** make it crawlable. */
        $crawler_financial = new Crawler($financial);

        /** filter response. */
        $finance = $crawler_financial->filter('tr > td')->each(function ($node) {
            return $node->text();
        });

        /** fetch additional column. */
        $stock = DB::table('stock_trades')->select('price')->where('edge', $data['edge'])->first();

        if (count($finance) != 0) {
            /** variable pointer. */
            $amount = [];

            /** mapping net after tax . */
            $statement['currentTotalAssets'] = $finance['2'];
            $statement['previousTotalAssets'] = $finance['3'];

            /** check if key exist in array. */
            if (array_key_exists("currentTotalAssets", $statement)) {
                $current['currentTotalAssets'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['currentTotalAssets']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $current['currentTotalAssets'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $current['currentTotalAssets']);
                    /** then turn negative using abs function. */
                    $amount['assets']['current'] = -abs($negative);
                } else {
                    $amount['assets']['current'] = $current['currentTotalAssets'];
                }

                /** match string if has no value. */
                if ($current['currentTotalAssets'] == '') {
                    $amount['assets']['current'] = 0.00;
                }
            }

            /** check if key exist in array. */
            if (array_key_exists("previousTotalAssets", $statement)) {
                $previous['previousTotalAssets'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['previousTotalAssets']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $previous['previousTotalAssets'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $previous['previousTotalAssets']);
                    /** then turn negative using abs function. */
                    $amount['assets']['previous'] = -abs($negative);
                } else {
                    $amount['assets']['previous'] = $previous['previousTotalAssets'];
                }

                /** match string if has no value. */
                if ($previous['previousTotalAssets'] == '') {
                    $amount['assets']['previous'] = 0.00;
                }
            }

            /** determine if profitable against previous year. */
            $result['totalassets'] = $this->helpers(['sanitized' => 'subtract', 'one' => $amount['assets']['current'], 'two' => $amount['assets']['previous']]);

            /** mapping net after tax . */
            $statement['currentYearNetIncomeLossAfterTax'] = $finance['22'];
            $statement['previousYearNetIncomeLossAfterTax'] = $finance['23'];

            /** check if key exist in array. */
            if (array_key_exists("currentYearNetIncomeLossAfterTax", $statement)) {
                $current['currentYearNetIncomeLossAfterTax'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['currentYearNetIncomeLossAfterTax']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $current['currentYearNetIncomeLossAfterTax'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $current['currentYearNetIncomeLossAfterTax']);
                    /** then turn negative using abs function. */
                    $amount['income']['current'] = -abs($negative);
                } else {
                    $amount['income']['current'] = $current['currentYearNetIncomeLossAfterTax'];
                }

                /** match string if has no value. */
                if ($current['currentYearNetIncomeLossAfterTax'] == '') {
                    $amount['income']['current'] = 0.00;
                }
            }

            /** check if key exist in array. */
            if (array_key_exists("previousYearNetIncomeLossAfterTax", $statement)) {
                $previous['previousYearNetIncomeLossAfterTax'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['previousYearNetIncomeLossAfterTax']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $previous['previousYearNetIncomeLossAfterTax'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $previous['previousYearNetIncomeLossAfterTax']);
                    /** then turn negative using abs function. */
                    $amount['income']['previous'] = -abs($negative);
                } else {
                    $amount['income']['previous'] = $previous['previousYearNetIncomeLossAfterTax'];
                }

                /** match string if has no value. */
                if ($previous['previousYearNetIncomeLossAfterTax'] == '') {
                    $amount['income']['previous'] = 0.00;
                }
            }

            /** determine if profitable against previous year. */
            $result['netincomeaftertax'] = $this->helpers(['sanitized' => 'subtract', 'one' => $amount['income']['current'], 'two' => $amount['income']['previous']]);

            /** mapping total liabilities. */
            $statement['currentTotalLiabilities'] = $finance['6'];

            /** check if key exist in array. */
            if (array_key_exists("currentTotalLiabilities", $statement)) {
                /** call helper function. */
                $liabilities['currentTotalLiabilities'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['currentTotalLiabilities']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $liabilities['currentTotalLiabilities'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $liabilities['currentTotalLiabilities']);

                    /** then turn negative using abs function. */
                    $amount['totalliabilities'] = -abs($negative);
                } else {
                    /** directly add to array if positive value. */
                    $amount['totalliabilities'] = $liabilities['currentTotalLiabilities'];
                }
                /** match string if has no value. */
                if ($liabilities['currentTotalLiabilities'] == '') {
                    $amount['totalliabilities'] = 0.00;
                }
            }

            /** evalaute value is greater than zero. */
            if ($amount['totalliabilities'] > 0 && $amount['assets']['current'] > 0) {
                $result['debtassetratio'] = floatval(bcdiv(abs($amount['totalliabilities']), abs($amount['assets']['current']), 2));
            } else {
                $result['debtassetratio'] = floatval('0.00');
            }

            /** mapping earning per share . */
            $statement['currentYearEarningsLossPerShareBasic'] = $finance['26'];
            $statement['previousYearEarningsLossPerShareBasic'] = $finance['27'];

            /** check if key exist in array. */
            if (array_key_exists("currentYearEarningsLossPerShareBasic", $statement)) {
                $share['currentYearEarningsLossPerShareBasic'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['currentYearEarningsLossPerShareBasic']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $share['currentYearEarningsLossPerShareBasic'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $share['currentYearEarningsLossPerShareBasic']);
                    /** then turn negative using abs function. */
                    $amount['earning']['current'] = -abs($negative);
                } else {
                    $amount['earning']['current'] = $share['currentYearEarningsLossPerShareBasic'];
                }
                /** match string if has no value. */
                if ($share['currentYearEarningsLossPerShareBasic'] == '') {
                    $amount['earning']['current'] = 0.00;
                }
            }

            /** calculate price earning ratio. */
            if ($stock->price > 0 && $amount['earning']['current'] > 0) {
                $result['priceearningratio'] = floatval(bcdiv(abs($stock->price), abs($amount['earning']['current']), 2));
            } else {
                $result['priceearningratio'] = floatval('0.00');
            }

            /** mapping stock holder equity. */
            $statement['CurrentIncomeLossAfterTax'] = $finance['22'];

            /** check if key exist in array. */
            if (array_key_exists("CurrentIncomeLossAfterTax", $statement)) {
                /** call helper function. */
                $income['CurrentIncomeLossAfterTax'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['CurrentIncomeLossAfterTax']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $income['CurrentIncomeLossAfterTax'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $income['CurrentIncomeLossAfterTax']);

                    /** then turn negative using abs function. */
                    $amount['incomeaftertax'] = -abs($negative);
                } else {
                    $amount['incomeaftertax'] = $income['CurrentIncomeLossAfterTax'];
                }

                /** match string if has no value. */
                if ($income['CurrentIncomeLossAfterTax'] == '') {
                    $amount['incomeaftertax'] = 0.00;
                }
            }

            /** mapping stock holder equity. */
            $statement['CurrentGrossRevenue'] = $finance['16'];

            /** check if key exist in array. */
            if (array_key_exists("CurrentGrossRevenue", $statement)) {
                /** call helper function. */
                $revenue['CurrentGrossRevenue'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['CurrentGrossRevenue']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $revenue['CurrentGrossRevenue'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $revenue['CurrentGrossRevenue']);

                    /** then turn negative using abs function. */
                    $amount['grossrevenue'] = -abs($negative);
                } else {
                    $amount['grossrevenue'] = $revenue['CurrentGrossRevenue'];
                }

                /** match string if has no value. */
                if ($revenue['CurrentGrossRevenue'] == '') {
                    $amount['grossrevenue'] = 0.00;
                }
            }

            /** mapping stock holder equity. */
            $statement['CurrentStockholdersEquity'] = $finance['10'];

            /** check if key exist in array. */
            if (array_key_exists("CurrentStockholdersEquity", $statement)) {
                /** call helper function. */
                $equity['CurrentStockholdersEquity'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['CurrentStockholdersEquity']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $equity['CurrentStockholdersEquity'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $equity['CurrentStockholdersEquity']);

                    /** then turn negative using abs function. */
                    $amount['stockholderequity'] = -abs($negative);
                } else {
                    /** directly add to array if positive value. */
                    $amount['stockholderequity'] = $equity['CurrentStockholdersEquity'];
                }

                /** match string if has no value. */
                if ($equity['CurrentStockholdersEquity'] == '') {
                    $amount['stockholderequity'] = 0.00;
                }
            }

            /** Calculate net profit margin. */
            if ($amount['incomeaftertax'] > 0 && $amount['grossrevenue'] > 0) {
                $result['netprofitmargin'] = floatval(bcmul(bcdiv(abs($amount['incomeaftertax']), abs($amount['grossrevenue']), 2), 100, 2));
            } else {
                $result['netprofitmargin'] = floatval('0.00');
            }

            /** Calculate return on equity. */
            if ($amount['incomeaftertax'] > 0 && $amount['stockholderequity'] > 0) {
                $result['returnonequity'] = floatval(bcdiv(abs($amount['incomeaftertax']), abs($amount['stockholderequity']), 2));
            } else {
                $result['returnonequity'] = floatval('0.00');
            }

            /** save to database.. */
            DB::table('stock_trades')
                ->where('edge', '=', $data['edge'])
                ->update([
                    'totalassets' => strip_tags($result['totalassets']),
                    'netincomeaftertax' => strip_tags($result['netincomeaftertax']),
                    'debtassetratio' => strip_tags($result['debtassetratio']),
                    'priceearningratio' => strip_tags($result['priceearningratio']),
                    'netprofitmargin' => strip_tags($result['netprofitmargin']),
                    'returnonequity' => strip_tags($result['returnonequity']),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);

            /** search database. */
            $reports = DB::table('stock_trades')
                ->select('name')
                ->where('edge', '=', $data['edge'])
                ->first();

            /** return something. */
            return response(['message' => 'The ' . $reports->name . ' information was successfully updated.'], 200);
        }
    }

    /**
     * Declare stocks function.
     */
    public function stockdividends($data) {
        /** create request. */
        $dividends = Http::get('https://edge.pse.com.ph/companyPage/dividends_and_rights_list.ax?cmpy_id=' . $data['edge'])->body();

        /** make it crawlable. */
        $crawler_dividends = new Crawler($dividends);

        /** filter response. */
        $dividend = $crawler_dividends->filter('tr > td')->each(function ($node) {
            return $node->text();
        });

        /** get stock name. */
        $stock = DB::table('stock_trades')
            ->select('name')
            ->where('edge', '=', $data['edge'])
            ->first();

        if (count($dividend) >= 2) {
            $yield = '';
            if (strtolower($dividend[1]) == 'cash') {
                /** replace all non numeric characters. */
                $rate = number_format($this->helpers(['sanitized' => 'decimal', 'string' => $dividend[2]]), 2, '.', ',');

                /** fetch price. */
                $trade = DB::table('stock_trades')
                    ->where('edge', '=', $data['edge'])
                    ->select('price')
                    ->first();

                /** calculate dividend yield. */
                $yield = bcdiv(abs($rate), abs($trade->price), 4);
            } else {
                /** set dividend yield to zero. */
                $yield = number_format(0.00, 2, '.', ',');
            }

            /** save to database. */
            DB::table('stock_trades')
                ->where('edge', '=', $data['edge'])
                ->update([
                    'dividendyield' => strip_tags($yield),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);
        } else {
            /** return something. */
            return response(['message' => 'The ' . $stock->name . ' has yet to establish a dividend rate.'], 200);
        }

        /** return something. */
        return response(['message' => 'The dividend rate of ' . $stock->name . ' was added.'], 200);
    }

    /**
     * Declare stocks function.
     */
    public function stocksectors($data) {
        /** repository. */
        $result = [];

        /** create request. */
        $stocksectors = Http::get('https://edge.pse.com.ph/companyInformation/form.do?cmpy_id=' . $data['edge'])->body();

        /** make it crawlable. */
        $crawler_sectors = new Crawler($stocksectors);

        /** filter response. */
        $stocksector = $crawler_sectors->filter('tr > td')->each(function ($node) {
            return $node->text();
        });

        if (!is_null($stocksector)) {
            /** mapping year high price. */
            $stockdata['sector'] = $stocksector['1'];

            /** save to database.. */
            if (array_key_exists("sector", $stockdata)) {
                /** replace comma with nothing. */
                $sector['sector'] = $this->helpers(['sanitized' => 'alpha', 'string' => $stockdata['sector']]);

                /** match string if has number and comma and parentheses. */
                if (preg_match('/([a-zA-Z0-9])\w+/', $sector['sector'])) {
                    $result['sector'] = strtolower($sector['sector']);
                }

                /** match string if has no value. */
                if ($sector['sector'] == '') {
                    $result['sector'] = 'unknown';
                }

                /** save to database. */
                DB::table('stock_trades')
                    ->where('edge', '=', $data['edge'])
                    ->update([
                        'sector' => strip_tags($result['sector']),
                        'updated_at' => date('Y-m-d H:i:s'),
                    ]);
            }
        }

        /** fetch stock name. */
        $reports =   DB::table('stock_trades')
            ->select('name')
            ->where('edge', '=', $data['edge'])
            ->first();

        /** return something. */
        return response(['message' => 'The ' . $reports->name . ' information was successfully updated.'], 200);
    }

    /**
     * Declare stock companies function.
     */
    public function stockcompanies($data) {
        /** repository. */
        $result = [];

        /** create request. */
        $company = Http::get('https://edge.pse.com.ph/autoComplete/searchCompanyNameSymbol.ax?term=' . $data['symbol'])->body();

        if (!is_null($company)) {
            /** decode to json. */
            $decoded = json_decode($company, true);

            /** map decoded to desired key value pair. */
            if (count($decoded) >= 0) {
                $result['edge'] = $decoded[0]['cmpyId'];
                $result['name'] = $decoded[0]['cmpyNm'];
                $result['symbol'] = $decoded[0]['symbol'];
            } else {
                /** return something. */
                return response(['message' => 'The ' . $data['symbol'] . ' does not exist.'], 200);
            }

            if (count($result) > 1) {
                /** check if record exists. */
                $check = DB::table('stock_trades')
                    ->select('edge')
                    ->where('symbol', '=', $result['symbol'])
                    ->first();

                if (is_null($check)) {
                    /** insert record. */
                    DB::table('stock_trades')
                        ->where('symbol', '=', $result['symbol'])
                        ->insert([
                            'edge' => strip_tags($result['edge']),
                            'symbol' => strip_tags($result['symbol']),
                            'name' => strip_tags($result['name']),
                            'created_at' => date('Y-m-d H:i:s'),
                            'updated_at' => date('Y-m-d H:i:s'),
                        ]);
                } else {
                    /** update record. */
                    DB::table('stock_trades')
                        ->where('symbol', '=', $result['symbol'])
                        ->update([
                            'edge' => strip_tags($result['edge']),
                            'symbol' => strip_tags($result['symbol']),
                            'name' => strip_tags($result['name']),
                            'updated_at' => date('Y-m-d H:i:s'),
                        ]);
                }
            }
        }

        /** get the response content */
        $security = Http::get('https://edge.pse.com.ph/companyPage/stockData.do?cmpy_id=' . $data['edge']);

        /** make it crawlable. */
        $crawled = new Crawler($security);

        /** filter response. */
        $text = $crawled->filter('script')->each(function ($node) {
            return $node->text();
        });

        if (!is_null($text)) {
            /** explode in order to convert string to array. */
            $send = explode("sendData.", $text[13]);

            /** preg replace to filter non numeric. */
            $replace = preg_replace("/[^0-9]/", "", $send[2]);

            /** check if record exists. */
            $record = DB::table('stock_trades')
                ->select('edge')
                ->where('symbol', '=', $result['symbol'])
                ->first();

            if (!is_null($record)) {
                /** update record. */
                DB::table('stock_trades')
                    ->where('symbol', '=', $result['symbol'])
                    ->update([
                        'security' => strip_tags((int)$replace),
                        'updated_at' => date('Y-m-d H:i:s'),
                    ]);
            }
        }

        /** return something. */
        return response(['message' => 'The ' . $result['symbol'] . ' information was successfully updated.'], 200);
    }

    /**
     * Declare stock edges function.
     */
    public function stockchart($data) {
        /** repository. */
        $result = [];

        /** set payloads. */
        $currentDate = Carbon::now();

        /** send request with payloads. */
        $chart = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post('https://edge.pse.com.ph/common/DisclosureCht.ax', [
            'cmpy_id' => $data['edge'],
            'endDate' => $currentDate->format('m-d-Y'),
            'security_id' => $data['security'],
            'startDate' => $currentDate->subYears(3)->format('m-d-Y')
        ]);

        if (!is_null($chart)) {
            /** make it crawlable. */
            $crawled = new Crawler($chart);

            /** filter response. */
            $text = $crawled->filter('p')->each(function ($node) {
                return $node->text();
            });

            /** decode string. */
            $decoded = json_decode($text[0], true);

            /** save to pointer. */
            $result['chart'] = $decoded['chartData'];
        }

        /** check if result is not empty. */
        if (!is_null($result) && count($result['chart']) > 0) {
            /** count result chart and divide by three. */
            $parts = count($result['chart']) / 3;

            /** chunk arrary into three equal parts. */
            $chunks = array_chunk($result['chart'], $parts);

            /** parse year. */
            $one = Carbon::parse($chunks[2][0]["CHART_DATE"])->format('Y');
            $two = Carbon::parse($chunks[1][0]["CHART_DATE"])->format('Y');
            $three = Carbon::parse($chunks[0][0]["CHART_DATE"])->format('Y');

            /** assign to pointer. */
            $result['averageprice'][$one] = $this->helpers(['sanitized' => 'average', 'stocks' => $chunks[2]]);
            $result['averageprice'][$two] = $this->helpers(['sanitized' => 'average', 'stocks' => $chunks[1]]);
            $result['averageprice'][$three] = $this->helpers(['sanitized' => 'average', 'stocks' => $chunks[0]]);

            /** save to database. */
            $check = DB::table('stock_charts')
                ->select('symbol')
                ->where('userid', Auth::id())
                ->where('symbol', $data['symbol'])
                ->first();

            /** if not then insert else update. */
            if (is_null($check)) {
                DB::table('stock_charts')
                    ->where('userid', Auth::id())
                    ->where('symbol', $data['symbol'])
                    ->insert([
                        'userid' => Auth::id(),
                        'symbol' => strip_tags($data['symbol']),
                        'averageone' => strip_tags($result['averageprice'][$one]),
                        'averagetwo' => strip_tags($result['averageprice'][$two]),
                        'averagethree' => strip_tags($result['averageprice'][$three]),
                        'created_at' => date('Y-m-d H:i:s'),
                        'updated_at' => date('Y-m-d H:i:s'),
                    ]);
            } else {
                DB::table('stock_charts')
                    ->where('userid', Auth::id())
                    ->where('symbol', $data['symbol'])
                    ->update([
                        'averageone' => strip_tags($result['averageprice'][$one]),
                        'averagetwo' => strip_tags($result['averageprice'][$two]),
                        'averagethree' => strip_tags($result['averageprice'][$three]),
                        'updated_at' => date('Y-m-d H:i:s'),
                    ]);
            }
        }

        /** return something. */
        return response(['message' => 'The ' . $data['symbol'] . ' information was successfully updated.'], 200);
    }

    /**
     * Declare stocks function.
     */
    public function stocktrades() {
        /** repository. */
        $stocks = DB::table('stock_trades')
            ->select('edge', 'security', 'symbol')
            ->where('edge', '>', '0')
            ->where('updated_at', '>=', Carbon::now()->subHour(12))
            ->get()
            ->toArray();

        if (count($stocks)) {
            /** resequence array keys. */
            $stocks = array_values($stocks);

            /** return something. */
            return response(['message' => 'Start crawling the PSE website for stock information.', 'stocks' => $stocks], 200);
        } else {
            /** return something. */
            return response(['message' => 'All records are up to date.'], 200);
        }
    }

    /**
     * Helper function.
     */
    public function helpers($data) {
        /** repository */
        $result = '';

        /** if string is decimal */
        if ($data['sanitized'] === 'decimal') {
            /** replace string. */
            $result = preg_replace("/[^0-9.()-]/", "", $data['string']);
            /** convert to float. */
            $result = floatval($result);
        }

        /** if string is alpha */
        if ($data['sanitized'] === 'alpha') {
            $result = preg_replace("/[^a-zA-Z]/", "", $data['string']);
        }

        /** custom substration. */
        if ($data['sanitized'] === 'subtract') {
            /** check if first value is greater than zero and the second is less than zero. */
            if ($data['one'] > 0 && $data['two'] < 0) {
                /** normal operation. */
                $result = $data['one'] - $data['two'];
            }

            /** check if first value is less than zero and the first is greater than zero. */
            if ($data['one'] < 0 && $data['two'] > 0) {
                /** with abs fucntion. */
                $result = $data['one'] - abs($data['two']);
            }

            /** check if two values are less then zero. */
            if ($data['one'] < 0 && $data['two'] < 0) {
                /** normal operation. */
                $result = $data['one'] - $data['two'];
            }

            /** check if two values are greater then zero. */
            if ($data['one'] > 0 && $data['two'] > 0) {
                /** normal operation. */
                $result = $data['one'] - $data['two'];
            }
            /** convert to float. */
            $result = floatval($result);
        }

        /** calculate moving average. */
        if ($data['sanitized'] === 'average') {
            /** resequence key value pairs. */
            $sequence = array_values($data['stocks']);

            /** Convert the array to a collection */
            $collection = collect($sequence);

            /** use the reduce method to calculate the sum of 'value' key */
            $average['close'] = $collection->reduce(function ($carry, $item) {
                return $carry + $item['CLOSE'];
            }, 0);

            /** save to pointer. */
            $result = number_format($average['close'] / count($sequence), 2, '.', '');
        }
        /** return something. */
        return $result;
    }
}
