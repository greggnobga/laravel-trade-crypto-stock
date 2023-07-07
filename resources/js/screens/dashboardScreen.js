/** React. */
import { useEffect } from "react";

/*8 Vendor. */
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/** Hook. */
import useAuth from "../hooks/use-auth";

/** Component. */
import Icon from "../components/icons";
import Message from "../components/interfaces/message";
import Loader from "../components/interfaces/loader";
import Card from "../components/interfaces/card";

const Dashboard = () => {
    /** Use selector. */
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, logged, access_token, message } = userLogin;

    /** Use auth. */
    const { check } = useAuth();

    /** Use navigate. */
    const navigate = useNavigate();

    /** Use effect. */
    useEffect(() => {
        /** If account state set, check if access token is valid. */
        if (access_token) {
            /** Perform check. */
            check(access_token);
        }

        /** If become undefined then redirect. */
        if (logged === false) {
            const timeout = setTimeout(() => {
                navigate("/auth/login");
            }, 2000);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [navigate, access_token, logged]);

    const cardItems = [
        {
            title: "stock",
            id: "stock",
            value: "100",
            color: "green",
            link: "/dashboard/stock-portfolio",
        },
        {
            title: "crypto",
            id: "crypto",
            value: "200",
            color: "red",
            link: "/dashboard/crypto-portfolio",
        },
        {
            title: "fund",
            id: "fund",
            value: "300",
            color: "blue",
            link: "/dashboard/crypto-portfolio",
        },
        {
            title: "note",
            id: "note",
            value: "10",
            color: "gold",
            link: "/dashboard/stock-note",
        },
    ];

    /** Return something. */
    return (
        <>
            {logged && (
                <>
                    {message && (
                        <Message variant="alert-success" children={message} />
                    )}
                    {loading ? (
                        <div className="w-screen h-screen form-center">
                            <Loader />
                        </div>
                    ) : (
                        <div className="border border-green-400">
                            <div className="deck">
                                <div className="board">
                                    <p>Asset Allocation</p>
                                </div>
                                <div className="cards">
                                    <div className="card">
                                        <Card items={cardItems} />
                                    </div>
                                </div>
                            </div>
                            <div className="chart">
                                <div className="board">
                                    <p>Graphical Representation</p>
                                </div>
                                <div className="account">Account</div>
                                <div className="offer">Offers</div>
                                <div className="graph">Main Chart</div>
                            </div>
                            <div className="rank">
                                <div className="board">
                                    <p>Philippine Stock Exchange</p>
                                </div>
                                <div className="gainer">Top Gainers</div>
                                <div className="losser">Top Lossers</div>
                            </div>
                            <div className="rank">
                                <div className="board">Crypto Currency</div>
                                <div className="gainer">Top Gainers</div>
                                <div className="losser">Top Lossers</div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default Dashboard;
