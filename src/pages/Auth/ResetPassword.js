import React, { useEffect, useRef, useState } from 'react';
import { Col } from 'reactstrap';
import { AuthPages } from 'containers';
import { AuthService } from 'providers';
import { passwordValidationSchema } from 'static/regex';
import useForm from "react-hook-form";
import Swal from 'sweetalert2';
import { ConsoleView } from 'react-device-detect';

export default function ForgotPassword(props) {
    const { match } = props;
    const { register, handleSubmit, reset, errors } = useForm();
    const [processing, setProcessing] = useState(true);
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('Reset Password');
    const [token, setToken] = useState(null);
    const [cta, setCta] = useState(null);
    const password = useRef({});

    document.title = 'Reset Password - CBI Admin Portal';

    useEffect(() => {
        const verify = async () => {
            const { params } = match;
            const { token } = params;
            if (token) {
                const results = await AuthService.verifyToken(token, 'reset-password');
                const { success } = results;
                if (success) {
                    setToken(token);
                    setShowForm(true);
                } else {
                    setCta('login');
                    setTitle('Error!');
                    setMessage(results.message || 'Could not process your request, please try again.');
                    setError(true);
                }
                return setProcessing(false);
            }
            window.location = '/login';
        };
        verify();
        setProcessing(false)
    }, [
        match,
        setCta,
        setTitle,
        setError,
        setSuccess,
        setProcessing,
    ]);

    async function onSubmit(data) {
        setProcessing(true);
        data.token = token;
        const response = await AuthService.confirmResetPassword(data);
        console.log(response);
        const { success } = response;
        setProcessing(false);
        if (success) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Password reset successful!',
                showConfirmButton: false,
                timer: 3000
            });
            return setTimeout(async function () {
                window.location.href = '/login';
            }, 3000);
        }
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Failed to process request, please try again!',
            showConfirmButton: false,
            timer: 3000
        });
    }

    return (
        <AuthPages {...props}>
            <a href="/" className="logo-holder logo-holder--lg logo-holder--wide">
                <div className="logo-text">
                    <strong className="text-primary">CBI</strong> <strong>GLOBAL</strong>
                </div>
            </a>
            <p className="caption text-center margin-bottom-30">
                The KEY to the 4th Industrial Revolution
            </p>
                        <form
                            noValidate
                            id="reset-password-form"
                            role="form"
                            autoComplete="off"
                            className="text-start"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                                        <div className="text-center text-muted mb-0 mt-4">
                                            <h2 className="mb-1">Reset Password</h2>
                                            <p className="text-sm my-4 mt-0">Enter and confirm your new password.</p>
                                            <div className="form-group">
                                            <label>New password</label>
                                                <input
                                                    placeholder="Enter new password"
                                                    id="password1"
                                                    name="password1"
                                                    type="password"
                                                    className={`form-control ${errors.password1 ? 'is-invalid' : ''}`}
                                                    ref={register({ required: true })}
                                                    disabled={processing}
                                                />
                                                {errors.password1 && <small className="invalid-feedback">Invalid password entered.</small>}
                                            </div>
                                            <div className="form-group">
                                            <label>Confirm password</label>
                                                <input
                                                    placeholder="Confirm password"
                                                    id="password2"
                                                    name="password2"
                                                    type="password"
                                                    className={`form-control ${errors.password2 ? 'is-invalid' : ''}`}
                                                    ref={register({ required: true })}
                                                    disabled={processing}
                                                />
                                                {errors.password2 && <small className="invalid-feedback">Passwords do not match.</small>}
                                            </div>
                                        </div>
                            
                                    </form>
                                    <div className="text-center">
                                            <button
                                                type="submit"
                                                form="reset-password-form"
                                                className="btn btn-secondary btn-block w-100"
                                                disabled={processing}
                                            >
                                                {processing ?
                                                    'Processing...' :
                                                    'Submit'}
                                            </button>
                                        </div>
            <div className="divider" />
            <div className="form-group text-center">
                <div className="form-row">
                    <Col xs={4}>
                        <a href="" className="text-muted"></a>
                    </Col>
                    <Col xs={4}>
                        <a href="/login" className="text-muted">Login</a>
                    </Col>
                    <Col xs={4}>
                        <a href="" className="text-muted"></a>
                    </Col>
                </div>
            </div>
        </AuthPages>
    );
}