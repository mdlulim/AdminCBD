import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col, CardTitle, Button, ButtonGroup } from 'reactstrap';
import { KYCService } from '../../providers';
import { Modal } from 'react-bootstrap';

export default function RejectLevelModal(props) {
    const { show, setShow, levelData } = props;
    useMemo(() => {
    }, []);

    //calls kyc service to reject level
    function rejectLevel() {
        // KYCService.updateKYC(levelData).then((res)=>{

        // })
        handleClose();
    }
    
    const onSubmit = (event) => {
        event.preventDefault();
        // setDisabled(true);
        // setError('');
    }

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="rejectionReason">Provide reason</label>
                        <textarea
                            id="rejectionReason"
                            className="form-control form-control-m"
                        ></textarea>
                    </div>

                    <div className="form-group" style={{display: 'flex', justifyContent:'space-between'}}>
                        <Button color="danger" onClick={handleClose}>Cancel</Button>
                        <Button color="success" onClick={rejectLevel}>Submit</Button>
                    </div>

                </form>
            </Modal.Body>
        </Modal>
    );
}