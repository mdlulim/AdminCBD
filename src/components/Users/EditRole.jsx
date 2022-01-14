import React, { useState } from 'react';
import { CardBody, Col, Row } from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

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

export default function EditRole(props) {
    const {
        type,
        label,
        created,
        updated,
        creator,
        updator,
        description,
    } = props;
    const [selectedUser, setSelectedUser] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [dateAssigned, setDateAssigned] = useState(new Date());

    async function handleFindUser(val) {
        setSelectedUser(val);
    }

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
                <NavTabLink
                    id="users"
                    name="users"
                    title="Users"
                    setActiveTab={setActiveTab}
                    active={activeTab === 'users'}
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
                            <Col xs={12} sm={4}>
                                <p>
                                    <strong>Name:</strong><br />
                                    <span className="text-muted">{label}</span>
                                </p>
                                <p className="margin-top-15">
                                    <strong>Role Type:</strong><br />
                                    <span className="text-muted">{type}</span>
                                </p>
                            </Col>
                            <Col xs={12} sm={4}>
                                <p>
                                    <strong>Created Date:</strong><br />
                                    <span className="text-muted">{moment(created).format('DD MMM YYYY')}</span>
                                </p>
                                <p className="margin-top-15">
                                    <strong>Updated Date:</strong><br />
                                    {updated ?
                                    <span className="text-muted">
                                        {moment(updated).format('DD MMM YYYY')}
                                    </span> : '-'}
                                </p>
                            </Col>
                            <Col xs={12} sm={4}>
                                <p>
                                    <strong>Created By:</strong><br />
                                    <span className="text-muted">
                                        {creator.first_name} {creator.last_name}
                                    </span>
                                </p>
                                <p className="margin-top-15">
                                    <strong>Updated By:</strong><br />
                                    {updator ?
                                    <span className="text-muted">
                                        {updator.first_name} {updator.last_name}
                                    </span> : '-'}
                                </p>
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
                            <input
                                type="hidden"
                                name="channel"
                                defaultValue="admin"
                            />
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
                                        defaultValue="System"
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
                                        id="label"
                                        type="text"
                                        name="label"
                                        className="form-control"
                                        defaultValue={label}
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
                                        defaultValue={description}
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
                    <NavTabContent
                        id="users"
                        name="users"
                        title="Users"
                        active={activeTab === 'users'}
                    >
                        <div className="margin-bottom-20">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Username<span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        id="_suburb"
                                        name="_suburb"
                                        className="form-control"
                                        onChange={e => handleFindUser(e.target.value)}
                                        placeholder="Enter 4 or more characters"
                                        value={selectedUser}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Date assigned</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Select date"
                                            aria-label="Select date"
                                            aria-describedby="date_assigned"
                                        />
                                        <div className="input-group-append" id="date_assigned">
                                            <span className="input-group-text">
                                                <i className="fa fa-calendar" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button 
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    disabled
                                >
                                    Assign to role
                                </button>
                            </div>
                        </div>
                        <div className="divider divider--sm" />
                        <div className="table-responsive">
                            <table className="table margin-bottom-0">
                                <thead>
                                    <tr>
                                        <th scope="col" width="30">
                                            <label className="custom-control custom-checkbox">
                                                <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                />
                                                <span className="custom-control-label" />
                                            </label>
                                        </th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email/Username</th>
                                        <th scope="col">Date Assigned</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label className="custom-control custom-checkbox">
                                                <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                />
                                                <span className="custom-control-label" />
                                            </label>
                                        </td>
                                        <th scope="row">Thembinkosi Klein</th>
                                        <td>thembinkosi@cbiglobal.io</td>
                                        <td>22 November 2021</td>
                                        <td width="40">
                                            <button className="btn btn-outline-danger btn-sm btn-icon">
                                                <span className="fa fa-trash-o" />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </NavTabContent>
                </div>
            </CardBody>
        </div>
    );
}