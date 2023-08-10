/** Component. */
import Icon from '../../../components/Icon';
import BarChart from '../../../components/BarChart';

/** Desktop content. */
export const desktopContent = ({ icon, header, text, store, update, destroy, items }) => {
  /** Return something. */
  return (
    <div className='grid auto-rows-min h-fit rounded-t-md bg-stone-100 uppercase my-2'>
      <div className='flex flex-wrap flex-row justify-between items-center h-fit border-b border-stone-200'>
        <div className='p-2'>
          <Icon id={icon} />
          <span className='uppercase pl-2'>{header}</span>
        </div>
        {text && (
          <div className='p-2 cursor-pointer' onClick={() => store()}>
            <Icon id={text} />
            <span className='uppercase'>{text}</span>
          </div>
        )}
      </div>
      {header === 'chart' && (
        <div className='p-2'>
          <BarChart items={items} />
        </div>
      )}

      {header === 'hold' && (
        <div className='p-2'>
          <div className='flex flex-wrap flex-row justify-start items-center w-full h-fit border-b border-stone-200'>
            <div className='grow w-[14.25%] pb-2'>Symbol</div>
            <div className='grow w-[14.25%] pb-2'>Share</div>
            <div className='grow w-[14.25%] pb-2'>Capital</div>
            <div className='grow w-[14.25%] pb-2'>Fee</div>
            <div className='grow w-[14.25%] pb-2'>Average</div>
            <div className='grow w-[14.25%] pb-2'>Price</div>
            <div className='grow w-[14.25%] pb-2'>Prospect</div>
          </div>
          {items.length != 0 &&
            items.map((item) => {
              return (
                <div className='flex flex-wrap flex-row justify-start items-center w-full h-fit border-b border-stone-200'>
                  <div className='grow w-[14.25%] py-2'>{item.symbol}</div>
                  <div className='grow w-[14.25%] py-2'>{item.share}</div>
                  <div className='grow w-[14.25%] py-2'>{item.capital}</div>
                  <div className='grow w-[14.25%] py-2'>{item.fee}</div>
                  <div className='grow w-[14.25%] py-2'>{item.average}</div>
                  <div className='grow w-[14.25%] py-2'>{item.price}</div>
                  <div className='grow w-[14.25%] py-2'>{item.prospect}</div>
                </div>
              );
            })}
        </div>
      )}

      {header === 'order' && (
        <div className='p-2'>
          <div className='flex flex-wrap flex-row justify-start items-center h-fit border-b border-stone-200'>
            <div className='grow w-[14.25%] pb-2'>Date</div>
            <div className='grow w-[14.25%] pb-2'>Order</div>
            <div className='grow w-[14.25%] pb-2'>Symbol</div>
            <div className='grow w-[14.25%] pb-2'>Share</div>
            <div className='grow w-[14.25%] pb-2'>Capital</div>
            <div className='grow w-[14.25%] pb-2'>Fee</div>
            <div className='grow w-[14.25%] pb-2'>Action</div>
          </div>
          {items.length != 0 &&
            items.map((item) => {
              return (
                <div className='flex flex-wrap flex-row justify-start items-center w-full h-fit border-b border-stone-200'>
                  <div className='grow w-[14.25%] py-2'>{item.date}</div>
                  <div className='grow w-[14.25%] py-2'>{item.order}</div>
                  <div className='grow w-[14.25%] py-2'>{item.symbol}</div>
                  <div className='grow w-[14.25%] py-2'>{item.share}</div>
                  <div className='grow w-[14.25%] py-2'>{item.capital}</div>
                  <div className='grow w-[14.25%] py-2'>{item.fee}</div>
                  <div className='grow w-[14.25%] py-2'>
                    <span className='pr-2 cursor-pointer' onClick={() => update(item)}>
                      <Icon id='update' width='w-4' height='h-4' /> Update
                    </span>
                    <span className='pr-0 cursor-pointer' onClick={() => destroy(item.symbol)}>
                      <Icon id='destroy' width='w-4' height='h-4' /> Delete
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

/** Mobile content. */
export const mobileContent = ({ icon, header, text, store, update, destroy, items }) => {
  /** Return something. */
  return (
    <div className='grid auto-rows-min h-fit rounded-t-md bg-stone-100 uppercase my-2'>
      <div className='flex flex-wrap flex-row justify-between items-center h-fit border-b border-stone-200'>
        <div className='p-2'>
          <Icon id={icon} />
          <span className='uppercase pl-2'>{header}</span>
        </div>
        {text && (
          <div className='p-2 cursor-pointer' onClick={() => store()}>
            <Icon id={text} />
            <span className='uppercase'>{text}</span>
          </div>
        )}
      </div>
      {header === 'chart' && (
        <div className='p-2'>
          <BarChart items={items} />
        </div>
      )}

      {header === 'hold' &&
        items.length != 0 &&
        items.map((item) => {
          return (
            <div className='p-2 grid auto-rows-min grid-cols-2 sm:grid-cols-3 gap-2 justify-start items-center w-full h-fit border-b border-stone-200'>
              <div className='py-2'>
                <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Symbol</p>
                <p className='pt-2 text-center'>{item.symbol}</p>
              </div>
              <div className='py-2'>
                <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Share</p>
                <p className='pt-2 text-center'>{item.share}</p>
              </div>
              <div className='py-2'>
                <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Capital</p>
                <p className='pt-2 text-center'>{item.capital}</p>
              </div>
              <div className='py-2'>
                <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Fee</p>
                <p className='pt-2 text-center'>{item.fee}</p>
              </div>
              <div className='py-2'>
                <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Average</p>
                <p className='pt-2 text-center'>{item.average}</p>
              </div>
              <div className='py-2'>
                <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Price</p>
                <p className='pt-2 text-center'>{item.price}</p>
              </div>
              <div className='py-2'>
                <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Prospect</p>
                <p className='pt-2 text-center'>{item.prospect}</p>
              </div>
            </div>
          );
        })}

      {header === 'order' &&
        items.length != 0 &&
        items.map((item) => {
          return (
            <div className='p-2 grid auto-rows-min grid-cols-2 sm:grid-cols-3 gap-2 justify-start items-center w-full h-fit border-b border-stone-200'>
              <div className='py-2'>
                <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Date</p>
                <p className='pt-2 text-center'>{item.date}</p>
              </div>
              <div className='py-2'>
                <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Order</p>
                <p className='pt-2 text-center'>{item.order}</p>
              </div>
              <div className='py-2'>
                <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Symbol</p>
                <p className='pt-2 text-center'>{item.symbol}</p>
              </div>
              <div className='py-2'>
                <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Share</p>
                <p className='pt-2 text-center'>{item.share}</p>
              </div>
              <div className='py-2'>
                <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Capital</p>
                <p className='pt-2 text-center'>{item.capital}</p>
              </div>
              <div className='py-2'>
                <p className='p-2 rounded-t-md bg-stone-200 border-b border-stone-100 text-green-500'>Fee</p>
                <p className='pt-2 text-center'>{item.fee}</p>
              </div>
              <div className='py-2 col-span-2 sm:col-span-3 text-center'>
                <span className='pr-2 cursor-pointer' onClick={() => update(item)}>
                  <Icon id='update' width='w-4' height='h-4' /> Update
                </span>
                <span className='pr-0 cursor-pointer' onClick={() => destroy(item.symbol)}>
                  <Icon id='destroy' width='w-4' height='h-4' /> Delete
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
};
