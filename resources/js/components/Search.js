/** React. */
import { useEffect, useState } from 'react'

/** Component. */
import Icon from './Icon'

const Search = ({ close, items }) => {
  /** Use state. */
  const [search, setSearch] = useState()
  const [keyword, setKeyword] = useState()

  /** Search handler. */
  const searchHandler = () => {
    if (keyword.trim() && items) {
      /** Find item in the array. */
      let find = items.filter((item) => item.symbol.toLowerCase().includes(keyword.toLowerCase()))

      /** If found put it in local state. */
      if (find) {
        return setSearch(find)
      }
    }
  }

  const searchChange = (value) => {
    if (value) {
      setKeyword(value)
    } else {
      setKeyword('')
    }
  }

  /** Use effect. */
  useEffect(() => {
    if (!keyword) {
      setSearch('')
    }
  }, [keyword, search])

  /** Return something. */
  return (
    <>
      <div className='flex flex-col md:flex-row justify-center align-center gap-2 w-full rounded-t-md bg-slate-50'>
        <div className='p-2 grow w-full md:w-1/4 text-center'>
          <label className='p-2 block uppercase' htmlFor='search'>
            Search
          </label>
        </div>
        <div className='p-2 grow w-full md:w-2/4 text-center'>
          <input
            className='p-2 rounded shadow w-full uppercase'
            id='search'
            name='search'
            type='search'
            autoComplete='off'
            placeholder='Type stock symbol'
            value={keyword}
            onChange={(e) => searchChange(e.target.value)}
          />
        </div>
        <div className='p-2 grow w-full md:w-1/4 text-center'>
          <button className='p-2' type='button' onClick={() => searchHandler()}>
            <Icon id='search' /> Search
          </button>
          <button className='p-2' type='button' onClick={() => close()}>
            <Icon id='close' /> Close
          </button>
        </div>
      </div>

      {search ? (
        search.map((item, index) => {
          /** Return. */
          return (
            <div
              className={`p-2 flex flex-col sm:flex-row flex-wrap justify-center align-center gap-2 my-2 w-full bg-slate-50 shadow ${
                index & (1 == 1) ? 'rounded-t-md' : 'rounded-b-md'
              }`}>
              <div className='grow w-full sm:w-1/2 md:w-1/4 border border-slate-100'>
                <div className='p-2 uppercase text-green-500'>Edge</div>
                <div className='p-2 text-center pb-4'>{item.edge}</div>
              </div>
              <div className='grow w-full sm:w-1/2 md:w-1/4 border border-slate-100'>
                <div className='p-2 uppercase text-green-500'>Symbol</div>
                <div className='p-2 text-center pb-4'>{item.symbol}</div>
              </div>
              <div className='grow w-full sm:w-1/2 md:w-1/4 border border-slate-100'>
                <div className='p-2 uppercase text-green-500'>Price</div>
                <div className='p-2 text-center pb-4'>{item.price}</div>
              </div>
              <div className='grow w-full sm:w-1/2 md:w-1/4 border border-slate-100'>
                <div className='p-2 uppercase text-green-500'>Value</div>
                <div className='p-2 text-center pb-4'>{item.value}</div>
              </div>
              <div className='grow w-full sm:w-1/2 md:w-1/4 border border-slate-100'>
                <div className='p-2 uppercase text-green-500'>Price Range</div>
                <div className='p-2 text-center pb-4'>{item.pricerange}</div>
              </div>
              <div className='grow w-full sm:w-1/2 md:w-1/4 border border-slate-100'>
                <div className='p-2 uppercase text-green-500'>Total Assets</div>
                <div className='p-2 text-center pb-4'>{item.totalassets}</div>
              </div>
              <div className='grow w-full sm:w-1/2 md:w-1/4 border border-slate-100'>
                <div className='p-2 uppercase text-green-500'>Net Income</div>
                <div className='p-2 text-center pb-4'>{item.netincomeaftertax}</div>
              </div>
              <div className='grow w-full sm:w-1/2 md:w-1/4 border border-slate-100'>
                <div className='p-2 uppercase text-green-500'>Debt Asset Ratio</div>
                <div className='p-2 text-center pb-4'>{item.debtassetratio}</div>
              </div>
              <div className='grow w-full sm:w-1/2 md:w-1/4 border border-slate-100'>
                <div className='p-2 uppercase text-green-500'>Dividend Yield</div>
                <div className='p-2 text-center pb-4'>{item.dividendyield}</div>
              </div>
            </div>
          )
        })
      ) : (
        <div className='form-center w-full'>
          <p>No record found.</p>
        </div>
      )}
    </>
  )
}

export default Search
