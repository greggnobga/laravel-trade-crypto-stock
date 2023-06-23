/** Vendor. */
import { Outlet } from "react-router-dom";

/** Component. */
import Headers from "../headers";
import Footers from "../footers";

const Single = () => {
    /** Return something. */
    return (
        <section id="single">
            <Headers />
            <div id="wrapper" className="min-h-screen">
                <Outlet />
            </div>
            <Footers />
        </section>
    );
};

export default Single;
