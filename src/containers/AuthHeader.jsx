import React, { useState, useEffect } from 'react';
import { SessionProvider } from 'providers';

export default function AuthHeader(props) {
    const { sideNavHidden, setSideNavHidden } = props;
    const [alertOpen, setAlertOpen] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        let user = {};
        if (SessionProvider.isValid()) {
            user = SessionProvider.get();
        }else{
            window.location = '/login';
        }
    },[]);

    return (
        <header className="page__header invert">
            <div className="logo-holder">
                <a href="/" className='pl-2'>
                    <img src="/assets/img/cbi_logo.svg" height='60px' alt="# CBI GLOBAL" />
                </a>
                <a href="/" className="logo-text d-lg-none">
                    <strong className="text-primary">#</strong><strong>CBI</strong>
                </a>
                <div
                    className="rw-btn rw-btn--nav"
                    data-action="aside-hide"
                    onClick={() => {
                        setSideNavHidden(!sideNavHidden)}
                    }
                >
                    <span />
                </div>
            </div>
            <div className="box-fluid" />
            <div className="box">
                <div className={`dropdown float-left ${alertOpen ? 'show' : ''}`}>
                    <button
                        className="btn btn-light btn-icon"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded={alertOpen}
                        onClick={() => setAlertOpen(!alertOpen)}
                    >
                        <span className="li-alarm-ringing" />
                    </button>
                    <div
                        className={`dropdown-menu dropdown-menu-right ${alertOpen ? 'show' : ''}`}
                        x-placement="bottom-end"
                        style={{
                            position: 'absolute',
                            willChange: 'transform',
                            top: 0,
                            left: 0,
                            transform: 'translate3d(-250px, 40px, 0px)',
                        }}
                    >
                        <div className="page-heading">
                            <div className="page-heading__container">
                                <h1 className="title">Notifications</h1>
                                <p className="caption">List of latest alerts</p>
                            </div>
                            <div className="page-heading__container float-right">
                                <button className="btn btn-light btn-icon">
                                    <span className="fa fa-refresh" />
                                </button>
                            </div>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item padding-left-5 border-top-0">
                                <div className="user user--bordered user--lg">
                                    <img src="/assets/img/users/user_1.jpeg" alt="Tracey Newman" />
                                    <div className="user__name">
                                        <strong>Tracey Newman</strong> commented on your <strong>Awesome article</strong>, <span className="text-muted">5 min ago</span>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item padding-left-5">
                                <div className="user user--bordered user--lg">
                                    <img src="/assets/img/users/user_1.jpeg" alt="John Doe" />
                                    <div className="user__name">
                                        <strong>John Doe</strong> added new article <strong>Progs for begginers</strong>, <span className="text-muted">13 min ago</span>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item padding-left-25">
                                <div className="icon-box icon-box--lg margin-right-10">
                                    <span className="fa fa-cog"></span>
                                </div>
                                <p>
                                    <strong>Important</strong> memory issue. Memory loading <strong>99%</strong> - 2021 of 2048
                                </p>
                            </li>
                            <li className="list-group-item padding-left-5"><div className="user user--bordered user--lg">
                                <img src="/assets/img/users/user_1.jpeg" alt="Jonathan Foster" />
                                <div className="user__name">
                                    <strong>Jonathan Foster</strong> edited product <strong>JST Smartphone</strong>, <span className="text-muted">30 min ago</span>
                                </div>
                            </div>
                            </li>
                            <li className="list-group-item padding-left-25">
                                <div className="icon-box icon-box--lg margin-right-10">
                                    <i className="fa fa-folder-open-o"></i>
                                </div>
                                <strong>File uploading</strong> proccess 25%.
                                <div className="progress">
                                    <div className="progress-bar bg-secondary" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item padding-left-10 padding-right-10">
                                <button className="btn btn-light btn-block margin-top-5">All notifications</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <button
                    className="btn btn-light btn-icon float-left"
                    data-action="fixedpanel-toggle"
                    onClick={() => {
                        SessionProvider.destroy()
                        window.location = '/login?loggedOut=true'}
                    }
                >
                    <span className="li-power-switch" />
                </button>
            </div>
        </header>
    );
}