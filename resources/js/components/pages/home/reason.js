/** Hook. */
import useFocus from '../../../hooks/use-focus';

/** Component. */
import Icon from '../../icons';

const Reason = () => {
    /** Use focus hook. */
    const [refer, animate, effect] = useFocus({ default: 'reason', animate: 'fade-in-right' });

    /** Return something. */
    return (
        <div ref={refer} className={effect}>
            <div className="title">
                <h1>Why Orion Trade?</h1>
            </div>
            <div className="perks">
                <div className="item">
                    <div className="thumbnail"><img src="/public/images/tools.jpeg" alt="Innovative Tools" /></div>
                    <div className="title"><Icon id="tool" /> Innovative Tools</div>
                    <div className="description">Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</div>
                </div>
                <div className="item">
                    <div className="thumbnail"><img src="/public/images/price.jpeg" alt="Transparent Pricing" /></div>
                    <div className="title"><Icon id="price" /> Transparent Pricing</div>
                    <div className="description">Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</div>
                </div>
                <div className="item">
                    <div className="thumbnail"><img src="/public/images/support.jpeg" alt="Dedicated Support" /></div>
                    <div className="title"><Icon id="support" /> Dedicated Support</div>
                    <div className="description">Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</div>
                </div>
            </div>
        </div>
    );
}

export default Reason;