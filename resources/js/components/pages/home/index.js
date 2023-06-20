/** React. */
import { useEffect } from "react";

/** Vendor. */
import { useDispatch, useSelector } from "react-redux";

/** Component. */
import Icon from "../../icons";
import Summary from "../../interfaces/summary";

/** Action. */
import { listStocks } from "../../../actions/stockActions";

import Hero from "./hero";
import Reason from "./reason";
import Compare from "./compare";
import Stories from "./stories";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listStocks());
    }, [dispatch]);

    return (
        <>
            <Summary />
            <Hero />
            <Reason />
            <Stories />
            <Compare />
        </>
    );
};

export default Home;
