import React from 'react';
import { Modal } from 'react-bootstrap';

export default function ChangePassword(props) {
    const {
        show,
        setShow,
    } = props;

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} centered className="confirm-modal">
            <Modal.Header closeButton>
                <h4 className="modal-title">
                    <strong>Change your password</strong>
                </h4>
            </Modal.Header>
            <Modal.Body>
                <p className="text-muted margin-bottom-20">
                    To make an update, enter your existing password followed by a new one.
                    If you don't know your existing password, you can log a request with
                    the system administrator to reset your password.
                </p>
                <form id="change-password-form">
                    <div className="form-group">
                        <label>Current password</label>
                        <input type="password" className="form-control" placeholder="Enter your current password" />
                    </div>
                    <div className="form-group">
                        <label>New password</label>
                        <input type="password" className="form-control" placeholder="Another input" /> 
                        <span className="form-text">Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 special character, 1 number, 1 letter.</span>
                    </div>
                    <div className="form-group">
                        <label>Verify password</label>
                        <input type="password" className="form-control" placeholder="Repeat your new password" /> 
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-light" onClick={handleClose}>Close</button>
                <button
                    type="submit"
                    className="btn btn-secondary"
                    form="change-password-form"
                >
                    Save Changes
                </button>
            </Modal.Footer>
        </Modal>
    );
}
