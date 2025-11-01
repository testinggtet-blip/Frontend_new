import React, { useState } from 'react';
import AppleIcon from '@mui/icons-material/Apple';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import MacDesktop from '../../../../assets/Images/Template/MacDesktop.png';
import WindowsDesktop from '../../../../assets/Images/Template/WindowsDesktop.png';
import MacPhone from '../../../../assets/Images/Template/MacPhone.png';
import WindowsPhone from '../../../../assets/Images/Template/WindowsPhone.png';
import MacTablet from '../../../../assets/Images/Template/MacTablet.png';
import WindowIcon from '@mui/icons-material/Window';
import { getPositionStyles } from 'constants/appConstant';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Paper, Tab, Typography } from '@mui/material';

const Preview = ({
  handleTabChange,
  tabValue,
  setTabValue,
  customPrompt,
  image = '',
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState('Apple');
  const [selectedDevice, setSelectedDevice] = useState('Desktop');

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
    setSelectedDevice('Desktop');
  };

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
  };

  const renderComponent = () => {
    if (selectedPlatform === 'Apple') {
      switch (selectedDevice) {
        case 'Desktop':
          return <AppleDesktopComponent />;
        case 'Mobile':
          return <AppleMobileComponent />;
        case 'Tablet':
          return <AppleTabletComponent />;
        default:
          return null;
      }
    } else if (selectedPlatform === 'Windows') {
      switch (selectedDevice) {
        case 'Desktop':
          return <WindowsDesktopComponent />;
        case 'Mobile':
          return <WindowsMobileComponent />;
        case 'Tablet':
          return <WindowsTabletComponent />;
        default:
          return null;
      }
    }
    return null;
  };

  return (
    <>
      <Box sx={{ height: 'calc(100% - 260px)' }}>
        <TabContext value={tabValue}>
          {/* Tab List */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleTabChange}
              aria-label="Device Tabs"
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Tab
                label="Desktop"
                sx={{ fontWeight: '600', fontSize: '16px', width: '33%' }}
                value="1"
              />
              <Tab
                label="Mobile"
                sx={{ fontWeight: '600', fontSize: '16px', width: '33%' }}
                value="2"
              />
              <Tab
                label="Tablet"
                sx={{ fontWeight: '600', fontSize: '16px', width: '33%' }}
                value="3"
              />
            </TabList>
          </Box>

          {/* Platform Selection UI between TabList and TabPanel */}

          {/* Tab Panels (Your existing Desktop and Mobile UI) */}
          <TabPanel sx={{ height: '62vh' }} value="1">
            <AppleDesktopComponent />
            {/* Your Desktop Preview Card UI here (unchanged) */}
          </TabPanel>

          <TabPanel sx={{ height: '62vh' }} value="2">
            <WindowsMobileComponent />
            {/* Your Mobile Preview Card UI here (unchanged) */}
          </TabPanel>

          <TabPanel sx={{ height: '62vh' }} value="3">
            <AppleTabletComponent />
            {/* Your Mobile Preview Card UI here (unchanged) */}
          </TabPanel>
        </TabContext>
      </Box>

      {/* <Paper elevation={3} sx={{ width: '40%', p: 2, height: 'auto' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant="h6">Preview</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  component="span"
                  onClick={() => handlePlatformSelect('Apple')}
                  sx={{ cursor: 'pointer', mr: 2 }}
                >
                  <AppleIcon
                    sx={{
                      color:
                        selectedPlatform === 'Apple'
                          ? 'primary.main'
                          : 'text.secondary',
                    }}
                  />
                </Box>
                <Box
                  component="span"
                  onClick={() => handlePlatformSelect('Windows')}
                  sx={{ cursor: 'pointer' }}
                >
                  <WindowIcon
                    sx={{
                      color:
                        selectedPlatform === 'Windows'
                          ? 'primary.main'
                          : 'text.secondary',
                    }}
                  />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  onClick={() => handleDeviceSelect('Desktop')}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {selectedPlatform === 'Apple' ? (
                    <DesktopMacIcon
                      sx={{
                        color:
                          selectedDevice === 'Desktop'
                            ? 'primary.main'
                            : 'text.secondary',
                      }}
                    />
                  ) : (
                    <DesktopWindowsIcon
                      sx={{
                        color:
                          selectedDevice === 'Desktop'
                            ? 'primary.main'
                            : 'text.secondary',
                      }}
                    />
                  )}
                  <Typography
                    variant="caption"
                    color={
                      selectedDevice === 'Desktop'
                        ? 'primary'
                        : 'text.secondary'
                    }
                  >
                    Desktop
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  onClick={() => handleDeviceSelect('Mobile')}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {selectedPlatform === 'Apple' ? (
                    <PhoneIphoneIcon
                      sx={{
                        color:
                          selectedDevice === 'Mobile'
                            ? 'primary.main'
                            : 'text.secondary',
                      }}
                    />
                  ) : (
                    <PhoneAndroidIcon
                      sx={{
                        color:
                          selectedDevice === 'Mobile'
                            ? 'primary.main'
                            : 'text.secondary',
                      }}
                    />
                  )}
                  <Typography
                    variant="caption"
                    color={
                      selectedDevice === 'Mobile' ? 'primary' : 'text.secondary'
                    }
                  >
                    Mobile
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  onClick={() => handleDeviceSelect('Tablet')}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {selectedPlatform === 'Apple' ? (
                    <TabletMacIcon
                      sx={{
                        color:
                          selectedDevice === 'Tablet'
                            ? 'primary.main'
                            : 'text.secondary',
                      }}
                    />
                  ) : (
                    <TabletAndroidIcon
                      sx={{
                        color:
                          selectedDevice === 'Tablet'
                            ? 'primary.main'
                            : 'text.secondary',
                      }}
                    />
                  )}
                  <Typography
                    variant="caption"
                    color={
                      selectedDevice === 'Tablet' ? 'primary' : 'text.secondary'
                    }
                  >
                    Tablet
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
          <Box sx={{ mt: 2 }}>{renderComponent()}</Box>
        </>
      )} */}
    </>
  );
};

// Device components remain unchanged
const AppleDesktopComponent = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <img src={MacDesktop} alt="Apple Desktop" style={{ maxWidth: '100%' }} />
  </Box>
);

const AppleMobileComponent = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <img src={MacPhone} alt="Apple Mobile" style={{ maxWidth: '100%' }} />
  </Box>
);

const AppleTabletComponent = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <img src={MacTablet} alt="Apple Tablet" style={{ maxWidth: '100%' }} />
  </Box>
);

const WindowsDesktopComponent = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <img
      src={WindowsDesktop}
      alt="Windows Desktop"
      style={{ maxWidth: '100%' }}
    />
  </Box>
);

const WindowsMobileComponent = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <img src={WindowsPhone} alt="Windows Mobile" style={{ maxWidth: '100%' }} />
  </Box>
);

const WindowsTabletComponent = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <img src={MacTablet} alt="Windows Tablet" style={{ maxWidth: '100%' }} />
  </Box>
);

export default Preview;