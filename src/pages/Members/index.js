import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Common, Pagination, Members, Loader } from 'components';
import { AuthLayout } from 'containers';
import { MemberService } from '../../providers';


let baseURL = window.location.origin;

    let page = (window.location.pathname.split('/').pop()).toLowerCase();

export default function MembersPage(props) {
    const [members, setMembers] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);

    async function fetchData(){
        const memberslist = await MemberService.getMembers();
            setMembers(memberslist.results);
            setPageLoading(false);
    }

    useEffect(() => {
        fetchData()
    }, [
        setPageLoading,
    ]);

    const countMembers = (type) => {
        const countTypes = members.filter(member => member.status === type);
        return countTypes.length;
    }

    if (pageLoading) return <Loader.Default />;

    return (
        <AuthLayout
            {...props}
            loading={pageLoading}
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
                    <Members.Members status={'add'} pageLoading={pageLoading} setPageLoading={setPageLoading} {...props}/>
                </CardBody>
            </Card>
        </AuthLayout>
    );
}
