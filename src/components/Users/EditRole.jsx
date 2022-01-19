import React, { useState } from 'react';
import { CardBody, Col, Row } from 'reactstrap';
import moment from 'moment';
import useForm from "react-hook-form";
import 'react-datepicker/dist/react-datepicker.css';
import { UserService } from 'providers';


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
        permissions,
        id

    } = props;
    const [selectedUser, setSelectedUser] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [dateAssigned, setDateAssigned] = useState(new Date());
    const { register, handleSubmit, errors } = useForm();

    async function handleFindUser(val) {
        setSelectedUser(val);
    }


    const onSubmit = async (data) => {
        // setPageLoading(true)
        let permissionObject = {}
        Object.keys(permissions).map((key, index) => {
            permissionObject[key] = {
                'allow_access': data[permissions[key].title + '_allow_access'],
                childitems: [],
                title: permissions[key].title
            }

            permissions[key].childitems.map((child) => {

                permissionObject[key]['childitems'].push(
                    {
                        title: child.title,
                        read_access: data[permissions[key].title + child.title + '_read'],
                        create_access: data[permissions[key].title + child.title + '_create'],
                        delete_access: data[permissions[key].title + child.title + '_delete'],
                        update_access: data[permissions[key].title + child.title + '_update'],
                    }
                )
            })
        })

        let finalObject = {
            permissions: permissionObject,
            label: data.name,
            description: data.description,
            updated: Date.now(),
        }

        const res = await UserService.updateRoles(id, finalObject)
        console.log(res)
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
                <NavTabLink
                    id="users"
                    name="users"
                    title="Users"
                    setActiveTab={setActiveTab}
                    active={activeTab === 'users'}
                />
            </ul>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                        ref={register}
                                        defaultValue={(type) ? type : 'System'}
                                        onChange={e => console.log(e.target.value)}
                                    >
                                        <option value="System">System</option>
                                        <option value="Custom">Custom</option>
                                    </select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <label className="col-sm-2 col-form-label">
                                    Label
                                    <span className="text-danger">*</span>
                                </label>
                                <Col sm={10}>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        ref={register}
                                        required
                                        defaultValue={label ? label : ''}
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
                                        ref={register}
                                        required
                                        defaultValue={description ? description : ''}
                                    />
                                </Col>
                            </Row>
                        </NavTabContent>
                        <NavTabContent
                            id="permissions"
                            name="permissions"
                            title="Permissions"
                            active={activeTab === 'permissions'}
                        >

                            {permissions &&
                                <>
                                    {Object.keys(permissions).map((key, index) => {
                                        return <>
                                            <h4>{permissions[key].title}</h4>
                                            <p className="subtitle margin-bottom-20">
                                                Use this configurations below to define transactions permissions
                                            </p>
                                            <div className="d-flex">
                                                <div className="margin-right-30">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            id={permissions[key].title + '_allow_access'}
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            defaultChecked={permissions[key].allow_access}
                                                            name={permissions[key].title + '_allow_access'}
                                                            ref={register}

                                                        />
                                                        <label className="custom-control-label" htmlFor={permissions[key].title + '_allow_access'}>
                                                            Access {permissions[key].title} Module
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
                                                        {
                                                            permissions[key].childitems.map((child) => {
                                                                return <tr>
                                                                    <th scope="row">{child.title}</th>
                                                                    <td>
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input
                                                                                id={permissions[key].title + child.title + '_null_access'}
                                                                                type="checkbox"
                                                                                className="custom-control-input"
                                                                                name={permissions[key].title + child.title + '_null_access'}
                                                                                ref={register}
                                                                            />
                                                                            <label className="custom-control-label" htmlFor={permissions[key].title + child.title + '_null_access'}>
                                                                                &nbsp;
                                                                            </label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input
                                                                                id={permissions[key].title + child.title + '_create'}
                                                                                type="checkbox"
                                                                                className="custom-control-input"
                                                                                defaultChecked={child.create_access}
                                                                                name={permissions[key].title + child.title + '_create'}
                                                                                ref={register}
                                                                            />
                                                                            <label className="custom-control-label" htmlFor={permissions[key].title + child.title + '_create'}>
                                                                                &nbsp;
                                                                            </label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input
                                                                                id={permissions[key].title + child.title + '_read'}
                                                                                type="checkbox"
                                                                                className="custom-control-input"
                                                                                defaultChecked={child.read_access}
                                                                                name={permissions[key].title + child.title + '_read'}
                                                                                ref={register}
                                                                            />
                                                                            <label className="custom-control-label" htmlFor={permissions[key].title + child.title + '_read'}>
                                                                                &nbsp;
                                                                            </label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input
                                                                                id={permissions[key].title + child.title + '_update'}
                                                                                type="checkbox"
                                                                                className="custom-control-input"
                                                                                defaultChecked={child.update_access}
                                                                                name={permissions[key].title + child.title + '_update'}
                                                                                ref={register}
                                                                            />
                                                                            <label className="custom-control-label" htmlFor={permissions[key].title + child.title + '_update'}>
                                                                                &nbsp;
                                                                            </label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input
                                                                                id={permissions[key].title + child.title + '_delete'}
                                                                                type="checkbox"
                                                                                className="custom-control-input"
                                                                                defaultChecked={child.delete_access}
                                                                                name={permissions[key].title + child.title + '_delete'}
                                                                                ref={register}
                                                                            />
                                                                            <label className="custom-control-label" htmlFor={permissions[key].title + child.title + '_delete'}>
                                                                                &nbsp;
                                                                            </label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input
                                                                                id={permissions[key].title + child.title + '_full'}
                                                                                type="checkbox"
                                                                                className="custom-control-input"
                                                                                defaultChecked={child.access === 'full' ? true : false}
                                                                                name={permissions[key].title + child.title + '_full'}
                                                                                ref={register}
                                                                            />
                                                                            <label className="custom-control-label" htmlFor={permissions[key].title + child.title + '_full'}>
                                                                                &nbsp;
                                                                            </label>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="divider-text divider-text--xs margin-top-20 margin-bottom-20">
                                                &nbsp;
                                            </div>
                                        </>
                                    })}
                                </>

                            }
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
                <div className="text-right margin-bottom-20 mr-4">
                    <button className="btn btn-secondary">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}