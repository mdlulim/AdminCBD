import React, { useState, useEffect} from 'react';
import { Col, Alert } from 'reactstrap';
import { browserName, osName, osVersion } from 'react-device-detect';
import AuthAervice from '../../providers/AuthService';
import { AuthPages } from 'containers';
import { UserService, SessionProvider } from 'providers';
import jwt from 'jwt-decode';
import { Loader } from 'components';
export default function LoginPage(props) {
    const { setRole } = props;
    const [show, setShow] = useState(false)
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
        // when the form is submitted
  const onSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        setDisabled(true);

        const form = event.currentTarget;
        const user = form.username.value;
        const password = form.password.value;

        const device = {
            browser: browserName,
            os_name: osName,
            os_version: osVersion,
        };

        const geoLocation= {
                IPv4: "123456"
            };
            AuthAervice.login(user, password, device,geoLocation).then(async (response) =>{
            if(response.data.success === true && response.data.data.admin === true){
                SessionProvider.set(response.data.data.token);

                const role = await UserService.getUserRole(response.data.data.token);
                setRole(role)

                window.location = '/dashboard';
            }else{
                setShow(false)
                setLoading(false);
                setDisabled(false);
                setError("Username or password is incorrect");
            }
        }).catch(error => {
            setShow(false)
            setError(error.message);
            setLoading(false);
            setDisabled(false);
        });
    }

    return (
        <AuthPages {...props}>
            <>
            <a href="/" className="logo-holder logo-holder--lg logo-holder--wide">
                <div className="logo-text">
                    <strong className="text-primary">CBI</strong> <strong>GLOBAL</strong>
                </div>
            </a>
            <p className="caption text-center margin-bottom-30">
                The KEY to the 4th Industrial Revolution
            </p>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" id="username" className="form-control" placeholder="Email address" />
                </div>
                <div className="form-group margin-bottom-20">
                    <label>Password</label>
                    <input type="password" name="password" id="password" className="form-control" placeholder="Your password" autoComplete="new-password" />
                </div>
                <div className="form-group margin-bottom-30">
                    <div className="form-row">
                        <div className="col-6">
                            <label className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" checked="" />
                                <span className="custom-control-label">Remember me</span>
                            </label> 
                        </div>
                        <div className="col-6 text-right">
                            <a href="/forgot-password">Forgot password?</a>
                        </div>
                    </div>
                </div>
                {error ? <Alert className="alert alert-danger" color="danger" id="error_message_div" >
                            {error}
                  </Alert>: ''}
                <div className="form-group margin-bottom-30">
                    <div className="form-row">
                        <Col xs={2} />
                        <Col xs={8}>
                            <button disabled={disabled} type="submit" className="btn btn-secondary btn-block">
                                {disabled ? 'Processing request...' : 'Login to account'}
                            </button>
                        </Col>
                    </div>
                </div>
            </form>
            <div className="divider" />
            </>
        </AuthPages>
    );
}