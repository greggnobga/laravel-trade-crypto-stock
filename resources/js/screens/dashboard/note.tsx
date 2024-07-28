/** Vendor. */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** Hook. */
import { useAppSelector } from '$lib/hooks/use-rtk';
import useProtect from '$lib/hooks/use-protect';

/** Component. */
import Icon from '$lib/components/icon';

const Note = () => {
    /** Use navigate. */
    const navigate = useNavigate();

    /** Use protect. */
    useProtect();

    /** Use selector. */
    const auth = useAppSelector((state) => state.auth);
    const { valid } = auth;

    /** Use effect. */
    useEffect(() => {
        if (!valid) {
            navigate('/auth/login');
        }
    }, [valid]);

    /** Return something. */
    return (
        <section className='m-2 grid auto-rows-min h-fit'>
            <div className='p-2 h-8 sm:10 uppercase'>Note</div>
            {/** Note */}
            <div className='flex flex-wrap flex-col sm:flex-row gap-2 justify-between items-center h-fit'>
                <div className='rounded-t-md bg-stone-100 cursor-pointer w-full'>
                    <div className='flex flex-wrap flex-col sm:flex-row gap-2 justify-between items-center h-fit border-b border-stone-200'>
                        <div className='flex flex-row flex-wrap justify-between items-center w-full'>
                            <div className='p-2'>
                                <Icon id='trade' width='w-6' height='h-6' /> List
                            </div>
                        </div>
                    </div>
                    <div className='p-2 border-b border-stone-200 hover:text-purple-500 text-xs'>Note 1</div>
                    <div className='p-2 border-b border-stone-200 hover:text-purple-500 text-xs'>Note 2</div>
                    <div className='p-2 border-b border-stone-200 hover:text-purple-500 text-xs'>Note 3</div>
                    <div className='p-2 hover:text-purple-500 text-xs'>Note 4</div>
                </div>
            </div>
        </section>
    );
};

export default Note;
