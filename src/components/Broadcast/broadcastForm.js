import React, { useState, useMemo } from 'react';
import { Col, Row, CardBody } from 'reactstrap';
import useForm from 'react-hook-form';
import { BroadcastService, FileStorageProvider } from '../../providers';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from 'draft-convert';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import FileUpload from '../FileUpload'
import Select from 'react-select';

const broadcastAlert = (success, error_msg=null) => {
    if (success) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Request processed successfully!',
            showConfirmButton: false,
            timer: 4000
        });
        
        return setTimeout(() => {window.location = '/broadcast';}, 4000);
    }
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: error_msg?error_msg:'Failed to process request, please try again!',
        showConfirmButton: false,
        timer: 4000
    });
}

const NavTabLink = ({
    id,
    name,
    title,
    active,
    setActiveTab,
}) => (
    <li className="nav-item">
        <a
            role="tab"
            id={`tab-${id}`}
            data-toggle="tab"
            href={`#tab-${id}`}
            aria-controls={name}
            aria-selected={active}
            className={`nav-link text-bold ${active ? 'active show' : ''}`}
            onClick={e => {
                setActiveTab(id);
                e.preventDefault();
            }}
        >
            {title}
        </a>
    </li>
);

const NavTabContent = props => {
    const { active } = props;

    return (
        <div className={`tab-pane fade ${active ? 'active show' : ''}`}>
            {props.children}
        </div>
    );
}

const BroadcastForm = props => {
    const {
        setPageLoading,
        id,
    } = props;

    const { handleSubmit, register, errors } = useForm()
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [activeTab, setActiveTab] = useState('text');
    const [files, setFiles] = useState([])
    const [fileNotSelected, setFileNotSelected] = useState(false);
    const [audience, setAudience] = useState([]);
    const [broadcast, setBroadcast] = useState(null)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedAudience, setSelectedAudience] = useState([])
    const [selectedImage, setSelectedImage] = useState(null)

    useMemo(() => {
        if (id) {
            BroadcastService.get(id)
                .then(res => {
                    setBroadcast(res.results[0])
                    setStartDate(new Date(res.results[0].published))
                    setEndDate(new Date(res.results[0].expiry))
                    setSelectedStatus(res.results[0].status)
                    const selectedAudience = res.results[0].audience.map(item => ({ label: item.label, value: item.id }))
                    setSelectedAudience(selectedAudience)
                    if (res.results[0].body) {
                        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(res.results[0].body))))
                    } else {
                        setSelectedImage(res.results[0].image)
                        setActiveTab('image')
                    }
                    return BroadcastService.getAudience()
                }).then(res => {
                    setAudience(res.results)
                    setPageLoading(false)
                })
        } else {
            BroadcastService.getAudience()
                .then(res => {
                    setAudience(res.results)
                    setPageLoading(false)
                })
        }


    }, [id])

    const onSubmit = async (data) => {
        setPageLoading(true)
        data.published = startDate
        data.expiry = endDate

        data.status = selectedStatus
        data.audience = selectedAudience.map(item => item.value)

        if (activeTab === 'image') {
            if (files.length > 0) {
                const ext = files[0].type.split('/')[1];
                const { success, filename } = await FileStorageProvider.upload('admin', 'broadcast', files[0], Date.now() + '.' + ext);
                if (success) {
                    data.image = filename
                    data.body = null
                } else {
                    setPageLoading(false)
                    broadcastAlert(false, "Failed to upload image")
                }
            } else {
                //user did not update image so remove key to not override db value
                if (id) {
                    delete data.image
                } else {
                    setPageLoading(false)
                    return
                }
            }

        } else {
            data.body = convertToHTML(editorState.getCurrentContent())
            data.image = null
        }

        if (id) {
            //user is editing a broadcast message
            BroadcastService.update(id, data)
                .then((res) => {
                    setPageLoading(false)
                    broadcastAlert(res.success)
                }).catch(err => {
                    setPageLoading(false)
                    broadcastAlert(false)
                })

        } else {
            BroadcastService.create(data)
                .then((res) => {
                    setPageLoading(false)
                    broadcastAlert(res.data.success)
                }).catch(err => {
                    setPageLoading(false)
                    broadcastAlert(false)
                })
        }

    }

    const statusOptions = [
        { value: 'Published', label: 'Published' },
        { value: 'Draft', label: 'Draft' },
        { value: 'Archived', label: 'Archived' },
    ];

    const onEditorStateChange = editorState => {
        setEditorState(editorState);
    };

    return (
        <div>
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                noValidate 
            >
                <Row>
                    <Col md={12}>
                        <div className="form-group">
                            <label htmlFor="title" className="form-control-label">
                                Title
                            </label>
                            <input 
                                type="text" 
                                name='title'
                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                ref={register({ required: { value: true, message: '*Field is required'} })}  
                                defaultValue={broadcast && broadcast.title ? broadcast.title : null} 
                                className='form-control' 
                            />
                            { errors.title && <span className="text-danger">{errors.title.message}</span> }
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div className="form-group">
                            <label htmlFor="summary" className="form-control-label">
                                Summary
                            </label>
                            <input 
                                type="text" 
                                name='summary'
                                className={`form-control ${errors.summary ? 'is-invalid' : ''}`}
                                ref={register({ required: { value: true, message: '*Field is required'} })} 
                                defaultValue={broadcast && broadcast.summary ? broadcast.summary : ''} 
                                className='form-control' 
                            />
                            { errors.summary && <span className="text-danger">{errors.summary.message}</span> }
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <div className="form-group">
                            <label htmlFor="published" className="form-control-label">
                                Publish Date
                            </label>
                            <DatePicker className={`form-control form-control-m`} minDate={new Date()} selected={startDate ? startDate : new Date()} onChange={(date) => setStartDate(date)} />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="form-group">
                            <label htmlFor="expiry" className="form-control-label">
                                Expiration Date
                            </label>
                            <DatePicker className={`form-control form-control-m`} minDate={new Date()} selected={endDate ? endDate : new Date()} onChange={(date) => setEndDate(date)} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <div className="form-group">
                            <label htmlFor="audience" className="form-control-label">
                                Audience
                            </label>
                            <Select
                                id="audience"
                                name="audience"
                                value={selectedAudience ? selectedAudience : []}
                                options={audience ? audience.map(item => ({ label: item.label, value: item.id })) : []}
                                isMulti
                                onChange={selectedOptions => setSelectedAudience(selectedOptions)}
                                className={`basic-multi-select form-control-m`}
                                classNamePrefix="select"
                            />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="form-group">
                            <label htmlFor="status" className="form-control-label">
                                Status
                            </label>
                            <Select
                                id="status"
                                name="status"
                                value={selectedStatus ? statusOptions.filter(option => option.label === selectedStatus) : ''}
                                options={statusOptions}
                                onChange={item => setSelectedStatus(item.value)}
                                className={`basic-multi-select form-control-m`}
                                classNamePrefix="select"
                            />
                        </div>
                    </Col>
                </Row>
                <h5>Choose either an image or text to upload</h5>
                <ul className="nav nav-tabs margin-top-20" id="myTab" role="tablist">
                    <NavTabLink
                        id="text"
                        name="text"
                        title="Text"
                        setActiveTab={setActiveTab}
                        active={activeTab === 'text'}
                    />
                    <NavTabLink
                        id="image"
                        name="image"
                        title="Image"
                        setActiveTab={setActiveTab}
                        active={activeTab === 'image'}
                    />
                </ul>
                <CardBody>
                    <div className="tab-content" id="text">
                        <NavTabContent
                            id="text"
                            name="text"
                            title="Text"
                            active={activeTab === 'text'}
                        >

                            <Row>
                                <Col md={12}>
                                    <div className="form-group" style={{ minHeight: '200px' }}>
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
                                    </div>
                                </Col>
                            </Row>
                        </NavTabContent>
                        <NavTabContent
                            id="image"
                            name="image"
                            title="Image"
                            active={activeTab === 'image'}
                        >
                            <Col xs={12} className="py-4">
                                {
                                    selectedImage ?
                                        <>
                                            <span className='fa fa-trash-o btn btn-danger' style={{ cursor: 'pointer' }} onClick={() => { setSelectedImage(null); }}></span><br />
                                            <img style={{ maxWidth: '100%' }} src={'https://cdn-cbigold.ams3.digitaloceanspaces.com/' + selectedImage} alt="prof" />
                                        </>
                                        : ''

                                }
                                <div style={{ display: selectedImage ? 'none' : '' }}>
                                    <FileUpload
                                        fileNotSelected={fileNotSelected}
                                        files={files}
                                        setFiles={setFiles}
                                        toastBody="File has been selected, please submit to process the file and transaction."
                                    />
                                </div>
                            </Col>
                        </NavTabContent>
                    </div>
                </CardBody>
                <Row>
                    <Col>
                        <button className="btn btn-primary btn-rounded float-right">
                            Save
                        </button>
                    </Col>
                </Row>
            </form>
        </div>
    );
};

export default BroadcastForm;
