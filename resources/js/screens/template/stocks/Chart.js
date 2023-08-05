/** Component. */
import Icon from '../../../components/Icon';
import Message from '../../../components/Message';

/** Desktop content. */
export const desktopContent = ({ items, current }) => {
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
          <p>Range</p>
        </div>
        <div className='p-2'>
          <p>Change</p>
        </div>
        <div className='p-2'>
          <p>
            {current - 1} <span className='text-[.50rem]'>Average Price</span>
          </p>
        </div>
        <div className='p-2'>
          <p>
            {current - 2} <span className='text-[.50rem]'>Average Price</span>
          </p>
        </div>
        <div className='p-2'>
          <p>
            {current - 3} <span className='text-[.50rem]'>Average Price</span>
          </p>
        </div>
      </div>
      <div className='grid auto-rows-min h-fit bg-stone-100'>
        {items != 0 && items ? (
          items.map((item, key) => {
            return (
              <div className='grid auto-rows-min grid-cols-8 h-fit border-b border-stone-200 hover:text-purple-500'>
                <div className='p-2'>
                  <a href={`https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=${item.edge}`} target='_blank'>
                    <span className='uppercase'>{item.symbol}</span>
                  </a>
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
                  <p>{item.change}</p>
                </div>
                <div className='p-2'>
                  <p>{item.averageone}</p>
                </div>
                <div className='p-2'>
                  <p>{item.averagetwo}</p>
                </div>
                <div className='p-2'>
                  <p>{item.averagethree}</p>
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

/** Mobile content. */
export const mobileContent = ({ items, current }) => {
  /** Return something. */
  return (
    <div className='grid auto-rows-min h-fit'>
      {items != 0 && items ? (
        items.map((item, key) => {
          return (
            <div className='mb-2 card-rounded grid auto-rows-min grid-cols-2 sm:grid-cols-3 md:grid-cols-4 hover:text-purple-500'>
              <div className='p-2'>
                <p className='p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>Symbol</p>
                <p className='pt-2 text-center'>
                  <a href={`https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=${item.edge}`} target='_blank'>
                    <span className='uppercase'>{item.symbol}</span>
                  </a>
                </p>
              </div>
              <div className='p-2'>
                <p className='p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>Price</p>
                <p className='pt-2 text-center'>{item.price}</p>
              </div>
              <div className='p-2'>
                <p className='p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>Value</p>
                <p className='pt-2 text-center'>{item.value}</p>
              </div>
              <div className='p-2'>
                <p className='p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>Range</p>
                <p className='pt-2 text-center'>{item.pricerange}</p>
              </div>
              <div className='p-2'>
                <p className='p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>Change</p>
                <p className='pt-2 text-center'>{item.change}</p>
              </div>
              <div className='p-2'>
                <p className='p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>
                  {current - 1} <span className='text-[.50rem]'>Average Price</span>
                </p>
                <p className='pt-2 text-center'>{item.averageone}</p>
              </div>
              <div className='p-2'>
                <p className='p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>
                  {current - 2} <span className='text-[.50rem]'>Average Price</span>
                </p>
                <p className='pt-2 text-center'>{item.averagetwo}</p>
              </div>
              <div className='p-2'>
                <p className='p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>
                  {current - 3} <span className='text-[.50rem]'>Average Price</span>
                </p>
                <p className='pt-2 text-center'>{item.averagethree}</p>
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
  );
};
