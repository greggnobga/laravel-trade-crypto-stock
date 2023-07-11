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
            /** forward prices command. */
            if ($request->input('section') === 'prices') {
                return $this->stockprices($request->input('input'));
            }

            /** forward reports command. */
            if ($request->input('section') === 'reports') {
                return $this->stockreports($request->input('input'));
            }

            /** forward dividends command. */
            if ($request->input('section') === 'dividends') {
                return $this->stockdividends($request->input('input'));
            }

            /** forward sectors command. */
            if ($request->input('section') === 'sectors') {
                return $this->stocksectors($request->input('input'));
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
                $result['pricerange'] = floatval(bcsub(abs($amount['low']), abs($amount['high']), 2));
            } else {
                $result['pricerange'] = floatval('0.00');
            }

            /** save to database.. */
            DB::table('stock_trades')
                ->where('edge', '=', $data['edge'])
                ->update([
                    'value' => strip_tags($result['value']),
                    'pricerange' => strip_tags($result['pricerange']),
                ]);
        }

        /** fetch stock name. */
        $reports = DB::table('stock_trades')
            ->select('name')
            ->where('edge', '=', $data['edge'])
            ->first();

        /** return something. */
        return ['message' => 'The ' . $reports->name . ' information was successfully updated.'];
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
            $statement['CurrentYearNetIncomeLossAfterTax'] = $finance['22'];
            $statement['PreviousYearNetIncomeLossAfterTax'] = $finance['23'];

            /** check if key exist in array. */
            if (array_key_exists("CurrentYearNetIncomeLossAfterTax", $statement)) {
                $current['CurrentYearNetIncomeLossAfterTax'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['CurrentYearNetIncomeLossAfterTax']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $current['CurrentYearNetIncomeLossAfterTax'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $current['CurrentYearNetIncomeLossAfterTax']);
                    /** then turn negative using abs function. */
                    $amount['income']['current'] = -abs($negative);
                } else {
                    $amount['income']['current'] = $current['CurrentYearNetIncomeLossAfterTax'];
                }

                /** match string if has no value. */
                if ($current['CurrentYearNetIncomeLossAfterTax'] == '') {
                    $amount['income']['current'] = 0.00;
                }
            }

            /** check if key exist in array. */
            if (array_key_exists("PreviousYearNetIncomeLossAfterTax", $statement)) {
                $previous['PreviousYearNetIncomeLossAfterTax'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['PreviousYearNetIncomeLossAfterTax']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $previous['PreviousYearNetIncomeLossAfterTax'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $previous['PreviousYearNetIncomeLossAfterTax']);
                    /** then turn negative using abs function. */
                    $amount['income']['previous'] = -abs($negative);
                } else {
                    $amount['income']['previous'] = $previous['PreviousYearNetIncomeLossAfterTax'];
                }

                /** match string if has no value. */
                if ($previous['PreviousYearNetIncomeLossAfterTax'] == '') {
                    $amount['income']['previous'] = 0.00;
                }
            }

            /** determine if profitable against previous year. */
            $result['netincomeaftertax'] = floatval(bcsub(abs($amount['income']['current']), abs($amount['income']['previous']), 2));

            /** mapping total liabilities. */
            $statement['CurrentTotalLiabilities'] = $finance['6'];

            /** check if key exist in array. */
            if (array_key_exists("CurrentTotalLiabilities", $statement)) {
                /** call helper function. */
                $liabilities['CurrentTotalLiabilities'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['CurrentTotalLiabilities']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $liabilities['CurrentTotalLiabilities'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $liabilities['CurrentTotalLiabilities']);

                    /** then turn negative using abs function. */
                    $amount['totalliabilities'] = -abs($negative);
                } else {
                    /** directly add to array if positive value. */
                    $amount['totalliabilities'] = $liabilities['CurrentTotalLiabilities'];
                }
                /** match string if has no value. */
                if ($liabilities['CurrentTotalLiabilities'] == '') {
                    $amount['totalliabilities'] = 0.00;
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

            /** evalaute value is greater than zero. */
            if ($amount['totalliabilities'] > 0 && $amount['stockholderequity'] > 0) {
                $result['debtequityratio'] = floatval(bcdiv(abs($amount['totalliabilities']), abs($amount['stockholderequity']), 2));
            } else {
                $result['debtequityratio'] = floatval('0.00');
            }

            /** mapping earning per share . */
            $statement['CurrentYearEarningsLossPerShareBasic'] = $finance['26'];
            $statement['PreviousYearEarningsLossPerShareBasic'] = $finance['27'];

            /** check if key exist in array. */
            if (array_key_exists("CurrentYearEarningsLossPerShareBasic", $statement)) {
                $share['CurrentYearEarningsLossPerShareBasic'] = $this->helpers(['sanitized' => 'decimal', 'string' => $statement['CurrentYearEarningsLossPerShareBasic']]);

                /** preg match if contains parentheses. */
                if (preg_match("/([)(])\w+/", $share['CurrentYearEarningsLossPerShareBasic'])) {
                    /** string replace parentheses. */
                    $negative = str_replace([')', '('], '', $share['CurrentYearEarningsLossPerShareBasic']);
                    /** then turn negative using abs function. */
                    $amount['earning']['current'] = -abs($negative);
                } else {
                    $amount['earning']['current'] = $share['CurrentYearEarningsLossPerShareBasic'];
                }
                /** match string if has no value. */
                if ($share['CurrentYearEarningsLossPerShareBasic'] == '') {
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
                    'netincomeaftertax' => strip_tags($result['netincomeaftertax']),
                    'debtequityratio' => strip_tags($result['debtequityratio']),
                    'priceearningratio' => strip_tags($result['priceearningratio']),
                    'netprofitmargin' => strip_tags($result['netprofitmargin']),
                    'returnonequity' => strip_tags($result['returnonequity']),
                ]);

            /** search database. */
            $reports = DB::table('stock_trades')
                ->select('name')
                ->where('edge', '=', $data['edge'])
                ->first();

            /** return something. */
            return ['message' => 'The ' . $reports->name . ' information was successfully updated.'];
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
                    $result['sector'] = 'unknown';
                }

                /** save to database. */
                DB::table('stock_trades')
                    ->where('edge', '=', $data['edge'])
                    ->update([
                        'sector' => strip_tags($result['sector']),
                    ]);
            }
        }

        /** fetch stock name. */
        $reports =   DB::table('stock_trades')
            ->select('name')
            ->where('edge', '=', $data['edge'])
            ->first();

        /** return something. */
        return ['message' => 'The ' . $reports->name . ' information was successfully updated.'];
    }

    /**
     * Declare stocks function.
     */
    public function stocktrades() {
        /** repository. */
        $stocks = DB::table('stock_trades')
            ->select('edge', 'symbol')
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
