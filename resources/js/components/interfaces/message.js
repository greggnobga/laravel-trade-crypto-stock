const Message = ({ variant, children }) => {
    /** Return something. */
    return (
        <div className="font-size m-2">
            <p className={variant}>{children}</p>
        </div>
    );
};

Message.defaultProps = {
    variant: "alert-danger",
};

export default Message;
