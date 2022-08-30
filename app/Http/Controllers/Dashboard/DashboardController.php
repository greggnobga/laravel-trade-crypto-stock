<?php
namespace App\Http\Controllers\Dashboard;

use Illuminate\Support\Facades\View;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Goutte\Client;

class DashboardController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function init() {
        return View::make('dashboard.dashboard');
    }

    public function user() {
        return ['user' => 'User information.'];
    }

    public function test() {
      /** initialize goutte client. */
      $client = new Client();

      /** repository. */
      $financialreports;
      $stockreports;

      /** fetch and crawl document element. */
      $financial = $client->request('GET', 'https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=139');
      $finance = $financial->filter('tr > td')->each(function ($node) { return $node->text(); });

      if (count($finance) != 0) {
        /** mapping annual financial statement. */
        $annualbalancesheet['CurrentYearCurrentAssets'] = $finance['0'];
        $annualbalancesheet['PreviousYearCurrentAssets'] = $finance['1'];

        $annualbalancesheet['CurrentYearTotalAssets'] = $finance['2'];
        $annualbalancesheet['PreviousYearTotalAssets'] = $finance['3'];

        $annualbalancesheet['CurrentYearCurrentLiabilities'] = $finance['4'];
        $annualbalancesheet['PreviousYearCurrentLiabilities'] = $finance['5'];

        $annualbalancesheet['CurrentYearTotalLiabilities'] = $finance['6'];
        $annualbalancesheet['PreviousYearTotalLiabilities'] = $finance['7'];

        $annualbalancesheet['CurrentYearRetainedEarningsDeficit'] = $finance['8'];
        $annualbalancesheet['PreviousYearRetainedEarningsDeficit'] = $finance['9'];

        $annualbalancesheet['CurrentYearStockholdersEquity'] = $finance['10'];
        $annualbalancesheet['PreviousYearStockholdersEquity'] = $finance['11'];

        $annualbalancesheet['CurrentYearStockholdersEquityParent'] = $finance['12'];
        $annualbalancesheet['PreviousYearStockholdersEquityParent'] = $finance['13'];

        $annualbalancesheet['CurrentYearBookValuePerShare'] = $finance['14'];
        $annualbalancesheet['PreviousYearBookValuePerShare'] = $finance['15'];

        $annualincomestatement['CurrentYearGrossRevenue'] = $finance['16'];
        $annualincomestatement['PreviousYearGrossRevenue'] = $finance['17'];

        $annualincomestatement['CurrentYearGrossExpense'] = $finance['18'];
        $annualincomestatement['PreviousYearGrossExpense'] = $finance['19'];

        $annualincomestatement['CurrentYearIncomeLossBeforeTax'] = $finance['20'];
        $annualincomestatement['PreviousYearIncomeLossBeforeTax'] = $finance['21'];

        $annualincomestatement['CurrentYearNetIncomeLossAfterTax'] = $finance['22'];
        $annualincomestatement['PreviousYearNetIncomeLossAfterTax'] = $finance['23'];

        $annualincomestatement['CurrentYearNetIncomeLossAttributableToParent'] = $finance['24'];
        $annualincomestatement['PreviousYearNetIncomeLossAttributableToParent'] = $finance['25'];

        $annualincomestatement['CurrentYearEarningsLossPerShareBasic'] = $finance['26'];
        $annualincomestatement['PreviousYearEarningsLossPerShareBasic'] = $finance['27'];

        $annualincomestatement['CurrentYearEarningsLossPerShareDiluted'] = $finance['28'];
        $annualincomestatement['PreviousYearEarningsLossPerShareDiluted'] = $finance['29'];

          /** mapping quarterly financial statement. */
          $quarterlybalancesheet['PeriodEndedCurrentAssets'] = $finance['30'];
          $quarterlybalancesheet['FiscalYearEndedCurrentAssets'] = $finance['31'];

          $quarterlybalancesheet['PeriodEndedTotalAssets'] = $finance['32'];
          $quarterlybalancesheet['FiscalYearEndedTotalAssets'] = $finance['33'];

          $quarterlybalancesheet['PeriodEndedCurrentLiabilities'] = $finance['34'];
          $quarterlybalancesheet['FiscalYearEndedCurrentLiabilities'] = $finance['35'];

          $quarterlybalancesheet['PeriodEndedTotalLiabilities'] = $finance['36'];
          $quarterlybalancesheet['FiscalYearEndedTotalLiabilities'] = $finance['37'];

          $quarterlybalancesheet['PeriodEndedRetainedEarningsDeficit'] = $finance['38'];
          $quarterlybalancesheet['FiscalYearEndedRetainedEarningsDeficit'] = $finance['39'];

          $quarterlybalancesheet['PeriodEndedStockholdersEquity'] = $finance['40'];
          $quarterlybalancesheet['FiscalYearEndedStockholdersEquity'] = $finance['41'];

          $quarterlybalancesheet['PeriodEndedStockholdersEquityParent'] = $finance['42'];
          $quarterlybalancesheet['FiscalYearEndedStockholdersEquityParent'] = $finance['43'];

          $quarterlybalancesheet['PeriodEndedBookValuePerShare'] = $finance['44'];
          $quarterlybalancesheet['FiscalYearEndedBookValuePerShare'] = $finance['45'];

          $quarterlyincomestatement['CurrentYearFirstQuarterGrossRevenue'] = $finance['46'];
          $quarterlyincomestatement['PreviousYearFirstQuarterGrossRevenue'] = $finance['47'];
          $quarterlyincomestatement['CurrentYearToDateGrossRevenue'] = $finance['48'];
          $quarterlyincomestatement['PreviousYearToDateGrossRevenue'] = $finance['49'];

          $quarterlyincomestatement['CurrentYearFirstQuarterGrossExpense'] = $finance['50'];
          $quarterlyincomestatement['PreviousYearFirstQuarterGrossExpense'] = $finance['51'];
          $quarterlyincomestatement['CurrentYearToDateGrossExpense'] = $finance['52'];
          $quarterlyincomestatement['PreviousYearToDateGrossExpense'] = $finance['53'];

          $quarterlyincomestatement['CurrentYearFirstQuarterIncomeLossBeforeTax'] = $finance['54'];
          $quarterlyincomestatement['PreviousYearFirstQuarterIncomeLossBeforeTax'] = $finance['55'];
          $quarterlyincomestatement['CurrentYearToDateIncomeLossBeforeTax'] = $finance['56'];
          $quarterlyincomestatement['PreviousYearToDateIncomeLossBeforeTax'] = $finance['57'];

          $quarterlyincomestatement['CurrentYearFirstQuarterNetIncomeLossAfterTax'] = $finance['58'];
          $quarterlyincomestatement['PreviousYearFirstQuarterNetIncomeLossAfterTax'] = $finance['59'];
          $quarterlyincomestatement['CurrentYearToDateNetIncomeLossAfterTax'] = $finance['60'];
          $quarterlyincomestatement['PreviousYearToDateNetIncomeLossAfterTax'] = $finance['61'];

          $quarterlyincomestatement['CurrentYearFirstQuarterNetIncomeLossAttributableToParent'] = $finance['62'];
          $quarterlyincomestatement['PreviousYearFirstQuarterNetIncomeLossAttributableToParent'] = $finance['63'];
          $quarterlyincomestatement['CurrentYearToDateNetIncomeLossAttributableToParent'] = $finance['64'];
          $quarterlyincomestatement['PreviousYearToDateNetIncomeLossAttributableToParent'] = $finance['65'];

          $quarterlyincomestatement['CurrentYearFirstQuarterEarningsLossPerShareBasic'] = $finance['66'];
          $quarterlyincomestatement['PreviousYearFirstQuarterEarningsLossPerShareBasic'] = $finance['67'];
          $quarterlyincomestatement['CurrentYearToDateEarningsLossPerShareBasic'] = $finance['68'];
          $quarterlyincomestatement['PreviousYearToDateEarningsLossPerShareBasic'] = $finance['69'];

          $quarterlyincomestatement['CurrentYearFirstQuarterEarningsLossPerShareDiluted'] = $finance['70'];
          $quarterlyincomestatement['PreviousYearFirstQuarterEarningsLossPerShareDiluted'] = $finance['71'];
          $quarterlyincomestatement['CurrentYearToDateEarningsLossPerShareDiluted'] = $finance['72'];
          $quarterlyincomestatement['PreviousYearToDateEarningsLossPerShareDiluted'] = $finance['73'];

        /** return something. */
        $financialreports = [
          'annual'=> ['balancesheet' => $annualbalancesheet, 'incomestatement' => $annualincomestatement],
          'quarterly' =>['balancesheet' => $quarterlybalancesheet, 'incomestatement' => $quarterlyincomestatement],
        ];
      }

      /** fetch and crawl document element. */
      $stockprices = $client->request('GET', 'https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=19');
      $stockprice = $stockprices->filter('tr > td')->each(function ($node) { return $node->text(); });

      if (count($finance) != 0) {
        /** mapping stock data. */
        $stockdata['Status'] = $stockprice['0'];
        $stockdata['MarketCapitalization'] = $stockprice['1'];
        $stockdata['IssueType'] = $stockprice['2'];
        $stockdata['OutstandingShares'] = $stockprice['3'];
        $stockdata['ISIN'] = $stockprice['4'];
        $stockdata['ListedShares'] = $stockprice['5'];
        $stockdata['ListingDate'] = $stockprice['6'];
        $stockdata['IssuedShares'] = $stockprice['7'];
        $stockdata['BoardLot'] = $stockprice['8'];
        $stockdata['FreeFloatLevel'] = $stockprice['9'];
        $stockdata['ParValue'] = $stockprice['10'];
        $stockdata['ForeignOwnershipLimit'] = $stockprice['11'];
        $stockdata['LastTradedPrice'] = $stockprice['12'];
        $stockdata['Open'] = $stockprice['13'];
        $stockdata['PreviousCloseAndDate'] = $stockprice['14'];
        $stockdata['Change'] = $stockprice['15'];
        $stockdata['High'] = $stockprice['16'];
        $stockdata['PERatio'] = $stockprice['17'];
        $stockdata['Value'] = $stockprice['18'];
        $stockdata['Low'] = $stockprice['19'];
        $stockdata['SectorPERatio'] = $stockprice['20'];
        $stockdata['Volume'] = $stockprice['21'];
        $stockdata['AveragePrice'] = $stockprice['22'];
        $stockdata['BookValue'] = $stockprice['23'];
        $stockdata['52WeekHigh'] = $stockprice['24'];
        $stockdata['52WeekLow'] = $stockprice['25'];
        $stockdata['PBVRatio'] = $stockprice['26'];

        /** return something. */
        $stockreports = $stockdata;
      }

      $edge = DB::table('stock_trades')
        ->select('edge')
        ->where('edge', '>', '0')
        ->where('updated_at', '<', Carbon::now()->subMinutes(60))->get()->toArray();

      return ['finance' => $financialreports, 'stocks' => $stockreports, 'edge' => $edge];
    }

    /**
      * Declare stocks function.
      */
    public function stocklists() {
      /** repository. */
      $stocks = DB::table('stock_trades')
        ->select('edge')
        ->where('edge', '>', '0')
        ->where('updated_at', '<', Carbon::now()->subHour(6))
        ->get()
        ->toArray();

        if (count($stocks)) {
          /** resequence array keys. */
          $stocks = array_values($stocks);
          /** return something. */
          return ['status' => true, 'message' => 'Start crawling PSE website for stocks information.', 'stocks' => $stocks];
        }
    }


    /**
      * Declare financials function.
      */
    public function stockreports() {
      /** initialize goutte client. */
      $client = new Client();
      /** repository. */
      $financialreports;
      $result;
      /** fetch and crawl document element. */
      $financial = $client->request('GET', 'https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=90');
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
        // DB::table('stock_trades')
        //   ->where('edge', '=', $data)
        //   ->update([
        //     'incomeaftertax' => $income['income']['balance'],
        //   ]);

        /** mapping earning per share . */
        $annualincomestatement['CurrentYearEarningsLossPerShareBasic'] = $finance['26'];
        $annualincomestatement['PreviousYearEarningsLossPerShareBasic'] = $finance['27'];

        /** check if key exist in array. */
        if (array_key_exists("CurrentYearEarningsLossPerShareBasic", $annualincomestatement)) {
          /** replace rouge character. */
          $annualincomestatement['CurrentYearEarningsLossPerShareBasic'] = str_replace('$', '', $annualincomestatement['CurrentYearEarningsLossPerShareBasic']);
          $annualincomestatement['CurrentYearEarningsLossPerShareBasic'] = str_replace('(', '', $annualincomestatement['CurrentYearEarningsLossPerShareBasic']);
          $annualincomestatement['CurrentYearEarningsLossPerShareBasic'] = str_replace(' ', '', $annualincomestatement['CurrentYearEarningsLossPerShareBasic']);
          /** match string if in currency format. */
          if (preg_match("/^-?\d*\.{0,1}\d+$/", $annualincomestatement['CurrentYearEarningsLossPerShareBasic'])) {
            $result['earning']['current'] = floatval(str_replace(',', '', $annualincomestatement['CurrentYearEarningsLossPerShareBasic']));
          }
          /** match string if has no value. */
          if ($annualincomestatement['CurrentYearEarningsLossPerShareBasic'] == '') {
            $result['earning']['current'] = 0.00;
          }
        }
        /** check if key exist in array. */
        if (array_key_exists("PreviousYearEarningsLossPerShareBasic", $annualincomestatement)) {
          /** replace rouge character. */
          $annualincomestatement['PreviousYearEarningsLossPerShareBasic'] = str_replace('$', '', $annualincomestatement['PreviousYearEarningsLossPerShareBasic']);
          $annualincomestatement['PreviousYearEarningsLossPerShareBasic'] = str_replace('(', '', $annualincomestatement['PreviousYearEarningsLossPerShareBasic']);
          $annualincomestatement['PreviousYearEarningsLossPerShareBasic'] = str_replace(' ', '', $annualincomestatement['PreviousYearEarningsLossPerShareBasic']);
          /** match string if in currency format. */
          if (preg_match("/^-?\d*\.{0,1}\d+$/", $annualincomestatement['PreviousYearEarningsLossPerShareBasic'])) {
            $result['earning']['previous'] = floatval(str_replace(',', '', $annualincomestatement['PreviousYearEarningsLossPerShareBasic']));
          }
          /** match string if has no value. */
          if ($annualincomestatement['PreviousYearEarningsLossPerShareBasic'] == '') {
            $result['earning']['previous'] = 0.00;
          }
        }
        /** determine if profitable against previous year. */
        $result['earning']['balance'] =  floatval(bcsub($result['earning']['current'], $result['earning']['previous'], 2));
        /** save to database.. */
        // DB::table('stock_trades')
        //   ->where('edge', '=', $data)
        //   ->update([
        //     'earningpershare' => $income['earning']['balance'],
        //   ]);
        /** search database.. */
        // $financialreports =   DB::table('stock_trades')
        //   ->select('name')
        //   ->where('edge', '=', $data)
        //   ->first();
        /** return something. */
        return $result;
        //return ['status' => true, 'message' => $financialreports->name . ' has been successfully updated.', 'reports' => $financialreports];
        }
    }
 }
