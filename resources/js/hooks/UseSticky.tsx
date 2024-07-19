
import { useState, useEffect } from "react";

const useSticky = () => {
    /** Use state. */
    const [sticky, setSticky] = useState(false);

    /** Use effect. */
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const halfViewport = windowHeight / 2;

            if (scrollTop > halfViewport) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /** Return state. */
    return sticky;
};

export default useSticky;