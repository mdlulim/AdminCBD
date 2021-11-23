import React, { useState, useMemo } from 'react';
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
    const { member, kycDetails, address } = props;
    const [showImage, setShowImage] = useState(false);
    const [showReason, setShowReason] = useState(false);
    const [kycDocuments, setDocument] = useState([]);
    const [approvalList, setApprovalList] = useState({});
    const [rejectObj, setRejectedObj] = useState({});
    const [sumbitting, setSubmitting] = useState(false);
    const [hasKYC, setHasKYC] = useState({status: false, msg: "Loading..."})
    const [level_0, setLevel_0] = useState({});
    const [level_1, setLevel_1] = useState({});
    const [level_2, setLevel_2] = useState({});
    const [level_3, setLevel_3] = useState({});


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
            rejected_docs,
            last_name: member.last_name,
            email: member.email,
            user_id: kycDetails[0].user_id
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
            if (data && data.length) {
                setHasKYC({status:true, msg: ''})
                data.map((row) => {
                    if (row.level === '0') {
                        setLevel_0({ selfie: row.data.path, email: member.email, status: row.status });
                    } else if (row.level === '1') {
                        setLevel_1({
                            fullname: member.first_name + " " + member.last_name,
                            address: '',
                            contact: member.mobile,
                            id_number: row.data.identityNumber,
                            status: row.status
                        })

                    } else if (row.level === '2') {
                        setLevel_2({
                            businessNature: row.data.businessNature,
                            srcFunds: row.data.srcFunds,
                            id_document: row.data.path,
                            status: row.status
                        })

                    } else if (row.level === '3') {
                        setLevel_3({
                            poa: row.data.path,
                            status: row.status
                        })
                    }
                })
            }else{
                setHasKYC({status:false, msg: "Has not KYC'd"})
            }
        }

        getKYC()
    }, [member])

 //   console.log(kycApplication.level_0, "############\n", { ...kycApplication.level_0 }, 'ksafkljl \n', kycApplication)
    const showImageCB = (image) => {
        setDocument(image)
        setShowImage(true);
    }

    return (
        <>
            <Row>
                {hasKYC.status?
                <Col md={8}>
                    <RejectLevelModal show={showReason} setShow={setShowReason} approvalList={approvalList} setApprovalList={setApprovalList} rejectObj={rejectObj} setRejectedObj={setRejectedObj} />
                    <ViewModal show={showImage} setShow={setShowImage} kycDocuments={kycDocuments} kycDetails={kycDetails} />
                    <LevelZero approveLevel={approveLevelCB} showImage={showImageCB} kycApplication={level_0} setKycApplication={setLevel_0} />
                    <LevelOne approveLevel={approveLevelCB} kycApplication={level_1} setKycApplication={setLevel_1} address={address} />
                    <LevelTwo approveLevel={approveLevelCB} showImage={showImageCB} kycApplication={level_2} setKycApplication={setLevel_2} />
                    <LevelThree approveLevel={approveLevelCB} showImage={showImageCB} kycApplication={level_3} setKycApplication={setLevel_3} />
                    <div style={{ textAlign: "right" }}>
                        <Button color="success" disabled={sumbitting} onClick={() => saveChanges()}>Save</Button>
                    </div>
                </Col>
                :
                <Col>
                    <h4 style={{textAlign: "center", color: 'gainsboro'}}>{hasKYC.msg}</h4>
                </Col>
                }
            </Row>
        </>
    );
}