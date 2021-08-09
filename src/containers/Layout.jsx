import React, { useState } from 'react';
import { Header, Footer, SideNav } from '../containers';
import { Breadcrumb } from 'components';

const Layout = props => {
    const { header, footer, sidenav, breadcrumb, showOverlay } = props;
    const [sidebarLeftOpen, setSidebarLeftOpen] = useState(true);
    return (
        <div className="app-admin-wrap layout-sidebar-large">
            {showOverlay && <div className="overlay" />}
            <Header {...header} sidebarLeftOpen={sidebarLeftOpen} setSidebarLeftOpen={setSidebarLeftOpen} />
            <SideNav {...props} sidebarLeftOpen={sidebarLeftOpen} />
            <div className={`main-content-wrap ${sidebarLeftOpen ? 'sidenav-open' : ''} d-flex flex-column`}>
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