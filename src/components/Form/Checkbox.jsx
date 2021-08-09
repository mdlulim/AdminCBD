import React from 'react';

const Checkbox = props => {
    const {
        id,
        name,
        classes,
        disabled,
        defaultChecked,
        checked,
        label,
        value,
        register,
    } = props;
    return (
        <div className={`custom-control custom-checkbox ${classes}`}>
            <input
                type="checkbox"
                id={id}
                name={name}
                className="custom-control-input"
                defaultChecked={defaultChecked}
                checked={checked}
                disabled={disabled}
                value={value}
                register={register}
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

export default Checkbox;
