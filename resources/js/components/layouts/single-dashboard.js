/** React. */
import { Fragment, useEffect } from "react";

/** Vendor. */
import { Outlet } from "react-router-dom";

/** Hook. */
import useHttp from "../../hooks/use-http";

/** Helpers. */
import helpProtect from "../../helpers/help-protect";

/** Component. */
import Loader from "../icons/loader";
import Header from "../headers";
import Summary from "../ui/summary";
import Footer from "../footer";

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
        <section id="single" className="fade-in-bottom">
            <Header />
            <section id="wrapper">
                {check ? (
                    <Loader />
                ) : token ? (
                    <Fragment>
                        <Summary />
                        <Outlet />
                    </Fragment>
                ) : (
                    ""
                )}
            </section>
            <Footer />
        </section>
    );
};

export default Single;
