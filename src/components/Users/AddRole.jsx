import React, { useState } from 'react';
import { CardBody, Col, Row } from 'reactstrap';
import useForm from "react-hook-form";
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
        pageLoading,
        setPageLoading
    } = props;
    const [activeTab, setActiveTab] = useState('information');
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data) => {
        setPageLoading(true)
        let permissionObject = {}
        Object.keys(parent.permissions).map((key, index) => {
            permissionObject[key] = {
                'allow_access': data[parent.permissions[key].title + '_allow_access'],
                childitems: [],
                title: parent.permissions[key].title
            }

            parent.permissions[key].childitems.map((child) => {

                permissionObject[key]['childitems'].push(
                    {
                        title: child.title,
                        read_access: data[parent.permissions[key].title + child.title + '_read'],
                        create_access: data[parent.permissions[key].title + child.title + '_create'],
                        delete_access: data[parent.permissions[key].title + child.title + '_delete'],
                        update_access: data[parent.permissions[key].title + child.title + '_update'],
                    }
                )
            })
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
        // console.log(finalObject)
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

                                                        />
                                                        <label className="custom-control-label" htmlFor={parent.permissions[key].title + '_allow_access'}>
                                                            Access {parent.permissions[key].title} Module
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
                                                            parent.permissions[key].childitems.map((child) => {
                                                                return <tr>
                                                                    <th scope="row">{child.title}</th>
                                                                    <td>
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input
                                                                                id={parent.permissions[key].title + child.title + '_null_access'}
                                                                                type="checkbox"
                                                                                className="custom-control-input"
                                                                                name={parent.permissions[key].title + child.title + '_null_access'}
                                                                                ref={register}
                                                                            />
                                                                            <label className="custom-control-label" htmlFor={parent.permissions[key].title + child.title + '_null_access'}>
                                                                                &nbsp;
                                                                            </label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input
                                                                                id={parent.permissions[key].title + child.title + '_create'}
                                                                                type="checkbox"
                                                                                className="custom-control-input"
                                                                                defaultChecked={child.create_access}
                                                                                name={parent.permissions[key].title + child.title + '_create'}
                                                                                ref={register}
                                                                            />
                                                                            <label className="custom-control-label" htmlFor={parent.permissions[key].title + child.title + '_create'}>
                                                                                &nbsp;
                                                                            </label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input
                                                                                id={parent.permissions[key].title + child.title + '_read'}
                                                                                type="checkbox"
                                                                                className="custom-control-input"
                                                                                defaultChecked={child.read_access}
                                                                                name={parent.permissions[key].title + child.title + '_read'}
                                                                                ref={register}
                                                                            />
                                                                            <label className="custom-control-label" htmlFor={parent.permissions[key].title + child.title + '_read'}>
                                                                                &nbsp;
                                                                            </label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input
                                                                                id={parent.permissions[key].title + child.title + '_update'}
                                                                                type="checkbox"
                                                                                className="custom-control-input"
                                                                                defaultChecked={child.update_access}
                                                                                name={parent.permissions[key].title + child.title + '_update'}
                                                                                ref={register}
                                                                            />
                                                                            <label className="custom-control-label" htmlFor={parent.permissions[key].title + child.title + '_update'}>
                                                                                &nbsp;
                                                                            </label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input
                                                                                id={parent.permissions[key].title + child.title + '_delete'}
                                                                                type="checkbox"
                                                                                className="custom-control-input"
                                                                                defaultChecked={child.delete_access}
                                                                                name={parent.permissions[key].title + child.title + '_delete'}
                                                                                ref={register}
                                                                            />
                                                                            <label className="custom-control-label" htmlFor={parent.permissions[key].title + child.title + '_delete'}>
                                                                                &nbsp;
                                                                            </label>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="custom-control custom-checkbox">
                                                                            <input
                                                                                id={parent.permissions[key].title + child.title + '_full'}
                                                                                type="checkbox"
                                                                                className="custom-control-input"
                                                                                defaultChecked={child.access === 'full' ? true : false}
                                                                                name={parent.permissions[key].title + child.title + '_full'}
                                                                                ref={register}
                                                                            />
                                                                            <label className="custom-control-label" htmlFor={parent.permissions[key].title + child.title + '_full'}>
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
                    </div>
                </CardBody>
                <div className="text-right margin-bottom-20 mr-4">
                    <button className="btn btn-secondary" disabled={pageLoading}>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}