<?php
namespace App\Http\Controllers\Dashboard\Crypto;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class MoonController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function init(Request $request)
    {
        /** check if request contains method equal to post. */
        if ($request->method() === 'POST') {
            if ($request->input('table') === 'moon' && $request->input('statement') === 'insert') {
                return $this->store(['table'=> 'moon', 'input' => $request->input('input')]);
            }
            if ($request->input('table') === 'moon' && $request->input('statement') === 'update') {
                return $this->update(['table'=> 'moon', 'input' => $request->input('input')]);
            }
            if ($request->input('table') === 'moon' && $request->input('statement') === 'destroy') {
                return $this->destroy(['table'=> 'moon', 'input' => $request->input('input')]);
            }
        }
        if ($request->method() === 'GET') {
            if ($request->input('table') === 'moon') {
                /** moon data. */
                $moon = DB::table('crypto_moons')
                    ->select('id', 'name', 'coin', 'description', 'zone', 'website')
                    ->where('userid', '=', Auth::id())
                    ->get();
                /** add action. */
                $result = [];
                foreach ($moon as $key => $value) {
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
        if ($data['table'] === 'moon') {
            $unique = DB::table('crypto_moons')
                ->select('coin')
                ->where('coin', '=', $data['input']['coin'])
                ->where('userid', '=', Auth::id())
                ->first();
            if (!$unique) {
                /** insert with appropriate data. */
                $insert = DB::table('crypto_moons')
                    ->insertGetId([
                        'userid' => Auth::id(),
                        'name' => strip_tags($data['input']['name']),
                        'coin' => strip_tags($data['input']['coin']),
                        'description' => strip_tags($data['input']['description']),
                        'zone' => strip_tags($data['input']['zone']),
                        'website' => strip_tags($data['input']['website']),
                        'created_at' => date('Y-m-d H:i:s'),
                        'updated_at' => date('Y-m-d H:i:s'),
                    ]);
                if ($insert) {
                    $moon = DB::table('crypto_moons')
                        ->select('id', 'name', 'coin', 'description', 'zone', 'website')
                        ->where('id', '=', $insert)
                        ->where('userid', '=', Auth::id())
                        ->get();
                    /** add action. */
                    $result = [];
                    foreach ($moon as $key => $value) {
                        $item = collect($value);
                        $result[$key] = $item->put('action', 'Update Destroy');
                    }
                    return ['status' =>  true, 'sql' => 'select', 'message' => $moon[0]->name . ' has been added to the database.', 'coin' => $result];
                }
            } else {
                return ['status' =>  false, 'message' => 'Record already exist.', 'coin' => $unique ];
            }
        }
    }
    /**
     * Store a newly created resource in storage.
     */
    public function update($data) {
        if ($data['table'] === 'moon') {
            /** run update query.*/
            $update = DB::table('crypto_moons')
                ->where('id', $data['input']['id'])
                ->where('userid', Auth::id())
                ->update([
                    'name' => strip_tags($data['input']['name']),
                    'coin' => strip_tags($data['input']['coin']),
                    'description' => strip_tags($data['input']['description']),
                    'zone' => strip_tags($data['input']['zone']),
                    'website' => strip_tags($data['input']['website']),
                ]);
            if ($update) {
                $coins = DB::table('crypto_moons')
                    ->select('id', 'name', 'coin', 'description', 'zone', 'website')
                    ->where('id', '=', $data['input']['id'])
                    ->where('userid', '=', Auth::id())
                    ->get();
                return ['status' =>  true, 'sql' => 'update', 'message' => $data['input']['name'] . ' successfully updated.', 'coin' => $coins];
            } else {
                return ['status' =>  false, 'message' => 'No changes made.', 'coin' => [] ];
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($data) {
        if ($data['table'] === 'moon') {
            $delete = DB::table('crypto_moons')
                ->where('id', '=', $data['input']['id'])
                ->where('userid', '=', Auth::id())
                ->delete();
            if ($delete) {
                return ['status' =>  true, 'sql' => 'destroy', 'message' => $data['input']['name'] . ' has been deleted.', 'coin' => $data['input']['id']];
            } else {
                return ['status' =>  false, 'message' => 'Unable to delete record.', 'coin' => [] ];
            }
        }
    }
}
