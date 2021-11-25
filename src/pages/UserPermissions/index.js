import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import $ from 'jquery';
import { AuthLayout } from 'containers';
import { UserPermissions, Common } from 'components';
import { UserService } from '../../providers';
import Select from 'react-select';
import PagePermissionService from 'providers/PagePermissionService';
import ModalAddPermission from '../../components/UserPermissions/ModalAddPermission';

$(document).ready(function() {
    $('body').on('click','.check', function(){
        let val = ($(this).is(':checked') ? true : false);
        $(this).attr('data-val',val);
        PagePermissionService.updatePagePermission($(this).attr('data-id'), 
            {
                page: $(this).attr('data-content'),
                low: $('#low'+$(this).attr('data-content')).attr('data-val'),
                basic: $('#basic'+$(this).attr('data-content')).attr('data-val'),
                medium: $('#medium'+$(this).attr('data-content')).attr('data-val'),
                high: $('#high'+$(this).attr('data-content')).attr('data-val'),
                veryhigh: $('#veryhigh'+$(this).attr('data-content')).attr('data-val'),
            });
    })
});
const PermissionsList = props => {
    const breadcrumb = { heading: "UserPermissions" };
    const [showAddNew, setShowAddNew] = useState(false);
    const [showReports, setShowReports] = useState(false);

    const [users, setUsers] = useState([]);
    
        
        useMemo(() => {
            
            PagePermissionService.getPagePermissions().then((res) => {
                var arr = [];
                Object(res.data.data.results).forEach(function(value) {
                    $(".table > tbody > tr#"+value.page+"").append(
                    '<td><input id="low'+value.page+'" class="check" data-val="'+value.low+'" data-id="'+value.id+'" data-content="'+value.page+'" type="checkbox" '+(value.low ? 'checked' :'')+'/></td>'+
                    '<td><input id="basic'+value.page+'" class="check" data-val="'+value.basic+'" data-id="'+value.id+'" data-content="'+value.page+'" type="checkbox" '+(value.basic ? 'checked' :'')+'/></td>'+
                    '<td><input id="medium'+value.page+'" class="check" data-val="'+value.medium+'" data-id="'+value.id+'" data-content="'+value.page+'" type="checkbox" '+(value.medium ? 'checked' :'')+'/></td>'+
                    '<td><input id="high'+value.page+'" class="check" data-val="'+value.high+'" data-id="'+value.id+'" data-content="'+value.page+'" type="checkbox" '+(value.high ? 'checked' :'')+'/></td>'+
                    '<td><input id="veryhigh'+value.page+'" class="check" data-val="'+value.veryhigh+'" data-id="'+value.id+'" data-content="'+value.page+'" type="checkbox" '+(value.veryhigh ? 'checked' :'')+'/></td>');
                    
                  });
            })
        }, []);


	return (
		<AuthLayout  {...props}
        breadcrumb={{ active: "Page Permissions" }}
        pageHeading={{
            title: 'Page Permissions',
            caption: 'EXPLORE OVERVIEW TRANSACTIONS FOR CRYPTO BASED INNOVATION',
        }}>
        
        <Card>
        <ModalAddPermission  show={showAddNew} setShow={setShowAddNew}>...</ModalAddPermission>
            <CardBody className="p-0">
            
            <div class="content">
                <div class="container-fluid">
                <button 
                            className="btn btn-secondary float-right"
                            type="button"
                            onClick={e => {
                              e.preventDefault();
                              setShowAddNew(true);
                            }}>
                                Add Page Permission
                            </button>
                    <div class="box box-primary">
                    <div class="box-body">
                            <form accept-charset="utf-8">
                                <div class="row col-sm-12" >
                                <div class="col-sm-6" >
                                        <div class="form-group">
                                        <h2>TRANSACTIONS</h2>
                                        <hr/>
                                        <table class="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">Pages</th>
                                            <th scope="col">Low</th>
                                            <th scope="col">Basic</th>
                                            <th scope="col">Medium</th>
                                            <th scope="col">High</th>
                                            <th scope="col">Very High</th>
                                            </tr> 
                                        </thead>
                                        <tbody>
                                            <tr id="alltransactions">
                                                <th scope="row">Transactions</th>
                                            </tr>
                                            <tr id="pending">
                                                <th scope="row">Pending</th>
                                            </tr>
                                            <tr id="withdrawals">
                                                <th scope="row">Withdrawals</th>
                                            </tr>
                                            <tr id="deposits">
                                                <th scope="row">Deposits</th>
                                            </tr>
                                            <tr id="transfers">
                                                <th scope="row">Transfers</th>
                                            </tr>
                                            <tr id="completed">
                                                <th scope="row">Completed</th>
                                            </tr>
                                            <tr id="cancelled">
                                                <th scope="row">Cancelled</th>
                                            </tr>
                                        </tbody>
                                        </table>
                                        </div>
                                    </div>                                    
                                </div>


                                <div class="row col-sm-12" >
                                <div class="col-sm-6" >
                                        <div class="form-group">
                                        <h2>MEMBERS</h2>
                                        <hr/>
                                        <table class="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">Pages</th>
                                            <th scope="col">Low</th>
                                            <th scope="col">Basic</th>
                                            <th scope="col">Medium</th>
                                            <th scope="col">High</th>
                                            <th scope="col">Very High</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr id="members">
                                                <th scope="row">All Members</th>
                                            </tr>
                                            <tr id="wealthcreators">
                                                <th scope="row">Wealth Creators</th>
                                            </tr>
                                        </tbody>
                                        </table>
                                        </div>
                                    </div>                                    
                                </div>



                                <div class="row col-sm-12" >
                                <div class="col-sm-6" >
                                        <div class="form-group">
                                        <h2>PRODUCTS</h2>
                                        <hr/>
                                        <table class="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">Pages</th>
                                            <th scope="col">Low</th>
                                            <th scope="col">Basic</th>
                                            <th scope="col">Medium</th>
                                            <th scope="col">High</th>
                                            <th scope="col">Very High</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr id="products">
                                                <th scope="row">Products</th>
                                            </tr>
                                            <tr id="producthistory">
                                                <th scope="row">Product History</th>
                                            </tr>
                                            <tr id="categories">
                                                <th scope="row">Categories</th>
                                            </tr>
                                        </tbody>
                                        </table>
                                        </div>
                                    </div>                                    
                                </div>


                                <div class="row col-sm-12" id="reports-div">
                                <div class="col-sm-6" >
                                        <div class="form-group">
                                        <h2>REPORTS</h2>
                                        <hr/>
                                        <table class="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">Pages</th>
                                            <th scope="col">Low</th>
                                            <th scope="col">Basic</th>
                                            <th scope="col">Medium</th>
                                            <th scope="col">High</th>
                                            <th scope="col">Very High</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr id="Reports">
                                                <th scope="row">All Reports</th>
                                            </tr>
                                        </tbody>
                                        </table>
                                        </div>
                                    </div>
                                </div>
                            </form>
                    </div>
                        
                    </div>
                </div>
                </div>
            </CardBody>
        </Card>
        
		</AuthLayout>
	);
};

export default PermissionsList;
