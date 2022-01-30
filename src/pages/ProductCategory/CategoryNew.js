import React, {useState, useMemo} from 'react';
import { Card, CardBody, Col, Row, Alert } from 'reactstrap';
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
    const [categoeis, setCategories] = useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [selectedFees, setSelectedFees] = useState({});
    const [selectedIndicators, setSelectedIndicators] = useState({});
    const [toggleCleared, setToggleCleared] = React.useState(false);
    
    useState(() => {
        ProductService.getProductCategories().then((res) => {
            console.log(res)
               const productlist = res.results;
               setCategories(productlist);
           });
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
          // console.log(selectedRows)
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

        const titleExist = selectedRows.filter(option => option.value === "title");
        const bodyExist = selectedRows.filter(option => option.value === "body");
        const statusExist = selectedRows.filter(option => option.value === "status");
        const codeExist = selectedRows.filter(option => option.value === "currency_code");

        if (!titleExist.length){
            setError("Please select title is required!")
            setDisabled(false);
            setProcessing(false);
            return error
        }

        if (!bodyExist.length){
            setError("Please select body/description is required!")
            setDisabled(false);
            setProcessing(false);
            return error
        }

        if (!statusExist.length){
            setError("Please select status is required!")
            setDisabled(false);
            setProcessing(false);
            return error
        }

        if (!codeExist.length){
            setError("Please select country code is required!");
            setDisabled(false);
            setProcessing(false);
            return error
        }
        if (!form.title.value && !form.description.value && !form.code.value){
            setError("All input fields are required");
            setDisabled(false);
            setProcessing(false);
            return error
        }
        const title = form.title.value;
        const code = form.code.value;
        let permakeyTitleExist = categoeis.filter(category => category.title.split(' ').join('-').trim().toLowerCase() === title.split(' ').join('-').trim().toLowerCase());
        let permakeyCodeExist = categoeis.filter(category => category.code.split(' ').join('-').trim().toLowerCase() === code.split(' ').join('-').trim().toLowerCase());

        if(permakeyTitleExist[0]){
            setError("Category with this title is already exist!");
            setDisabled(false);
            setProcessing(false);
            return error
        }

        if(permakeyCodeExist[0]){
            setError("Category code is already exist!");
            setDisabled(false);
            setProcessing(false);
            return error
        }

        const data = {
            title       : form.title.value,
            description : form.description.value,
            code        : form.code.value,
            inputFields : {selectedRows},
        }
        ProductService.addProductCategory(data).then((response) =>{
            if(response.status){
                setShow(true);
                confirmAlert({
                    title: 'Confirm submit',
                    message: 'Product category was added successfully',
                    buttons: [
                      {
                        label: 'Yes',
                        onClick: () => {
                            window.location = '/categories/add';
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
			title: 'Create New Category',
			caption: 'EXPLORE OVERVIEW CATEGORIES FOR CRYPTO BASED INNOVATION'
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
                    />
                    </div>
                    <label for="inputEmail4" class="form-label">Category Code</label>
                    <div className="input-group">
                        <input type="text"
                        className="form-control"
                        id="autoSizingInputGroup"
                        name="code"
                    />
                    </div>
                    <label for="inputEmail4" class="form-label">Description</label>
                    <div className="input-group">
                        <input type="text"
                        className="form-control"
                        id="autoSizingInputGroup"
                        name="description"
                    />
                    </div>
                    </div>
                    <div className="col">
                    <DataTable
                        title={'Select Input Fields'}
                        columns={columns}
                        data={inputFields}
                        selectableRows
                        contextActions={contextActions}
                        onSelectedRowsChange={handleRowSelected}
                        clearSelectedRows={toggleCleared}
                        pagination
                        />
                    </div>
                </div>
                <hr/>
                <button
                className="btn btn-primary"
                disabled={disabled}>
                            {processing ? <img src={imageLoader} width="30" height="30" /> : 'SUBMIT QUEST'}
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
