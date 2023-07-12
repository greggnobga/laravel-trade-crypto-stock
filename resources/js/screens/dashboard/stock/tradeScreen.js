/** React. */
import { Fragment, useState, useEffect, useContext } from "react";

/** Hook. */
import useScreen from "../../../hooks/use-screen";

/** Component. */
import Icon from "../../../components/icons";

const Trade = () => {
    /** Use screen. */
    const { isMobile } = useScreen();

    /** Return something. */
    return (
        <div className="grid auto-rows-min gap-2 h-fit font-size">
            <div className="p-2 h-12 uppercase">
                <Icon id="trade" /> Blue Chip Stocks
            </div>
            {isMobile ? (
                <div className="card-rounded m-2 grid auto-rows-min sm:grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="p-2 grid auto-rows-min grid-rows-2">
                        <span className="uppercase text-[.5rem]">Symbol</span>
                        <span className="text-center text-base">JFC</span>
                    </div>
                    <div className="p-2 grid auto-rows-min grid-rows-2">
                        <span className="uppercase text-[.5rem]">Price</span>
                        <span className="text-center text-base">0.00</span>
                    </div>
                    <div className="p-2 grid auto-rows-min grid-rows-2">
                        <span className="uppercase text-[.5rem]">Value</span>
                        <span className="text-center text-base">0.0</span>
                    </div>
                    <div className="p-2 grid auto-rows-min grid-rows-2">
                        <span className="uppercase text-[.5rem]">
                            Price Range
                        </span>
                        <span className="text-center text-base">0.0</span>
                    </div>
                    <div className="p-2 grid auto-rows-min grid-rows-2">
                        <span className="uppercase text-[.5rem]">
                            Total Assets
                        </span>
                        <span className="text-center text-base">0.0</span>
                    </div>
                    <div className="p-2 grid auto-rows-min grid-rows-2">
                        <span className="uppercase text-[.5rem]">
                            Net Income
                        </span>
                        <span className="text-center text-base">0.0</span>
                    </div>
                    <div className="p-2 grid auto-rows-min grid-rows-2">
                        <span className="uppercase text-[.5rem]">
                            Debt Equity Ratio
                        </span>
                        <span className="text-center text-base">0.0</span>
                    </div>
                    <div className="p-2 grid auto-rows-min grid-rows-2">
                        <span className="uppercase text-[.5rem]">
                            Dividend Yield
                        </span>
                        <span className="text-center text-base">0.0</span>
                    </div>
                    <div className="p-2 grid auto-rows-min grid-rows-2 col-span-2 md:col-span-4 justify-center">
                        <span className="uppercase text-[.5rem]">Action</span>
                    </div>
                </div>
            ) : (
                <div className="card grid auto-rows-min grid-cols-9 gap-2 h-fit">
                    <div className="p-2">
                        <span className="uppercase text-[.5rem]">Symbol</span>
                    </div>
                    <div className="p-2">
                        <span className="uppercase text-[.5rem]">Price</span>
                    </div>
                    <div className="p-2">
                        <span className="uppercase text-[.5rem]">Value</span>
                    </div>
                    <div className="p-2">
                        <span className="uppercase text-[.5rem]">
                            Price Range
                        </span>
                    </div>
                    <div className="p-2">
                        <span className="uppercase text-[.5rem]">
                            Total Assets
                        </span>
                    </div>
                    <div className="p-2">
                        <span className="uppercase text-[.5rem]">
                            Net Income
                        </span>
                    </div>
                    <div className="p-2">
                        <span className="uppercase text-[.5rem]">
                            Debt Equity Ratio
                        </span>
                    </div>
                    <div className="p-2">
                        <span className="uppercase text-[.5rem]">
                            Dividend Yield
                        </span>
                    </div>
                    <div className="p-2">
                        <span className="uppercase text-[.5rem]">Action</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Trade;
