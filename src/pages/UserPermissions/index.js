import React, { useState, useMemo } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { AuthLayout } from 'containers';
import { UserPermissions, Common } from 'components';
import { UserService } from '../../providers';
import Select from 'react-select';
import PagePermissionService from 'providers/PagePermissionService';

const PermissionsList = props => {
    const breadcrumb = { heading: "UserPermissions" };

    const [users, setUsers] = useState([]);
    useMemo(() => {
        PagePermissionService.getPagePermissions().then((res) => {
          console.log(res.data.data.results)
          const userslist = res.data.data.results;
        setUsers(userslist);
        });
    }, []);

        
        // const countCompanyAccounts = (type) =>{
        //     const countTypes = transactions.filter(transaction => transaction.status === type);
        //     return countTypes.length;
        // };

	return (
		<AuthLayout  {...props}
        breadcrumb={{ active: "User Permissions" }}
        pageHeading={{
            title: 'User Permissions',
            caption: 'EXPLORE OVERVIEW TRANSACTIONS FOR CRYPTO BASED INNOVATION',
        }}>
        
        <Card>
          
            <CardBody className="p-0">
            <div class="content">
                <div class="container-fluid">
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
                                            <th scope="col">Basic</th>
                                            <th scope="col">Low</th>
                                            <th scope="col">Medium</th>
                                            <th scope="col">High</th>
                                            </tr> 
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">Transactions</th>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Withdrawals</th>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
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
                                            <th scope="col">Basic</th>
                                            <th scope="col">Low</th>
                                            <th scope="col">Medium</th>
                                            <th scope="col">High</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">All Members</th>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Wealth Creators</th>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
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
                                            <th scope="col">Basic</th>
                                            <th scope="col">Low</th>
                                            <th scope="col">Medium</th>
                                            <th scope="col">High</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">All Products</th>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Manage Products</th>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Buy Products</th>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
                                                <td><input type="checkbox" /></td>
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
