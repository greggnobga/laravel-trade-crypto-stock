/** React. */
import { useState } from 'react';
/** Vendor, */

const StockTrade = () => {
    const [search, setSearch] = useState(false);

    const searchHandler = () => {
        setSearch(!search);
    }

    return (
        <div id="stock-chart">
            <div className="chart">
                <div className="board">
                    <div className="items">
                        <div className="name">Chart</div>
                        <div className="record"><button onClick={searchHandler} className="search" type="button">Search</button></div>
                    </div>
                </div>
                <div className="content">
                    {search && <div className="items">
                        <div className="item"><input /></div>
                        <div className="item"><button type="button">Submit</button> <button type="button">Cancel</button></div>
                    </div>}
                    <div className="items">
                        <div className="item">Item 1</div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default StockTrade;