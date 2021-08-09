import React from 'react';
import PropTypes from 'prop-types';
// import { HashLinkContainer } from 'components';

const Breadcrumb = props => {
    const { heading, items } = props;
    return (
        <>
            <div className="breadcrumb">
                <h1 className="mr-2">{heading}</h1>
                {(heading !== 'Overview') &&
                <ul>
                    <li><a href="/overview">Overview</a></li>
                    {items && items.map(item => <li key={item.title}>{item.title}</li>)}
                </ul>}
            </div>
            <div className="separator-breadcrumb border-top" />
        </>
    );
};

Breadcrumb.propTypes = {
    heading: PropTypes.string,
};

Breadcrumb.defaultProps = {
    heading: '',
};

export default Breadcrumb;
