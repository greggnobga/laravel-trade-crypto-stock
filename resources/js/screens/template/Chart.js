/** Component. */
import Icon from '../../components/Icon';

/** Desktop header. */
export const desktopHeader = ({ items }) => {
  return (
    <>
      <div className='grid auto-rows-min grid-cols-9 h-fit rounded-t-md bg-stone-100 uppercase border-b border-stone-200'>
        <div className='p-2 col-span-3'>
          <div className='flex flex-row flex-wrap justify-between h-full'>
            <div className='grow m-auto w-1/3'>
              <p className='text-center text-green-500'>Symbol</p>
            </div>
            <div className='grow m-auto w-1/3'>
              <p className='text-center text-green-500'>Price</p>
            </div>
            <div className='grow m-auto w-1/3'>
              <p className='text-center text-green-500'>Volume</p>
            </div>
          </div>
        </div>
        <div className='p-2 col-span-6'>
          <div className='grid auto-rows-min'>
            <div className='flex flex-row flex-wrap justify-between h-full'>
              <div className='grow m-auto w-1/3'>
                <p className='text-center text-green-500'>Short</p>
              </div>
              <div className='grow m-auto w-1/3'>
                <p className='text-center text-green-500'>Medium</p>
              </div>
              <div className='grow m-auto w-1/3'>
                <p className='text-center text-green-500'>Long</p>
              </div>
            </div>
            <div className='flex flex-row flex-wrap justify-between h-full'>
              <div className='grow m-auto w-1/6'>
                <p className='text-center text-purple-500 text-[.50rem]'>Price</p>
              </div>
              <div className='grow m-auto w-1/6'>
                <p className='text-center text-purple-500 text-[.50rem]'>Volume</p>
              </div>
              <div className='grow m-auto w-1/6'>
                <p className='text-center text-purple-500 text-[.50rem]'>Price</p>
              </div>
              <div className='grow m-auto w-1/6'>
                <p className='text-center text-purple-500 text-[.50rem]'>Volume</p>
              </div>
              <div className='grow m-auto w-1/6'>
                <p className='text-center text-purple-500 text-[.50rem]'>Price</p>
              </div>
              <div className='grow m-auto w-1/6'>
                <p className='text-center text-purple-500 text-[.50rem]'>Volume</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='grid auto-rows-min grid-cols-9 h-fit bg-stone-100'>
        {items != 0 && items ? (
          items.map((item, key) => {
            return (
              <>
                <div className='py-2 w-1/6 text-center'>Test 1</div>
                <div className='py-2 w-1/6 text-center'>Test 2</div>
                <div className='py-2 w-1/6 text-center'>Test 3</div>
                <div className='py-2 w-1/6 text-center'>Test 4</div>
                <div className='py-2 w-1/6 text-center'>Test 5</div>
                <div className='py-2 w-1/6 text-center'>Test 6</div>
                <div className='py-2 w-1/6 text-center'>Test 7</div>
                <div className='py-2 w-1/6 text-center'>Test 8</div>
                <div className='py-2 w-1/6 text-center'>Test 9</div>
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
export const desktopModalContent = ({ header, close, action, disabled, items }) => {
  return (
    <div className='grid auto-rows-min h-fit rounded-t-md bg-stone-100 my-2'>
      <div className='p-2 flex flex-row justify-between border-b border-stone-200'>
        <h1 className='text-base uppercase'>{header} Fetch Moving Average</h1>
        <p className='sm:pl-2 cursor-pointer' onClick={close}>
          <Icon id='close' /> <span className='invisible sm:visible'>Close</span>
        </p>
      </div>
      <div className='p-2 flex flex-row items-center justify-center border-b border-stone-200 w-full hover:text-purple-500'>
        <div className='w-4/12'>Index</div>
        <div className='w-4/12'>Symbol</div>
        <div className='w-4/12'>Action</div>
      </div>
      {items != 0 && items ? (
        items.map((item, index) => {
          return (
            <div className='p-2 flex flex-row items-center justify-center border-b border-stone-200 w-full hover:text-purple-500'>
              <div className='w-4/12'>{index}</div>
              <div className='w-4/12'>{item.symbol}</div>
              <div className='w-4/12'>
                <button
                  className='uppercase cursor-pointer'
                  onClick={() => {
                    action({ symbol: item.symbol });
                  }}
                  disabled={disabled}>
                  <Icon id='submit' /> <span className='invisible sm:visible'>Submit</span>
                </button>
              </div>
            </div>
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
