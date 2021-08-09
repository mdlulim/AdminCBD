import React from 'react';

import Table from './Table';

const Listing = props => {
    return (
        <div className="user-listing">
            <Table
                {...props}
            />
        </div>
    );
};

export default Listing;
