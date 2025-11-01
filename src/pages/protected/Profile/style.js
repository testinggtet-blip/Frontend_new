export const mainContainer = {
  width: '100%',
  height: 'calc(100vh - 20px)',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f4f6f8',
  paddingX: { xs: 2, sm: 3, md: 4 },
  paddingY: 3,
  overflowY: 'auto',
  overflowX: 'hidden',
  paddingTop: '70px',
};

export const TrackerContainer = {
  width: '100%',
  height: 'calc(100vh - 0px)',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f4f6f8',
  overflowY: 'auto',
  overflowX: 'hidden',
};

export const title = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100px',
};

export const profiletitle = {
  fontWeight: 'bold',
  marginTop: '-3.5%',
  marginBottom: '25px',
};

export const profileContainer = {
  mt: { xs: 1, sm: 2, md: 3 },
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 2, sm: 3, md: 4 },
};

export const profileGrid = {
  bgcolor: 'white',
  border: '1px solid #E0E0E0',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  padding: { xs: 1.5, sm: 2, md: 3 },
  borderRadius: 3,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
  },
};

export const avatar = {
  width: { xs: 100, sm: 125, md: 150 },
  height: { xs: 100, sm: 125, md: 150 },
  color: '#333',
  fontSize: { xs: 20, sm: 25, md: 30 },
  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'scale(1.05)',
    cursor: 'pointer',
  },
  '&:hover .MuiAvatar-img': {
    opacity: 0.7,
  },
};

export const hoveredAvatar = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: 100,
  height: 100,
  '& .MuiIconButton-root': {
    opacity: 0,
    transition: 'all .3s ease',
  },
  '&:hover .MuiIconButton-root': {
    opacity: 0.9,
  },
};

export const securityGrid = {
  ...profileGrid,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

export const securityGridEmail = {
  width: '80%',
  '& input:disabled': { color: 'black' },
  '& .MuiInputLabel-root': { color: '#black' },
  '& .focus': { border: 'none' },
};

export const deleteGrid = {
  ...profileGrid,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};
