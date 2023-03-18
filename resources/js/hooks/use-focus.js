/** React. */
import { useEffect, useRef, useState } from 'react';

const useFocus = (props) => {
    /** Use state. */
    const [animate, setAnimate] = useState(false);
    const [effect, setEffect] = useState(props.default);

    /** Use ref. */
    const refer = useRef(null);

    /** Use effect. */
    useEffect(() => {
        /** Set refer to const variable. */
        const element = refer.current;
        /** Handle scroll logic. */
        const handleScroll = () => {
            /** Do the chat gpt magic. */
            if (element) {
                const elementRect = element.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const windowWidth = window.innerWidth;
                const isElementCenteredVertically = elementRect.top + elementRect.height / 2 >= 0 && elementRect.bottom - elementRect.height / 2 <= windowHeight;
                const isElementCenteredHorizontally = elementRect.left + elementRect.width / 2 >= 0 && elementRect.right - elementRect.width / 2 <= windowWidth;
                if (isElementCenteredVertically && isElementCenteredHorizontally) {
                    setAnimate(true);
                    /** Assign value. */
                    setEffect(`${props.default} ${props.animate}`);
                } else {
                    setAnimate(false);
                    /** Assign value. */
                    setEffect(`${props.default}`);
                }
            }
        };

        /** Handle focus logic. */
        const handleFocus = () => {
            setAnimate(true);
            /** Assign value. */
            setEffect(`${props.default} ${props.animate}`);
        };

        /** Add event listener. */
        if (element) {
            element.addEventListener('focus', handleFocus);
        }
        window.addEventListener('scroll', handleScroll);

        /** Return nothing and remove all listener. */
        return () => {
            if (element) {
                element.removeEventListener('focus', handleFocus);
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    /** Return array. */
    return [refer, animate, effect];
};

export default useFocus;