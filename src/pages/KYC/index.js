import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Common, Pagination, KYC } from 'components';
import { AuthLayout } from 'containers';
import { MemberService } from '../../providers';


export default function KYCPage(props) {
    const [members, setMembers] = useState([]);

    useMemo(() => {
        MemberService.getMembers().then((res) => {
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
                active: "KYC"
            }}
            pageHeading={{
                title: 'KYC',
                caption: 'EXPLORE MEMBERS DASHBOARD FOR CRYPTO BASED INNOVATION',
            }}
        >
            <div className="form-row margin-bottom-20">
                <Col xs={12} lg={3}>
                    <Common.Widget
                        icon="li-user"
                        title="All KYC Members"
                        subtitle="All Members"
                        informer={<span className="text-bold">{members.length}</span>}
                        invert={false}
                    />
                </Col>
                <Col xs={12} lg={9}>
                    <Row>
                        <Col xs={12} lg={3}>
                            <Common.Widget
                                icon="li-user-lock"
                                title="Level 0"
                                informer={<><span className="text-bold text-success">{countMembers('Active')}</span></>}
                                invert={false}
                            />
                        </Col>
                        <Col xs={12} lg={3}>
                            <Common.Widget
                                icon="li-user-lock"
                                title="Level 1"
                                informer={<><span className="text-bold text-warning">{countMembers('Blocked')}</span></>}
                                invert={false}
                            />
                        </Col>
                        <Col xs={12} lg={3}>
                            <Common.Widget
                                icon="li-user-minus"
                                title="Level 2"
                                informer={<span className="text-bold text-danger">{countMembers('Archived')}</span>}
                                invert={false}
                            />
                        </Col>
                        <Col xs={12} lg={3}>
                            <Common.Widget
                                icon="li-user-minus"
                                title="Level 3"
                                informer={<span className="text-bold text-danger">{countMembers('Archived')}</span>}
                                invert={false}
                            />
                        </Col>
                    </Row>
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
                    <KYC.KYCList />
                </CardBody>
            </Card>
        </AuthLayout>
    );
}
