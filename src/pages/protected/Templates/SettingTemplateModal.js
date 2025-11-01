import React, { useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormGroup,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { InnerTextField } from 'components/InputFields';
import { SideDrawer } from 'components/SideDrawer';
import { Slide } from '@mui/material';
import { CustomSelect } from 'components/CustomSelect';
import { WebInboxTemplateScheuduler } from 'constants/appConstant';
import AddIcon from '@mui/icons-material/Add';
import { Loading } from 'components/Loading/Loading';
import WebPreview from './Enlarge/WebPreview';

const SettingTemplateModal = ({ open, onClose, refresh }) => {
  const [categories, setCategories] = useState(WebInboxTemplateScheuduler);
  const [newCategory, setNewCategory] = useState('');
  const [showAddInput, setShowAddInput] = useState(false);
  const [webInboxDetails, setWebInboxDetails] = useState({
    welcomeHomePage: 'Notifications',
    backgroundColor: '#F4F4F4',
    descriptionColor: '#4E4E4EB8',
    textColor: '#4E4E4E',
    themeColor: '#FFFFFF',
    webInBoxIconColor: '#033A32',
    category: '',
    btnColor: '#033A32',
    btnTextColor: '#FFFFFF',
    borderColor: '#147ca5',
    enableAllNotification: false,
    notificationTrigger: false,
    openPopWindow: false,
  });
  const [errors, setErrors] = useState({
    welcomeHomePage: '',
    backgroundColor: false,
    description: false,
    textColor: false,
    themeColor: false,
    category: false,
    webInBoxIconColor: false,
    enableAllNotification: false,
    notificationTrigger: false,
    openPopWindow: false,
  });
  const [tabValue, setTabValue] = useState('1');
  const [loading, setLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWebInboxDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    // setErrors((prev) => ({
    //   ...prev,
    //   [name]: typeof value === 'string' && value.trim() === '' ? true : false,
    // }));
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newOption = {
        name: newCategory,
        value: newCategory.toLowerCase().replace(/\s+/g, '_'),
      };

      if (!categories.some((c) => c.value === newOption.value)) {
        setCategories((prev) => [...prev, newOption]);
        setWebInboxDetails((prev) => ({ ...prev, category: newOption.value }));
      }
    }
    setNewCategory('');
    setShowAddInput(false);
  };

  return (
    <>
      <Loading state={loading} />
      <SideDrawer
        open={open}
        onClose={onClose}
        title={isPreview ? 'Web Inbox Preview' : 'Web Inbox Settings'}
        // handleSubmit={activeStep === 0 ? handleNext : ''}
        EyeIcon={true}
        isPreview={isPreview}
        setIsPreview={setIsPreview}
      >
        {isPreview ? (
          <WebPreview
            handleTabChange={handleTabChange}
            tabValue={tabValue}
            setTabValue={setTabValue}
            webInboxDetails={webInboxDetails}
            setting={true}
          />
        ) : (
          <Box width={'100%'}>
            <Box ml={-1.5} mt={1}>
              <FormGroup>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    checked={webInboxDetails?.openLink}
                    onChange={() =>
                      setWebInboxDetails((prev) => ({
                        ...prev,
                        openLink: !prev.openLink,
                      }))
                    }
                    name="openLink"
                  />
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: '1.2rem',
                      color: 'black',
                    }}
                  >
                    Enable all the notifications to store in Inbox.
                  </Typography>
                </Box>
              </FormGroup>
            </Box>

            <Typography my={1} sx={{ color: '#141414', fontSize: '20px' }}>
              Display Configurations{' '}
            </Typography>
            <Box>
              <InnerTextField
                required
                margin="normal"
                name="welcomeHomePage"
                label="Welcome HomePage"
                value={webInboxDetails?.welcomeHomePage}
                onChange={handleChange}
                error={errors.welcomeHomePage}
                helperText={errors.welcomeHomePage ? 'Field is required' : ''}
              />
            </Box>
            <Box>
              <InnerTextField
                required
                margin="normal"
                name="backgroundColor"
                label="Background Color"
                colorSelection
                value={webInboxDetails?.backgroundColor}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <InnerTextField
                required
                margin="normal"
                name="textColor"
                label="Text Color"
                colorSelection
                value={webInboxDetails?.textColor}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <InnerTextField
                required
                margin="normal"
                name="themeColor"
                label="Theme Color"
                colorSelection
                value={webInboxDetails?.themeColor}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <InnerTextField
                required
                margin="normal"
                name="webInBoxIconColor"
                label="Web Inbox Icon Color"
                colorSelection
                value={webInboxDetails?.webInBoxIconColor}
                onChange={handleChange}
              />
            </Box>

            <Box width="100%" mt={3} display="flex" alignItems="center" gap={2}>
              {/* Category Select */}
              <FormControl sx={{ width: '50%' }}>
                <CustomSelect
                  label="Category"
                  fullWidth
                  options={categories}
                  value={webInboxDetails?.category}
                  onChange={(e) =>
                    setWebInboxDetails((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                />
              </FormControl>

              {/* Inline Add Category */}
              {showAddInput ? (
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{ flex: 1 }}
                >
                  <TextField
                    size="small"
                    placeholder="New category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddCategory}
                    sx={{
                      whiteSpace: 'nowrap',
                      borderRadius: 2,
                      textTransform: 'none',
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setShowAddInput(false);
                      setNewCategory('');
                    }}
                    sx={{ minWidth: 40, borderRadius: 2 }}
                  >
                    ✕
                  </Button>
                </Box>
              ) : (
                <IconButton
                  color="primary"
                  onClick={() => setShowAddInput(true)}
                  sx={{
                    border: '1px dashed #058270',
                    borderRadius: 2,
                    padding: '6px',
                    minWidth: 40,
                    minHeight: 40,
                  }}
                >
                  <AddIcon />
                </IconButton>
              )}
            </Box>

            <Box ml={-1.5} mt={3}>
              <FormGroup>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    checked={webInboxDetails?.openLink}
                    onChange={() =>
                      setWebInboxDetails((prev) => ({
                        ...prev,
                        openLink: !prev.openLink,
                      }))
                    }
                    name="openLink"
                  />
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: '1.2rem',
                      color: 'black',
                    }}
                  >
                    Open the Pop Windows when Visitor come.
                  </Typography>
                </Box>
              </FormGroup>
            </Box>
            <Box ml={-1.5}>
              <FormGroup>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    checked={webInboxDetails?.openLink}
                    onChange={() =>
                      setWebInboxDetails((prev) => ({
                        ...prev,
                        openLink: !prev.openLink,
                      }))
                    }
                    name="openLink"
                  />
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: '1.2rem',
                      color: 'black',
                    }}
                  >
                    Popup when a New Notification Triggered.
                  </Typography>
                </Box>
              </FormGroup>
            </Box>
          </Box>
        )}
        {/* <Box sx={{ height: '100%', width: '100%' }}>
          <Box sx={{ height: 'calc(100% - 60px)' }}> */}

        {/* </Box>
        </Box> */}
      </SideDrawer>
    </>
  );
};

export default SettingTemplateModal;
