import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardBody, Row, Col, CardTitle, Button, ButtonGroup } from 'reactstrap';
import { KYCService } from '../../providers';
import ViewModal from './viewModal';


export default function LevelOne(props) {
    const { approveLevel, kycApplication, setKycApplication } = props;
    const [show, setShow] = useState(false);
    const [clickedDoc, setDocument] = useState({});
    const [active, setActiveState] = useState(null);

    useEffect(()=>{},[kycApplication])

    return (
        <Row style={{ marginBottom: "20px", borderBottom: "1px solid gainsboro" }}>
            <Col>
                <ViewModal show={show} setShow={setShow} document={clickedDoc} />
                <Row>
                    <Col md={6}>
                        <h4>Level 1</h4>
                    </Col>
                    <Col md={6}>
                    <form>
                       <ButtonGroup size="sm" style={{ display: "flex", justifyContent: "end" }}>
                            <Button
                                color="primary"
                                onClick={()=>{setActiveState(0); approveLevel({ level: 1, status: true })}}
                                className={`${kycApplication.status === 'Approved'?'active':''}`}
                            >
                                Approve
                            </Button>
                            <Button
                                color="primary"
                                onClick={()=>{setActiveState(1); approveLevel({ level: 1, status: false, setLevel: setKycApplication, levelData: kycApplication })}}
                                className={`${kycApplication.status === 'Rejected'?'active':''}`}
                            >
                                Decline
                            </Button>
                        </ButtonGroup>
                       </form>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={12} >
                        <form>
                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="fullname">Full Names</label>
                                        <input
                                            type="text"
                                            id="fullname"
                                            className="form-control form-control-m"
                                            value={kycApplication.fullname?kycApplication.fullname:''}
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
                                            value={kycApplication.id_number?kycApplication.id_number:''}
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
                                            value={kycApplication.contact?kycApplication.contact:''}
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