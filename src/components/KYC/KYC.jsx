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
            email: '',
            status: ''
        },
        level_1: {
            fullname: '',
            contact: '',
            address: '',
            id_number: '',
            status: ''
        },
        level_2: {
            businessNature: '',
            srcFunds: '',
            id_document: '',
            status: ''
        },
        level_3: {
            poa: '',
            status: ''
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
            if (data) {
                data.map((row) => {
                    const data_to_update = kycApplication;
                    if (row.level === '0') {
                        data_to_update.level_0.selfie = row.data.path;
                        data_to_update.level_0.email = member.email;
                        data_to_update.level_0.status = row.status
                    } else if (row.level === '1') {
                        data_to_update.level_1.fullname = member.first_name + " " + member.last_name;
                        data_to_update.level_1.address = ''
                        data_to_update.level_1.contact = member.mobile;
                        data_to_update.level_1.id_number = row.data.identityNumber;
                        data_to_update.level_1.status = row.status
                    } else if (row.level === '2') {
                        data_to_update.level_2.businessNature = row.data.businessNature;
                        data_to_update.level_2.srcFunds = row.data.srcFunds;
                        data_to_update.level_2.id_document = row.data.path;
                        data_to_update.level_2.status = row.status;
                    } else if (row.level === '3') {
                        data_to_update.level_3.poa = row.data.path;
                        data_to_update.level_3.status = row.status;
                    }
                    setKycApplication(data_to_update)
                })
            }
        }

        getKYC()
    }, [member])

    console.log(kycApplication.level_0, "############\n", { ...kycApplication.level_0 }, 'ksafkljl \n', kycApplication)
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
                    <LevelZero approveLevel={approveLevelCB} showImage={showImageCB} kycApplication={kycApplication.level_0} />
                    <LevelOne approveLevel={approveLevelCB} kycApplication={kycApplication.level_1} />
                    <LevelTwo approveLevel={approveLevelCB} showImage={showImageCB} kycApplication={kycApplication.level_2} />
                    <LevelThree approveLevel={approveLevelCB} showImage={showImageCB} kycApplication={kycApplication.level_3} />
                    <div style={{ textAlign: "right" }}>
                        <Button color="success" disabled={sumbitting} onClick={() => saveChanges()}>Save</Button>
                    </div>
                </Col>
            </Row>
        </>
    );
}