/** React. */
import { useState } from "react";

const Message = ({ variant, children }) => {
    /** Use dispatch. */
    const [message, setMessage] = useState(true);
    /** Message handles. */
    const messageHandler = () => {
        setMessage(!message);
    };

    /** Return. */
    return (
        <>
            {message && (
                <div
                    className="font-size m-2 cursor-pointer hover:animate-pulse"
                    onClick={messageHandler}
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
