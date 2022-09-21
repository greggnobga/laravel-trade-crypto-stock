<?php
namespace App\Http\Controllers\Dashboard\Stock;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class NoteController extends Controller {
     /**
   * Display a listing of the resource.
   */
    public function init(Request $request) {
         /** check if request contains method equal to post. */
        if ($request->method() === 'POST') {
            /** forward insert command. */
            if ($request->input('table') === 'note' && $request->input('statement') === 'insert') {
                return $this->store(['table' => 'note', 'input' => $request->input('input')]);
            }
            /** forward insert command. */
            if ($request->input('table') === 'note' && $request->input('statement') === 'update') {
                return $this->update(['table' => 'note', 'input' => $request->input('input')]);
            }
            /** forward destroy command. */
            if ($request->input('table') === 'note' && $request->input('statement') === 'destroy') {
                return $this->destroy(['table' => 'note', 'input' => $request->input('input')]);
            }
        }

         /** check if request contains method equal to get. */
        if ($request->method() === 'GET') {
            /** repository. */
           $response = [];
            /** forward get command. */
            if ($request->input('table') === 'note' && $request->input('statement') === 'select') {
                /** fetch unique sector. */
                $note =  DB::table('stock_notes')
                    ->select('id')
                    ->where('userid', '=', Auth::id())
                    ->get()
                    ->unique();
                if ($note->isNotEmpty()) {   
                    $notes = DB::table('stock_notes')
                        ->select('id', 'created_at as date', 'note', 'section')
                        ->where('userid', '=', Auth::id())
                        ->get();
                    $result = $this->helpers(['purpose' => 'format', 'source' => 'note', 'notes' => $notes]);
                    return ['status' =>  true, 'sql' => 'select', 'message' => 'Please wait while we are processing your request.', 'notes' => $result];
                } else {
                    return ['status' => false, 'sql' => 'select', 'message' => 'No record found.', 'notes' => ''];
                }
            }        
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($data) {
        if ($data['table'] === 'note') {
            $check = DB::table('stock_notes')
            ->select('id')
            ->where('userid', '=', Auth::id())
            ->where('id', '=', $data['input']['id'])
            ->get();

            if ($check->isEmpty()) {
                /** insert with appropriate data. */
                $insert = DB::table('stock_notes')
                ->insertGetId([
                    'userid' => Auth::id(),
                    'note' => strip_tags($data['input']['note']),
                    'section' => strip_tags($data['input']['section']),
                    'created_at' => date('Y-m-d H:i:s')
                ]);
                if ($insert) {
                    $note = DB::table('stock_notes')
                        ->select('id', 'created_at as date', 'note', 'section')
                        ->where('id', '=', $insert)
                        ->where('userid', '=', Auth::id())
                        ->get();
                    $result = $this->helpers(['purpose' => 'format', 'source' => 'note', 'notes' => $note]);
                    return ['status' =>  true, 'sql' => 'select', 'message' => ' Note has been added to the database.', 'notes' => $result];
                }
            }  else {
                /** forward to update instead. */
                return $this->update($data);
          }
        }
    }

        /**
     * Update the specified resource in storage.
     */
    public function update($data) {
      if ($data['table'] === 'note') {
          /** run update query.*/
          $update = DB::table('stock_notes')
              ->where('id', '=', $data['input']['id'])
              ->update([
                'userid' => Auth::id(),
                'note' => strip_tags($data['input']['note']),
                'section' => strip_tags($data['input']['section']),
                'updated_at' => date('Y-m-d H:i:s'),
              ]);
            /** if update not empty.*/
            if ($update) {
                $note = DB::table('stock_notes')
                    ->select('id', 'created_at as date', 'note', 'section')
                    ->where('id', '=', $data['input']['id'])
                    ->get();
                $result = $this->helpers(['purpose' => 'format', 'source' => 'note', 'notes' => $note]);
                return ['status' =>  true, 'sql' => 'update', 'message' => 'Note has been  successfully updated.', 'notes' => $result];
          }
      }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($data) {
        if ($data['table'] === 'note') {
            $delete = DB::table('stock_notes')
                ->where('id', '=', $data['input']['id'])
                ->where('userid', '=', Auth::id())
                ->delete();
            if ($delete) {
                return ['status' =>  true, 'sql' => 'destroy', 'message' => 'Note with ID #' . $data['input']['id'] . ' has been deleted.', 'notes' => $data['input']['id']];
            } else {
                return ['status' =>  false, 'sql' => 'destroy', 'message' => 'Your attempt to delete ' . $data['input']['id'] . ' could not be completed.' , 'notes' => '' ];
            }
        }
    }

    /**
     * Helper function,.
     */
    private function helpers($data) {
        if ($data['purpose'] === 'format' && $data['source'] === 'note') {
            $return = [];
            foreach ($data['notes'] as $key => $value) {
                $result = collect($value);
                foreach ($value as $k => $v) {
                    if ($k === 'section') {
                        $result->forget('section');
                        $result->put('section', ucwords($v));
                        $result->put('action', 'Update Destroy');
                    }
                }
                $return[$key] = $result;
              }
              return $return;
          }
    }
}
