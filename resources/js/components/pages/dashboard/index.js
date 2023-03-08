/** Component. */
import Icon from '../../icons';
import Card from '../../ui/card';

const Dashboad = () => {
    const cardItems = [
        { title: 'stock', id: 'stock', value: '100', color: 'green', link: '/dashboard/stock-portfolio' },
        { title: 'crypto', id: 'crypto', value: '200', color: 'red', link: '/dashboard/crypto-portfolio' },
        { title: 'fund', id: 'fund', value: '300', color: 'blue', link: '/dashboard/crypto-portfolio' },
        { title: 'note', id: 'note', value: '10', color: 'gold', link: '/dashboard/stock-note' }
    ];

    /** Return something. */
    return (
        <div id="dashboard">
            <div className="deck">
                <Card items={cardItems} />
            </div>
            <div className="chart">
                <div className="account">Account</div>
                <div className="offer">Offers</div>
                <div className="graph">Main Chart</div>
            </div>
            <div className="rank">
                <div className="board">Philippine Stock Exchange</div>
                <div className="gainer">Top Gainers</div>
                <div className="losser">Top Lossers</div>
            </div>
            <div className="rank">
                <div className="board">Crypto Currency</div>
                <div className="gainer">Top Gainers</div>
                <div className="losser">Top Lossers</div>
            </div>
        </div>
    );
}

export default Dashboad;