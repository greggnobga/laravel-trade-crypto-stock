/** Component. */
import Icon from '../../../../icons';

const Mobile = (props) => {
    return (
        <div className="mobile-content">
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
            {props.data.stocks && props.data.stocks.map((item, index) => {
                return (
                    <div className="items" key={index}>
                        <div className="item">
                            <span className="key">Symbol</span>
                            <span className="value">{item.symbol}</span>
                        </div>
                        <div className="item">
                            <span className="key">Price</span>
                            <span className="value">{item.price}</span>
                        </div>
                        <div className="item">
                            <span className="key">Change</span>
                            <span className="value">{item.change}</span>
                        </div>
                        <div className="item">
                            <span className="key">Eearning Per Share</span>
                            <span className="value">{item.earningpershare}</span>
                        </div>
                        <div className="item">
                            <span className="key">Average Price</span>
                            <span className="value">{item.average}</span>
                        </div>
                        <div className="item">
                            <span className="key">Year High Price</span>
                            <span className="value">{item.yearhighprice}</span>
                        </div>
                        <div className="item">
                            <span className="key">Income After Tax</span>
                            <span className="value">{item.incomeaftertax}</span>
                        </div>
                        <div className="item">
                            <span className="key">Volume</span>
                            <span className="value">{item.volume}</span>
                        </div>
                        <div className="item">
                            <span className="btn btn-chart" type="button" onClick={() => props.handler.chart(index, item.edge)}><Icon id="chart" /> Chart</span>
                        </div>
                        <div className="item">
                            <span className="btn btn-view" type="button" onClick={() => props.handler.view(index, item.edge)}><Icon id="search" /> View</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Mobile;