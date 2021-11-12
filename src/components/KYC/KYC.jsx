import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { KYCService } from '../../providers';
import LevelZero from './levelZero';
import LevelOne from './levelOne';
import LevelTwo from './levelTwo';
import LevelThree from './levelThree';
import ViewModal from './viewModal';
import RejectLevelModal from './rejectLevelModal';
import { confirmAlert } from 'react-confirm-alert';
import { MemberService } from '../../providers';


export default function Leads(props) {
    const { member, kycDetails } = props;
    const [showImage, setShowImage] = useState(false);
    const [showReason, setShowReason] = useState(false);
    const [kycDocuments, setDocument] = useState([]);
    const [approvalList, setApprovalList] = useState({});
    const [rejectObj, setRejectedObj] = useState({});
    const [sumbitting, setSubmitting] = useState(false);
    const [kycApplication, setKycApplication] = useState({
        level_0: {
            selfie: '',
            email: ''
        },
        level_1: {
            fullname: '',
            contact: '',
            address: '',
            id_number: ''
        },
        level_2: {
            businessNature: '',
            srcFunds: '',
            id_document: ''
        },
        level_3: {
            poa: ''
        }
    })


    const saveChanges = async () => {
        setSubmitting(true)
        let kyc_level_rejected = 99;
        let rejected_docs = []
        const levels_to_update = Object.keys(approvalList);
        levels_to_update.forEach((level) => {
            if (!approvalList[level].status) {
                rejected_docs.push(approvalList[level].reason)
                delete approvalList[level].reason
            }

            approvalList[level].status = approvalList[level].status ? 'Approved' : 'Rejected'
            approvalList[level].id = kycDetails[level].id;

            if (parseInt(level) < kyc_level_rejected && approvalList[level].status === 'Rejected') {
                kyc_level_rejected = level
            }
        });

        const data_to_send = {
            levels: approvalList,
            kyc: (kyc_level_rejected === 99) ? '3' : (kyc_level_rejected === '0') ? '0' : levels_to_update[levels_to_update.indexOf(kyc_level_rejected) - 1],
            rejected_docs,
            last_name: member.last_name,
            email: member.email
        }


        const res = await KYCService.updateKYC(data_to_send)
        setSubmitting(false)
        if (res.data.success) {
            confirmAlert({
                title: 'Succcess',
                message: 'Documents Reviewed'
            });
            window.location = '/members/members';
            return
        }

        confirmAlert({
            title: 'Failed',
            message: 'Something went wrong, retry later!',
        });
    }

    //appends each level decision to approval list
    const approveLevelCB = (approvalObj) => {
        const prevApprovalList = approvalList;
        approvalObj["verified"] = true;

        if (approvalObj.status) {
            const level = approvalObj.level
            delete approvalObj.level
            prevApprovalList[level] = approvalObj

            setApprovalList(prevApprovalList)
        } else {
            setRejectedObj({ ...approvalObj })
            setShowReason(true)
        }

    }

    useMemo(() => {
        const getKYC = async () => {
            const kyc = await MemberService.getMemberKYC(member.id)
            const data = kyc.data.data
            console.log(data)
            if(data){
                data.map((row)=>{
                    if(row.level === '0'){
                        
                    }else if(row.level === '0'){

                    }else if(row.level === '0'){
                        
                    }else{

                    }
                })
            }
            // kyc.data.data.map(item => {
            //     // const { level, status, verified } = item;
            //     console.log(item, " --->")
            // })
        }

        getKYC()
    }, [member])

    console.log(member.id, ' kk')
    const showImageCB = (image) => {
        setDocument(image)
        setShowImage(true);
    }


    return (
        <>
            <Row>
                <Col md={8}>
                    <RejectLevelModal show={showReason} setShow={setShowReason} approvalList={approvalList} setApprovalList={setApprovalList} rejectObj={rejectObj} setRejectedObj={setRejectedObj} />
                    <ViewModal show={showImage} setShow={setShowImage} kycDocuments={kycDocuments} kycDetails={kycDetails} />
                    <LevelZero approveLevel={approveLevelCB} showImage={showImageCB} member={member} />
                    <LevelOne approveLevel={approveLevelCB} member={member} />
                    <LevelTwo approveLevel={approveLevelCB} showImage={showImageCB} kycDetails={kycDetails} />
                    <LevelThree approveLevel={approveLevelCB} showImage={showImageCB} kycDetails={kycDetails} />
                    <div style={{ textAlign: "right" }}>
                        <Button color="success" disabled={sumbitting} onClick={() => saveChanges()}>Save</Button>
                    </div>
                </Col>
            </Row>
        </>
    );
}