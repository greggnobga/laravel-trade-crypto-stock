<?php
namespace App\Http\Controllers\Dashboard\Crypto;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class GameController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function init(Request $request) {
        /** check if request contains method equal to post. */
        if ($request->method() === 'POST') {
            if ($request->input('table') === 'game' && $request->input('statement') === 'insert') {
                return $this->store(['table' => 'game', 'input' => $request->input('input')]);
            }
            if ($request->input('table') === 'game' && $request->input('statement') === 'update') {
                return $this->update(['table' => 'game', 'input' => $request->input('input')]);
            }
        }

        /** check if request contains method equal to get. */
        if ($request->method() === 'GET') {
            if ($request->input('table') === 'game') {
                $game = DB::table('games')
                    ->select('id', 'title', 'genre', 'platform', 'blockchain', 'status', 'earn', 'free', 'rating')
                    ->where('userid', '=', Auth::id())
                    ->get();

                /** add action. */
                $result = [];
                foreach ($game as $key => $value) {
                    $item = collect($value);
                    $result[$key] = $item->put('action', 'Update Destroy');
                }
                /** return. */
                return ['status' => true, 'sql' => 'select', 'coin' => $result];
            }
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($data) {
        if ($data['table'] === 'game') {
            /** insert with appropriate data. */
            $insert = DB::table('games')
                ->insertGetId([
                    'userid' => Auth::id(),
                    'title' => strip_tags($data['input']['title']),
                    'genre' => strip_tags($data['input']['genre']),
                    'platform' => strip_tags($data['input']['platform']),
                    'blockchain' => strip_tags($data['input']['blockchain']),
                    'status' => strip_tags($data['input']['status']),
                    'earn' => strip_tags($data['input']['earn']),
                    'free' => strip_tags($data['input']['free']),
                    'rating' => strip_tags($data['input']['rating']),
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);

            /** retrieve newly created record. */
            if ($insert) {
                $coins = DB::table('games')
                    ->select('id', 'title', 'genre', 'platform', 'blockchain', 'status', 'earn', 'free', 'rating')
                    ->where('id', '=', $insert)
                    ->where('userid', '=', Auth::id())
                    ->get();

                /** add action. */
                $result = [];
                foreach ($coins as $key => $value) {
                    $item = collect($value);
                    $result[$key] = $item->put('action', 'Update Destroy');
                }

                /** return if true. */
                return ['status' =>  true, 'sql' => 'select', 'message' => $data['input']['title'] . ' has been added to the database.', 'coin' => $result];
            } else {
                /** return if false. */
                return ['status' =>  false, 'sql' => 'select', 'message' => 'No changes made.', 'coin' => '' ];
            }
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($data) {
        if ($data['table'] === 'game') {
            /** run update query.*/
            $update = DB::table('games')
                ->where('id', $data['input']['id'])
                ->where('userid', Auth::id())
                ->update([
                    'title' => strip_tags($data['input']['title']),
                    'genre' => strip_tags($data['input']['genre']),
                    'platform' => strip_tags($data['input']['platform']),
                    'blockchain' => strip_tags($data['input']['blockchain']),
                    'status' => strip_tags($data['input']['status']),
                    'earn' => strip_tags($data['input']['earn']),
                    'free' => strip_tags($data['input']['free']),
                    'rating' => strip_tags($data['input']['rating']),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);
            if ($update) {
                $coins = DB::table('games')
                    ->select('id', 'title', 'genre', 'platform', 'blockchain', 'status', 'earn', 'free', 'rating')
                    ->where('id', '=', $data['input']['id'])
                    ->where('userid', '=', Auth::id())
                    ->get();
                return ['status' =>  true, 'sql' => 'update', 'message' => $data['input']['title'] . ' successfully updated.', 'coin' => $coins];
            } else {
                return ['status' =>  false, 'sql' => 'update', 'message' => 'No changes made.', 'coin' => '' ];
            }
        }
    }
}
