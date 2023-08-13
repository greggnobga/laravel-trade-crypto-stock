/** Vendor. */
import { Link } from 'react-router-dom';

/** Desktop fundamental content. */
export const desktopFundamentalContent = ({ items }) => {
  return (
    <>
      <div className='grid auto-rows-min grid-cols-10 h-fit rounded-t-md bg-stone-100 uppercase border-b border-stone-200 text-green-500'>
        <div className='p-2'>
          <p>Symbol</p>
        </div>
        <div className='p-2'>
          <p>Price</p>
        </div>
        <div className='p-2'>
          <p>Value</p>
        </div>
        <div className='p-2'>
          <p>Working Capital</p>
        </div>
        <div className='p-2'>
          <p>Net Income</p>
        </div>
        <div className='p-2'>
          <p>Debt Asset Ratio</p>
        </div>
        <div className='p-2'>
          <p>Price Earning Ratio</p>
        </div>
        <div className='p-2'>
          <p>Net Profit Margin</p>
        </div>
        <div className='p-2'>
          <p>Return On Equity</p>
        </div>
        <div className='p-2'>
          <p>Dividend Yield</p>
        </div>
      </div>
      <div className='grid auto-rows-min h-fit bg-stone-100'>
        {items && items != 0 && items ? (
          items.map((item, key) => {
            return (
              <div className='grid auto-rows-min grid-cols-10 h-fit border-b border-stone-200 hover:text-purple-500'>
                <div className='p-2'>
                  <Link to={`/stock-explorer/${item.symbol.toLowerCase()}`}>
                    <span className='uppercase'>{item.symbol}</span>
                  </Link>
                </div>
                <div className='p-2'>
                  <p>{item.price}</p>
                </div>
                <div className='p-2'>
                  <p>{item.value}</p>
                </div>
                <div className='p-2'>
                  <p>{item.workingcapital}</p>
                </div>
                <div className='p-2'>
                  <p>{item.netincomeaftertax}</p>
                </div>
                <div className='p-2'>
                  <p>{item.debtassetratio}</p>
                </div>
                <div className='p-2'>
                  <p>{item.priceearningratio}</p>
                </div>
                <div className='p-2'>
                  <p>{item.netprofitmargin}</p>
                </div>
                <div className='p-2'>
                  <p>{item.returnonequity}</p>
                </div>
                <div className='p-2'>
                  <p>{item.dividendyield}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className='form-center col-span-9'>
            <p>No record found.</p>
          </div>
        )}
      </div>
    </>
  );
};

/** Mobile fundamental content. */
export const mobileFundamentalContent = ({ items }) => {
  return (
    <>
      <div className='grid auto-rows-min h-fit rounded-t-md bg-stone-100 uppercase my-2'>
        {items && items != 0 && items ? (
          items.map((item, key) => {
            return (
              <div className='p-2 grid auto-rows-min grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 justify-start items-center w-full h-fit border-b border-stone-200'>
                <div className='py-2'>
                  <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Symbol</p>
                  <p className='pt-2 text-center'>
                    <Link to={`/stock-explorer/${item.symbol.toLowerCase()}`}>
                      <span className='uppercase'>{item.symbol}</span>
                    </Link>
                  </p>
                </div>
                <div className='py-2'>
                  <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Price</p>
                  <p className='pt-2 text-center'>{item.price}</p>
                </div>
                <div className='py-2'>
                  <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Value</p>
                  <p className='pt-2 text-center'>{item.value}</p>
                </div>
                <div className='py-2'>
                  <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Working Capital</p>
                  <p className='pt-2 text-center'>{item.workingcapital}</p>
                </div>
                <div className='py-2'>
                  <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Net Income</p>
                  <p className='pt-2 text-center'>{item.netincomeaftertax}</p>
                </div>
                <div className='py-2'>
                  <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Debt Asset Ratio</p>
                  <p className='pt-2 text-center'>{item.debtassetratio}</p>
                </div>
                <div className='py-2'>
                  <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Price Earning Ratio</p>
                  <p className='pt-2 text-center'>{item.priceearningratio}</p>
                </div>
                <div className='py-2'>
                  <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Net Profit Margin</p>
                  <p className='pt-2 text-center'>{item.netprofitmargin}</p>
                </div>
                <div className='py-2'>
                  <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Return On Equity</p>
                  <p className='pt-2 text-center'>{item.returnonequity}</p>
                </div>
                <div className='py-2'>
                  <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Dividend Yield</p>
                  <p className='pt-2 text-center'>{item.dividendyield}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className='form-center col-span-9'>
            <p>No record found.</p>
          </div>
        )}
      </div>
    </>
  );
};

/** Desktop technical content. */
export const desktopTechnicalContent = ({ items }) => {
  return (
    <>
      <div className='grid auto-rows-min grid-cols-8 h-fit rounded-t-md bg-stone-100 uppercase border-b border-stone-200 text-green-500'>
        <div className='p-2'>
          <p>Symbol</p>
        </div>
        <div className='p-2'>
          <p>Price</p>
        </div>
        <div className='p-2'>
          <p>Value</p>
        </div>
        <div className='p-2'>
          <p>Price Range</p>
        </div>
        <div className='p-2'>
          <p>Support Level</p>
        </div>
        <div className='p-2'>
          <p>Resistance Level</p>
        </div>
        <div className='p-2'>
          <p>Moving Average</p>
        </div>
        <div className='p-2'>
          <p>Moving Signal</p>
        </div>
      </div>
      <div className='grid auto-rows-min h-fit bg-stone-100'>
        {items && items != 0 && items ? (
          items.map((item, key) => {
            return (
              <div className='grid auto-rows-min grid-cols-8 h-fit border-b border-stone-200 hover:text-purple-500'>
                <div className='p-2'>
                  <Link to={`/stock-explorer/${item.symbol.toLowerCase()}`}>
                    <span className='uppercase'>{item.symbol}</span>
                  </Link>
                </div>
                <div className='p-2'>
                  <p>{item.price}</p>
                </div>
                <div className='p-2'>
                  <p>{item.value}</p>
                </div>
                <div className='p-2'>
                  <p>{item.pricerange}</p>
                </div>
                <div className='p-2'>
                  <p>{item.supportlevel}</p>
                </div>
                <div className='p-2'>
                  <p>{item.resistancelevel}</p>
                </div>
                <div className='p-2'>
                  <p>{item.movingaverage}</p>
                </div>
                <div className='p-2'>
                  <p className='uppercase'>{item.movingsignal}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className='form-center col-span-9'>
            <p>No record found.</p>
          </div>
        )}
      </div>
    </>
  );
};

/** Mobile technical content. */
export const mobileTechnicalContent = ({ items }) => {
  return (
    <>
      <div className='grid auto-rows-min h-fit rounded-t-md bg-stone-100 uppercase my-2'>
        {items && items != 0 && items ? (
          items.map((item, key) => {
            return (
              <div className='p-2 grid auto-rows-min grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 justify-start items-center w-full h-fit border-b border-stone-200'>
                <div className='py-2'>
                  <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Symbol</p>
                  <p className='pt-2 text-center'>
                    <Link to={`/stock-explorer/${item.symbol.toLowerCase()}`}>
                      <span className='uppercase'>{item.symbol}</span>
                    </Link>
                  </p>
                </div>
                <div className='py-2'>
                  <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Price</p>
                  <p className='pt-2 text-center'>{item.price}</p>
                </div>
                <div className='py-2'>
                  <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Value</p>
                  <p className='pt-2 text-center'>{item.value}</p>
                </div>
                <div className='py-2'>
                  <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Price Range</p>
                  <p className='pt-2 text-center'>{item.pricerange}</p>
                </div>
                <div className='py-2'>
                  <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Support Level</p>
                  <p className='pt-2 text-center'>{item.supportlevel}</p>
                </div>
                <div className='py-2'>
                  <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Resistance Level</p>
                  <p className='pt-2 text-center'>{item.resistancelevel}</p>
                </div>
                <div className='py-2'>
                  <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Moving Average</p>
                  <p className='pt-2 text-center'>{item.movingaverage}</p>
                </div>
                <div className='py-2'>
                  <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Moving Signal</p>
                  <p className='pt-2 text-center'>{item.movingsignal}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className='form-center col-span-9'>
            <p>No record found.</p>
          </div>
        )}
      </div>
    </>
  );
};
