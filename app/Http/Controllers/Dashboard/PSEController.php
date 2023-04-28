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
            /** forward reports command. */
            if ($request->input('section') === 'reports') {
                return $this->stockreports($request->all());
            }
            /** forward prices command. */
            if ($request->input('section') === 'prices') {
                return $this->stockprices($request->all());
            }
            /** forward watchlist command. */
            if ($request->input('section') === 'sectors') {
                return $this->stocksectors($request->all());
            }
            /** forward watchlist command. */
            if ($request->input('section') === 'dividends') {
                return $this->stockdividends($request->all());
            }
            /** forward watchlist command. */
            if ($request->input('section') === 'watches') {
                return $this->stockwatches($request->all());
            }
        }
        /** check if request contains method equal to post. */
        if ($request->method() === 'GET') {
            /** forward trades command. */
            if ($request->input('section') === 'stocks') {
                return $this->stocktrades();
            }
        }
    }

    /**
     * Declare financials function.
     */
    public function stockreports($data) {
        /** repository. */
        $result = [];

        /** create request. */
        $financial = Http::get('https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=' . $data['id'])->body();
        /** make it crawlable. */
        $crawler_financial = new Crawler($financial);
        /** filter response. */
        $finance = $crawler_financial->filter('tr > td')->each(function ($node) {
            return $node->text();
        });

        if (count($finance) != 0) {
            /** mapping net after tax . */
            $annualincomestatement['CurrentYearNetIncomeLossAfterTax'] = $finance['22'];
            $annualincomestatement['PreviousYearNetIncomeLossAfterTax'] = $finance['23'];

            /** check if key exist in array. */
            if (array_key_exists("CurrentYearNetIncomeLossAfterTax", $annualincomestatement)) {
                $current['CurrentYearNetIncomeLossAfterTax'] = $this->helpers(['sanitized' => 'decimal', 'string' => $annualincomestatement['CurrentYearNetIncomeLossAfterTax']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $current['CurrentYearNetIncomeLossAfterTax'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $current['CurrentYearNetIncomeLossAfterTax']);
                    /** then turn negative using abs function. */
                    $result['income']['current'] = -abs($negative);
                } else {
                    $result['income']['current'] = $current['CurrentYearNetIncomeLossAfterTax'];
                }

                /** match string if has no value. */
                if ($current['CurrentYearNetIncomeLossAfterTax'] == '') {
                    $result['income']['current'] = 0.00;
                }
            }

            /** check if key exist in array. */
            if (array_key_exists("PreviousYearNetIncomeLossAfterTax", $annualincomestatement)) {
                $previous['PreviousYearNetIncomeLossAfterTax'] = $this->helpers(['sanitized' => 'decimal', 'string' => $annualincomestatement['PreviousYearNetIncomeLossAfterTax']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $previous['PreviousYearNetIncomeLossAfterTax'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $previous['PreviousYearNetIncomeLossAfterTax']);
                    /** then turn negative using abs function. */
                    $result['income']['previous'] = -abs($negative);
                } else {
                    $result['income']['previous'] = $previous['PreviousYearNetIncomeLossAfterTax'];
                }

                /** match string if has no value. */
                if ($previous['PreviousYearNetIncomeLossAfterTax'] == '') {
                    $result['income']['previous'] = 0.00;
                }
            }
            /** determine if profitable against previous year. */
            $result['income']['balance'] = floatval(bcsub(abs($result['income']['current']), abs($result['income']['previous']), 2));

            /** save to database.. */
            DB::table('stock_trades')
                ->where('edge', '=', $data['id'])
                ->update([
                    'incomeaftertax' => strip_tags($result['income']['balance']),
                ]);

            /** mapping earning per share . */
            $annualincomestatement['CurrentYearEarningsLossPerShareBasic'] = $finance['26'];
            $annualincomestatement['PreviousYearEarningsLossPerShareBasic'] = $finance['27'];

            /** check if key exist in array. */
            if (array_key_exists("CurrentYearEarningsLossPerShareBasic", $annualincomestatement)) {
                $share['CurrentYearEarningsLossPerShareBasic'] = $this->helpers(['sanitized' => 'decimal', 'string' => $annualincomestatement['CurrentYearEarningsLossPerShareBasic']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $share['CurrentYearEarningsLossPerShareBasic'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $share['CurrentYearEarningsLossPerShareBasic']);
                    /** then turn negative using abs function. */
                    $result['earning']['current'] = -abs($negative);
                } else {
                    $result['earning']['current'] = $share['CurrentYearEarningsLossPerShareBasic'];
                }
                /** match string if has no value. */
                if ($share['CurrentYearEarningsLossPerShareBasic'] == '') {
                    $result['earning']['current'] = 0.00;
                }
            }

            /** check if key exist in array. */
            if (array_key_exists("PreviousYearEarningsLossPerShareBasic", $annualincomestatement)) {
                $share['PreviousYearEarningsLossPerShareBasic'] = $this->helpers(['sanitized' => 'decimal', 'string' => $annualincomestatement['PreviousYearEarningsLossPerShareBasic']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $share['PreviousYearEarningsLossPerShareBasic'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $share['PreviousYearEarningsLossPerShareBasic']);
                    /** then turn negative using abs function. */
                    $result['earning']['previous'] = -abs($negative);
                } else {
                    $result['earning']['previous'] = $share['PreviousYearEarningsLossPerShareBasic'];
                }
                /** match string if has no value. */
                if ($share['PreviousYearEarningsLossPerShareBasic'] == '') {
                    $result['earning']['previous'] = 0.00;
                }
            }

            /** determine if profitable against previous year. */
            $result['earning']['balance'] =  floatval(bcsub(abs($result['earning']['current']), abs($result['earning']['previous']), 2));

            /** save to database.. */
            DB::table('stock_trades')
                ->where('edge', '=', $data['id'])
                ->update([
                    'earningpershare' => strip_tags($result['earning']['balance']),
                ]);

            /** search database. */
            $reports =   DB::table('stock_trades')
                ->select('name')
                ->where('edge', '=', $data['id'])
                ->first();

            /** return something. */
            return ['message' => 'The ' . $reports->name . ' information was successfully updated.'];
        }
    }

    /**
     * Declare stocks function.
     */
    public function stockprices($data) {
        /** repository. */
        $result = [];

        /** create request. */
        $stockprices = Http::get('https://edge.pse.com.ph/companyPage/stockData.do?cmpy_id=' . $data['id'])->body();
        /** make it crawlable. */
        $crawler_prices = new Crawler($stockprices);
        /** filter response. */
        $stockprice = $crawler_prices->filter('tr > td')->each(function ($node) {
            return $node->text();
        });

        if (count($stockprice) != 0) {
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
                    $result['high'] = -abs($negative);
                } else {
                    $result['high'] = $price['high'];
                }
                /** match string if has no value. */
                if ($price['high'] == '') {
                    $result['high'] = 0.00;
                }

                /** convert into float value. */
                $result['high'] = floatval($result['high']);

                /** save to database. */
                DB::table('stock_trades')
                    ->where('edge', '=', $data['id'])
                    ->update([
                        'yearhighprice' => strip_tags($result['high']),
                    ]);
            }
            /** mapping average price. */
            $stockdata['AveragePrice'] = $stockprice['22'];
            /** save to database.. */
            if (array_key_exists("AveragePrice", $stockdata)) {
                /** replace comma with nothing. */
                $average['price'] = $this->helpers(['sanitized' => 'decimal', 'string' => $stockdata['AveragePrice']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $average['price'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $average['price']);
                    /** then turn negative using abs function. */
                    $result['average'] = -abs($negative);
                } else {
                    $result['average'] = $average['price'];
                }
                /** match string if has no value. */
                if ($average['price'] == '') {
                    $result['average'] = 0.00;
                }

                /** convert into float value. */
                $result['average'] = floatval($result['average']);

                /** save to database. */
                DB::table('stock_trades')
                    ->where('edge', '=', $data['id'])
                    ->update([
                        'average' => strip_tags($result['average']),
                    ]);
            }
        }

        /** fetch stock name. */
        $reports = DB::table('stock_trades')
            ->select('name')
            ->where('edge', '=', $data['id'])
            ->first();

        /** return something. */
        return ['message' => 'The ' . $reports->name . ' information was successfully updated.'];
    }

    /**
     * Declare stocks function.
     */
    public function stockdividends($data) {
        /** create request. */
        $dividends = Http::get('https://edge.pse.com.ph/companyPage/dividends_and_rights_list.ax?cmpy_id=' . $data['id'])->body();
        /** make it crawlable. */
        $crawler_dividends = new Crawler($dividends);
        /** filter response. */
        $dividend = $crawler_dividends->filter('tr > td')->each(function ($node) {
            return $node->text();
        });

        $stock = DB::table('stock_trades')
            ->select('name')
            ->where('edge', '=', $data['id'])
            ->first();

        if (count($dividend) >= 2) {
            $yield = '';
            if (strtolower($dividend[1]) == 'cash') {
                /** replace all non numeric characters. */
                $rate = number_format($this->helpers(['sanitized' => 'decimal', 'string' => $dividend[2]]), 2, '.', ',');

                /** fetch price. */
                $trade = DB::table('stock_trades')
                    ->where('edge', '=', $data['id'])
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
                ->where('edge', '=', $data['id'])
                ->update([
                    'dividendyield' => strip_tags($yield),
                ]);
        } else {
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
        $stocksectors = Http::get('https://edge.pse.com.ph/companyInformation/form.do?cmpy_id=' . $data['id'])->body();

        /** make it crawlable. */
        $crawler_sectors = new Crawler($stocksectors);

        /** filter response. */
        $stocksector = $crawler_sectors->filter('tr > td')->each(function ($node) {
            return $node->text();
        });

        if (count($stocksector) >= 1) {
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
                    $result['sector'] = 'kolorum';
                }

                /** save to database. */
                DB::table('stock_trades')
                    ->where('edge', '=', $data['id'])
                    ->update([
                        'sector' => strip_tags($result['sector']),
                    ]);
            }
        }
        /** fetch stock name. */
        $reports =   DB::table('stock_trades')
            ->select('name')
            ->where('edge', '=', $data['id'])
            ->first();
        /** return something. */
        return ['message' => 'The ' . $reports->name . ' information was successfully updated.'];
    }

    /**
     * Declare financials function.
     */
    public function stockwatches($data) {
        /** repository. */
        $result = [];

        /** create request. */
        $financial = Http::get('https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=' . $data['id'])->body();

        /** make it crawlable. */
        $crawler_financial = new Crawler($financial);

        /** filter response. */
        $finance = $crawler_financial->filter('tr > td')->each(function ($node) {
            return $node->text();
        });

        if (count($finance) != 0) {
            /** mapping total liabilities. */
            $annualincomestatement['CurrentTotalLiabilities'] = $finance['6'];
            /** check if key exist in array. */
            if (array_key_exists("CurrentTotalLiabilities", $annualincomestatement)) {
                /** call helper function. */
                $current['CurrentTotalLiabilities'] = $this->helpers(['sanitized' => 'decimal', 'string' => $annualincomestatement['CurrentTotalLiabilities']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $current['CurrentTotalLiabilities'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $current['CurrentTotalLiabilities']);
                    /** then turn negative using abs function. */
                    $result['totalliabilities'] = -abs($negative);
                } else {
                    $result['totalliabilities'] = $current['CurrentTotalLiabilities'];
                }
                /** match string if has no value. */
                if ($current['CurrentTotalLiabilities'] == '') {
                    $result['totalliabilities'] = 0.00;
                }
            }

            /** mapping stock holder equity. */
            $annualincomestatement['CurrentStockholdersEquity'] = $finance['10'];
            /** check if key exist in array. */
            if (array_key_exists("CurrentStockholdersEquity", $annualincomestatement)) {
                /** call helper function. */
                $equity['CurrentStockholdersEquity'] = $this->helpers(['sanitized' => 'decimal', 'string' => $annualincomestatement['CurrentStockholdersEquity']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $equity['CurrentStockholdersEquity'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $equity['CurrentStockholdersEquity']);
                    /** then turn negative using abs function. */
                    $result['stockholderequity'] = -abs($negative);
                } else {
                    $result['stockholderequity'] = $equity['CurrentStockholdersEquity'];
                }
                /** match string if has no value. */
                if ($equity['CurrentStockholdersEquity'] == '') {
                    $result['stockholderequity'] = 0.00;
                }
            }

            /** mapping stock holder equity. */
            $annualincomestatement['CurrentEarningsLossPerShareBasic'] = $finance['26'];
            /** check if key exist in array. */
            if (array_key_exists("CurrentEarningsLossPerShareBasic", $annualincomestatement)) {
                /** call helper function. */
                $earning['CurrentEarningsLossPerShareBasic'] = $this->helpers(['sanitized' => 'decimal', 'string' => $annualincomestatement['CurrentEarningsLossPerShareBasic']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $earning['CurrentEarningsLossPerShareBasic'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $earning['CurrentEarningsLossPerShareBasic']);
                    /** then turn negative using abs function. */
                    $result['earningpershare'] = -abs($negative);
                } else {
                    $result['earningpershare'] = $earning['CurrentEarningsLossPerShareBasic'];
                }
                /** match string if has no value. */
                if ($earning['CurrentEarningsLossPerShareBasic'] == '') {
                    $result['earningpershare'] = 0.00;
                }
            }

            /** mapping stock holder equity. */
            $annualincomestatement['CurrentIncomeLossBeforeTax'] = $finance['20'];
            /** check if key exist in array. */
            if (array_key_exists("CurrentIncomeLossBeforeTax", $annualincomestatement)) {
                /** call helper function. */
                $income['CurrentIncomeLossBeforeTax'] = $this->helpers(['sanitized' => 'decimal', 'string' => $annualincomestatement['CurrentIncomeLossBeforeTax']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $income['CurrentIncomeLossBeforeTax'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $income['CurrentIncomeLossBeforeTax']);
                    /** then turn negative using abs function. */
                    $result['incomebeforetax'] = -abs($negative);
                } else {
                    $result['incomebeforetax'] = $income['CurrentIncomeLossBeforeTax'];
                }
                /** match string if has no value. */
                if ($income['CurrentIncomeLossBeforeTax'] == '') {
                    $result['incomebeforetax'] = 0.00;
                }
            }

            /** mapping stock holder equity. */
            $annualincomestatement['CurrentGrossRevenue'] = $finance['16'];
            /** check if key exist in array. */
            if (array_key_exists("CurrentGrossRevenue", $annualincomestatement)) {
                /** call helper function. */
                $revenue['CurrentGrossRevenue'] = $this->helpers(['sanitized' => 'decimal', 'string' => $annualincomestatement['CurrentGrossRevenue']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $revenue['CurrentGrossRevenue'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $revenue['CurrentGrossRevenue']);
                    /** then turn negative using abs function. */
                    $result['grossrevenue'] = -abs($negative);
                } else {
                    $result['grossrevenue'] = $revenue['CurrentGrossRevenue'];
                }
                /** match string if has no value. */
                if ($revenue['CurrentGrossRevenue'] == '') {
                    $result['grossrevenue'] = 0.00;
                }
            }
        }

        /** create request. */
        $prices = Http::get('https://edge.pse.com.ph/companyPage/stockData.do?cmpy_id=' . $data['id'])->body();
        /** make it crawlable. */
        $crawler_prices = new Crawler($prices);
        /** filter response. */
        $price = $crawler_prices->filter('tr > td')->each(function ($node) {
            return $node->text();
        });

        if (count($price) != 0) {
            /** mapping net after tax . */
            $annualincomestatement['LastTradedPrice'] = $price['12'];
            /** check if key exist in array. */
            if (array_key_exists("LastTradedPrice", $annualincomestatement)) {
                /** call helper function. */
                $traded['LastTradedPrice'] = $this->helpers(['sanitized' => 'decimal', 'string' => $annualincomestatement['LastTradedPrice']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $traded['LastTradedPrice'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $traded['LastTradedPrice']);
                    /** then turn negative using abs function. */
                    $result['lasttradedprice'] = -abs($negative);
                } else {
                    $result['lasttradedprice'] = $traded['LastTradedPrice'];
                }
                /** match string if has no value. */
                if ($traded['LastTradedPrice'] == '') {
                    $result['lasttradedprice'] = 0.00;
                }
            }
            /** check record if exist. */
            $symbol = DB::table('stock_watchlists')
                ->select('symbol')
                ->where('symbol', $data['symbol'])
                ->get();

            /** check if not empty. */
            if ($symbol->isEmpty()) {
                $insert = DB::table('stock_watchlists')
                    ->insertGetId([
                        'userid' => Auth::id(),
                        'symbol' => strip_tags($data['symbol']),
                        'sector' => strip_tags($data['sector']),
                        'edge' => strip_tags($data['id']),
                        'volume' => strip_tags($data['volume']),
                        'totalliabilities' => strip_tags($result['totalliabilities']),
                        'stockholdersequity' => strip_tags($result['stockholderequity']),
                        'lasttradedprice' => strip_tags($result['lasttradedprice']),
                        'earningspershare' => strip_tags($result['earningpershare']),
                        'netincomebeforetax' => strip_tags($result['incomebeforetax']),
                        'grossrevenue' => strip_tags($result['grossrevenue']),
                        'created_at' => date('Y-m-d H:i:s'),
                        'updated_at' => date('Y-m-d H:i:s'),
                    ]);
                /** if insert not empty.*/
                if ($insert) {
                    return ['message' => 'The ' . $data['symbol'] . ' has been added to the database.'];
                }
            } else {
                /** update if not found.*/
                $update = DB::table('stock_watchlists')
                    ->where('userid', '=', Auth::id())
                    ->where('symbol', '=', $data['symbol'])
                    ->update([
                        'totalliabilities' => strip_tags($result['totalliabilities']),
                        'stockholdersequity' => strip_tags($result['stockholderequity']),
                        'lasttradedprice' => strip_tags($result['lasttradedprice']),
                        'earningspershare' => strip_tags($result['earningpershare']),
                        'netincomebeforetax' => strip_tags($result['incomebeforetax']),
                        'grossrevenue' => strip_tags($result['grossrevenue']),
                        'created_at' => date('Y-m-d H:i:s'),
                        'updated_at' => date('Y-m-d H:i:s'),
                    ]);
                /** if update not empty.*/
                if ($update) {
                    return ['message' => 'The ' . $data['symbol'] . ' information was successfully updated.'];
                }
            }
            /** return something. */
            return ['message' => 'Data has been retrieved.'];
        }
    }

    /**
     * Declare stocks function.
     */
    public function stocktrades() {
        /** repository. */
        $stocks = DB::table('stock_trades')
            ->select('edge', 'symbol', 'sector', 'volume')
            ->where('edge', '>', '0')
            ->where('updated_at', '<', Carbon::now()->subHour(0))
            ->get()
            ->toArray();
        if (count($stocks)) {
            /** resequence array keys. */
            $stocks = array_values($stocks);
            /** return something. */
            return ['message' => 'Start crawling the PSE website for stock information.', 'stocks' => $stocks];
        } else {
            /** return something. */
            return ['message' => 'All records are up to date.'];
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
        /** return something. */
        return $result;
    }
}
