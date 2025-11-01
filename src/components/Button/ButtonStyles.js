import { styled, Button } from '@mui/material';

export const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.background.default,
  padding: '0.5rem 2rem',
  '&:hover': {
    backgroundColor: '#046053',
    transition: '0.3s ease-out',
    transform: 'scaleX(1)',
  },
}));

export const Outlined = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
  padding: '0.5rem 2rem',
  '&:hover': {
    backgroundColor: theme.palette.grey[400],
    transition: '0.3s ease-out',
    transform: 'scaleX(1)',
  },
}));

export const RoundButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#15B097',
  textTransform: 'none',
  color: '#FFFFFF',
  fontWeight: 'bold',
  fontSize: '1rem',
  borderRadius: '0.5rem',
  padding: '0.5rem 4rem',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: '#15B099',
    transition: '0.3s ease-out',
    transform: 'scaleX(1)',
  },
}));