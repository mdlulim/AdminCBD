import React, { useState } from 'react';
import { CardBody, Col, Row } from 'reactstrap';
import useForm from "react-hook-form";
import { UserService } from 'providers';
import Swal from 'sweetalert2';

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
    const { active, parent } = props;
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
        setPageLoading
    } = props;
    const [activeTab, setActiveTab] = useState('information');
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data) => {
        setPageLoading(true)
        let permissionObject = {}
        Object.keys(parent.permissions).map((key, index) => {
            permissionObject[key] = {
                allow_access: data[parent.permissions[key].title + '_allow_access'],
                childitems: {},
                title: parent.permissions[key].title,
                id: parent.permissions[key].id,
                icon: parent.permissions[key].icon,
                link: parent.permissions[key].link,
                parent: parent.permissions[key].parent,
                description: parent.permissions[key].description,
                type: parent.permissions[key].type
            }
            if (parent.permissions[key].type === 'crud') {

                if (parent.permissions[key].childitems) {
                    Object.keys(parent.permissions[key].childitems).map((child_key, index) => {
                        permissionObject[key]['childitems'][child_key] =
                        {
                            title: parent.permissions[key].childitems[child_key].title,
                            read_access: data[parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_read'],
                            create_access: data[parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_create'],
                            delete_access: data[parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_delete'],
                            update_access: data[parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_update'],
                            access: data[parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_full'] ? 'full' : 'partial',
                            id: parent.permissions[key].childitems[child_key].id,
                            icon: parent.permissions[key].childitems[child_key].icon,
                            link: parent.permissions[key].childitems[child_key].link
                        }

                    })
                } else {
                    permissionObject[key] = {
                        ...permissionObject[key],
                        read_access: data[parent.permissions[key].title + '_read'],
                        create_access: data[parent.permissions[key].title + '_create'],
                        delete_access: data[parent.permissions[key].title + '_delete'],
                        update_access: data[parent.permissions[key].title + '_update'],
                        access: data[parent.permissions[key].title + '_full'] ? 'full' : 'partial',
                        id: parent.permissions[key].id,
                        icon: parent.permissions[key].icon,
                        link: parent.permissions[key].link,
                        parent: parent.permissions[key].parent,
                        description: parent.permissions[key].description,
                        type: parent.permissions[key].type
                    }
                    delete permissionObject[key].childitems
                }
            } else {
                Object.keys(parent.permissions[key].childitems).map((child_key, index) => {
                    permissionObject[key]['childitems'][child_key] =
                    {
                        title: parent.permissions[key].childitems[child_key].title,
                        allow_access: data[parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_allow_access'],
                        id: parent.permissions[key].childitems[child_key].id,
                        icon: parent.permissions[key].childitems[child_key].icon,
                        link: parent.permissions[key].childitems[child_key].link,
                    }
                })
            }
        })

        let finalObject = {
            permissions: permissionObject,
            name: data.name,
            label: data.name,
            description: data.description,
            created: Date.now(),
            channel: 'admin'
        }

        const res = await UserService.addRoles(finalObject)
        setPageLoading(false)
        if (res.data.success) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Request processed successfully!',
                showConfirmButton: false,
                timer: 3000
            });
            return
        }
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Failed to process request, please try again!',
            showConfirmButton: false,
            timer: 4000
        });
    };

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
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardBody>
                    <div className="tab-content" id="overview">
                        <NavTabContent
                            id="information"
                            name="information"
                            title="Information"
                            active={activeTab === 'information'}
                        >
                            <div >
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
                                            type="text"
                                            className="form-control"
                                            name="parent_id"
                                            ref={register}
                                            defaultValue={(parent && parent.id) ? parent.id : 'System'}
                                            onChange={(e) => { handleParentChange(e.target.value) }}
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
                                            ref={register}
                                            defaultValue={(parent && parent.type) ? parent.type : 'System'}
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
                                            ref={register}
                                            required
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
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </NavTabContent>
                        <NavTabContent
                            id="permissions"
                            name="permissions"
                            title="Permissions"
                            active={activeTab === 'permissions'}
                        >
                            {parent &&
                                <>
                                    {Object.keys(parent.permissions).map((key, index) => {
                                        return <>
                                            <h4>{parent.permissions[key].title}</h4>
                                            <p className="subtitle margin-bottom-20">
                                                Use this configurations below to define transactions permissions
                                            </p>
                                            <div className="d-flex">
                                                <div className="margin-right-30">
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            id={parent.permissions[key].title + '_allow_access'}
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            defaultChecked={parent.permissions[key].allow_access}
                                                            name={parent.permissions[key].title + '_allow_access'}
                                                            ref={register}
                                                            onChange={e => console.log(e.target.value)}

                                                        />
                                                        <label className="custom-control-label" htmlFor={parent.permissions[key].title + '_allow_access'}>
                                                            Access {parent.permissions[key].title} Module
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {parent.permissions[key].type === 'crud' ?
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
                                                                {parent.permissions[key].childitems ?
                                                                    Object.keys(parent.permissions[key].childitems).map((child_key, index) => {
                                                                        return <tr>
                                                                            <th scope="row">{parent.permissions[key].childitems[child_key].title}</th>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input
                                                                                        id={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_null_access'}
                                                                                        type="checkbox"
                                                                                        className="custom-control-input"
                                                                                        name={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_null_access'}
                                                                                        ref={register}
                                                                                        onChange={() => { parent.permissions[key].childitems[child_key].create_access = false }}
                                                                                        defaultChecked={
                                                                                            !parent.permissions[key].childitems[child_key].create_access &&
                                                                                            !parent.permissions[key].childitems[child_key].read_access &&
                                                                                            !parent.permissions[key].childitems[child_key].update_access &&
                                                                                            !parent.permissions[key].childitems[child_key].delete_access? true: false
                                                                                        }
                                                                                    />
                                                                                    <label className="custom-control-label" htmlFor={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_null_access'}>
                                                                                        &nbsp;
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input
                                                                                        id={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_create'}
                                                                                        type="checkbox"
                                                                                        className="custom-control-input"
                                                                                        defaultChecked={parent.permissions[key].childitems[child_key].create_access}
                                                                                        name={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_create'}
                                                                                        ref={register}
                                                                                    />
                                                                                    <label className="custom-control-label" htmlFor={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_create'}>
                                                                                        &nbsp;
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input
                                                                                        id={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_read'}
                                                                                        type="checkbox"
                                                                                        className="custom-control-input"
                                                                                        defaultChecked={parent.permissions[key].childitems[child_key].read_access}
                                                                                        name={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_read'}
                                                                                        ref={register}
                                                                                    />
                                                                                    <label className="custom-control-label" htmlFor={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_read'}>
                                                                                        &nbsp;
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input
                                                                                        id={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_update'}
                                                                                        type="checkbox"
                                                                                        className="custom-control-input"
                                                                                        defaultChecked={parent.permissions[key].childitems[child_key].update_access}
                                                                                        name={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_update'}
                                                                                        ref={register}
                                                                                    />
                                                                                    <label className="custom-control-label" htmlFor={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_update'}>
                                                                                        &nbsp;
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input
                                                                                        id={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_delete'}
                                                                                        type="checkbox"
                                                                                        className="custom-control-input"
                                                                                        defaultChecked={parent.permissions[key].childitems[child_key].delete_access}
                                                                                        name={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_delete'}
                                                                                        ref={register}
                                                                                    />
                                                                                    <label className="custom-control-label" htmlFor={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_delete'}>
                                                                                        &nbsp;
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input
                                                                                        id={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_full'}
                                                                                        type="checkbox"
                                                                                        className="custom-control-input"
                                                                                        defaultChecked={parent.permissions[key].childitems[child_key].access === 'full' ? true : false}
                                                                                        defaultChecked={
                                                                                            parent.permissions[key].childitems[child_key].create_access &&
                                                                                            parent.permissions[key].childitems[child_key].read_access &&
                                                                                            parent.permissions[key].childitems[child_key].update_access &&
                                                                                            parent.permissions[key].childitems[child_key].delete_access? true: false
                                                                                        }
                                                                                        name={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_full'}
                                                                                        ref={register}
                                                                                    />
                                                                                    <label className="custom-control-label" htmlFor={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_full'}>
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
                                                                                    id={parent.permissions[key].title + '_null_access'}
                                                                                    type="checkbox"
                                                                                    className="custom-control-input"
                                                                                    name={parent.permissions[key].title + '_null_access'}
                                                                                    ref={register}
                                                                                    defaultChecked={
                                                                                        !parent.permissions[key].create_access &&
                                                                                        !parent.permissions[key].read_access &&
                                                                                        !parent.permissions[key].update_access &&
                                                                                        !parent.permissions[key].delete_access? true: false
                                                                                    }
                                                                                />
                                                                                <label className="custom-control-label" htmlFor={parent.permissions[key].title + '_null_access'}>
                                                                                    &nbsp;
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input
                                                                                    id={parent.permissions[key].title + '_create'}
                                                                                    type="checkbox"
                                                                                    className="custom-control-input"
                                                                                    defaultChecked={parent.permissions[key].create_access}
                                                                                    name={parent.permissions[key].title + '_create'}
                                                                                    ref={register}
                                                                                />
                                                                                <label className="custom-control-label" htmlFor={parent.permissions[key].title + '_create'}>
                                                                                    &nbsp;
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input
                                                                                    id={parent.permissions[key].title + '_read'}
                                                                                    type="checkbox"
                                                                                    className="custom-control-input"
                                                                                    defaultChecked={parent.permissions[key].read_access}
                                                                                    name={parent.permissions[key].title + '_read'}
                                                                                    ref={register}
                                                                                />
                                                                                <label className="custom-control-label" htmlFor={parent.permissions[key].title + '_read'}>
                                                                                    &nbsp;
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input
                                                                                    id={parent.permissions[key].title + '_update'}
                                                                                    type="checkbox"
                                                                                    className="custom-control-input"
                                                                                    defaultChecked={parent.permissions[key].update_access}
                                                                                    name={parent.permissions[key].title + '_update'}
                                                                                    ref={register}
                                                                                />
                                                                                <label className="custom-control-label" htmlFor={parent.permissions[key].title + '_update'}>
                                                                                    &nbsp;
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input
                                                                                    id={parent.permissions[key].title + '_delete'}
                                                                                    type="checkbox"
                                                                                    className="custom-control-input"
                                                                                    defaultChecked={parent.permissions[key].delete_access}
                                                                                    name={parent.permissions[key].title + '_delete'}
                                                                                    ref={register}
                                                                                />
                                                                                <label className="custom-control-label" htmlFor={parent.permissions[key].title + '_delete'}>
                                                                                    &nbsp;
                                                                                </label>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input
                                                                                    id={parent.permissions[key].title + '_full'}
                                                                                    type="checkbox"
                                                                                    className="custom-control-input"
                                                                                    defaultChecked={
                                                                                        parent.permissions[key].create_access &&
                                                                                        parent.permissions[key].read_access &&
                                                                                        parent.permissions[key].update_access &&
                                                                                        parent.permissions[key].delete_access? true: false
                                                                                    }
                                                                                    name={parent.permissions[key].title + '_full'}
                                                                                    ref={register}
                                                                                />
                                                                                <label className="custom-control-label" htmlFor={parent.permissions[key].title + '_full'}>
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
                                                        {Object.keys(parent.permissions[key].childitems).map((child_key, index) => {
                                                            // {parent.permissions[key].childitems[child_key].map((child) => {
                                                            return <>
                                                                <div className="margin-right-30">
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input
                                                                            id={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_allow_access'}
                                                                            type="checkbox"
                                                                            className="custom-control-input"
                                                                            defaultChecked={parent.permissions[key].childitems[child_key].allow_access}
                                                                            name={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_allow_access'}
                                                                            ref={register}

                                                                        />
                                                                        <label className="custom-control-label" htmlFor={parent.permissions[key].title + parent.permissions[key].childitems[child_key].title + '_allow_access'}>
                                                                            {parent.permissions[key].childitems[child_key].title}
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
                                </>

                            }
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