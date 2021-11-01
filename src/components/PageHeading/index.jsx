import React from 'react';
import { Breadcrumb } from 'components';

export default function PageHeading(props) {
    const { breadcrumb, caption, title, actions } = props;
    return (
        <div className="page-heading">
            <div className="page-heading__container">
                <h1 className="title">{title}</h1>
                <p className="caption">{caption}</p>
            </div>
            <div className="page-heading__container float-right d-none d-sm-block">
                {actions || ''}
            </div>
            {breadcrumb && <Breadcrumb {...breadcrumb} />}
        </div>
    );
}