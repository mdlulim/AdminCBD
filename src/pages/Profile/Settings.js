import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { ProfileProvider } from 'providers';
import { Modals } from 'components';

export default function Settings(props) {
    const [active, setActive] = useState(1);
    const [profile, setProfile] = useState({});
    const [pageLoading, setPageLoading] = useState(true);
    const [showChangePassword, setShowChangePassword] = useState(false);

    async function fetchData() {
        const profile = await ProfileProvider.me();
        setProfile(profile);
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
            {!pageLoading &&
            <>
                <Modals.ChangePassword
                    show={showChangePassword}
                    setShow={setShowChangePassword}
                    {...profile}
                />
                <Card className="nav-tabs-cardtop margin-top-40">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                            <a
                                toggle="tab"
                                id="settings-tab"
                                aria-selected={false}
                                aria-controls="settings-tab"
                                className={`nav-link text-bold ${active === 1 ? 'active show' : ''}`}
                                onClick={e => {
                                    e.preventDefault();
                                    setActive(1);
                                }}
                            >
                                Settings
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                toggle="tab"
                                href="/profile"
                                id="settings-tab"
                                aria-selected={false}
                                aria-controls="settings-tab"
                                className="nav-link text-bold"
                            >
                                Profile
                            </a>
                        </li>
                    </ul>
                    <CardBody>
                        <div className="tab-content">
                            <div className={`tab-pane fade ${active === 1 ? 'active show' : ''}`} id="settings-tab">
                                <Row className="margin-bottom-20">
                                    <Col xs={6} lg={9}>
                                        <h4 className="margin-bottom-10">Password</h4>
                                        <p className="text-muted">
                                            To make change your existing password click on change password button.
                                        </p>
                                    </Col>
                                    <Col xs={6} lg={3} className="text-right">
                                        <button
                                            className="btn btn-light"
                                        >
                                            Change Password
                                        </button>
                                    </Col>
                                </Row>
                                <hr />
                                <Row className="margin-bottom-20">
                                    <Col xs={6} lg={9}>
                                        <h4 className="margin-bottom-10">Username</h4>
                                        <p className="text-muted">
                                            Your username is <strong>{profile.username}</strong>
                                        </p>
                                    </Col>
                                    <Col xs={6} lg={3} className="text-right" />
                                </Row>
                                <hr />
                                <Row className="margin-bottom-20">
                                    <Col xs={6} lg={9}>
                                        <h4 className="margin-bottom-10">Email Address</h4>
                                        <p className="text-muted">
                                            Your email address is <strong>{profile.email}</strong>
                                        </p>
                                    </Col>
                                    <Col xs={6} lg={3} className="text-right" />
                                </Row>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </>}
        </AuthLayout>
    );
}
