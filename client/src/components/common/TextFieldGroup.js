//	it's basically an encapsulated control,we re taking the html control(<input type = 'text>) and encapsulating it in to our component with added properties and methods so that the user can use our special component
//RFC component
//detail explanation 4/12 
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

//whenever someone uses this componen//i want them to give the following obj as input in to my textfield group

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      <input
      //
        type={type}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
TextFieldGroup.propTypes ={
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
}

TextFieldGroup.defaultProps={
  type:'text'
}

export default TextFieldGroup;