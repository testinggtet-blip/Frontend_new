// components/InputField.js
import React from 'react';
import PropTypes from 'prop-types';
import { FormHelperText } from '@mui/material';
import { CustomInput, CustomTextField } from './InputFieldStyles';

const ariaLabel = { 'aria-label': 'description' };

/**
 * InputField
 * Reusable input with optional error and helper text.
 */
export const InputField = ({
  placeholder,
  style,
  onChange,
  name,
  type,
  error,
  helperText,
  margin,
  multiline,
  value,
  isReadable,
}) => {
  return (
    <>
      <CustomInput
        placeholder={placeholder}
        inputProps={ariaLabel}
        style={style}
        onChange={onChange}
        type={type}
        margin={margin}
        name={name}
        error={error}
        {...(multiline ? { multiline: true } : {})}
        value={value}
        readOnly={isReadable}
      />
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </>
  );
};

InputField.propTypes = {
  placeholder: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  margin: PropTypes.string,
  multiline: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isReadable: PropTypes.bool,
};

InputField.defaultProps = {
  placeholder: '',
  style: {},
  type: 'text',
  error: false,
  helperText: '',
  margin: 'normal',
  multiline: false,
  value: '',
  isReadable: false,
};

/**
 * NotifyInput
 * Example input with red border using MUI TextField
 */
export const NotifyInput = () => {
  return <CustomTextField label="Outlined" variant="outlined" />;
};