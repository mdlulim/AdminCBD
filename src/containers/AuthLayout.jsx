import React from 'react';

const AuthLayout = props => {
    return (
        <div className="auth-layout-wrap">
            <div className="auth-content">
                {props.children}
            </div>
        </div>
    );
};

export default AuthLayout;