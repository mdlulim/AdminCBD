import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col, CardTitle, Button, ButtonGroup } from 'reactstrap';
import { KYCService } from '../../providers';
import ViewModal from './viewModal';


export default function LevelOne(props) {
    const [show, setShow] = useState(false);
    const [clickedDoc, setDocument] = useState({});

    useMemo(() => {
    }, []);

    const approveLevel = (action) => {
        props.approveLevel(action);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        // setDisabled(true);
        // setError('');
    }

    return (
        <Row style={{ marginBottom: "20px", borderBottom: "1px solid gainsboro" }}>
            <Col>
                <ViewModal show={show} setShow={setShow} document={clickedDoc} />
                <Row>
                    <Col md={6}>
                        <h4>Level 1</h4>
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
                        <form onSubmit={onSubmit}>
                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="fullname">Full Names</label>
                                        <input
                                            type="text"
                                            id="fullname"
                                            className="form-control form-control-m"
                                            value={"John Doe"}
                                            disabled
                                        />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="id_passport">ID/Passport number</label>
                                        <input
                                            type="text"
                                            id="id_passport"
                                            className="form-control form-control-m"
                                            value={"980712 5509 8"}
                                            disabled
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="contact">Contact Number</label>
                                        <input
                                            type="text"
                                            id="contact"
                                            className="form-control form-control-m"
                                            value={"+264 81 034 9752"}
                                            disabled
                                        />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="address">Physical Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            className="form-control form-control-m"
                                            value={"Klein Windhoek, Namibia"}
                                            disabled
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}