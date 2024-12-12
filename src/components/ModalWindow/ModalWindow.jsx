import React, { useEffect } from 'react'
import './ModalWindow.css'

export function ModalWindow({ onClose, children }) {
    useEffect(() => {
        document.body.classList.add('modal-open');
        return () => document.body.classList.remove('modal-open');
    }, []);

    return (
        <div className="modal-overlay">
            <div className='modal_window'>
                <button className="modal_close" onClick={onClose}><i class="fa-solid fa-xmark"></i></button>
                {children}
            </div></div>
    )
}
