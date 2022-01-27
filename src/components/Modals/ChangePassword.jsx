import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Col, Row } from 'reactstrap';
import useForm from 'react-hook-form';
import { UserService, GeoLocationProvider } from 'providers';

export default function ChangePassword(props) {
    const {
        show,
        setShow,
        profile,
    } = props;
    const { register, handleSubmit, reset, errors } = useForm();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleClose = () => setShow(false);

    function onSubmit(data) {
        const {
            old_password,
            new_password1,
            new_password2,
        } = data;

        //const geolocation = GeoLocationProvider.get();
        //console.log(geolocation)
        const data2 = {
            old_password: old_password,
            new_password1: new_password1,
            new_password2: new_password2,
            geoinfo: '',
            device: '',
        }

        UserService.passwordChange(data2).then((res) => {
            console.log(res.data);
            if (res.data.success) {
                setSuccess('Your password wassuccessfully modified');
                setError('');
                reset();
            } else {
                setSuccess('');
                setError(res.data.message);
            }
        }).catch()
       
    }
    return (
        <Modal show={show} onHide={handleClose} centered className="confirm-modal">
            <Modal.Header closeButton>
                <h4 className="modal-title">
                    <strong>Change your password</strong>
                </h4>
            </Modal.Header>
            <Modal.Body>
                <form
                    noValidate
                    id="change-password-form"
                    role="form"
                    autoComplete="off"
                    className="text-start"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Col xs={12}>
                        {error ?
                            <div className="alert alert-warning" role="alert" >
                                {error}
                            </div> : ''}

                        {success ?
                            <div className="alert alert-success" role="alert" >
                                {success}
                            </div> : ''}
                    </Col>
                    <p className="text-muted margin-bottom-20">
                        To make an update, enter your existing password followed by a new one.
                        If you don't know your existing password, you can log a request with
                        the system administrator to reset your password.
                </p>
                    <div className="form-group">
                        <label>Current password</label>
                        <input
                            type="password"
                            name="old_password"
                            className={`form-control ${errors.old_password ? 'is-invalid' : ''}`}
                            placeholder="Enter your current password"
                            ref={register({ required: true })}
                        />
                        {errors.old_password && <span className="help-block invalid-feedback">Please enter a valid old password</span>}
                    </div>
                    <div className="form-group">
                        <label>New password</label>
                        <input
                            type="password"
                            name="new_password1"
                            className={`form-control ${errors.new_password1 ? 'is-invalid' : ''}`}
                            placeholder="Enter new password"
                            ref={register({ required: true })}
                        />
                        <span className="form-text">Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 special character, 1 number, 1 letter.</span>
                        {errors.new_password1 && <span className="help-block invalid-feedback">Please enter a valid new password</span>}
                    </div>
                    <div className="form-group">
                        <label>Verify password</label>
                        <input
                            type="password"
                            name="new_password2"
                            className={`form-control ${errors.new_password2 ? 'is-invalid' : ''}`}
                            placeholder="Confirm password"
                            ref={register({ required: true })}
                        />
                        {errors.new_password2 && <span className="help-block invalid-feedback">Please enter a valid confirmed password</span>}
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
