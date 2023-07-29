/** Desktop header. */
export const desktopHeader = (
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
)
