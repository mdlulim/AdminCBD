import React, { useState, useMemo } from 'react';
import { Card, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';


const backG = {
    backgroundColor: '#800020',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
}
const backLogo = {
    backgroundColor: 'rgb(255 255 255)',
    borderRadius: '50%',
}

const logoS ={
    width: '85px',
}

const Login = props => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
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
                console.log(response);
            if(response.data.success === true){
                console.log(response.data.data.token)
                let sessionDuration = 864000;
                Session.start({
                    payload: {
                        admin: response.data.data.admin,
                        token: response.data.data.token
                    },
                    expiration: sessionDuration 
                });
            window.location = '/';
            }else{
                setLoading(false);
                setDisabled(false);
                setError(response.data.message);
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
        <AuthLayout>
            <Card className="0-hidden">
                <Row>
                    <Col xs={12}>
                        <div className="mb-4">
                            <div className="auth-logo mb-4" style={backG}>
                            <span className="login-logo">
                                <img src={require("images/logo.png")} alt="Login" />
                             </span>
                            </div>
                            <Col xs={12}>
                            <h1 className="mb-3 text-18">Sign In</h1>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control form-control-lg"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        className="form-control form-control-lg"
                                        type="password"
                                        id="password"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-secondary btn-block mt-2"
                                >
                                    Sign In
                                </button>
                            </form>
                            <div className="mt-3 text-center">
                                <a
                                    className="text-muted"
                                    href="/forgot-password"
                                >
                                    <u>Forgot Password?</u>
                                </a>
                            </div>
                            </Col>
                        </div>
                    </Col>
                </Row>
            </Card>
        </AuthLayout>
    );
};

export default Login;
