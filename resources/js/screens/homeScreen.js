/** React. */
import { useEffect } from "react";

/** Vendor. */
import { useDispatch, useSelector } from "react-redux";

/** Component. */
import Icon from "../components/icons";
import Message from "../components/interfaces/message";

/** Action. */
import { stockList } from "../actions/stockActions";

const Home = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { accounts } = userLogin;

    useEffect(() => {
        dispatch(stockList());
    }, [dispatch]);

    return (
        <>
            {/** Hero section. */}
            {accounts && (
                <Message variant="alert-info" children={accounts.message} />
            )}
            <section className="w-full h-64 md:h-96 grid auto-rows-min content-center bg-stone-200 border-one bg-opacity-40 hover:bg-stone-300 hover:bg-opacity-40 mb-4">
                <div className="p-4 uppercase text-purple-500 font-bold md:font-extrabold text-sm text-center sm:text-xl md:text-2xl">
                    At little cost, you can accomplish more.
                </div>
                <div className="p-4 text-blue-500 text-sm font-thin sm:font-light text-center sm:text-md md:text-xl">
                    We help your money go further with no yearly fees and some
                    of the most affordable prices in the sector.
                </div>
                <div className="p-4 text-center">
                    <button type="button" className="font-size btn btn-indigo">
                        Get Started
                    </button>
                    <button
                        type="button"
                        className="font-size ml-2 btn btn-green"
                    >
                        Learn More
                    </button>
                </div>
            </section>
            {/** Reason section. */}
            <section className="mb-2 grid auto-rows-min bg-stone-100 bg-opacity-70 border-b border-neutral-100">
                <div className="p-2 mb-2 uppercase text-stone-700 bg-stone-200 bg-opacity-50">
                    <h1>Why Orion Trade?</h1>
                </div>
                <div className="p-2 grid auto-rows-min gap-2 sm:grid-cols-2 md:grid-cols-3">
                    <div className="card-rounded">
                        <div className="hover:grayscale">
                            <img
                                className="object-cover w-full rounded-t-lg"
                                src="/public/images/tools.jpeg"
                                alt="Innovative Tools"
                            />
                        </div>
                        <div className="p-2 text-sm md:text-md">
                            <Icon id="tool" /> Innovative Tools
                        </div>
                        <div className="p-4 text-sm md:text-md bg-rose-800 bg-opacity-30 rounded-b-lg">
                            Eaque ipsa quae ab illo inventore veritatis et quasi
                            architecto beatae vitae dicta sunt explicabo.
                        </div>
                    </div>
                    <div className="card-rounded">
                        <div className="hover:grayscale">
                            <img
                                className="object-cover w-full rounded-t-lg"
                                src="/public/images/price.jpeg"
                                alt="Transparent Pricing"
                            />
                        </div>
                        <div className="p-2 text-sm md:text-md">
                            <Icon id="price" /> Transparent Pricing
                        </div>
                        <div className="p-4 text-sm md:text-md bg-green-800 bg-opacity-30 rounded-b-lg">
                            Eaque ipsa quae ab illo inventore veritatis et quasi
                            architecto beatae vitae dicta sunt explicabo.
                        </div>
                    </div>
                    <div className="card-rounded">
                        <div className="hover:grayscale">
                            <img
                                className="object-cover w-full rounded-t-lg"
                                src="/public/images/support.jpeg"
                                alt="Dedicated Support"
                            />
                        </div>
                        <div className="p-2 text-sm md:text-md">
                            <Icon id="support" /> Dedicated Support
                        </div>
                        <div className="p-4 text-sm md:text-md bg-purple-800 bg-opacity-30 rounded-b-lg">
                            Eaque ipsa quae ab illo inventore veritatis et quasi
                            architecto beatae vitae dicta sunt explicabo.
                        </div>
                    </div>
                </div>
            </section>
            {/** Story section. */}
            <section className="grid auto-rows-min bg-zinc-200 bg-opacity-50 border-b border-neutral-100">
                <div className="p-2 mb-2 uppercase text-right text-green-700 bg-green-200 bg-opacity-50">
                    Our Stories
                </div>
                <div className="p-2 grid auto-rows-min gap-2 sm:grid-cols-2 md:grid-cols-3 border-three bg-stone-200 bg-opacity-40 hover:bg-stone-300 hover:bg-opacity-40">
                    <div className="card">
                        <div className="hover:graycale">
                            <img
                                className="w-400 h-200 object-cover w-full"
                                src="/public/images/bitcoin.jpg"
                                alt="Placeholder Image"
                            />
                        </div>
                        <div className="p-2">
                            <h1 className="pb-2">Story Title</h1>
                            <p className="text-sm md:text-md lg:text-lg">
                                Sed ut perspiciatis unde omnis iste natus error
                                sit voluptatem accusantium doloremque
                                laudantium, totam rem aperiam, eaque ipsa quae
                                ab illo inventore veritatis et quasi architecto
                                beatae vitae dicta sunt explicabo. Nemo enim
                                ipsam voluptatem quia voluptas sit aspernatur
                                aut odit aut fugit, sed quia consequuntur magni
                                dolores eos qui ratione voluptatem sequi
                                nesciunt.
                            </p>
                        </div>
                        <div className="p-2 text-right">
                            <button className="btn btn-orange">
                                Read More
                            </button>
                        </div>
                    </div>
                    <div className="card">
                        <div className="hover:graycale">
                            <img
                                className="w-400 h-200 object-cover w-full"
                                src="/public/images/boat.jpg"
                                alt="Placeholder Image"
                            />
                        </div>
                        <div className="p-2">
                            <h1 className="pb-2">Story Title</h1>
                            <p className="text-sm md:text-md lg:text-lg">
                                Neque porro quisquam est, qui dolorem ipsum quia
                                dolor sit amet, consectetur, adipisci velit, sed
                                quia non numquam eius modi tempora incidunt ut
                                labore et dolore magnam aliquam quaerat
                                voluptatem. Ut enim ad minima veniam, quis
                                nostrum exercitationem ullam corporis suscipit
                                laboriosam, nisi ut aliquid ex ea commodi
                                consequatur.
                            </p>
                        </div>
                        <div className="p-2 text-right">
                            <button className="btn btn-orange">
                                Read More
                            </button>
                        </div>
                    </div>
                    <div className="card">
                        <div className="hover:graycale">
                            <img
                                className="w-400 h-200 object-cover w-full"
                                src="/public/images/marketing.jpg"
                                alt="Placeholder Image"
                            />
                        </div>
                        <div className="p-2">
                            <h1 className="pb-2">Story Title</h1>
                            <p className="text-sm md:text-md lg:text-lg">
                                At vero eos et accusamus et iusto odio
                                dignissimos ducimus qui blanditiis praesentium
                                voluptatum deleniti atque corrupti quos dolores
                                et quas molestias excepturi sint occaecati
                                cupiditate non provident, similique sunt in
                                culpa qui officia deserunt mollitia animi, id
                                est laborum et dolorum fuga.
                            </p>
                        </div>
                        <div className="p-2 text-right">
                            <button className="btn btn-orange">
                                Read More
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {/** Compare section. */}
            <section className="mb-2 grid auto-rows-min bg-neutral-200 bg-opacity-50 border-b border-neutral-100">
                <div className="p-2 mb-2 uppercase text-center text-purple-700 bg-purple-200 bg-opacity-50">
                    Traditional Finance VS Cryptocurrency?
                </div>
                <div className="p-2 text-sm md:text-md lg:text-lg">
                    <p className="pb-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur.
                    </p>
                    <p className="pb-2">
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt explicabo. Nemo
                        enim ipsam voluptatem quia voluptas sit aspernatur aut
                        odit aut fugit, sed quia consequuntur magni dolores eos
                        qui ratione voluptatem sequi nesciunt.
                    </p>
                    <p className="pb-2">
                        Neque porro quisquam est, qui dolorem ipsum quia dolor
                        sit amet, consectetur, adipisci velit, sed quia non
                        numquam eius modi tempora incidunt ut labore et dolore
                        magnam aliquam quaerat voluptatem. Ut enim ad minima
                        veniam, quis nostrum exercitationem ullam corporis
                        suscipit laboriosam, nisi ut aliquid ex ea commodi
                        consequatur.
                    </p>
                </div>
            </section>
        </>
    );
};

export default Home;
