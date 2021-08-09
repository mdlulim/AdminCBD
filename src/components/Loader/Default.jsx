import React from 'react';
import PropTypes from 'prop-types';

const DefaultLoader = props => {
    const { text } = props;
    console.log(text);
    return (
        <div className="default-loader-wrapper">
            <section id="global">
                <div id="top" className="mask">
                    <div className="plane"></div>
                </div>
                <div id="middle" className="mask">
                    <div className="plane"></div>
                </div>
                <div id="bottom" className="mask">
                    <div className="plane"></div>
                </div>
                {/* <div id="base" className="mask">
                    <div className="plane"></div>
                </div> */}
            </section>
        </div>
    );
};

DefaultLoader.propTypes = {
    text: PropTypes.string,
};

DefaultLoader.defaultProps = {
    text: 'Loading',
};

export default DefaultLoader;
