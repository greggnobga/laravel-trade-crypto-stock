<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Symfony\Component\DomCrawler\Crawler;
use Carbon\Carbon;

use App\Http\Controllers\Controller;

class PSEController extends Controller
{
    /**
     * Declare init function.
     */
    public function init(Request $request)
    {
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
    public function stocklists()
    {
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
    public function stockprices($data)
    {
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

            /** mapping value. */
            $stockdata['price'] = $stockprice['12'];

            /** save to database.. */
            if (array_key_exists("price", $stockdata)) {
                /** variable pointer. */
                $var_price = [];

                /** replace comma with nothing. */
                $data_price['price'] = $this->helpers(['sanitized' => 'decimal', 'string' => $stockdata['price']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $data_price['price'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '(', '-'], '', $data_price['price']);
                    /** then turn negative using abs function. */
                    $var_price['price'] = -abs($negative);
                } else {
                    $var_price['price'] = $data_price['price'];
                }

                /** match string if has no value. */
                if ($data_price['price'] == '') {
                    $var_price['price'] = 0.00;
                }

                /** convert into float value. */
                $result['price'] = floatval($var_price['price']);
            }

            /** mapping value. */
            $stockdata['value'] = $stockprice['18'];

            /** save to database.. */
            if (array_key_exists("value", $stockdata)) {
                /** variable pointer. */
                $var_value = [];

                /** replace comma with nothing. */
                $data_value['value'] = $this->helpers(['sanitized' => 'decimal', 'string' => $stockdata['value']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $data_value['value'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '(', '-'], '', $data_value['value']);
                    /** then turn negative using abs function. */
                    $var_value['value'] = -abs($negative);
                } else {
                    $var_value['value'] = $data_value['value'];
                }

                /** match string if has no value. */
                if ($data_value['value'] == '') {
                    $var_value['value'] = 0.00;
                }

                /** convert into float value. */
                $result['value'] = floatval($var_value['value']);
            }

            /** mapping value. */
            $stockdata['volume'] = $stockprice['21'];

            /** save to database.. */
            if (array_key_exists("volume", $stockdata)) {
                /** variable pointer. */
                $var_volume = [];

                /** replace comma with nothing. */
                $data_volume['volume'] = $this->helpers(['sanitized' => 'decimal', 'string' => $stockdata['volume']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $data_volume['volume'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '(', '-'], '', $data_volume['volume']);
                    /** then turn negative using abs function. */
                    $var_volume['volume'] = -abs($negative);
                } else {
                    $var_volume['volume'] = $data_volume['volume'];
                }

                /** match string if has no value. */
                if ($data_volume['volume'] == '') {
                    $var_volume['volume'] = 0.00;
                }

                /** convert into float value. */
                $result['volume'] = floatval($var_volume['volume']);
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
                    $negative = str_replace([')', '(', '-'], '', $price['high']);
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
                    $negative = str_replace([')', '(', '-'], '', $price['low']);
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
                $result['pricerange'] = $this->helpers(['sanitized' => 'subtract', 'two' => $amount['low'], 'one' => $amount['high']]);
            } else {
                $result['pricerange'] = floatval('0.00');
            }

            /** save to database.. */
            DB::table('stock_trades')
                ->where('edge', '=', $data['edge'])
                ->update([
                    'price' => strip_tags($result['price']),
                    'volume' => strip_tags($result['volume']),
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
    public function stockreports($data)
    {
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
            $statement['currentAssets'] = $finance['31'];
            $statement['currentLiabilities'] = $finance['35'];

            /** check if key exist in array. */
            if (array_key_exists("currentAssets", $statement)) {
                $current['currentAssets'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['currentAssets']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $current['currentAssets'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '(', '-'], '', $current['currentAssets']);
                    /** then turn negative using abs function. */
                    $amount['assets']['current'] = -abs($negative);
                } else {
                    $amount['assets']['current'] = $current['currentAssets'];
                }

                /** match string if has no value. */
                if ($current['currentAssets'] == '') {
                    $amount['assets']['current'] = 0.00;
                }
            }

            /** check if key exist in array. */
            if (array_key_exists("currentLiabilities", $statement)) {
                $previous['currentLiabilities'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['currentLiabilities']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $previous['currentLiabilities'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '(', '-'], '', $previous['currentLiabilities']);
                    /** then turn negative using abs function. */
                    $amount['liabilities']['current'] = -abs($negative);
                } else {
                    $amount['liabilities']['current'] = $previous['currentLiabilities'];
                }

                /** match string if has no value. */
                if ($previous['currentLiabilities'] == '') {
                    $amount['liabilities']['current'] = 0.00;
                }
            }

            /** determine if profitable against previous year. */
            $result['workingcapital'] = $this->helpers(['sanitized' => 'subtract', 'one' => $amount['assets']['current'], 'two' => $amount['liabilities']['current']]);

            /** mapping net after tax . */
            $statement['currentNetIncomeLossYearToDate'] = $finance['58'];
            $statement['previousNetIncomeLossYearToDate'] = $finance['59'];

            /** check if key exist in array. */
            if (array_key_exists("currentNetIncomeLossYearToDate", $statement)) {
                $current['currentNetIncomeLossYearToDate'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['currentNetIncomeLossYearToDate']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $current['currentNetIncomeLossYearToDate'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '(', '-'], '', $current['currentNetIncomeLossYearToDate']);
                    /** then turn negative using abs function. */
                    $amount['income']['current'] = -abs($negative);
                } else {
                    $amount['income']['current'] = $current['currentNetIncomeLossYearToDate'];
                }

                /** match string if has no value. */
                if ($current['currentNetIncomeLossYearToDate'] == '') {
                    $amount['income']['current'] = 0.00;
                }
            }

            /** check if key exist in array. */
            if (array_key_exists("previousNetIncomeLossYearToDate", $statement)) {
                $previous['previousNetIncomeLossYearToDate'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['previousNetIncomeLossYearToDate']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $previous['previousNetIncomeLossYearToDate'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '(', '-'], '', $previous['previousNetIncomeLossYearToDate']);
                    /** then turn negative using abs function. */
                    $amount['income']['previous'] = -abs($negative);
                } else {
                    $amount['income']['previous'] = $previous['previousNetIncomeLossYearToDate'];
                }

                /** match string if has no value. */
                if ($previous['previousNetIncomeLossYearToDate'] == '') {
                    $amount['income']['previous'] = 0.00;
                }
            }

            /** evalaute value is greater than zero. */
            if ($amount['income']['current'] > 0 && $amount['income']['previous'] > 0) {
                /** determine if profitable against previous year. */
                $result['netincomeaftertax'] = $this->helpers(['sanitized' => 'subtract', 'one' => $amount['income']['current'], 'two' => $amount['income']['previous']]);
            } else {
                $result['netincomeaftertax'] = floatval('0.00');
            }

            /** mapping total liabilities. */
            $statement['totalAssets'] = $finance['33'];
            $statement['totalLiabilities'] = $finance['37'];

            /** check if key exist in array. */
            if (array_key_exists("totalAssets", $statement)) {
                /** call helper function. */
                $assets['total'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['totalAssets']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $assets['total'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '(', '-'], '', $assets['total']);

                    /** then turn negative using abs function. */
                    $amount['assets']['total'] = -abs($negative);
                } else {
                    /** directly add to array if positive value. */
                    $amount['assets']['total'] = $assets['total'];
                }
                /** match string if has no value. */
                if ($assets['total'] == '') {
                    $amount['assets']['total'] = 0.00;
                }
            }

            /** check if key exist in array. */
            if (array_key_exists("totalLiabilities", $statement)) {
                /** call helper function. */
                $liabilities['total'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['totalLiabilities']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $liabilities['total'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '(', '-'], '', $liabilities['total']);

                    /** then turn negative using abs function. */
                    $amount['liabilities']['total'] = -abs($negative);
                } else {
                    /** directly add to array if positive value. */
                    $amount['liabilities']['total'] = $liabilities['total'];
                }
                /** match string if has no value. */
                if ($liabilities['total'] == '') {
                    $amount['liabilities']['total'] = 0.00;
                }
            }

            /** evalaute value is greater than zero. */
            if ($amount['liabilities']['total'] > 0 && $amount['assets']['total'] > 0) {
                $result['debtassetratio'] = floatval(bcdiv(abs($amount['liabilities']['total']), abs($amount['assets']['total']), 2));
            } else {
                $result['debtassetratio'] = floatval('0.00');
            }

            /** mapping earning per share . */
            $statement['basic'] = $finance['68'];

            /** check if key exist in array. */
            if (array_key_exists("basic", $statement)) {
                $share['basic'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['basic']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $share['basic'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '(', '-'], '', $share['basic']);
                    /** then turn negative using abs function. */
                    $amount['earning']['current'] = -abs($negative);
                } else {
                    $amount['earning']['current'] = $share['basic'];
                }
                /** match string if has no value. */
                if ($share['basic'] == '') {
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
            $statement['gross'] = $finance['48'];

            /** check if key exist in array. */
            if (array_key_exists("gross", $statement)) {
                /** call helper function. */
                $revenue['gross'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['gross']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $revenue['gross'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '(', '-'], '', $revenue['gross']);

                    /** then turn negative using abs function. */
                    $amount['grossrevenue'] = -abs($negative);
                } else {
                    $amount['grossrevenue'] = $revenue['gross'];
                }

                /** match string if has no value. */
                if ($revenue['gross'] == '') {
                    $amount['grossrevenue'] = 0.00;
                }
            }

            /** Calculate net profit margin. */
            if ($amount['income']['current'] > 0 && $amount['grossrevenue'] > 0) {
                $result['netprofitmargin'] = floatval(bcmul(bcdiv(abs($amount['income']['current']), abs($amount['grossrevenue']), 2), 100, 2));
            } else {
                $result['netprofitmargin'] = floatval('0.00');
            }

            /** mapping stock holder equity. */
            $statement['CurrentStockholdersEquity'] = $finance['41'];

            /** check if key exist in array. */
            if (array_key_exists("CurrentStockholdersEquity", $statement)) {
                /** call helper function. */
                $equity['CurrentStockholdersEquity'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['CurrentStockholdersEquity']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $equity['CurrentStockholdersEquity'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '(', '-'], '', $equity['CurrentStockholdersEquity']);

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

            /** Calculate return on equity. */
            if ($amount['income']['current'] > 0 && $amount['stockholderequity'] > 0) {
                $result['returnonequity'] = floatval(bcdiv(abs($amount['income']['current']), abs($amount['stockholderequity']), 2));
            } else {
                $result['returnonequity'] = floatval('0.00');
            }

            /** save to database.. */
            DB::table('stock_trades')
                ->where('edge', '=', $data['edge'])
                ->update([
                    'workingcapital' => strip_tags($result['workingcapital']),
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
    public function stockdividends($data)
    {
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
            ->select('name', 'price')
            ->where('edge', '=', $data['edge'])
            ->first();

        if (count($dividend) >= 2) {
            $yield = '';
            /** if dividend is cash. */
            if (strtolower($dividend[1]) === 'cash') {
                /** replace all non numeric characters. */
                $rate = number_format($this->helpers(['sanitized' => 'decimal', 'string' => $dividend[2]]), 2, '.', ',');

                /** calculate dividend yield. */
                if ($rate > 0 && $stock->price > 0) {
                    $yield = bcdiv(abs($rate), abs($stock->price), 4);
                } else {
                    $yield = number_format(0.00, 2, '.', ',');
                }
            } else if (strtolower($dividend[1]) === 'stock') {
                /** replace all non numeric characters. */
                $rate = number_format($this->helpers(['sanitized' => 'decimal', 'string' => $dividend[2]]), 2, '.', ',');

                /** convert stock to cash. */
                $cash = $stock->price * floatval($rate);

                /** calculate dividend yield. */
                if ($rate > 0 && $cash > 0) {
                    $yield = bcdiv(abs($rate), abs($cash), 4);
                } else {
                    $yield = number_format(0.00, 2, '.', ',');
                }
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
    public function stocksectors($data)
    {
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
    public function stockcompanies($data)
    {
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
    public function stockchart($data)
    {
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

            /** loop through the prices and put the result to prices array. */
            $prices = [];
            foreach ($decoded['chartData'] as $key => $value) {
                foreach ($value as $k => $v) {
                    if ($k === 'CLOSE') {
                        $prices[$key] = $v;
                    }
                }
            }

            /** define the window size for the moving average */
            $window_size = 5;

            /** calculate the moving average */
            $moving_avg = [];
            for ($i = $window_size - 1; $i < count($prices); $i++) {
                $sum = 0;
                for ($j = $i; $j >= $i - ($window_size - 1); $j--) {
                    $sum += $prices[$j];
                }
                $moving_avg[] = $sum / $window_size;
            }

            /** get the current price latest price in the list */
            $current_price = end($prices);

            /** get the current moving average last value in the moving_avg array */
            $current_moving_avg = end($moving_avg);

            /** compare the current price with the current moving average */
            if ($current_price > $current_moving_avg) {
                $result['movingsignal'] = 'buy';
            } else {
                $result['movingsignal'] = 'hold';
            }
        }

        /** find support and resistance levels */
        $levels = $this->helpers(['sanitized' => 'level', 'prices' => $prices]);

        /** save support and resistance levels */
        $result['movingaverage'] = $current_moving_avg;
        $result['supportlevel'] = $levels['support'];
        $result['resistancelevel'] = $levels['resistance'];

        /** check if result is not empty. */
        if (!is_null($result) && count($prices) > 0) {
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
                        'movingsignal' => strip_tags($result['movingsignal']),
                        'movingaverage' => strip_tags($result['movingaverage']),
                        'supportlevel' => strip_tags($result['supportlevel']),
                        'resistancelevel' => strip_tags($result['resistancelevel']),
                        'created_at' => date('Y-m-d H:i:s'),
                        'updated_at' => date('Y-m-d H:i:s'),
                    ]);
            } else {
                DB::table('stock_charts')
                    ->where('userid', Auth::id())
                    ->where('symbol', $data['symbol'])
                    ->update([
                        'movingsignal' => strip_tags($result['movingsignal']),
                        'movingaverage' => strip_tags($result['movingaverage']),
                        'supportlevel' => strip_tags($result['supportlevel']),
                        'resistancelevel' => strip_tags($result['resistancelevel']),
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
    public function stocktrades()
    {
        /** repository. */
        $stocks = DB::table('stock_trades')
            ->select('edge', 'security', 'symbol')
            ->where('edge', '>', '0')
            ->where('updated_at', '<', Carbon::now()->subHour(0))
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
    public function helpers($data)
    {
        /** if string is decimal */
        if ($data['sanitized'] === 'decimal') {
            /** replace string. */
            $result = preg_replace("/[^0-9.()-]/", "", $data['string']);

            /** convert to float. */
            $result = floatval($result);

            /** return something. */
            return $result;
        }

        /** if string is alpha */
        if ($data['sanitized'] === 'alpha') {
            /** replace string. */
            $result = preg_replace("/[^a-zA-Z]/", "", $data['string']);

            /** return something. */
            return $result;
        }

        /** custom substration. */
        if ($data['sanitized'] === 'subtract') {
            /** declare local pointer. */
            $difference = '';

            /** check if first value is greater than zero and the second is less than zero. */
            if ($data['one'] > 0 && $data['two'] < 0) {
                /** normal operation. */
                $difference = $data['one'] - $data['two'];
            }

            /** check if first value is less than zero and the first is greater than zero. */
            if ($data['one'] < 0 && $data['two'] > 0) {
                /** with abs fucntion. */
                $difference = $data['one'] - abs($data['two']);
            }

            /** check if two values are less then zero. */
            if ($data['one'] < 0 && $data['two'] < 0) {
                /** normal operation. */
                $difference = $data['one'] - $data['two'];
            }

            /** check if two values are greater then zero. */
            if ($data['one'] > 0 && $data['two'] > 0) {
                /** normal operation. */
                $difference = $data['one'] - $data['two'];
            }

            /** convert to float. */
            $result = floatval($difference);

            /** return something. */
            return $result;
        }

        if ($data['sanitized'] === 'level') {
            /** declare pointers. */
            $lowest_support = null;
            $highest_resistance = null;

            /** loop to find support and resistance level. */
            for ($i = 1; $i < count($data['prices']) - 1; $i++) {
                $prev = $data['prices'][$i - 1];
                $current = $data['prices'][$i];
                $next = $data['prices'][$i + 1];

                if ($current < $prev && $current < $next) {
                    /** found a local minimum support */
                    if ($highest_resistance === null || $current > $highest_resistance) {
                        $highest_resistance = $current;
                    }
                } else if ($current > $prev && $current > $next) {
                    /** found a local maximum support */
                    if ($lowest_support === null || $current < $lowest_support) {
                        $lowest_support = $current;
                    }
                }
            }

            /** return something. */
            return ['support' => $lowest_support, 'resistance' => $highest_resistance];
        }
    }
}
