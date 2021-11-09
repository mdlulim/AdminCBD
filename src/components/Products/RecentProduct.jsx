import React from 'react';

export default function RecentProduct(props) {
    const { product } = props;
    return (
        <tr>
            <td width="200">
                <div className="user user--rounded user--bordered user--lg margin-bottom-0">
                    <img src="/assets/img/users/user_1.jpeg" />
                    <div className="user__name">
                        <strong>Mduduzi Mdluli</strong><br />
                        <span className="text-muted">Durban, ZA</span>
                    </div>
                </div>
            </td>
            <td>
            </td>
            <td width="180">
                <strong>25 March 2018</strong><br />
                <span className="text-muted">12:23:15 GMT</span>
            </td>
            <td width="150">
                <div className="btn btn-outline-success btn-block disabled btn-sm">Paid</div>
            </td>
            <td width="150">
                <div className="btn btn-outline-success btn-block disabled btn-sm">Approved</div>
            </td>
            <td width="100" className="text-right">
                <strong className="text-success">+403.22 CBI</strong><br />
                <span className="text-muted">1,500 ZAR</span>
            </td>
            <td width="40">
                <button className="btn btn-secondary btn-sm btn-icon">
                    <span className="fa fa-eye"></span>
                </button>
            </td>
        </tr>
    );
}