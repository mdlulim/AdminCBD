import React from 'react';
import PropTypes from 'prop-types';

export default function Widget(props) {
    const {
        invert,
        icon,
        informer,
        subtitle,
        title,
        wrapperClass,
    } = props;
    return (
        <div className={`widget ${invert ? 'widget invert' : 'widget--invert-by-parent'} ${wrapperClass || ''}`}>
            <div className="widget__icon_layer widget__icon_layer--right">
                <span className={icon}></span>
            </div>
            <div className="widget__container">
                <div className="widget__line">
                    <div className="widget__icon">
                        <span className={icon}></span>
                    </div>
                    <div className="widget__title">
                        {title}
                    </div>
                    <div className="widget__subtitle">{subtitle}</div>
                </div>
                {informer &&
                <div className="widget__box widget__box--left">
                    <div className="widget__informer">
                        {informer}
                    </div>
                </div>}
            </div>
        </div>
    );
}

Widget.propTypes = {
    invert: PropTypes.bool,
};

Widget.defaultProps = {
    invert: true,
};