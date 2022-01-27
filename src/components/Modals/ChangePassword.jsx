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
        //console.log(data2)
        //return data
        UserService.passwordChange(data2).then((res) => {
            console.log(res);
            // if (response.success) {
            //     setSuccess('User was successfully modified');
            //     setError('');
            //     reset();
            // } else {
            //     setSuccess('');
            //     setError(response.message);
            // }
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
                    </div>
                    <div className="form-group">
                        <label>Verify password</label>
                        <input
                            type="password"
                            name="new_password2"
                            className={`form-control ${errors.new_password2 ? 'is-invalid' : ''}`}
                            placeholder="Repeat your new password"
                            ref={register({ required: true })}
                        />
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
