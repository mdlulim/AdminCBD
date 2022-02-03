import React from 'react';
import Moment from 'react-moment';
export default function Timeline(props) {
    const { activities, profilePicture } = props;
    return (
        <div className="timeline">
            {activities.map(item => (
                <div key={item.id} className="timeline__item">
                    <div className="user">
                        <img src={profilePicture ? profilePicture :`/assets/img/users/user_1.jpeg`} alt="Profile" />
                    </div>
                    <div className="content">
                        <div className="title">
                            <a href="#" className="text-info">
                                {item.user.first_name+' '+item.user.last_name}
                            </a> {item.description} <strong>Admin Portal</strong> 
                        </div>
                        {/* <p>
                            Mauris tempor semper
                            viverra. <strong>Aliquam laoreet malesuada</strong> nisl,
                            fringilla accumsan mi condimentum
                            a. <a href="#" class="text-info">Nullam lacinia egestas</a>. Proin
                            iaculis malesuada mi, quis <a href="#" class="text-info">@Iaculis</a> magna
                            tristique sed.
                        </p> */}
                        <p>
                            <a href="#" className="text-muted text-sm margin-right-10">
                                Transactions
                            </a>
                            <i className="fa fa-angle-right margin-right-10" />
                            <a href="#" className="text-muted text-sm">
                                Deposits
                            </a>
                            <span className="pull-right text-muted text-sm">
                                <i className="fa fa-clock-o" /> <Moment date={item.created} format="D MMM YYYY" /> <Moment date={item.created} format="hh:mm:ss" />
                            </span>
                        </p>
                    </div>
                </div>
            ))}
            <div className="timeline__more">
                <a href="#">...</a>
            </div>
        </div>
    );
}