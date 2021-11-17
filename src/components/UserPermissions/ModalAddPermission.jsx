import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { FeatherIcon } from 'components';
import { PagePermissionService } from 'providers';
import { confirmAlert } from 'react-confirm-alert';
import $ from 'jquery';

const AlertModal = props => {
    const {
        title,
        role,
        show,
        type,
        setShow,
        callback,
        processing,
        confirmButtonDisabled, confirmButton,
        closeButtonText,
    } = props;

    let icon = 'edit';
    let iconClass = type;

    if (type === 'error') {
        icon = 'slash';
        iconClass = 'danger';
    }
    if (type === 'success') {
        icon = 'check';
    }

    const onSubmit = async (e) =>{
        e.preventDefault();
        const form = e.currentTarget;

        // alert(form.role_description.value);
        PagePermissionService.addPagePermission(
             {
                page:await form.page_name.value,
                low: $('#low').is(':checked') ? true : false,
                basic: $('#basic').is(':checked') ? true : false,
                medium: $('#medium').is(':checked') ? true : false,
                high: $('#high').is(':checked') ? true : false
             }
        ).then((response) =>{
            console.log(response);
             if(response.data.success){
                 setShow(false)
                 return confirmAlert({
                    title: 'Succcess',
                    message: 'Page Permission was successfully Added',
                    buttons: [
                      {
                        label: 'Ok',
                        onClick:window.location.reload(false)
                      }
                    ]
                  });
             }else{
                //  setError('Something went wrong while trying to update members status');
             }
            // setDisabled(false);
         })
        }

    const handleClose = () => {
        setShow(false);
        if (callback) callback();
    };

    return (
        <Modal show={show} onHide={handleClose} centered className="confirm-modal">
            <Modal.Body>
                <Row>
                    <Col xs={2} className={`text-right mg-t-10 text-info`}>
                        <FeatherIcon icon={icon} width="48" height="48" classes="mg-t-0" />
                    </Col>
                    <Col xs={10}>
                        <h3 className="text-info">Create Page Permission</h3>
                        <hr />
                        <form onSubmit={onSubmit}>
                             <div className="form-group">
                                    <label htmlFor="role">Page Name</label>
                                    <input
                                        type="text"
                                        id="role"
                                        name="page_name"
                                        className="form-control form-control-m"
                                    />
                                </div>

                                <div className="form-group">
                                <table class="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">Basic</th>
                                            <th scope="col">Low</th>
                                            <th scope="col">Medium</th>
                                            <th scope="col">High</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td><input id="low" name="low" type="checkbox" /></td>
                                            <td><input id="basic" name="basic" type="checkbox" /></td>
                                            <td><input id="medium" name="medium" type="checkbox" /></td>
                                            <td><input id="high" name="high" type="checkbox" /></td>
                                        </tr>
                                        </tbody>
                                </table>
                                </div>
                                 
                               
                        
                        <Row>
                        <Col md={6}>
                        <button
                                        className="btn btn-dark"
                                        onClick={handleClose}
                                        disabled={processing}
                                        type = "button"
                                    >
                                    {'Cancel'}
                                </button>
                            </Col>
                            <Col md={6} >
                            <button
                                        className="btn btn-info float-right"
                                        type="submit"
                                        disabled={confirmButtonDisabled || processing}
                                    >
                                    {processing ? 'Processing...' : 'Submit'}
                                </button>
                            </Col>
                            </Row>
                            </form>
                    
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

AlertModal.propTypes = {
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

AlertModal.defaultProps = {
    title: 'Alert',
    body: <p />,
    type: 'warning',
    callback: null,
    closeButtonText: 'OK',
};

export default AlertModal;
