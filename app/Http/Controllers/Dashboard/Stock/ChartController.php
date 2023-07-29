<?php

namespace App\Http\Controllers\Dashboard\Stock;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
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
            /** forward trades function */
            // if ($request->input('section') === 'stocks') {
            //     return $this->stocktrades();
            // }
        }
    }

    /**
     * Moving average function.
     */
    public function chartaverage($data) {
        /** get the current date */
        $currentDate = Carbon::today();

        /** initialize an empty array to store the dates. */
        $stocks = [];

        /** loop 200 times to get the 200 prior days. */
        for ($i = 0; $i < 200; $i++) {
            /** set the current date. */
            $current = $currentDate->subDay()->format('Y-m-d');

            /** fetch data. */
            $data = Http::get('http://phisix-api4.appspot.com/stocks/' . $data['symbol'] . '.' . $current . '.json')->body();

            /** decode string. */
            $decoded = json_decode($data, true);

            /** if decoded and is not empty. */
            if (!is_null($decoded)) {
                if ($i <= 49) {
                    $stocks['short'][$i] = ['price' => $decoded['stock'][0]['price']['amount'], 'volume' => $decoded['stock'][0]['volume']];
                }
                if ($i <= 100) {
                    $stocks['medium'][$i] = ['price' => $decoded['stock'][0]['price']['amount'], 'volume' => $decoded['stock'][0]['volume']];
                }
                if ($i <= 199) {
                    $stocks['long'][$i] = ['price' => $decoded['stock'][0]['price']['amount'], 'volume' => $decoded['stock'][0]['volume']];
                }
            }

            /** move to the previous day */
            $currentDate->subDay();
        }

        /** calculate moving average using helper function. */
        $moving['short'] = $this->helpers(['operation' => 'average', 'stocks' => $stocks['short']]);
        $moving['medium'] = $this->helpers(['operation' => 'average', 'stocks' => $stocks['medium']]);
        $moving['long'] = $this->helpers(['operation' => 'average', 'stocks' => $stocks['long']]);

        /** save to database. */
        $check = DB::table('stock_trades')
            ->select('symbol')
            ->where('symbol', $data['symbol'])
            ->first();

        /** if not then insert else update. */
        if (is_null($check)) {
            DB::table('stock_trades')
                ->where('symbol', $data['symbol'])
                ->insert([
                    'shortprice' => strip_tags($moving['short']['price']),
                    'shortvolume' => strip_tags($moving['short']['volume']),
                    'mediumprice' => strip_tags($moving['medium']['price']),
                    'mediumvolume' => strip_tags($moving['medium']['volume']),
                    'longprice' => strip_tags($moving['long']['price']),
                    'longvolume' => strip_tags($moving['long']['volume']),
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);
        } else {
            DB::table('stock_trades')
                ->where('symbol', $data['symbol'])
                ->update([
                    'shortprice' => strip_tags($moving['short']['price']),
                    'shortvolume' => strip_tags($moving['short']['volume']),
                    'mediumprice' => strip_tags($moving['medium']['price']),
                    'mediumvolume' => strip_tags($moving['medium']['volume']),
                    'longprice' => strip_tags($moving['long']['price']),
                    'longvolume' => strip_tags($moving['long']['volume']),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);
        }

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
            $result['price'] = number_format($average['price'] / count($sequence), 2, '.', ',');
            $result['volume'] = number_format($average['volume'] / count($sequence), 2, '.', ',');
        }

        /** return. */
        return $result;
    }
}
