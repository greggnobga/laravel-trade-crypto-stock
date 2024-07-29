/** Vendor. */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** Notice props. */
type PaginationProps<T = any> = {
    handler: T;
    pages: number;
    target: string;
    current: number;
};

const Pagination: React.FC<PaginationProps> = ({ pages, target, handler, current }) => {
    /** Use state. */
    const [currentPage, setCurrentPage] = useState(current);

    /** Use navigate. */
    const navigate = useNavigate();

    /** Handle page change */
    const handlePageChange = (pageNumber: number) => {
        /** Set current page. */
        setCurrentPage(pageNumber);

        /** Change url parameter. */
        navigate(`/stock-explorer/${pageNumber}`);

        /** Dispatch handler. */
        handler(pageNumber);
    };

    /** Return something. */
    return (
        <section className='flex flex-1 place-content-center px-2 py-4'>
            <nav className='flex flex-wrap items-center gap-x-1 bg-slate-100 rounded px-2 py-1' aria-label='Pagination'>
                <button
                    type='button'
                    onClick={() => handlePageChange(currentPage !== 1 ? currentPage - 1 : currentPage)}
                    className='min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-purple-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none'
                    aria-label='Previous'>
                    <svg
                        className='shrink-0 size-3.5'
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'>
                        <path d='m15 18-6-6 6-6'></path>
                    </svg>
                    <span>Prev</span>
                </button>
                <div className='flex flex-wrap items-center gap-x-1'>
                    {Array.from({ length: pages }, (_, index) => {
                        return (
                            <button
                                key={index}
                                onClick={() => handlePageChange(Number(index + 1))}
                                className={`px-4 py-2 text-sm rounded-lg hover:bg-gray-100 ${
                                    currentPage === index + 1 ? 'bg-purple-400 text-slate-100' : ''
                                }`}>
                                {index + 1}
                            </button>
                        );
                    })}
                </div>
                <button
                    type='button'
                    onClick={() => handlePageChange(currentPage !== pages ? currentPage + 1 : pages)}
                    className='min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-purple-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none'
                    aria-label='Next'>
                    <span>Next</span>
                    <svg
                        className='shrink-0 size-3.5'
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'>
                        <path d='m9 18 6-6-6-6'></path>
                    </svg>
                </button>
            </nav>
        </section>
    );
};

export default Pagination;
