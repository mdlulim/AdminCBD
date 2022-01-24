import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Common, Pagination, Members } from 'components';
import { AuthLayout } from 'containers';


export default function MembersPage(props) {
    const [pageLoading, setPageLoading] = useState(true);

    return (
        <AuthLayout
            {...props}
            loading={pageLoading}
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
                    <Members.Members status={'Pending'} setPageLoading={setPageLoading} />
                </CardBody>
            </Card>
        </AuthLayout>
    );
}
