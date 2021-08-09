import React from 'react';
import { Col, Row } from 'reactstrap';
import moment from 'moment';

const Footer = () => {
	return <div />;
	return (
		<div className="app-footer">
			<Row>
				<Col md={9}>
					<p><strong>uProp Administration Dashboard</strong></p>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero 
						quis beatae officia saepe perferendis voluptatum minima eveniet 
						voluptates dolorum, temporibus nisi maxime nesciunt totam 
						repudiandae commodi sequi dolor quibusdam
					</p>
				</Col>
			</Row>
			<div className="footer-bottom border-top pt-3 d-flex flex-column flex-sm-row align-items-center">
				<a className="btn btn-primary text-white btn-rounded" href="/" target="_blank">
					Download uProp App
				</a>
				<span className="flex-grow-1"></span>
				<div className="d-flex align-items-center">
					<img className="logo" src={require("images/logo.png")} alt="JRA Admin" />
					<div>
						<p className="m-0">&copy; {moment().format('YYYY')} uProp Admin</p>
						<p className="m-0">All rights reserved</p>
					</div>
				</div>
			</div>
		</div>
	)
};

export default Footer;
