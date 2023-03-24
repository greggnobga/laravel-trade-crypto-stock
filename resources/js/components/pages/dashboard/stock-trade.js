/** React. */
import { useState, useEffect, useContext } from 'react';

/** Context. */
import AuthContext from '../../../context/auth-context';

/** Hook. */
import useHttp from '../../../hooks/use-http';

/** Component. */
import Messenger from '../../messenger';

const StockTrade = () => {
    /** Declare result and disabled state. */
    const [result, setResult] = useState([]);
    const [disabled, setDisabled] = useState(false);

    /** Start handler. */
    const startHandler = () => {
        /** Request data from api. */
        apiRequest();
        /** Set start button to true. */
        setDisabled(true);
    }

    const apiResponse = (data) => {
        let reMap = [];
        /** Check if server return data. */
        if (data.hasOwnProperty('stock')) {
            /** Remap keys before saving to state. */
            for (let i = 0; i < data['stock'].length; i++) {
                reMap.push({
                    'name': data['stock'][i]['name'],
                    'change': data['stock'][i]['percent_change'],
                    'price': data['stock'][i]['price']['amount'],
                    'symbol': data['stock'][i]['symbol'],
                    'volume': data['stock'][i]['volume'],
                });
            }
        }
        /** Set result state. */
        setResult(reMap);
    };

    /** Prepare request to phisix api using http hook. */
    const { sendRequest: apiRequest } = useHttp({
        url: 'https://phisix-api4.appspot.com/stocks.json',
        method: 'GET',
        params: {}
    }, apiResponse);

    /** Run use effect after result state ready. */
    let stock = [];
    useEffect(() => {
        result.map((item, index) => {
            /** Call delay item function. */
            setTimeout(function () {
                /** Push params.. */
                stock.push(result[index]);
                /** Check if data is not empty. */
                if (item) {
                    /** Send request. */
                    localRequest();
                    /** Shift params. */
                    stock.shift(index);
                }
            }, 3000 * index);
            /** Set start button state to false after the map reach its last iteration. */
            if (index >= result.length) {
                setDisabled(false);
            }
        });
    }, [result]);

    /** Use context. */
    const authCtx = useContext(AuthContext);

    /** Use http hook reponse callback. */
    const localResponse = (data) => {
        /** Render reponse message. */
        authCtx.messenger(data.message);
    };

    /** Prepare request to local api using http hook. */
    const { sendRequest: localRequest } = useHttp({
        url: '/api/stock-trade-store',
        method: 'POST',
        params: { input: stock, table: 'trade', statement: 'store' }
    }, localResponse);

    /** Declare edge and caller state. */
    const [edge, setEdge] = useState('');
    const [caller, setCaller] = useState('');

    /** Report handler. */
    const reportHandler = () => {
        /** Set caller. */
        setCaller('reports');
        /** Send request. */
        retrieveRequest();
        /** Set start button to true. */
        setDisabled(true);
    }

    /** Use http hook reponse callback. */
    const retrieveResponse = (data) => {
        /** Render reponse message. */
        if (data.hasOwnProperty('stocks')) {
            data['stocks'].map((item, index) => {
                setTimeout(() => {
                    /** Assign variable a value. */
                    setEdge(item['edge']);
                }, 3000 * index);
                /** Set start button state to false after the map reach its last iteration. */
                if (index >= result.length) {
                    setDisabled(false);
                }
            });
        }
    };

    /** Declare config state. */
    const [payload, setPayload] = useState({});

    /** Use effect when edge state changes. */
    useEffect(() => {
        /** Conditional payload value. */
        switch (caller) {
            case 'reports':
                setPayload({ section: 'reports', id: edge })
                break;
            case 'prices':
                setPayload({ section: 'prices', id: edge })
                break;
            case 'sectors':
                setPayload({ section: 'sectors', id: edge })
                break;
            default:
                setPayload({ section: 'reports', id: edge })
        }
        /** Send request. */
        if (edge) {
            storeRequest();
        }
    }, [edge]);

    /** Prepare request to local api using http hook. */
    const { sendRequest: retrieveRequest } = useHttp({
        url: '/stock-reports-retrieve',
        method: 'GET',
        params: { section: 'stocks' }
    }, retrieveResponse);

    /** Use http hook reponse callback. */
    const storeResponse = (data) => {
        /** Check if data is not empty. */
        if (data) {
            /** Render reponse message. */
            authCtx.messenger(data.message);
        }
    };

    /** Prepare request to local api using http hook. */
    const { sendRequest: storeRequest } = useHttp({
        url: '/stock-reports-store',
        method: 'POST',
        params: payload
    }, storeResponse);

    /** Search handler. */
    const priceHandler = () => {
        /** Set caller. */
        setCaller('prices');
        /** Send request. */
        retrieveRequest();
        /** Set start button to true. */
        setDisabled(true);
    }

    /** Search handler. */
    const sectorHandler = () => {
        /** Set caller. */
        setCaller('sectors');
        /** Send request. */
        retrieveRequest();
        /** Set start button to true. */
        setDisabled(true);
    }

    /** Declare search state. */
    const [search, setSearch] = useState(false);

    /** Search handler. */
    const searchHandler = () => {
        setSearch(!search);
    }


    /** Return something. */
    return (
        <div id="stock-trade">
            <div className="trade">
                <div className="board">
                    <div className="items">
                        <div className="name">Trade</div>
                        <div className="record">
                            <button onClick={startHandler} className="btn btn-start" type="button" disabled={disabled}>Start</button>
                            <button onClick={reportHandler} className="btn btn-report" type="button" disabled={disabled}>Report</button>
                            <button onClick={priceHandler} className="btn btn-price" type="button" disabled={disabled}>Price</button>
                            <button onClick={sectorHandler} className="btn btn-sector" type="button" disabled={disabled}>Sector</button>
                            <button onClick={searchHandler} className="btn btn-search" type="button">Search</button>
                        </div>
                    </div>
                </div>
                <div className="content">
                    {search && <div className="items">
                        <div className="item"><input /></div>
                        <div className="item"><input /></div>
                        <div className="item"><input /></div>
                        <div className="item"><input /></div>
                        <div className="item"><input /></div>
                        <div className="item"><input /></div>
                        <div className="item"><input /></div>
                        <div className="item"><button type="button">Submit</button> <button type="button">Cancel</button></div>
                    </div>}
                    <div className="items color">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                        <div className="item">Item 6</div>
                        <div className="item">Item 7</div>
                        <div className="item">Item 8</div>
                    </div>
                    <div className="items">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                        <div className="item">Item 6</div>
                        <div className="item">Item 7</div>
                        <div className="item">Item 8</div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default StockTrade;