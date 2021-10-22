import React from 'react';
import { Col } from 'reactstrap';
import { AuthPages } from 'containers';

export default function LoginPage(props) {
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
            <form autoComplete="off">
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Email address" />
                </div>
                <div className="form-group margin-bottom-20">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Your password" autoComplete="new-password" />
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
                <div className="form-group margin-bottom-30">
                    <div className="form-row">
                        <Col xs={2} />
                        <Col xs={8}>
                            <button className="btn btn-secondary btn-block">
                                Login to account
                            </button>
                        </Col>
                    </div>
                </div>
            </form>
            <div className="divider" />
            <div className="form-group text-center">
                <div className="form-row">
                    <Col xs={4}>
                        <a href="/" className="text-muted">About us</a>
                    </Col>
                    <Col xs={4}>
                        <a href="/" className="text-muted">Contacts</a>
                    </Col>
                    <Col xs={4}>
                        <a href="/" className="text-muted">Support</a>
                    </Col>
                </div>
            </div>
        </AuthPages>
    );
}