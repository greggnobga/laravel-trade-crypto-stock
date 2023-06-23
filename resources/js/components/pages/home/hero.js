/** Component. */
import Icon from "../../icons";

const Hero = () => {
    /** Return something. */
    return (
        <div className="w-full h-64 md:h-96 grid auto-rows-min content-center bg-indigo-200 bg-opacity-20 hover:bg-blue-200 hover:bg-opacity-20 border-one mb-4">
            <div className="p-4 uppercase text-purple-500 font-bold md:font-extrabold text-sm text-center sm:text-xl md:text-2xl">
                At little cost, you can accomplish more.
            </div>
            <div className="p-4 text-blue-500 text-sm font-thin sm:font-light text-center sm:text-md md:text-xl">
                We help your money go further with no yearly fees and some of
                the most affordable prices in the sector.
            </div>
            <div className="p-4 text-center">
                <button
                    type="button"
                    className="md:w-48 button-indigo md:text-md"
                >
                    Open an account
                </button>
                <button
                    type="button"
                    className="md:w-48 button-emerald md:text-md"
                >
                    Learn more
                </button>
            </div>
        </div>
    );
};

export default Hero;
