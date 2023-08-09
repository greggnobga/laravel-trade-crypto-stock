/** Component. */
import Icon from '../../../components/Icon';
import BarChart from '../../../components/BarChart';

/** Desktop content. */
export const desktopContent = ({ icon, header, text, store, update, destroy, items }) => {
  /** Return something. */
  return (
    <div className='grid auto-rows-min h-fit rounded-t-md bg-stone-100 uppercase my-2'>
      <div className='flex flex-wrap flex-row justify-between align-center h-fit border-b border-stone-200'>
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
          <div className='flex flex-wrap flex-row justify-start align-center w-full h-fit border-b border-stone-200'>
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
                <div className='flex flex-wrap flex-row justify-start align-center w-full h-fit border-b border-stone-200'>
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
          <div className='flex flex-wrap flex-row justify-start align-center h-fit border-b border-stone-200'>
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
                <div className='flex flex-wrap flex-row justify-start align-center w-full h-fit border-b border-stone-200'>
                  <div className='grow w-[14.25%] py-2'>{item.date}</div>
                  <div className='grow w-[14.25%] py-2'>{item.order}</div>
                  <div className='grow w-[14.25%] py-2'>{item.symbol}</div>
                  <div className='grow w-[14.25%] py-2'>{item.share}</div>
                  <div className='grow w-[14.25%] py-2'>{item.capital}</div>
                  <div className='grow w-[14.25%] py-2'>{item.fee}</div>
                  <div className='grow w-[14.25%] py-2'>
                    <span className='pr-2' onClick={() => update(item)}>
                      <Icon id='update' width='w-4' height='h-4' /> Update
                    </span>
                    <span className='pr-0' onClick={() => destroy(item.symbol)}>
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

/** Modal content. */
export const modalStoreContent = ({ element, type, label, style, value, placeholder, change, blur, error, options }) => {
  return (
    <div className='p-2 p-2 form-control'>
      <label className='form-label uppercase' htmlFor={label}>
        {label}
      </label>
      {element === 'select' ? (
        <select className={`p-2 form-input ${style}`} id={label} name={label} value={value} onChange={change} onBlur={blur}>
          <option value=''></option>
          <option value='buy'>Buy</option>
          <option value='sell'>Sell</option>
        </select>
      ) : (
        <input
          className={`p-2 form-input uppercase ${style}`}
          type={type}
          id={label}
          name={label}
          value={value}
          placeholder={placeholder}
          onChange={change}
          onBlur={blur}
          autoComplete='off'
        />
      )}
      {error && <p className='form-alert text-red-500'>Please select a valid {label}.</p>}
    </div>
  );
};
