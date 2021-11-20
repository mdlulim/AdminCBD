import React from 'react';
import { Button } from 'reactstrap';
import useForm from 'react-hook-form';
import { Modal } from 'react-bootstrap';


export default function RejectLevelModal(props) {
    const { show, setShow, approvalList, setApprovalList, rejectObj } = props;
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        //controls color of rejected button after submission
        const buttonCB = rejectObj.setLevel;
        const levelData = rejectObj.levelData;
        delete rejectObj.setLevel;
        delete rejectObj.levelData;
        buttonCB({...levelData, status: 'Rejected'});

        const prevApprovalList = approvalList;
        rejectObj.reason = data.rejectionReason;
        const level = rejectObj.level
        delete rejectObj.level
        prevApprovalList[level] = rejectObj;
        setApprovalList(prevApprovalList)


        handleClose();
    }

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="rejectionReason">Provide reason</label>
                        <textarea
                            ref={register({ required: true })}
                            name="rejectionReason"
                            className="form-control form-control-m"
                        ></textarea>
                    </div>

                    <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button color="danger" onClick={handleClose}>Cancel</Button>
                        <input type="submit" className="btn btn-success" />
                    </div>

                </form>
            </Modal.Body>
        </Modal>
    );
}