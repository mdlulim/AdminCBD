import React, { useState} from 'react';
import { Col, Row } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { UserService, FileStorageProvider } from 'providers';

export default function EditProfile(props) {
    const { show, setShow, id, first_name, last_name, mobile, email,} = props;
    const [ error, setError] = useState('');
    const [ success, setSuccess] = useState('');
    const [ uploadedImage, setUploadedImage] = useState('');
    const handleClose = () => {
        setShow(false)
        window.location = '/profile';
    };

    async function  onFileChange(event){
        setUploadedImage({ selectedFile: event.target.files[0] });

    };

      async function  uploadProfileImage(){
        const selectedFile = uploadedImage.selectedFile;
       
        if (selectedFile) {
            const ext = selectedFile.type.split('/')[1];
            console.log(ext)
            
            const { success, filename } = await FileStorageProvider.upload('admin', 'profile', selectedFile, Date.now() + '.' + ext);
            if (!success) {
                setError("Failed to upload address docs", true);
                throw true;
            }
         }
    }

    async function  onSubmit(event){
        event.preventDefault();
        const form = event.currentTarget;
        const data = {
            first_name  : form.first_name.value ? form.first_name.value : first_name,
            last_name   : form.last_name.value ? form.last_name.value : last_name,
            mobile      : form.mobile.value ? form.mobile.value: mobile,
        }

        const result = await UserService.updateUser(id, data);
        if(result.success){
            setSuccess('User was successfully modified');
            setError('');
        }else{
            setSuccess('');
            setError(result.message);
        }
    }

    return (
        <Modal show={show} onHide={handleClose} centered className="confirm-modal" size="lg">
            <Modal.Header closeButton>
                <h4 className="modal-title">
                    Edit your profile
                </h4>
            </Modal.Header>
            <Modal.Body>
                <form id="change-password-form" onSubmit={onSubmit}>
                    <Row>
                    <Col xs={12}>
                    { error ?
                        <div className="alert alert-warning" role="alert" >
                        {error}
                        </div>: ''}

                        { success ?
                        <div className="alert alert-success" role="alert" >
                        {success}
                        </div>: ''}
                        </Col>
                        <Col xs={9}>
                            <p className="text-muted margin-bottom-20">
                                Use form below to update your profile. The email address and username are used
                                for your login access, and should you need to update please contact your
                                system administrator.
                            </p>
                            <div className="form-group">
                                <label>First name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    className="form-control"
                                    placeholder="Enter your first name"
                                    defaultValue={first_name}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    className="form-control"
                                    placeholder="Enter your last name"
                                    defaultValue={last_name}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    defaultValue={email}
                                    readOnly
                                /> 
                            </div>
                            <div className="form-group">
                                <label>Phone number</label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    className="form-control"
                                    placeholder="Enter your mobile number (optional)"
                                    defaultValue={mobile}
                                /> 
                            </div>
                        </Col> 
                        <Col xs={3}>
                            <h5>Profile Photo</h5>
                            <div className="user user--huge">
                                <a href="#" className="user__button w-100 h-120px lh-120px">
                                    <span className="fa fa-plus" />
                                </a>
                            </div>
                            <input type="file" onChange={onFileChange} />
                            <button
                                type="button"
                                className="btn btn-light btn-block margin-top-10"
                                onClick={uploadProfileImage}
                            >
                                Upload Photo
                            </button>
                        </Col>
                    </Row>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-light" onClick={handleClose}>Close</button>
                <button
                    type="submit"
                    className="btn btn-secondary"
                    form="change-password-form"
                >
                    Save Changes
                </button>
            </Modal.Footer>
        </Modal>
    );
}
