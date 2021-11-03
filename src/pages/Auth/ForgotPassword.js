import React from 'react';
import { Col } from 'reactstrap';
import { AuthPages } from 'containers';

export default function ForgotPassword(props) {
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
                    <label>Email address</label>
                    <input type="text" className="form-control" placeholder="Email address" />
                </div>
                <div className="form-group margin-bottom-30">
                    <button className="btn btn-secondary btn-block">
                        Send Request
                    </button>
                </div>
            </form>
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