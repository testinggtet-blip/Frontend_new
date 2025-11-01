import React from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SlidingCard from './components/Cards/SlidingCard';

const FormPreview = ({
  handleTabChange,
  tabValue,
  setTabValue,
  survey,
  fullScreen = false,
}) => {
  return (
    <>
      <Box sx={{ height: 'calc(100% - 1px)' }}>
        <TabContext value={tabValue}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <TabList
              onChange={handleTabChange}
              aria-label="Device Tabs"
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                minHeight: '30px', // 👈 compact height
                '& .MuiTab-root': {
                  flex: 1, // equal width
                  fontWeight: 600,
                  fontSize: '18px', // 👈 smaller, cleaner
                  textTransform: 'none',
                  minHeight: '30px', // 👈 reduces height
                  padding: '6px',
                  borderRadius: '8px 8px 0 0', // rounded top corners
                },
              }}
            >
              <Tab label="Desktop" value="1" />
              <Tab label="Mobile" value="2" />
            </TabList>
          </Box>

          <TabPanel sx={{ height: '78vh' }} value="1">
            <Box
              sx={{
                mx: 'auto',
                width: '100%',
                borderRadius: 4,
                height: '100%',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                border: '1.8px solid rgba(0,0,0,.12)',
                bgcolor: '#f5f5f5',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '40px',
                  borderBottom: '1.8px solid rgba(0,0,0,.12)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  pl: 2,
                  bgcolor: '#fff',
                }}
              >
                {['#EC6A5E', '#F5BF4F', '#61C554'].map((color, index) => (
                  <Box
                    key={index}
                    sx={{
                      height: 15,
                      width: 15,
                      borderRadius: '50%',
                      backgroundColor: color,
                    }}
                  ></Box>
                ))}
              </Box>

              <SlidingCard survey={survey} preview={true} />
            </Box>
          </TabPanel>

          <TabPanel sx={{ height: '78vh' }} value="2">
            <Box
              sx={{
                mx: 'auto',
                width: '100%',
                borderRadius: 4,
                height: '100%',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                border: '1.8px solid rgba(0,0,0,.12)',
                overflow: 'hidden',
                bgcolor: '#f5f5f5',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '40px',
                  borderBottom: '1.8px solid rgba(0,0,0,.12)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  pl: 2,
                  bgcolor: '#fff',
                }}
              >
                {['#EC6A5E', '#F5BF4F', '#61C554'].map((color, index) => (
                  <Box
                    key={index}
                    sx={{
                      height: 15,
                      width: 15,
                      borderRadius: '50%',
                      backgroundColor: color,
                    }}
                  ></Box>
                ))}
              </Box>

              {/* There the code start  */}
              <SlidingCard survey={survey} preview={true} />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default FormPreview;
