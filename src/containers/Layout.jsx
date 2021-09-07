import React, { useState } from 'react';
import { Header, Footer, SideNav } from '../containers';
import { Breadcrumb } from 'components';

const Layout = props => {
    const { header, footer, sidenav, breadcrumb, showOverlay } = props;
    const [wrapperClass, setWrapperClass] = useState('sidenav-collapsed');
    const [sidebarClass, setSidebarClass] = useState('open');

    const toggleSidebarClass = () => {
        if (sidebarClass !== 'open') {
            setSidebarClass('open');
            return setWrapperClass('sidenav-collapsed');
        }
        setSidebarClass('');
        return setWrapperClass('');
    };

    const toggleSidebarSecondaryClass = () => {
        if (wrapperClass === 'sidenav-collapsed') {
            return setWrapperClass('sidenav-open');
        }
        return setWrapperClass('sidenav-collapsed');
    };

    return (
        <div
            className={`app-admin-wrap layout-sidebar-compact clearfix sidebar-gradient-black-gray ${wrapperClass}`}
        >
            {showOverlay && <div className="overlay" />}
            <SideNav
                {...props}
                sidebarClass={sidebarClass}
                wrapperClass={wrapperClass}
                toggleSidebarSecondaryClass={toggleSidebarSecondaryClass}
            />
            <div className="main-content-wrap d-flex flex-column ps">
                <Header {...header} toggleSidebarClass={toggleSidebarClass} />
                <div className="main-content">
                    {breadcrumb && <Breadcrumb {...breadcrumb} />}
                    {props.children}
                </div>
                <div className="flex-grow-1" />
                <Footer {...footer} />
            </div>
        </div>
    );
};

export default Layout;