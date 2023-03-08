/** React. */
import { Fragment } from 'react';

/** Vendor. */
import { Link } from "react-router-dom";

/** Component. */
import Icon from '../icons';

const Card = (props) => {
    /** Return something. */
    return (
        <Fragment>
            {props.items.map((item) => {
                return <div className={`card ${item['color']}`} key={item['id']}>
                    <p className="title"><Icon id={item['id']} /> {item['title']}</p>
                    <p className="value">{item['value']}</p>
                    <p className="link"><Link to={item['link']}>more</Link></p>
                </div>
            })}
        </Fragment>
    );
}

export default Card;