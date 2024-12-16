


function Modal({isOpen, onClose, description}) {
    if (!isOpen) return null;  

    return (
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={onClose}>Close</button>
        </div>
    </div>
    ); 
}

export default Modal;