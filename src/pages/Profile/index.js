import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { ProfileProvider, ActivityService, UserService, TransactionService } from 'providers';
import { Modals, Profile } from 'components';

export default function ProfilePage(props) {
    const [profile, setProfile] = useState({});
    const [activities, setActivities] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [profilePicture, setProfilePicture] = useState('')


    async function fetchData() {
        const profile = await ProfileProvider.me();
        setProfile(profile);
        setPageLoading(false);

        const activites = await ActivityService.getActivitiesByUser(profile.id);
        setActivities(activites.results)

        const userDetails = await UserService.getUser(profile.id)
        
        const  profilePic = await  TransactionService.getTransactionPOPFile(userDetails.profile_path);
        setProfilePicture(profilePic.data)
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
                active: "Profile"
            }}
            pageHeading={{
                title: 'Manage Profile',
                caption: 'EXPLORE PROFILE FOR CRYPTO BASED INNOVATION'
            }}
        >
            {!pageLoading &&
            <>
                <Modals.ChangePassword
                    show={showChangePassword}
                    setShow={setShowChangePassword}
                    profile={profile}
                />
                <Modals.EditProfile
                    show={showEditProfile}
                    setShow={setShowEditProfile}
                    {...profile}
                />
                <Row>
                    <Col xs={12} lg={3}>
                        <Card>
                            <CardBody className="padding-bottom-10">
                                <div className="user user--bordered user--xlg margin-bottom-20">
                                    <img src={profilePicture ? profilePicture :`/assets/img/users/user_1.jpeg`} alt="Profile" />
                                   <div className="user__name">
                                        <strong>{profile.first_name} {profile.last_name}</strong>
                                        <br/>
                                        <span className="text-muted">
                                            {profile.group.label}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-muted margin-bottom-20">
                                    Manage your profile information, the email address
                                    shown here is used for your login access.
                                </p>
                                <button
                                    type="button"
                                    className="btn btn-outline-light btn-block btn--icon btn--icon-stacked margin-bottom-15"
                                    onClick={() => setShowChangePassword(true)}
                                >
                                    <span className="fa fa-lock" /> Change Password
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-block btn--icon btn--icon-stacked"
                                    onClick={() => setShowEditProfile(true)}
                                >
                                    <span className="fa fa-pencil" /> Edit Profile
                                </button>
                            </CardBody>
                            <div className="divider divider--dashed divider--sm" />
                            <CardBody>
                                <h5>Information</h5>
                                <p>
                                    <span className="caption">Username:</span><br />
                                    {profile.username}
                                </p>
                                <p>
                                    <span className="caption">Email adress:</span><br />
                                    {profile.email}
                                </p>
                                {profile.mobile &&
                                <p>
                                    <span className="caption">Contact number:</span><br />
                                    {profile.mobile}
                                </p>}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs={12} lg={9}>
                        <Profile.Timeline activities={activities} profilePicture={profilePicture} />
                    </Col>
                </Row>
            </>}
        </AuthLayout>
    );
}
