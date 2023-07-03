/** React. */
import { useState } from "react";

const Message = ({ variant, children }) => {
    /** Use state. */
    const [hidden, setHidden] = useState(false);

    /** Hide handles. */
    const hideHandler = () => {
        setHidden(!hidden);
    };
    /** Return something. */
    return (
        <>
            {hidden ? (
                ""
            ) : (
                <div
                    className="font-size m-2 cursor-pointer"
                    onClick={hideHandler}
                >
                    <p className={variant ? variant : "alert-danger"}>
                        {children}
                    </p>
                </div>
            )}
        </>
    );
};

export default Message;
