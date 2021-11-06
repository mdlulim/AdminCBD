import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col, CardTitle, Button, ButtonGroup } from 'reactstrap';
import { KYCService } from '../../providers';
import LevelZero from './levelZero';
import LevelOne from './levelOne';
import LevelTwo from './levelTwo';
import LevelThree from './levelThree';
import ViewModal from './viewModal';
import RejectLevelModal from './rejectLevelModal';

// styles
const customStyles = {

    headCells: {
        style: {
            color: 'rgba(0,0,0,.54)',
            paddingLeft: '18px', // override the cell padding for head cells
            paddingRight: '18px',
        },
    },
    cells: {
        style: {
            paddingLeft: '18px', // override the cell padding for data cells
            paddingRight: '18px',
        },
    },
};

const iconPadding = {
    paddingRight: '3px',
}
const inputWith = {
    width: '20%'
}

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



export default function Leads(props) {
    const [kycDetails, setKYC] = useState([]);
    const [showImage, setShowImage] = useState(false);
    const [showReason, setShowReason] = useState(false);
    const [clickedDoc, setDocument] = useState([]);

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
                    <LevelOne />
                    <LevelTwo />
                    <LevelThree />
                </Col>
            </Row>
        </>
    );
}