import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  Grid,
  Tooltip,
  Container,
} from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { protectedRoutes } from 'constants/appRoutes';
import toast from 'react-hot-toast';
import WebIcon from '../../../assets/Images/Connection/HTML_CSS_Icon.jpg';
import WordpressIcon from '../../../assets/Images/Connection/Wordpress_Icon.png';
import ShopifyIcon from '../../../assets/Images/Connection/Shopify_Icon.png';
import EmailLink from 'components/Email';
// import PlatformIntegrationGuide from './PlatformIntegrationGuide';
import { FetchAllSubscribers, GetAllKeys, TestNotification } from 'Api/Api';
import PlatformIntegrationGuide from './Platform';

const CodeInjection = ({
  apiKey,
  secretKey,
  connectionId,
  setSecretKey,
  setApiKey,
}) => {
  const navigate = useNavigate();
  const textFieldRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedPlatform, setSelectedPlatform] = useState('Web');

  const platformIcons = [
    {
      icon: WebIcon,
      name: 'Web',
      description: 'Integrate push notifications into your web application',
      status: 'active',
    },
    {
      icon: WordpressIcon,
      name: 'Wordpress',
      description: 'Add push notifications to your Wordpress site',
      status: 'active',
    },
    {
      icon: ShopifyIcon,
      name: 'Shopify',
      description: 'Enable push notifications for your Shopify store',
      status: 'coming_soon',
    },
    // {
    //   icon: JavaIcon,
    //   name: 'Cloud',
    //   description: 'Cloud-based push notification services',
    //   status: 'coming_soon',
    // },
  ];

  //  async function copyPublicKey() {
  //   const response = await GetAllKeys();
  //   if (response.status === 200) {
  //     navigator.clipboard.writeText(response.data.public_key);
  //     toast.success('Copied successfully');
  //   } else {
  //     toast.error(response.data.message);
  //   }
  // }

  // async function sendTestPushNotification() {
  //   try {
  //     let subscriberId = localStorage.getItem('subscriberId');
  //     if (
  //       subscriberId === null ||
  //       subscriberId === undefined ||
  //       subscriberId.length < 5
  //     ) {
  //       toast.error('Please Intigrate the SDK first');
  //       fetch();
  //     }
  //     const testPayload = {
  //       isTestNotification: true,
  //       subscriptionId: subscriberId,
  //       templateId: 0,
  //     };
  //     const response = await TestNotification(testPayload);
  //     if (response?.data?.status === true) {
  //       toast.success(response?.data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message);
  //   }
  // }

  const fetchSubscribers = async () => {
    try {
      const response = await FetchAllSubscribers();
      if (response?.data?.status && response?.data?.data[0]?.subscriptionId) {
        localStorage.setItem(
          'subscriberId',
          response.data.data[0].subscriptionId
        );
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleCompleteSetup = () => {
    setApiKey('');
    setSecretKey('');
    navigate(protectedRoutes.connections);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 1, px: { xs: 1, sm: 2, md: 0 } }}>
      <Grid container spacing={2} justifyContent="center" alignItems="stretch">
        {platformIcons.map((platform) => (
          <Grid item xs={6} sm={4} md={3} key={platform.name}>
            <Paper
              onClick={() =>
                platform.status === 'active' &&
                setSelectedPlatform(platform.name)
              }
              elevation={platform.status === 'active' ? 3 : 1}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 1.5,
                transition: 'all 0.3s ease',
                opacity: platform.status === 'active' ? 1 : 0.5,
                border:
                  selectedPlatform === platform.name
                    ? `3px solid ${theme.palette.primary.main}`
                    : platform.status === 'active'
                    ? '2px solid transparent'
                    : '2px dashed gray',
                cursor:
                  platform.status === 'active' ? 'pointer' : 'not-allowed',
                '&:hover':
                  platform.status === 'active'
                    ? { transform: 'scale(1.05)', boxShadow: theme.shadows[6] }
                    : {},
              }}
            >
              <Tooltip title={platform.description} placement="top" arrow>
                <Box
                  sx={{
                    width: { xs: 60, sm: 80 },
                    height: { xs: 60, sm: 80 },
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={platform.icon}
                    alt={platform.name}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              </Tooltip>
              <Typography
                variant="subtitle1"
                align="center"
                fontWeight={platform.status === 'active' ? 600 : 400}
                color={
                  platform.status === 'active'
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary
                }
              >
                {platform.name}
              </Typography>
              {platform.status === 'coming_soon' && (
                <Typography
                  variant="caption"
                  color="secondary"
                  sx={{
                    mt: 0.5,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                  }}
                >
                  Coming Soon
                </Typography>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box mt={2}>
        <PlatformIntegrationGuide
          selectedPlatform={selectedPlatform}
          connectionId={connectionId}
          apiKey={apiKey}
          secretKey={secretKey}
          textFieldRef={textFieldRef}
        />
      </Box>

      <Grid container spacing={0} justifyContent="center" sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={5}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleCompleteSetup}
            size={isMobile ? 'small' : 'medium'}
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.primary.dark },
            }}
          >
            Complete Setup
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              mt: 3,
              p: 2,
              backgroundColor: theme.palette.action.hover,
              borderRadius: 1,
            }}
          >
            <Typography
              variant="body2"
              align="center"
              color="text.secondary"
              sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}
            >
              To connect with specific providers,&nbsp;
              <EmailLink
                text="Email Us"
                style={{
                  fontWeight: 'bold',
                  color: theme.palette.primary.main,
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              />
            </Typography>
          </Box>
        </Grid>

        {/* <Grid item xs={12} sm={6} md={4}>
          <Button
            fullWidth
            variant="outlined"
            onClick={sendTestPushNotification}
            size={isMobile ? 'small' : 'medium'}
            sx={{
              borderColor: theme.palette.primary.light,
              color: theme.palette.primary.main,
            }}
          >
            Test Notification
          </Button>
        </Grid> */}

        {/* <Box>
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              p: 1.5,
              backgroundColor: theme.palette.action.hover,
              borderRadius: 1,
              color: theme.palette.text.secondary,
            }}
          >
            After integration, visit your website to see the browser permission
            popup. Allow notifications to receive test push notifications.
          </Typography>
        </Box> */}
      </Grid>
    </Container>
  );
};

export default CodeInjection;
