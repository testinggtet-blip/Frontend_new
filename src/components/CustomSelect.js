import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const CustomSelect = ({
  label,
  options,
  value,
  name,
  onChange,
  readOnly,
  size = '',
}) => {
  const sizeStyles = {
    small: {
      height: '30px',
      fontSize: '0.75rem', // Smaller font size
      padding: '2px 8px', // Smaller padding
    },
    medium: {
      height: '36px',
      fontSize: '0.875rem', // Default font size
      padding: '4px 12px', // Default padding
    },
    large: {
      height: '62px',
      fontSize: '1rem', // Larger font size
      padding: '6px 16px', // Larger padding
    },
  };

  const selectedSizeStyle = sizeStyles[size];

  return (
    <FormControl sx={{ minWidth: '100%' }}>
      <InputLabel
        sx={{
          color: '#000000',
          fontSize: selectedSizeStyle?.fontSize,
          '&.Mui-focused': {
            color: '#000000',
          },
          '&.Mui-disabled': {
            color: '#000000',
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        value={value}
        label={label}
        name={name}
        onChange={(e) => !readOnly && onChange(e)}
        inputProps={{ readOnly }}
        sx={{
          '& .MuiInputBase-input': {
            color: '#000000',
            padding: selectedSizeStyle?.padding,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000000',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000000',
          },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000000',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: readOnly ? '#000000' : undefined,
          },
          '& .MuiSelect-select.Mui-disabled': {
            backgroundColor: 'transparent',
            color: '#000000',
            WebkitTextFillColor: '#000000',
          },
          '& .MuiMenuItem-root': {
            color: '#000000',
          },
        }}
      >
        {options?.map((option, index) => (
          <MenuItem
            key={index}
            value={option.value}
            sx={{
              color: '#000000',
              fontSize: selectedSizeStyle?.fontSize,
              height: selectedSizeStyle?.height,
              padding: selectedSizeStyle?.padding,
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
