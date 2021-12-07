import React, { useState, useEffect} from 'react';
import { Col, Alert } from 'reactstrap';
import { browserName, osName, osVersion } from 'react-device-detect';
import { Session } from 'bc-react-session';
import AuthAervice from '../../providers/AuthService';
import { AuthPages } from 'containers';
import { UserService } from 'providers';
import jwt from 'jwt-decode';
const session = Session.get();

export default function LoginPage(props) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    useEffect(() => {
        if(session.isValid){
            window.location = '/dashboard';
            return
        }

    },[]);
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
            AuthAervice.login(user, password, device,geoLocation).then((response) =>{
                console.log(jwt(response.data.data.token));
            if(response.data.success === true && response.data.data.admin === true){
                let sessionDuration = 864000;
                Session.start({
                    payload: {
                        admin: response.data.data.admin,
                        token: response.data.data.token,
                        user: jwt(response.data.data.token)
                    },
                    expiration: sessionDuration 
                });
                window.location = '/dashboard';
            }else{
                setLoading(false);
                setDisabled(false);
                setError("Username or password is incorrect");
            }
        console.log(response);
        }).catch(error => {
            console.log(error);
            setError(error.message);
            setLoading(false);
            setDisabled(false);
        });

        //const geoLocation = GeoLocationService.getClientLocation();
        //console.log('');
        //console.log(geoLocation);
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
                                Login to account
                            </button>
                        </Col>
                    </div>
                </div>
            </form>
            <div className="divider" />
            <div className="form-group text-center">
                <div className="form-row">
                    {/* <Col xs={4}>
                        <a href="/" className="text-muted">About us</a>
                    </Col>
                    <Col xs={4}>
                        <a href="/" className="text-muted">Contacts</a>
                    </Col>
                    <Col xs={4}>
                        <a href="/" className="text-muted">Support</a>
                    </Col> */}
                </div>
            </div>
        </AuthPages>
    );
}