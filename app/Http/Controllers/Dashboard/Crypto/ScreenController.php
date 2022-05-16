<?php
namespace App\Http\Controllers\Dashboard\Crypto;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class ScreenController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function init(Request $request) {
        /** check if request contains method equal to post. */
        if ($request->method() === 'POST') {
            if ($request->input('table') === 'screen' && $request->input('statement') === 'insert') {
                return $this->store(['table' => 'screen', 'input' => $request->input('input')]);
            }
            if ($request->input('table') === 'screen' && $request->input('statement') === 'update') {
                return $this->update(['table' => 'screen', 'input' => $request->input('input')]);
            }
            if ($request->input('table') === 'screen' && $request->input('statement') === 'destroy') {
                return $this->destroy(['table' => 'screen', 'input' => $request->input('input')]);
            }
        }

        /** check if request contains method equal to get. */
        if ($request->method() === 'GET') {
            if ($request->input('table') === 'screen') {
                $screen = DB::table('crypto_screens')
                    ->select('id', 'api', 'coin', 'price', 'market', 'volume', 'change')
                    ->where('userid', '=', Auth::id())
                    ->get();

                /** format. */
                $result = $this->helpers(['purpose' => 'format', 'source' => 'screen', 'coin' => $screen]);

                /** return. */
                return ['status' => true, 'sql' => 'select', 'coin' => $result];
            }
        }
        /** return. */
        return true;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($data) {
        if ($data['table'] === 'screen') {
            $check = DB::table('crypto_screens')
                ->select('id', 'api', 'coin', 'price', 'market', 'volume', 'change')
                ->where('api', '=', $data['input']['api'])
                ->where('userid', '=', Auth::id())
                ->first();
            if (!$check) {
                /** insert with appropriate data. */
                $insert = DB::table('crypto_screens')
                    ->insertGetId([
                        'userid' => Auth::id(),
                        'api' => strip_tags($data['input']['api']),
                        'coin' => strip_tags($data['input']['coin']),
                        'price' => strip_tags($data['input']['price']),
                        'market' => strip_tags($data['input']['market']),
                        'volume' => strip_tags($data['input']['volume']),
                        'change' => strip_tags($data['input']['change']),
                        'created_at' => date('Y-m-d H:i:s'),
                        'updated_at' => date('Y-m-d H:i:s'),
                    ]);

                /** retrieve newly created record. */
                if ($insert) {
                    $screen = DB::table('crypto_screens')
                        ->select('id', 'api', 'coin', 'price', 'market', 'volume', 'change')
                        ->where('id', '=', $insert)
                        ->where('userid', '=', Auth::id())
                        ->get();

                    /** add action. */
                    $result = $this->helpers(['purpose' => 'format', 'source' => 'screen', 'coin' => $screen]);

                    /** return if true. */
                    return ['status' =>  true, 'sql' => 'select', 'message' => $data['input']['coin'] . ' has been added to the database.', 'coin' => $result];
                }
            } else {
                /** return if false. */
                return ['status' =>  false, 'sql' => 'select', 'message' => 'Duplicate entry, check your screen list.', 'coin' => '' ];
            }
        }
        /** return. */
        return ['status' =>  false, 'sql' => 'update', 'message' => 'Insert operation unsuccessful.', 'coin' => '' ];

    }

    /**
     * Update the specified resource in storage.
     */
    public function update($data) {
        if ($data['table'] === 'screen') {
            /** run update query.*/
            $update = DB::table('crypto_screens')
                ->where('id', $data['input']['id'])
                ->where('userid', Auth::id())
                ->update([
                    'userid' => Auth::id(),
                    'api' => strip_tags($data['input']['api']),
                    'coin' => strip_tags($data['input']['coin']),
                    'price' => strip_tags($data['input']['price']),
                    'market' => strip_tags($data['input']['market']),
                    'volume' => strip_tags($data['input']['volume']),
                    'change' => strip_tags($data['input']['change']),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);

            if ($update) {
                $screen = DB::table('crypto_screens')
                    ->select('id', 'api', 'coin', 'price', 'market', 'volume', 'change')
                    ->where('id', '=', $data['input']['id'])
                    ->where('userid', '=', Auth::id())
                    ->get();

                /** add action. */
                $result = $this->helpers(['purpose' => 'format', 'source' => 'screen', 'coin' => $screen]);
                /** return. */
                return ['status' =>  true, 'sql' => 'update', 'message' => $data['input']['coin'] . ' successfully updated.', 'coin' => $result];
            }
        }

        /** return. */
        return ['status' =>  false, 'sql' => 'update', 'message' => 'Update operation unsuccessful.', 'coin' => '' ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($data) {
        if ($data['table'] === 'screen') {
            $delete = DB::table('crypto_screens')
                ->where('id', '=', $data['input']['id'])
                ->where('userid', '=', Auth::id())
                ->delete();
            if ($delete) {
                return ['status' =>  true, 'sql' => 'destroy', 'message' => $data['input']['coin'] . ' has been deleted.', 'coin' => $data['input']['id']];
            }
        }

        /** return. */
        return ['status' =>  false, 'sql' => 'destroy', 'message' => 'Destroy operation unsuccessful.', 'coin' => '' ];
    }

    private function helpers($data) {
        if ($data['purpose'] === 'format' && $data['source'] === 'screen') {
            $return = [];
            foreach ($data['coin'] as $key => $value) {
                $result = collect($value);
                foreach ($value as $k => $v) {
                    if ($k === 'price') {
                        $price = number_format($v, '2', '.', ',');
                        $result->forget('price');
                        $result->put('price', $price);
                    }

                    if ($k === 'market') {
                        $market = number_format($v, '2', '.', ',');
                        $result->forget('market');
                        $result->put('market', $market);
                    }

                    if ($k === 'volume') {
                        $volume = number_format($v, '2', '.', ',');
                        $result->forget('volume');
                        $result->put('volume', $volume);
                    }

                    if ($k === 'change') {
                        $change = number_format($v, '2', '.', ',');
                        $result->forget('change');
                        $result->put('change', $change);
                        $result->put('action', 'Update Destroy');
                    }
                }
                $return[$key] = $result;
            }
            return $return;
        }
    }
}
