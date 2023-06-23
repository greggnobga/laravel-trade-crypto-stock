/** Component. */
import Icon from "../../icons";

const Reason = () => {
    /** Return something. */
    return (
        <div className="mb-2 grid auto-rows-min bg-stone-100 bg-opacity-30 border-b border-stone-100">
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
        </div>
    );
};

export default Reason;
