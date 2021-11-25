import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import { useDropzone } from 'react-dropzone';
import { useParams, useHistory } from 'react-router-dom';
import { HashLinkContainer } from 'components';
import { CSVLink, CSVDownload } from "react-csv";
import DataTable from 'react-data-table-component';
import { TransactionService, MemberService } from '../../providers';
import 'react-data-table-component-extensions/dist/index.css';
import "react-datepicker/dist/react-datepicker.css";
import XLSX from "xlsx";
// styles
const customStyles = {

  headCells: {
    style: {
      color: 'rgba(0,0,0,.54)',
      paddingLeft: '18px', // override the cell padding for head cells
      paddingRight: '18px',
    },
  },
  cells: {
    style: {
      paddingLeft: '18px', // override the cell padding for data cells
      paddingRight: '18px',
    },
  },
};

const iconPadding = {
  paddingRight: '3px',
}

const selectPadding = {
  paddingRight: '10px',
}

const inputWith = {
  width: '20%'
}

const myButtons = {
  padding: '2px'
}

const inputWithDate = {
  width: '25%'
}

const Image = () => {
  return (
    <img
      alt=""
      height="32px"
      style={{ borderRadius: 4 }}
      width="32px"
      src={require("images/1.jpeg")}
    />
  );
};

const Status = ({ status }) => {
  let badge = 'primary';
  if (status === 'Pending') {
    badge = 'warning';
  }
  if (status === 'Completed') {
    badge = 'success';
  }
  if (status === 'Rejected') {
    badge = 'danger';
  }
  return (
    <div className={`btn btn-outline-${badge} btn-block disabled btn-sm`}>{status}</div>
  );
};

const Money = (row) => {
  let badge = 'pending';
  let simbol = '+';
  if (row.subtype === 'withdrawal' || row.subtype === 'Withdrawal') {
    simbol = '-';
    if (row.status === 'Pending') {
      badge = 'warning';
    } else {
      badge = 'danger'
    }
  } else {
    if (row.status === 'Pending') {
      badge = 'warning';
    } else if (row.status === 'Completed') {
      badge = 'success';
    } else {
      badge = 'danger';
    }
  }
  return <strong className={'text-' + badge}>{simbol + '' + row.amount} CBI</strong>
};

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr





export default function Transactions(props) {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [members, setMembers] = useState([]);
  const [wealthCreaters, setWealthCreaters] = useState([]);
  const params = useParams();
  const { id } = params;
  const history = useHistory();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    onDropRejected: () => alert('Please select a valid file'),
    onDropAccepted: (transactionFile) => {
      console.log(transactionFile, " uploaded excel sheet")

      let filereader = new FileReader()
      filereader.readAsArrayBuffer(transactionFile[0])
      filereader.onload = (event) => {
        let data = event.target.result;
        let workbook = XLSX.read(data);

        console.log(workbook, " workbook")
        workbook.SheetNames.forEach(sheet=>{
          let rowObject =  XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
         
          console.log(rowObject)
        })

      }
    },
  });
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));


  useMemo(() => {



  }, []);

  const GetUserById = (user_id) => {
    let member = members.filter(member => member.id === user_id)[0];
    let member2 = wealthCreaters.filter(wealthCreater => wealthCreater.id === user_id)[0];

    if (member) {
      return member;
    } else {
      return member2;
    }

  }
  const columns = [{
    name: 'Full Names',
    selector: 'id',
    sortable: true,
    wrap: true,
    cell: (row) => <div><div>{GetUserById(row.user_id) ? GetUserById(row.user_id).first_name : ''} {GetUserById(row.user_id) ? GetUserById(row.user_id).last_name : ''}</div>
      <div className="small text-muted">
        <span>{GetUserById(row.user_id) ? GetUserById(row.user_id).id_number : ''}</span>
      </div></div>
  }, {
    name: 'TransactionID',
    selector: 'txid',
    sortable: true,
  }, {
    name: 'Type',
    selector: 'subtype',
    sortable: true,
  }, {
    name: 'Fees',
    selector: 'fee',
    sortable: true,
  }, {
    name: 'Amount',
    selector: 'amount',
    sortable: true,
    cell: row => <div> {Money(row)}<br />
      <span className="text-muted">{row.balance} CBI</span></div>
  }, {
    name: 'Status',
    selector: 'status',
    sortable: true,
    cell: row => <Status {...row} />
  }];



  const onSearchFilter = filterText => {
    const filteredItems = transactions.filter(item => (
      (item && item.type && item.type.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.subtype && item.subtype.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.txid && item.txid.toLowerCase().includes(filterText.toLowerCase())) ||
      (item && item.status && item.status.toLowerCase().includes(filterText.toLowerCase()))
    ));
    setFilteredTransactions(filteredItems);
  }

  // const Export = ({ onExport }) => <button onClick={e => onExport(e.target.value)}>Export</button>;
  // const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(filteredTransactions)} />, []);
  return (<>
    <Card>
      <CardBody>
        <section className="container">
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <aside>
              <h4>File</h4>
              <ul>{files}</ul>
            </aside>
          </div>
        </section>
      </CardBody>
    </Card>
    <Card className="o-hidden mb-4">
      <CardBody className="p-0">
        <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
          <span>Transactions</span>
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
              {/* <button 
                            className="btn btn-secondary" 
                            type="button"
                            onClick={e => {
                              e.preventDefault();
                            }}>
                                Search By Date
                            </button> */}
              {/* <div className="btn-outline-secondary" {...getRootProps()}>
                                <input  {...getInputProps()} />
                                {
                                  isDragActive ?
                                    <p>Drop the files here ...</p> :
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                }
                              </div> */}
            </div>
          </div>
        </div>
      </CardBody>
      <DataTable
        columns={columns}
        customStyles={customStyles}
        noHeader
        data={filteredTransactions}
      />
    </Card>
  </>
  );
}