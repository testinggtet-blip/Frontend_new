import React, { useState } from 'react';
import {
  Box,
  Switch,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormControl,
  Button,
} from '@mui/material';
import { Loading } from 'components/Loading/Loading';
import { SideDrawer } from 'components/SideDrawer';
import { InnerTextField } from 'components/InputFields';
import { NameValidation, UrlValidation } from 'utils/commonFunctions';
import toast from 'react-hot-toast';
import { TemplateStyles } from './Style';
import { CustomSelect } from 'components/CustomSelect';
import { WebInboxTemplateScheuduler } from 'constants/appConstant';
import { IconButton, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Web } from '@mui/icons-material';
import WebPreview from './Enlarge/WebPreview';
import WebInboxSettings from './Enlarge/WebInboxSettings';

const WebInboxTemplateModel = ({
  open,
  onClose,
  refresh,
  activeStep,
  handleSteps,
  steps,
}) => {
  const [loading, setLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [tabValue, setTabValue] = useState('1');
  const [buttonToggle, setButtonToggle] = useState(true);
  const [categories, setCategories] = useState(WebInboxTemplateScheuduler);
  const [newCategory, setNewCategory] = useState('');
  const [showAddInput, setShowAddInput] = useState(false);

  const [webInboxDetails, setWebInboxDetails] = useState({
    webName: '',
    title: '',
    description: '',
    pageURL: '',
    banner: '',
    category: '',
    openLink: false,
    actionButtons: [
      { title: '', launchUrl: '' },
      { title: '', launchUrl: '' },
    ],
  });

  const [errors, setErrors] = useState({
    webName: false,
    title: false,
    description: false,
    pageURL: false,
    banner: false,
    category: false,
    openLink: false,
    actionButtons: [
      { title: '', launchUrl: '' },
      { title: '', launchUrl: '' },
    ],
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWebInboxDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() === '' ? 'Required' : false,
    }));
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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files?.[0];
    if (!file) return;
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [name]: 'Invalid file type. Please upload an image',
      }));
      return;
    }
    setWebInboxDetails((prev) => ({
      ...prev,
      [name]: file,
      [`${name}Preview`]: URL.createObjectURL(file),
    }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleToggle = (e) => {
    const name = e.target.name;
    if (name === 'buttons') {
      const newToggle = !buttonToggle;
      setButtonToggle(newToggle);
      setWebInboxDetails((prev) => ({
        ...prev,
        actionButtons: newToggle
          ? [
              { title: '', launchUrl: '' },
              { title: '', launchUrl: '' },
            ]
          : [],
      }));
      setErrors((prev) => ({
        ...prev,
        actionButtons: [
          { title: '', launchUrl: '' },
          { title: '', launchUrl: '' },
        ],
      }));
    }
    if (name === 'status') {
      const newStatus =
        webInboxDetails?.status === 'Active' ? 'Inactive' : 'Active';
      setWebInboxDetails((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleActionButtonChange = (e, idx) => {
    const { name, value } = e.target;
    setWebInboxDetails((prev) => {
      const updatedButtons = [...prev.actionButtons];
      updatedButtons[idx] = { ...updatedButtons[idx], [name]: value };
      return { ...prev, actionButtons: updatedButtons };
    });
    setErrors((prev) => {
      const updatedErrors = [...prev.actionButtons];
      updatedErrors[idx] = {
        ...updatedErrors[idx],
        [name]: value.trim() === '' ? 'Required' : '',
      };
      return { ...prev, actionButtons: updatedErrors };
    });
  };

  const validateButtons = (actionButtons) => {
    const btnErrors = [];
    let hasError = false;

    actionButtons.forEach((button) => {
      const errorsObj = { title: '', launchUrl: '' };
      // Validate title
      if (!button.title || !button.title.trim()) {
        errorsObj.title = 'Required';
        hasError = true;
      }
      // Validate launchUrl
      if (!button.launchUrl || !button.launchUrl.trim()) {
        errorsObj.launchUrl = 'Required';
        hasError = true;
      } else if (!UrlValidation(button.launchUrl)) {
        errorsObj.launchUrl = 'Invalid URL';
        hasError = true;
      }
      btnErrors.push(errorsObj);
    });

    return { isValid: !hasError, errors: btnErrors };
  };

  const handleSubmit = async () => {
    const validationRules = {
      webName: {
        required: true,
        validator: NameValidation,
        errorMessage:
          'Invalid template name, the field supports only alphanumeric characters.',
      },
      title: {
        required: true,
        // validator: NameValidation,
        // errorMessage:
        //   'Invalid title, the field supports only alphanumeric characters.',
      },
      description: { required: true },
      pageURL: {
        required: true,
        validator: UrlValidation,
        // errorMessage:
        //   'Invalid URL. Please ensure the URL is properly formatted.',
      },
      banner: { required: true },
      actionButtons: {
        required: buttonToggle,
        validator: validateButtons,
        errorMessage: 'Invalid button configuration.',
      },
    };

    const newErrors = {};
    let hasError = false;

    Object.entries(validationRules).forEach(([field, rule]) => {
      const value = webInboxDetails[field];
      if (
        rule.required &&
        (!value || (typeof value === 'string' && !value.trim()))
      ) {
        newErrors[field] = true;
        hasError = true;
      } else if (rule.validator) {
        // Only validate actionButtons if toggle is ON
        if (field === 'actionButtons' && buttonToggle) {
          const { isValid, errors: btnErrors } = rule.validator(value);
          newErrors[field] = btnErrors;
          if (!isValid) hasError = true;
        }
        if (field !== 'actionButtons') {
          const isValid = rule.validator(value);
          if (!isValid) {
            toast.error(rule.errorMessage);
            hasError = true;
          }
        }
      }
    });

    setErrors(newErrors);

    // if (!hasError) {
    //   setLoading(true);
    //   try {
    //     let formData = new FormData();
    //     Object.entries(webInboxDetails).forEach(([key, value]) => {
    //       if (key === 'actionButtons') {
    //         formData.append('actionButtons', JSON.stringify(value));
    //       } else {
    //         formData.append(key, value);
    //       }
    //     });
    //     const response = await CreateTemplate(formData);
    //     if (response?.data?.status === true) {
    //       toast.success(response?.data?.message);
    //       welcome === true ? refreshWelcomeTemplate() : refresh();
    //       onClose();
    //       setLoading(false);
    //       // setButtonToggle(false);
    //       setTemplateDetails({
    //         status: 'Active',
    //         welcomeTemplate: welcome,
    //         actionButtons: [
    //           { action: '', title: '', icon: '', launchUrl: '' },
    //           { action: '', title: '', icon: '', launchUrl: '' },
    //         ],
    //       });
    //     }
    //   } catch (error) {
    //     setLoading(false);
    //     toast.error(error?.response?.data?.message);
    //   }
    // }
  };

  console.log('webInboxDetails', webInboxDetails);
  return (
    <>
      <Loading state={loading} />
      <SideDrawer
        open={open}
        onClose={onClose}
        title={'Web Inbox Template'}
        // handleSubmit={handleSubmit}
        EyeIcon={true}
        isPreview={isPreview}
        setIsPreview={setIsPreview}
      >
        {!isPreview && (
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step
                key={label}
                onClick={() => handleSteps(index)}
                sx={{ cursor: 'pointer' }}
              >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}

        {!isPreview && (
          <Box>
            <Box mt={2}>
              <InnerTextField
                required
                error={errors.templateName}
                name="webName"
                label="Name of the Template"
                value={webInboxDetails?.webName}
                placeholder="Enter template name"
                onChange={handleChange}
                helperText={errors.webName ? 'Field required' : ''}
              />
            </Box>
            <Box>
              <InnerTextField
                required
                error={errors.title}
                name="title"
                label="Title"
                value={webInboxDetails?.title}
                placeholder="Enter title name"
                onChange={handleChange}
                helperText={errors.title ? 'Field required' : ''}
              />
              <Box>
                <InnerTextField
                  required
                  error={errors.description}
                  name="description"
                  label="Description"
                  value={webInboxDetails?.description}
                  placeholder="Enter Description name"
                  onChange={handleChange}
                  helperText={errors.description ? 'Field required' : ''}
                />
              </Box>
            </Box>
            <Box>
              <InnerTextField
                required
                error={errors.pageURL}
                name="pageURL"
                label="Redirecting URL"
                value={webInboxDetails?.pageURL}
                placeholder="http://example.com"
                onChange={handleChange}
                helperText={errors.pageURL ? 'Field required' : ''}
              />
            </Box>
            <Box mt={2}>
              <Typography variant="subtitle2">Banner Image</Typography>
              <TextField
                type="file"
                name="banner"
                fullWidth
                margin="dense"
                error={errors.banner}
                onChange={handleFileChange}
                helperText={errors.banner}
                sx={{
                  '& .MuiOutlinedInput-root': TemplateStyles.InputBorder,
                  '& input::file-selector-button': {
                    ...TemplateStyles.fileUploadButton,
                    float: 'right',
                  },
                  '& input::file-selector-button:hover': {
                    backgroundColor: '#045e50',
                  },
                }}
              />
            </Box>

            <Box my={2}>
              <Box>
                <Typography fontSize="20px" variant="black_4">
                  Buttons
                </Typography>
                <Switch
                  name="buttons"
                  size="medium"
                  checked={buttonToggle}
                  onChange={handleToggle}
                />
              </Box>

              {buttonToggle && (
                <>
                  {webInboxDetails?.actionButtons?.map((btn, idx) => (
                    <Box key={idx} my={2}>
                      <Typography variant="black_h4" mb={1}>
                        Button {idx + 1}
                      </Typography>
                      <Box display="flex" gap={2} alignItems="center">
                        <InnerTextField
                          required
                          margin="dense"
                          name="title"
                          label="Title"
                          value={btn.title}
                          onChange={(e) => handleActionButtonChange(e, idx)}
                          placeholder="Enter Title"
                          error={!!errors.actionButtons?.[idx]?.title}
                          helperText={errors.actionButtons?.[idx]?.title || ' '}
                          FormHelperTextProps={{ style: { minHeight: 24 } }}
                        />
                        <InnerTextField
                          required
                          margin="dense"
                          name="launchUrl"
                          label="Button Link"
                          value={btn.launchUrl}
                          onChange={(e) => handleActionButtonChange(e, idx)}
                          placeholder="Button Link"
                          error={!!errors.actionButtons?.[idx]?.launchUrl}
                          helperText={
                            errors.actionButtons?.[idx]?.launchUrl || ' '
                          }
                          FormHelperTextProps={{ style: { minHeight: 24 } }}
                        />
                      </Box>
                    </Box>
                  ))}
                </>
              )}
            </Box>

            <Box ml={-1} mt={3}>
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
                    Open Link in a new Tab
                  </Typography>
                </Box>
              </FormGroup>
            </Box>

            <Box width="100%" mt={3} display="flex" alignItems="center" gap={2}>
              {/* Category Select */}
              <FormControl sx={{ width: '50%' }}>
                <CustomSelect
                  label="Category"
                  margin="normal"
                  fullWidth
                  error={Boolean(errors.category)}
                  options={categories}
                  value={webInboxDetails?.category}
                  onChange={(e) =>
                    setWebInboxDetails((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  helperText={errors.category ? 'Category is required' : ''}
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
          </Box>
        )}

        {isPreview && (
          <WebPreview
            handleTabChange={handleTabChange}
            tabValue={tabValue}
            setTabValue={setTabValue}
            webInboxDetails={webInboxDetails}
            web={true}
          />
        )}
      </SideDrawer>
    </>
  );
};

export default WebInboxTemplateModel;
