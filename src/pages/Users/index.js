import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';
import { Users } from 'components';

const UsersList = props => {
	const breadcrumb = { heading: "Users" };
	return (
		<Layout {...props} breadcrumb={breadcrumb}>
			<Row className="mt-4">
				<Col lg={8} xl={8}>
				<Col md={12}>
                    <Users.Users />
                </Col>
				</Col>
				<Col lg={4} xl={4} className="mb-4">
					<Card>
						<CardBody>
							<div className="ul-widget__head">
								<div className="ul-widget__head-label">
									<h3 className="ul-widget__head-title">Latest Log</h3>
								</div>
								<div className="ul-widget__head-toolbar">
									<ul className="nav nav-tabs nav-tabs-line nav-tabs-bold ul-widget-nav-tabs-line" role="tablist">
										<li className="nav-item"><a className="nav-link active show" data-toggle="tab" href="/" role="tab" aria-selected="true">Today</a></li>
										<li className="nav-item"><a className="nav-link" data-toggle="tab" href="/" role="tab" aria-selected="false">Month</a></li>
									</ul>
								</div>
							</div>
							<div className="ul-widget__body">
								<div className="tab-content">
									<div className="tab-pane active show" id="__g-widget-s6-tab1-content">
										<div className="ul-widget-s6__items">
											<div className="ul-widget-s6__item"><span className="ul-widget-s6__badge">
												<p className="badge-dot-primary ul-widget6__dot"></p>
											</span><span className="ul-widget-s6__text">12 new users registered</span><span className="ul-widget-s6__time">Just Now</span></div>
											<div className="ul-widget-s6__item"><span className="ul-widget-s6__badge">
												<p className="badge-dot-success ul-widget6__dot"></p>
											</span>
												<p className="ul-widget-s6__text">System shutdown<span className="badge badge-pill badge-primary m-2">Primary</span></p><span className="ul-widget-s6__time">14 mins</span>
											</div>
											<div className="ul-widget-s6__item"><span className="ul-widget-s6__badge">
												<p className="badge-dot-warning ul-widget6__dot"></p>
											</span><span className="ul-widget-s6__text">System error -<a className="typo_link text-danger" href="">Danger state text</a></span><span className="ul-widget-s6__time">2 hrs </span></div>
											<div className="ul-widget-s6__item"><span className="ul-widget-s6__badge">
												<p className="badge-dot-danger ul-widget6__dot"></p>
											</span><span className="ul-widget-s6__text">12 new users registered</span><span className="ul-widget-s6__time">Just Now</span></div>
											<div className="ul-widget-s6__item"><span className="ul-widget-s6__badge">
												<p className="badge-dot-info ul-widget6__dot"></p>
											</span>
												<p className="ul-widget-s6__text">System shutdown<span className="badge badge-pill badge-success m-2">Primary</span></p><span className="ul-widget-s6__time">14 mins</span>
											</div>
											<div className="ul-widget-s6__item"><span className="ul-widget-s6__badge">
												<p className="badge-dot-dark ul-widget6__dot"></p>
											</span><span className="ul-widget-s6__text">System error -<a className="typo_link text-danger" href="">Danger state text</a></span><span className="ul-widget-s6__time">2 hrs </span></div>
											<div className="ul-widget-s6__item"><span className="ul-widget-s6__badge">
												<p className="badge-dot-primary ul-widget6__dot"></p>
											</span><span className="ul-widget-s6__text">12 new users registered</span><span className="ul-widget-s6__time">Just Now</span></div>
											<div className="ul-widget-s6__item"><span className="ul-widget-s6__badge">
												<p className="badge-dot-success ul-widget6__dot"></p>
											</span>
												<p className="ul-widget-s6__text">System shutdown<span className="badge badge-pill badge-danger m-2">Primary</span></p><span className="ul-widget-s6__time">14 mins</span>
											</div>
										</div>
									</div>
									<div className="tab-pane" id="__g-widget-s6-tab2-content">
										<div className="ul-widget2">
											<div className="ul-widget-s6__items">
												<div className="ul-widget-s6__item"><span className="ul-widget-s6__badge">
													<p className="badge-dot-danger ul-widget6__dot"></p>
												</span><span className="ul-widget-s6__text">44 new users registered</span><span className="ul-widget-s6__time">Just Now</span></div>
												<div className="ul-widget-s6__item"><span className="ul-widget-s6__badge">
													<p className="badge-dot-warning ul-widget6__dot"></p>
												</span>
													<p className="ul-widget-s6__text">System shutdown<span className="badge badge-pill badge-primary m-2">Primary</span></p><span className="ul-widget-s6__time">14 mins</span>
												</div>
												<div className="ul-widget-s6__item"><span className="ul-widget-s6__badge">
													<p className="badge-dot-primary ul-widget6__dot"></p>
												</span><span className="ul-widget-s6__text">System error -<a className="typo_link text-danger" href="">Danger state text</a></span><span className="ul-widget-s6__time">2 hrs </span></div>
												<div className="ul-widget-s6__item"><span className="ul-widget-s6__badge">
													<p className="badge-dot-danger ul-widget6__dot"></p>
												</span><span className="ul-widget-s6__text">12 new users registered</span><span className="ul-widget-s6__time">Just Now</span></div>
												<div className="ul-widget-s6__item"><span className="ul-widget-s6__badge">
													<p className="badge-dot-info ul-widget6__dot"></p>
												</span>
													<p className="ul-widget-s6__text">System shutdown<span className="badge badge-pill badge-success m-2">Primary</span></p><span className="ul-widget-s6__time">14 mins</span>
												</div>
												<div className="ul-widget-s6__item"><span className="ul-widget-s6__badge">
													<p className="badge-dot-dark ul-widget6__dot"></p>
												</span><span className="ul-widget-s6__text">System error -<a className="typo_link text-danger" href="">Danger state text</a></span><span className="ul-widget-s6__time">2 hrs </span></div>
												<div className="ul-widget-s6__item"><span className="ul-widget-s6__badge">
													<p className="badge-dot-primary ul-widget6__dot"></p>
												</span><span className="ul-widget-s6__text">12 new users registered</span><span className="ul-widget-s6__time">Just Now</span></div>
												<div className="ul-widget-s6__item"><span className="ul-widget-s6__badge">
													<p className="badge-dot-success ul-widget6__dot"></p>
												</span><span className="ul-widget-s6__text">System shutdown<span className="badge badge-pill badge-danger m-2">Primary</span></span><span className="ul-widget-s6__time">14 mins</span></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Layout>
	);
};

export default UsersList;
