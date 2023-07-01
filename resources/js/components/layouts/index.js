/** Vendor. */
import { Outlet } from "react-router-dom";

/** Component. */
import Headers from "../headers";
import Footers from "../footers";

const Single = () => {
    /** Return something. */
    return (
        <>
            <Headers />
            <div className="min-h-screen">
                <Outlet />
            </div>
            <Footers />
        </>
    );
};

export default Single;
