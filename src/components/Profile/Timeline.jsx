import React from 'react';

export default function Timeline(props) {
    const { items } = props;
    return (
        <div className="timeline">
            {items.map(item => (
                <div key={item.id} className="timeline__item">
                    <div className="user">
                        <img src="/assets/img/users/user_1.jpeg" alt="Profile" />
                    </div>
                    <div className="content">
                        <div className="title">
                            <a href="#" className="text-info">
                                Mdu Mdluli
                            </a> logged into the <strong>Admin Portal</strong> 
                        </div>
                        <p>
                            Mauris tempor semper
                            viverra. <strong>Aliquam laoreet malesuada</strong> nisl,
                            fringilla accumsan mi condimentum
                            a. <a href="#" class="text-info">Nullam lacinia egestas</a>. Proin
                            iaculis malesuada mi, quis <a href="#" class="text-info">@Iaculis</a> magna
                            tristique sed.
                        </p>
                        <p>
                            <a href="#" className="text-muted text-sm margin-right-10">
                                Transactions
                            </a>
                            <i className="fa fa-angle-right margin-right-10" />
                            <a href="#" className="text-muted text-sm">
                                Deposits
                            </a>
                            <span className="pull-right text-muted text-sm">
                                <i className="fa fa-clock-o" /> 12 min ago
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