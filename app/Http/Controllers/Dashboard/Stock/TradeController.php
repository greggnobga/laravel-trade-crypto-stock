<?php

namespace App\Http\Controllers\Dashboard\Stock;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TradeController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function init(Request $request) {
        /** check if request contains method equal to post. */
        if ($request->method() === 'POST') {
            /** forward insert command. */
            if ($request->input('table') === 'trade' && $request->input('statement') === 'store') {
                return $this->store(['table' => $request->input('table'), 'input' => $request->input('input')]);
            }
        }
        /** check if request contains method equal to get. */
        if ($request->method() === 'GET') {
            /** forward blue command. */
            if ($request->input('section') === 'blue') {
                return $this->blue();
            }
            /** forward blue command. */
            if ($request->input('section') === 'common') {
                return $this->common();
            }
        }
    }

    /**
     * Fetch blue chip stocks.
     */
    public function blue() {

        /** check record. */
        $check = DB::table('stock_trades')
            ->select('symbol')
            ->where('symbol', 'PSE')
            ->first();

        if (!is_null($check)) {
            /** Blue chip default. */
            $blue = [
                "0" => "AC",
                "1" => "AEV",
                "2" => "AGI",
                "3" => "ALI",
                "4" => "AP",
                "5" => "BDO",
                "6" => "BLOOM",
                "7" => "BPI",
                "8" => "DMC",
                "9" => "FGEN",
                "10" => "GLO",
                "11" => "GTCAP",
                "12" => "ICT",
                "13" => "JFC",
                "14" => "JGS",
                "15" => "LTG",
                "16" => "MBT",
                "17" => "MEG",
                "18" => "MER",
                "19" => "MPI",
                "20" => "PGOLD",
                "21" => "RLC",
                "22" => "RRHI",
                "23" => "SECB",
                "24" => "SM",
                "25" => "SMC",
                "26" => "SMPH",
                "27" => "TEL",
                "28" => "URC"
            ];

            /** Save to database. */
            foreach ($blue as $chip) {
                /** Check if record exist. */
                $check = DB::table('stock_blues')
                    ->select('symbol')
                    ->where('symbol', '=', $chip)
                    ->first();

                if (is_null($check)) {
                    /** If its not. */
                    DB::table('stock_blues')
                        ->where('userid', '=', Auth::id())
                        ->where('symbol', '=', $chip)
                        ->insert([
                            'userid' => Auth::id(),
                            'symbol' => $chip,
                            'created_at' => date('Y-m-d H:i:s'),
                            'updated_at' => date('Y-m-d H:i:s'),
                        ]);
                }
            }

            /** Fecth all record in stock blue table. */
            $record = DB::table('stock_blues')
                ->select('symbol')
                ->where('userid', Auth::id())
                ->get()
                ->toArray();

            if (!is_null($record)) {
                foreach ($record as $key => $value) {
                    /** Get additional stock data. */
                    $stock = DB::table('stock_trades')
                        ->select('symbol', 'price', 'value', 'pricerange', 'totalassets', 'netincomeaftertax', 'debtequityratio', 'dividendyield')
                        ->where('symbol', $value->symbol)
                        ->first();
                    /** Push to record array. */
                    $record[$key] = $stock;
                }
            } else {
                return response(['message' => 'No record found.'], 200);
            }

            /** sort collection based on desired key. */
            $sorted = collect($record)->sortByDesc(function ($item) {
                return $item->netincomeaftertax;
            });

            /** resequence array keys. */
            $stocks = array_values($sorted->toArray());

            /** Call helper function. */
            $format = $this->helpers(['purpose' => 'format', 'source' => $stocks]);

            /** Return something. */
            return response(['message' => 'Process completed.', 'stocks' => $format], 200);
        } else {
            /** return something. */
            return array('message' => 'There was no entry in the database.');
        }
    }

    /**
     * Fetch stocks.
     */
    public function common() {
        /** repository. */
        $result = [];
        /** check record. */
        $check = DB::table('stock_trades')
            ->select('symbol')
            ->where('symbol', '=', 'PSE')
            ->first();

        if (!is_null($check)) {
            /** create stock list. */
            $items = DB::table('stock_trades')
                ->select('symbol', 'price', 'value', 'pricerange', 'totalassets', 'netincomeaftertax', 'debtequityratio', 'dividendyield')
                ->where('edge', '>', 0)
                ->orderBy('netincomeaftertax', 'desc')
                ->get();

            /** ignore indexes. */
            foreach ($items as $key => $value) {
                switch ($value->symbol) {
                    case 'PSEi':
                        break;
                    case 'ALL':
                        break;
                    case 'FIN':
                        break;
                    case 'IND':
                        break;
                    case 'HDG':
                        break;
                    case 'PRO':
                        break;
                    case 'SVC':
                        break;
                    case 'M-O':
                        break;
                    default:
                        $result[$key] = $value;
                }
            }

            /** resequence array keys. */
            $stocks = array_values($result);

            /** Call helper function. */
            $format = $this->helpers(['purpose' => 'format', 'source' => $stocks]);

            /** return something. */
            return array('message' => 'Processed and displayed are all potential stocks that could be listed on the PSE.', 'stocks' => $format);
        } else {
            /** return something. */
            return array('message' => 'There was no entry in the database.');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($data) {
        /** fetch symbol and name. */
        $symbol = DB::table('stock_trades')
            ->select('symbol', 'name')
            ->where('symbol', $data['input']['symbol'])
            ->get();

        /** fetch edge id. */
        $edge_id = collect($this->edge())->firstWhere('symbol', $data['input']['symbol']);
        if (is_null($edge_id)) {
            $edge_id['edge'] = 0;
        }

        /** insert with appropriate data. */
        if ($symbol->isEmpty()) {
            $insert = DB::table('stock_trades')
                ->insert([
                    'name' => strip_tags($data['input']['name']),
                    'symbol' => strip_tags($data['input']['symbol']),
                    'edge' => strip_tags($edge_id['edge']),
                    'price' => strip_tags($data['input']['price']),
                    'change' => strip_tags($data['input']['change']),
                    'volume' => strip_tags($data['input']['volume']),
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);
            if ($insert) {
                return ['message' => $data['input']['name'] . ' has been added to the database.'];
            }
        } else {
            /** forward to update instead. */
            return $this->update($data, $edge_id);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($data, $edge_id) {
        if ($data['table'] === 'trade') {
            /** run update query.*/
            $update = DB::table('stock_trades')
                ->where('symbol', '=', $data['input']['symbol'])
                ->update([
                    'name' => strip_tags($data['input']['name']),
                    'symbol' => strip_tags($data['input']['symbol']),
                    'edge' => strip_tags($edge_id['edge']),
                    'price' => strip_tags($data['input']['price']),
                    'change' => strip_tags($data['input']['change']),
                    'volume' => strip_tags($data['input']['volume']),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);
            /** if update not empty.*/
            if ($update) {
                DB::table('stock_trades')
                    ->select('id', 'edge', 'created_at as date', 'name', 'symbol', 'price', 'change', 'volume')
                    ->where('symbol', '=', $data['input']['symbol'])
                    ->get();
                return ['message' => 'The ' . $data['input']['name'] . ' information was successfully updated.'];
            } else {
                return ['message' => 'No modifications were made to the' . $data['input']['name'] . ' data.'];
            }
        }
    }

    /**
     * Helper function.
     */
    private function helpers($data) {
        if ($data['purpose'] === 'format') {
            /** return variable. */
            $return = [];
            /** loop through. */
            foreach ($data['source'] as $key => $value) {
                foreach ($value as $k => $v) {
                    if (preg_match('/[a-zA-Z]+/', $v)) {
                        $return[$key][$k] = $v;
                    }
                    if (preg_match('/[0-9]+/', $v)) {
                        if ($k === 'symbol') {
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

    /**
     * Edge function.
     */
    private function edge() {
        return [
            ['symbol' => '2GO', 'edge' => 29],
            ['symbol' => 'HOUSE', 'edge' => 626],
            ['symbol' => 'BRN', 'edge' => 13],
            ['symbol' => 'ANS', 'edge' => 14],
            ['symbol' => 'ABS', 'edge' => 114],
            ['symbol' => 'ABSP', 'edge' => 15],
            ['symbol' => 'AGF', 'edge' => 643],
            ['symbol' => 'APC', 'edge' => 177],
            ['symbol' => 'ATN', 'edge' => 56],
            ['symbol' => 'ABA', 'edge' => 174],
            ['symbol' => 'AEV', 'edge' => 16],
            ['symbol' => 'AP', 'edge' => 609],
            ['symbol' => 'AR', 'edge' => 33],
            ['symbol' => 'ACE', 'edge' => 48],
            ['symbol' => 'ANI', 'edge' => 619],
            ['symbol' => 'AGI', 'edge' => 212],
            ['symbol' => 'FOOD', 'edge' => 602],
            ['symbol' => 'ABC', 'edge' => 51],
            ['symbol' => 'ACR', 'edge' => 121],
            ['symbol' => 'ALHI', 'edge' => 612],
            ['symbol' => 'APO', 'edge' => 52],
            ['symbol' => 'APX', 'edge' => 178],
            ['symbol' => 'APL', 'edge' => 638],
            ['symbol' => 'ARA', 'edge' => 38],
            ['symbol' => 'ALCO', 'edge' => 172],
            ['symbol' => 'AAA', 'edge' => 55],
            ['symbol' => 'AUB', 'edge' => 641],
            ['symbol' => 'ABG', 'edge' => 176],
            ['symbol' => 'ATI', 'edge' => 53],
            ['symbol' => 'AT', 'edge' => 34],
            ['symbol' => 'AB', 'edge' => 19],
            ['symbol' => 'AC', 'edge' => 57],
            ['symbol' => 'ALI', 'edge' => 180],
            ['symbol' => 'BLFI', 'edge' => 31],
            ['symbol' => 'BDO', 'edge' => 260],
            ['symbol' => 'BH', 'edge' => 62],
            ['symbol' => 'BPI', 'edge' => 234],
            ['symbol' => 'BSC', 'edge' => 60],
            ['symbol' => 'BEL', 'edge' => 21],
            ['symbol' => 'BC', 'edge' => 108],
            ['symbol' => 'BCOR', 'edge' => 9],
            ['symbol' => 'BLOOM', 'edge' => 49],
            ['symbol' => 'BMM', 'edge' => 181],
            ['symbol' => 'BHI', 'edge' => 63],
            ['symbol' => 'BKR', 'edge' => 66],
            ['symbol' => 'COL', 'edge' => 601],
            ['symbol' => 'CAL', 'edge' => 636],
            ['symbol' => 'CEB', 'edge' => 624],
            ['symbol' => 'CHI', 'edge' => 110],
            ['symbol' => 'CPV', 'edge' => 182],
            ['symbol' => 'CHP', 'edge' => 662],
            ['symbol' => 'CAT', 'edge' => 183],
            ['symbol' => 'CEU', 'edge' => 223],
            ['symbol' => 'CNPF', 'edge' => 652],
            ['symbol' => 'CPM', 'edge' => 621],
            ['symbol' => 'CPG', 'edge' => 189],
            ['symbol' => 'CIP', 'edge' => 22],
            ['symbol' => 'CHIB', 'edge' => 184],
            ['symbol' => 'TECH', 'edge' => 630],
            ['symbol' => 'LAND', 'edge' => 209],
            ['symbol' => 'CDC', 'edge' => 39],
            ['symbol' => 'CSB', 'edge' => 228],
            ['symbol' => 'COAL', 'edge' => 637],
            ['symbol' => 'CIC', 'edge' => 648],
            ['symbol' => 'CA', 'edge' => 213],
            ['symbol' => 'COSCO', 'edge' => 50],
            ['symbol' => 'CROWN', 'edge' => 657],
            ['symbol' => 'CEI', 'edge' => 186],
            ['symbol' => 'CYBR', 'edge' => 67],
            ['symbol' => 'DNL', 'edge' => 639],
            ['symbol' => 'DFNN', 'edge' => 187],
            ['symbol' => 'DMC', 'edge' => 188],
            ['symbol' => 'DAVIN', 'edge' => 2],
            ['symbol' => 'DMPL', 'edge' => 642],
            ['symbol' => 'DWC', 'edge' => 647],
            ['symbol' => 'DIZ', 'edge' => 68],
            ['symbol' => 'DD', 'edge' => 651],
            ['symbol' => 'EEI', 'edge' => 71],
            ['symbol' => 'EW', 'edge' => 634],
            ['symbol' => 'ECP', 'edge' => 70],
            ['symbol' => 'EMP', 'edge' => 632],
            ['symbol' => 'ELI', 'edge' => 190],
            ['symbol' => 'EDC', 'edge' => 603],
            ['symbol' => 'EURO', 'edge' => 219],
            ['symbol' => 'EVER', 'edge' => 191],
            ['symbol' => 'EIBA', 'edge' => 171],
            ['symbol' => 'FJP', 'edge' => 225],
            ['symbol' => 'FEU', 'edge' => 25],
            ['symbol' => 'FDC', 'edge' => 75],
            ['symbol' => 'FLI', 'edge' => 226],
            ['symbol' => 'FFI', 'edge' => 196],
            ['symbol' => 'FYN', 'edge' => 80],
            ['symbol' => 'FAF', 'edge' => 81],
            ['symbol' => 'FGEN', 'edge' => 600],
            ['symbol' => 'FMETF', 'edge' => 649],
            ['symbol' => 'FPH', 'edge' => 197],
            ['symbol' => 'FPI', 'edge' => 220],
            ['symbol' => 'GEO', 'edge' => 198],
            ['symbol' => 'GMAP', 'edge' => 611],
            ['symbol' => 'GMA7', 'edge' => 610],
            ['symbol' => 'GTCAP', 'edge' => 633],
            ['symbol' => 'GSMI', 'edge' => 94],
            ['symbol' => 'FNI', 'edge' => 224],
            ['symbol' => 'GERI', 'edge' => 193],
            ['symbol' => 'PORT', 'edge' => 129],
            ['symbol' => 'GLO', 'edge' => 69],
            ['symbol' => 'HVN', 'edge' => 661],
            ['symbol' => 'GPH', 'edge' => 221],
            ['symbol' => 'GREEN', 'edge' => 132],
            ['symbol' => 'TUGS', 'edge' => 644],
            ['symbol' => 'HLCM', 'edge' => 211],
            ['symbol' => 'HI', 'edge' => 82],
            ['symbol' => 'I', 'edge' => 613],
            ['symbol' => 'EG', 'edge' => 623],
            ['symbol' => 'IPM', 'edge' => 4],
            ['symbol' => 'IRC', 'edge' => 84],
            ['symbol' => 'ISM', 'edge' => 36],
            ['symbol' => 'IMP', 'edge' => 201],
            ['symbol' => 'IMI', 'edge' => 622],
            ['symbol' => 'ICT', 'edge' => 83],
            ['symbol' => 'ION', 'edge' => 203],
            ['symbol' => 'IS', 'edge' => 204],
            ['symbol' => 'IDC', 'edge' => 660],
            ['symbol' => 'JGS', 'edge' => 210],
            ['symbol' => 'JAS', 'edge' => 134],
            ['symbol' => 'JFC', 'edge' => 86],
            ['symbol' => 'JOH', 'edge' => 261],
            ['symbol' => 'KPH', 'edge' => 87],
            ['symbol' => 'KEP', 'edge' => 88],
            ['symbol' => 'LBC', 'edge' => 236],
            ['symbol' => 'LMG', 'edge' => 205],
            ['symbol' => 'LTG', 'edge' => 12],
            ['symbol' => 'LC', 'edge' => 98],
            ['symbol' => 'LFM', 'edge' => 227],
            ['symbol' => 'LPZ', 'edge' => 61],
            ['symbol' => 'LSC', 'edge' => 115],
            ['symbol' => 'MED', 'edge' => 126],
            ['symbol' => 'MJIC', 'edge' => 24],
            ['symbol' => 'MRC', 'edge' => 131],
            ['symbol' => 'MHC', 'edge' => 206],
            ['symbol' => 'MVC', 'edge' => 100],
            ['symbol' => 'MACAY', 'edge' => 145],
            ['symbol' => 'MAC', 'edge' => 106],
            ['symbol' => 'MFIN', 'edge' => 263],
            ['symbol' => 'MBC', 'edge' => 117],
            ['symbol' => 'MB', 'edge' => 1],
            ['symbol' => 'MER', 'edge' => 118],
            ['symbol' => 'MJC', 'edge' => 102],
            ['symbol' => 'MA', 'edge' => 119],
            ['symbol' => 'MWC', 'edge' => 270],
            ['symbol' => 'MFC', 'edge' => 120],
            ['symbol' => 'MARC', 'edge' => 175],
            ['symbol' => 'MAXS', 'edge' => 135],
            ['symbol' => 'MWIDE', 'edge' => 627],
            ['symbol' => 'MEG', 'edge' => 127],
            ['symbol' => 'MCP', 'edge' => 202],
            ['symbol' => 'MAH', 'edge' => 3],
            ['symbol' => 'MGH', 'edge' => 192],
            ['symbol' => 'MPI', 'edge' => 604],
            ['symbol' => 'MRSGI', 'edge' => 659],
            ['symbol' => 'MBT', 'edge' => 128],
            ['symbol' => 'MG', 'edge' => 105],
            ['symbol' => 'NRCP', 'edge' => 606],
            ['symbol' => 'NXGEN', 'edge' => 179],
            ['symbol' => 'NI', 'edge' => 103],
            ['symbol' => 'NIKL', 'edge' => 625],
            ['symbol' => 'NOW', 'edge' => 264],
            ['symbol' => 'OM', 'edge' => 207],
            ['symbol' => 'ORE', 'edge' => 616],
            ['symbol' => 'OPM', 'edge' => 43],
            ['symbol' => 'PAL', 'edge' => 20],
            ['symbol' => 'PHEN', 'edge' => 233],
            ['symbol' => 'PCP', 'edge' => 99],
            ['symbol' => 'TEL', 'edge' => 6],
            ['symbol' => 'TFC', 'edge' => 8],
            ['symbol' => 'PXP', 'edge' => 628],
            ['symbol' => 'LOTO', 'edge' => 605],
            ['symbol' => 'PA', 'edge' => 109],
            ['symbol' => 'PMPC', 'edge' => 104],
            ['symbol' => 'PAX', 'edge' => 194],
            ['symbol' => 'PIP', 'edge' => 617],
            ['symbol' => 'PERC', 'edge' => 578],
            ['symbol' => 'PCOR', 'edge' => 136],
            ['symbol' => 'WEB', 'edge' => 122],
            ['symbol' => 'DNA', 'edge' => 620],
            ['symbol' => 'PHC', 'edge' => 97],
            ['symbol' => 'PX', 'edge' => 137],
            ['symbol' => 'PBC', 'edge' => 208],
            ['symbol' => 'PBB', 'edge' => 640],
            ['symbol' => 'PHES', 'edge' => 138],
            ['symbol' => 'H2O', 'edge' => 631],
            ['symbol' => 'PNB', 'edge' => 139],
            ['symbol' => 'PNC', 'edge' => 7],
            ['symbol' => 'PRC', 'edge' => 141],
            ['symbol' => 'RLT', 'edge' => 40],
            ['symbol' => 'PSB', 'edge' => 142],
            ['symbol' => 'SEVN', 'edge' => 143],
            ['symbol' => 'PTT', 'edge' => 76],
            ['symbol' => 'PTC', 'edge' => 144],
            ['symbol' => 'PHN', 'edge' => 107],
            ['symbol' => 'PNX', 'edge' => 608],
            ['symbol' => 'APVI', 'edge' => 655],
            ['symbol' => 'SHLPH', 'edge' => 663],
            ['symbol' => 'PHA', 'edge' => 148],
            ['symbol' => 'PLC', 'edge' => 158],
            ['symbol' => 'PRIM', 'edge' => 30],
            ['symbol' => 'POPI', 'edge' => 26],
            ['symbol' => 'PMT', 'edge' => 111],
            ['symbol' => 'PRMX', 'edge' => 214],
            ['symbol' => 'PPC', 'edge' => 150],
            ['symbol' => 'PGOLD', 'edge' => 629],
            ['symbol' => 'RFM', 'edge' => 77],
            ['symbol' => 'REG', 'edge' => 153],
            ['symbol' => 'RCB', 'edge' => 232],
            ['symbol' => 'RLC', 'edge' => 195],
            ['symbol' => 'RRHI', 'edge' => 646],
            ['symbol' => 'ROCK', 'edge' => 635],
            ['symbol' => 'ROX', 'edge' => 64],
            ['symbol' => 'RCI', 'edge' => 54],
            ['symbol' => 'SBS', 'edge' => 658],
            ['symbol' => 'SM', 'edge' => 599],
            ['symbol' => 'SMPH', 'edge' => 112],
            ['symbol' => 'SOC', 'edge' => 161],
            ['symbol' => 'SPC', 'edge' => 237],
            ['symbol' => 'SSI', 'edge' => 654],
            ['symbol' => 'STI', 'edge' => 222],
            ['symbol' => 'SMC', 'edge' => 154],
            ['symbol' => 'PF', 'edge' => 151],
            ['symbol' => 'SPM', 'edge' => 156],
            ['symbol' => 'SECB', 'edge' => 32],
            ['symbol' => 'SCC', 'edge' => 157],
            ['symbol' => 'PIZZA', 'edge' => 664],
            ['symbol' => 'SHNG', 'edge' => 218],
            ['symbol' => 'SGI', 'edge' => 160],
            ['symbol' => 'SPH', 'edge' => 614],
            ['symbol' => 'SLI', 'edge' => 41],
            ['symbol' => 'STR', 'edge' => 147],
            ['symbol' => 'STN', 'edge' => 164],
            ['symbol' => 'SLF', 'edge' => 78],
            ['symbol' => 'SUN', 'edge' => 73],
            ['symbol' => 'SRDC', 'edge' => 479],
            ['symbol' => 'SFI', 'edge' => 165],
            ['symbol' => 'SGP', 'edge' => 166],
            ['symbol' => 'T', 'edge' => 163],
            ['symbol' => 'PSE', 'edge' => 478],
            ['symbol' => 'OV', 'edge' => 45],
            ['symbol' => 'TFHI', 'edge' => 650],
            ['symbol' => 'TAPET', 'edge' => 653],
            ['symbol' => 'TBGI', 'edge' => 269],
            ['symbol' => 'RWM', 'edge' => 645],
            ['symbol' => 'UNI', 'edge' => 92],
            ['symbol' => 'UBP', 'edge' => 167],
            ['symbol' => 'UPM', 'edge' => 168],
            ['symbol' => 'URC', 'edge' => 124],
            ['symbol' => 'UW', 'edge' => 170],
            ['symbol' => 'V', 'edge' => 65],
            ['symbol' => 'VMC', 'edge' => 123],
            ['symbol' => 'VLL', 'edge' => 607],
            ['symbol' => 'VITA', 'edge' => 28],
            ['symbol' => 'VVT', 'edge' => 79],
            ['symbol' => 'VUL', 'edge' => 46],
            ['symbol' => 'WPI', 'edge' => 173],
            ['symbol' => 'WIN', 'edge' => 90],
            ['symbol' => 'WLCON', 'edge' => 665],
            ['symbol' => 'X', 'edge' => 656],
            ['symbol' => 'ZHI', 'edge' => 89],
            ['symbol' => 'IPO', 'edge' => 205],
            ['symbol' => 'CLI', 'edge' => 668],
            ['symbol' => 'EAGLE', 'edge' => 667],
            ['symbol' => 'MRP', 'edge' => 202],
            ['symbol' => 'PPG', 'edge' => 653],
            ['symbol' => 'SSP', 'edge' => 655],
            ['symbol' => 'CLC', 'edge' => 669],
            ['symbol' => 'FB', 'edge' => 151],
            ['symbol' => 'FERRO', 'edge' => 643],
            ['symbol' => 'DMW', 'edge' => 671],
            ['symbol' => 'DELM', 'edge' => 642],
            ['symbol' => 'SPNEC', 'edge' => 688],
            ['symbol' => 'FILRT', 'edge' => 683],
            ['symbol' => 'CREIT', 'edge' => 691],
            ['symbol' => 'ALLDY', 'edge' => 686],
            ['symbol' => 'BALAI', 'edge' => 697],
            ['symbol' => 'CTS', 'edge' => 693],
            ['symbol' => 'FCG', 'edge' => 689],
            ['symbol' => 'CNVRG', 'edge' => 680],
            ['symbol' => 'DITO', 'edge' => 36],
            ['symbol' => 'EMI', 'edge' => 632],
            ['symbol' => 'ACEN  ', 'edge' => 233],
            ['symbol' => 'MONDE', 'edge' => 682],
            ['symbol' => 'ASLAG', 'edge' => 694],
            ['symbol' => 'FRUIT', 'edge' => 676],
            ['symbol' => 'HOME', 'edge' => 674],
            ['symbol' => 'PHR', 'edge' => 631],
            ['symbol' => 'MM', 'edge' => 677],
            ['symbol' => 'KEEPR', 'edge' => 2],
            ['symbol' => 'DDMPR', 'edge' => 681],
            ['symbol' => 'MEDIC', 'edge' => 687],
            ['symbol' => 'ALLHC', 'edge' => 26],
            ['symbol' => 'RCR', 'edge' => 684],
            ['symbol' => 'C', 'edge' => 669],
            ['symbol' => 'VREIT', 'edge' => 695],
            ['symbol' => 'AREIT', 'edge' => 679],
            ['symbol' => 'MREIT', 'edge' => 685],
            ['symbol' => 'INFRA', 'edge' => 84],
            ['symbol' => 'ACEX', 'edge' => 653],
            ['symbol' => 'AXLM', 'edge' => 673],
            ['symbol' => 'BNCOM', 'edge' => 692],
            ['symbol' => 'HTI', 'edge' => 690],
            ['symbol' => 'ACEN', 'edge' => 233],
            ['symbol' => 'KPPI', 'edge' => 672],
            ['symbol' => 'LODE', 'edge' => 37],
            ['symbol' => 'PLUS', 'edge' => 96],
            ['symbol' => 'LPC', 'edge' => 698],
            ['symbol' => 'ALTER', 'edge' => 701],
            ['symbol' => 'ENEX', 'edge' => 653],
            ['symbol' => 'PREIT', 'edge' => 699],
            ['symbol' => 'UPSON', 'edge' => 700],
        ];
    }
}
