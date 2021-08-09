import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';
import GoogleMapReact from 'google-map-react';

const Dashboard = props => {
	const breadcrumb = { heading: "Dashboard" };
	const defaultProps = {
		center: {
			lat: 59.95,
			lng: 30.33
		},
		zoom: 11,
	};
	return (
		<Layout {...props} breadcrumb={breadcrumb}>
			<Card className="chat-sidebar-container sidebar-container">
				<div className="chat-sidebar-wrap sidebar">
					<div className="pt-2 pb-2 pl-3 pr-3 align-items-center o-hidden box-shadow-1 chat-topbar">
					</div>
					<ul className="defect-list">
						<li className="list-item pending">
							<Row>
								<Col xs={6}>
									<div>
										<p className="mb-0"><strong>Ref No. 6</strong></p>
										<p className="mb-0">123 Park Av. Street A</p>
										<a href="/">More detail</a>
									</div>
								</Col>
								<Col xs={6}>
									<div className="text-right">
										<p className="mb-0">2021-06-17 01:37 PM</p>
										<p className="mb-0">Pending</p>
										<p className="mb-2"><strong>2 hours ago</strong></p>
									</div>
								</Col>
								<Col xs={12}><div className="border-top pb-1" /></Col>
								<Col xs={4}>
									<strong>Logistic:</strong> Pending
								</Col>
								<Col xs={4}>
									<strong>Priority:</strong> Normal
								</Col>
								<Col xs={4}>
									<strong>Attempts:</strong> 0
								</Col>
								<Col xs={12} className="pt-1"><div className="border-top pb-1" /></Col>
								<Col xs={12} className="pt-2 pb-1">
									<select className="form-control form-control-rounded">
										<optgroup label="Pending">
											<option value="Pending">Pending</option>
										</optgroup>
										<optgroup label="In Progress">
											<option value="Accepted by SP">Accepted by SP</option>
											<option value="SP On Site">SP On Site</option>
										</optgroup>
										<optgroup label="Completed">
											<option value="Completed by SP">Completed by SP</option>
											<option value="Verified by Admin">Verified by Admin</option>
										</optgroup>
										<optgroup label="Cancelled">
											<option value="Cancelled by Admin">Cancelled by Admin</option>
											<option value="Cancelled by Inspector">Cancelled by Inspector</option>
										</optgroup>
									</select>
								</Col>
							</Row>
						</li>
					</ul>
				</div>
				<div className="chat-content-wrap sidebar-content">
					<div style={{ height: '100%', width: '100%' }}>
						<GoogleMapReact
							bootstrapURLKeys={{ key: '' }}
							defaultCenter={defaultProps.center}
							defaultZoom={defaultProps.zoom}
						>
							<div
								lat={59.955413}
								lng={30.337844}
								text="My Marker"
							/>
						</GoogleMapReact>
					</div>
				</div>
			</Card>
		</Layout>
	);
};

export default Dashboard;
