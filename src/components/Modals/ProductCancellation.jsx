import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';

export default function ProductCancellationModal(props) {
    const {
        show,
        user,
        setShow,
        product,
        created,
        status,
        income,
        cancellation_date,
        cancellation_approved_by,
    } = props;
    const {
        email,
        last_name,
        first_name,
        referral_id,
    } = user;
    const { product_subcategory, product_code, title, currency_code } = product;
    const { description } = product_subcategory;

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} centered className="confirm-modal" size="lg">
            <Modal.Body>
                <h3>Product Cancellation Request</h3>
                <p className="subtitle margin-bottom-20">
                    Product cancellation request information
                </p>
                <Card className="border-0 margin-bottom-0">
                    <CardBody className="padding-0">
                        <div className="card-inner-container">
                            <div className="form-row">
                                <Col xs={12} md={6} className="margin-top-10 margin-bottom-10">
                                    <span className="text-muted">Requested by</span>
                                    <p>
                                        <strong>{referral_id} - {first_name} {last_name}</strong><br/>
                                        {email}<br/>
                                        Requested on {moment(cancellation_date).format('DD MMM YYYY hh:mma')}<br/>
                                        <strong>Status:</strong> {status}<br/>
                                    </p>
                                </Col>
                                <Col xs={12} md={6} className="margin-top-10 margin-bottom-10 text-right">
                                    <span className="text-muted">Product information</span>
                                    <p>
                                        <strong>{product_code} - {title}</strong><br/>
                                        {description}<br/>
                                        Purchased on {moment(created).format('DD MMM YYYY hh:mma')}<br/>
                                        <CurrencyFormat
                                            thousandSeparator=" "
                                            displayType="text"
                                            value={income || 0}
                                            fixedDecimalScale
                                            decimalScale={4}
                                            renderText={value => (
                                            <>
                                                <strong>Income Amount: </strong> 
                                                {value} {currency_code}
                                            </>)}
                                        />
                                    </p>
                                </Col>
                            </div>
                        </div>
                    </CardBody>
                    {cancellation_approved_by &&
                    <CardBody className="padding-0 padding-top-20">

                    </CardBody>}
                </Card>
                <button
                    className="btn btn-outline-light text-muted"
                    onClick={handleClose}
                >
                    Close
                </button>
            </Modal.Body>
        </Modal>
    );
}
