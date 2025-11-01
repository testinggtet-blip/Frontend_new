// components/InputStyles.js
import styled from '@emotion/styled';
import { Input, TextField } from '@mui/material';

// Custom Input (unstyled MUI Input with borders & padding)
export const CustomInput = styled(Input)(({ theme }) => ({
  color: 'black',
  width: '100%',
  height: '45px',
  borderRadius: '6px',
  border: '1px solid #ABABAB',
  '&::before, &::after': {
    borderBottom: 'none !important',
  },
  '& .MuiInputBase-input': {
    padding: '0.75rem',
  },
  '& .MuiInput-underline:before': {
    borderBottom: 'none !important',
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottom: 'none !important',
  },
  '& .MuiInput-underline:after': {
    borderBottom: 'none !important',
  },
}));

// Optional text field (example usage)
export const CustomTextField = styled(TextField)(({ theme }) => ({
  border: '1px solid red',
}));
