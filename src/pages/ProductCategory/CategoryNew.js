import React, {useState} from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { Products } from 'components';

const CreateCategory = props => {
    const breadcrumb = { heading: "Product Category" };
    const [disabled, setDisabled] = useState(false);
    const [processing, setProcessing] = useState('');
    
    const onSubmit = (event) => {
    }
	return (
		<AuthLayout {...props}
		breadcrumb={{ active: "Category" }}
		pageHeading={{
			title: 'Create Category',
			caption: 'EXPLORE OVERVIEW CATEGORIES FOR CRYPTO BASED INNOVATION'
		}}>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
				<Col md={12}>
                <form onSubmit={onSubmit}>
                <div className="row g-3">
                    <div className="col">
                    <label for="inputEmail4" class="form-label">Specify reciepent by name or refferal</label>
                    </div>
                    <div className="col">
                    <label for="inputEmail4" class="form-label">Select Transaction Type</label>
                    <label for="inputEmail4" className="form-label">Enter CBI amount</label>
                    <div className="input-group">
                        <input type="text"
                        className="form-control"
                        id="autoSizingInputGroup"
                    />
                    </div>
                    <label for="inputEmail4" className="form-label">Note</label>
                    <div className="input-group">
                    <textarea
                          type="text"
                          id="reason"
                          name="reason"
                          className="form-control form-control-m"
                      />
                    </div>
                    </div>
                </div>
                <hr/>
                <button
                className="btn btn-primary"
                disabled={disabled}>
                            {processing ? 'Processing...' : 'SUBMIT QUEST'}
                        </button>
                </form>
                </Col>
				</Col>
			</Row>
		</AuthLayout>
	);
};

export default CreateCategory;
