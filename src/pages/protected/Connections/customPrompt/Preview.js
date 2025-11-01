import React from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import logoSrc from 'assets/Images/Common/letsnotify.png';
import { getPositionStyles } from 'constants/appConstant';
import { Box, Card, Tab, Typography } from '@mui/material';

const Preview = ({
  handleTabChange,
  tabValue,
  setTabValue,
  customPrompt,
  image,
}) => {
  return (
    <>
      <Box sx={{ height: '100%', width: '100%' }}>
        {/* <Box
          sx={{
            height: '60px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: '1.8px solid rgba(241, 242, 247, 1)',
            backgroundColor: 'background.paper',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="h7"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              Custom Prompt Preview
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip title="Device Comparison">
              <IconButton
                size="small"
                sx={{
                  color: tabValue === '1' ? 'primary.main' : 'text.secondary',
                  backgroundColor:
                    tabValue === '1' ? 'primary.light' : 'transparent',
                }}
                onClick={() => setTabValue('1')}
              >
                <DesktopWindowsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Device Comparison">
              <IconButton
                size="small"
                sx={{
                  color: tabValue === '2' ? 'primary.main' : 'text.secondary',
                  backgroundColor:
                    tabValue === '2' ? 'primary.light' : 'transparent',
                }}
                onClick={() => setTabValue('2')}
              >
                <PhoneIphoneIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box> */}

        <Box sx={{ height: 'calc(100% - 60px)' }}>
          <TabContext value={tabValue}>
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
                  sx={{ fontWeight: '600', fontSize: '16px', width: '50%' }}
                  value="1"
                />
                <Tab
                  label="Mobile"
                  sx={{ fontWeight: '600', fontSize: '16px', width: '50%' }}
                  value="2"
                />
              </TabList>
            </Box>

            <TabPanel sx={{ height: '62vh' }} value="1">
              <Box
                sx={{
                  mx: 'auto',
                  width: '90%',
                  borderRadius: 4,
                  height: '100%',
                  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                  border: '1.8px solid rgba(0,0,0,.12)',
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
                <Box
                  sx={{
                    width: '100%',
                    height: 'calc(100% - 40px)',
                    backgroundColor: '#f6f6f6',
                    display: 'flex',
                    p: 2,
                    justifyContent: 'center',
                    ...getPositionStyles(customPrompt?.desktopPosition),
                  }}
                >
                  <Card
                    sx={{
                      minWidth: 200,
                      maxWidth: 320,
                      borderRadius: 2,
                      p: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      bgcolor: '#fff',
                      boxShadow: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        width: '100%',
                        px: 1,
                      }}
                    >
                      {image?.logo && (
                        <Box
                          component="img"
                          src={image.logo}
                          alt="Logo"
                          sx={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'contain',
                            flexShrink: 0,
                          }}
                        />
                      )}

                      <Box display="flex" flexDirection="column" width="100%">
                        <Typography
                          variant="black_p"
                          sx={{
                            fontSize: '12px',
                            fontWeight: 600,
                            lineHeight: 1.2,
                            wordBreak: 'break-word',
                          }}
                        >
                          {customPrompt?.title}
                        </Typography>
                        <Typography
                          variant="black_p"
                          sx={{
                            fontSize: '10px',
                            color: 'text.secondary',
                            lineHeight: 1.3,
                            wordBreak: 'break-word',
                          }}
                        >
                          {customPrompt?.description}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',
                        fontSize: 10,
                        gap: 0.5,
                        px: 1,
                        mt: 0.5,
                        flexWrap: 'wrap',
                      }}
                    >
                      {customPrompt?.laterButtonText && (
                        <Box
                          sx={{
                            border: '0.5px solid gray',
                            color: 'gray',
                            px: 1,
                            py: 0.2,
                            borderRadius: 1,
                            fontSize: '10px',
                          }}
                        >
                          {customPrompt?.laterButtonText}
                        </Box>
                      )}
                      {customPrompt?.allowButtonText && (
                        <Box
                          sx={{
                            bgcolor: customPrompt?.allowButtonBackgroundColor,
                            color: customPrompt?.allowButtonTextColor,
                            px: 1.5,
                            py: 0.2,
                            borderRadius: 1,
                            fontSize: '10px',
                          }}
                        >
                          {customPrompt?.allowButtonText}
                        </Box>
                      )}
                    </Box>
                    <Box
                      display="flex"
                      width="100%"
                      justifyContent="flex-end"
                      alignItems="center"
                      px={1}
                      gap={0.5}
                      mt={0.5}
                    >
                      <Typography
                        sx={{ fontSize: '8px', color: 'text.secondary' }}
                      >
                        Powered by
                      </Typography>
                      <img className="h-3" src={logoSrc} alt="logo" />
                    </Box>
                  </Card>
                </Box>
              </Box>
            </TabPanel>

            <TabPanel sx={{ height: '62vh' }} value="2">
              <Box
                sx={{
                  position: 'relative',
                  mx: 'auto',
                  width: '65%',
                  borderRadius: 4,
                  height: '100%',
                  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                  border: '1.8px solid rgba(0,0,0,.12)',
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
                    />
                  ))}
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    height: 'calc(100% - 40px)',
                    backgroundColor: '#f6f6f6',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 2,
                    ...getPositionStyles(customPrompt?.mobilePosition),
                  }}
                >
                  <Card
                    sx={{
                      minWidth: 200,
                      maxWidth: 320,
                      borderRadius: 2,
                      p: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      bgcolor: '#fff',
                      boxShadow: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        width: '100%',
                        px: 1,
                      }}
                    >
                      {image?.logo && (
                        <img
                          src={image.logo}
                          alt="Logo"
                          style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'contain',
                            flexShrink: 0,
                          }}
                        />
                      )}
                      <Box display="flex" flexDirection="column" width="100%">
                        <Typography
                          variant="black_p"
                          sx={{
                            fontSize: '12px',
                            fontWeight: 600,
                            lineHeight: 1.2,
                            wordBreak: 'break-word',
                          }}
                        >
                          {customPrompt?.title}
                        </Typography>
                        <Typography
                          variant="black_p"
                          sx={{
                            fontSize: '10px',
                            color: 'text.secondary',
                            lineHeight: 1.3,
                            wordBreak: 'break-word',
                          }}
                        >
                          {customPrompt?.description}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',
                        fontSize: 10,
                        gap: 0.5,
                        px: 1,
                        mt: 0.5,
                        flexWrap: 'wrap',
                      }}
                    >
                      {customPrompt?.laterButtonText && (
                        <Box
                          sx={{
                            border: '0.5px solid gray',
                            color: 'gray',
                            px: 1,
                            py: 0.2,
                            borderRadius: 1,
                            fontSize: '10px',
                          }}
                        >
                          {customPrompt?.laterButtonText}
                        </Box>
                      )}
                      {customPrompt?.allowButtonText && (
                        <Box
                          sx={{
                            bgcolor: customPrompt?.allowButtonBackgroundColor,
                            color: customPrompt?.allowButtonTextColor,
                            px: 1.5,
                            py: 0.2,
                            borderRadius: 1,
                            fontSize: '10px',
                          }}
                        >
                          {customPrompt?.allowButtonText}
                        </Box>
                      )}
                    </Box>
                    <Box
                      display="flex"
                      width="100%"
                      justifyContent="flex-end"
                      alignItems="center"
                      px={1}
                      gap={0.5}
                      mt={0.5}
                    >
                      <Typography
                        sx={{ fontSize: '8px', color: 'text.secondary' }}
                      >
                        Powered by
                      </Typography>
                      <img className="h-3" src={logoSrc} alt="logo" />
                    </Box>
                  </Card>
                </Box>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </>
  );
};

export default Preview;
