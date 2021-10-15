import React from 'react';
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
                            <form>
                                <div className="form-group">
                                    <label htmlFor="username">Email</label>
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
