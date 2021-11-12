import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col, CardTitle, Button, ButtonGroup } from 'reactstrap';
import { KYCService } from '../../providers';
import ViewModal from './viewModal';


export default function LevelOne(props) {
    const { approveLevel, kycDetails, member } = props;
    const [show, setShow] = useState(false);
    const [clickedDoc, setDocument] = useState({});
    const [activeButton, setActiveButton]  = useState(null);
    const [active, setActiveState] = useState(null);


    useMemo(() => {
    }, []);

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
                    <form>
                       <ButtonGroup size="sm" style={{ display: "flex", justifyContent: "end" }}>
                            <Button
                                color="primary"
                                onClick={()=>{setActiveState(0); approveLevel({ level: 1, status: true })}}
                                className={`${active === 0?'active':''}`}
                            >
                                Approve
                            </Button>
                            <Button
                                color="primary"
                                onClick={()=>{setActiveState(1); approveLevel({ level: 1, status: false })}}
                                className={`${active === 1?'active':''}`}
                            >
                                Decline
                            </Button>
                        </ButtonGroup>
                       </form>
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
                                            value={(member.last_name && member.last_name)?member.last_name + " "+ member.first_name: ''}
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
                                            value={member.mobile?member.mobile:''}
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