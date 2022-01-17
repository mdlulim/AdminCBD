import React, { useState } from 'react';
import { CardBody, Col, Row } from 'reactstrap';

const NavTabLink = ({
    id,
    name,
    title,
    active,
    setActiveTab,
}) => (
    <li className="nav-item">
        <a
            role="tab"
            id={`tab-${id}`}
            data-toggle="tab"
            href={`#tab-${id}`}
            aria-controls={name}
            aria-selected={active}
            className={`nav-link text-bold ${active ? 'active show' : ''}`}
            onClick={e => {
                setActiveTab(id);
                e.preventDefault();
            }}
        >
            {title}
        </a>
    </li>
);

const NavTabContent = props => {
    const { active } = props;
    return (
        <div className={`tab-pane fade ${active ? 'active show' : ''}`}>
            {props.children}
        </div>
    );
}

export default function AddRole(props) {
    const {
        roles,
        parent,
        handleParentChange,
    } = props;
    const [activeTab, setActiveTab] = useState('information');

    return (
        <div>
            <ul className="nav nav-tabs margin-top-20" id="myTab" role="tablist">
                <NavTabLink
                    id="information"
                    name="information"
                    title="Information"
                    setActiveTab={setActiveTab}
                    active={activeTab === 'information'}
                />
                <NavTabLink
                    id="permissions"
                    name="permissions"
                    title="Permissions"
                    setActiveTab={setActiveTab}
                    active={activeTab === 'permissions'}
                />
            </ul>
            <CardBody>
                <div className="tab-content" id="overview">
                    <NavTabContent
                        id="information"
                        name="information"
                        title="Information"
                        active={activeTab === 'information'}
                    >
                        <form>
                            <input
                                type="hidden"
                                name="channel"
                                defaultValue="admin"
                            />
                            <Row className="form-group">
                                <label className="col-sm-2 col-form-label">
                                    Parent Role
                                </label>
                                <Col sm={10}>
                                    <select
                                        id="parent_id"
                                        type="text"
                                        name="parent_id"
                                        className="form-control"
                                        defaultValue={(parent && parent.id) ? parent.id : 'System'}
                                    >
                                        <option value="">Select Parent Role</option>
                                        {roles.map(item => (
                                            <option value={item.id}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <label className="col-sm-2 col-form-label">
                                    Type
                                    <span className="text-danger">*</span>
                                </label>
                                <Col sm={10}>
                                    <select
                                        id="type"
                                        type="text"
                                        name="type"
                                        className="form-control"
                                        value={(parent && parent.type) ? parent.type : 'System'}
                                        onChange={e => console.log(e.target.value)}
                                    >
                                        <option value="System">System</option>
                                        <option value="Custom">Custom</option>
                                    </select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <label className="col-sm-2 col-form-label">
                                    Name
                                    <span className="text-danger">*</span>
                                </label>
                                <Col sm={10}>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <label className="col-sm-2 col-form-label">
                                    Description
                                    <span className="text-danger">*</span>
                                </label>
                                <Col sm={10}>
                                    <input
                                        type="text"
                                        id="description"
                                        name="description"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                        </form>
                    </NavTabContent>
                    <NavTabContent
                        id="permissions"
                        name="permissions"
                        title="Permissions"
                        active={activeTab === 'permissions'}
                    >
                        <h4>Transactions</h4>
                        <p className="subtitle margin-bottom-20">
                            Use this configurations below to define transactions permissions
                        </p>
                        <div className="d-flex">
                            <div className="margin-right-30">
                                <div className="custom-control custom-checkbox">
                                    <input
                                        id="perm1"
                                        type="checkbox"
                                        className="custom-control-input"
                                        defaultChecked
                                    />
                                    <label className="custom-control-label" htmlFor="perm1">
                                        Access Transactions Module
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table margin-bottom-0">
                                <thead>
                                    <tr>
                                        <th scope="col">&nbsp;</th>
                                        <th scope="col" width="12%">None</th>
                                        <th scope="col" width="12%">Create</th>
                                        <th scope="col" width="12%">Read</th>
                                        <th scope="col" width="12%">Update</th>
                                        <th scope="col" width="12%">Delete</th>
                                        <th scope="col" width="12%">All</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Deposits</th>
                                        <td>
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    id="opt1"
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                />
                                                <label className="custom-control-label" htmlFor="opt1">
                                                    &nbsp;
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    id="opt2"
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    defaultChecked
                                                />
                                                <label className="custom-control-label" htmlFor="opt2">
                                                    &nbsp;
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    id="opt3"
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    defaultChecked
                                                />
                                                <label className="custom-control-label" htmlFor="opt3">
                                                    &nbsp;
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    id="opt4"
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    defaultChecked
                                                />
                                                <label className="custom-control-label" htmlFor="opt4">
                                                    &nbsp;
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    id="opt5"
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    defaultChecked
                                                />
                                                <label className="custom-control-label" htmlFor="opt5">
                                                    &nbsp;
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    id="opt6"
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    defaultChecked
                                                />
                                                <label className="custom-control-label" htmlFor="opt6">
                                                    &nbsp;
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Withdrawals</th>
                                        <td>
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    id="opt11"
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    defaultChecked
                                                />
                                                <label className="custom-control-label" htmlFor="opt11">
                                                    &nbsp;
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    id="opt21"
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                />
                                                <label className="custom-control-label" htmlFor="opt21">
                                                    &nbsp;
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    id="opt31"
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                />
                                                <label className="custom-control-label" htmlFor="opt31">
                                                    &nbsp;
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    id="opt41"
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                />
                                                <label className="custom-control-label" htmlFor="opt41">
                                                    &nbsp;
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    id="opt51"
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                />
                                                <label className="custom-control-label" htmlFor="opt51">
                                                    &nbsp;
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    id="opt61"
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                />
                                                <label className="custom-control-label" htmlFor="opt61">
                                                    &nbsp;
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Transfers</th>
                                        <td>
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    id="opt111"
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    defaultChecked
                                                />
                                                <label className="custom-control-label" htmlFor="opt111">
                                                    &nbsp;
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    id="opt211"
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                />
                                                <label className="custom-control-label" htmlFor="opt211">
                                                    &nbsp;
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    id="opt311"
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                />
                                                <label className="custom-control-label" htmlFor="opt311">
                                                    &nbsp;
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    id="opt411"
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                />
                                                <label className="custom-control-label" htmlFor="opt411">
                                                    &nbsp;
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    id="opt511"
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                />
                                                <label className="custom-control-label" htmlFor="opt511">
                                                    &nbsp;
                                                </label>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    id="opt611"
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                />
                                                <label className="custom-control-label" htmlFor="opt611">
                                                    &nbsp;
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="divider-text divider-text--xs margin-top-20 margin-bottom-20">
                            &nbsp;
                        </div>
                        <h4 className="margin-top-20">Reports</h4>
                        <p className="subtitle margin-bottom-20">
                            Use this configurations below to define reports permissions
                        </p>
                        <div className="d-flex">
                            <div className="margin-right-30">
                                <div className="custom-control custom-checkbox">
                                    <input
                                        id="perm11"
                                        type="checkbox"
                                        className="custom-control-input"
                                        defaultChecked
                                    />
                                    <label className="custom-control-label" htmlFor="perm11">
                                        Run Transaction Reports
                                    </label>
                                </div>
                            </div>
                            <div className="margin-right-30">
                                <div className="custom-control custom-checkbox">
                                    <input
                                        id="perm21"
                                        type="checkbox"
                                        className="custom-control-input"
                                        defaultChecked
                                    />
                                    <label className="custom-control-label" htmlFor="perm21">
                                        Run Member Reports
                                    </label>
                                </div>
                            </div>
                            <div className="margin-right-30">
                                <div className="custom-control custom-checkbox">
                                    <input
                                        id="perm31"
                                        type="checkbox"
                                        className="custom-control-input"
                                        defaultChecked
                                    />
                                    <label className="custom-control-label" htmlFor="perm31">
                                        Run Product Reports
                                    </label>
                                </div>
                            </div>
                            <div>
                                <div className="custom-control custom-checkbox">
                                    <input
                                        id="perm41"
                                        type="checkbox"
                                        className="custom-control-input"
                                        defaultChecked
                                    />
                                    <label className="custom-control-label" htmlFor="perm41">
                                        Run Management Reports
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="divider-text divider-text--xs margin-top-20 margin-bottom-20">
                            &nbsp;
                        </div>
                        <h4 className="margin-top-20">Self-Admin</h4>
                        <p className="subtitle margin-bottom-20">
                            Use this configurations below to define self-admin permissions
                        </p>
                        <div className="d-flex">
                            <div className="margin-right-30">
                                <div className="custom-control custom-checkbox">
                                    <input
                                        id="perm111"
                                        type="checkbox"
                                        className="custom-control-input"
                                        defaultChecked
                                    />
                                    <label className="custom-control-label" htmlFor="perm111">
                                        Access the Self-Admin Module
                                    </label>
                                </div>
                            </div>
                            <div className="margin-right-30">
                                <div className="custom-control custom-checkbox">
                                    <input
                                        id="perm211"
                                        type="checkbox"
                                        className="custom-control-input"
                                        defaultChecked
                                    />
                                    <label className="custom-control-label" htmlFor="perm211">
                                        Archive rows/entities
                                    </label>
                                </div>
                            </div>
                            <div className="margin-right-30">
                                <div className="custom-control custom-checkbox">
                                    <input
                                        id="perm311"
                                        type="checkbox"
                                        className="custom-control-input"
                                        defaultChecked
                                    />
                                    <label className="custom-control-label" htmlFor="perm311">
                                        Delete activities and notes
                                    </label>
                                </div>
                            </div>
                        </div>
                    </NavTabContent>
                </div>
            </CardBody>
        </div>
    );
}