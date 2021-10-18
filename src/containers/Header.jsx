import React, { useState, useMemo } from 'react';
import { HashLinkContainer } from 'components';
import {Session} from 'bc-react-session';
import { AuthService } from '../providers';


const session = Session.get();


export default function Header(props) {
    const { toggleSidebarClass } = props;
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showAlerts, setShowAlerts] = useState(false);
    const [token, setToken] = useState('');

    // useMemo(() => {
    //     if(session.isValid){
    //         setToken(session.payload.token);
    //     }else{
    //     window.location = '/login';
    //     }
    // },[]);

    const toggleShowMenu = () => {
        setShowUserMenu(!showUserMenu);
        setShowAlerts(false);
    };

    const toggleShowAlert = () => {
        setShowAlerts(!showAlerts);
        setShowUserMenu(false);
    };

    const onLogout = () => {
        if (AuthService.logout()){
            // history.push('/login'); 
            window.location = '/login';
          }
    };

	return (
		<div className="main-header">
			<div className="logo">
                <img src="images/logo.png" alt="CBI" />
            </div>
			<div 
                className="menu-toggle"
                onClick={() => toggleSidebarClass()}
            >
                <div></div>
                <div></div>
                <div></div>
            </div>
			<div style={{ margin: 'auto' }} />
			<div className="header-part-right">
                <i className="i-Full-Screen header-icon d-none d-sm-inline-block" data-fullscreen />
                <div className="dropdown">
                    <i
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                        className="i-Safe-Box text-muted header-icon"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                    />
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div className="menu-icon-grid">
                            <a href="/"><i className="i-Shop-4" /> Home</a>
                        </div>
                    </div>
                </div>
                <div className={`dropdown ${showAlerts ? 'show' : ''}`}>
                    <div
                        className="badge-top-container"
                        role="button"
                        id="dropdownNotification"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded={showAlerts}
                        onClick={() => toggleShowAlert()}
                    >
                        <span className="badge badge-primary">3</span>
                        <i className="i-Bell text-muted header-icon" />
                    </div>
                    <div
                        className={`dropdown-menu dropdown-menu-right notification-dropdown rtl-ps-none ${showAlerts ? 'show' : ''}`}
                        aria-labelledby="dropdownNotification"
                        data-perfect-scrollbar
                        data-suppress-scroll-x="true"
                    >
                        <div className="dropdown-item d-flex">
                            <div className="notification-icon">
                                <i className="i-Speach-Bubble-6 text-primary mr-1" />
                            </div>
                            <div className="notification-details flex-grow-1">
                                <p className="m-0 d-flex align-items-center">
                                    <span>New message</span>
                                    <span className="badge badge-pill badge-primary ml-1 mr-1">new</span>
                                    <span className="flex-grow-1"></span>
                                    <span className="text-small text-muted ml-auto">10 sec ago</span>
                                </p>
                                <p className="text-small text-muted m-0">James: Hey! are you busy?</p>
                            </div>
                        </div>
                        <div className="dropdown-item d-flex">
                            <div className="notification-icon">
                                <i className="i-Receipt-3 text-success mr-1" />
                            </div>
                            <div className="notification-details flex-grow-1">
                                <p className="m-0 d-flex align-items-center">
                                    <span>New order received</span>
                                    <span className="badge badge-pill badge-success ml-1 mr-1">new</span>
                                    <span className="flex-grow-1"></span>
                                    <span className="text-small text-muted ml-auto">2 hours ago</span>
                                </p>
                                <p className="text-small text-muted m-0">1 Headphone, 3 iPhone x</p>
                            </div>
                        </div>
                        <div className="dropdown-item d-flex">
                            <div className="notification-icon">
                                <i className="i-Empty-Box text-danger mr-1" />
                            </div>
                            <div className="notification-details flex-grow-1">
                                <p className="m-0 d-flex align-items-center">
                                    <span>Product out of stock</span>
                                    <span className="badge badge-pill badge-danger ml-1 mr-1">3</span>
                                    <span className="flex-grow-1"></span>
                                    <span className="text-small text-muted ml-auto">10 hours ago</span>
                                </p>
                                <p className="text-small text-muted m-0">Headphone E67, R98, XL90, Q77</p>
                            </div>
                        </div>
                        <div className="dropdown-item d-flex">
                            <div className="notification-icon">
                                <i className="i-Data-Power text-success mr-1" />
                            </div>
                            <div className="notification-details flex-grow-1">
                                <p className="m-0 d-flex align-items-center">
                                    <span>Server Up!</span>
                                    <span className="badge badge-pill badge-success ml-1 mr-1">3</span>
                                    <span className="flex-grow-1"></span>
                                    <span className="text-small text-muted ml-auto">14 hours ago</span>
                                </p>
                                <p className="text-small text-muted m-0">Server rebooted successfully</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown">
                    <div className={`user col align-self-end ${showUserMenu ? 'show' : ''}`}>
                        <img
                            src={require("images/1.jpeg")}
                            id="userDropdown"
                            alt="User"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded={showUserMenu}
                            onClick={() => toggleShowMenu()}
                        />
                        <div 
                            className={`dropdown-menu dropdown-menu-right ${showUserMenu ? 'show' : ''}`}
                            aria-labelledby="userDropdown"
                            style={{
                                position: 'absolute',
                                willChange: 'transform',
                                top: 0,
                                left: 0,
                                transform: 'translate3d(-109px, 36px, 0px)'
                            }}
                        >
                            <div className="dropdown-header">
                                <i className="i-Lock-User mr-1" /> John Doe
                            </div>
                            <HashLinkContainer to="/profile">
                                <a className="dropdown-item">My Profile</a>
                            </HashLinkContainer>
                            <a className="dropdown-item">Account Settings</a>
                            <a className="dropdown-item" onClick={e => onLogout(e)}>Sign Out</a>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	);
}
