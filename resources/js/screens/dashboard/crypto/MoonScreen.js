/** React. */
import { useState } from 'react';
/** Vendor, */

const CryptoMoon = () => {
    const [addRecord, setAddRecord] = useState(false);

    const addRecordHandler = () => {
        setAddRecord(!addRecord);
    }

    return (
        <div id="crypto-moon">
            <div className="moon">
                <div className="board">
                    <div className="items">
                        <div className="name">Moon</div>
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
                    </div>
                    <div className="items">
                        <div className="item">Item 1</div>
                        <div className="item">Item 2</div>
                        <div className="item">Item 3</div>
                        <div className="item">Item 4</div>
                        <div className="item">Item 5</div>
                        <div className="item">Item 6</div>
                        <div className="item">Item 7</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CryptoMoon;