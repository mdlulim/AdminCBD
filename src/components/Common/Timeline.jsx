import React, { useState } from 'react';
import Moment from 'react-moment';
import { MemberService } from '../../providers';
export default function Timeline(props) {
    const { items } = props;
    const GetUserById = ({user_id}) => {
        const id =user_id;
        const [temp, setTemp] = useState({});
       const member = MemberService.getMember(id).then((res) => {
         setTemp(res.data.data);
        });
        return (<div><div>{temp.first_name} {temp.last_name}</div>
          <div className="small text-muted">
            <span>{temp.id_number}</span>
          </div></div>);
      }
    return (
        <div className="timeline timeline--simple">
            {items && items.length > 0 && items.map((item, index) => (
                <div key={index.toString()} className="timeline__item">
                    <div className="dot dot-warning"></div>
                    <div className="content">
                        <div className="title margin-bottom-0">
                            {item.subtype} of <strong>{item.currency.code} {item.amount}</strong> on <Moment date={item.created} format="D MMM YYYY" /> from <strong><GetUserById {...item} /></strong> - <a href="/transactions">Details...</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}