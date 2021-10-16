import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { HashLinkContainer } from 'components';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';
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
const iconPadding ={
    paddingRight: '3px',
}
const inputWith={
  width: '30%',
  marginRight: '20px'
}

export default function UsersRoles(props) {
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showAddNew, setShowAddNew] = useState(false);
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState({});
    const [filteredRoles, setFilteredRoles] = useState([]);
    const history = useHistory();


    useMemo(() => {

      }, []);
    
      const profile = {
		customerId: '109977041',
		name: 'CBI Global',
		username: 'JSmith',
		phone: '0115880677',
		email: 'example1@demo.com',
		website: 'http://dev.cbiglobal.io',
		country: 'South Africa',
		level: '3',
		created: 'just now',
		status: 'Active',
		bio: 'Im mdu mdluli born and raised in KZN',
	    address: {
			streetAddress: '23 Modiseni',
			suburb: 'Centurion',
			city: 'Pretoria',
			province: 'Gauteng',
			postalCode: '2345'
        }};
        const newDate = new Date()
    return (
            <Col md={12} lg={12} xl={12}>
                <h3 className="text-success" >R800.80</h3>
                <p>Available Balance</p>
                <hr />
                <img
                    alt={profile.name}
                    src={require("assets/img/logo.png")}
                    className="author-box-picture"
                />
                <div className="clearfix"></div>
                <div className="author-box-name mt-3">
                    <h3 className="text-primary mt-0 mb-1">{profile.name}</h3>
                </div>
                <div className="author-box-job">
                    Website: {profile.website}<br />
                    Phone: {profile.phone}<br />
                    Email: {profile.email}<br />
                    <hr />
                    <h3 className="text-primary mt-0 mb-1">Address</h3>
                    {profile.address &&
                        <p>
                            {profile.address.streetAddress || ''},&nbsp;
                            {profile.address.suburb || ''}
                            <br />
                            {profile.address.city || ''},&nbsp;
                            {profile.address.province || ''}&nbsp;
                            {profile.address.postalCode || ''}
                        </p>}
                        <hr />
                        Updated Date: <Moment format="MMM D, YYYY">{newDate}</Moment>
                        <hr />
                </div>
            </Col>
    );
}