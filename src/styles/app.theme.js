import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#058270',
      light: '#ccfbf1',
      dark: '',
    },
    secondary: {
      main: '#212529',
      dark: '#000000',
    },
    grey: {
      400: '#ececec',
    },
    background: {
      default: '#ffffff',
      secondary: '#F5F5F5',
      scroll: '#ecf0f1',
      darkgreen: '#033A32',
    },
    error: {
      main: 'rgb(220 38 38)',
    },
  },

  typography: {
    fontFamily: 'Outfit, sans-serif',

    heading: {
      fontSize: '2.5em',
      color: '#000000',
    },
    subheading: {
      fontSize: '1.5em',
      color: '#000000',
    },
    fieldname: {
      fontSize: '1em',
      fontWeight: 'bold',
      color: '#000000',
    },
    placeholder: {
      fontSize: '0.9em',
      color: '#aaa',
    },

    // end
    h8: {
      color: '#000000',
      fontWeight: '500',
      fontSize: '1.2rem',
    },
    h7: {
      color: '#000000',
      fontWeight: 'bold',
      fontSize: '1.5rem',
    },
    h6: {
      color: '#0D0D0D',
      fontSize: '1.5rem',
      fontWeight: '500',
    },
    h5: {
      color: '#000000',
      fontSize: '1.5rem',
      fontWeight: '500'
    },
    h4: {
      fontWeight: 500,
      color: '#0D0D0D',
    },
    h2: {
      color: 'blue',
    },
    dashboardTitle: {
      color: '#000000',
      fontSize: '2rem',
      width: '100%',
      textAlign: 'left',
    },
    black_h3: {
      color: '#000000',
      fontSize: '1.4rem',
      fontWeight: 'bold',
    },
    black_h4: {
      color: '#000000',
    },
    black_h5: {
      color: '#000000',
      fontSize: '1rem',
    },
    black_h6: {
      color: '#000000',
      fontSize: '.8rem',
    },
    inputBlack: {
      color: '#000000',
      marginTop: '10px',
      paddingLeft: '0.5rem',
    },
    white_h4: {
      color: '#ffffff',
    },
    subtitle2: {
      color: '#0D0D0D',
      fontSize: '1.1rem',
      fontWeight: 500,
    },
    subtitle3: {
      color: '#0D0D0D',
      fontSize: '1rem',
      fontWeight: 400,
      marginBottom: '4px',
    },
    subtitle1: {
      fontWeight: 500,
      color: '#058270',
    },
    body1: {
      color: '#058270',
    },
    errorMsg: {
      color: '#ff9e9e',
    },
    errorSandyBrown: {
      color: '#FF0000',
    },
  },

  listItems: {
    buttonStyle: {
      padding: 1,
    },
    iconStyle: {
      minWidth: '10%',
      paddingRight: 2,
    },
  },

  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: '#000000',
          },
          '& label': {
            color: '#000000',
          },
        },
      },
    },
  },

  modules: {
    submitButtonsBox: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
      height: '8%',
      maxHeight: 'auto',
    },
  },
});

export default theme;
