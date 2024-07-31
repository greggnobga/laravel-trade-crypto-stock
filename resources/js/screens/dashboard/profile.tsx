/** Vendor. */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** Hook. */
import { useAppSelector } from '$lib/hooks/use-rtk';
import useProtect from '$lib/hooks/use-protect';

/** Component. */
import Icon from '$lib/components/icon';

const Profile = () => {
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
        <section className='p-2 flex flex-col flex-wrap min-h-screen overflow-hidden animate-fade-right animate-once animate-ease-in-out '>
            <div className='p-2 grid place-items-center rounded-t-md bg-stone-100 w-full'>
                <div className='p-4'>
                    <img className='w-52 h-52 border-2 border-slate-200 shadow rounded-full' src='/public/images/profile.png' alt='Profile' />
                </div>
                <div className='p-4 flex flex-wrap flex-col sm:flex-row scroll-page'>
                    <p className='block text-xs p-2'>
                        <span className='font-thin text-[.65rem] pr-2'>Stocks</span> <span className='text-purple-500'>100</span>
                    </p>
                    <p className='block text-xs p-2'>
                        <span className='font-thin text-[.65rem] pr-2'>Crypto</span> <span className='text-purple-500'>100</span>
                    </p>
                    <p className='block text-xs p-2'>
                        <span className='font-thin text-[.65rem] pr-2'>Cash</span> <span className='text-purple-500'>100</span>
                    </p>
                </div>
                <div className='p-4 w-full grid grid-cols-1 gap-4 sm:grid-cols-3'>
                    <div className='p-2 border border-slate-200'>
                        <h3 className='py-1 font-thin uppercase text-[.65rem] border-b border-stone-200'>Stock List</h3>
                        <div className='p-2 border-b cursor-pointer border-stone-200 hover:text-purple-500 text-xs'>Stock 1</div>
                        <div className='p-2 border-b cursor-pointer border-stone-200 hover:text-purple-500 text-xs'>Stock 2</div>
                        <div className='p-2 border-b cursor-pointer border-stone-200 hover:text-purple-500 text-xs'>Stock 3</div>
                        <div className='pt-2 px-1 cursor-pointer hover:text-purple-500 text-xs text-right'>More</div>
                    </div>

                    <div className='p-2  border border-slate-200'>
                        <h3 className='py-1 font-thin uppercase text-[.65rem] border-b border-stone-200'>Crypto List</h3>
                        <div className='p-2 border-b cursor-pointer border-stone-200 hover:text-purple-500 text-xs'>Crypto 1</div>
                        <div className='p-2 border-b cursor-pointer border-stone-200 hover:text-purple-500 text-xs'>Crypto 2</div>
                        <div className='p-2 border-b cursor-pointer border-stone-200 hover:text-purple-500 text-xs'>Crypto 3</div>
                        <div className='pt-2 px-1 cursor-pointer hover:text-purple-500 text-xs text-right'>More</div>
                    </div>
                    <div className='p-2  border border-slate-200'>
                        <h3 className='py-1 font-thin uppercase text-[.65rem] border-b border-stone-200'>Order List</h3>
                        <div className='p-2 border-b cursor-pointer border-stone-200 hover:text-purple-500 text-xs'>Order 1</div>
                        <div className='p-2 border-b cursor-pointer border-stone-200 hover:text-purple-500 text-xs'>Order 2</div>
                        <div className='p-2 border-b cursor-pointer border-stone-200 hover:text-purple-500 text-xs'>Order 3</div>
                        <div className='pt-2 px-1 cursor-pointer hover:text-purple-500 text-xs text-right'>More</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
