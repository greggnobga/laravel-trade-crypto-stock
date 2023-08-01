/** React. */
import { useState } from 'react';
/** Vendor, */

const StockNote = () => {
    const [search, setSearch] = useState(false);

    const searchHandler = () => {
        setSearch(!search);
    }

    return (
        <div id="stock-note">
            <div className="note">
                <div className="board">
                    <div className="items">
                        <div className="name">Note</div>
                        <div className="record"><button onClick={searchHandler} className="search" type="button">Search</button></div>
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

export default StockNote;