import React from 'react';
import PropTypes from 'prop-types';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { CustomCheckbox } from './CheckboxStyles';

/**
 * CheckBox Component
 * Renders a custom-styled Material UI checkbox with custom icons.
 */
const CheckBox = ({ checked, onChange }) => {
  return (
    <CustomCheckbox
      checked={checked}
      onChange={onChange}
      icon={<CheckBoxOutlineBlankIcon />}
      checkedIcon={<CheckBoxIcon />}
    />
  );
};

CheckBox.propTypes = {
  checked: PropTypes.bool,          // Whether checkbox is checked
  onChange: PropTypes.func,         // Change handler function
};

CheckBox.defaultProps = {
  checked: false,
  onChange: () => {},
};

export default CheckBox;