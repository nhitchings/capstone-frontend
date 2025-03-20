const Modal = ({ heading, isOpen, onClose, children }) => {
    if (!isOpen) return null; // Don't render if not open

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Optional Heading */}
                {heading && <h2 className="modal-heading">{heading}</h2>}

                {/* Close Button */}
                <button onClick={onClose} className="modal-close-button">
                    &times;
                </button>

                {/* Modal Body */}
                <div className="modal-body">{children}</div>
            </div>

            {/* Modal Styles */}
            <style>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                .modal-content {
                    background: white;
                    min-width: 300px;
                    min-height: 200px;
                    color: black;
                    padding: 20px;
                    border-radius: 8px;
                    max-width: 500px;
                    position: relative;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .modal-heading {
                    margin-top: 0;
                }
                .modal-body {
                    margin-top: 10px;
                }

                .modal-content button.modal-close-button {
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    background: transparent;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
            `}</style>
        </div>
    );
};

export default Modal;
