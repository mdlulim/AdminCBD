import React, { useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Layout } from 'containers';
import { Agents, HashLinkContainer } from 'components';

export default function AgentsOverview(props) {
    const breadcrumb = { heading: 'Manage Agents' };
    const [itemDropdownActive, setItemDropdownActive] = useState(null);
	return (
		<Layout {...props} breadcrumb={breadcrumb}>
            <Row className="mb-4">
                <Col xs={12} lg={3} sm={12}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" htmlFor="filter">Filter</label>
                            <select className="custom-select col-sm-12" id="filter">
                                <option value="All">All</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </Col>
                <Col xs={12} lg={4} sm={12} className="d-flex align-items-center">
                    <div className="defect-search-bar">
                        <input type="text" placeholder="Search" />
                        <i className="search-icon text-muted i-Magnifi-Glass1" />
                    </div>
                </Col>
                <Col xs={12} lg={5} sm={12} className="d-flex flex-column flex-sm-row align-items-center">
                    <span className="m-auto" />
                    <label>Action:</label>
                    <div className="btn-group col-lg-6 col-sm-12 pl-sm-3" role="group">
                        <HashLinkContainer to="/leads/add">
                            <button className="btn btn-secondary" id="prev-btn" type="button">Add Agent</button>
                        </HashLinkContainer>
                        <button className="btn btn-secondary" id="next-btn" type="button">Download CSV</button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={12}>
                    <div className="ul-widget5">
                        <Agents.Item
                            {...{ id: '1' }}
                            dropdownActive={itemDropdownActive}
                            setDropdownActive={setItemDropdownActive}
                        />
                        <Agents.Item
                            {...{ id: '2' }}
                            dropdownActive={itemDropdownActive}
                            setDropdownActive={setItemDropdownActive}
                        />
                        <Agents.Item
                            {...{ id: '3' }}
                            dropdownActive={itemDropdownActive}
                            setDropdownActive={setItemDropdownActive}
                        />
                    </div>
                </Col>
            </Row>
        </Layout>
    );
}
