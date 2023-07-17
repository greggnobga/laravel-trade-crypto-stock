import { createPortal } from "react-dom";

const Modal = ({ children }) => {
    return createPortal(
        <div className="modal-container">
            <div className="modal-content">
                <div className="modal-scrollable">{children}</div>
            </div>
        </div>,
        document.getElementById("modal")
    );
};

export default Modal;
