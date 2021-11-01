import React from 'react';

export default function AuthPages(props) {
    return (
        <div className="page" style={{ minHeight: '100vh' }}>
            <div className="page__content" id="page-content">
                <div className="important-container login-container">
                    <div className="content">
                        {props.children}
                    </div>
                </div>
                <div
                    class="content d-none d-lg-block"
                    id="content"
                    style={{
                        background : 'url(/assets/img/backgrounds/bridge.jpeg) left center no-repeat',
                        backgroundSize: '100% auto'
                    }}
                />
            </div>
        </div>
    );
}