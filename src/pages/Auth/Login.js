import React, { useState, useMemo } from 'react';
import { Card, Col, Row, Form, Alert } from 'reactstrap';
import { AuthLayout } from 'containers';
import AuthAervice from '../../providers/AuthService';
import loader from '../../assets/img/spinning.gif';
import { browserName, osName, osVersion } from 'react-device-detect';
import { Session } from 'bc-react-session';

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

const loading_size = {
    'width': '60px',
    'height': '60px'
  }

const Login = props => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});
    const [username, setUsernamr] = useState('');
    const [password, setPassword] = useState('');
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
                            <center>
                             <span className="login-logo">
                                <img src={require("images/logo.png")} alt="Login" />
                             </span>
                             </center>
                            <div className="auth-logo mb-4" style={backG}>
                            </div>
                            <Col xs={12}>
                            <h1 className="mb-3 text-24">Welcome back</h1>
                            <p>Enter your email and password to sign in</p>
                            <Form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Email</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="form-control form-control-lg"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        className="form-control form-control-lg"
                                        type="password"
                                        id="password"
                                        name="password"
                                    />
                                </div>
                                {error ? <Alert className="alert alert-danger" color="danger" id="error_message_div" >
                            {error}
                  </Alert>: ''}
                                <button
                                    disabled={disabled}
                                    type="submit"
                                    className="btn btn-secondary btn-block mt-2"
                                >
                                    Sign In
                                </button>
                                { loading && <img style={loading_size} src={loader}/> }
                            </Form>
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
