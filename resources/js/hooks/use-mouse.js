/** React. */
import { useState } from 'react';

const useMouse = (props) => {
    /** Set local state. */
    const [mouseHover, setMouseHover] = useState(props.default);

    /** Define mouse on enter. */
    const mouseEnterHandler = () => {
        let enter = `${props.default} ${props.enter ? props.enter : ''}`;
        setMouseHover(enter.trim());
    }

    /** Define mouse on leave. */
    const mouseLeaveHandler = () => {
        let exit = `${props.default} ${props.exit ? props.exit : ''}`;
        setMouseHover(exit.trim());
    }

    /** Return something */
    return {
        mouseHover: mouseHover,
        mouseEnter: mouseEnterHandler,
        mouseLeave: mouseLeaveHandler,
    }
}

export default useMouse;