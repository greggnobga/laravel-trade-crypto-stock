/** Component. */
import Icon from '../../../../icons';

const Desktop = (props) => {
    return (
        <div className="content">
            {props.data.search && <div className="search">
                <div className="form">
                    <div className="group">
                        <label htmlFor="search"><Icon id="search" /> Search</label>
                        <input name="search" type="text" className="valid" />
                    </div>
                </div>
                <div className="button">
                    <button className="btn btn-primary" type="button">Search</button>
                    <button className="btn btn-secondary" type="button" onClick={props.handler.search}>Cancel</button>
                </div>
            </div>}
            <div className="items">
                <div className="item">Symbol</div>
                <div className="item">Price</div>
                <div className="item">Change</div>
                <div className="item">Eearning Per Share</div>
                <div className="item">Average Price</div>
                <div className="item">Year High Price</div>
                <div className="item">Income After Tax</div>
                <div className="item">Volume</div>
                <div className="item">Action</div>
            </div>
            {props.data.stocks && props.data.stocks.map((item, index) => {
                return <div className="items" key={index}>
                    <div className="item">{item.symbol}</div>
                    <div className="item">{item.price}</div>
                    <div className="item">{item.change}</div>
                    <div className="item">{item.earningpershare}</div>
                    <div className="item">{item.average}</div>
                    <div className="item">{item.yearhighprice}</div>
                    <div className="item">{item.incomeaftertax}</div>
                    <div className="item">{item.volume}</div>
                    <div className="item">
                        <span className="btn btn-chart" type="button" onClick={() => props.handler.chart(index, item.edge)}><Icon id="chart" /> Chart</span>
                        <span className="btn btn-view" type="button" onClick={() => props.handler.view(index, item.edge)}><Icon id="search" /> View</span>
                    </div>
                </div>
            })}
        </div>
    );
}

export default Desktop;