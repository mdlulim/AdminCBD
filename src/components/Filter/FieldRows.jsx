import React from 'react';
import AddFieldRow from './AddFieldRow';

const Rows = props => {
    const { count } = props;
    if (count > 1) {
        if (count === 2) return (<AddFieldRow idx="1" key="2" {...props} />);
        if (count === 3) {
            return (
                <>
                    <AddFieldRow idx="2" key="2" {...props} />
                    <AddFieldRow idx="3" key="3" {...props} />
                </>
            );
        }
        if (count === 4) {
            return (
                <>
                    <AddFieldRow idx="2" key="2" {...props} />
                    <AddFieldRow idx="3" key="3" {...props} />
                    <AddFieldRow idx="4" key="4" {...props} />
                </>
            );
        }
        if (count === 5) {
            return (
                <>
                    <AddFieldRow idx="2" key="2" {...props} />
                    <AddFieldRow idx="3" key="3" {...props} />
                    <AddFieldRow idx="4" key="4" {...props} />
                    <AddFieldRow idx="5" key="5" {...props} />
                </>
            );
        }
    } else return false;
};

const FieldRows = props => {
    return (
        <div>
            <AddFieldRow idx="0" {...props} />
            <Rows {...props} />
        </div>
    );
};

export default FieldRows;
