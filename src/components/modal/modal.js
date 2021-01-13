import React from 'react';
import ReactDOM from 'react-dom';
import './modal.scss';
// let newCustomer, newEstimatedDate;
const handleCustomerChange = (event, data, setData) => {
    setData({...data, customer: event.target.value});
}

const handleEstimatedDate = (event, data, setData) => {
    setData({...data, estimatedDate: event.target.value});
}

const Modal = ({ isShowing, hide, onSave, data, setData }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                <div className="modal-header">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="form-row">
                    <label htmlFor="">Customer:</label>
                    <input type="text" value={data.customer}
                           onChange={(event) => handleCustomerChange(event, data, setData)}/>
                </div>
                <div className="form-row">
                    <label htmlFor="">Estimated Date:</label>
                    <input type="date" value={data.estimatedDate}
                           onChange={(event) => handleEstimatedDate(event, data, setData)}/>
                </div>
                <div>
                    <button onClick={onSave}>Save</button>
                </div>
            </div>
        </div>
    </React.Fragment>, document.body
) : null;

export default Modal;