/** Component. */
import Icon from '../../components/Icon';
import Message from '../../components/Message';

/** Desktop header. */
export const desktopContent = ({ items }) => {
  return (
    <>
      <div className='grid auto-rows-min grid-cols-8 h-fit rounded-t-md bg-stone-100 uppercase border-b border-stone-200'>
        <div className='p-2'>
          <p className='text-green-500'>Symbol</p>
        </div>
        <div className='p-2'>
          <p className='text-green-500'>Price</p>
        </div>
        <div className='p-2'>
          <p className='text-green-500'>Value</p>
        </div>
        <div className='p-2'>
          <p className='text-green-500'>Range</p>
        </div>
        <div className='p-2'>
          <p className='text-green-500'>Change</p>
        </div>
        <div className='p-2 has-tooltip'>
          <span class='tooltip uppercase text-center'>Average price from last year.</span>
          <p className='text-green-500'>1Y AP</p>
        </div>
        <div className='p-2 has-tooltip'>
          <span class='tooltip uppercase text-center'>Average price for the past two years.</span>
          <p className='text-green-500'>2Y AP</p>
        </div>
        <div className='p-2 has-tooltip'>
          <span class='tooltip uppercase text-center'>Average pricing over the past three years.</span>
          <p className='text-green-500'>3Y AP</p>
        </div>
      </div>
      <div className='grid auto-rows-min h-fit bg-stone-100'>
        {items != 0 && items ? (
          items.map((item, key) => {
            return (
              <div className='grid auto-rows-min grid-cols-8 h-fit border-b border-stone-200 hover:text-purple-500'>
                <div className='p-2'>
                  <p className='text-green-500'>{item.symbol}</p>
                </div>
                <div className='p-2'>
                  <p className='text-green-500'>{item.price}</p>
                </div>
                <div className='p-2'>
                  <p className='text-green-500'>{item.value}</p>
                </div>
                <div className='p-2'>
                  <p className='text-green-500'>{item.pricerange}</p>
                </div>
                <div className='p-2'>
                  <p className='text-green-500'>{item.change}</p>
                </div>
                <div className='p-2'>
                  <p className='text-green-500'>{item.averageone}</p>
                </div>
                <div className='p-2'>
                  <p className='text-green-500'>{item.averagetwo}</p>
                </div>
                <div className='p-2'>
                  <p className='text-green-500'>{item.averagethree}</p>
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
