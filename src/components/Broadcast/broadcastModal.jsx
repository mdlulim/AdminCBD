import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import useForm from 'react-hook-form';
import { BroadcastService } from '../../providers';
import { EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from 'draft-convert';

const BroadcastModal = props => {
    const {
        setShow,
        show,
        broadcast,
        setPageLoading

    } = props;

    const { handleSubmit, register } = useForm()
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onSubmit = (data) => {
        setPageLoading(true)
        data.body = convertToHTML(editorState.getCurrentContent())

        if (broadcast && broadcast.id) {
            //user is editing a broadcast message
            console.log(data, ' editing')
            data.audience = ['0caf5844-f5b8-4491-beb6-1132db1d7ffb,c85ef2f9-d1dc-451d-b36d-9f0b111c1882']
            BroadcastService.update(data)
                .then((res) => {
                    console.log(res)
                    setPageLoading(false)
                }).catch(err => {
                    console.log(err)
                    setPageLoading(false)
                })

        } else {
            console.log(data, ' creating')
            data.audience = ['0caf5844-f5b8-4491-beb6-1132db1d7ffb,c85ef2f9-d1dc-451d-b36d-9f0b111c1882']
            BroadcastService.create(data)
                .then((res) => {
                    console.log(res)
                    setPageLoading(false)
                }).catch(err => {
                    console.log(err)
                    setPageLoading(false)
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
        <Modal show={show} onHide={handleClose} centered className="confirm-modal">
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
                            <div className="form-group">
                                <label htmlFor="body" className="form-control-label">
                                    Body
                                </label>
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={onEditorStateChange}
                                />
                                {/* <textarea ref={register} name='body' defaultValue={broadcast && broadcast.body?broadcast.body:''} className='form-control' /> */}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <div className="form-group">
                                <label htmlFor="expiry" className="form-control-label">
                                    Expiration Date
                                </label>
                                <input type="date" ref={register} name='expiry' defaultValue={broadcast && broadcast.expiry ? broadcast.expiry : ''} className='form-control' />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group">
                                <label htmlFor="published" className="form-control-label">
                                    Publish Date
                                </label>
                                <input type="date" ref={register} name='expiry' defaultValue={broadcast && broadcast.expiry ? broadcast.expiry : ''} className='form-control' />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <div className="form-group">
                                <label htmlFor="audience" className="form-control-label">
                                    Audience
                                </label>
                                <input type="text" ref={register} name='audience' defaultValue={''} className='form-control' />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group">
                                <label htmlFor="status" className="form-control-label">
                                    Status
                                </label>

                                <select ref={register} name='status' defaultValue={broadcast && broadcast.status ? broadcast.status : ''} className='form-control' >
                                    <option value="Published">Published</option>
                                    <option value="Draft">Draft</option>
                                    <option value="Archived">Archived</option>
                                </select>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button className="btn btn-primary btn-rounded float-right">
                                Save
                            </button>
                        </Col>
                    </Row>
                </form>
            </Modal.Body>
        </Modal>
    );
};

BroadcastModal.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    title: PropTypes.string,
    body: PropTypes.any,
    type: PropTypes.string,
    callback: PropTypes.func,
    confirmButton: PropTypes.shape({}),
    cancelButton: PropTypes.shape({}),
    closeButtonText: PropTypes.string,
};

BroadcastModal.defaultProps = {
    title: 'Alert',
    body: <p />,
    type: 'warning',
    callback: null,
    closeButtonText: 'OK',
};

export default BroadcastModal;
