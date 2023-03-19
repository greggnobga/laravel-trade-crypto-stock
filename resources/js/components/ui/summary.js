/** React. */
import { useEffect, useState } from 'react';

/** Hook. */
import useHttp from '../../hooks/use-http';

const Summary = () => {
    /** Use state. */
    const [result, setResult] = useState([]);

    /** Philippine stock exchange index symbols. */
    const symbol = ['PSEi', 'ALL', 'FIN', 'IND', 'HDG', 'PRO', 'SVC', 'M-O'];

    /** Callback function for http hooks. */
    const requestResponse = (data) => {
        /** Declare an variable array. */
        let reMap = [];

        /** Loop through symbol array and match with the api result.. */
        for (let index of symbol) {
            for (let stock of data.stock) {
                if (stock.symbol === index) {
                    reMap.push({
                        'name': stock['name'],
                        'volume': stock['volume'].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    });
                }
            }
        }

        /** Set state value. */
        setResult(reMap);
    };

    /** Use http hook. */
    const { isLoading, sendRequest, hasError } = useHttp({
        url: 'https://phisix-api4.appspot.com/stocks.json',
        method: 'GET',
        params: {}
    }, requestResponse);

    /** Use effect. */
    useEffect(() => {
        /** Send http request. */
        sendRequest();
    }, []);

    /** Return something.. */
    return (
        <div className="summary">
            {result.map((item, key) => {
                return <div className="items" key={key}>
                    <p className="title">{item['name']}</p>
                    <p className="value">{item['volume']}</p>
                </div>
            })}
        </div>
    );
}

export default Summary;