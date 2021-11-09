import React from 'react';
import Moment from 'react-moment';
export default function RecentProduct(props) {
    const { product } = props;
    console.log(product);
    return (
        <tr>
            <td width="200">
                <div className="user user--rounded user--bordered user--lg margin-bottom-0">
                    <div className="user__name">
                        <strong>Product: {product.tittle}</strong><br />
                        <span className="text-muted">Type: {product.type}</span>
                    </div>
                </div>
            </td>
            <td>
            </td>
            <td width="180">
                <strong><Moment date={product.created} format="D MMM YYYY" /></strong><br />
                <span className="text-muted"><Moment date={product.created} format="hh:mm:ss" /></span>
            </td>
            <td width="150">
    <div className="btn btn-outline-success btn-block disabled btn-sm">{product.status}</div>
            </td>
            <td width="40">
                <a href={'products/'+product.id} className="btn btn-secondary btn-sm btn-icon">
                    <span className="fa fa-eye"></span>
                </a>
            </td>
        </tr>
    );
}