/** Vendor. */
import React from 'react';

/** Footer function. */
const Footer = () => {
    return (
        <footer className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-min gradient-blue-purple font-size text-slate-50'>
            <div className='p-2 mb-2'>
                <h3 className='border-bottom pb-2 uppercase text-slate-100 hover:text-stone-200'>About</h3>
                <p className='p-2'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                </p>
            </div>
            <div className='p-2 mb-2'>
                <h3 className='border-bottom pb-2 uppercase text-slate-100 hover:text-stone-200'>Resources</h3>
                <ul>
                    <li className='border-bottom cursor-pointer hover:text-stone-200 hover:bg-stone-200 hover:bg-opacity-50'>
                        <a href='#'>Home</a>
                    </li>
                    <li className='border-bottom cursor-pointer hover:text-stone-200 hover:bg-stone-200 hover:bg-opacity-50'>
                        <a href='#'>Stock Explorer</a>
                    </li>
                    <li className='border-bottom cursor-pointer hover:text-stone-200 hover:bg-stone-200 hover:bg-opacity-50'>
                        <a href='#'>Crypto Explorer</a>
                    </li>
                    <li className='border-bottom cursor-pointer hover:text-stone-200 hover:bg-stone-200 hover:bg-opacity-50'>
                        <a href='#'>Frequently Ask Questions</a>
                    </li>
                    <li className='border-bottom cursor-pointer hover:text-stone-200 hover:bg-stone-200 hover:bg-opacity-50'>
                        <a href='#'>Privacy Policy</a>
                    </li>
                </ul>
            </div>
            <div className='p-2 mb-2'>
                <h3 className='border-bottom pb-2 uppercase text-slate-100 hover:text-stone-200'>Socials</h3>
                <ul>
                    <li className='border-bottom cursor-pointer hover:text-stone-200 hover:bg-stone-200 hover:bg-opacity-50'>
                        <a href='#'>Email</a>
                    </li>
                    <li className='border-bottom cursor-pointer hover:text-stone-200 hover:bg-stone-300 hover:bg-opacity-50'>
                        <a href='#'>Facebook</a>
                    </li>
                    <li className='border-bottom cursor-pointer hover:text-stone-200 hover:bg-stone-300 hover:bg-opacity-50'>
                        <a href='#'>Twitter</a>
                    </li>
                    <li className='border-bottom cursor-pointer hover:text-stone-200 hover:bg-stone-300 hover:bg-opacity-50'>
                        <a href='#'>Instagram</a>
                    </li>
                    <li className='border-bottom cursor-pointer hover:text-stone-200 hover:bg-stone-300 hover:bg-opacity-50'>
                        <a href='#'>Tiktok</a>
                    </li>
                </ul>
            </div>
            <div className='p-2 mb-2'>
                <h3 className='border-bottom pb-2 uppercase text-slate-100 hover:text-stone-200'>Contact</h3>
                <p className='p-2'>Hire Me!</p>
            </div>
        </footer>
    );
};

export default Footer;
