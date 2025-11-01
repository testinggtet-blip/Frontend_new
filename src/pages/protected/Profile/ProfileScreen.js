import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
  Dialog,
  DialogActions,
  Zoom,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RefreshIcon from '@mui/icons-material/Refresh';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TimezoneSelect from 'react-timezone-select';
import {
  DeleteProfileImage,
  GenerateNewAccessKey,
  GetAccessKey,
  GetUserDetails,
  UpdateProfile,
} from 'Api/Api';
import toast from 'react-hot-toast';
import {
  avatar,
  deleteGrid,
  mainContainer,
  profiletitle,
  title,
  profileGrid,
  securityGrid,
} from './style';
import { CustomFormInput, timeZoneStyle } from 'components/Style';
import EmailLink from 'components/Email';
import { MobileNumberValidation, NameValidation } from 'utils/commonFunctions';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { InnerTextField } from 'components/InputFields';
import CustomTooltip from 'components/Tooltip/Tooltip';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const ProfileScreen = () => {
  const [userDetails, setUserDetails] = useState({
    userName: '',
    email: '',
    mobileNumber: '',
    companyName: '',
    role: '',
    profileImage: '',
    profileImageURL: '',
  });
  const [errors, setErrors] = useState({
    userName: false,
    email: false,
    mobileNumber: false,
    companyName: false,
    role: false,
    profileImage: false,
  });
  const [updateProfile, setUpdateProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [image, setImage] = useState(userDetails?.profileImageURL || '');
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigateBack = () => {
    window.history.back();
  };

  const handleCopy = () => {
    if (accessKey) {
      navigator.clipboard.writeText(accessKey).then(() => {
        toast.success('Access key copied to clipboard');
      });
    }
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = (confirmed) => {
    if (confirmed) {
      generateAccessKey();
    }
    setOpenDialog(false);
  };

  const fetch = async () => {
    try {
      setIsLoading(true);
      const response = await GetUserDetails();
      if (response?.data?.status === true) {
        const { profileImageURL, ...restItem } = response?.data?.data;
        setUserDetails(restItem);
        setImage(profileImageURL);
        setAccessKey(response?.data?.data?.accesskey);
        localStorage.setItem(
          'userDetails',
          JSON.stringify(response?.data?.data)
        );
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const fetchAccessKey = async () => {
    try {
      const response = await GetAccessKey();
      if (response?.data?.status === true) {
        setAccessKey(response?.data?.accessKey);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const generateAccessKey = async () => {
    try {
      const response = await GenerateNewAccessKey();
      if (response?.data?.status === true) {
        setAccessKey(response?.data?.accessKey);
        toast.success(response?.data?.message);
        fetchAccessKey();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name !== 'profileImage') {
      let isValid = true;
      if (name === 'userName') {
        isValid = NameValidation(value);
      } else if (name === 'mobileNumber') {
        isValid = MobileNumberValidation(value);
      }
      setUserDetails((prev) => ({ ...prev, [name]: value }));
      setUpdateProfile((prev) => ({ ...prev, [name]: value }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: !isValid || value.trim() === '',
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      setUserDetails((prev) => ({ ...prev, [name]: file }));
      setUpdateProfile((prev) => ({ ...prev, [name]: file }));
      setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader?.result);
      };
      reader.readAsDataURL(file);
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: true }));
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      let formData = new FormData();
      Object.entries(updateProfile).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await UpdateProfile(formData);
      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        fetch();
        // Dispatch custom event to notify other components about profile update
        window.dispatchEvent(
          new CustomEvent('profileUpdated', {
            detail: { profileImageURL: null },
          })
        );
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.message);
    }
  };

  const deleteProfileImage = async (e) => {
    e.preventDefault();
    if (userDetails.profileImage !== '') {
      try {
        setIsLoading(true);
        const response = await DeleteProfileImage();
        if (response?.data?.status === true) {
          toast.success(response?.data?.message);
          setImage('');
          fetch();
          window.dispatchEvent(
            new CustomEvent('profileUpdated', {
              detail: { profileImageURL: userDetails?.profileImageURL },
            })
          );
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response?.data?.message);
      }
    }
  };

  const handleDeleteClick = () => {
    if (isMobile) {
      setOpenDeleteDialog(true);
    }
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    fetch();
    fetchAccessKey();
  }, []);

  return (
    <Box sx={mainContainer}>
      <Box sx={title}>
        <Typography variant="h4" align="center" sx={profiletitle}>
          Profile Preference
        </Typography>
      </Box>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box sx={profileGrid}>
              <Stack direction="column" alignItems="center" spacing={2}>
                <Avatar
                  sx={avatar}
                  src={image || undefined}
                  alt={userDetails.userName}
                >
                  {!image && userDetails.userName?.charAt(0).toUpperCase()}
                </Avatar>
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    color="primary"
                    sx={{
                      textTransform: 'none',
                      borderRadius: 2,
                    }}
                  >
                    Upload Photo
                    <input
                      type="file"
                      hidden
                      name="profileImage"
                      onChange={handleFileChange}
                    />
                  </Button>
                  {image && (
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={deleteProfileImage}
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.error.main}`,
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={profileGrid}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <CustomFormInput
                  fullWidth
                  label="Name"
                  name="userName"
                  value={userDetails.userName}
                  onChange={handleChange}
                  error={errors.userName}
                  helperText={errors.userName ? 'Invalid name' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomFormInput
                  fullWidth
                  label="Email"
                  name="email"
                  value={userDetails.email}
                  disabled
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title={`Your email cannot be changed. For modifications, contact support at ${process.env.REACT_APP_EMAIL}`}
                          placement="top"
                          arrow
                        >
                          <InfoOutlinedIcon
                            color="action"
                            fontSize="small"
                            sx={{ cursor: 'help' }}
                          />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomFormInput
                  fullWidth
                  label="Mobile Number"
                  name="mobileNumber"
                  value={userDetails.mobileNumber}
                  onChange={handleChange}
                  error={errors.mobileNumber}
                  helperText={
                    errors.mobileNumber ? 'Invalid mobile number' : ''
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomFormInput
                  fullWidth
                  label="Company Name"
                  name="companyName"
                  value={userDetails.companyName}
                  onChange={handleChange}
                  error={errors.companyName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomFormInput
                  fullWidth
                  label="Role"
                  name="role"
                  value={userDetails.role}
                  onChange={handleChange}
                  error={errors.role}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={navigateBack}
                    sx={{ textTransform: 'none' }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    sx={{ textTransform: 'none' }}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Security Section */}
        <Grid item xs={12}>
          <Box sx={securityGrid}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Typography variant="h6">Security Settings</Typography>
              <Tooltip
                title="Your access key is used for API authentication"
                placement="top"
                arrow
              >
                <InfoOutlinedIcon
                  color="action"
                  fontSize="small"
                  sx={{ cursor: 'help' }}
                />
              </Tooltip>
            </Stack>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={8}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0 }}
                >
                  Access Key
                </Typography>
                <InnerTextField
                  fullWidth
                  value={accessKey}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <Tooltip title="Copy Access Key" arrow>
                          <IconButton
                            edge="end"
                            onClick={handleCopy}
                            size="small"
                          >
                            <ContentCopyIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, display: 'block' }}
                >
                  Keep this key confidential. Do not share it with anyone.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClickOpen}
                  fullWidth
                  startIcon={<RefreshIcon />}
                  sx={{
                    textTransform: 'none',
                    backgroundColor: '#F0F4F8',
                    color: '#1A5276',
                    '&:hover': {
                      backgroundColor: '#E6EDF3',
                    },
                    borderRadius: 2,
                    py: 1,
                    height: '56px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Stack
                    direction="column"
                    spacing={0}
                    sx={{
                      width: '100%',
                      textAlign: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="button"
                      sx={{
                        fontWeight: 600,
                        color: '#1A5276',
                        lineHeight: 1.2,
                        textAlign: 'center',
                      }}
                    >
                      Regenerate Key
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        textTransform: 'none',
                        lineHeight: 1.2,
                        opacity: 0.7,
                        textAlign: 'center',
                      }}
                    >
                      Create a new secure access key
                    </Typography>
                  </Stack>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Timezone Section */}
        <Grid item xs={12}>
          <Box sx={securityGrid}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Typography variant="h6">Timezone Settings</Typography>
              <Tooltip
                title="This timezone will be consider while triggering the campaign"
                placement="top"
                arrow
              >
                <InfoOutlinedIcon
                  color="action"
                  fontSize="small"
                  sx={{ cursor: 'help' }}
                />
              </Tooltip>
            </Stack>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={8}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0 }}
                >
                  Select Timezone
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <TimezoneSelect
                    displayValue="UTC"
                    value={userDetails.timeZone || ''}
                    onChange={(selectedTimezone) => {
                      setUserDetails((prev) => ({
                        ...prev,
                        timeZone: selectedTimezone.value,
                      }));
                      setUpdateProfile((prev) => ({
                        ...prev,
                        timeZone: selectedTimezone.value,
                      }));
                    }}
                    styles={timeZoneStyle}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  fullWidth
                  sx={{
                    textTransform: 'none',
                    backgroundColor: '#036355',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#024c3f',
                    },
                    borderRadius: 2,
                    py: 1,
                    height: '56px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 3,
                  }}
                >
                  <Stack
                    direction="column"
                    spacing={0}
                    sx={{
                      width: '100%',
                      textAlign: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="button"
                      sx={{
                        fontWeight: 600,
                        color: 'white',
                        lineHeight: 1.2,
                        textAlign: 'center',
                      }}
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Typography>
                  </Stack>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Delete Account Section */}
        <Grid item xs={12}>
          <Box sx={deleteGrid}>
            <Typography variant="h6" gutterBottom>
              Delete Account
            </Typography>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                  Keep in mind that upon deleting your account, all of your
                  account information will be deleted without the possibility of
                  restoration.
                </Typography>
                <CustomTooltip
                  title={
                    <>
                      We currently do not support account deletion. For
                      assistance, please contact us via email - <EmailLink />
                    </>
                  }
                  placement="top-start"
                  arrow
                  disableHoverListener={isMobile}
                >
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleDeleteClick}
                    sx={{
                      textTransform: 'none',
                      borderRadius: 2,
                      cursor: isMobile ? 'pointer' : 'not-allowed',
                      border: '2px solid rgba(255, 56, 0, 0.5)',
                      color: 'rgba(255, 56, 0, 0.7)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 56, 0, 0.05)',
                        border: '2px solid rgba(255, 56, 0, 0.7)',
                      },
                    }}
                  >
                    Delete Account
                  </Button>
                </CustomTooltip>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => handleClose(false)}
        TransitionComponent={Zoom}
        keepMounted
        aria-describedby="alert-dialog-regenerate-key"
      >
        <DialogTitle>Regenerate Access Key</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Are you sure you want to regenerate your access key? This will
            invalidate the previous key.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose(false)}
            color="secondary"
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleClose(true)}
            color="primary"
            autoFocus
            sx={{ textTransform: 'none' }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        TransitionComponent={Zoom}
        keepMounted
        aria-describedby="alert-dialog-delete-account"
      >
        <DialogTitle>Account Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mt: 1 }}>
            We currently do not support account deletion. For assistance, please
            contact us via email - <EmailLink />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteDialogClose}
            color="primary"
            sx={{ textTransform: 'none' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfileScreen;
