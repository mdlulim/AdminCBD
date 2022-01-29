import React, { useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import { useDropzone } from 'react-dropzone';

export default function KYCFileUpload(props) {
    const { files, setFiles, toastBody, state, uploadText } = props;
    const {
        getRootProps,
        getInputProps,
    } = useDropzone({
        multiple: false,
        accept: ['image/jpeg', 'image/jpg', 'image/png', '.pdf', 'application/pdf'],
        onDropRejected: () => alert('Please select a valid file'),
        onDropAccepted: (acceptedFiles) => {
            setFiles(acceptedFiles);
        },
    });

    return (
        <Card className="h-100 card-plain border">
            {(files && files.length === 0) &&
                <CardBody>
                    <div {...getRootProps({ className: 'd-flex flex-column justify-content-center text-center pt-6 pb-5' })}>
                        <input {...getInputProps()} />
                        <i className="fa fa-plus text-secondary mb-3" aria-hidden="true"></i>
                        <h5 className="text-secondary"> Upload File </h5>
                        <small>Drop { uploadText } here, or click to select file</small>
                        <small><em>(Only *.jpeg, *.jpg, *.pdf and *.png are accepted)</em></small>
                    </div>
                </CardBody>}
            {files && files.length > 0 &&
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
                                {files[0].name}
                            </span>
                            <small className="text-body">{parseInt(files[0].size / 1024)} KB</small>
                            <i
                                className="fa fa-trash-o text-lg ms-3 cursor-pointer text-danger"
                                data-bs-dismiss="toast"
                                aria-label="Close"
                                aria-hidden="true"
                                onClick={() => { setFiles([]) }}
                            />
                        </div>
                        <hr className="horizontal dark m-0" />
                        <div className="toast-body">
                            {toastBody}
                        </div>
                    </div>
                </CardBody>}
        </Card>
    );
}