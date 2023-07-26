/** Component. */
import Icon from "../../components/Icon";

/** Desktop header. */
export const desktopHeader = (
    <div className='card grid auto-rows-min grid-cols-9 h-fit rounded-t-md bg-stone-100 uppercase'>
        <div className='p-2'>
            <p className='text-green-500'>Symbol</p>
        </div>
        <div className='p-2'>
            <p className='text-green-500'>Price</p>
        </div>
        <div className='p-2'>
            <p className='text-green-500'>Value</p>
        </div>
        <div className='p-2'>
            <p className='text-green-500'>Price Range</p>
        </div>
        <div className='p-2'>
            <p className='text-green-500'>Total Assets</p>
        </div>
        <div className='p-2'>
            <p className='text-green-500'>Net Income</p>
        </div>
        <div className='p-2'>
            <p className='text-green-500'>Debt Asset Ratio</p>
        </div>
        <div className='p-2'>
            <p className='text-green-500'>Dividend Yield</p>
        </div>
        <div className='p-2'>
            <p className='text-green-500'>Action</p>
        </div>
    </div>
);

/** Desktop template. */
export const desktopTemplate = ({ item, action, icon, text }) => {
    return (
        <div className='card grid auto-rows-min grid-cols-9 h-fit border-b border-stone-100 bg-stone-50 hover:text-purple-500'>
            <div className='p-2'>
                <a href={`https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=${item.edge}`} target='_blank'>
                    {" "}
                    <span className='uppercase'>{item.symbol}</span>
                </a>
            </div>
            <div className='p-2'>
                <span className='uppercase'>{item.price}</span>
            </div>
            <div className='p-2'>
                <span className='uppercase'>{item.value}</span>
            </div>
            <div className='p-2'>
                <span className='uppercase'>{item.pricerange}</span>
            </div>
            <div className='p-2'>
                <span className='uppercase'>{item.totalassets}</span>
            </div>
            <div className='p-2'>
                <span className='uppercase'>{item.netincomeaftertax}</span>
            </div>
            <div className='p-2'>
                <span className='uppercase'>{item.debtassetratio}</span>
            </div>
            <div className='p-2'>
                <span className='uppercase'>{item.dividendyield}</span>
            </div>
            <div className='p-2' onClick={() => action(item.symbol)}>
                <span className='uppercase hover:text-red-500'>
                    <Icon id={icon} /> {text}
                </span>
            </div>
        </div>
    );
};

/** Mobile template. */
export const mobileTemplate = ({ item, action, icon, text }) => {
    return (
        <div className='mb-2 card-rounded grid auto-rows-min grid-cols-2 sm:grid-cols-3 md:grid-cols-4 hover:text-purple-500'>
            <div className='p-2'>
                <p className='p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>Symbol</p>
                <p className='pt-2 text-center'>
                    <a href={`https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=${item.edge}`} target='_blank'>
                        {" "}
                        <span className='uppercase'>{item.symbol}</span>
                    </a>
                </p>
            </div>
            <div className='p-2'>
                <p className='p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>Price</p>
                <p className='pt-2 text-center'>{item.price}</p>
            </div>
            <div className='p-2'>
                <p className='p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>Value</p>
                <p className='pt-2 text-center'>{item.value}</p>
            </div>
            <div className='p-2'>
                <p className='p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>Price Range</p>
                <p className='pt-2 text-center'>{item.pricerange}</p>
            </div>
            <div className='p-2'>
                <p className='p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>Total Assets</p>
                <p className='pt-2 text-center'>{item.totalassets}</p>
            </div>
            <div className='p-2'>
                <p className='p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>Net Income</p>
                <p className='pt-2 text-center'>{item.netincomeaftertax}</p>
            </div>
            <div className='p-2'>
                <p className='p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>Debt Asset Ratio</p>
                <p className='pt-2 text-center'>{item.debtassetratio}</p>
            </div>
            <div className='p-2'>
                <p className='p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>Dividend Yield</p>
                <p className='pt-2 text-center'>{item.dividendyield}</p>
            </div>
            <div className='p-2 col-span-2 sm:col-span-3 md:col-span-4 text-center' onClick={() => action(item.symbol)}>
                <p className='p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>Action</p>
                <p className='uppercase pt-2 hover:text-red-500'>
                    <Icon id={icon} /> {text}
                </p>
            </div>
        </div>
    );
};

/** Desktop pagination button. */
export const paginationTemplate = ({ index, turn }) => {
    return (
        <button
            className='p-2 hover:bg-slate-100 text-[.75rem] hover:text-green-500'
            type='button'
            onClick={() => {
                turn(index);
            }}>
            {index + 1}
        </button>
    );
};

/** Desktop modal template. */
export const desktopModalTemplate = ({ item, action, close, icon, text }) => {
    /** Modal header. */
    const modalContainerHeader = (item) => {
        /** Declare pointer. */
        let modalHeader = "";
        let modalIcon = "";

        /** Switch case. */
        switch (item) {
            case "holdingfirms":
                modalHeader = "Holding Firms";
                modalIcon = "holding";
                break;
            case "services":
                modalHeader = "Services";
                modalIcon = "service";
                break;
            case "industrials":
                modalHeader = "Industrials";
                modalIcon = "industrial";
                break;
            case "properties":
                modalHeader = "Properties";
                modalIcon = "property";
                break;
            case "miningandoils":
                modalHeader = "Mining And Oils";
                modalIcon = "mining";
                break;
            case "financials":
                modalHeader = "Financials";
                modalIcon = "financial";
                break;
            case "smallmediumemergingboards":
                modalHeader = "Small Medium Emrging Boards";
                modalIcon = "board";
                break;
            case "exchangetradedfunds":
                modalHeader = "Exchange Traded Funds";
                modalIcon = "exchange";
                break;
            default:
                modalHeader = "Holding Firms";
                modalIcon = "holding";
                break;
        }

        return { modalHeader, modalIcon };
    };

    /** Call modal header. */
    const { modalHeader, modalIcon } = modalContainerHeader(item[0]);

    /** Return. */
    return (
        <>
            <div className='p-2'>
                <div className='flex flex-row justify-between'>
                    <span className='p-0 uppercase'>
                        <Icon id={modalIcon} /> {modalHeader}
                    </span>
                    <span className='uppercase cursor-pointer' onClick={close}>
                        <Icon id='close' /> Close
                    </span>
                </div>
            </div>
            <div className='p-2'>
                <div className='grid auto-rows-min grid-cols-9 h-fit rounded-t-md bg-stone-100 uppercase'>
                    <div className='p-2'>
                        <span className='text-green-500'>Symbol</span>
                    </div>
                    <div className='p-2'>
                        <span className='text-green-500'>Price</span>
                    </div>
                    <div className='p-2'>
                        <span className='text-green-500'>Value</span>
                    </div>
                    <div className='p-2'>
                        <span className='text-green-500'>Price Range</span>
                    </div>
                    <div className='p-2'>
                        <span className='text-green-500'>Total Assets</span>
                    </div>
                    <div className='p-2'>
                        <span className='text-green-500'>Net Income</span>
                    </div>
                    <div className='p-2'>
                        <span className='text-green-500'>Debt Asset Ratio</span>
                    </div>
                    <div className='p-2'>
                        <span className='text-green-500'>Dividend Yield</span>
                    </div>
                    <div className='p-2'>
                        <span className='text-green-500'>Action</span>
                    </div>
                </div>
                {item &&
                    item[1].map((item, index) => {
                        return (
                            <div className='grid auto-rows-min grid-cols-9 h-fit border-b border-stone-100 bg-stone-50 hover:text-purple-500'>
                                <div className='p-2'>
                                    <a
                                        href={`https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=${item.edge}`}
                                        target='_blank'>
                                        {" "}
                                        <span className='p-0 uppercase'>{item.symbol}</span>
                                    </a>
                                </div>
                                <div className='p-2'>
                                    <span className='p-0'>{item.price}</span>
                                </div>
                                <div className='p-2'>
                                    <span className='p-0'>{item.value}</span>
                                </div>
                                <div className='p-2'>
                                    <span className='p-0'>{item.pricerange}</span>
                                </div>
                                <div className='p-2'>
                                    <span className='p-0'>{item.totalassets}</span>
                                </div>
                                <div className='p-2'>
                                    <span className='p-0'>{item.netincomeaftertax}</span>
                                </div>
                                <div className='p-2'>
                                    <span className='p-0'>{item.debtassetratio}</span>
                                </div>
                                <div className='p-2'>
                                    <span className='p-0'>{item.dividendyield}</span>
                                </div>
                                <div className='p-2 '>
                                    <button
                                        className='uppercase border border-stone-100 hover:text-green-500'
                                        onClick={() => {
                                            action(item.symbol);
                                        }}>
                                        <Icon id={icon} /> {text}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

/** Mobile template. */
export const mobileModalTemplate = ({ item, action, close, icon, text }) => {
    /** Modal header. */
    const modalContainerHeader = (item) => {
        /** Declare pointer. */
        let modalHeader = "";
        let modalIcon = "";

        /** Switch case. */
        switch (item) {
            case "holdingfirms":
                modalHeader = "Holding Firms";
                modalIcon = "holding";
                break;
            case "services":
                modalHeader = "Services";
                modalIcon = "service";
                break;
            case "industrials":
                modalHeader = "Industrials";
                modalIcon = "industrial";
                break;
            case "properties":
                modalHeader = "Properties";
                modalIcon = "property";
                break;
            case "miningandoils":
                modalHeader = "Mining And Oils";
                modalIcon = "mining";
                break;
            case "financials":
                modalHeader = "Financials";
                modalIcon = "financial";
                break;
            case "smallmediumemergingboards":
                modalHeader = "Small Medium Emrging Boards";
                modalIcon = "board";
                break;
            case "exchangetradedfunds":
                modalHeader = "Exchange Traded Funds";
                modalIcon = "exchange";
                break;
            default:
                modalHeader = "Holding Firms";
                modalIcon = "holding";
                break;
        }

        return { modalHeader, modalIcon };
    };

    /** Call modal header. */
    const { modalHeader, modalIcon } = modalContainerHeader(item[0]);

    /** Return. */
    return (
        <>
            <div className='p-2'>
                <div className='flex flex-row justify-between'>
                    <span className='p-0 uppercase'>
                        <Icon id={modalIcon} /> {modalHeader}
                    </span>
                    <span className='uppercase cursor-pointer' onClick={close}>
                        <Icon id='close' /> Close
                    </span>
                </div>
            </div>
            {item &&
                item[1].map((item, index) => {
                    return (
                        <div className='m-2 card-rounded grid auto-rows-min grid-cols-2 sm:grid-cols-3 md:grid-cols-4 uppercase'>
                            <div className='p-2'>
                                <span className='block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>Symbol</span>

                                <span className='block pt-2 text-center'>
                                    <a
                                        href={`https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=${item.edge}`}
                                        target='_blank'>
                                        {" "}
                                        <span className='uppercase'>{item.symbol}</span>
                                    </a>
                                </span>
                            </div>
                            <div className='p-2'>
                                <span className='block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>Price</span>

                                <span className='block pt-2 text-center'>{item.price}</span>
                            </div>
                            <div className='p-2'>
                                <span className='block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>Value</span>

                                <span className='block pt-2 text-center'>{item.value}</span>
                            </div>
                            <div className='p-2'>
                                <span className='block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>
                                    Price Range
                                </span>

                                <span className='block pt-2 text-center'>{item.pricerange}</span>
                            </div>
                            <div className='p-2'>
                                <span className='block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>
                                    Total Assets
                                </span>

                                <span className='block pt-2 text-center'>{item.totalassets}</span>
                            </div>
                            <div className='p-2'>
                                <span className='block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>
                                    Net Income
                                </span>

                                <span className='block pt-2 text-center'>{item.netincomeaftertax}</span>
                            </div>
                            <div className='p-2'>
                                <span className='block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>
                                    Debt Asset Ratio
                                </span>

                                <span className='block pt-2 text-center'>{item.debtassetratio}</span>
                            </div>
                            <div className='p-2'>
                                <span className='block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500'>
                                    Dividend Yield
                                </span>

                                <span className='block pt-2 text-center'>{item.dividendyield}</span>
                            </div>
                            <div className='p-2 col-span-2 sm:col-span-3 md:col-span-4 text-center'>
                                <button
                                    className='uppercase border border-stone-100 hover:text-purple-500'
                                    onClick={() => {
                                        action(item.symbol);
                                    }}>
                                    <Icon id={icon} /> {text}
                                </button>
                            </div>
                        </div>
                    );
                })}
        </>
    );
};
