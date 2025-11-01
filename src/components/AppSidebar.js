import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popover,
  Stack,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { protectedRoutes } from 'constants/appRoutes';
import logoSrc from 'assets/Images/Common/logo.png';
import { SideMenuItems, ProfileMenuItems } from '.././constants/appConstant';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearAuthDetails } from '../redux/reducers/authReducer';
import { GetUserDetails } from 'Api/Api';
import toast from 'react-hot-toast';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

const Drawer = styled('div')(({ theme }) => ({
  height: '100vh',
  width: '100%',
  maxWidth: '17%',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
  borderRight: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  top: 0,
  left: 0,

  // Responsive adjustments
  [theme.breakpoints.down('md')]: {
    position: 'fixed',
    zIndex: 1200,
    width: '100%',
    maxWidth: '100%',
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease-in-out',
    '&.open': {
      transform: 'translateX(0)',
    },
  },
}));

const ModuleListContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  scrollbarWidth: 'none', // Firefox
  '&::-webkit-scrollbar': {
    display: 'none', // Chrome, Safari, and Opera
  },
  maxHeight: 'calc(100vh - 50px)',
}));

const SidebarHeader = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const FixedBottomSection = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1.5),
  backgroundColor: '#033A32',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const ProfileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const FeatureRequestButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'white',
  color: '#033a32',
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1, 2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#f0f0f0',
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[2],
  },
}));

const SidebarListItem = styled(ListItemButton)(({ theme, selected }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  margin: theme.spacing(0.5, 0),
  height: 48,
  transition: 'all 0.2s ease',
  color: '#F8F8FF',
  '&:hover': {
    backgroundColor: 'rgba(7, 130, 111, 0.2)',
    transform: 'translateX(4px)',
  },
  ...(selected && {
    backgroundColor: 'rgba(8, 130, 111, 0.4)',
    color: '#F8F8FF',
    '&:hover': {
      backgroundColor: 'rgba(8, 130, 111, 0.5)',
    },
  }),
}));

const RenderListItem = ({
  eachItem,
  index,
  openIndex,
  handleClick,
  isActive,
  navigate,
}) => {
  const theme = useTheme();
  const IconComponent =
    isActive(eachItem.link) ||
    eachItem.child?.some((child) => isActive(child.link))
      ? eachItem.icon.active
      : eachItem.icon.inactive;

  const isItemActive =
    isActive(eachItem.link) ||
    eachItem.child?.some((child) => isActive(child.link));

  const handleItemClick = () => {
    if (!eachItem.comingSoon) {
      handleClick(index);
    }
  };

  return (
    <React.Fragment key={index}>
      <ListItem disablePadding sx={{ position: 'relative', width: '100%' }}>
        {isItemActive && (
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '4px',
              height: '50%',
              backgroundColor: '#49FFE3',
              borderRadius: 1,
              marginRight: theme.spacing(1),
            }}
          />
        )}
        <SidebarListItem
          selected={isItemActive}
          onClick={handleItemClick}
          sx={{
            width: 'calc(100% - 4px - 8px)',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: theme.spacing(1),
            px: theme.spacing(2),
            position: 'relative',
            fontSize: '1.1rem',
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 'auto',
              mr: theme.spacing(0),
              color: isItemActive ? '#F0F8FF' : '#B2D8D2',
            }}
          >
            <IconComponent />
          </ListItemIcon>
          <ListItemText
            primary={eachItem.name}
            primaryTypographyProps={{
              variant: 'body2',
              sx: {
                color: isItemActive ? 'F0F8FF' : '#B2D8D2',
                fontWeight: isItemActive ? 500 : 400,
                wordSpacing: '2px',
                fontSize: {
                  xs: '1.1rem',
                  sm: '1.2rem',
                  md: '1.2rem',
                },
              },
            }}
          />
          {eachItem.comingSoon && (
            <Box
              sx={{
                height: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                right: theme.spacing(2),
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: '#49FFE3',
                color: '#07826F',
                borderRadius: '5px',
                padding: '2px 5px',
                fontSize: '9px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Coming Soon
            </Box>
          )}
          {eachItem.child &&
            (openIndex === index ? (
              <ExpandLess
                sx={{
                  color: isItemActive ? '#F0F8FF' : '#C0C0C0',
                }}
              />
            ) : (
              <ExpandMore
                sx={{
                  color: isItemActive ? '#F0F8FF' : '#C0C0C0',
                }}
              />
            ))}
        </SidebarListItem>
      </ListItem>
      {eachItem.child && (
        <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {eachItem.child.map((childItem, childIndex) => {
              const handleChildClick = () => {
                if (!childItem.comingSoon) {
                  navigate(childItem.link);
                }
              };
              const ChildIconComponent = isActive(childItem.link)
                ? childItem.icon.active
                : childItem.icon.inactive;

              return (
                <ListItem
                  key={childIndex}
                  disablePadding
                  sx={{
                    position: 'relative',
                    width: '100%',
                  }}
                >
                  {isActive(childItem.link) && (
                    <Box
                      sx={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '3px',
                        height: '50%',
                        backgroundColor: '#49FFE3',
                        borderRadius: 1,
                        marginRight: theme.spacing(1),
                      }}
                    />
                  )}
                  <ListItemButton
                    sx={{
                      pl: theme.spacing(5),
                      py: theme.spacing(1),
                      width: 'calc(100% - 2px - 8px)',
                      color: '#B2D8D2',
                      backgroundColor: isActive(childItem.link)
                        ? 'rgba(7, 130, 111, 0.4)'
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: isActive(childItem.link)
                          ? 'rgba(7, 130, 111, 0.5)'
                          : 'rgba(255,255,255,0.1)',
                      },
                    }}
                    onClick={handleChildClick}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 'auto',
                        mr: theme.spacing(2),
                        color: isActive(childItem.link) ? '#F0F8FF' : '#B2D8D2',
                      }}
                    >
                      <ChildIconComponent />
                    </ListItemIcon>
                    <ListItemText
                      primary={childItem.name}
                      primaryTypographyProps={{
                        variant: 'body2',
                        sx: {
                          color: isActive(childItem.link) ? '#fff' : '#B2D8D2',
                          fontSize: {
                            xs: '1.1rem',
                            sm: '1.2rem',
                            md: '1.1rem',
                          },
                        },
                      }}
                    />
                    {childItem.comingSoon && (
                      <Box
                        sx={{
                          height: '50%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          position: 'absolute',
                          right: theme.spacing(2),
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: '#49FFE3',
                          color: '#07826F',
                          borderRadius: '5px',
                          padding: '2px 5px',
                          fontSize: '9px',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        Coming Soon
                      </Box>
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      )}
    </React.Fragment>
  );
};

export const AppSidebar = ({ toggleSidebar, isOpen = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const [userDetails, setUserDetails] = useState({});
  const [openIndex, setOpenIndex] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(SideMenuItems);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopover, setOpenPopover] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const name = userDetails?.userName || 'Unknown';
  const email = userDetails?.email;
  const firstLetter = name.charAt(0);
  const profileImageUrl = userDetails?.profileImageURL;

  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenPopover(true);
  };

  const handleClose = () => {
    setOpenPopover(false);
    setAnchorEl(null);
  };

  const handleFeatureRequest = () => {
    window.open('https://forms.gle/vqhSQvrme3truhPA6', '_blank');
  };

  const handleClick = (index) => {
    const path = SideMenuItems[index]?.link;
    if (path) {
      handleNavigate(path);
      if (toggleSidebar) toggleSidebar();
      setOpenIndex(null);
    } else {
      setOpenIndex(openIndex === index ? null : index);
    }
  };

  const fetch = async () => {
    try {
      const response = await GetUserDetails();
      if (response?.data?.status === true) {
        setUserDetails(response?.data?.data);
      }
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNavigate = (path) => {
    navigate(path);
    clearSearch();
    if (toggleSidebar) toggleSidebar();
  };

  const handleLogout = () => {
    localStorage.clear('token');
    dispatch(clearAuthDetails({}));
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterItems(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredItems(SideMenuItems);
    setSearchOpen(false);
  };

  const filterItems = (query) => {
    if (!query) {
      setFilteredItems(SideMenuItems);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = [];

    SideMenuItems.forEach((item) => {
      const filteredChildren = item?.child?.filter((child) =>
        child?.name?.toLowerCase().startsWith(lowerQuery)
      );

      if (filteredChildren?.length) {
        filteredChildren.forEach((child) => {
          filtered.push({
            ...child,
            parentName: item.name,
            icon: child.icon,
          });
        });
      } else if (item.name.toLowerCase().startsWith(lowerQuery)) {
        filtered.push({
          ...item,
          parentName: null,
          icon: item.icon,
        });
      }
    });

    setFilteredItems(filtered);
  };

  useEffect(() => {
    fetch();
    const handleProfileUpdate = (event) => {
      fetch();
    };
    window.addEventListener('profileUpdated', handleProfileUpdate);
    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, []);

  return (
    <Drawer
      className={isMobile && isOpen ? 'open' : ''}
      sx={{
        backgroundColor: '#033A32',
        // Mobile-specific styling
        ...(isMobile && {
          width: '100%',
          zIndex: 1200,
        }),
      }}
    >
      {/* Mobile header with all items in one row */}
      {isMobile && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 15px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <img src={logoSrc} width={30} height={30} alt="Logo" />
            <Typography
              variant="h6"
              sx={{
                color: '#fff',
                fontSize: '1.25rem',
              }}
            >
              Lets Notify
            </Typography>
          </Stack>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* <IconButton
              onClick={() => setSearchOpen(true)}
              sx={{ color: 'whitesmoke' }}
            >
              <img width={20} height={20} src={searchIcon} alt="Search Icon" />
            </IconButton> */}
            <IconButton onClick={toggleSidebar} sx={{ color: 'whitesmoke' }}>
              <CloseIcon sx={{ fontSize: '1.5rem' }} />
            </IconButton>
          </Box>
        </Box>
      )}

      {/* Desktop header */}
      {!isMobile && (
        <SidebarHeader>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction={'row'} spacing={2}>
              <img src={logoSrc} width={30} height={30} alt="Logo" />
              <Typography
                variant="h6"
                sx={{
                  color: '#fff',
                  fontSize: '1.25rem',
                }}
              >
                Lets Notify
              </Typography>
            </Stack>
            {/* <IconButton
              onClick={() => setSearchOpen(true)}
              sx={{ color: 'whitesmoke' }}
            >
              <img width={20} height={20} src={searchIcon} alt="Search Icon" />
            </IconButton> */}
          </Box>
        </SidebarHeader>
      )}

      {searchOpen && (
        <Paper
          component="form"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '85%',
            backgroundColor: '#f0f2f5',
            marginX: 'auto',
            marginY: '10px',
            borderRadius: 1,
          }}
          disableRipple
          disableElevation
        >
          <InputBase
            sx={{ marginLeft: 2, flex: 1, color: '#100C08' }}
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
            autoFocus
            value={searchQuery}
            onChange={handleSearchChange}
            disableRipple
            disableElevation
          />
          <IconButton
            type="button"
            sx={{ p: '10px' }}
            aria-label="search"
            onClick={clearSearch}
            disableRipple
            disableElevation
          >
            <CloseIcon />
          </IconButton>
        </Paper>
      )}

      <ModuleListContainer>
        <List>
          {!searchQuery ? (
            SideMenuItems?.map((eachItem, index) => (
              <React.Fragment key={index}>
                <RenderListItem
                  key={index}
                  eachItem={eachItem}
                  index={index}
                  openIndex={openIndex}
                  handleClick={handleClick}
                  isActive={isActive}
                  navigate={navigate}
                />
              </React.Fragment>
            ))
          ) : (
            <>
              {filteredItems.map((eachItem, index) => {
                const IconComponent =
                  isActive(eachItem.link) ||
                  eachItem.child?.some((child) => isActive(child.link))
                    ? eachItem.icon.active
                    : eachItem.icon.inactive;
                return (
                  <React.Fragment key={index}>
                    <ListItem disablePadding>
                      <SidebarListItem
                        selected={isActive(eachItem.link)}
                        sx={{
                          minHeight: 30,
                          marginTop: 0.5,
                          borderRadius: 2,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: '#B2D8D2',
                          fontSize: '1.1rem',
                        }}
                        onClick={() => handleNavigate(eachItem.link)}
                      >
                        <ListItemIcon sx={{ minWidth: 0 }}>
                          <IconComponent />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            eachItem.parentName
                              ? `${eachItem.name} (${eachItem.parentName})`
                              : eachItem.name
                          }
                          primaryTypographyProps={{
                            color: isActive(eachItem.link) ? '#fff' : '#B2D8D2',
                            fontSize: {
                              xs: '1.1rem',
                              sm: '1.2rem',
                              md: '1.1rem',
                            },
                          }}
                          sx={{ opacity: 1, marginX: 1 }}
                        />
                      </SidebarListItem>
                    </ListItem>
                  </React.Fragment>
                );
              })}
            </>
          )}
        </List>
      </ModuleListContainer>

      <FixedBottomSection>
        <FeatureRequestButton
          variant="contained"
          onClick={handleFeatureRequest}
          startIcon={<TextsmsOutlinedIcon sx={{ color: '#033a32' }} />}
        >
          Feature Request
        </FeatureRequestButton>
        <ProfileContainer>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <Avatar
              src={profileImageUrl || null}
              alt={firstLetter}
              sx={{
                color: '#058270',
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                marginRight: { xs: 1, sm: 2 },
                flexShrink: 0,
                color: '#058270',
              }}
            />
            <Box
              sx={{
                overflow: 'hidden',
                flexGrow: 1,
                minWidth: 0,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%',
                  color: 'white',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                {name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%',
                  color: 'rgba(255,255,255,0.8)',
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                }}
              >
                {email}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: { xs: '0.5rem', sm: '1rem' },
            }}
          >
            <MoreVertIcon
              onClick={handlePopover}
              sx={{
                color: 'white',
                opacity: 0.8,
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
                '&:hover': {
                  opacity: 1,
                },
              }}
            />
          </Box>
        </ProfileContainer>
      </FixedBottomSection>

      <Popover
        id="simple-popover"
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: theme.shadows[8],
            overflow: 'hidden',
            minWidth: 250,
            border: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <List
          sx={{
            py: 0,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {ProfileMenuItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                disablePadding
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemButton
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.link === protectedRoutes.logout) {
                      handleLogout();
                      handleClose();
                    } else if (item.link === 'feature-request') {
                      handleFeatureRequest();
                      handleClose();
                    } else if (
                      item.link?.startsWith('http') ||
                      item.link?.startsWith('mailto:')
                    ) {
                      window.open(item.link, '_blank', 'noopener,noreferrer');
                    } else {
                      handleNavigate(item.link);
                    }
                    handleClose();
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    py: 1.5,
                    px: 2,
                    cursor: 'pointer', 
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 'auto',
                      color: theme.palette.text.secondary,
                      mr: 1,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {typeof item.icon === 'function' ? item.icon() : item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      variant: 'body2',
                      color: 'text.primary',
                    }}
                  />
                </ListItemButton>
              </ListItem>
              {index < ProfileMenuItems.length - 1 && (
                <Divider
                  component="li"
                  sx={{
                    my: 0,
                    borderColor: theme.palette.divider,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </List>
      </Popover>
    </Drawer>
  );
};
