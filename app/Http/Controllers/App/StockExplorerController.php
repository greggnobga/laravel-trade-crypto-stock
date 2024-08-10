<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Carbon\Carbon;

use App\Http\Controllers\Dashboard\PSEController;

class StockExplorerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function init(Request $request)
    {
        /** check if request contains method equal to get. */
        if ($request->method() === 'GET') {

            /** Explorer response. */
            if ($request->input('section') === 'explorer') {
                /** Return something. */
                return $this->fetch(['statement' => $request->input('statement'), 'page' => $request->input('page')]);
            }

            /** Details response. */
            if ($request->input('section') === 'details') {
                /** Return something. */
                return $this->details(['statement' => $request->input('statement'), 'symbol' => $request->input('symbol')]);
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
                ->select('symbol')
                ->where('value', '>', 0)
                ->where('workingcapital', '>', 0)
                ->where('netincomeaftertax', '>', 0)
                ->count();

            /** Calculate the number of pages */
            $numberOfPages = ceil($totalRecords / $itemPerPage);

            /** Check if given pages is greater than number of pages. If true then set the page to number of pages. */
            if ($data['page'] > $numberOfPages) {
                $data['page'] = $numberOfPages;
            }

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
            if (!is_null($stocks['data'])) {
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
     * Declare fetch function.
     */
    public function details($data)
    {
        /** Check if required parameter is not empty. */
        if (!$data['statement'] || !$data['symbol']) {
            return response(['message' => 'Important parameters are missing in the request.']);
        }

        /** Select neccessary fields to be used later. */
        $stock = DB::table('stock_trades')
            ->select('edge', 'security', 'symbol', 'updated_at')
            ->where('symbol', $data['symbol'])
            ->first();

        /** Forward to pse controller to build the technical information. */
        $pse_controller = new PSEController();
        $stock_average = $pse_controller->stockaverage(['edge' => $stock->edge, 'security' => $stock->security, 'symbol' => $stock->symbol]);

        /** declare pointer */
        $result = [];

        /** check if fetching chart data is a success.*/
        if ($stock_average->original['success']) {
            /** check if section match. */
            if ($data['statement'] === 'select') {
                /** techincal data. */
                $result['technical'] = DB::table('stock_charts')
                    ->join('stock_trades', 'stock_trades.symbol', '=', 'stock_charts.symbol')
                    ->select('stock_trades.price', 'stock_trades.change', 'stock_trades.volume', 'stock_trades.pricerange', 'supportlevel', 'resistancelevel', 'movingaverage', 'movingsignal')
                    ->where('stock_charts.symbol', '=', $data['symbol'])
                    ->get()
                    ->toArray();

                /** check if not empty. */
                if ($result['technical']) {
                    /** then call helper to add standard format. */
                    $result['technical'] = $this->helpers(['purpose' => 'format', 'source' => $result['technical']]);
                } else {
                    /** set to empty array. */
                    $result['technical'] = [];
                }

                /** fundametal data. */
                $result['fundamental'] = DB::table('stock_trades')
                    ->select('sector', 'workingcapital', 'netincomeaftertax', 'debtassetratio', 'priceearningratio', 'netprofitmargin', 'returnonequity', 'dividendyield')
                    ->where('symbol', '=', $data['symbol'])
                    ->get()
                    ->toArray();

                /** check if not empty. */
                if ($result['fundamental']) {
                    /** then call helper to add standard format. */
                    $result['fundamental'] = $this->helpers(['purpose' => 'format', 'source' => $result['fundamental']]);
                } else {
                    /** set to empty array. */
                    $result['fundamental'] = [];
                }
            }
        } else {
            return response(['message' => 'Something went wrong.', 'data' => $stock_average, 'show_message' => true], 401);
        }

        /** Change update to human readable using carbon. */
        $updated = Carbon::parse($stock->updated_at)->diffForHumans();

        /** Return something. */
        return response(['message' => 'Please wait while we are processing your request.', 'technical' => $result['technical'], 'fundamental' => $result['fundamental'], 'show_message' => true, 'updated' => $updated], 200);
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
