import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';

export default function Settings(props) {
    const [profile, setProfile] = useState({});
    const [settings, setSettings] = useState({});
    const [pageLoading, setPageLoading] = useState(true);

    async function fetchData() {
        setPageLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <AuthLayout
            {...props}
            loading={pageLoading}
            breadcrumb={{
                items: [{ title: 'Dashboard', link: '/dashboard' }],
                active: "Settings"
            }}
            pageHeading={{
                title: 'Manage Settings',
                caption: 'EXPLORE PROFILE SETTINGS FOR CRYPTO BASED INNOVATION'
            }}
        >
            <Row>
                <Col xs={12} lg={3}>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col xs={9}>
                                    <div className="user user--bordered user--xlg margin-bottom-20">
                                        <img src="/assets/img/users/user_1.jpeg" alt="Profile" />
                                        <div className="user__name">

                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </AuthLayout>
    );
}
