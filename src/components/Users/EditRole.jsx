import React, { useState, useEffect } from 'react';
import { CardBody, Col, Row } from 'reactstrap';
import moment from 'moment';
import useForm from "react-hook-form";
import Select from 'react-select';
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
        id,
        setPageLoading

    } = props;
    const [selectedUser, setSelectedUser] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [dateAssigned, setDateAssigned] = useState(new Date());
    const { register, handleSubmit, errors } = useForm();
    const [users, setUsers] = useState({});
    const [roleUsers, setRoleUsers] = useState([]);
    const [userOptions, setUserOptions] = useState([])


    const handleFindUser = filterText => {
        const filteredItem = users.filter(item => (
            (item && item.email && item.email.toLowerCase().includes(filterText.toLowerCase()))
        ));
        setSelectedUser(filteredItem);
    }

    function onCheckChange(value) {
        console.log(value, ' _____________')
    }

    const removeUser = async (id) => {
        console.log(id)
        const res = await UserService.updateAdminUser(id, { group_id: '903824d6-740f-4220-9e10-49bd805ad1be', permissions: null})
        console.log(res)
    }


    const onSubmit = async (data) => {
        setPageLoading(true)
        let permissionObject = {}
        Object.keys(permissions).map((key, index) => {
            permissionObject[key] = {
                allow_access: data[permissions[key].title + '_allow_access'],
                childitems: {},
                title: permissions[key].title,
                id: permissions[key].id,
                icon: permissions[key].icon,
                link: permissions[key].link,
                parent: permissions[key].parent,
                description: permissions[key].description,
                type: permissions[key].type
            }
            if (permissions[key].type === 'crud') {

                if (permissions[key].childitems) {
                    Object.keys(permissions[key].childitems).map((child_key, index) => {
                        permissionObject[key]['childitems'][child_key] =
                        {
                            title: permissions[key].childitems[child_key].title,
                            read_access: data[permissions[key].title + permissions[key].childitems[child_key].title + '_read'],
                            create_access: data[permissions[key].title + permissions[key].childitems[child_key].title + '_create'],
                            delete_access: data[permissions[key].title + permissions[key].childitems[child_key].title + '_delete'],
                            update_access: data[permissions[key].title + permissions[key].childitems[child_key].title + '_update'],
                            access: data[permissions[key].title + permissions[key].childitems[child_key].title + '_full'] ? 'full' : 'partial',
                            id: permissions[key].childitems[child_key].id,
                            icon: permissions[key].childitems[child_key].icon,
                            link: permissions[key].childitems[child_key].link
                        }

                    })
                } else {
                    permissionObject[key] = {
                        ...permissionObject[key],
                        read_access: data[permissions[key].title + '_read'],
                        create_access: data[permissions[key].title + '_create'],
                        delete_access: data[permissions[key].title + '_delete'],
                        update_access: data[permissions[key].title + '_update'],
                        access: data[permissions[key].title + '_full'] ? 'full' : 'partial',
                        id: permissions[key].id,
                        icon: permissions[key].icon,
                        link: permissions[key].link,
                        parent: permissions[key].parent,
                        description: permissions[key].description,
                        type: permissions[key].type
                    }
                    delete permissionObject[key].childitems
                }
            } else {
                Object.keys(permissions[key].childitems).map((child_key, index) => {
                    permissionObject[key]['childitems'][child_key] =
                    {
                        title: permissions[key].childitems[child_key].title,
                        allow_access: data[permissions[key].title + permissions[key].childitems[child_key].title + '_allow_access'],
                        id: permissions[key].childitems[child_key].id,
                        icon: permissions[key].childitems[child_key].icon,
                        link: permissions[key].childitems[child_key].link,
                    }
                })
            }
        })

        let finalObject = {
            permissions: permissionObject,
            label: data.name,
            description: data.description,
            updated: Date.now(),
        }

        // console.log(finalObject)
        // console.log(permissions)
        const res = await UserService.updateRoles(id, finalObject)
        console.log(res)
    };

    const fetch = async () => {
        const users = await UserService.getUsers();
        const roleUsers = await UserService.getUsersByRole(id)

        if (roleUsers.data.success) {
            setRoleUsers(roleUsers.data.data.results)
        }

        console.log(roleUsers, ' ===================')
        const options = users.results.map((option => {
            return { value: option.email, label: option.email }
        }))
        setUserOptions(options)
        setUsers(users.results)
    }
    useEffect(() => {
        fetch()

    }, [])

    const assignRole = async () => {
        const res = await UserService.updateAdminUser(selectedUser[0].id, { group_id: id, permissions })
        // console.log(selectedUser[0].id, ' yyyyyyyyyyyyyy ', id, '------------',permissions)
        console.log(res)

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
                            <div className="text-right margin-bottom-20">
                                <button className="btn btn-secondary">
                                    Save Changes
                                </button>
                            </div>
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
                                                            onChange={e => console.log(e.target.value)}

                                                        />
                                                        <label className="custom-control-label" htmlFor={permissions[key].title + '_allow_access'}>
                                                            Access {permissions[key].title} Module
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {permissions[key].type === 'crud' ?
                                                <>
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
                                                                {permissions[key].childitems ?
                                                                    Object.keys(permissions[key].childitems).map((child_key, index) => {
                                                                        return <tr>
                                                                            <th scope="row">{permissions[key].childitems[child_key].title}</th>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input
                                                                                        id={permissions[key].title + permissions[key].childitems[child_key].title + '_null_access'}
                                                                                        type="checkbox"
                                                                                        className="custom-control-input"
                                                                                        name={permissions[key].title + permissions[key].childitems[child_key].title + '_null_access'}
                                                                                        ref={register}
                                                                                        onChange={() => { permissions[key].childitems[child_key].create_access = false }}
                                                                                        defaultChecked={
                                                                                            !permissions[key].childitems[child_key].create_access &&
                                                                                                !permissions[key].childitems[child_key].read_access &&
                                                                                                !permissions[key].childitems[child_key].update_access &&
                                                                                                !permissions[key].childitems[child_key].delete_access ? true : false
                                                                                        }
                                                                                    />
                                                                                    <label className="custom-control-label" htmlFor={permissions[key].title + permissions[key].childitems[child_key].title + '_null_access'}>
                                                                                        &nbsp;
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input
                                                                                        id={permissions[key].title + permissions[key].childitems[child_key].title + '_create'}
                                                                                        type="checkbox"
                                                                                        className="custom-control-input"
                                                                                        defaultChecked={permissions[key].childitems[child_key].create_access}
                                                                                        name={permissions[key].title + permissions[key].childitems[child_key].title + '_create'}
                                                                                        ref={register}
                                                                                    />
                                                                                    <label className="custom-control-label" htmlFor={permissions[key].title + permissions[key].childitems[child_key].title + '_create'}>
                                                                                        &nbsp;
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input
                                                                                        id={permissions[key].title + permissions[key].childitems[child_key].title + '_read'}
                                                                                        type="checkbox"
                                                                                        className="custom-control-input"
                                                                                        defaultChecked={permissions[key].childitems[child_key].read_access}
                                                                                        name={permissions[key].title + permissions[key].childitems[child_key].title + '_read'}
                                                                                        ref={register}
                                                                                    />
                                                                                    <label className="custom-control-label" htmlFor={permissions[key].title + permissions[key].childitems[child_key].title + '_read'}>
                                                                                        &nbsp;
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input
                                                                                        id={permissions[key].title + permissions[key].childitems[child_key].title + '_update'}
                                                                                        type="checkbox"
                                                                                        className="custom-control-input"
                                                                                        defaultChecked={permissions[key].childitems[child_key].update_access}
                                                                                        name={permissions[key].title + permissions[key].childitems[child_key].title + '_update'}
                                                                                        ref={register}
                                                                                    />
                                                                                    <label className="custom-control-label" htmlFor={permissions[key].title + permissions[key].childitems[child_key].title + '_update'}>
                                                                                        &nbsp;
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input
                                                                                        id={permissions[key].title + permissions[key].childitems[child_key].title + '_delete'}
                                                                                        type="checkbox"
                                                                                        className="custom-control-input"
                                                                                        defaultChecked={permissions[key].childitems[child_key].delete_access}
                                                                                        name={permissions[key].title + permissions[key].childitems[child_key].title + '_delete'}
                                                                                        ref={register}
                                                                                    />
                                                                                    <label className="custom-control-label" htmlFor={permissions[key].title + permissions[key].childitems[child_key].title + '_delete'}>
                                                                                        &nbsp;
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input
                                                                                        id={permissions[key].title + permissions[key].childitems[child_key].title + '_full'}
                                                                                        type="checkbox"
                                                                                        className="custom-control-input"
                                                                                        defaultChecked={
                                                                                            permissions[key].childitems[child_key].create_access &&
                                                                                                permissions[key].childitems[child_key].read_access &&
                                                                                                permissions[key].childitems[child_key].update_access &&
                                                                                                permissions[key].childitems[child_key].delete_access ? true : false
                                                                                        }
                                                                                        name={permissions[key].title + permissions[key].childitems[child_key].title + '_full'}
                                                                                        ref={register}
                                                                                    />
                                                                                    <label className="custom-control-label" htmlFor={permissions[key].title + permissions[key].childitems[child_key].title + '_full'}>
                                                                                        &nbsp;
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    })
                                                                    :
                                                                    <tr>
                                                                        <td></td>
                                                                        <td>
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input
                                                                                    id={permissions[key].title + '_null_access'}
                                                                                    type="checkbox"
                                                                                    className="custom-control-input"
                                                                                    name={permissions[key].title + '_null_access'}
                                                                                    ref={register}
                                                                                    defaultChecked={
                                                                                        !permissions[key].create_access &&
                                                                                            !permissions[key].read_access &&
                                                                                            !permissions[key].update_access &&
                                                                                            !permissions[key].delete_access ? true : false
                                                                                    }
                                                                                />
                                                                                <label className="custom-control-label" htmlFor={permissions[key].title + '_null_access'}>
                                                                                    &nbsp;
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input
                                                                                    id={permissions[key].title + '_create'}
                                                                                    type="checkbox"
                                                                                    className="custom-control-input"
                                                                                    defaultChecked={permissions[key].create_access}
                                                                                    name={permissions[key].title + '_create'}
                                                                                    ref={register}
                                                                                />
                                                                                <label className="custom-control-label" htmlFor={permissions[key].title + '_create'}>
                                                                                    &nbsp;
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input
                                                                                    id={permissions[key].title + '_read'}
                                                                                    type="checkbox"
                                                                                    className="custom-control-input"
                                                                                    defaultChecked={permissions[key].read_access}
                                                                                    name={permissions[key].title + '_read'}
                                                                                    ref={register}
                                                                                />
                                                                                <label className="custom-control-label" htmlFor={permissions[key].title + '_read'}>
                                                                                    &nbsp;
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input
                                                                                    id={permissions[key].title + '_update'}
                                                                                    type="checkbox"
                                                                                    className="custom-control-input"
                                                                                    defaultChecked={permissions[key].update_access}
                                                                                    name={permissions[key].title + '_update'}
                                                                                    ref={register}
                                                                                />
                                                                                <label className="custom-control-label" htmlFor={permissions[key].title + '_update'}>
                                                                                    &nbsp;
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input
                                                                                    id={permissions[key].title + '_delete'}
                                                                                    type="checkbox"
                                                                                    className="custom-control-input"
                                                                                    defaultChecked={permissions[key].delete_access}
                                                                                    name={permissions[key].title + '_delete'}
                                                                                    ref={register}
                                                                                />
                                                                                <label className="custom-control-label" htmlFor={permissions[key].title + '_delete'}>
                                                                                    &nbsp;
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input
                                                                                    id={permissions[key].title + '_full'}
                                                                                    type="checkbox"
                                                                                    className="custom-control-input"
                                                                                    defaultChecked={
                                                                                        permissions[key].create_access &&
                                                                                            permissions[key].read_access &&
                                                                                            permissions[key].update_access &&
                                                                                            permissions[key].delete_access ? true : false
                                                                                    }
                                                                                    name={permissions[key].title + '_full'}
                                                                                    ref={register}
                                                                                />
                                                                                <label className="custom-control-label" htmlFor={permissions[key].title + '_full'}>
                                                                                    &nbsp;
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                    </tr>

                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="divider-text divider-text--xs margin-top-20 margin-bottom-20">
                                                        &nbsp;
                                                    </div>
                                                </>

                                                :
                                                <div>
                                                    <div style={{ display: 'flex' }}>
                                                        {Object.keys(permissions[key].childitems).map((child_key, index) => {
                                                            // {permissions[key].childitems[child_key].map((child) => {
                                                            return <>
                                                                <div className="margin-right-30">
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input
                                                                            id={permissions[key].title + permissions[key].childitems[child_key].title + '_allow_access'}
                                                                            type="checkbox"
                                                                            className="custom-control-input"
                                                                            defaultChecked={permissions[key].childitems[child_key].allow_access}
                                                                            name={permissions[key].title + permissions[key].childitems[child_key].title + '_allow_access'}
                                                                            ref={register}

                                                                        />
                                                                        <label className="custom-control-label" htmlFor={permissions[key].title + permissions[key].childitems[child_key].title + '_allow_access'}>
                                                                            {permissions[key].childitems[child_key].title}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        })}
                                                    </div>
                                                    <div className="divider-text divider-text--xs margin-top-20 margin-bottom-20">
                                                        &nbsp;
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    })}

                                    <div className="text-right margin-bottom-20">
                                        <button className="btn btn-secondary">
                                            Save Changes
                                        </button>
                                    </div>
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
                                        <Select
                                            id="product_type"
                                            name="product_type"
                                            options={userOptions}
                                            onChange={item => {
                                                handleFindUser(item.value)
                                            }}
                                            className={`basic-multi-select form-control-m`}
                                            classNamePrefix="select"
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
                                        disabled={!selectedUser}
                                        onClick={assignRole}
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
                                            {/* <th scope="col">Date Assigned</th> */}
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {roleUsers.length > 0 && roleUsers.map(user => {
                                            return <tr>
                                                <td>
                                                    <label className="custom-control custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                        />
                                                        <span className="custom-control-label" />
                                                    </label>
                                                </td>
                                                <th scope="row">{user.first_name} {user.last_name}</th>
                                                <td>{user.email}</td>
                                                {/* <td>22 November 2021</td> */}
                                                <td width="40">
                                                    <div className="btn btn-outline-danger btn-sm btn-icon" onClick={() => { removeUser(user.id) }}>
                                                        <span className="fa fa-trash-o" />
                                                    </div>
                                                </td>
                                            </tr>
                                        })}

                                    </tbody>
                                </table>
                            </div>
                        </NavTabContent>
                    </div>
                </CardBody>
            </form>
        </div>
    );
}