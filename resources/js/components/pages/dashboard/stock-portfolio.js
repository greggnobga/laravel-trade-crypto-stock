const StockPortfolio = () => {
    return (
        <div id="stock-portfolio">
            <div className="hold">
                <div className="board">
                    <div className="items">
                        <div className="name">Stock Hold</div>
                        <div className="record"><button className="add" type="button">Add Record</button></div>
                    </div>
                </div>
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
                <div className="board">Stock Order</div>
                <div className="content">
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