/** Import hook. */
import useFocus from '../../hooks/use-focus';

const CryptoExplorer = () => {
    /** Use hook focus. */
    const [refer, animate, effect] = useFocus({ default: '', animate: 'fade-in-right' });

    /** Return somethibng. */
    return (
        <div ref={refer} className={effect}>
            <h1>Crypto explorer page.</h1>
        </div>
    );
}

export default CryptoExplorer;