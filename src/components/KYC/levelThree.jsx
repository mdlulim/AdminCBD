import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col, CardTitle, Button, ButtonGroup } from 'reactstrap';

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

export default function Levelhree(props) {
    const [show, setShow] = useState(false);
    const [clickedDoc, setDocument] = useState({});
    const { approveLevel } = props;

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
                        <ButtonGroup size="sm" align="right">
                            <Button color="success" onClick={() => approveLevel({level: 3, status: true})}>Approve</Button>
                            <Button color="danger" onClick={() => approveLevel({level: 3, status: false})}>Decline</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={6} >
                        <div className="form-group">
                            <label>Proof of Address</label>
                            <Card onClick={() => onShowImage("holder.js/171x180")}>
                                <Image src="holder.js/171x180" roundedCircle />
                            </Card>
                        </div>
                    </Col>
                    <Col xs={6} md={6}>
                        <div className="form-group">
                            <label>Certificate of Incorporation</label>
                            <Card onClick={() => onShowImage("holder.js/171x180")}>
                                <Image src="holder.js/171x180" roundedCircle />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}