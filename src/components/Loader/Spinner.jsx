import React from 'react';
import PropTypes from 'prop-types';

function Loading(props) {
    return (
        <React.Fragment>
            <div className="loading loading--w-spinner loading--text fadeOut">
                <div>{props.text}...<div className="loading-spinner"></div></div>
            </div>
        </React.Fragment>
    );
}

Loading.propTypes = {
    text: PropTypes.string,
};

Loading.defaultProps = {
    text: 'Loading',
};

export default Loading;
