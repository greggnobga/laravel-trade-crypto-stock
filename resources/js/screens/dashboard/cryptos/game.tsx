/** Component. */
import Icon from '$lib/components/icon';

const GameCrypto = () => {
    return (
        <section className='m-2 grid auto-rows-min h-fit'>
            <div className='p-2 h-8 sm:10 uppercase'>Game</div>
            {/** Game */}
            <div class='flex flex-wrap flex-col sm:flex-row gap-2 justify-between items-center h-fit'>
                <div className='rounded-t-md bg-stone-100 cursor-pointer w-full'>
                    <div className='flex flex-wrap flex-col sm:flex-row gap-2 justify-between items-center h-fit border-b border-stone-200'>
                        <div className='flex flex-row flex-wrap justify-between items-center w-full'>
                            <div className='p-2'>
                                <Icon id='trade' width='w-6' height='h-6' /> List
                            </div>
                        </div>
                    </div>
                    <div className='p-2 border-b border-stone-200 hover:text-purple-500 text-xs'>Game 1</div>
                    <div className='p-2 border-b border-stone-200 hover:text-purple-500 text-xs'>Game 2</div>
                    <div className='p-2 border-b border-stone-200 hover:text-purple-500 text-xs'>Game 3</div>
                </div>
            </div>
        </section>
    );
};

export default GameCrypto;
