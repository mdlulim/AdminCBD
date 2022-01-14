import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { Loader } from 'components';
import { PageHeading } from 'components';
import AuthHeader from './AuthHeader';
import AuthSidenav from './AuthSidenav';
import FixedPanel from './FixedPanel';

const AuthLayout = props => {
    const { breadcrumb, header, sidenav, pageHeading, loading, fixedPanel } = props;
    const [sideNavHidden, setSideNavHidden] = useState(false);
    const [sideNavMinimized, setSideNavMinimized] = useState(false);
    return (
        <>
            {loading && <Loader.Default />}
            <div className="page page--w-header">
                <AuthHeader
                    {...props}
                    {...header}
                    sideNavHidden={sideNavHidden}
                    sideNavMinimized={sideNavMinimized}
                    setSideNavHidden={setSideNavHidden}
                    setSideNavMinimized={setSideNavMinimized}
                />
                <div
                    className={`page__content page__content--w-aside-fixed page-sidepanel--hidden ${sideNavMinimized ? 'page-aside--minimized' : ''} ${sideNavHidden ? 'page-aside--hidden' : ''}`}
                    id="page-content"
                >
                    <AuthSidenav
                        {...props}
                        {...sidenav}
                        hidden={sideNavHidden}
                        minimized={sideNavMinimized}
                        setHidden={setSideNavHidden}
                        setMinimized={setSideNavMinimized}
                    />
                    <div className="content" id="content">
                        {pageHeading && 
                        <PageHeading
                            {...pageHeading}
                            breadcrumb={breadcrumb}
                        />}
                        <Container fluid>
                            {props.children}
                        </Container>
                    </div>
                </div>
            </div>
            {fixedPanel && <FixedPanel {...fixedPanel} />}
        </>
    );
};

export default AuthLayout;