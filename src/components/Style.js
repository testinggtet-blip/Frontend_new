import {
  Box,
  FormHelperText,
  TextField,
  Input,
  Checkbox,
} from '@mui/material';
import styled from '@emotion/styled';

//  ---------------------------------------------------- Main Layout  ------------------------------------------------------------

export const MainDashboard = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f0f2f5',
  paddingLeft: '1rem',
  paddingRight: '1rem',
}));

//  ---------------------------------------------------- Custom Scrollbar  ------------------------------------------------------------

export const tableScrollbar = {
  '&::-webkit-scrollbar': {
    width: '5px',
    height: '5px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'primary.main',
    borderRadius: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'primary.scroll',
  },
  '&::-webkit-scrollbar-thumb:horizontal': {
    backgroundColor: 'primary.main',
    borderRadius: '6px',
  },
  '&::-webkit-scrollbar-track:horizontal': {
    backgroundColor: 'primary.scroll',
  },
};
export const loginScrollbar = {
  '&::-webkit-scrollbar': {
    width: '5px',
    height: '5px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#FFF',
    borderRadius: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'primary.scroll',
  },
  '&::-webkit-scrollbar-thumb:horizontal': {
    backgroundColor: '#FFF',
    borderRadius: '6px',
  },
  '&::-webkit-scrollbar-track:horizontal': {
    backgroundColor: 'primary.scroll',
  },
};

//   ------------------------------------------------- List View Style  ---------------------------------------------------------------
export const hoverEffect = {
  display: 'flex',
  justifyItems: 'center',
  alignItems: 'center',
  marginLeft: '0px',
  backgroundColor: 'transparent',
  padding: '5px 8px',
  gap: '3px',
};

export const hoverdName = {
  width: '50%',
  marginLeft: '8%',
  textAlign: 'center',
};

export const paginationFooter = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  width: 'auto',
  justifyContent: { xs: 'center', md: 'space-between' },
  alignItems: 'center',
  marginLeft: '1px',
  maxHeight: '83vh',
};

export const paginationStyle = {
  width: { xs: '100%', md: 'auto' },
  marginY: { xs: 1, md: 0 },
  display: 'flex',
  justifyContent: 'center',
  flex: { md: 1 },
};

export const tablePagination = {
  '& .MuiTablePagination-actions': {
    display: 'none',
  },
  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
    display: 'flex',
    color: '#000000',
    gap: '0px',
  },
  '& .MuiTablePagination-select': {
    border: '1px solid #ABABAB',
    borderRadius: 1,
    padding: '0.29rem 0.59rem',
  },
  paddingLeft: '20px',
  width: { xs: '100%', md: 'auto', lg: '14.8%' },
  display: 'flex',
  justifyContent: { xs: 'center', md: 'flex-end' },
  flex: { md: -5 },
};

//   ---------------------------------------------- Search Bar Style ------------------------------------------------------------------

export const searchInputSX = {
  sx: {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
};

export const searchBoxSX = {
  width: '100%',
  height: 30,
  '& input': {
    height: '100%',
    padding: '6px 0px',
    width: '100%',
  },
  ml: 1,
  borderRadius: '0.1rem',
};

export const searchContainerSX = {
  width: '100%',
  display: 'flex',
  gap: 2,
  justifyContent: { xs: 'flex-start', md: 'space-between' },
  alignItems: 'center',
  textColor: 'black',
  marginY: '0.8rem',
};

export const searchDivSX = {
  height: '2.5rem',
  width: { xs: '100%', md: '25%' },
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#FBFBFB',
  borderRadius: '1.5rem',
  padding: '0px 6px',
  border: '2px solid #058270',
  boxSizing: 'border-box',
};

//   ---------------------------------------------- Modals Style ------------------------------------------------------------------

export const ForgotPwdModalStyle = {
  height: { md: '100%', sm: '80vh' },
  width: { md: '100%', sm: '100%' },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: '#FFF',
  textAlign: 'center',
  padding: 5,
  borderRadius: 5,
};

//   ---------------------------------------------- Inputs Style ------------------------------------------------------------------

export const CustomTextInput = styled(TextField)(({ theme }) => ({
  border: '1px solid red',
}));

export const CustomFormInput = styled(TextField)(({ theme }) => ({
  color: theme.palette.grey['400'],
  width: '100%',
  '& .MuiInputBase-input': {
    color: '#000000',
    userSelect: 'none',
  },
  '& label': {
    color: '#000000',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#000000',
  },
  '& .MuiInputLabel-root.Mui-disabled': {
    color: '#000000',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: '#000000',
  },
  '& .MuiInput-underline:hover:before': {
    borderBottomColor: '#000000',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#000000',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#000000',
    },
    '&:hover fieldset': {
      borderColor: '#000000',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000000',
    },
  },
}));

export const OuterTextField = styled(Input)(({ theme }) => ({
  color: 'black',
  width: '100%',
  borderRadius: '6px',
  border: '1px solid #64707D',
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

//   ---------------------------------------------- Main Container Style ------------------------------------------------------------------

export const ContainerStyle = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: { xs: '90vw', sm: '93vw', md: '83vw', lg: '82vw' },
    margin: '0',
    padding: '10px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'absolute',
  },
  topBar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  heading: {
    color: 'black',
  },
  listView: {
    flexGrow: 1,
    width: '100%',
    overflow: 'hidden',
  },
};

export const timeZoneStyle = {
  control: (base) => ({
    ...base,
    minHeight: '56px',
    borderRadius: '8px',
    borderColor: '#ccc',
    backgroundColor: 'transparent',
    '&:focus-within': {
      borderColor: '#000000',
      boxShadow: '0 0 0 1px #000000',
    },
    '&:hover': {
      borderColor: '#000000',
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#036355' : 'white',
    color: state.isSelected ? 'white' : 'black',
    '&:hover': {
      backgroundColor: state.isSelected ? '#036355' : '#e6f3f1',
      color: state.isSelected ? 'white' : 'black',
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: 'black',
  }),
  input: (base) => ({
    ...base,
    color: 'black',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#666',
  }),
};
