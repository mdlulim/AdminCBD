import React, { useState } from 'react';
import { CardBody, Col, Row } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import moment from 'moment';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

export default function EditUser(props) {
    const {
        first_name,
        last_name,
        created,
        updated,
        updator,
        group,
        email,
        username,
        mobile,
        last_login,
        status,
        roles,
        group_id,
    } = props;
    const [activeTab, setActiveTab] = useState('overview');

    async function handleResendPassword() {
        return confirmAlert({
            title: 'Confirm Reset/Resend Password',
            message: <div>Are you sure you want to reset and resend password for <strong>{first_name} {last_name}</strong>?</div>,
            buttons: [
                {
                    label: 'Confirm and continue',
                    onClick: () => {
                        console.log(props)
                    }
                },
                {
                    label: 'Cancel',
                }
            ]
        });
    };

    return (
        <div>
            <ul className="nav nav-tabs margin-top-20" id="myTab" role="tablist">
                <NavTabLink
                    id="overview"
                    name="overview"
                    title="Overview"
                    setActiveTab={setActiveTab}
                    active={activeTab === 'overview'}
                />
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
                        id="overview"
                        name="overview"
                        title="Overview"
                        active={activeTab === 'overview'}
                    >
                        <Row>
                            <Col xs={12} sm={3}>
                                <p>
                                    <strong>First Name:</strong><br />
                                    <span className="text-muted">{first_name}</span>
                                </p>
                                <p className="margin-top-15">
                                    <strong>Last Name:</strong><br />
                                    <span className="text-muted">{last_name}</span>
                                </p>
                                <p className="margin-top-15">
                                    <strong>Role:</strong><br />
                                    <span className="text-muted">{group.label}</span>
                                </p>
                            </Col>
                            <Col xs={12} sm={3}>
                                <p>
                                    <strong>Email Address:</strong><br />
                                    <span className="text-muted">{email}</span>
                                </p>
                                <p className="margin-top-15">
                                    <strong>Contact Number:</strong><br />
                                    <span className="text-muted">{mobile || '-'}</span>
                                </p>
                                <p className="margin-top-15">
                                    <strong>Username:</strong><br />
                                    <span className="text-muted">{username}</span>
                                </p>
                            </Col>
                            <Col xs={12} sm={3}>
                                <p>
                                    <strong>Created Date:</strong><br />
                                    <span className="text-muted">
                                        {moment(created).format('DD MMM YYYY')}
                                        &nbsp;at&nbsp;
                                        {moment(created).format('hh:mm a')}
                                    </span>
                                </p>
                                <p className="margin-top-15">
                                    <strong>Updated Date:</strong><br />
                                    {updated ?
                                    <span className="text-muted">
                                        {moment(updated).format('DD MMM YYYY')}
                                        &nbsp;at&nbsp;
                                        {moment(updated).format('hh:mm a')}
                                    </span> : '-'}
                                </p>
                                <p className="margin-top-15">
                                    <strong>Last Login:</strong><br />
                                    {last_login ?
                                    <span className="text-muted">
                                        {moment(last_login).format('DD MMM YYYY')}
                                        &nbsp;at&nbsp;
                                        {moment(last_login).format('hh:mm a')}
                                    </span> : '-'}
                                </p>
                            </Col>
                            <Col xs={12} sm={3}>
                                <p>
                                    <strong>Status:</strong><br />
                                    <span className="text-muted">
                                        {status}
                                    </span>
                                </p>
                                <p>
                                    <strong>Created By:</strong><br />
                                    <span className="text-muted">
                                        -
                                    </span>
                                </p>
                                <p className="margin-top-15">
                                    <strong>Updated By:</strong><br />
                                    {updator ?
                                    <span className="text-muted">
                                        -
                                    </span> : '-'}
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="margin-top-20">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => handleResendPassword()}
                                >
                                    Reset &amp; Resend Password
                                    <i className="fa fa-send margin-right-10" />
                                </button>
                            </Col>
                        </Row>
                    </NavTabContent>
                    <NavTabContent
                        id="information"
                        name="information"
                        title="Information"
                        active={activeTab === 'information'}
                    >
                        <form>
                            <Row>
                                <Col xs={12} sm={8}>
                                    <Row className="form-group">
                                        <label className="col-sm-2 col-form-label">
                                            First Name
                                            <span className="text-danger">*</span>
                                        </label>
                                        <Col sm={10}>
                                            <input
                                                id="first_name"
                                                type="text"
                                                name="first_name"
                                                className="form-control"
                                                defaultValue={first_name}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <label className="col-sm-2 col-form-label">
                                            Last Name
                                            <span className="text-danger">*</span>
                                        </label>
                                        <Col sm={10}>
                                            <input
                                                id="last_name"
                                                type="text"
                                                name="last_name"
                                                className="form-control"
                                                defaultValue={last_name}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <label className="col-sm-2 col-form-label">
                                            Email Address
                                            <span className="text-danger">*</span>
                                        </label>
                                        <Col sm={10}>
                                            <input
                                                id="email"
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control"
                                                defaultValue={email}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <label className="col-sm-2 col-form-label">
                                            Username
                                            <span className="text-danger">*</span>
                                        </label>
                                        <Col sm={10}>
                                            <input
                                                id="username"
                                                type="text"
                                                id="username"
                                                name="username"
                                                className="form-control"
                                                defaultValue={username}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <label className="col-sm-2 col-form-label">
                                            Contact Number
                                        </label>
                                        <Col sm={10}>
                                            <input
                                                id="mobile"
                                                type="text"
                                                id="mobile"
                                                name="mobile"
                                                className="form-control"
                                                defaultValue={mobile}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <label className="col-sm-2 col-form-label">
                                            Status
                                            <span className="text-danger">*</span>
                                        </label>
                                        <Col sm={10}>
                                            <select
                                                id="type"
                                                type="text"
                                                name="type"
                                                className="form-control"
                                                defaultValue={status}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Active">Active</option>
                                                <option value="Archived">Archived</option>
                                                <option value="Bloacked">Bloacked</option>
                                            </select>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <div className="divider-text divider-text--xs margin-top-20 margin-bottom-20">
                                &nbsp;
                            </div>
                            <h4>Role Management</h4>
                            <p className="subtitle margin-bottom-15">
                                Make changes to the user role, by selecting role from the dropdown below
                            </p>
                            <Row>
                                <Col xs={12} sm={3}>
                                    <label className="col-form-label">
                                        Role
                                        <span className="text-danger">*</span>
                                    </label>
                                    <div className="form-group">
                                        <select
                                            id="group_id"
                                            type="text"
                                            name="group_id"
                                            className="form-control"
                                            defaultValue={group_id}
                                        >
                                            {roles.map(item => (
                                                <option key={item.id} value={item.id}>
                                                    {item.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </Col>
                                <Col xs={12} sm={3}>
                                    <label className="col-form-label">
                                        Date Assigned
                                    </label>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue="12 Jan 2022 10:00am"
                                            disabled
                                        />
                                    </div>
                                </Col>
                                <Col xs={12} sm={3}>
                                    <label className="col-form-label">
                                        Role Assigned By
                                    </label>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            defaultValue="Administrator"
                                            disabled
                                        />
                                    </div>
                                </Col>
                                <Col xs={12} sm={3}>
                                    <label className="col-form-label">
                                        &nbsp;
                                    </label>
                                    <div className="form-group">
                                        <a
                                            href={`/users/roles/${group_id}`}
                                            className="btn btn-outline-primary"
                                        >
                                            <i className="fa fa-eye fa-2x" />
                                        </a>
                                    </div>
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