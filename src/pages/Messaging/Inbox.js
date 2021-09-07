import React from 'react';
import { Card } from 'reactstrap';
import { Layout } from 'containers';

export default function MessagingInbox(props) {
    return (
        <Layout {...props}>
            <div className="inbox-main-sidebar-container sidebar-container">
                <div className="inbox-main-content sidebar-content">
                    
                </div>
                <div className="inbox-main-sidebar sidebar">
                    <div className="pt-3 pr-3 pb-3">
                        <i className="sidebar-close i-Close" />
                        <button className="btn btn-rounded btn-primary btn-block mb-4">
                            Compose
                        </button>
                        <p className="text-muted mb-2">Browse</p>
                        <ul className="inbox-main-nav">
                            <li>
                                <a className="active" href="/">
                                    <i className="icon-regular i-Mail-2" />
                                    Inbox (2)
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <i className="icon-regular i-Mail-Outbox" />
                                    Sent
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <i className="icon-regular i-Mail-Favorite" />
                                    Starred
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <i className="icon-regular i-Folder-Trash" />
                                    Trash
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <i className="icon-regular i-Spam-Mail" />
                                    Spam
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}