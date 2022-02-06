import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import useForm from 'react-hook-form';
import { BroadcastService } from '../../providers';
import { EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from 'draft-convert';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';

const broadcastAlert = (success) => {
    if (success) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Request processed successfully!',
            showConfirmButton: false,
            timer: 3000
        });
        window.location.reload();
        return
    }
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Failed to process request, please try again!',
        showConfirmButton: false,
        timer: 4000
    });
}
const BroadcastModal = props => {
    const {
        setShow,
        show,
        broadcast,
        audience,
    } = props;

    const { handleSubmit, register } = useForm()
    const [loading, setLoading] = useState(false)
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const onSubmit = (data) => {
        setLoading(true)
        data.body = convertToHTML(editorState.getCurrentContent())
        data.published = startDate
        data.expiry = endDate

        if (broadcast && broadcast.id) {
            //user is editing a broadcast message
            // BroadcastService.update(broadcast.id, data)
            //     .then((res) => {
            //         setLoading(false)
            //         setShow(false)
            // broadcastAlert(res.data.success)
            //     }).catch(err => {
            //         setLoading(false)
            // broadcastAlert(false)
            //     })

        } else {
            BroadcastService.create(data)
                .then((res) => {
                    setLoading(false)
                    setShow(false)
                    broadcastAlert(res.data.success)
                }).catch(err => {
                    setLoading(false)
                    broadcastAlert(false)
                })
        }

    }


    const handleClose = () => {
        setShow(false);
    };

    const onEditorStateChange = editorState => {
        setEditorState(editorState);
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered className="confirm-modal">
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col>
                            <h2>Broadcast message</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="form-group">
                                <label htmlFor="title" className="form-control-label">
                                    Title
                                </label>
                                <input type="text" ref={register} name='title' defaultValue={broadcast && broadcast.title ? broadcast.title : ''} className='form-control' />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="form-group">
                                <label htmlFor="summary" className="form-control-label">
                                    Summary
                                </label>
                                <input type="text" ref={register} name='summary' defaultValue={broadcast && broadcast.summary ? broadcast.summary : ''} className='form-control' />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="form-group" style={{ minHeight: '300px' }}>
                                <label htmlFor="body" className="form-control-label">
                                    Body
                                </label>
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={onEditorStateChange}
                                    defaultContentState={'<p>Text</p>'}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <div className="form-group">
                                <label htmlFor="published" className="form-control-label">
                                    Publish Date
                                </label>
                                <DatePicker className={`form-control form-control-m`} selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group">
                                <label htmlFor="expiry" className="form-control-label">
                                    Expiration Date
                                </label>
                                <DatePicker className={`form-control form-control-m`} selected={endDate} onChange={(date) => setEndDate(date)} />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <div className="form-group">
                                <label htmlFor="audience" className="form-control-label">
                                    Audience
                                </label>

                                <select ref={register} name='audience' multiple className='form-control'>
                                    {
                                        audience.map((item) => {
                                            return <option key={item.id} selected={(broadcast && broadcast.audience && broadcast.audience.includes(item.id)) ? true : false} value={item.id}>{item.label}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group">
                                <label htmlFor="status" className="form-control-label">
                                    Status
                                </label>

                                {/* defaultValue={broadcast && broadcast.status ? broadcast.status : ''} */}
                                <select ref={register} name='status' className='form-control' >
                                    <option value="Published">Published</option>
                                    <option value="Draft">Draft</option>
                                    <option value="Archived">Archived</option>
                                </select>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button disabled={loading} className="btn btn-primary btn-rounded float-right">
                                {loading ? 'Processing...' : 'Save'}
                            </button>
                        </Col>
                    </Row>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default BroadcastModal;
