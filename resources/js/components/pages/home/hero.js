/** Hook. */
import useFocus from '../../../hooks/use-focus';
import useMouse from '../../../hooks/use-mouse';

const Hero = () => {
    /** Use focus hook. */
    const [refer, animate, effect] = useFocus({ default: 'hero', animate: 'fade-in-left' });

    /** Map mouse hook create account button. */
    const {
        mouseHover: createAccountHover,
        mouseEnter: createAccountMouseEnter,
        mouseLeave: createAccountMouseLeave
    } = useMouse({ default: 'btn btn-primary', enter: 'pulsate-forward' });

    /** Map mouse hook learn more button. */
    const {
        mouseHover: learnMoreHover,
        mouseEnter: learnMoreMouseEnter,
        mouseLeave: learnMoreMouseLeave
    } = useMouse({ default: 'btn btn-warning', enter: 'pulsate-forward' });

    /** Return something. */
    return (
        <div ref={refer} className={effect} >
            <div className="headline"><p className="writer">At little cost, you can accomplish more.</p></div>
            <div className="tagline">We help your money go further with no yearly fees and some of the most affordable prices in the sector.</div>
            <div className="button">
                <button className={createAccountHover} onMouseEnter={createAccountMouseEnter} onMouseLeave={createAccountMouseLeave} type="button">Open an account</button>
                <button className={learnMoreHover} onMouseEnter={learnMoreMouseEnter} onMouseLeave={learnMoreMouseLeave} type="button">Learn more</button>
            </div>
        </div>
    );
}

export default Hero;