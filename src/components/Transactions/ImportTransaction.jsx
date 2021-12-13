import React, { useState } from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { useDropzone } from 'react-dropzone';
import useForm from 'react-hook-form';
import { FileStorageProvider } from 'providers';

export default function Transactions(props) {
  const { handleSubmit, register } = useForm();
  const [batchFile, setFBatchFile] = useState([])
  const [submitBtn, setSubmitBtn] = useState(false)

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
    const { success, filename } = await FileStorageProvider.upload('batch', form.type, batchFile[0], Date.now() + '.' + ext);
    setSubmitBtn(false)
    if (!success) {
      alert("Failed! Batch File Fail To Upload")
      throw true;
    }
    setFBatchFile([])
    alert("Succeded! Batch File Uploaded")
  }

  return (
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
  );
}