// components/DateTimepicker/theme.js
import { createTheme } from '@mui/material/styles';

export const dateTimePickerTheme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#000000',
          maxWidth: '90%',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000000',
            borderWidth: '1px',
          },
        },
        notchedOutline: {
          borderWidth: '1px',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#000000',
          '&.Mui-focused': {
            color: '#000000',
          },
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#058270',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#04695b',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#000000',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#058270',
    },
  },
});