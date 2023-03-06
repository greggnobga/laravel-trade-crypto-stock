/** Vendor. */
import { Link } from "react-router-dom";

/** Component. */
import Icon from '../icons';

const Deck = () => {
    const cardItems = [
        { title: 'stock', id: 'stock', value: '100', color: 'green', link: '/dashboard/stock-portfolio' },
        { title: 'crypto', id: 'crypto', value: '200', color: 'red', link: '/dashboard/crypto-portfolio' },
        { title: 'fund', id: 'fund', value: '300', color: 'blue', link: '/dashboard/crypto-portfolio' },
        { title: 'note', id: 'note', value: '10', color: 'gold', link: '/dashboard/stock-note' }
    ];

    return (
        <div className="deck">
            {cardItems.map((item) => {
                return <div className={`card ${item['color']}`} key={item['id']}>
                    <p className="title"><Icon id={item['id']} /> {item['title']}</p>
                    <p className="value">{item['value']}</p>
                    <p className="link"><Link to={item['link']}>more</Link></p>
                </div>
            })}
        </div>
    );
}

export default Deck;