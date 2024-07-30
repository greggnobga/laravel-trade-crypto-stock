/** Vendor. */
import { useEffect, useRef } from 'react';

/** Hook. */
import useAnimate from '$lib/hooks/use-animate';

/** Component. */
import Icon from '$lib/components/icon';

const Home = () => {
    /** Use animate. */
    const animate_one = useRef(null);
    const animate_two = useRef(null);
    const animate_three = useRef(null);
    const animate_four = useRef(null);

    useAnimate([
        {
            ref: animate_one,
            animations: [{ threshold: 0.1, animationClass: 'animate-fade' }],
        },
        {
            ref: animate_two,
            animations: [{ threshold: 0.2, animationClass: 'animate-fade-left' }],
        },
        {
            ref: animate_three,
            animations: [{ threshold: 0.5, animationClass: 'animate-fade-right' }],
        },
        {
            ref: animate_four,
            animations: [{ threshold: 0.5, animationClass: 'animate-fade' }],
        },
    ]);

    /** Return something. */
    return (
        <>
            <section className='w-full h-fit sm:h-64 md:h-96 grid auto-rows-min content-center hero-bg-image bg-cover bg-center bg-no-repeat mb-4'>
                <div
                    ref={animate_one}
                    className='p-4 pt-6 uppercase font-serif text-purple-800 bg-slate-100 bg-opacity-25 font-bold md:font-extrabold text-sm text-center sm:text-xl md:text-2xl animate-once animate-ease-in'>
                    At little cost, you can accomplish more.
                </div>

                <div className='p-4 font-hand text-blue-200 text-sm font-thin sm:font-light text-center sm:text-md md:text-xl'>
                    We help your money go further with no yearly fees and some of the most affordable prices in the sector.
                </div>

                <div className='p-4 grid auto-rows-min sm:grid-cols-2'>
                    <div className='p-2'>
                        <button type='button' className='btn btn-indigo'>
                            Get Started
                        </button>
                    </div>

                    <div className='p-2'>
                        <button type='button' className='btn btn-green'>
                            Learn More
                        </button>
                    </div>
                </div>
            </section>
            <section
                ref={animate_two}
                className='p-4 mb-4 grid auto-rows-min bg-slate-200 border border-slate-100 border-opacity-50 shadow animate-once animate-ease-in'>
                <div className='p-2 mb-2 text-md uppercase text-purple-800 bg-blue-300'>
                    <h1>Why Orion Trade?</h1>
                </div>
                <div className='p-2 grid auto-rows-min gap-2 sm:grid-cols-2 md:grid-cols-3'>
                    <div className='card-rounded scale-down'>
                        <div className='hover:grayscale'>
                            <img className='object-cover w-full rounded-t' src='/public/images/tools.jpeg' alt='Innovative Tools' />
                        </div>
                        <div className='p-2 bg-blue-300 text-purple-800'>
                            <Icon id='tool' width='w-6' height='h-6' /> Innovative Tools
                        </div>
                        <div className='p-4  rounded-b'>
                            Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </div>
                    </div>
                    <div className='card-rounded scale-down'>
                        <div className='hover:grayscale'>
                            <img className='object-cover w-full rounded-t' src='/public/images/price.jpeg' alt='Transparent Pricing' />
                        </div>
                        <div className='p-2 bg-blue-300 text-purple-800'>
                            <Icon id='price' width='w-6' height='h-6' /> Transparent Pricing
                        </div>
                        <div className='p-4 rounded-b'>
                            Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </div>
                    </div>
                    <div className='card-rounded scale-down'>
                        <div className='hover:grayscale'>
                            <img className='object-cover w-full rounded-t' src='/public/images/support.jpeg' alt='Dedicated Support' />
                        </div>
                        <div className='p-2 bg-blue-300 text-purple-800'>
                            <Icon id='support' width='w-6' height='h-6' /> Dedicated Support
                        </div>
                        <div className='p-4 rounded-b'>
                            Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </div>
                    </div>
                </div>
            </section>
            <section
                ref={animate_three}
                className='p-4 mb-4 grid auto-rows-min bg-slate-200 border border-slate-100 border-opacity-50 shadow animate-once animate-ease-in'>
                <div className='p-2 mb-2 text-md uppercase text-purple-800 bg-blue-300 text-right'>Our Stories</div>
                <div className='p-2 grid auto-rows-min gap-2 sm:grid-cols-2 md:grid-cols-3 border-three'>
                    <div className='card flex flex-col scale-down'>
                        <div className='hover:graycale'>
                            <img className='w-400 h-200 object-cover w-full' src='/public/images/bitcoin.jpg' alt='Placeholder Image' />
                        </div>
                        <div className='p-2 flex-1'>
                            <h1 className='p-2 bg-blue-300 text-purple-800'>Is Bitcoin A Bubble Gum</h1>
                            <p className='py-2'>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                                eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                                voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                                voluptatem sequi nesciunt.
                            </p>
                        </div>
                        <div className='p-2 grid place-items-end'>
                            <button className='font-thin text-sm p-2 bg-purple-500 text-slate-100 hover:bg-purple-400 hover:text-purple-100 rounded shadow'>
                                Read More
                            </button>
                        </div>
                    </div>
                    <div className='card flex flex-col scale-down'>
                        <div className='hover:graycale'>
                            <img className='w-400 h-200 object-cover w-full' src='/public/images/boat.jpg' alt='Placeholder Image' />
                        </div>
                        <div className='p-2 flex-1'>
                            <h1 className='p-2 bg-blue-300 text-purple-800'>Losing Your Bitcoin In A Scenic Boating Accident</h1>
                            <p className='py-2'>
                                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
                                eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                                nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
                            </p>
                        </div>
                        <div className='p-2 grid place-items-end'>
                            <button className='font-thin text-sm p-2 bg-purple-500 text-slate-100 hover:bg-purple-400 hover:text-purple-100 rounded shadow'>
                                Read More
                            </button>
                        </div>
                    </div>
                    <div className='card flex flex-col scale-down'>
                        <div className='hover:graycale'>
                            <img className='w-400 h-200 object-cover w-full' src='/public/images/marketing.jpg' alt='Placeholder Image' />
                        </div>
                        <div className='p-2 flex-1'>
                            <h1 className='p-2 bg-blue-300 text-purple-800'>Learn Marketing Techniques</h1>
                            <p className='py-2'>
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
                                corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                                officia deserunt mollitia animi, id est laborum et dolorum fuga.
                            </p>
                        </div>
                        <div className='p-2 grid place-items-end'>
                            <button className='font-thin text-sm p-2 bg-purple-500 text-slate-100 hover:bg-purple-400 hover:text-purple-100 rounded shadow'>
                                Read More
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section
                ref={animate_four}
                className='p-4 grid auto-rows-min bg-slate-200 border border-slate-100 border-opacity-50 shadow animate-once animate-ease-in'>
                <div className='p-2 mb-2 text-md text-center text-purple-800 bg-blue-300 uppercase'>Traditional Finance VS Cryptocurrency?</div>
                <div className='py-2'>
                    <p className='pb-2'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <p className='pb-2'>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
                        ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                        voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                    </p>
                    <p className='pb-2'>
                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
                        tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
                        ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
                    </p>
                </div>
            </section>
        </>
    );
};

export default Home;
