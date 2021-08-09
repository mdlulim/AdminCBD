import React from 'react';
import PropTypes from 'prop-types';

const Input = props => {
    const {
        classes,
        disabled,
        errors,
        id,
        name,
        register,
        type,
        placeholder,
        defaultValue,
        validate,
        style,
        size,
        onChange,
        errorText,
        label,
    } = props;
    return (
        <div className={`form-group ${validate && errors[id] ? 'is-invalid' : ''}`}>
            {label && <label htmlFor={id}>{label}</label>}
            <div className={`input-group-${size}`}>
                {validate && register ?
                <input
                    id={id}
                    type={type}
                    name={name}
                    className={`form-control ${classes} ${validate && errors[id] ? 'parsley-error' : ''}`}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    disabled={disabled}
                    ref={register}
                    style={style}
                    onChange={onChange}
                />
                :
                <input
                    id={id}
                    type={type}
                    name={name}
                    className={`form-control ${classes}`}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    disabled={disabled}
                    style={style}
                    onChange={onChange}
                />}
            </div>
            {validate && errors[id] &&
            <ul className="parsley-errors-list filled" id="parsley-id-5">
                {errorText
                ? <li className="parsley-required">{errorText}.</li>
                : <li className="parsley-required">This input should be a valid {name.split('_').join(' ')}.</li>}
            </ul>}
        </div>
    );
};

Input.propTypes = {
    classes: PropTypes.string,
    disabled: PropTypes.bool,
    errors: PropTypes.shape({}),
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    register: PropTypes.func,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    validate: PropTypes.bool,
    style: PropTypes.shape({}),
    size: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    errorText: PropTypes.string,
    label: PropTypes.string,
};

Input.defaultProps = {
    classes: '',
    disabled: false,
    errors: {},
    register: null,
    type: 'text',
    placeholder: '',
    validate: false,
    style: {},
    size: 'sm',
    onChange: () => {},
    defaultValue: '',
    value: '',
    errorText: null,
    label: null,
};

export default Input;
