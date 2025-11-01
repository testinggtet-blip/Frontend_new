import {
  Box,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import logoSrc from '../assets/Images/Common/logo.png';
export const ImageGridLayout = ({
  title,
  subtitle,
  image,
  children,
  imageMarginTop,
  logoMarginTop,
  subtitleWidth,
  maxWidth,
  aboutPage = false,
}) => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationKey((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#044E43',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <Grid container sx={{ flex: 1, height: '100%', overflow: 'hidden' }}>
        {isMediumScreen && (
          <Grid
            item
            md={7.5}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'left',
              height: '100%',
              padding: 3,
              boxSizing: 'border-box',
              background: 'linear-gradient(135deg, #044E43 0%, #02322A 100%)',
            }}
          >
            <Box display="flex" alignItems="center" mt={logoMarginTop} ml={5}>
              <IconButton disableRipple>
                <img width={50} src={logoSrc} alt="Logo" />
              </IconButton>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontStyle: 'normal',
                  fontSize: '2rem',
                  color: '#FFFFFF',
                }}
              >
                Lets Notify
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="left"
              alignItems="center"
              width={subtitleWidth}
              ml={9}
            >
              <Typography
                color="#FFFFFF"
                fontSize="1.8rem"
                key={`text-${animationKey}`}
                sx={{
                  animation: `fadeIn 0.7s ease-in-out`,
                  '@keyframes fadeIn': {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                  },
                }}
              >
                {aboutPage === false ? (
                  <>
                    {title}
                    <span
                      style={{
                        fontSize: '1.8rem',
                        fontWeight: 'bold',
                        color: '#08FFD9',
                      }}
                    >
                      {subtitle}
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      style={{
                        fontSize: '1.8rem',
                        fontWeight: 'bold',
                        color: '#08FFD9',
                      }}
                    >
                      {subtitle}
                    </span>
                    {title}
                  </>
                )}
              </Typography>
            </Box>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
            >
              <img
                src={image}
                style={{
                  maxWidth: maxWidth,
                  marginTop: imageMarginTop,
                  animation: `float 3s ease-in-out infinite`,
                  '@keyframes float': {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-15px)' },
                    '100%': { transform: 'translateY(0px)' },
                  },
                }}
                alt="auth visual"
                key={`image-${animationKey}`}
              />
            </Box>
          </Grid>
        )}

        <Grid item md={isMediumScreen ? 4.5 : 12} xs={12}>
          <Box
            height="100vh"
            width="100%"
            backgroundColor="#FFFFFF"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              padding: 3,
              boxSizing: 'border-box',
            }}
          >
            {children}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
