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


export default function MakeTransfer(props) {
    const [disabled, setDisabled] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState({});
    const [members, setMembers] = useState([]);
    const [selectedType, setSelectedType] = useState({})
    const [membersOptions, setMembersOptions] = useState([]);
    const [error, setError] = useState('');
    const [userWallet, setUserWallet] = useState({});
    const [fees, setFees] = useState(null);
    const [userType, setUserType] = useState(null);
    const [processing, setProcessing] = useState(false);
    const history = useHistory();
    const { register, handleSubmit, reset, errors } = useForm();

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
    function onSubmit(data) {
        setDisabled(true)
       const { amount, reason } = data;
            if(!data.reason){
                setError('Reason must be provided to process transaction!');
                setDisabled(false)
                return error;
            }

            if(!userWallet){
                setError('Please select member/WC account is required!');
                setDisabled(false)
                return error;
            }

            if(!selectedType){
                setError('Please select transaction type is required!');
                setDisabled(false)
                return error;
            }

            const data2 = {
                wallet_id: userWallet.id,
                amount: parseFloat(amount),
                type: selectedType.name,
                reason: reason
            }
          AccountService.debitCredit(data2).then((response) =>{
            setDisabled(false)
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
              }else{
                  setError(response.data.message ? response.data.message : 'Failed to process the transaction!');
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
                <form
                    noValidate
                    id="debit-credit-member-form"
                    role="form"
                    autoComplete="off"
                    className="text-start"
                    onSubmit={handleSubmit(onSubmit)}
                >
                { error ?
                        <div className="alert alert-warning" role="alert">
                        {error}
                        </div> : ''}
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
                                    {userWallet.id ?
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
                                        id="type"
                                        name="type"
                                        options={TransType}
                                        onChange={item => {
                                            setSelectedType(item)
                                        }}
                                        className={`basic-multi-select form-control ${errors.type ? 'is-invalid' : ''}`}
                                        classNamePrefix="select"
                                        ref={register({ required: true })}
                                    />
                                    {errors.type && <span className="help-block invalid-feedback">Please select transaction type</span>}
                                    <label for="inputEmail4" className="form-label">Amount In CBI</label>
                                    <div className="input-group">
                                        <input 
                                            type="text"
                                            id="amount"
                                            name="amount"
                                            className="form-control"
                                            className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                                            placeholder="Amount" onChange={event => {
                                                if (!isNaN(+event.target.value)) {
                                                    //setErrorAmount(true)
                                                } else {
                                                    // setErrorAmount(false)
                                                }
                                            }}
                                            ref={register({ required: true })}
                                        />
                                        {errors.amount && <span className="help-block invalid-feedback">Please enter amount</span>}
                                    </div>
                                    <label for="inputEmail4" className="form-label">Note</label>
                                    <div className="input-group">
                                        <textarea
                                            type="text"
                                            id="reason"
                                            name="reason"
                                            className={`form-control ${errors.reason ? 'is-invalid' : ''}`}
                                            ref={register({ required: true })}
                                        />
                                        {errors.reason && <span className="help-block invalid-feedback">Please enter a reason</span>}
                                    </div>
                                </div>
                            </div>
                           

                        </Col>
                    </Row>
                </form>
                <button
                    type="submit"
                    className="btn btn-info float-right"
                    form="debit-credit-member-form"
                >
                        {processing ? 'Processing...' : 'Submit'}
                </button>
            </CardBody>
        </Card>
    );
}