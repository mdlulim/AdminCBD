import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';

const ForgotPassword = props => {
    return (
        <AuthLayout>
            <Card className="0-hidden">
                <Row>
                    <Col xs={12}>
                        <div className="p-4">
                            {/* <div className="auth-logo text-center mb-4">
                                <img src={require("images/logo.png")} alt="Forgot Password" />
                            </div> */}
                            <h1 className="mb-3 text-18">Forgot Password</h1>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        className="form-control form-control-rounded form-control-lg"
                                        type="email"
                                        id="email"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-rounded btn-primary btn-block mt-2"
                                >
                                    Reset Password
                                </button>
                            </form>
                            <div className="mt-3 text-center">
                                <a
                                    className="text-muted"
                                    href="/login"
                                >
                                    <u>Sign in</u>
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>
        </AuthLayout>
    );
};

export default ForgotPassword;
