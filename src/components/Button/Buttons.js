import React from 'react';
import PropTypes from 'prop-types';
import { CustomButton, Outlined, RoundButton } from './ButtonStyles';

/**
 * RoundedButton
 * A full-width button with rounded corners and custom background.
 */
export const RoundedButton = ({ type, title, style, sx, onClick }) => {
  return (
    <RoundButton type={type} style={style} sx={sx} onClick={onClick}>
      {title}
    </RoundButton>
  );
};

RoundedButton.propTypes = {
  type: PropTypes.string,             // Button type e.g., 'submit', 'button'
  title: PropTypes.string.isRequired, // Button text (required)
  style: PropTypes.object,            // Inline styles
  sx: PropTypes.object,               // MUI's system-based styles
  onClick: PropTypes.func,            // Click handler
};

RoundedButton.defaultProps = {
  type: 'submit',
  style: {},
  sx: {},
  onClick: () => {},
};

/**
 * ContainedButton
 * A MUI contained button with optional icon and styles.
 */
export const ContainedButton = ({ title, onClick, variant, sx, startIcon }) => {
  return (
    <CustomButton
      onClick={onClick}
      variant={variant}
      sx={sx}
      startIcon={startIcon}
    >
      {title}
    </CustomButton>
  );
};

ContainedButton.propTypes = {
  title: PropTypes.string.isRequired, // Button text (required)
  onClick: PropTypes.func,            // Click handler
  variant: PropTypes.string,          // MUI variant: 'contained' (default)
  sx: PropTypes.object,               // MUI system styles
  startIcon: PropTypes.node,          // Optional icon (ReactNode)
};

ContainedButton.defaultProps = {
  onClick: () => {},
  variant: 'contained',
  sx: {},
  startIcon: null,
};

/**
 * OutlinedButton
 * A MUI outlined button styled with a border and optional icon.
 */
export const OutlinedButton = ({ title, onClick, variant, sx, startIcon }) => {
  return (
    <Outlined
      onClick={onClick}
      variant={variant}
      sx={sx}
      startIcon={startIcon}
    >
      {title}
    </Outlined>
  );
};

OutlinedButton.propTypes = {
  title: PropTypes.string.isRequired, // Button text (required)
  onClick: PropTypes.func,            // Click handler
  variant: PropTypes.string,          // MUI variant: 'outlined' (default)
  sx: PropTypes.object,               // MUI system styles
  startIcon: PropTypes.node,          // Optional icon (ReactNode)
};

OutlinedButton.defaultProps = {
  onClick: () => {},
  variant: 'outlined',
  sx: {},
  startIcon: null,
};