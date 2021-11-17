import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Common, Pagination, Members } from 'components';
import { AuthLayout } from 'containers';
import { MemberService } from '../../providers';


export default function MembersPage(props) {
    const [members, setMembers] = useState([]);
    useMemo(() => {
        MemberService.getMembers().then((res) => {
            console.log(res.data.data.results)
            const userslist = res.data.data.results;
            setMembers(userslist);
        });
    }, []);

    const countMembers = (type) => {
        const countTypes = members.filter(member => member.status === type);
        return countTypes.length;
    }
    return (
        <AuthLayout
            {...props}
            breadcrumb={{
                items: [{ title: 'Dashboard', link: '/dashboard' }],
                active: "Members"
            }}
            pageHeading={{
                title: 'Manage Members',
                caption: 'EXPLORE MEMBERS DASHBOARD FOR CRYPTO BASED INNOVATION',
            }}
        >
            <div className="form-row margin-bottom-20">
                <Col xs={12} lg={3}>
                    <Common.Widget
                        icon="li-user-lock"
                        title="Active"
                        subtitle="Active Members"
                        informer={<><span className="text-bold text-success">{countMembers('Active')}</span></>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={3}>
                    <Common.Widget
                        icon="li-user-lock"
                        title="Pending"
                        subtitle="Pending Members"
                        informer={<><span className="text-bold text-warning">{countMembers('Pending')}</span></>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={3}>
                    <Common.Widget
                        icon="li-user-lock"
                        title="Blocked"
                        subtitle="Blocked Members"
                        informer={<><span className="text-bold text-danger">{countMembers('Blocked')}</span></>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={3}>
                    <Common.Widget
                        icon="li-user-minus"
                        title="Archived"
                        subtitle="Archived Members"
                        informer={<span className="text-bold text-danger">{countMembers('Archived')}</span>}
                        invert={false}
                    />
                </Col>
            </div>
            <Card>
                <Common.Widget
                    icon="li-users"
                    title="Members"
                    subtitle={'Total Members '+members.length}
                    wrapperClass="widget--items-middle"
                />
                <CardBody className="padding-botton-0">
                    <Members.Members />
                    {/* <div className="table-responsive">
                        <table className="table table-indent-rows margin-bottom-0">
                            <thead>
                                <tr>
                                    <th width="40">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="t1_checkbox_0" />
                                            <label className="custom-control-label" htmlFor="t1_checkbox_0"></label>
                                        </div>
                                    </th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th width="100">CBI #</th>
                                    <th width="100">Country</th>
                                    <th width="100">Products</th>
                                    <th width="160">Date Joined</th>
                                    <th width="150">Status</th>
                                    <th width="100"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="t1_checkbox_2" />
                                            <label className="custom-control-label" htmlFor="t1_checkbox_2"></label>
                                        </div>
                                    </td>
                                    <td><strong>Mduduzi</strong></td>
                                    <td><strong>Mdluli</strong></td>
                                    <td>2002001</td>
                                    <td>ZA</td>
                                    <td>2</td>
                                    <td>
                                        <strong>24/09/2021</strong> <span className="text-muted">12:00PM</span>
                                    </td>
                                    <td>
                                        <div className="btn btn-outline-success btn-block disabled btn-sm">
                                            Active
                                        </div>
                                    </td>
                                    <td className="text-right">
                                        <button className="btn btn-light btn-sm btn-icon">
                                            <span className="fa fa-pencil" />
                                        </button>
                                        <button className="btn btn-secondary btn-sm btn-icon ml-2">
                                            <span className="fa fa-eye" />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="t1_checkbox_2" />
                                            <label className="custom-control-label" htmlFor="t1_checkbox_2"></label>
                                        </div>
                                    </td>
                                    <td><strong>Sabelo</strong></td>
                                    <td><strong>Mdluli</strong></td>
                                    <td>2002001</td>
                                    <td>ZA</td>
                                    <td>2</td>
                                    <td>
                                        <strong>24/01/2020</strong> <span className="text-muted">12:00PM</span>
                                    </td>
                                    <td>
                                        <div className="btn btn-outline-danger btn-block disabled btn-sm">
                                            Blocked
                                        </div>
                                    </td>
                                    <td className="text-right">
                                        <button className="btn btn-light btn-sm btn-icon">
                                            <span className="fa fa-pencil" />
                                        </button>
                                        <button className="btn btn-secondary btn-sm btn-icon ml-2">
                                            <span className="fa fa-eye" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */}

                </CardBody>
            </Card>
        </AuthLayout>
    );
}
