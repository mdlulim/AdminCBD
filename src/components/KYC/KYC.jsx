import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col, CardTitle, Button, ButtonGroup } from 'reactstrap';
import { KYCService } from '../../providers';
import LevelZero from './levelZero';
import LevelOne from './levelOne';
import LevelTwo from './levelTwo';
import LevelThree from './levelThree';
import ViewModal from './viewModal';
import RejectLevelModal from './rejectLevelModal';



export default function Leads(props) {
    const {member} = props;
    const [kycDetails, setKYC] = useState([]);
    const [showImage, setShowImage] = useState(false);
    const [showReason, setShowReason] = useState(false);
    const [clickedDoc, setDocument] = useState([]);

    console.log(member, "member")
    useMemo(() => {
        KYCService.getKYC("0192c293-fc26-47f0-a764-332b44dd08b1").then((res) => {
            if (!(res.data.success)) {
                //request failed, give user feedback
            } else {
                setKYC(res.data.data.results)
            }
            // setKYC(res.data.data.results);
        });
    }, []);

    //calls kyc service to approve kyc level
    const approveLevelCB = (action) => {
        if(action){
            KYCService.updateKYC("", { action }).then((res) => {
                if (!(res.data.success)) {
                    //request failed, give user feedback
                } else {
                    setKYC(res.data.data.results)
                }
                // setKYC(res.data.data.results);
            });
        }else{
            setShowReason(true);
        }
    }

    const showImageCB = (image) => {
        setDocument(image)
        setShowImage(true);
    }


    return (
        <>
            <Row>
                <Col md={8}>
                    <RejectLevelModal show={ showReason } setShow={setShowReason} />
                    <ViewModal show={showImage} setShow={setShowImage} document={clickedDoc} />
                    <LevelZero approveLevel={ approveLevelCB } showImage={ showImageCB }/>
                    <LevelOne approveLevel={ approveLevelCB }/>
                    <LevelTwo approveLevel={ approveLevelCB } showImage={ showImageCB }/>
                    <LevelThree approveLevel={ approveLevelCB } showImage={ showImageCB }/>
                </Col>
            </Row>
        </>
    );
}