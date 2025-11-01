import { BsStackOverflow } from 'react-icons/bs';

const CampaignStyle = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    height: '100vh',
    width: '100vw',
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.5)',
    overflow: 'hidden',
    padding: '20px',
  },
  topBar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2%',
    padding: '10px',
    backgroundColor: '#f5f5f5',
  },
  createDiv: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#ffffff',
  },
  searchBox: {
    width: '100%',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    marginBottom: '10px',
  },
  formContainer: {
    position: 'relative',
    width: '100%',
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor: '#fff',
  },
  toggleButton: {
    width: '100%',
    display: 'flex',
    paddingLeft: '10px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '20px',
  },
  inputField: {
    width: '100%',
    height: '40px',
    outline: '2px solid #058270',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1)',
    borderRadius: '5px',
    padding: '10px',
  },
  modalHeadingText: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  autoSelectStyle: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
      color: 'black',
    },
    '& .MuiInputLabel-root': {
      color: 'black',
      '&.Mui-focused': {
        color: 'black',
      },
    },
    '& .MuiAutocomplete-option': {
      color: 'black',
    },
  },
};

export const submitButton = {
  position: 'absolute',
  bottom: '1%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '40px',
  width: '95%',
  padding: '2rem',
  borderTop: '1px solid gray',
  overflow: 'hidden',
};
