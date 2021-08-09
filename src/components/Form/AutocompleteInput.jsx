import React from 'react';
import PropTypes from 'prop-types';
import { FeatherIcon, Form } from 'components';

const AutocompleteInput = props => {
    const {
        type,
        classes,
        value,
        setValue,
        placeholder,
        onKeyupCallback,
        searchResults,
        setSearchResults,
        handleValueChange,
    } = props;
    return (
        <div className={`autocomplete-input-wrapper ${searchResults.length > 0 ? 'show' : ''}`}>
            <div className="input-group">
                <input
                    type={type}
                    value={value}
                    className={`form-control ${classes}`}
                    placeholder={placeholder}
                    onKeyUp={onKeyupCallback}
                    onChange={handleValueChange}
                />
                <div className="input-group-append">
                    <Form.Button
                        text=""
                        classes="btn btn-outline-light"
                        icon={value.length > 0 ? <FeatherIcon icon="x" /> : <FeatherIcon icon="search" />}
                        onClick={() => {
                            setValue('');
                            return setSearchResults([]);
                        }}
                    />
                </div>
            </div>
            <div className="autocomplete-results-dropdown">
                {searchResults && searchResults.length > 0 &&
                <ul>
                    {searchResults.map((item, idx) => <li key={idx.toString()}>{item}</li>)}
                </ul>}
            </div>
        </div>
    );
};

AutocompleteInput.propTypes = {
    type: PropTypes.string,
    classes: PropTypes.string,
    placeholder: PropTypes.string,
    onKeyupCallback: PropTypes.func,
    searchResults: PropTypes.instanceOf(Array),
    handleValueChange: PropTypes.func,
    value: PropTypes.string,
    setValue: PropTypes.func,
};

AutocompleteInput.defaultProps = {
    type: 'text',
    classes: '',
    placeholder: '',
    onKeyupCallback: () => {},
    handleValueChange: () => {},
    searchResults: [],
    value: '',
    setValue: () => {}
};

export default AutocompleteInput;
