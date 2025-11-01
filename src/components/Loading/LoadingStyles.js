// components/LoadingStyles.js
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

// Fullscreen overlay with center-aligned loader
export const FullscreenLoaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backdropFilter: 'blur(2px)',
}));