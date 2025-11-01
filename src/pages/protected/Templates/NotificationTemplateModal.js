import React, { useState } from 'react';
import {
  Box,
  Switch,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import toast from 'react-hot-toast';
import { CreateTemplate } from 'Api/Api';
import { TemplateStyles } from './Style';
import { Loading } from 'components/Loading/Loading';
import { SideDrawer } from 'components/SideDrawer';
import { NameValidation, UrlValidation } from 'utils/commonFunctions';
import { InnerTextField } from 'components/InputFields';
import Preview from './Enlarge/Preview';

const NotificationTemplateModal = ({
  open,
  onClose,
  welcome,
  refresh,
  refreshWelcomeTemplate,
  activeStep,
  handleSteps,
  steps,
}) => {
  const [loading, setLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [tabValue, setTabValue] = useState('1');
  const [buttonToggle, setButtonToggle] = useState(false);
  const [templateDetails, setTemplateDetails] = useState({
    templateName: '',
    title: '',
    message: '',
    pageURL: '',
    icon: '',
    banner: '',
    status: 'Active',
    welcomeTemplate: welcome,
    actionButtons: [
      { action: '', title: '', icon: '', launchUrl: '' },
      { action: '', title: '', icon: '', launchUrl: '' },
    ],
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [errors, setErrors] = useState({
    templateName: false,
    title: false,
    message: false,
    pageURL: false,
    icon: false,
    banner: false,
    actionButtons: [
      { title: '', launchUrl: '' },
      { title: '', launchUrl: '' },
    ],
  });

  const handleToggle = (e) => {
    const name = e.target.name;
    if (name === 'buttons') {
      const newToggle = !buttonToggle;
      setButtonToggle(newToggle);
      setTemplateDetails((prev) => ({
        ...prev,
        actionButtons: newToggle
          ? [
              { action: '', title: '', icon: '', launchUrl: '' },
              { action: '', title: '', icon: '', launchUrl: '' },
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
        templateDetails?.status === 'Active' ? 'Inactive' : 'Active';
      setTemplateDetails((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleActionButtonChange = (e, idx) => {
    const { name, value } = e.target;
    setTemplateDetails((prev) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTemplateDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() === '' ? 'Required' : false,
    }));
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
    setTemplateDetails((prev) => ({ ...prev, [name]: file }));
    setErrors((prev) => ({ ...prev, [name]: false }));
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
      templateName: {
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
      message: { required: true },
      pageURL: {
        required: true,
        // validator: UrlValidation,
        // errorMessage:
        //   'Invalid URL. Please ensure the URL is properly formatted.',
      },
      banner: { required: true },
      icon: { required: true },
      actionButtons: {
        required: buttonToggle,
        validator: validateButtons,
        errorMessage: 'Invalid button configuration.',
      },
    };

    const newErrors = {};
    let hasError = false;

    Object.entries(validationRules).forEach(([field, rule]) => {
      const value = templateDetails[field];
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

    if (!hasError) {
      setLoading(true);
      try {
        let formData = new FormData();
        Object.entries(templateDetails).forEach(([key, value]) => {
          if (key === 'actionButtons') {
            formData.append('actionButtons', JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        });
        const response = await CreateTemplate(formData);
        if (response?.data?.status === true) {
          toast.success(response?.data?.message);
          welcome === true ? refreshWelcomeTemplate() : refresh();
          onClose();
          setLoading(false);
          // setButtonToggle(false);
          setTemplateDetails({
            status: 'Active',
            welcomeTemplate: welcome,
            actionButtons: [
              { action: '', title: '', icon: '', launchUrl: '' },
              { action: '', title: '', icon: '', launchUrl: '' },
            ],
          });
        }
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <>
      <Loading state={loading} />
      <SideDrawer
        open={open}
        onClose={() => {
          setButtonToggle(false);
          onClose();
        }}
        title={'New Template'}
        handleSubmit={handleSubmit}
        EyeIcon={true}
        isPreview={isPreview}
        setIsPreview={setIsPreview}
      >
        {!isPreview && (
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps?.map((label, index) => (
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
            <Box>
              <InnerTextField
                required
                error={errors.templateName}
                name="templateName"
                label="Template Name"
                value={templateDetails?.templateName}
                placeholder="Enter template name"
                onChange={handleChange}
                helperText={errors.templateName ? 'Field required' : ''}
              />
            </Box>

            <Box>
              <InnerTextField
                required
                error={errors.title}
                name="title"
                label="Title"
                value={templateDetails?.title}
                onChange={handleChange}
                helperText={errors.title ? 'Field required' : ''}
              />
            </Box>
            <Box>
              <InnerTextField
                required
                error={errors.pageURL}
                name="pageURL"
                label="Redirecting URL"
                value={templateDetails?.pageURL}
                placeholder="http://example.com"
                onChange={handleChange}
                helperText={errors.pageURL ? 'Field required' : ''}
              />
            </Box>
            <Box mb={2}>
              <InnerTextField
                required
                multiline
                error={errors.message}
                name="message"
                label="Message"
                rows={2}
                value={templateDetails?.message}
                onChange={handleChange}
                helperText={errors.message ? 'Field required' : ''}
              />
            </Box>
            <Typography variant="subtitle2">
              Upload Notification Icon{' '}
            </Typography>
            <Box>
              <TextField
                type="file"
                name="icon"
                fullWidth
                margin="dense"
                error={errors.icon}
                onChange={handleFileChange}
                helperText={errors.icon}
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
            <Typography variant="subtitle2">Upload Banner Image</Typography>
            <Box>
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
                  '& input::file-selector-button':
                    TemplateStyles.fileUploadButton,
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
                  {templateDetails.actionButtons.map((btn, idx) => (
                    <Box key={idx} mb={3}>
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

            {/* <br /> */}
            <Box>
              <Typography fontSize={'20px'} variant="black_4">
                Status
              </Typography>
              <Switch
                name="status"
                size="large"
                checked={templateDetails?.status === 'Active'}
                onChange={handleToggle}
              />
            </Box>
          </Box>
        )}

        {isPreview && (
          <Preview
            handleTabChange={handleTabChange}
            tabValue={tabValue}
            setTabValue={setTabValue}
            customPrompt={templateDetails}
          />
        )}
      </SideDrawer>
    </>
  );
};

export default NotificationTemplateModal;
