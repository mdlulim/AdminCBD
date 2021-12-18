import { Card, CardBody, Row, Col } from 'reactstrap';
import { useDropzone } from 'react-dropzone';
import useForm from 'react-hook-form';
import { FileStorageProvider } from 'providers';
import React, { useState, useMemo } from 'react';
import Moment from 'react-moment';
import { useParams, useHistory } from 'react-router-dom';
import { CSVLink } from "react-csv";
import DataTable from 'react-data-table-component';
import { Modal } from 'react-bootstrap';
import ModalChangeStatus from './ModalChangeStatus';
import TransactionDetails from '../Transactions/TransactionDetails';
import ExportToExcel from './ExportToExcel';
import ModalBulkUpdate from './ModalBulkUpdate';
import { TransactionService, SessionProvider } from '../../providers';
import DatePicker from "react-datepicker";
import 'react-data-table-component-extensions/dist/index.css';
import "react-datepicker/dist/react-datepicker.css";
import csvHeaders from 'csv-headers';

export default function Transactions(props) {
  const { handleSubmit, register } = useForm();
  const [batchFile, setFBatchFile] = useState([])
  const [submitBtn, setSubmitBtn] = useState(false)

  const { transactionType } = props;
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const handleClose = () => setShow(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [checkCreatedDate, setCheckCreatedDate] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(false);
  const [adminLevel, setAdminLevel] = useState({});
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [selectedTransPOP, setSelectedTransPOP] = useState('');
  const [showApproveMember, setShowApproveMember] = useState(false);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const params = useParams();
  const { id } = params;

  const inputWith = {
    width: '20%'
  }

  const myButtons = {
    padding: '2px'
  }



  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: 'text/csv',
    onDropRejected: () => alert('Please select a valid file'),
    onDropAccepted: (transactionFile) => {
      setFBatchFile(transactionFile)
    },
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const onSubmit = async (form) => {
    setSubmitBtn(true)
    const ext = batchFile[0].type.split('/')[1];
    const { success, filename } = await FileStorageProvider.batch_upload('batch', form.type, batchFile[0], Date.now() + '.' + ext);
    setSubmitBtn(false)
    if (!success) {
      alert("Failed! Batch File Fail To Upload")
      throw true;
    }
    setFBatchFile([])
    alert("Succeded! Batch File Uploaded")
  }

  useMemo(() => {
    if (SessionProvider.isValid()) {
      const user = SessionProvider.get();
      setAdminLevel(user.permission_level)
    }

    TransactionService.getTransactionBatchFiles().then((res) => {
      const transaList = res.data;

      setTransactions(transaList);
      setFilteredTransactions(transaList);

      // if (id != null && id.length > 15) {
      //   const results = transaList.filter(item => item.id === id);
      //   setTransactions(results);
      //   setFilteredTransactions(results);
      // } else {
      //   if (transactionType === 'all') {
      //     setTransactions(transaList);
      //     setFilteredTransactions(transaList);
      //   } else if (transactionType === 'pending') {
      //     const results = transaList.filter(item => item.status === "Pending");
      //     setTransactions(results);
      //     setFilteredTransactions(results);
      //   }
      //   else if (transactionType === 'cancelled') {
      //     const results = transaList.filter(item => item.status === "Rejected");
      //     setTransactions(results);
      //     setFilteredTransactions(results);
      //   } else if (transactionType === 'completed') {
      //     const results = transaList.filter(item => item.status === "Completed");
      //     setTransactions(results);
      //     setFilteredTransactions(results);
      //   } else if (transactionType === 'deposit') {
      //     const results = transaList.filter(item => item.subtype.toLowerCase() === "deposit");
      //     setTransactions(results);
      //     setFilteredTransactions(results);
      //   } else if (transactionType === 'withdrawals') {
      //     const results = transaList.filter(item => item.subtype.toLowerCase() === "withdrawal");
      //     setTransactions(results);
      //     setFilteredTransactions(results);
      //   } else if (transactionType === 'transfars') {
      //     const results = transaList.filter(item => item.subtype.toLowerCase() === "transfer");
      //     setTransactions(results);
      //     setFilteredTransactions(results);
      //   }
      // }
    });

  }, []);

  const columns = [{
    name: 'File Name',
    selector: 'file_name',
    sortable: true,
    wrap: true,
  }, {
    name: 'URL',
    selector: 'file_url',
    sortable: true,
  }, {
    name: 'Type',
    selector: 'file_type',
    sortable: true,
  }, {
    name: 'Status',
    selector: 'file_status',
    sortable: true,
  },/*{
    name: 'Actions',
    sortable: true,
    cell: row => <div>
      <button
        className="btn btn-secondary btn-sm btn-icon"
        disabled={adminLevel != 5 ? row.status == "Completed" ? true : '' : false}
        onClick={e => {
          e.preventDefault();
          onUpdateDeposit(row)
        }}
      > <span className="fa fa-pencil" />
      </button>
    </div>
  }**/]; 


  const onSearchFilter = filterText => {
    const filteredItems = transactions.filter(item => (
      (item && item.user.first_name && item.user.first_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.user.last_name && item.user.last_name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.user.id_number && item.user.id_number.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.type && item.type.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.subtype && item.subtype.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.txid && item.txid.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.status && item.status.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredTransactions(filteredItems);
  }


  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
    //console.log(state.selectedRows)
  }, []);

  const contextActions = React.useMemo(() => {
    const handleBulkUpdate = () => {
      setShowBulk(true)
    };

    return (
      <button
        className="btn btn-secondary"
        type="button"
        onClick={handleBulkUpdate}>
        <span className="fa fa-pencil" /> Bulk Update
      </button>
    );
  }, [filteredTransactions, selectedRows, toggleCleared]);

  return (
    <>
      <Modal show={show} onHide={handleClose} centered className="confirm-modal" >
        <Modal.Body>
          <Card>
            <CardBody>
              <form className="multisteps-form__form mb-8" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <label>Transaction Type</label>
                      <select
                        name="type"
                        ref={register({ required: true })}
                        onChange={()=>{setFBatchFile([])}}
                        className="form-control"
                      >
                        <option value="withdrawal">Withdrawal</option>
                        <option value="deposit">Deposit</option>
                      </select>
                    </div>
                  </Col>
                  <Col md={6}>
                    {batchFile.length === 0 &&
                      <CardBody >
                        <div {...getRootProps({ className: 'd-flex flex-column justify-content-center text-center pt-6 pb-5' })}>
                          <input {...getInputProps()} />
                          <i className="fa fa-plus text-secondary mb-3" aria-hidden="true"></i>
                          <h5 className="text-secondary"> Upload File </h5>
                          <p>Drag 'n' drop batch file here, or click to select files</p>
                          <small><em>(Only *.csv are accepted)</em></small><br />
                          <small><em>Delimiter should be comma ","</em></small>
                        </div>
                      </CardBody>}
                    {batchFile.length > 0 &&
                      <CardBody className="d-flex flex-column justify-content-center text-center pt-6 pb-5">
                        <input {...getInputProps()} />
                        <div className="">
                          <div className="toast-header border-0">
                            <i className="ni ni-check-bold text-success me-2"></i>
                            <span
                              className="me-auto font-weight-bold"
                              style={{
                                width: 290,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                textAlign: 'left'
                              }}
                            >
                              {batchFile[0].name}
                            </span>
                            <small className="text-body">{parseInt(batchFile[0].size / 1024)} KB</small>
                            <i
                              className="fa fa-trash-o text-lg ms-3 cursor-pointer text-danger"
                              data-bs-dismiss="toast"
                              aria-label="Close"
                              aria-hidden="true"
                              onClick={() => setFBatchFile([])}
                            />
                          </div>
                          <hr className="horizontal dark m-0" />
                          <div className="toast-body">
                            File has been selected, please submit to process the file.
                          </div>

                        </div>
                      </CardBody>}
                  </Col>
                </Row>
                <Col xs={12} className="text-center">
                  <hr className="horizontal dark mt-3 mb-1" />
                  <div className="button-row mt-4 mb-2">
                    <button
                      className="btn bg-gradient-dark ms-auto mb-0 js-btn-next"
                      type="submit"
                      title="Submit"
                      disabled={batchFile.length === 0 || submitBtn}
                    >
                      Submit Request
                    </button>
                  </div>
                </Col>
              </form>
            </CardBody>
          </Card>
        </Modal.Body>
      </Modal>

      <Card className="o-hidden mb-4">
        <ModalBulkUpdate show={showBulk} setShow={setShowBulk} transactions={selectedRows} />
        <ModalChangeStatus show={showUpdate} setShow={setShowUpdate} transaction={selectedTransaction} />
        <TransactionDetails
          show={showApproveMember}
          setShow={setShowApproveMember}
          transaction={selectedTransaction}
          pop={selectedTransPOP} />
        <CardBody className="p-0">
          <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
            <span>Batch Files</span>
            <span className="flex-grow-1" />
            <input
              style={inputWith}
              type="text"
              name="search"
              className={`form-control form-control-m`}
              placeholder="Search..."
              onKeyUp={e => onSearchFilter(e.target.value)}
            />
            <div>
              <div style={myButtons}>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={e => {
                    e.preventDefault();
                    setShow(true);
                  }}>
                  Search By Date
                </button>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={e => {
                    e.preventDefault();
                    setShow(true);
                  }}>
                  Import
                </button>
              </div>
            </div>
          </div>
        </CardBody>

        <DataTable
          columns={columns}
          data={filteredTransactions}
          selectableRows
          contextActions={contextActions}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
          pagination
        />
      </Card>
    </>
  );
}