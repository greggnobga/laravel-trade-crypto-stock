/** React. */
import { useState, useEffect } from "react";

const Notice = ({ variant, children, duration, show }) => {
    /** Use state. */
    const [notice, setNotice] = useState(show);

    /** Use effect. */
    useEffect(() => {
        /** Set state. */
        if (show) {
            setNotice(true);
        }

        /** If children changes run timeout. */
        if (children) {
            const timer = setTimeout(() => {
                setNotice(false);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [show, duration, children]);

    /** Return. */
    return (
        <>
            {notice && (
                <div className="fixed top-0 right-0 m-2 cursor-pointer hover:animate-pulse">
                    <p className={variant ? variant : "alert-danger"}>
                        {children}
                    </p>
                </div>
            )}
        </>
    );
};

export default Notice;
