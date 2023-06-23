/** React. */
import { useEffect } from "react";

/** Vendor. */
import { Outlet } from "react-router-dom";

/** Hook. */
import useHttp from "../../hooks/use-http";

/** Helpers. */
import helpProtect from "../../helpers/help-protect";

/** Component. */
import Loader from "../icons/loader";
import Headers from "../headers";
import Summary from "../interfaces/summary";
import Footers from "../footers";

const Single = () => {
    /** Use protect. */
    const { token, check } = helpProtect();

    /** Use http hook. */
    const { isLoading, sendRequest, hasError } = useHttp(
        {
            url: "/api/dashboard",
            method: "GET",
            params: {},
        },
        (data) => {
            console.log(data);
        }
    );

    useEffect(() => {
        sendRequest();
    }, []);

    /** Return something. */
    return (
        <section id="single">
            <Headers />
            <section id="wrapper" className="min-h-screen">
                {check ? (
                    <Loader />
                ) : token ? (
                    <>
                        <Summary />
                        <Outlet />
                    </>
                ) : (
                    ""
                )}
            </section>
            <Footers />
        </section>
    );
};

export default Single;
