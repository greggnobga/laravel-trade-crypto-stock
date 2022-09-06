<?php
namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Goutte\Client;

class PSEController extends Controller {
  /**
   * Define variables..
   */
  protected $client;

  /**
   * Set constructor.
   */
  public function __construct() {
        $this->client = new Client();
    }

  /**
    * Declare init function.
    */
  public function init(Request $request) {
    /** check if request contains method equal to post. */
    if ($request->method() === 'POST') {
        /** forward update command. */
        if ($request->input('section') === 'reports') {
          return $this->stockreports($request->all());
        }
        /** forward update command. */
        if ($request->input('section') === 'prices') {
          return $this->stockprices($request->all());
        }
        /** forward watchlist command. */
        if ($request->input('section') === 'sectors') {
            return $this->stocksectors($request->all());
        }
    }
    /** check if request contains method equal to post. */
    if ($request->method() === 'GET') {
        /** forward financials command. */
        if ($request->input('section') === 'stocks') {
            return $this->stocktrades();
        }
        /** forward watchlist command. */
        if ($request->input('section') === 'watches') {
            return $this->stockwatches($request->all());
        }
    }
  }

  /**
    * Declare financials function.
    */
  public function stockreports($data) {
    /** repository. */
    $financialreports;
    $result;
    /** fetch and crawl document element. */
    $financial = $this->client->request('GET', 'https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=' . $data['id']);
    $finance = $financial->filter('tr > td')->each(function ($node) { return $node->text(); });
    if (count($finance) != 0) {
      /** mapping net after tax . */
        $annualincomestatement['CurrentYearNetIncomeLossAfterTax'] = $finance['22'];
        $annualincomestatement['PreviousYearNetIncomeLossAfterTax'] = $finance['23'];
        /** check if key exist in array. */
        if (array_key_exists("CurrentYearNetIncomeLossAfterTax", $annualincomestatement)) {
          /** match string if in currency format. */
          if (preg_match("/^-?[0-9,.?\d{0,2}]+$/", $annualincomestatement['CurrentYearNetIncomeLossAfterTax'])) {
            $result['income']['current'] = floatval(str_replace(',', '', $annualincomestatement['CurrentYearNetIncomeLossAfterTax']));
          }
          /** match string if has number and comma and parentheses. */
          if (preg_match('/^\(.*,.*\.?d{0,2}$/', $annualincomestatement['CurrentYearNetIncomeLossAfterTax'])) {
            $result['income']['current'] = floatval(str_replace(['(', ',', ')'], '', $annualincomestatement['CurrentYearNetIncomeLossAfterTax']));
            $result['income']['current'] = -abs($result['income']['current']);
          }
          /** match string if has number and comma and parentheses. */
          if (preg_match('/^\(.*,.*,.*\)$/', $annualincomestatement['CurrentYearNetIncomeLossAfterTax'])) {
            $result['income']['current'] = floatval(str_replace(['(', ',', ')'], '', $annualincomestatement['CurrentYearNetIncomeLossAfterTax']));
            $result['income']['current'] = -abs($result['income']['current']);
          }
          /** match string if has no value. */
          if ($annualincomestatement['CurrentYearNetIncomeLossAfterTax'] == '') {
            $result['income']['current'] = 0.00;
          }
        }
        /** check if key exist in array. */
        if (array_key_exists("PreviousYearNetIncomeLossAfterTax", $annualincomestatement)) {
          /** match string if in currency format. */
          if (preg_match("/^-?[0-9,.?\d{0,2}]+$/", $annualincomestatement['PreviousYearNetIncomeLossAfterTax'])) {
            $result['income']['previous'] = floatval(str_replace(',', '', $annualincomestatement['PreviousYearNetIncomeLossAfterTax']));
          }
          /** match string if has number and comma and parentheses. */
          if (preg_match('/^\(.*,.*\.?d{0,2}$/', $annualincomestatement['PreviousYearNetIncomeLossAfterTax'])) {
             $result['income']['previous'] = floatval(str_replace(['(', ',', ')'], '', $annualincomestatement['PreviousYearNetIncomeLossAfterTax']));
             $result['income']['previous'] = -abs($result['income']['previous']);
            }        
          /** match string if has number and comma and parentheses. */  
          if (preg_match('/^\(.*,.*,.*\)$/', $annualincomestatement['PreviousYearNetIncomeLossAfterTax'])) {
              $result['income']['previous'] = floatval(str_replace(['(', ',', ')'], '', $annualincomestatement['PreviousYearNetIncomeLossAfterTax']));
              $result['income']['previous'] = -abs($result['income']['previous']);
            }
          /** match string if has no value. */
          if ($annualincomestatement['PreviousYearNetIncomeLossAfterTax'] == '') {
            $result['income']['previous'] = 0.00;
          }
        }
      /** determine if profitable against previous year. */
      $result['income']['balance'] = floatval(bcsub($result['income']['current'], $result['income']['previous'], 2));
      /** save to database.. */
      DB::table('stock_trades')
        ->where('edge', '=', $data['id'])
        ->update([
          'incomeaftertax' => strip_tags($result['income']['balance']),
        ]);

      /** mapping earning per share . */
      $annualincomestatement['CurrentYearEarningsLossPerShareBasic'] = $finance['26'];
      $annualincomestatement['PreviousYearEarningsLossPerShareBasic'] = $finance['27'];

      /** check if key exist in array. */
      if (array_key_exists("CurrentYearEarningsLossPerShareBasic", $annualincomestatement)) {
        $annualincomestatement['CurrentYearEarningsLossPerShareBasic'] = str_replace([' ', '(', '$'], '', $annualincomestatement['CurrentYearEarningsLossPerShareBasic']);
        /** match string if in currency format. */
        if (preg_match("/^-?\d*\.{0,1}\d+$/", $annualincomestatement['CurrentYearEarningsLossPerShareBasic'])) {
          $result['earning']['current'] = floatval(str_replace(['(', ',', ')'], '', $annualincomestatement['CurrentYearEarningsLossPerShareBasic']));
        }
        /** match string if has no value. */
        if ($annualincomestatement['CurrentYearEarningsLossPerShareBasic'] == '') {
          $result['earning']['current'] = 0.00;
        }
      }
      /** check if key exist in array. */
      if (array_key_exists("PreviousYearEarningsLossPerShareBasic", $annualincomestatement)) {
        /** replace rouge character. */
        $annualincomestatement['PreviousYearEarningsLossPerShareBasic'] = str_replace([' ', '(', '$'], '', $annualincomestatement['PreviousYearEarningsLossPerShareBasic']);
        /** match string if in currency format. */
        if (preg_match("/^-?\d*\.{0,1}\d+$/", $annualincomestatement['PreviousYearEarningsLossPerShareBasic'])) {
          $result['earning']['previous'] = floatval(str_replace(['(', ',', ')'], '', $annualincomestatement['PreviousYearEarningsLossPerShareBasic']));
        }
        /** match string if has no value. */
        if ($annualincomestatement['PreviousYearEarningsLossPerShareBasic'] == '') {
          $result['earning']['previous'] = 0.00;
        }
      }
      /** determine if profitable against previous year. */
      $result['earning']['balance'] =  floatval(bcsub($result['earning']['current'], $result['earning']['previous'], 2));
      /** save to database.. */
      DB::table('stock_trades')
        ->where('edge', '=', $data['id'])
        ->update([
          'earningpershare' => strip_tags($result['earning']['balance']),
        ]);
      /** search database.. */
      $financialreports =   DB::table('stock_trades')
        ->select('name')
        ->where('edge', '=', $data['id'])
        ->first();
      /** return something. */
      return ['status' => true, 'message' => $financialreports->name . ' has been successfully updated.', 'reports' => $financialreports];
  }
}

  /**
    * Declare stocks function.
    */
  public function stockprices($data) {
    /** repository. */
    $stockreports;
    $result;
    /** fetch and crawl document element. */
    $stockprices = $this->client->request('GET', 'https://edge.pse.com.ph/companyPage/stockData.do?cmpy_id=' . $data['id']);
    $stockprice = $stockprices->filter('tr > td')->each(function ($node) { return $node->text(); });
    if (count($stockprice) != 0) {
      /** mapping year high price. */
      $stockdata['52WeekHigh'] = $stockprice['24'];
      /** save to database.. */
      if (array_key_exists("52WeekHigh", $stockdata)) {
        /** replace comma with nothing. */
        $price['high'] = str_replace([' ', '(', '$', ','], '', $stockdata['52WeekHigh']);
        /** convert into float value. */
        $result['high'] = floatval($price['high']);
        /** save to database. */
        DB::table('stock_trades')
          ->where('edge', '=', $data['id'])
          ->update(['yearhighprice' => strip_tags($result['high']),
        ]);
      }
      /** mapping average price. */
      $stockdata['AveragePrice'] = $stockprice['22'];
      /** save to database.. */
      if (array_key_exists("AveragePrice", $stockdata)) {
        /** replace comma with nothing. */
        $average['average'] = str_replace([' ', '(', '$', ','], '', $stockdata['AveragePrice']);
        /** convert into float value. */
        $result['average'] = floatval($average['average']);
        /** save to database. */
        DB::table('stock_trades')
          ->where('edge', '=', $data['id'])
          ->update(['average' => strip_tags($result['average']),
        ]);
      }
    }
    $stockreports =   DB::table('stock_trades')
      ->select('name')
      ->where('edge', '=', $data['id'])
      ->first();
    /** return something. */
    return ['status' => true, 'message' => $stockreports->name . ' has been successfully updated.', 'reports' => $stockreports];
  }

    /**
    * Declare stocks function.
    */
    public function stocksectors($data) {
    /** repository. */
    $stockreports;
    $result;
    /** fetch and crawl document element. */
    $stocksectors = $this->client->request('GET', 'https://edge.pse.com.ph/companyInformation/form.do?cmpy_id=' . $data['id']);
    $stocksector = $stocksectors->filter('tr > td')->each(function ($node) { return $node->text(); });
    if (count($stocksector) != 0) {
      /** mapping year high price. */
      $stockdata['sector'] = $stocksector['1'];
      /** save to database.. */
      if (array_key_exists("sector", $stockdata)) {
        /** replace comma with nothing. */
        $sector['sector'] = str_replace([' ', '&', ','], '', $stockdata['sector']);
        /** match string if has number and comma and parentheses. */  
        if (preg_match('/^.*$/', $sector['sector'])) {
            $result['sector'] = strtolower($sector['sector']);
        }
        /** match string if has no value. */
        if ($sector['sector'] == '') {
            $result['sector'] = 'kolorum';
        }
        /** save to database. */
        DB::table('stock_trades')
          ->where('edge', '=', $data['id'])
          ->update(['sector' => strip_tags($result['sector']),
        ]);
      }
    }
    $stockreports =   DB::table('stock_trades')
      ->select('name')
      ->where('edge', '=', $data['id'])
      ->first();
    /** return something. */
    return ['status' => true, 'message' => $stockreports->name . ' has been successfully updated.', 'reports' => $stockreports];
  }

  /**
    * Declare financials function.
    */
  public function stockwatches($data) {
    /** repository. */
    $financialreports;
    $result;
    /** fetch and crawl document element. */
    $financial = $this->client->request('GET', 'https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=' . $data['id']);
    $finance = $financial->filter('tr > td')->each(function ($node) { return $node->text(); });
    if (count($finance) != 0) {
      /** mapping total liabilities. */
      $annualincomestatement['CurrentTotalLiabilities'] = $finance['6'];
      /** check if key exist in array. */
      if (array_key_exists("CurrentTotalLiabilities", $annualincomestatement)) {
        /** match string if has number and comma. */
        if (preg_match('/^-?[0-9,.?\d{0,2}]+$/', $annualincomestatement['CurrentTotalLiabilities'])) {
          $result['totalliabilities'] = floatval(str_replace(['(', ',', ')'], '', $annualincomestatement['CurrentTotalLiabilities']));
        }
        /** match string if has number and comma and parentheses. */
        if (preg_match('/^\(.*,.*,.*\).*$/', $annualincomestatement['CurrentTotalLiabilities'])) {
          $result['totalliabilities'] = floatval(str_replace(['(', ',', ')'], '', $annualincomestatement['CurrentTotalLiabilities']));
          $result['totalliabilities'] = -abs($result['totalliabilities']);
        }
        /** match string if has no value. */
        if ($annualincomestatement['CurrentTotalLiabilities'] == '') {
          $result['totalliabilities'] = 0.00;
        }
      }

      /** mapping stock holder equity. */
      $annualincomestatement['CurrentStockholdersEquity'] = $finance['10'];
      /** check if key exist in array. */
      if (array_key_exists("CurrentStockholdersEquity", $annualincomestatement)) {
        /** match string if has number and comma. */
        if (preg_match('/^-?[0-9,.?\d{0,2}]+$/', $annualincomestatement['CurrentStockholdersEquity'])) {
          $result['stockholderequity'] = floatval(str_replace(['(', ',', ')'], '', $annualincomestatement['CurrentStockholdersEquity']));
        }
        /** match string if has number and comma and parentheses. */
        if (preg_match('/^\(.*,.*,.*\).*$/', $annualincomestatement['CurrentStockholdersEquity'])) {
          $result['stockholderequity'] = floatval(str_replace(['(', ',', ')'], '', $annualincomestatement['CurrentStockholdersEquity']));
          $result['stockholderequity'] = -abs($result['stockholderequity']);
        }
        /** match string if has no value. */
        if ($annualincomestatement['CurrentStockholdersEquity'] == '') {
          $result['stockholderequity'] = 0.00;
        }
      }

      /** mapping stock holder equity. */
      $annualincomestatement['CurrentEarningsLossPerShareBasic'] = $finance['26'];
      /** remove rouge space. */
      $annualincomestatement['CurrentEarningsLossPerShareBasic'] = str_replace(' ', '', $annualincomestatement['CurrentEarningsLossPerShareBasic']);
      /** check if key exist in array. */
      if (array_key_exists("CurrentEarningsLossPerShareBasic", $annualincomestatement)) {
        /** match string if has number and comma. */
        if (preg_match('/^-?[0-9,.?\d{0,2}]+$/', $annualincomestatement['CurrentEarningsLossPerShareBasic'])) {
          $result['earningpershare'] = floatval(str_replace(['(', ',', ')'], '', $annualincomestatement['CurrentEarningsLossPerShareBasic']));
        }
        /** match string if has number and comma and parentheses. */
        if (preg_match('/^\(.*,.*,.*\).*$/', $annualincomestatement['CurrentEarningsLossPerShareBasic'])) {
          $result['earningpershare'] = floatval(str_replace(['(', ',', ')'], '', $annualincomestatement['CurrentEarningsLossPerShareBasic']));
          $result['earningpershare'] = -abs($result['earningpershare']);
        }
        /** match string if has no value. */
        if ($annualincomestatement['CurrentEarningsLossPerShareBasic'] == '') {
          $result['earningpershare'] = 0.00;
        }
      }

      /** mapping stock holder equity. */
      $annualincomestatement['CurrentIncomeLossBeforeTax'] = $finance['20'];
      /** check if key exist in array. */
      if (array_key_exists("CurrentIncomeLossBeforeTax", $annualincomestatement)) {
        /** match string if has number and comma. */
        if (preg_match('/^-?[0-9,.?\d{0,2}]+$/', $annualincomestatement['CurrentIncomeLossBeforeTax'])) {
          $result['incomebeforetax'] = floatval(str_replace(['(', ',', ')'], '', $annualincomestatement['CurrentIncomeLossBeforeTax']));
        }
        /** match string if has number and comma and parentheses. */
        if (preg_match('/^\(.*,.*,.*\).*$/', $annualincomestatement['CurrentIncomeLossBeforeTax'])) {
          $result['incomebeforetax'] = floatval(str_replace(['(', ',', ')'], '', $annualincomestatement['CurrentIncomeLossBeforeTax']));
          $result['incomebeforetax'] = -abs($result['incomebeforetax']);
        }
        /** match string if has no value. */
        if ($annualincomestatement['CurrentIncomeLossBeforeTax'] == '') {
          $result['incomebeforetax'] = 0.00;
        }
      }

      /** mapping stock holder equity. */
      $annualincomestatement['CurrentGrossRevenue'] = $finance['16'];
      /** check if key exist in array. */
      if (array_key_exists("CurrentGrossRevenue", $annualincomestatement)) {
        /** match string if has number and comma. */
        if (preg_match('/^-?[0-9,.?\d{0,2}]+$/', $annualincomestatement['CurrentGrossRevenue'])) {
          $result['grossrevenue'] = floatval(str_replace(['(', ',', ')'], '', $annualincomestatement['CurrentGrossRevenue']));
        }
        /** match string if has number and comma and parentheses. */
        if (preg_match('/^\(.*,.*,.*\).*$/', $annualincomestatement['CurrentGrossRevenue'])) {
          $result['grossrevenue'] = floatval(str_replace(['(', ',', ')'], '', $annualincomestatement['CurrentGrossRevenue']));
          $result['grossrevenue'] = -abs($result['grossrevenue']);
        }
        /** match string if has no value. */
        if ($annualincomestatement['CurrentGrossRevenue'] == '' || $annualincomestatement['CurrentGrossRevenue'] == '-') {
          $result['grossrevenue'] = 0.00;
        }
      }
    }

    /** fetch and crawl document element. */
    $prices = $this->client->request('GET', 'https://edge.pse.com.ph/companyPage/stockData.do?cmpy_id=' . $data['id']);
    $price = $prices->filter('tr > td')->each(function ($node) { return $node->text(); });
    if (count($price) != 0) {
      /** mapping net after tax . */
      $annualincomestatement['LastTradedPrice'] = $price['12'];
      /** check if key exist in array. */
      if (array_key_exists("LastTradedPrice", $annualincomestatement)) {
        /** match string if has number and comma. */
        if (preg_match('/^-?[0-9,.?\d{0,2}]+$/', $annualincomestatement['LastTradedPrice'])) {
          $result['lasttradedprice'] = floatval(str_replace(',', '', $annualincomestatement['LastTradedPrice']));
        }
        /** match string if has number and comma and parentheses. */
        if (preg_match('/^\(.*,.*,.*\).*$/', $annualincomestatement['LastTradedPrice'])) {
          $result['lasttradedprice'] = floatval(str_replace(['(', ',', ')'], '', $annualincomestatement['LastTradedPrice']));
          $result['lasttradedprice'] = -abs($result['lasttradedprice']['current']);
        }
        /** match string if has no value. */
        if ($annualincomestatement['LastTradedPrice'] == '') {
          $result['lasttradedprice'] = 0.00;
        }
      }

      /** map to currency format. */
      $financialreports = [
        'liabilities' => number_format($result['totalliabilities'], 2, '.', ','),
        'equity' => number_format($result['stockholderequity'], 2, '.', ','),
        'price' => number_format($result['lasttradedprice'], 2, '.', ','),
        'earning' => number_format($result['earningpershare'], 2, '.', ','),
        'income' => number_format($result['incomebeforetax'], 2, '.', ','),
        'gross' => number_format($result['grossrevenue'], 2, '.', ','),
      ];

      if ($data['caller'] == 'trade') {
         return ['status' => true, 'message' => 'Infomation has been fetched.', 'reports' => $financialreports];
      }

      if ($data['caller'] == 'watchlist') {
        $symbol = DB::table('stock_watchlists')
          ->select('symbol')
          ->where('symbol', $data['symbol'])
          ->get();

        if ($symbol->isEmpty()) {
            $insert = DB::table('stock_watchlists')
                ->insertGetId([
                    'userid' => Auth::id(),
                    'symbol' => strip_tags($data['symbol']),
                    'edge' => strip_tags($data['id']),
                    'totalliabilities' => strip_tags(str_replace([' ', '(', ',', ')'], '', $financialreports['liabilities'])),
                    'stockholdersequity' => strip_tags(str_replace([' ', '(', ',', ')'], '', $financialreports['equity'])),
                    'lasttradedprice' => strip_tags(str_replace([' ', '(', ',', ')'], '', $financialreports['price'])),
                    'earningspershare' => strip_tags(str_replace([' ', '(', ',', ')'], '', $financialreports['earning'])),
                    'netincomebeforetax' => strip_tags(str_replace([' ', '(', ',', ')'], '', $financialreports['income'])),
                    'grossrevenue' => strip_tags(str_replace([' ', '(', ',', ')'], '', $financialreports['gross'])),
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                ]);
            /** if insert not empty.*/
            if ($insert) {
                return ['status' =>  true, 'sql' => 'select', 'message' => $data['symbol'] . ' has been added to the database.', 'reports' => $insert];
            }
        } else {
            $update = DB::table('stock_watchlists')
              ->where('userid', '=', Auth::id())
              ->where('symbol', '=', $data['symbol'])
              ->update([
                'totalliabilities' => strip_tags(str_replace([' ', '(', ',', ')'], '', $financialreports['liabilities'])),
                'stockholdersequity' => strip_tags(str_replace([' ', '(', ',', ')'], '', $financialreports['equity'])),
                'lasttradedprice' => strip_tags(str_replace([' ', '(', ',', ')'], '', $financialreports['price'])),
                'earningspershare' => strip_tags(str_replace([' ', '(', ',', ')'], '', $financialreports['earning'])),
                'netincomebeforetax' => strip_tags(str_replace([' ', '(', ',', ')'], '', $financialreports['income'])),
                'grossrevenue' => strip_tags(str_replace([' ', '(', ',', ')'], '', $financialreports['gross'])),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
              ]);
            /** if update not empty.*/
            if ($update) {
                return ['status' =>  true, 'sql' => 'select', 'message' => $data['symbol'] . ' successfully updated.', 'reports' => $update];
          }
        }    
      }
      /** return something. */
      return ['status' => false, 'message' => 'Infomation has been fetched.', 'reports' => ''];
  }
}

  /**
    * Declare stocks function.
    */
  public function stocktrades() {
    /** repository. */
    $stocks = DB::table('stock_trades')
      ->select('edge')
      ->where('edge', '>', '0')
      ->where('updated_at', '<', Carbon::now()->subHour(.10))
      ->get()
      ->toArray();
      if (count($stocks)) {
        /** resequence array keys. */
        $stocks = array_values($stocks);
        /** return something. */
        return ['status' => true, 'message' => 'Start crawling PSE website for stocks information.', 'stocks' => $stocks];
      } else {
        /** return something. */
        return ['status' => true, 'message' => 'All records are up to date.', 'stocks' => $stocks];
      }
  }
}
