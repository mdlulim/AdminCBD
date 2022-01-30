import React from 'react';
import Moment from 'react-moment';

export default function Timeline(props) {
    const { items } = props;
    return (
        <div className="timeline timeline--simple">
            {items && items.length > 0 && items.map((item, index) => (
                <div key={index.toString()} className="timeline__item">
                    <div className="dot dot-warning"></div>
                    <div className="content">
                        <div className="title margin-bottom-0">
                            {item.subtype} of <strong>{item.currency.code} {item.amount}</strong> on <Moment date={item.created} format="D MMM YYYY" /> from <strong>{item.user ? item.user.first_name + ' ' + item.user.last_name : ''}</strong> - <a href={'/transactions/transactions/' + item.id}>Details...</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}