const { styled, Paper, Button, Grid, Box } = require('@mui/material');

export const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  padding: '6px',
  backgroundColor: '#D0D0D0',
  borderRadius: '4px',
  width: '142px',
}));

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isAnd',
})(({ theme, isAnd }) => ({
  width: '20px',
  height: '35px',
  fontSize: '16px',
  padding: '0',
  fontWeight: 'normal',
  backgroundColor: isAnd ? '#FFFFFF' : '#D0D0D0',
  color: '#000000',
  borderRadius: '4px',
  boxShadow: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: isAnd ? '#FFFFFF' : '#D0D0D0',
    boxShadow: 'none',
  },
}));

export const LineConnector = ({ left, top, height }) => {
  return (
    <Grid item xs={2}>
      <Box
        sx={{
          position: 'absolute',
          left: left,
          top: top,
          bottom: '0',
          width: '1px',
          height: height ? height : 'auto',
          backgroundColor: '#64707D',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: '10%',
          top: '57%',
          width: '9%',
          height: '1px',
          backgroundColor: '#64707D',
        }}
      />
    </Grid>
  );
};

export const segmentConditions = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white',
};
