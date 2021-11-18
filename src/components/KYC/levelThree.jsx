import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col, CardTitle, Button, ButtonGroup } from 'reactstrap';


export default function Levelhree(props) {
    const { approveLevel, kycApplication, setKycApplication } = props;
    const [show, setShow] = useState(false);
    const [clickedDoc, setDocument] = useState({});
    const [active, setActiveState] = useState(null);


    const onShowImage = (image) => {
        props.showImage(image);
    }


    return (
        <Row style={{ marginBottom: "20px", borderBottom: "1px solid gainsboro" }}>
            <Col>
                <Row>
                    <Col md={6}>
                        <h4>Level 3</h4>
                    </Col>
                    <Col md={6}>
                    <form>
                       <ButtonGroup size="sm" style={{ display: "flex", justifyContent: "end" }}>
                            <Button
                                color="primary"
                                onClick={()=>{setActiveState(0); approveLevel({ level: 3, status: true })}}
                                className={`${kycApplication.status === 'Approved'?'active':''}`}
                            >
                                Approve
                            </Button>
                            <Button
                                color="primary"
                                onClick={()=>{setActiveState(1); approveLevel({ level: 3, status: false, setLevel: setKycApplication, levelData: kycApplication })}}
                                className={`${kycApplication.status === 'Rejected'?'active':''}`}
                            >
                                Decline
                            </Button>
                        </ButtonGroup>
                       </form>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={6} >
                        <div className="form-group">
                            <label>Proof of Address</label>
                            <Card onClick={() => onShowImage([{uri: "https://res.cloudinary.com/demo/image/upload/example_pdf.pdf"}])}>
                                <div className="fa fa-file" style={{fontSize: "100px", textAlign: "center", padding: "15px", cursor: "pointer"}}></div>
                            </Card>
                        </div>
                    </Col>
                    {/* <Col xs={6} md={6}>
                        <div className="form-group">
                            <label>Certificate of Incorporation</label>
                            <Card onClick={() => onShowImage("holder.js/171x180")}>
                                <Image src="holder.js/171x180" roundedCircle />
                            </Card>
                        </div>
                    </Col> */}
                </Row>
            </Col>
        </Row>
    );
}