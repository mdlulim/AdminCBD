import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';

const Login = props => {
    return (
        <AuthLayout>
            <Card className="0-hidden">
                <Row>
                    <Col xs={12}>
                        <div className="p-4">
                            {/* <div className="auth-logo text-center mb-4">
                                <img src={require("images/logo.png")} alt="Login" />
                            </div> */}
                            <h1 className="mb-3 text-18">Sign In</h1>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control form-control-rounded form-control-lg"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        className="form-control form-control-rounded form-control-lg"
                                        type="password"
                                        id="password"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-rounded btn-primary btn-block mt-2"
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
                        </div>
                    </Col>
                </Row>
            </Card>
        </AuthLayout>
    );
};

export default Login;
