import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col, CardTitle, Button, ButtonGroup } from 'reactstrap';

export default function LevelTwo(props) {
    const { approveLevel, kycApplication, setKycApplication } = props;
    const [show, setShow] = useState(false);
    const [clickedDoc, setDocument] = useState({});
    const [active, setActiveState] = useState(null);

    const onShowImage = (image) => {
        props.showImage(image);
    }

    const onSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <Row style={{ marginBottom: "20px", borderBottom: "1px solid gainsboro" }}>
            <Col>
                <Row>
                    <Col md={6}>
                        <h4>Level 2</h4>
                    </Col>
                    <Col md={6}>
                    <form>
                       <ButtonGroup size="sm" style={{ display: "flex", justifyContent: "end" }}>
                            <Button
                                color="primary"
                                onClick={()=>{setActiveState(0); approveLevel({ level: 2, status: true })}}
                                className={`${kycApplication.status === 'Approved'?'active':''}`}
                            >
                                Approve
                            </Button>
                            <Button
                                color="primary"
                                onClick={()=>{setActiveState(1); approveLevel({ level: 2, status: false, setLevel: setKycApplication, levelData: kycApplication })}}
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
                        <form onSubmit={onSubmit}>
                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="natureBusiness">Nature of Business</label>
                                        <input
                                            type="text"
                                            id="natureBusiness"
                                            className="form-control form-control-m"
                                            value={kycApplication.natureBusiness?kycApplication.natureBusiness:''}
                                            disabled
                                        />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="srcFunds">Source of Funds</label>
                                        <input
                                            type="text"
                                            id="srcFunds"
                                            className="form-control form-control-m"
                                            value={kycApplication.srcFunds?kycApplication.srcFunds:''}
                                            disabled
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={6} >
                                    <div className="form-group">
                                        <label>ID/Passport Document</label>
                                        <Card onClick={() => onShowImage([{uri:"https://res.cloudinary.com/demo/image/upload/example_pdf.pdf"}])}>
                                            <div className="fa fa-file" style={{fontSize: "100px", textAlign: "center", padding: "15px", cursor: "pointer"}}></div>
                                        </Card>
                                    </div>
                                </Col>
                                {/* <Col xs={6} md={6}>
                                    <div className="form-group">
                                        <label htmlFor="registrationNumber">Registration Number</label>
                                        <input
                                            type="text"
                                            id="registrationNumber"
                                            className="form-control form-control-m"
                                            value={"N100P900"}
                                            disabled
                                        />
                                    </div>
                                </Col> */}
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}