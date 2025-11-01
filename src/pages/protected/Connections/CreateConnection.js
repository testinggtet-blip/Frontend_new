import React, { useState, useRef } from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  Grid, 
  Paper, 
  IconButton, 
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { 
  SubmitButton 
} from './Style';
import { CreateConnection, GenerateAPIKeys,GeneratePublicPrivateKeys } from 'Api/Api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { TemplateStyles } from '../Templates/Style';
import { InnerTextField } from 'components/InputFields';
import { imageValidation } from 'utils/commonFunctions';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinkIcon from '@mui/icons-material/Link';
import TitleIcon from '@mui/icons-material/Title';
import CloseIcon from '@mui/icons-material/Close';

const CreateConnections = ({
  setConnectionName,
  setFlag,
  setApiKey,
  setSecretKey,
  setConnectionId,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [connectionDetails, setConnectionDetails] = useState({
    connectionName: '',
    connectionUrl: '',
    connectionImage: null,
  });

  const [errors, setErrors] = useState({
    connectionName: false,
    connectionUrl: false,
    connectionImage: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== 'connectionImage') {
      setConnectionDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value.trim() === '' ? true : false,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isValid = imageValidation(file, setErrors); 
      if (isValid) {
        setConnectionDetails((prev) => ({
          ...prev,
          connectionImage: file,
        }));
      }
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        connectionImage: true,
      }));
    }
  };

  const handleFileRemove = () => {
    setConnectionDetails((prev) => ({
      ...prev,
      connectionImage: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      connectionImage: true,
    }));
  };

  const createApiKeys = async (id) => {
    try {
      const response = await GenerateAPIKeys(id);
      if (response?.data?.status === true) {
        const newApiKey = response.data.data?.apiKey;
        const newSecretKey = response.data.data?.secretKey;
        toast.success(response.data.message);
        setApiKey(newApiKey);
        setSecretKey(newSecretKey);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {
      connectionName: connectionDetails.connectionName.trim() === '',
      connectionUrl: connectionDetails.connectionUrl.trim() === '',
      connectionImage: !connectionDetails.connectionImage,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      toast.error('Please fill all required fields');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      let formData = new FormData();
      Object.entries(connectionDetails).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await CreateConnection(formData);
      if (response?.data?.status === true) {
        var connectionId = response?.data?.data;
        localStorage.setItem('connectionId', connectionId);
        toast.success(response.data.message);
        setConnectionName(connectionDetails?.connectionName);
        setConnectionId(connectionId);
        setFlag(true);
        setLoading(false);
        createApiKeys(connectionId);
        GeneratePublicPrivateKeys(connectionId);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: { xs: 2, sm: 3, md: 4 }, 
        borderRadius: 2,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InnerTextField
            required
            fullWidth
            error={errors.connectionName}
            name="connectionName"
            label="Connection Name"
            value={connectionDetails?.connectionName}
            placeholder="Enter connection name"
            onChange={handleChange}
            helperText={errors.connectionName ? 'Field required' : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TitleIcon color={errors.connectionName ? 'error' : 'action'} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <InnerTextField
            required
            fullWidth
            error={errors.connectionUrl}
            name="connectionUrl"
            label="Connection URL"
            value={connectionDetails?.connectionUrl}
            placeholder="https://www.example.com"
            onChange={handleChange}
            helperText={errors.connectionUrl ? 'Field required' : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon color={errors.connectionUrl ? 'error' : 'action'} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mb: 1, 
              display: 'flex', 
              alignItems: 'center',
              color: theme.palette.text.secondary,
            }}
          >
            <CloudUploadIcon sx={{ mr: 1 }} />
            Upload Connection Icon
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              width: '100%' 
            }}
          >
            <TextField
              ref={fileInputRef}
              type="file"
              name="connectionImage"
              fullWidth
              margin="dense"
              error={errors.connectionImage}
              onChange={handleFileChange}
              helperText={errors.connectionImage ? 'Field required' : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CloudUploadIcon color={errors.connectionImage ? 'error' : 'action'} />
                  </InputAdornment>
                ),
                endAdornment: connectionDetails.connectionImage && (
                  <InputAdornment position="end">
                    <IconButton 
                      size="small" 
                      onClick={handleFileRemove}
                      color="error"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': TemplateStyles.InputBorder,
                '& input::file-selector-button': TemplateStyles.fileUploadButton,
                '& input::file-selector-button:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <SubmitButton
            fullWidth
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
            sx={{ 
              mt: 2,
              py: 1.5,
              backgroundColor: theme.palette.primary.main,
              '&:hover': { 
                backgroundColor: theme.palette.primary.dark 
              },
              '&.Mui-disabled': {
                backgroundColor: theme.palette.grey[300],
                color: theme.palette.text.disabled,
              }
            }}
          >
            {loading ? 'Submitting...' : 'Create Connection'}
          </SubmitButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateConnections;
