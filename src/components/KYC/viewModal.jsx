import React, { useState, useMemo } from 'react';
// import DocViewer, {PNGRenderer, JPGRenderer, PDFRenderer } from "react-doc-viewer";
import { Modal } from 'react-bootstrap';

export default function ViewModal(props) {
    const { show, setShow, kycDocuments } = props; 

    useMemo(() => {
    }, []);

    const handleClose = () => {
      //  console.log(kycDocuments, " ################")
        setShow(false);
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                {/* <DocViewer pluginRenderers={[PNGRenderer, JPGRenderer, PDFRenderer]} documents={kycDocuments} /> */}
            </Modal.Body>
        </Modal>
    );
}