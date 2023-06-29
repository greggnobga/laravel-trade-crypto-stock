/** Vendor. */
import { Outlet } from "react-router-dom";

/** Component. */
import Headers from "../headers";
import Summary from "../interfaces/summary";
import Loader from "../interfaces/loader";
import Footers from "../footers";

const Single = () => {
    /** Return something. */
    return (
        <section id="single">
            <Headers />
            <section id="wrapper" className="h-screen">
                <Summary />
                <Outlet />
            </section>
            <Footers />
        </section>
    );
};

export default Single;
