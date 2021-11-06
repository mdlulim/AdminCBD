import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col, CardTitle, Button, ButtonGroup } from 'reactstrap';
import { KYCService } from '../../providers';
import { Modal } from 'react-bootstrap';
import ViewModal from './viewModal';
import RejectLevelModal from './rejectLevelModal'

const Image = () => {
    return (
        <img
            alt=""
            height="32px"
            style={{ borderRadius: 4 }}
            width="32px"
            src={require("images/1.jpeg")}
        />
    );
};

export default function LevelZero(props) {
    useMemo(() => {
    }, []);

    const approveLevel = (action) => {
        props.approveLevel(action);
    }

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
                        <ButtonGroup size="sm" align="right">
                            <Button color="success" onClick={() => approveLevel(true)}>Approve</Button>
                            <Button color="danger" onClick={() => approveLevel(false)}>Decline</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={12} >
                        <Row>
                            <Col xs={6} md={6}>
                                <div className="form-group">
                                    <label>Selfie</label>
                                    <Card onClick={() => onShowImage("holder.js/171x180")}>
                                        <Image src="holder.js/171x180" roundedCircle />
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
                                        value={"John Doe"}
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