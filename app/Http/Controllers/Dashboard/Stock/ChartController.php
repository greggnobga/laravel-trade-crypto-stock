<?php

namespace App\Http\Controllers\Dashboard\Stock;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ChartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function init(Request $request)
    {
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
    public function chartfetch($data)
    {
        /** match params. */
        if ($data['statement'] === 'select') {
            /** Item per page. */
            $itemPerPage = 15;

            /** Get total number of records. */
            $totalRecords = DB::table('stock_charts')
                ->select('symbol')
                ->count();

            /** Calculate the number of pages */
            $numberOfPages = ceil($totalRecords / $itemPerPage);

            /** Check if given pages is greater than number of pages. If true then set the page to number of pages. */
            if ($data['page'] > $numberOfPages) {
                $data['page'] = $numberOfPages;
            }

            /** select record. */
            $record = DB::table('stock_charts')
                ->join('stock_trades', 'stock_trades.symbol', '=', 'stock_charts.symbol')
                ->select('stock_trades.edge', 'stock_trades.symbol', 'stock_trades.price', 'stock_trades.value', 'stock_trades.pricerange', 'stock_trades.change', 'supportlevel', 'resistancelevel', 'movingaverage', 'movingsignal')
                ->orderBy('stock_trades.pricerange', 'desc')
                ->paginate($itemPerPage, '*', 'page', $data['page'])
                ->toArray();

            /** Call helper. */
            $transform = $this->helpers(['operation' => 'format', 'source' => $record['data']]);

            /** return result if not null. */
            if (!is_null($record)) {
                return response(['message' => 'Please wait while we process your request.', 'stocks' => $transform, 'pages' => $numberOfPages, 'show_message' => true], 200);
            }
        }
    }

    /**
     * Helper function.
     */
    private function helpers($data)
    {
        /** pointer. */
        $result = [];

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
