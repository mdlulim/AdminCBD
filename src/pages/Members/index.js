import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
<<<<<<< HEAD
import { Layout } from 'containers';
import { Members } from 'components';
import { MemberService } from '../../providers';

const MembersList = props => {
    const breadcrumb = { heading: "CBI Members" };
    const [members, setMembers] = useState([]);

    useMemo(() => {
        MemberService.getMembers().then((res) => {
          console.log(res.data.data.results)
          const memberslist = res.data.data.results;
          setMembers(memberslist);
        });
  
          const membersList = [{
              memberId: '109977041',
              first_name: 'Mduduzi',
              last_name: 'Mdluli',
              username: 'JSmith',
              email: 'example1@demo.com',
              id_number: '9103025869089',
              country: 'South Africa',
              level: 'General',
              created: 'just now',
              status: 'Active',
          }, {
              memberId: '109977042',
              first_name: 'Msizi',
              last_name: 'Mpanza',
              username: 'MsiziM',
              email: 'example2@demo.com',
              id_number: '9103025869084',
              country: 'Namibia',
              level: 'Wealth Creator',
              created: '2 mins ago',
              status: 'Pending',
          }, {
              memberId: '109977043',
              first_name: 'Zungu',
              last_name: 'Zungu',
              last_name: 'ZunguAmanda',
              username: 'McCallJ',
              id_number: '9103025869085',
              email: 'example3@demo.com',
              country: 'South Africa',
              level: 'General',
              created: '5 mins ago',
              status: 'Blocked',
          }];
       setMembers(membersList);
  
  
        }, []);

    const countMembers = (type) =>{
        const countTypes = members.filter(member => member.status === type);
        return countTypes.length;
    };

	return (
		<Layout {...props} breadcrumb={breadcrumb}>
			<Row>
                <Col lg={3} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-primary o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Business-ManWoman" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">All Members</p>
                                <p className="text-primary text-24 line-height-1 mb-2">{members.length}</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-success o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Business-ManWoman" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Active Members</p>
                                <p className="text-success text-24 line-height-1 mb-2">{countMembers('Active')}</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-warning o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Business-ManWoman" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Panding  Members</p>
                                <p className="text-warning text-24 line-height-1 mb-2">{countMembers('Pending')}</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={3} md={6} sm={6}>
                    <Card className="card-icon-bg card-icon-bg-danger o-hidden mb-4">
                        <CardBody className="card-body text-center">
                            <i className="i-Business-ManWoman" />
                            <div className="content">
                                <p className="text-muted mt-2 mb-0">Blocked Members</p>
                                <p className="text-danger text-24 line-height-1 mb-2">{countMembers('Blocked')}</p>
                            </div>
                        </CardBody>
                    </Card>
=======
import { Common, Pagination, Members } from 'components';
import { AuthLayout } from 'containers';


export default function MembersPage(props) {
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
                <Col xs={12} lg={4}>
                    <Common.Widget
                        icon="li-user"
                        title="Active"
                        subtitle="All active members"
                        informer={<span className="text-bold text-success">23,500</span>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={4}>
                    <Common.Widget
                        icon="li-user-lock"
                        title="Blocked"
                        subtitle="Blocked members"
                        informer={<><span className="text-bold">232</span></>}
                        invert={false}
                    />
>>>>>>> 56a330f8ccd24c9a8d84cd7acc3857e01a462e5a
                </Col>
                <Col xs={12} lg={4}>
                    <Common.Widget
                        icon="li-user-minus"
                        title="Archived"
                        subtitle="Archived members"
                        informer={<span className="text-bold text-danger">21</span>}
                        invert={false}
                    />
                </Col>
            </div>
            <Card>
                <Common.Widget
                    icon="li-users"
                    title="Members"
                    subtitle="List of all members"
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
