/** React. */
import { useEffect, useState } from "react";

const useScreen = () => {
    /** Get inner width size. */
    const getScreen = () => window.innerWidth <= 768;

    /** Use state. */
    const [isMobile, setMobile] = useState(getScreen);

    /** Use effect. */
    useEffect(() => {
        /** On resize function. */
        const onResize = () => {
            setMobile(getScreen());
        };
        /** Add event resize listener.  */
        window.addEventListener("resize", onResize);

        /** Return and remove event listener. */
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    /** Return something. */
    return { isMobile };
};

export default useScreen;
