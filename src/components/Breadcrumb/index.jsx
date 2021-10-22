import React from 'react';

export default function Breadcrumb(props) {
    const { active, items } = props;
    return (
        <nav aria-label="breadcrumb" role="navigation">
            <ol className="breadcrumb">
                {items && items.length > 0 && items.map(item => (
                <li className="breadcrumb-item" key={item.title}>
                    <a href={item.link}>{item.title}</a>
                </li>))}
                <li className="breadcrumb-item active">{active}</li>
            </ol>
        </nav>
    );
}
