import { Box, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import '@rc-component/color-picker/assets/index.css';
import { InnerTextField } from 'components/InputFields';
import { CustomSelect } from 'components/CustomSelect';
import { CreateCustomPrompt } from 'Api/Api';
import { Loading } from 'components/Loading/Loading';
import { SideDrawer } from 'components/SideDrawer';
import toast from 'react-hot-toast';
import { TemplateStyles } from 'pages/protected/Templates/Style';
import { DesktopPosition, MobilePosition, Time } from 'constants/appConstant';
import Preview from './Preview';

function CreateCustomPromptPage({ open, onClose, refreshCustomPrompt }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Active',
    iconImage: '',
    allowButtonText: '',
    allowButtonBackgroundColor: '#058270',
    allowButtonTextColor: '#e5e5e5',
    laterButtonText: '',
    mobileTiming: 0,
    desktopTiming: 0,
    hidePromptFrequency: 0,
    showPromptFrequency: 0,
    desktopPosition: 'center',
    mobilePosition: 'center',
  });

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    status: false,
    iconImage: false,
    allowButtonText: false,
    laterButtonText: false,
    hidePromptFrequency: false,
    showPromptFrequency: false,
  });

  const [image, setImage] = useState({
    logo: '',
  });

  const [tabValue, setTabValue] = useState('1');
  const [loading, setLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: typeof value === 'string' && value.trim() === '' ? true : false,
    }));
  };

  const handleToggle = (e) => {
    const name = e.target.name;
    if (name === 'status') {
      const newStatus = formData?.status === 'Active' ? 'Inactive' : 'Active';
      setFormData((prevState) => ({
        ...prevState,
        status: newStatus,
      }));
    }
  };

  const handleLogoUpload = (event) => {
    const { name, files } = event.target;
    const file = files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        iconImage: file,
      }));
      setImage((prev) => ({
        ...prev,
        logo: URL.createObjectURL(file),
      }));
      setErrors((prev) => ({
        ...prev,
        [name]: !file,
      }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    let validationErrors = {
      title: !formData.title,
      description: !formData.description,
      status: formData.status === null,
      iconImage: !formData.iconImage,
      allowButtonText: !formData.allowButtonText,
      laterButtonText: !formData.laterButtonText,
      hidePromptFrequency: !formData.hidePromptFrequency,
      showPromptFrequency: !formData.showPromptFrequency,
    };
    setErrors(validationErrors);

    if (Object.values(validationErrors).includes(true)) {
      setLoading(false);
      return;
    }

    try {
      let newformData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        newformData.append(key, value);
      });

      const response = await CreateCustomPrompt(newformData);
      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        refreshCustomPrompt();
        onClose();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Loading state={loading} />
      <SideDrawer
        open={open}
        onClose={onClose}
        title={isPreview ? 'Custom Prompt Preview' : 'Custom Prompt'}
        handleSubmit={handleSubmit}
        EyeIcon={true}
        isPreview={isPreview}
        setIsPreview={setIsPreview}
      >
        {isPreview ? (
          <Preview
            handleTabChange={handleTabChange}
            tabValue={tabValue}
            setTabValue={setTabValue}
            customPrompt={formData}
            image={image}
          />
        ) : (
          <Box>
            <Box width={'90%'}>
              <Box>
                <InnerTextField
                  required
                  margin="dense"
                  name="title"
                  label="Title"
                  value={formData.title}
                  onChange={handleChange}
                  error={errors.title}
                  helperText={errors.title ? 'Field is required' : ''}
                />
              </Box>

              <Box>
                <InnerTextField
                  required
                  name="description"
                  label="Description"
                  value={formData.description}
                  onChange={handleChange}
                  error={errors.description}
                  helperText={errors.description ? 'Field is required' : ''}
                />
              </Box>

              <Box marginY={1}>
                <Typography variant="black_4">Status</Typography>
                <Switch
                  name="status"
                  size="large"
                  checked={formData.status === 'Active'}
                  onChange={handleToggle}
                />
              </Box>
              <Box>
                <Typography variant="subtitle2">Upload Logo </Typography>
                <TextField
                  type="file"
                  name="iconImage"
                  fullWidth
                  margin="dense"
                  onChange={handleLogoUpload}
                  error={errors.iconImage}
                  helperText={errors.iconImage ? 'Field required' : ''}
                  sx={{
                    '& .MuiOutlinedInput-root': TemplateStyles.InputBorder,
                    '& input::file-selector-button':
                      TemplateStyles.fileUploadButton,
                    '& input::file-selector-button:hover': {
                      backgroundColor: '#045e50',
                    },
                  }}
                />
              </Box>
              <br />

              <Box>
                <Typography sx={{ fontSize: '18px' }} variant="black_p">
                  Allow Button
                </Typography>

                <InnerTextField
                  required
                  name="allowButtonText"
                  label="Text"
                  value={formData.allowButtonText}
                  onChange={handleChange}
                  error={errors.allowButtonText}
                  helperText={errors.allowButtonText ? 'Field is required' : ''}
                />
              </Box>
              <Box>
                <InnerTextField
                  required
                  name="allowButtonBackgroundColor"
                  label="Background Color"
                  colorSelection
                  value={formData.allowButtonBackgroundColor}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <InnerTextField
                  required
                  name="allowButtonTextColor"
                  label="Text Color"
                  colorSelection
                  value={formData.allowButtonTextColor}
                  onChange={handleChange}
                />
              </Box>
              <Box marginBottom="10px">
                <InnerTextField
                  required
                  margin="dense"
                  label="Later Button Text"
                  name="laterButtonText"
                  value={formData.laterButtonText}
                  onChange={handleChange}
                  error={errors.laterButtonText}
                  helperText={errors.laterButtonText ? 'Field is required' : ''}
                />
              </Box>

              <Box my={2}>
                <Typography sx={{ fontSize: '18px' }} variant="subtitle3">
                  Opt-in Timings
                </Typography>
              </Box>
              <Box my={3}>
                <CustomSelect
                  label="Mobile (In Sec)"
                  name="mobileTiming"
                  margin="normal"
                  fullWidth
                  options={Time}
                  value={formData.mobileTiming}
                  onChange={handleChange}
                  readOnly={false}
                />
              </Box>

              <Box mb={1}>
                <CustomSelect
                  label="Desktop (In Sec)"
                  name="desktopTiming"
                  margin="normal"
                  fullWidth
                  options={Time}
                  value={formData.desktopTiming}
                  onChange={handleChange}
                  readOnly={false}
                />
              </Box>
              <Box>
                <InnerTextField
                  required
                  name="hidePromptFrequency"
                  label="Hide Prompt Frequency"
                  value={formData.hidePromptFrequency}
                  onChange={handleChange}
                  error={errors.hidePromptFrequency}
                  helperText={
                    errors.hidePromptFrequency ? 'Field is required' : ''
                  }
                />
              </Box>
              <Box>
                <InnerTextField
                  required
                  name="showPromptFrequency"
                  label="Show Prompt Frequency"
                  value={formData.showPromptFrequency}
                  onChange={handleChange}
                  error={errors.showPromptFrequency}
                  helperText={
                    errors.showPromptFrequency ? 'Field is required' : ''
                  }
                />
              </Box>

              <Box my={2}>
                <Typography sx={{ fontSize: '18px' }} variant="subtitle3">
                  Position
                </Typography>
              </Box>

              <Box my={3}>
                <CustomSelect
                  label="Desktop"
                  name="desktopPosition"
                  margin="normal"
                  fullWidth
                  value={formData.desktopPosition}
                  options={DesktopPosition}
                  onChange={handleChange}
                />
              </Box>
              <Box mb={1}>
                <CustomSelect
                  label="Mobile"
                  name="mobilePosition"
                  margin="normal"
                  fullWidth
                  value={formData.mobilePosition}
                  options={MobilePosition}
                  defaultValue={formData.mobilePosition}
                  onChange={handleChange}
                />
              </Box>
            </Box>
          </Box>
        )}
      </SideDrawer>
    </>
  );
}

export default CreateCustomPromptPage;
