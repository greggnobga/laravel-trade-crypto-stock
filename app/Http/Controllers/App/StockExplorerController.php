<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class StockExplorerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function init(Request $request, $page = 1)
    {
        /** check if request contains method equal to get. */
        if ($request->method() === 'GET') {
            /** sentinel response. */
            if ($request->input('section') === 'explorer') {
                /** Return something. */
                return $this->fetch(['statement' => $request->input('statement'), 'page' => $page]);
            }
        }
        /** Return something. */
        return response(['message' => 'Requests made with this endpoint need to have at least one parameter value.'], 404);
    }

    /**
     * Declare fetch function.
     */
    public function fetch($data)
    {
        /** Check if required parameter is not empty. */
        if (!$data['statement'] || !$data['page']) {
            return response(['message' => 'Important parameters are missing in the request.']);
        }

        /** declare pointer */
        $result = [];

        /** check if section match. */
        if ($data['statement'] === 'select') {
            /** Item per page. */
            $itemPerPage = 15;

            /** Get total number of records. */
            $totalRecords = DB::table('stock_trades')
                ->select('symbol', 'price', 'value', 'workingcapital', 'netincomeaftertax', 'debtassetratio', 'priceearningratio', 'netprofitmargin', 'returnonequity', 'dividendyield')
                ->where('value', '>', 0)
                ->where('workingcapital', '>', 0)
                ->where('netincomeaftertax', '>', 0)
                ->count();

            /** Calculate the number of pages */
            $numberOfPages = ceil($totalRecords / $itemPerPage);

            /** fetch top stocks base on fundametal data. */
            $stocks = DB::table('stock_trades')
                ->select('symbol', 'price', 'value', 'workingcapital', 'netincomeaftertax', 'debtassetratio', 'priceearningratio', 'netprofitmargin', 'returnonequity', 'dividendyield')
                ->where('value', '>', 0)
                ->where('workingcapital', '>', 0)
                ->where('netincomeaftertax', '>', 0)
                ->orderBy('netincomeaftertax', 'desc')
                ->paginate($itemPerPage, '*', 'page', $data['page'])
                ->toArray();

            /** check if not empty. */
            if (count($stocks['data']) > 1) {
                /** then call helper to add standard format. */
                $result['data'] = $this->helpers(['purpose' => 'format', 'source' => $stocks['data']]);
            } else {
                /** set to empty array. */
                $result['data'] = [];
            }
        }

        return response(['message' => 'Please wait while we are processing your request.', 'pages' => $numberOfPages, 'stocks' => $result['data'], 'show_message' => true], 200);
    }

    /**
     * Helper function.
     */
    private function helpers($data)
    {
        if ($data['purpose'] === 'format') {
            /** return variable. */
            $return = [];

            /** loop through. */
            foreach ($data['source'] as $key => $value) {
                foreach ($value as $k => $v) {
                    /** preg match alpha. */
                    if (preg_match('/[a-zA-Z]+/', $v)) {
                        $return[$key][$k] = $v;
                    }

                    /** preg match numeric. */
                    if (preg_match('/[0-9]+/', $v)) {
                        if ($k === 'symbol' || $k === 'edge') {
                            $return[$key][$k] = $v;
                        } else {
                            $return[$key][$k] = number_format($v, 2, ".", ",");
                        }
                    }
                }
            }
            /** return. */
            return $return;
        }
    }
}
