import React from 'react';
import { Card } from 'reactstrap';
import { Layout } from 'containers';

export default function MessagingChat(props) {
    return (
        <Layout {...props}>
            <Card className="chat-sidebar-container sidebar-container">
                <div className="chat-content-wrap sidebar-content">
                    <div className="d-flex pl-3 pr-3 pt-2 pb-2 o-hidden box-shadow-1 chat-topbar">
                        <a className="link-icon d-md-none">
                            <i className="icon-regular i-Right ml-0 mr-3" />
                        </a>
                    </div>
                    <div className="app-inro-circle ng-tns-c8-2 ng-star-inserted">
                        <div className="border rounded-circle big-bubble ng-trigger ng-trigger-animate">
                            <i className="i-Speach-Bubbles" />
                        </div>
                        <p className="text-16 ng-trigger ng-trigger-animate">
                            Select a contact and start chat.
                        </p>
                    </div>
                </div>
                <div className="chat-sidebar-wrap sidebar">
                    <div className="border-right">
                        <div className="pt-2 pb-2 pl-3 pr-3 d-flex align-items-center o-hidden box-shadow-1 chat-topbar">
                            <a appsidebartoggler="chat-sidebar" className="link-icon d-md-none">
                                <i className="icon-regular ml-0 mr-3 i-Left" />
                            </a>
                            <div className="form-group m-0 flex-grow-1">
                                <input
                                    type="text"
                                    id="search"
                                    placeholder="Search contacts"
                                    className="form-control form-control-rounded"
                                />
                            </div>
                        </div>
                        <div className="contacts-scrollable rtl-ps-none ps ps--active-y">
                            <div className="mt-4 pb-2 pl-3 pr-3 font-weight-bold text-muted border-bottom">
                                Recent
                            </div>
                            <div className="p-3 d-flex align-items-center contact border-bottom online ng-star-inserted">
                                <img alt="John Doe" className="avatar-sm rounded-circle mr-3" src={require("images/1.jpeg")} />
                                <div>
                                    <h6 className="m-0">Frank Powell</h6>
                                    <span className="text-muted text-small">Jun 12, 2017</span>
                                </div>
                            </div>
                            <div className="p-3 d-flex align-items-center contact online ng-star-inserted">
                                <img alt="John Doe" className="avatar-sm rounded-circle mr-3" src={require("images/1.jpeg")} />
                                <div>
                                    <h6 className="m-0">Frank Powell</h6>
                                    <span className="text-muted text-small">Jun 12, 2017</span>
                                </div>
                            </div>
                            <div className="mt-3 pb-2 pl-3 pr-3 font-weight-bold text-muted border-bottom">
                                Contacts
                            </div>
                            <div className="p-3 d-flex align-items-center contact border-bottom online ng-star-inserted">
                                <img alt="John Doe" className="avatar-sm rounded-circle mr-3" src={require("images/1.jpeg")} />
                                <div>
                                    <h6 className="m-0">Frank Powell</h6>
                                    <span className="text-muted text-small">Jun 12, 2017</span>
                                </div>
                            </div>
                            <div className="p-3 d-flex align-items-center contact border-bottom online ng-star-inserted">
                                <img alt="John Doe" className="avatar-sm rounded-circle mr-3" src={require("images/1.jpeg")} />
                                <div>
                                    <h6 className="m-0">Frank Powell</h6>
                                    <span className="text-muted text-small">Jun 12, 2017</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </Layout>
    );
}