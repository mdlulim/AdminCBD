import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { HashLinkContainer } from 'components';
import DataTable from 'react-data-table-component';



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


export default function Settings() {

    return (
        <Card className="o-hidden mb-4">
            <CardBody className="p-0">
                <div className="card-title border-bottom d-flex align-items-center m-0 p-3">
                    <span>Settings</span>
                    <span className="flex-grow-1" />
                </div>
            </CardBody>
        </Card>
    );
}