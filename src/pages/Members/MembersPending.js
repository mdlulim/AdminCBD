import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Common, Pagination, Members } from 'components';
import { AuthLayout } from 'containers';
import { MemberService } from '../../providers';


let baseURL = window.location.origin;

    let page = (window.location.pathname.split('/').pop()).toLowerCase();

export default function MembersPage(props) {
    const [members, setMembers] = useState([]);

    return (
        <AuthLayout
            {...props}
            breadcrumb={{
                items: [{ title: 'Dashboard', link: '/dashboard' }],
                active: "Pending Members"
            }}
            pageHeading={{
                title: 'Pending Members',
                caption: 'EXPLORE PENDING MEMBERS DASHBOARD FOR CRYPTO BASED INNOVATION',
            }}
        >
            
            <Card>
                <Common.Widget
                    icon="li-users"
                    title="Members"
                    subtitle={'Total Members'}
                    wrapperClass="widget--items-middle"
                />
                <CardBody className="padding-botton-0">
                    <Members.Members status={'pending'} />
                </CardBody>
            </Card>
        </AuthLayout>
    );
}
