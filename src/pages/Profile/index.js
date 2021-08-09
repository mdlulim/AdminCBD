import React, { useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import { Layout } from 'containers';

const Profile = props => {
	const breadcrumb = { heading: "Profile" };
    const [activeTab, setActiveTab] = useState('timeline');
	return (
		<Layout {...props} breadcrumb={breadcrumb}>
            <Card className="user-profile o-hidden mb-4">
                <div
                    className="header-cover"
                    style={{
                        backgroundImage: `url(${require('images/photo-wide-4.jpeg')})`
                    }}
                />
                <div className="user-info">
                    <img className="profile-picture avatar-lg mb-2" src={require("images/1.jpeg")} alt="Profile" />
                    <p className="m-0 text-24">Sipho Mageba</p>
                    <p className="text-muted m-0">Admin Consultant</p>
                </div>
                <CardBody>
                    <ul className="nav nav-tabs profile-nav mb-4" id="profileTab">
                        <li className="nav-item">
                            <a
                                role="tab"
                                href="#timeline"
                                className={`nav-link ${activeTab === 'timeline' ? 'active show' : ''}`}
                                id="timeline-tab"
                                data-toggle="tab"
                                aria-controls="timeline"
                                aria-selected={activeTab === 'timeline'}
                                onClick={e => {
                                    e.preventDefault();
                                    setActiveTab('timeline');
                                }}
                            >
                                Timeline
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                role="tab"
                                href="#about"
                                className={`nav-link ${activeTab === 'about' ? 'active show' : ''}`}
                                id="about-tab"
                                data-toggle="tab"
                                aria-controls="about"
                                aria-selected={activeTab === 'about'}
                                onClick={e => {
                                    e.preventDefault();
                                    setActiveTab('about');
                                }}
                            >
                                About
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="profileTabContent">
                        <div className={`tab-pane fade ${activeTab === 'timeline' ? 'active show' : ''}`}>
                            <ul class="timeline clearfix">
                                <li class="timeline-line"></li>
                                <li class="timeline-item">
                                    <div class="timeline-badge"><i class="badge-icon bg-primary text-white i-Cloud-Picture"></i></div>
                                    <div class="timeline-card card">
                                        <div class="card-body">
                                            <div class="mb-1">
                                                <strong class="mr-1">Sipho Mageba</strong> added a new photo
                                                <p class="text-muted">3 hours ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="timeline-item">
                                    <div class="timeline-badge">
                                        <img class="badge-img" src={require("images/1.jpeg")} alt="Profile" />
                                    </div>
                                    <div class="timeline-card card">
                                        <div class="card-body">
                                            <div class="mb-1">
                                                <strong class="mr-1">Sipho Mageba</strong> updated his sattus
                                                <p class="text-muted">16 hours ago</p>
                                            </div>
                                            <p>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dicta 
                                                beatae illo illum iusto iste mollitia explicabo quam officia. Quas 
                                                ullam, quisquam architecto aspernatur enim iure debitis dignissimos 
                                                suscipit ipsa.
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={`tab-pane fade ${activeTab === 'about' ? 'active show' : ''}`}>
                            <h4>Personal Information</h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, commodi quam! Provident quis voluptate asperiores ullam, quidem odio pariatur. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem, nulla eos?
                                Cum non ex voluptate corporis id asperiores doloribus dignissimos blanditiis iusto qui repellendus deleniti aliquam, vel quae eligendi explicabo.
                            </p>
                            <hr />
                            
                        </div>
                    </div>
                </CardBody>
            </Card>
		</Layout>
	);
};

export default Profile;
