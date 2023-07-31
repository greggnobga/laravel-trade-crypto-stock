/** Component. */
import Icon from '../../components/Icon';
import Message from '../../components/Message';

/** Desktop header. */
export const desktopContent = ({ items }) => {
  return (
    <>
      <div className='grid auto-rows-min grid-cols-9 h-fit rounded-t-md bg-stone-100 uppercase border-b border-stone-200'>
        <div className='p-2 col-span-3'>
          <div className='flex flex-row flex-wrap justify-between h-full'>
            <div className='grow w-1/3 self-center'>
              <p className='text-green-500'>Symbol</p>
            </div>
            <div className='grow w-1/3 self-center'>
              <p className='text-green-500'>Price</p>
            </div>
            <div className='grow w-1/3 self-center'>
              <p className='text-green-500'>Volume</p>
            </div>
          </div>
        </div>
        <div className='p-2 col-span-6'>
          <div className='grid auto-rows-min'>
            <div className='pb-2 flex flex-row flex-wrap justify-between h-full'>
              <div className='grow w-1/3 self-center'>
                <p className='text-center text-green-500'>Short</p>
              </div>
              <div className='grow w-1/3 self-center'>
                <p className='text-center text-green-500'>Medium</p>
              </div>
              <div className='grow w-1/3 self-center'>
                <p className='text-center text-green-500'>Long</p>
              </div>
            </div>
            <div className='flex flex-row flex-wrap justify-between h-full'>
              <div className='grow w-1/6'>
                <p className='text-purple-500 text-[.50rem]'>Price</p>
              </div>
              <div className='grow w-1/6'>
                <p className='text-purple-500 text-[.50rem]'>Volume</p>
              </div>
              <div className='grow w-1/6'>
                <p className='text-purple-500 text-[.50rem]'>Price</p>
              </div>
              <div className='grow w-1/6'>
                <p className='text-purple-500 text-[.50rem]'>Volume</p>
              </div>
              <div className='grow w-1/6'>
                <p className='text-purple-500 text-[.50rem]'>Price</p>
              </div>
              <div className='grow w-1/6'>
                <p className='text-purple-500 text-[.50rem]'>Volume</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='grid auto-rows-min grid-cols-9 h-fit bg-stone-100 border-b border-stone-200 hover:text-purple-500'>
        {items != 0 && items ? (
          items.map((item, key) => {
            return (
              <>
                <div className='p-2 col-span-3'>
                  <div className='flex flex-row flex-wrap justify-between h-full'>
                    <div className='grow w-1/3'>
                      <p className='p-0'>{item.symbol}</p>
                    </div>
                    <div className='grow w-1/3'>
                      <p className='p-0'>{item.price}</p>
                    </div>
                    <div className='grow w-1/3'>
                      <p className='p-0'>{item.volume}</p>
                    </div>
                  </div>
                </div>
                <div className='p-2 col-span-6'>
                  <div className='grid auto-rows-min'>
                    <div className='flex flex-row flex-wrap justify-between h-full'>
                      <div className='grow w-1/6'>
                        <p className='p-0'>{item.shortprice}</p>
                      </div>
                      <div className='grow w-1/6'>
                        <p className='p-0'>{item.shortvolume}</p>
                      </div>
                      <div className='grow w-1/6'>
                        <p className='p-0'>{item.mediumprice}</p>
                      </div>
                      <div className='grow w-1/6'>
                        <p className='p-0'>{item.mediumvolume}</p>
                      </div>
                      <div className='grow w-1/6'>
                        <p className='p-0'>{item.longprice}</p>
                      </div>
                      <div className='grow w-1/6'>
                        <p className='p-0'>{item.longvolume}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
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

/** Build modal contentr. */
export const desktopModalContent = ({ header, close, action, fetch, items, symbol, message, error }) => {
  /** Return something.  */
  return (
    <div className='grid auto-rows-min h-fit rounded-t-md bg-stone-100 my-2'>
      <div className='p-2 flex flex-row justify-between border-b border-stone-200'>
        <h1 className='text-base uppercase'>{header} Moving Average</h1>
        <p className='sm:pl-2 cursor-pointer' onClick={close}>
          <Icon id='close' /> <span className='invisible sm:visible'>Close</span>
        </p>
      </div>
      <div className='p-2 flex flex-row items-center justify-center border-b border-stone-200 w-full hover:text-purple-500'>
        <div className='w-1/4'>Index</div>
        <div className='w-1/4'>Symbol</div>
        <div className='w-1/4'>Action</div>
        <div className='w-1/4'>Status</div>
      </div>
      {items != 0 && items ? (
        items.map((item, index) => {
          return (
            <>
              <div className='p-2 flex flex-row items-center justify-center border-b border-stone-200 w-full hover:text-purple-500'>
                <div className='w-1/4'>{index}</div>
                <div className='w-1/4'>{item.symbol}</div>
                <div className='w-1/4'>
                  <button
                    className='uppercase cursor-pointer'
                    onClick={() => {
                      action({ symbol: item.symbol });
                    }}>
                    <Icon id='add' /> <span className='invisible sm:visible'>Submit</span>
                  </button>
                </div>
                <div className='w-1/4 uppercase'>
                  {fetch && fetch.find((stock) => stock.symbol === item.symbol) ? (
                    <span className='text-green-500'>
                      <Icon id='submit' />
                    </span>
                  ) : (
                    <span className='text-red-500'>
                      <Icon id='close' />
                    </span>
                  )}
                </div>
              </div>
              {symbol && symbol === item.symbol && (
                <div className='p-2 flex flex-row items-center justify-center border-b border-stone-200 w-full'>
                  {message && <Message variant='alert-success' children={message} />}
                  {error && <Message variant='alert-warning' children={error} />}
                </div>
              )}
            </>
          );
        })
      ) : (
        <div className='form-center'>
          <p>No record found.</p>
        </div>
      )}
    </div>
  );
};
