/** Component. */
import Icon from '../../components/Icon'

/** Modal edge template. */
export const modalEdgeTemplate = (props) => {
  /** Return. */
  return (
    <div className='grid auto-rows-min h-fit rounded-t-md bg-stone-100 uppercase'>
      <div className='p-2 flex flex-row justify-between border-b border-stone-200'>
        <h1 className='text-xl'>{props.header}</h1>
        <p className='sm:pl-2 cursor-pointer' onClick={props.close}>
          <Icon id='close' /> <span className='invisible sm:visible'>Close</span>
        </p>
      </div>
      <div className='p-2 flex flex-row items-center justify-center border-b border-stone-200 w-full hover:text-purple-500'>
        <div className='w-4/12'>Index</div>
        <div className='w-4/12'>Symbol</div>
        <div className='w-4/12'>Action</div>
      </div>
      {props.data && props.data.length != 0 ? (
        props.data.map((item, index) => {
          /** Return. */
          return (
            <>
              <div className='p-2 flex flex-row items-center justify-center border-b border-stone-200 w-full hover:text-green-500'>
                <div className='w-4/12'>{index + 1}</div>
                <div className='w-4/12'>{item.symbol}</div>
                <div className='w-4/12'>
                  {props.index === index && props.shown ? (
                    <span
                      className='uppercase cursor-pointer'
                      onClick={() => {
                        props.form(false)
                      }}>
                      <Icon id='add' /> <span className='invisible sm:visible'>Close</span>
                    </span>
                  ) : (
                    <span
                      className='uppercase cursor-pointer'
                      onClick={() => {
                        props.form(true)
                        props.set(index)
                      }}>
                      <Icon id='add' /> <span className='invisible sm:visible cursor-pointer'>Update</span>
                    </span>
                  )}
                </div>
              </div>

              {props.shown && props.index === index && (
                <div className='p-2 flex flex-col sm:flex-row items-center justify-center border-b border-stone-200 w-full hover:text-green-500'>
                  <div className='grow sm:w-4/12'>{item.symbol}</div>
                  <div className='grow sm:w-4/12'>
                    <input
                      className={`p-2 rounded shadow ${
                        props.error ? 'border border-red-500 text-red' : 'border border-green-500 text-green'
                      }`}
                      id='edge'
                      name='edge'
                      type='text'
                      placeholder='Enter Edge ID'
                      onBlur={props.blur}
                      onChange={props.change}
                      value={props.value}
                      autoComplete='off'
                    />
                    {props.error && <p className='pt-1 text-red-500 text-[.50rem]'>Please enter a valid edge id.</p>}
                  </div>
                  <div className='grow sm:w-4/12'>
                    <button
                      className='uppercase cursor-pointer'
                      onClick={() => {
                        props.action({
                          symbol: item.symbol,
                          value: props.value,
                        })
                        props.form(false)
                        props.reset()
                      }}
                      disabled={props.error}>
                      <Icon id='submit' /> <span className='invisible sm:visible'>Submit</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )
        })
      ) : (
        <div className='form-center'>
          <p>No record found.</p>
        </div>
      )}
    </div>
  )
}

/** Modal bluechip template. */
export const modalBlueTemplate = (props) => {
  /** Return. */
  return (
    <div className='grid auto-rows-min h-fit rounded-t-md bg-stone-100 uppercase'>
      <div className='p-2 flex flex-row justify-between border-b border-stone-200'>
        <h1 className='text-xl'>{props.header}</h1>
        <div className='p-0'>
          <span className='text-right sm:pl-2 cursor-pointer' onClick={() => props.form(!props.shown)}>
            {props.shown ? (
              <>
                <Icon id='cancel' /> <span className='invisible sm:visible cursor-pointer'>Cancel</span>
              </>
            ) : (
              <>
                <Icon id='add' /> <span className='invisible sm:visible cursor-pointer'>Add</span>
              </>
            )}
          </span>
          <span className='text-right sm:pl-2' onClick={props.close}>
            <Icon id='close' /> <span className='invisible sm:visible'>Close</span>
          </span>
        </div>
      </div>
      <div className='p-2 flex flex-row items-center justify-center border-b border-stone-200 w-full hover:text-purple-500'>
        <div className='w-4/12'>Index</div>
        <div className='w-4/12'>Symbol</div>
        <div className='w-4/12'>Action</div>
      </div>
      {props.shown ? (
        <div className='p-2 flex flex-col sm:flex-row items-center justify-center border-b border-stone-200 w-full hover:text-green-500'>
          <div className='grow sm:w-4/12 uppercase'>Add Bluechip</div>
          <div className='grow sm:w-4/12'>
            <input
              className={`p-2 rounded shadow ${
                props.error ? 'border border-red-500 text-red' : 'border border-green-500 text-green'
              }`}
              id='bluechip'
              name='bluechip'
              type='text'
              placeholder='Enter Symbol'
              onBlur={props.blur}
              onChange={props.change}
              value={props.value}
              autoComplete='off'
            />
            {props.error && <p className='pt-1 text-red-500 text-[.50rem]'>Please enter a valid symbol.</p>}
          </div>
          <div className='grow sm:w-4/12'>
            <button
              className='uppercase cursor-pointer'
              onClick={() => {
                props.action({
                  statement: 'store',
                  value: props.value,
                })
                props.form(false)
                props.reset()
              }}
              disabled={props.error}>
              <Icon id='submit' /> <span className='invisible sm:visible'>Submit</span>
            </button>
          </div>
        </div>
      ) : props.data && props.data.length != 0 ? (
        props.data.map((item, index) => {
          return (
            <div className='p-2 flex flex-row items-center justify-center border-b border-stone-200 w-full hover:text-green-500'>
              <div className='w-4/12'>{index + 1}</div>
              <div className='w-4/12'>{item.symbol}</div>
              <div className='w-4/12'>
                <button
                  className='uppercase cursor-pointer'
                  onClick={() => {
                    props.action({
                      statement: 'destroy',
                      value: item.symbol,
                    })
                    props.form(false)
                    props.reset()
                  }}
                  disabled={props.error}>
                  <Icon id='destroy' /> <span className='invisible sm:visible'>Delete</span>
                </button>
              </div>
            </div>
          )
        })
      ) : (
        <div className='form-center'>
          <p>No record found.</p>
        </div>
      )}
    </div>
  )
}

/** Modal leader board template. */
export const stockLeaderBoard = (props) => {
  /** Return. */
  return (
    <div className='p-2 sm:row-start-2 card-rounded-scale h-fit hover:z-10'>
      <div className='p-2 flex flex-row justify-between border-b border-stone-200'>
        <p className='grow w-full text-center uppercase'>{props.header}</p>
      </div>
      <div className='p-2 flex flex-row justify-between border-b border-stone-200 text-green-500'>
        <span className='w-2/12'>Symbol</span>
        <span className='w-2/12'>Price</span>
        <span className='w-2/12'>Change</span>
        <span className='w-2/12'>Range</span>
      </div>
      {props.data && props.data.length != 0 ? (
        props.data.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => props.show(true)}
              className='p-2 flex flex-row justify-between border-b border-stone-200 hover:bg-stone-100 hover:text-purple-500'>
              <span className='w-2/12 text-[.5rem] sm:text-[.65rem]'>{item.symbol}</span>
              <span className='w-2/12 text-[.5rem] sm:text-[.65rem]'>{item.price}</span>
              <span className='w-2/12 text-[.5rem] sm:text-[.65rem]'>{item.change}</span>
              <span className='w-2/12 text-[.5rem] sm:text-[.65rem]'>{item.pricerange}</span>
            </div>
          )
        })
      ) : (
        <div className='form-center'>
          <p>No record found.</p>
        </div>
      )}
    </div>
  )
}