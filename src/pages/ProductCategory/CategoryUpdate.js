import React, {useState, useMemo} from 'react';
import { Card, CardBody, Col, Row, Alert } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom';
import Loader from "react-loader-spinner";
import { AuthLayout } from 'containers';
import { Products } from 'components';
import { confirmAlert } from 'react-confirm-alert';
import { ProductService } from '../../providers';
import DataTable from 'react-data-table-component';
import imageLoader from '../../images/loading-buffering.gif'
import 'react-data-table-component-extensions/dist/index.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const CreateCategory = props => {
    const breadcrumb = { heading: "Product Category" };
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState('');
    const [inputFields, setInputField] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [selectedFees, setSelectedFees] = useState({});
    const [selectedIndicators, setSelectedIndicators] = useState({});
    const [toggleCleared, setToggleCleared] = React.useState(false);
    const params = useParams();
    const { id } = params;

    useState(() => {
        ProductService.getProductCategories().then((res) => {
               const productlist = res.results;
             //  console.log(res)
               setCategories(productlist);
           });
                //Get product category details
        ProductService.getProductCategory(id).then((res) => {
                const category = res.data.data;
                console.log(res.data.data)
                setCategory(res.data.data)
                setSelectedRows(res.data.data.inputFields.selectedRows)
        })
        const inputData = [
                {name: 'Title', value: 'title',required: true, type: "select", group: "field" },
                {name: 'Description', value: 'body',required: true, type: "text", group: "field"},
                {name: 'price', value: 'price', required: false, type: "decimal", group: "field"},
                {name: 'Status', value: 'status', required: false, type: "select", group: "field"},
                {name: 'Currency Code', value: 'currency_code',required: false, type: "select", group: "field"},
                {name: 'registration_fee', value: 'registration_fee', required: false, type: "decimal", group: "fees"},
                {name: 'educator_fee', value: 'educator_fee', required: false, type: "decimal", group: "fees"},
                {name: 'Investment Period (In Weeks)', value: 'investment_period', required: false, type: "decimal", group: "indicators"},
                {name: 'Gross Return', value: 'gross_return', required: false, type: "decimal", group: "indicators"},
                {name: 'Daily Interest', value: 'daily_interest', required: false, type: "decimal", group: "indicators"},
                {name: 'Educator Percentage', value: 'educator_percentage', required: false, type: "decimal", group: "indicators"},
                {name: 'Registration Percentage', value: 'registration_percentage', required: false, type: "decimal", group: "indicators"},
                {name: 'Commission Percentage', value: 'commission_percentage', required: false, type: "decimal", group: "indicators"},
                {name: 'Minimum Investment', value: 'minimum_investment', required: false, type: "decimal", group: "indicators"},
                {name: 'Slippage Percentage Sell', value: 'slippage_percentage_sel', required: false, type: "decimal", group: "indicators"},
                {name: 'Slippage Percentage Buy', value: 'slippage_percentage_buy', required: false, type: "decimal", group: "indicators"},
            ];
            //console.log(inputData.inputs)
            setInputField(inputData);
    });
    const columns = [{
        name: 'Input ID',
        selector: 'value',
        sortable: true,
    },{
        name: 'Title',
        selector: 'name',
        sortable: true,
    },{
      name: 'Input Type',
      selector: 'type',
      sortable: true,
  },{
    name: 'Status',
    selector: 'status',
    sortable: true,
},{
    name: 'group',
    selector: 'group',
    sortable: true,
}];
  const contextActions = React.useMemo(() => {
    const handleBulkUpdate = () => {
    };

    return (
      <button
      className="btn btn-secondary"
      type="button">
          <span className="fa fa-pencil" /> Bulk Update
      </button>
    );
  }, [inputFields, selectedRows, toggleCleared]);
    const onCheckedField = (event) => {
       // const checkedfield = inputFields.filter(field => field.value == event.target.id);
      // console.log(selectedFields)
      // const exist = selectedFields.filter(field => field.value == event.target.id);
       //if(!exist){
      //  setSelectedField(selectedFields, checkedfield[0]);
       //}
    }

    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
        //console.log(state.selectedRows)
      }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        setDisabled(true);
        setProcessing(true);
        setError('');
        const form = event.currentTarget;

        if (!form.title.value && !form.description.value && !form.code.value){
            setError("All input fields are required");
            setDisabled(false);
            setProcessing(false);
            return error
        }
        const title = form.title.value;
        const code = form.code.value;

        const data = {
            title       : form.title.value,
            description : form.description.value,
            code        :form.code.value,
        }
        ProductService.updateProductCategory(id, data).then((response) =>{
            console.log("Test======================")
            console.log(response)
            if(response.status){
                setShow(true);
                confirmAlert({
                    title: 'Confirm submit',
                    message: 'Product category was updated successfully',
                    buttons: [
                      {
                        label: 'Yes',
                        onClick: () => {
                            window.location = `/products/categories/${id}`;
                        }
                      }
                    ]
                  })
            }else{
                setError('Something went wrong please contact administrator');
            }
            setDisabled(false);
            setProcessing(false);
        })
    }

	return (
		<AuthLayout {...props}
		breadcrumb={{ active: "Category" }}
		pageHeading={{
			title: 'Update Category',
			caption: 'EXPLORE OVERVIEW UPDATE CATEGORy FOR CRYPTO BASED INNOVATION'
		}}>
			<Row className="mt-4">
				<Col lg={12} xl={12}>
				<Col md={12}>
                    <Card>
                   {error ? <Alert className="fade alert alert-danger alert-dismissible show" onClose={() => setShow(false)} dismissible>
        <p>
          {error} error
        </p>
      </Alert>: ''}
                        <CardBody>
                <form onSubmit={onSubmit}>
                <div className="row g-3">
                    <div className="col">
                    <label for="inputEmail4" class="form-label">Title</label>
                    <div className="input-group">
                        <input type="text"
                        className="form-control"
                        name="title"
                        id="autoSizingInputGroup"
                        defaultValue={category ? category.title: ''}
                    />
                    </div>
                    <label for="inputEmail4" class="form-label">Category Code</label>
                    <div className="input-group">
                        <input type="text"
                        className="form-control"
                        id="autoSizingInputGroup"
                        name="code"
                        defaultValue={category ? category.code: ''}
                        disabled={true}
                    />
                    </div>
                    <label for="inputEmail4" class="form-label">Description</label>
                    <div className="input-group">
                        <input type="text"
                        className="form-control"
                        id="autoSizingInputGroup"
                        name="description"
                        defaultValue={category ? category.description: ''}
                    />
                    </div>
                    </div>
                    {/* <div className="col">
                    <DataTable
                        title={'Select Input Fields'}
                        columns={columns}
                        data={inputFields}
                        contextActions={contextActions}
                        onSelectedRowsChange={handleRowSelected}
                        on
                        clearSelectedRows={toggleCleared}
                        pagination
                        />
                    </div> */}
                </div>
                <hr/>
                <button
                className="btn btn-primary"
                disabled={disabled}>
                            {processing ? <img src={imageLoader} width="30" height="30" /> : 'UPDATE'}
                        </button>
                </form>
                </CardBody>
                </Card>
                </Col>
				</Col>
			</Row>
		</AuthLayout>
	);
};

export default CreateCategory;
