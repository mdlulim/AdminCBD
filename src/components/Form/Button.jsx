import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
    const {
        buttonLink,
        classes,
        disabled,
        icon,
        text,
        type,
        processing,
        processingText,
        onClick,
    } = props;
    return (
        <>
            {buttonLink &&
            <a
                href="/"
                className={classes}
                onClick={onClick}
            >
                {text}
            </a>}
            {!buttonLink &&
            <button
                type={type}
                className={classes}
                onClick={onClick}
                disabled={disabled || processing}
            >
                {processing
                ? (
                    <>
                        <span className="spinner-border spinner-border-sm mg-r-5" role="status" aria-hidden="true" />
                        <span>{processingText}...</span>
                    </>
                ) : (
                    <>
                        {icon && icon}
                        <span>{text}</span>
                    </>
                )}
            </button>}
        </>
    );
};

Button.propTypes = {
    buttonLink: PropTypes.bool,
    classes: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.any,
    text: PropTypes.string.isRequired,
    processingText: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    buttonLink: false,
    classes: 'btn btn-primary',
    disabled: false,
    icon: null,
    type: 'button',
    processingText: 'Processing',
    onClick: () => {},
};

export default Button;
