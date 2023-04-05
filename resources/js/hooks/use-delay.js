/** React. */
import { useState } from 'react';

/** Vendor. */
import { useNavigate } from "react-router-dom";

const useDelay = (props) => {
    /** Use navigate. */
    const navigate = useNavigate();

    /** Set local state. */
    const [delay, setDelay] = useState(props.default);

    /** Decide which css class to use. */
    const formClasses = delay ? props.enter : props.exit;

    const delayHandler = () => {
        /** Change state on click. */
        setDelay(false);
        /** Wait to have animation some leeway. */
        // setTimeout(() => {
        //     navigate('/');
        // }, 1000);
    }

    /** Return something */
    return {
        onDelay: delayHandler,
        isClass: formClasses,
    }
}

export default useDelay;