/** React. */
import { useState } from 'react';
/** Vendor, */

const StockPortfolio = () => {
    const [addRecord, setAddRecord] = useState(false);

    const addRecordHandler = () => {
        setAddRecord(!addRecord);
    }

    return (
        <div id="stock-portfolio">
            <div className="asset">
                <div className="board">Assets</div>
                <div className="content">
                    <div className="items color">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                    </div>
                    <div className="items">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                    </div>
                </div>
            </div>
            <div className="order">
                <div className="board">
                    <div className="items">
                        <div className="name">Order</div>
                        <div className="record"><button onClick={addRecordHandler} className="add" type="button">Add Record</button></div>
                    </div>
                </div>
                <div className="content">
                    {addRecord && <div className="items">
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

export default StockPortfolio;