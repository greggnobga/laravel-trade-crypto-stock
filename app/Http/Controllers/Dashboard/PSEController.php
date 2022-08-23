<?php
namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
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
        if ($request->input('section') === 'finance') {
          return $this->stockreports($request->input('id'));
        }

        /** forward update command. */
        if ($request->input('section') === 'price') {
          return $this->stockprices($request->input('id'));
        }
    }

    /** check if request contains method equal to post. */
    if ($request->method() === 'GET') {
      /** forward financials command. */
      if ($request->input('section') === 'stocks') {
        return $this->stocklists();
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
    $financial = $this->client->request('GET', 'https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=' . $data);
    $finance = $financial->filter('tr > td')->each(function ($node) { return $node->text(); });

    if (count($finance) != 0) {
      /** mapping annual financial statement. */
      $annualincomestatement['CurrentYearNetIncomeLossAfterTax'] = $finance['22'];
      $annualincomestatement['CurrentYearEarningsLossPerShareDiluted'] = $finance['28'];

      /** save some to database. */
      if (array_key_exists("CurrentYearNetIncomeLossAfterTax", $annualincomestatement)) {
        /** replace comma with nothing. */
        $income = str_replace(',', '', $annualincomestatement['CurrentYearNetIncomeLossAfterTax']);
        /** convert into float value. */
        $result['income'] = floatval($income);
        /** save to database.. */
        DB::table('stock_trades')
            ->where('edge', '=', $data)
            ->update([
              'incomeaftertax' => str_replace(',', '', $result['income']),
            ]);
      }

      if (array_key_exists("CurrentYearEarningsLossPerShareDiluted", $annualincomestatement)) {
        /** replace comma with nothing. */
        $earning = str_replace(',', '', $annualincomestatement['CurrentYearEarningsLossPerShareDiluted']);
        /** convert into float value. */
        $result['earning'] = floatval($earning);
        /** save to database. */
        DB::table('stock_trades')
          ->where('edge', '=', $data)
          ->update(['earningpershare' => str_replace(',', '', $result['earning']),
        ]);
      }
    }

    $financialreports =   DB::table('stock_trades')
      ->select('name')
      ->where('edge', '=', $data)
      ->first();

    /** return something. */
    return ['status' => true, 'message' => $financialreports->name . ' has been successfully updated.', 'reports' => $financialreports];
  }

  /**
    * Declare stocks function.
    */
  public function stockprices($data) {
    /** repository. */
    $stockreports;

    /** fetch and crawl document element. */
    $stockprices = $this->client->request('GET', 'https://edge.pse.com.ph/companyPage/stockData.do?cmpy_id=' . $data);
    $stockprice = $stockprices->filter('tr > td')->each(function ($node) { return $node->text(); });

    if (count($stockprice) != 0) {
      /** mapping stock data. */
      $stockdata['52WeekHigh'] = $stockprice['24'];
      /** save to database.. */
      if (array_key_exists("52WeekHigh", $stockdata)) {
        /** replace comma with nothing. */
        $price = str_replace(',', '', $stockdata['52WeekHigh']);
        /** convert into float value. */
        $result['price'] = floatval($price);
        /** save to database. */
        DB::table('stock_trades')
          ->where('edge', '=', $data)
          ->update(['yearhighprice' => strip_tags($result['price']),
        ]);
      }
    }

    $stockreports =   DB::table('stock_trades')
      ->select('name')
      ->where('edge', '=', $data)
      ->first();

    /** return something. */
    return ['status' => true, 'message' => $stockreports->name . ' has been successfully updated.', 'reports' => $stockreports];
  }

  /**
    * Declare stocks function.
    */
  public function stocklists() {
    /** repository. */
    $stocks = DB::table('stock_trades')
      ->select('edge')
      ->where('edge', '>', '0')
      ->where('updated_at', '<', Carbon::now()->subMinutes(10))
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
