import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';

export default function AddProperty(props) {
    const breadcrumb = { heading: "Add Property" };
    return (
        <Layout {...props} breadcrumb={breadcrumb}>
            {/* <Row className="mb-4">
                <Col xs={12} lg={6} sm={12}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="filter">Account</label>
                            <select className="custom-select col-sm-12" id="filter">
                                <option value="AZ Properties">AZ Properties</option>
                            </select>
                        </div>
                    </div>
                </Col>
                <Col xs={12} lg={6} sm={12} className="d-flex flex-column flex-sm-row align-items-center">
                    <span className="m-auto" />
                    <label>Actions:</label>
                    <div className="btn-group col-lg-6 col-sm-12 pl-sm-3" role="group">
                        <button className="btn btn-secondary" id="prev-btn" type="button">Import</button>
                        <button className="btn btn-secondary" id="next-btn" type="button">CSV</button>
                        <button className="btn btn-danger" id="reset-btn" type="button">Reset</button>
                    </div>
                </Col>
            </Row> */}
            <Row>
                <Col md={12}>
                    <div id="smartwizard" className="sw-main sw-theme-dots">
                        <ul className="nav nav-tabs step-anchor">
                            <li className="nav-item active"><a href="#step-1" className="nav-link">Step 1<br /><small>Property Information</small></a></li>
                            <li className="nav-item"><a href="#step-2" className="nav-link">Step 2<br /><small>Market Information</small></a></li>
                            <li className="nav-item"><a href="#step-3" className="nav-link">Step 3<br /><small>Property Images</small></a></li>
                            <li className="nav-item"><a href="#step-4" className="nav-link">Step 4<br /><small>Agent Information</small></a></li>
                        </ul>
                        <div className="sw-container tab-content">
                            <div id="step-1" className="tab-pane step-content" style={{ display: 'block' }}>
                                {/* <h3 className="border-bottom border-gray pb-2">Step 1 Content</h3>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a
                                type specimen book. It has survived not only five centuries, but also the
                                leap into electronic typesetting, remaining essentially unchanged. It was
                                popularised in the 1960s with the release of Letraset sheets containing
                                Lorem Ipsum passages, and more recently with desktop publishing software
                                like Aldus PageMaker including versions of Lorem Ipsum. */}
                                <h4>Property Information</h4>
                                <p>
                                    Please use the form below to specify property information. Make sure all
                                    required (<span className="text-danger">*</span>) fields are completed
                                    accordingly.
                                </p>
                                <Row className="row row-xs">
                                    <Col md={4} className="form-group">
                                        <label>Title<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </Col>
                                    <Col md={4} className="form-group mt-3 mt-md-0">
                                        <label>Property Type<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </Col>
                                    <Col md={4} className="form-group mt-3 mt-md-0">
                                        <label>Mandate Type<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </Col>
                                    <Col md={4} className="form-group">
                                        <label>Branch<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </Col>
                                    <Col md={4} className="form-group mt-3 mt-md-0">
                                        <label>Ownership Type<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </Col>
                                    <Col md={4} className="form-group mt-3 mt-md-0">
                                        <label>Description<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                            </div>
                            <div id="step-2" className="tab-pane step-content" style={{ display: 'none' }}>
                                <h3 className="border-bottom border-gray pb-2">Step 2 Content</h3>
                                <div>Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy text
                                    ever since the 1500s, when an unknown printer took a galley of type
                                    and scrambled it to make a type specimen book. It has survived not
                                    only five centuries, but also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was popularised in the 1960s
                                    with the release of Letraset sheets containing Lorem Ipsum passages,
                                    and more recently with desktop publishing software like Aldus
                                    PageMaker including versions of Lorem Ipsum.
                                </div>
                            </div>
                            <div id="step-3" className="tab-pane step-content" style={{ display: 'none' }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the
                                1500s, when an unknown printer took a galley of type and scrambled it to
                                make a type specimen book. It has survived not only five centuries, but
                                also the leap into electronic typesetting, remaining essentially
                                unchanged. It was popularised in the 1960s with the release of Letraset
                                sheets containing Lorem Ipsum passages, and more recently with desktop
                                publishing software like Aldus PageMaker including versions of Lorem
                                Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy text ever
                                since the 1500s, when an unknown printer took a galley of type and
                                scrambled it to make a type specimen book. It has survived not only
                                five centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was popularised in the 1960s with
                                the release of Letraset sheets containing Lorem Ipsum passages, and
                                more recently with desktop publishing software like Aldus PageMaker
                                including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of
                                the printing and typesetting industry. Lorem Ipsum has been the industry's
                                standard dummy text ever since the 1500s, when an unknown printer took
                                a galley of type and scrambled it to make a type specimen book. It has
                                survived not only five centuries, but also the leap into electronic
                                typesetting, remaining essentially unchanged. It was popularised in the
                                1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing software like Aldus PageMaker
                                including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of
                                the printing and typesetting industry. Lorem Ipsum has been the industry's
                                standard dummy text ever since the 1500s, when an unknown printer took a
                                galley of type and scrambled it to make a type specimen book.
                            </div>
                            <div id="step-4" className="tab-pane step-content" style={{ display: 'none' }}>
                                <h3 className="border-bottom border-gray pb-2">Step 4 Content</h3>
                                <div className="card o-hidden">
                                    <div className="card-header">My Details</div>
                                    <div className="card-block p-0">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <th>Name:</th>
                                                    <td>Tim Smith</td>
                                                </tr>
                                                <tr>
                                                    <th>Email:</th>
                                                    <td>example@example.com</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btn-toolbar sw-toolbar sw-toolbar-bottom justify-content-end">
                            <div className="btn-group mr-2 sw-btn-group" role="group">
                                <button className="btn btn-secondary sw-btn-prev disabled" type="button">Previous</button>
                                <button className="btn btn-secondary sw-btn-next" type="button">Next</button>
                            </div>
                            {/* <div className="btn-group mr-2 sw-btn-group-extra" role="group">
                                <button className="btn btn-info">Finish</button>
                                <button className="btn btn-danger">Cancel</button>
                            </div> */}
                        </div>
                    </div>
                </Col>
            </Row>
        </Layout>
    );
}
