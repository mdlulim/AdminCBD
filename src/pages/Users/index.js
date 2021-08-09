import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';

const Users = props => {
	const breadcrumb = { heading: "Users" };
	return (
		<Layout {...props} breadcrumb={breadcrumb}>
			<Row className="mt-4">
				<Col lg={8} xl={8}>
					<Card>
						<CardBody>
							<div className="ul-widget__head pb-20 v-margin">
								<div className="ul-widget__head-label">
									<h3 className="ul-widget__head-title">Users List</h3>
								</div>
								<button className="btn btn-info dropdown-toggle _r_btn border-0" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">All</button>
								<div className="dropdown-menu" x-placement="bottom-start" style={{ position: 'absolute', willChange: 'transform', top: 0, left: 0, transform: 'translate3d(302px, 51px, 0px)' }}>
									<a className="dropdown-item ul-widget__link--font" href="/"><i className="i-Bar-Chart-4" /> Export</a>
									<a className="dropdown-item ul-widget__link--font" href="/"><i className="i-Data-Save" /> Save</a>
									<a className="dropdown-item ul-widget__link--font" href="/"><i className="i-Duplicate-Layer" /> Import</a>
									<div className="dropdown-divider"></div>
									<a className="dropdown-item ul-widget__link--font" href="/"><i className="i-Folder-Download" /> Update</a><a className="dropdown-item ul-widget__link--font" href="/"><i className="i-Gears-2" /> Customize</a>
								</div>
							</div>
							<div className="ul-widget-body">
								<div className="ul-widget3">
									<div className="ul-widget6__item--table">
										<table className="table">
											<thead>
												<tr className="ul-widget6__tr--sticky-th">
													<th scope="col">#</th>
													<th scope="col">Department</th>
													<th scope="col">Date</th>
													<th scope="col">Status</th>
													<th scope="col">Managed By</th>
													<th scope="col">Actions</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<th scope="row">
														<label className="checkbox checkbox-outline-info">
															<input type="checkbox" />
															<span className="checkmark"></span>
														</label>
													</th>
													<td>
														Administration
													</td>
													<td>11/28/2016</td>
													<td><span className="badge badge-pill badge-outline-danger p-2 m-1">Processing</span></td>
													<td><a className="ul-widget4__title d-block" href="">John Doe</a><span>Administrator </span></td>
													<td>
														<button className="btn bg-white _r_btn border-0" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="_dot _inline-dot bg-primary"></span><span className="_dot _inline-dot bg-primary"></span><span className="_dot _inline-dot bg-primary"></span></button>
														<div className="dropdown-menu" x-placement="bottom-start" style={{ position: 'absolute', transform: 'translate3d(0px, 33px, 0px)', top: 0, left: 0, willChange: 'transform' }}><a className="dropdown-item ul-widget__link--font" href="/"><i className="i-Bar-Chart-4"> </i> Export</a><a className="dropdown-item ul-widget__link--font" href="/"><i className="i-Data-Save"> </i> Save</a><a className="dropdown-item ul-widget__link--font" href="/"><i className="i-Duplicate-Layer" /> Import</a>
															<div className="dropdown-divider"></div><a className="dropdown-item ul-widget__link--font" href="/"><i className="i-Folder-Download" /> Update</a><a className="dropdown-item ul-widget__link--font" href="/"><i className="i-Gears-2" /> Customize</a>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<nav aria-label="Page navigation example">
										<ul className="pagination">
											<li className="page-item"><a className="page-link" href="/">Previous</a></li>
											<li className="page-item"><a className="page-link" href="/">1</a></li>
											<li className="page-item"><a className="page-link" href="/">2</a></li>
											<li className="page-item"><a className="page-link" href="/">3</a></li>
											<li className="page-item"><a className="page-link" href="/">Next</a></li>
										</ul>
									</nav>
								</div>
							</div>
						</CardBody>
					</Card>
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

export default Users;
