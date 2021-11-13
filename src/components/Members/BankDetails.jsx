import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Confirm from './ModalChangeStatus';
import { MemberService } from '../../providers';
import useForm from 'react-hook-form';
import { confirmAlert } from 'react-confirm-alert';



export default function Referals(props) {
  const { member } = props;
  const { register, handleSubmit, errors } = useForm();

  const [show, setShow] = useState(false);
  const [bankingDetails, setBankingDetails] = useState([]);
  const [editDisabledState, setEditDisabledState] = useState(true);
  const [submitting, setSubmitting] = useState(false)

  useMemo(() => {
    const getBank = async () => {
      //Get member bank details

      if (member.id) {
        const bank = await MemberService.getMemberBankDetails(member.id);
        const bank_results = bank.data.data.results;

        if (bank_results) {
          const data = bankingDetails;
          bank_results.map(item => {
            data.push(item);
          })
          setBankingDetails(data);
        }
      }

    }

    getBank();

  }, [member, bankingDetails]);


  const isEdited = () => {
    console.log()
  }

  const onSubmit = async (data) => {
    
    setSubmitting(true)
    const result = await MemberService.updateMemberBankDetails(member.id, data)

    if (result.data.success) {
      confirmAlert({
        title: 'Success',
        message: 'Bank Details updated'
      });
      return
    }
    setEditDisabledState(true)
    setSubmitting(false)
    confirmAlert({
      title: 'Failed',
      message: 'Could not update',
    });


  }


  return (
    <Card className="o-hidden mb-4">
      <Confirm show={show} setShow={setShow} />
      <CardBody className="p-0">
        <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
          <span className="text-primary">Banking Details</span>
          <span className="flex-grow-1" />
        </div>
        <ul className="list-group">
          {bankingDetails.map(item => (
            <li key={item.id} className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
              <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-row justify-content-between align-items-center mb-10">
                  <h6 className="mb-0 text-sm">{item.type}</h6>
                  <div className="ms-auto text-end">
                    <button
                      className="btn bg-gradient-dark ms-auto mb-0 js-btn-next"
                      type="submit"
                      title="Next"
                      disabled={editDisabledState || submitting}
                    >
                      Save
                    </button>

                    <button
                      type="button" className="btn btn-link text-dark px-3 mb-0"
                      onClick={() => { setEditDisabledState(!editDisabledState) }}
                    >
                      <i className="fa fa-pencil-alt text-dark me-2" aria-hidden="true" />
                      Edit
                    </button>
                  </div>
                </div>
                <table>
                  <tbody>
                    <tr>
                      <td><span className="mb-2 text-xs">Holder Name</span></td>
                      <td>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-m"
                            defaultValue={item.name ? item.name : ''}
                            name="name"
                            ref={register}
                            disabled={editDisabledState}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td><span className="mb-2 text-xs">Bank Name</span></td>
                      <td>
                        <div className="form-group">
                          <input
                            type="text"
                            name="bank_name"
                            ref={register}
                            className="form-control form-control-m"
                            defaultValue={item.bank_name ? item.bank_name : ''}
                            disabled={editDisabledState}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td><span className="mb-2 text-xs">Account Number</span></td>
                      <td>
                        <div className="form-group">
                          <input
                            type="text"
                            name="number"
                            ref={register}
                            className="form-control form-control-m"
                            defaultValue={item.number ? item.number : ''}
                            disabled={editDisabledState}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td><span className="mb-2 text-xs">Branch code</span></td>
                      <td>
                        <div className="form-group">
                          <input
                            type="text"
                            name="branch_code"
                            ref={register}
                            className="form-control form-control-m"
                            defaultValue={item.branch_code ? item.branch_code : ''}
                            disabled={editDisabledState}
                          />
                        </div>
                      </td>
                    </tr>
                    {/* <tr>
                      <td><span className="mb-2 text-xs">Status</span></td>
                      <td>
                        <div className="form-group">
                        <select
                            name="businessNature"
                            className="multisteps-form__input form-control"
                            ref={register({ required: true })}
                            defaultValue={item.status}
                        >
                            <option value="">{item}</option>
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                        </select>
                        </div>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </form>
            </li>))}
        </ul>
      </CardBody>

    </Card>
  );
}