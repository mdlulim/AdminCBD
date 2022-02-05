import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import { HashLinkContainer, Common } from 'components';
import DataTable from 'react-data-table-component';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { AccountService, UserService, MemberService } from '../../providers';
//import FeatherIcon from '../FeatherIcon';
import { Eye, Edit, UserMinus } from 'react-feather';
import { Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import useForm from 'react-hook-form';

import "react-datepicker/dist/react-datepicker.css";
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

export default function MakeTransfer(props) {
    const [disabled, setDisabled] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState({});
    const [members, setMembers] = useState([]);
    const [selectedType, setSelectedType] = useState({})
    const [membersOptions, setMembersOptions] = useState([]);
    const [userWallet, setUserWallet] = useState(null);
    const [fees, setFees] = useState(null);
    const [userType, setUserType] = useState(null);
    const [processing, setProcessing] = useState(false);
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();

    useMemo(() => {
        UserService.getUsersall().then((res) => {
            const membersList = res.data.data.results;
            let temp = [];
            membersList.filter(item => (
                temp.push({ value: item.id, label: item.first_name + ' ' + item.last_name + ' (' + item.referral_id + ')', first_name: item.first_name, last_name: item.last_name, referral_id: item.referral_id, group: item.group })
                //setProductCategories(productCategories => [{value:item.code, label:item.title}])
            ))
            setMembersOptions(temp);
            setMembers(membersList);
        });

        const fees = [
            { name: 'member', label: 'Member', fee: 1 },
            { name: 'wealth-creator', label: 'Wealth Creator', fee: 0.5 },
            { name: 'admin', label: 'Administrator', fee: 0 }
        ];
        setFees(fees);


    }, []);
    const TransType = [{ name: 'credit', label: 'Credit' },
    { name: 'debit', label: 'Debit' }
    ]
    const onSubmit = (event) => {

        event.preventDefault();
            const form = event.currentTarget;
            const amount = form.amount.value;
            const reason = form.reason.value;

            const data = {
                id: userWallet.id,
                amount: parseFloat(amount),
                type: selectedType.name
            }

        //   return data;
          AccountService.debitCredit(data).then((response) =>{
              if(response.data.success){
                    return confirmAlert({
                        title: 'Succcess',
                        message: 'Transaction was successfully updated',
                        buttons: [
                            {
                                label: 'Ok',
                                onClick: () => {
                                    window.location = '/transactions/debit-credit';
                                }
                            }
                        ]
                    });
              }

          });

    }


    const recieverWallet = (item) => {
        //Get member details
        MemberService.getMemberWallet(item.value).then((res) => {
            const walletDetails = res;
            setUserWallet(walletDetails);
        });
        const userFee = fees.filter(fee => fee.name === item.group.name)[0];
        setUserType(userFee);
    }

    return (
        <Card className="o-hidden mb-4">
            <CardBody>
                <form onSubmit={onSubmit}>
                    <Row>
                        <Col>
                            <div className="row g-3">
                                <div className="col">
                                    <label for="inputEmail4" class="form-label">Specify recipient by name or refferal ID</label>
                                    <Select
                                        id="status"
                                        name="status"
                                        options={membersOptions}
                                        onChange={item => {
                                            setSelectedAccount(item);
                                            recieverWallet(item)
                                        }}
                                        className={`basic-multi-select form-control-m`}
                                        classNamePrefix="select"
                                        ref={register({ required: true })}
                                    />
                                    <br />
                                    {userWallet ?
                                        <Col lg={12}>
                                            <Common.Widget
                                                icon="li-wallet"
                                                title={selectedAccount.first_name + ' ' + selectedAccount.last_name}
                                                subtitle={userWallet.label + ' | ' + selectedAccount.referral_id}
                                                informer={<span className="text-bold text-success">{userWallet.available_balance + ' ' + userWallet.currency_code}</span>}
                                                invert={false}
                                            />
                                        </Col> : ''}
                                </div>
                                <div className="col">
                                    <label for="inputEmail4" class="form-label">Select Transaction Type</label>
                                    <Select
                                        id="status"
                                        name="status"
                                        options={TransType}
                                        onChange={item => {
                                            setSelectedType(item)
                                        }}
                                        className={`basic-multi-select form-control-m`}
                                        classNamePrefix="select"
                                        ref={register({ required: true })}
                                    />
                                    <label for="inputEmail4" className="form-label">Amount In CBI</label>
                                    <div className="input-group">
                                        <input type="text"
                                            className="form-control"
                                            id="autoSizingInputGroup"
                                            placeholder="Amount" onChange={event => {
                                                if (!isNaN(+event.target.value)) {
                                                    //setErrorAmount(true)
                                                } else {
                                                    // setErrorAmount(false)
                                                }
                                            }}
                                            name='amount'
                                            ref={register({ required: true })}
                                        />
                                    </div>
                                    <label for="inputEmail4" className="form-label">Note</label>
                                    <div className="input-group">
                                        <textarea
                                            type="text"
                                            id="reason"
                                            name="reason"
                                            className="form-control form-control-m"
                                            ref={register({ required: true })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                className="btn btn-info float-right"
                            >
                                {processing ? 'Processing...' : 'Submit'}
                            </button>

                        </Col>
                    </Row>
                </form>
            </CardBody>
        </Card>
    );
}