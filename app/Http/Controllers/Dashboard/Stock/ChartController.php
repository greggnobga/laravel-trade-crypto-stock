<?php

namespace App\Http\Controllers\Dashboard\Stock;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Symfony\Component\DomCrawler\Crawler;
use Carbon\Carbon;

class ChartController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function init(Request $request) {
        /** check if request contains method equal to post. */
        if ($request->method() === 'POST') {
            /** forward average function */
            if ($request->input('section') === 'average') {
                return $this->chartaverage($request->all());
            }
        }

        /** check if request contains method equal to post. */
        if ($request->method() === 'GET') {
            /** forward chart build function */
            if ($request->input('section') === 'fetch') {
                return $this->chartfetch($request->all());
            }
            /** forward chart build function */
            if ($request->input('section') === 'build') {
                return $this->chartbuild($request->all());
            }
        }
    }

    /**
     * Build list function.
     */
    public function chartfetch($data) {
        /** match params. */
        if ($data['statement'] === 'select') {
            /** select record. */
            $record = DB::table('stock_charts')
                ->join('stock_trades', 'stock_trades.symbol', '=', 'stock_charts.symbol')
                ->select('stock_trades.symbol', 'stock_trades.price', 'stock_trades.value', 'stock_trades.pricerange', 'stock_trades.change', 'averageone', 'averagetwo', 'averagethree')
                ->where('userid', Auth::id())
                ->orderBy('stock_trades.value', 'desc')
                ->get()
                ->toArray();

            /** Call helper. */
            $transform = $this->helpers(['operation' => 'format', 'source' => $record]);

            /** return result if not null. */
            if (!is_null($record)) {
                return response(['message' => 'Please wait while we process your request.', 'stocks' => $transform], 200);
            }
        }
    }

    /**
     * Build list function.
     */
    public function chartbuild($data) {
        /** match params. */
        if ($data['table'] === 'watchlist' && $data['statement'] === 'select') {
            /** select record. */
            $watchlist = DB::table('stock_watchlists')
                ->select('symbol')
                ->where('userid', Auth::id())
                ->get()
                ->toArray();

            /** return result if not null. */
            if (!is_null($watchlist)) {
                return response(['message' => 'Please wait while we process your request.', 'stocks' => $watchlist], 200);
            }
        }
    }

    /**
     * Moving average function.
     */
    public function chartaverage() {
        /** https://edge.pse.com.ph/common/DisclosureCht.ax */

        // $response = Http::withHeaders([
        //     'Content-Type' => 'application/json',
        // ])->post('https://edge.pse.com.ph/common/DisclosureCht.ax', [
        //     'cmpy_id' => '86',
        //     'endDate' => '08-01-2023',
        //     'security_id' => '158',
        //     'startDate' => '07-01-2022',
        // ]);

        // /** make it crawlable. */
        // $crawlerlists = new Crawler($response);

        // /** filter response. */
        // $list = $crawlerlists->filter('p')->each(function ($node) {
        //     return $node->text();
        // });

        // /** decode string. */
        // $decoded = json_decode($list[0], true);

        // dd($decoded);

        // /** get the response content */
        // $content = $response->getContent();
        // $fetch = Http::post('https://edge.pse.com.ph/common/DisclosureCht.ax?cmpy_id=86&endDate=08-01-2023&security_id=158&startDate=08-01-2022');

        // /** make it crawlable. */
        // $crawlerlists = new Crawler($fetch);

        // /** filter response. */
        // $list = $crawlerlists->filter('tr > td')->each(function ($node) {
        //     return $node->text();
        // });

        // /** get the current date */
        // $currentDate = Carbon::today();

        // /** initialize an empty array to store the dates. */
        // $stocks = [];

        // /** wait for two seconds between each iteration. */
        // $interval = 2000;
        // /** loop 200 times to get the 200 prior days. */
        // for ($i = 0; $i < 200; $i++) {
        //     /** set the current date. */
        //     $current = $currentDate->subDay()->format('Y-m-d');

        //     /** try catch block. */
        //     try {
        //         /** fetch data. */
        //         $fetch = Http::get('http://phisix-api4.appspot.com/stocks/' . $data['symbol'] . '.' . $current . '.json');

        //         /** check if fetch is a success. */
        //         if ($fetch->getStatusCode() === 200) {
        //             /** assign body to pointer. */
        //             $received =  $fetch->body();

        //             /** decode string. */
        //             $decoded = json_decode($received, true);

        //             /** if decoded and is not empty. */
        //             if (!is_null($decoded)) {
        //                 if ($i <= 49) {
        //                     $stocks['short'][$i] = ['price' => $decoded['stock'][0]['price']['amount'], 'volume' => $decoded['stock'][0]['volume']];
        //                 }
        //                 if ($i <= 100) {
        //                     $stocks['medium'][$i] = ['price' => $decoded['stock'][0]['price']['amount'], 'volume' => $decoded['stock'][0]['volume']];
        //                 }
        //                 if ($i <= 199) {
        //                     $stocks['long'][$i] = ['price' => $decoded['stock'][0]['price']['amount'], 'volume' => $decoded['stock'][0]['volume']];
        //                 }
        //             }
        //         }
        //     } catch (\Exception $ex) {
        //         continue;
        //     }

        //     /** move to the previous day */
        //     $currentDate->subDay();

        //     /** add a delay between each iteration */
        //     if ($i < 200 - 1) {
        //         usleep($interval * 1000);
        //     }
        // }

        // /** calculate moving average using helper function. */
        // $moving['short'] = $this->helpers(['operation' => 'average', 'stocks' => $stocks['short']]);
        // $moving['medium'] = $this->helpers(['operation' => 'average', 'stocks' => $stocks['medium']]);
        // $moving['long'] = $this->helpers(['operation' => 'average', 'stocks' => $stocks['long']]);

        // /** save to database. */
        // $check = DB::table('stock_charts')
        //     ->select('symbol')
        //     ->where('symbol', $data['symbol'])
        //     ->first();

        // /** if not then insert else update. */
        // if (is_null($check)) {
        //     DB::table('stock_charts')
        //         ->where('symbol', $data['symbol'])
        //         ->insert([
        //             'userid' => Auth::id(),
        //             'symbol' => strip_tags($data['symbol']),
        //             'shortprice' => strip_tags($moving['short']['price']),
        //             'shortvolume' => strip_tags($moving['short']['volume']),
        //             'mediumprice' => strip_tags($moving['medium']['price']),
        //             'mediumvolume' => strip_tags($moving['medium']['volume']),
        //             'longprice' => strip_tags($moving['long']['price']),
        //             'longvolume' => strip_tags($moving['long']['volume']),
        //             'created_at' => date('Y-m-d H:i:s'),
        //             'updated_at' => date('Y-m-d H:i:s'),
        //         ]);
        // } else {
        //     DB::table('stock_charts')
        //         ->where('symbol', $data['symbol'])
        //         ->update([
        //             'shortprice' => strip_tags($moving['short']['price']),
        //             'shortvolume' => strip_tags($moving['short']['volume']),
        //             'mediumprice' => strip_tags($moving['medium']['price']),
        //             'mediumvolume' => strip_tags($moving['medium']['volume']),
        //             'longprice' => strip_tags($moving['long']['price']),
        //             'longvolume' => strip_tags($moving['long']['volume']),
        //             'updated_at' => date('Y-m-d H:i:s'),
        //         ]);
        // }

        /** return. */
        return response(['message' => 'Moving average has been calculated.'], 200);
    }

    /**
     * Helper function.
     */
    private function helpers($data) {
        /** pointer. */
        $result = [];

        /** calculate moving average. */
        if ($data['operation'] === 'average') {
            /** resequence key value pairs. */
            $sequence = array_values($data['stocks']);

            /** Convert the array to a collection */
            $collection = collect($sequence);

            /** use the reduce method to calculate the sum of 'value' key */
            $average['price'] = $collection->reduce(function ($carry, $item) {
                return $carry + $item['price'];
            }, 0);

            $average['volume'] = $collection->reduce(function ($carry, $item) {
                return $carry + $item['volume'];
            }, 0);

            /** save to pointer. */
            $result['price'] = number_format($average['price'] / count($sequence), 2, '.', '');
            $result['volume'] = number_format($average['volume'] / count($sequence), 2, '.', '');
        }

        /** transform into standard format. */
        if ($data['operation'] === 'format') {
            /** loop through. */
            foreach ($data['source'] as $key => $value) {
                foreach ($value as $k => $v) {
                    /** preg match alpha. */
                    if (preg_match('/[a-zA-Z]+/', $v)) {
                        $result[$key][$k] = $v;
                    }

                    /** preg match numeric. */
                    if (preg_match('/[0-9]+/', $v)) {
                        if ($k === 'symbol' || $k === 'edge') {
                            $result[$key][$k] = $v;
                        } else {
                            $result[$key][$k] = number_format($v, 2, ".", ",");
                        }
                    }
                }
            }
        }

        /** return. */
        return $result;
    }
}
