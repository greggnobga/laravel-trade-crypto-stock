/** Component. */
import Icon from "./Icon";

const Search = ({ close }) => {
    /** Return something. */
    return (
        <div className='flex flex-col sm:flex-row justify-center align-center gap-2 w-full border-bottom'>
            <div className='p-2 grow w-full sm:w-1/4 text-center border border-green-500'>
                <label className='p-2 block uppercase' htmlFor='search'>
                    Search
                </label>
            </div>
            <div className='p-2 grow w-full sm:w-2/4 text-center border border-orange-500'>
                <input className='p-2 rounded shadow w-full' id='search' name='search' type='text' autoComplete='off' />
            </div>
            <div className='p-2 grow w-full sm:w-1/4 text-center border border-blue-500'>
                <button className='p-2' type='button'>
                    <Icon id='search' /> Search
                </button>
                <button className='p-2' type='button' onClick={() => close()}>
                    <Icon id='close' /> Close
                </button>
            </div>
        </div>
    );
};

export default Search;
