import React, { useEffect, useRef, useState } from 'react';
import { Box, FormHelperText, IconButton, InputAdornment } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ColorPicker from '@rc-component/color-picker';
import '@rc-component/color-picker/assets/index.css';
import { CustomFormInput, CustomTextInput } from './Style';
import EmailLink from './Email';
import CustomTooltip from './Tooltip/Tooltip';

const ariaLabel = { 'aria-label': 'description' };

export const InnerTextField = ({
  colorSelection,
  placeholder,
  label,
  onChange,
  name,
  error,
  multiline = false,
  rows,
  fullWidth = true,
  type = 'text',
  margin = 'normal',
  helperText,
  value,
  disabled,
  readOnly,
  size = 'large',
  tooltip = false,
}) => {
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const colorPickerRef = useRef(null);

  const toggleColorPicker = () => {
    setOpenColorPicker(!openColorPicker);
  };

  const handleClickOutside = (event) => {
    if (
      colorPickerRef.current &&
      !colorPickerRef.current.contains(event.target)
    ) {
      setOpenColorPicker(false);
    }
  };

  useEffect(() => {
    if (openColorPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openColorPicker]);

  const SetColor = (val) => {
    const event = {
      target: {
        name: name,
        value: val.toHexString ? val.toHexString() : val, // handles both input typing and color picker
      },
    };
    onChange(event);
  };

  const sizeStyles = {
    small: {
      height: '30px',
      width: '160px',
      fontSize: '12px',
    },
    medium: {
      height: '35px',
      fontSize: '14px',
    },
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <CustomFormInput
        placeholder={placeholder}
        label={label}
        type={type}
        fullWidth={fullWidth}
        margin={margin}
        onChange={(e) => SetColor(e.target.value)}
        name={name}
        value={value}
        error={error}
        multiline={multiline}
        rows={rows}
        disabled={disabled}
        size={size}
        InputProps={{
          readOnly: readOnly,
          style: {
            userSelect: 'none',
            pointerEvents: readOnly ? 'none' : 'auto',
            height: sizeStyles[size]?.height,
            width: sizeStyles[size]?.width,
            fontSize: sizeStyles[size]?.fontSize,
          },
          ...(tooltip && {
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <CustomTooltip
                  title={
                    <>
                      If you would like to change the email address, please drop
                      an email - <EmailLink />
                    </>
                  }
                  placement="bottom"
                >
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </CustomTooltip>
              </InputAdornment>
            ),
          }),
        }}
        sx={{
          '.MuiInputBase-input': {
            userSelect: 'none',
            pointerEvents: readOnly ? 'none' : 'auto',
          },
        }}
      />
      {error && <FormHelperText error>{helperText}</FormHelperText>}

      {colorSelection && (
        <>
          <Box
            onClick={toggleColorPicker}
            sx={{
              borderRadius: 1,
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: 10,
              height: 30,
              width: 30,
              backgroundColor: value,
              cursor: 'pointer',
              border: '1px solid #ccc',
            }}
          />
          {openColorPicker && (
            <Box
              ref={colorPickerRef}
              sx={{ position: 'absolute', bottom: '0%', left: '55%' }}
            >
              <ColorPicker value={value} onChange={SetColor} />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export const OuterInputField = ({
  placeholder,
  style,
  onChange,
  name,
  type = 'text',
  error,
  helperText,
  margin = 'normal',
  multiline = false,
  value,
}) => {
  return (
    <>
      <CustomFormInput
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
      />
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </>
  );
};

// TODO :: realTime Notification Input CleanUp

export const NotifyInput = () => {
  return <CustomTextInput label="Outlined" variant="outlined" />;
};
