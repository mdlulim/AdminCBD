import React, { useState } from 'react';
import { Card, CardBody, Row, Col, CardTitle, Button, ButtonGroup } from 'reactstrap';


export default function LevelZero(props) {
    const { approveLevel, kycApplication, setKycApplication } = props;
    const onShowImage = (image) => {
        props.showImage(image);
    }

    return (
        <Row style={{ marginBottom: "20px", borderBottom: "1px solid gainsboro" }}>
            <Col>
                <Row>
                    <Col md={6}>
                        <h4>Level 0</h4>
                    </Col>
                    <Col md={6}>
                        <form>
                            <ButtonGroup size="sm" style={{ display: "flex", justifyContent: "end" }}>
                                <Button
                                    color="primary"
                                    onClick={() => { setKycApplication({...kycApplication, status: 'Approved'}); approveLevel({ level: 0, status: true }) }}
                                    className={`${kycApplication.status === 'Approved' ? 'active' : ''}`}
                                >
                                    Approve
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={() => { approveLevel({ level: 0, status: false, setLevel: setKycApplication, levelData: kycApplication }) }}
                                    className={`${kycApplication.status === 'Rejected' ? 'active' : ''}`}
                                >
                                    Decline
                                </Button>
                            </ButtonGroup>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={12} >
                        <Row>
                            <Col xs={6} md={6}>
                                <div className="form-group">
                                    <label>Selfie</label>
                                    <Card onClick={() => onShowImage([{ uri: "https://upload.wikimedia.org/wikipedia/commons/1/13/Benedict_Cumberbatch_2011.png" }])}>
                                        <img style={{ cursor: "pointer" }} src="https://upload.wikimedia.org/wikipedia/commons/1/13/Benedict_Cumberbatch_2011.png" alt="prof" />
                                    </Card>
                                </div>
                            </Col>
                            <Col xs={6} md={6} >
                                <div className="form-group">
                                    <label htmlFor="fullname">Email/Social Media</label>
                                    <input
                                        type="text"
                                        id="fullname"
                                        className="form-control form-control-m"
                                        value={kycApplication.email?kycApplication.email:''}
                                        disabled
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}