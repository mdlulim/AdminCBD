import React, { useState, useMemo } from 'react';
import { Card, CardBody, Row, Col, CardTitle, Button, ButtonGroup } from 'reactstrap';
import { KYCService } from '../../providers';
import DocViewer, {PNGRenderer, JPGRenderer, PDFRenderer } from "react-doc-viewer";
import { Modal } from 'react-bootstrap';

export default function ViewModal(props) {
    const { show, setShow, KYCDocuments } = props; 

    useMemo(() => {
    }, []);

    var activeImagePath = "";

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <DocViewer pluginRenderers={[PNGRenderer, JPGRenderer, PDFRenderer]} documents={[{uri: "https://upload.wikimedia.org/wikipedia/commons/1/13/Benedict_Cumberbatch_2011.png"}, {uri: "https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,h_200,w_200/r_max/e_sharpen/remote_media/commons/a/ae/Olympic_flag.jpg"}, {uri: "https://res.cloudinary.com/demo/image/upload/example_pdf.pdf"}]} />
            </Modal.Body>
        </Modal>
    );
}