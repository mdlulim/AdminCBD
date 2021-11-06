import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col, CardTitle, Button, ButtonGroup } from 'reactstrap';
import { KYCService } from '../../providers';
import ViewModal from './viewModal';


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

export default function LevelTwo(props) {
    const [show, setShow] = useState(false);
    const [clickedDoc, setDocument] = useState({});

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
                        <h4>Level 2</h4>
                    </Col>
                    <Col md={6}>
                        <ButtonGroup size="sm" align="right">
                            <Button color="success">Approve</Button>
                            <Button color="danger">Decline</Button>
                        </ButtonGroup>
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
                                            value={"Speculative"}
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
                                            value={"Savings"}
                                            disabled
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={6}>
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
                                </Col>
                                <Col xs={6} md={6} >
                                    <div className="form-group">
                                        <label>ID/Passport Document</label>
                                        <Card onClick={() => setShow(true)}>
                                            <Image src="holder.js/171x180" roundedCircle />
                                        </Card>
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