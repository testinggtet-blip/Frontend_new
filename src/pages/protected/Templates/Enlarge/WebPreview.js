import React from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import logoSrc from 'assets/Images/Common/logo.png';
import WebInbox from 'assets/Images/WebInbox/WebInboxImage.jpg';
import CloseIcon from '@mui/icons-material/Close';

// import logoSrc from 'assets/Images/Common/letsnotify.png';
import { getPositionStyles } from 'constants/appConstant';
import {
  Box,
  Card,
  Button,
  Stack,
  Tab,
  Typography,
  IconButton,
} from '@mui/material';

const WebPreview = ({
  handleTabChange,
  tabValue,
  webInboxDetails,
  setting,
  web,
  cardBg = '#fff',
  primaryBtnColor = '#054d3b',
  secondaryBtnColor = '#054d3b',
  btnTextColor = '#fff',
  titleColor = '#181818',
  descColor = '#656565',
}) => {
  console.log('webs', webInboxDetails);
  return (
    <>
      {setting && (
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            pt: 3,
          }}
        >
          <Box
            sx={{
              borderRadius: 3,
              boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
              maxWidth: 420,
              width: '100%',
              overflow: 'hidden',
              background: webInboxDetails?.backgroundColor,
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '90vh', // ensures footer always visible
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                py: 1,
                background: webInboxDetails?.webInBoxIconColor,
                color: '#fff',
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  color: '#fff',
                  fontWeight: 600,
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 15,
                }}
              >
                {webInboxDetails?.welcomeHomePage}
              </Typography>
              <IconButton size="small" sx={{ color: '#fff' }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Tabs */}
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ p: 2, justifyContent: 'flex-start' }}
            >
              {['All', 'Promotions', 'Offers'].map((tab, idx) => (
                <Button
                  key={idx}
                  variant={idx === 0 ? 'contained' : 'outlined'}
                  sx={{
                    borderRadius: 20,
                    textTransform: 'none',
                    px: 3,
                    fontWeight: 600,
                    fontSize: 14,
                    background:
                      idx === 0
                        ? webInboxDetails?.webInBoxIconColor
                        : 'rgba(3, 58, 50, 0.08)',
                    color: idx === 0 ? '#FFFFFF' : '#585858',
                    borderColor:
                      idx === 0 ? '#004D40' : 'rgba(3, 58, 50, 0.12)',
                    '&:hover': {
                      background:
                        idx === 0 ? '#004D40' : 'rgba(3, 58, 50, 0.12)',
                    },
                  }}
                >
                  {tab}
                </Button>
              ))}
            </Stack>

            {/* Scrollable Content */}
            <Box sx={{ flex: 1, overflowY: 'auto', px: 2, pb: 0 }}>
              {[1, 2].map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    background: '#fff',
                    borderRadius: 2,
                    boxShadow: '0px 2px 6px rgba(0,0,0,0.08)',
                    mb: 2,
                    overflow: 'hidden',
                  }}
                >
                  {/* Banner */}
                  <Box
                    component="img"
                    src={index === 0 ? WebInbox : undefined}
                    alt="notification"
                    sx={{
                      width: '100%',
                      height: index === 0 ? 140 : 0,
                      objectFit: 'cover',
                      display: index === 0 ? 'block' : 'none',
                    }}
                  />

                  {/* Content */}
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="flex-start"
                    >
                      <Box
                        component="img"
                        src={logoSrc}
                        alt=""
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: 1,
                          objectFit: 'contain',
                          flexShrink: 0,
                          mt: 0.3,
                        }}
                      />
                      <Box flex={1}>
                        <Typography
                          sx={{
                            color: webInboxDetails?.textColor,
                            fontWeight: 600,
                            fontSize: 15,
                            lineHeight: 1.3,
                          }}
                        >
                          {webInboxDetails?.title || 'Buy your dream home!'}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            mt: 0.5,
                            fontSize: 13,
                            lineHeight: 1.4,
                            color: webInboxDetails?.descriptionColor,
                          }}
                        >
                          {webInboxDetails?.description ||
                            'Avail home loan with DS bank and get 12 EMI waived off. T&C apply.'}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Buttons */}
                  <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        background: webInboxDetails?.webInBoxIconColor,
                        color: webInboxDetails?.btnTextColor,
                        borderRadius: 0,
                        fontWeight: 600,
                        fontSize: 13,
                        py: 1,
                      }}
                    >
                      {index === 0 ? 'Apply Now' : 'Apply'}
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        background: webInboxDetails?.webInBoxIconColor,
                        color: webInboxDetails?.btnTextColor,
                        borderRadius: 0,
                        fontWeight: 600,
                        fontSize: 13,
                        py: 1,
                      }}
                    >
                      {index === 0 ? 'Get Call Back' : 'Other Cards'}
                    </Button>
                  </Stack>
                </Box>
              ))}
            </Box>

            {/* Footer */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              py={1}
            >
              <Typography variant="caption" color="textSecondary">
                Powered by
              </Typography>

              <Box
                component="img"
                src={logoSrc}
                alt="logo"
                sx={{ height: 16, mx: 0.5 }}
              />
              <Typography variant="caption" color="textSecondary">
                Lets Notify
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {web && (
        <Box sx={{ height: '100%', width: '100%' }}>
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
                    minHeight: 36,
                    p: 0,
                  }}
                >
                  <Tab
                    label="Desktop"
                    sx={{
                      fontWeight: '600',
                      fontSize: '16px',
                      width: '50%',
                      minHeight: 36,
                      py: 0.5,
                    }}
                    value="1"
                  />
                  <Tab
                    label="Mobile"
                    sx={{
                      fontWeight: '600',
                      fontSize: '16px',
                      width: '50%',
                      minHeight: 36,
                      py: 0.5,
                    }}
                    value="2"
                  />
                </TabList>
              </Box>

              <TabPanel sx={{ height: '75vh' }} value="1">
                <Box
                  sx={{
                    mx: -1.5,
                    width: '105%',
                    borderRadius: 8,
                    height: '100%',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                    border: '1.8px solid rgba(0,0,0,.12)',
                    overflow: 'hidden',
                    background: '#F4F4F4',
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
                      background: '#FFF',
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
                      background: cardBg || '#fff',
                      borderRadius: 3,
                      boxShadow: '0px 3px 6px rgba(0,0,0,0.15)',
                      maxWidth: 380,
                      margin: `${
                        webInboxDetails?.bannerPreview !== undefined
                          ? '12%'
                          : '20%'
                      } auto`,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Banner */}
                    {webInboxDetails?.bannerPreview && (
                      <Box
                        component="img"
                        src={webInboxDetails?.bannerPreview}
                        alt="notification"
                        sx={{
                          width: '100%',
                          height: 150,
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    )}

                    {/* Content */}
                    <Box sx={{ px: 2, py: 2, flexGrow: 1 }}>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Box
                          component="img"
                          src={logoSrc}
                          alt=""
                          sx={{
                            width: 38,
                            height: 38,
                            borderRadius: 1,
                            objectFit: 'contain',
                            flexShrink: 0,
                            mt: 1,
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 700,
                              color: titleColor,
                              fontSize: 17,
                              lineHeight: 1.22,
                            }}
                          >
                            {webInboxDetails?.title || 'Buy your dream home!'}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: descColor,
                              mt: 0.3,
                              fontSize: 14,
                              lineHeight: 1.3,
                            }}
                          >
                            {webInboxDetails?.description ||
                              'Avail home loan with DS bank and get 12 EMI waived off. T&C apply.'}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>

                    {/* Buttons flush at bottom */}
                    <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          background: primaryBtnColor,
                          color: btnTextColor,
                          borderRadius: '0 0 0 12px',
                          boxShadow: 'none',
                          fontWeight: 600,
                          fontSize: 14,
                          py: 1,
                          '&:hover': { background: primaryBtnColor },
                        }}
                      >
                        {webInboxDetails?.actionButtons?.[0]?.title ||
                          'Apply Now'}
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          background: secondaryBtnColor,
                          color: btnTextColor,
                          borderRadius: '0 0 12px 0',
                          boxShadow: 'none',
                          fontWeight: 600,
                          fontSize: 14,
                          py: 1,
                          '&:hover': { background: secondaryBtnColor },
                        }}
                      >
                        {webInboxDetails?.actionButtons?.[1]?.title ||
                          'Get Call Back'}
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </TabPanel>

              <TabPanel sx={{ height: '78vh' }} value="2">
                <Box
                  sx={{
                    mx: 'auto',
                    width: '70%',
                    borderRadius: 8,
                    height: '100%',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                    border: '1px solid rgba(0,0,0,.12)',
                    overflow: 'hidden',
                    background: '#F4F4F4',
                  }}
                >
                  {/* Top notch / status bar */}
                  <Box
                    sx={{
                      height: 30,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      background: '#FFF',
                      borderBottom: '1px solid rgba(0,0,0,.1)',
                    }}
                  >
                    <Box
                      sx={{
                        width: 100,
                        height: 6,
                        borderRadius: 3,
                        background: '#ccc',
                      }}
                    />
                  </Box>

                  {/* Notification content */}
                  <Box
                    sx={{
                      background: cardBg || '#fff',
                      borderRadius: 3,
                      boxShadow: '0px 3px 6px rgba(0,0,0,0.15)',
                      maxWidth: 260,
                      margin: `${
                        webInboxDetails?.bannerPreview !== undefined
                          ? '22%'
                          : '40%'
                      } auto`,
                      overflow: 'hidden',
                    }}
                  >
                    {/* Banner (optional) */}
                    {webInboxDetails?.bannerPreview && (
                      <Box
                        component="img"
                        src={webInboxDetails?.bannerPreview}
                        alt="notification"
                        sx={{
                          width: '100%',
                          height: 100,
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    )}

                    {/* Text + Logo */}
                    <Box sx={{ px: 1.5, py: 1 }}>
                      <Stack direction="row" alignItems="center" spacing={1.2}>
                        <Box
                          component="img"
                          src={logoSrc}
                          alt="logo"
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: 1,
                            objectFit: 'contain',
                            flexShrink: 0,
                            mt: 1,
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 600,
                              color: titleColor,
                              fontSize: 14.5,
                              lineHeight: 1,
                            }}
                          >
                            {webInboxDetails?.title || 'Buy your dream home!'}
                          </Typography>
                          <Typography
                            sx={{
                              color: descColor,
                              mt: 0.6,
                              fontSize: 13,
                              lineHeight: 1.35,
                            }}
                          >
                            {webInboxDetails?.description ||
                              'Avail home loan with DS bank and get 12 EMI waived off. T&C apply.'}
                          </Typography>
                        </Box>
                      </Stack>

                      {/* Buttons (stacked for mobile) */}
                      <Stack spacing={1} sx={{ mt: 1.5 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            background: primaryBtnColor,
                            color: btnTextColor,
                            fontWeight: 600,
                            fontSize: 12,
                            py: 0.5,
                            borderRadius: 2,
                            '&:hover': { background: primaryBtnColor },
                          }}
                        >
                          {webInboxDetails?.actionButtons?.[0]?.title ||
                            'Apply'}
                        </Button>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            background: secondaryBtnColor,
                            color: btnTextColor,
                            fontWeight: 600,
                            fontSize: 11,
                            py: 0.5,
                            borderRadius: 2,
                            '&:hover': { background: secondaryBtnColor },
                          }}
                        >
                          {webInboxDetails?.actionButtons?.[1]?.title ||
                            'Cancel'}
                        </Button>
                      </Stack>
                    </Box>
                  </Box>
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      )}
    </>
  );
};

export default WebPreview;
