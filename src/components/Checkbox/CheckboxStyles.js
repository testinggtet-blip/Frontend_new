import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';

/**
 * CustomCheckbox
 * A styled MUI Checkbox with brand-specific colors and icon sizing.
 */
export const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  // Default (unchecked) icon color
  '&.MuiCheckbox-root': {
    color: '#9e9e9e',
  },

  // Checked state color
  '&.Mui-checked': {
    color: '#15B097',
  },

  // Adjust SVG icon size
  '& .MuiSvgIcon-root': {
    fontSize: 28,
  },

  // Hover effect
  '&:hover': {
    backgroundColor: 'rgba(8, 255, 217, 0.08)', // Light teal hover
  },
}));
