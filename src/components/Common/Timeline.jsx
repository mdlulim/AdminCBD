import React from 'react';

export default function Timeline(props) {
    const { items } = props;
    return (
        <div className="timeline timeline--simple">
            {items && items.length > 0 && items.map((item, index) => (
                <div key={index.toString()} className="timeline__item">
                    <div className="dot dot-warning"></div>
                    <div className="content">
                        <div className="title margin-bottom-0">
                            Deposit of <strong>R1,500</strong> on 23 Oct 2021 from <strong>Mduduzi Mdluli</strong> - <a href="/">Details...</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}