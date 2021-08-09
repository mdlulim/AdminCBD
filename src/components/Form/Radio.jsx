import React from 'react';

const Radio = props => {
    const {
        id,
        name,
        classes,
        disabled,
        defaultChecked,
        onChange,
        checked,
        label,
        value,
        register,
    } = props;
    return (
        <div className={`custom-control custom-radio ${classes}`}>
            <input
                type="radio"
                id={id}
                name={name}
                className="custom-control-input"
                defaultChecked={defaultChecked}
                checked={checked}
                value={value}
                onChange={onChange}
                ref={register}
                disabled={disabled}
            />
            <label
                className="custom-control-label"
                htmlFor={id}
            >
                {label}
            </label>
        </div>
    );
};

export default Radio;
