import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Grid,
  Typography,
  FormControl,
  RadioGroup,
} from '@mui/material';
import { InnerTextField } from 'components/InputFields';
import { SideDrawer } from 'components/SideDrawer';
import TypeCard from 'components/TypeCard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WebIcon from '@mui/icons-material/Public';

import NotificationTemplateModal from './NotificationTemplateModal';
import WebInboxTemplateModel from './WebInboxTemplateModel';

const CreateTemplateModal = ({ open, onClose, welcome, refresh }) => {
  const [templateData, setTemplateData] = useState({
    templateName: '',
    templateType: 'notification',
  });
  const [activeStep, setActiveStep] = useState(0);
  const [stepOneModal, setStepOneModal] = useState(false);
  const [errors, setErrors] = useState({});

  const steps = ['Template Type', 'Template Configuration'];

  const handleSteps = (index) => {
    if (index === 0) {
      setActiveStep(index);
      setStepOneModal(false);
    } else {
      if (validateTemplateName()) {
        setActiveStep(index);
        setStepOneModal(true);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTemplateData((prev) => ({ ...prev, [name]: value }));

    if (name === 'templateName') {
      let errorMsg = '';
      if (!value.trim()) errorMsg = 'Template name is required';
      else if (value.length < 3)
        errorMsg = 'Template name must be at least 3 characters';
      setErrors((prev) => ({ ...prev, templateName: errorMsg }));
    }
  };

  const validateTemplateName = () => {
    const name = templateData?.templateName?.trim();
    let errorMsg = '';
    if (!name) errorMsg = 'Template name is required';
    else if (name.length < 3)
      errorMsg = 'Template name must be at least 3 characters';

    setErrors((prev) => ({ ...prev, templateName: errorMsg }));
    return !errorMsg;
  };

  const handleNext = () => {
    if (validateTemplateName()) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      setStepOneModal(true);
    }
  };

  const handleCloseAll = () => {
    onClose();
    setTemplateData({ templateName: '', templateType: 'notification' });
    setActiveStep(0);
    setStepOneModal(false);
    setErrors({});
  };

  return (
    <SideDrawer
      open={open}
      onClose={handleCloseAll}
      title="Create Template"
      handleSubmit={activeStep === 0 ? handleNext : ''}
      firstStep={activeStep === 0}
    >
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

      {activeStep === 0 ? (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <InnerTextField
              required
              name="templateName"
              label="Template Name"
              value={templateData?.templateName}
              onChange={handleChange}
              error={!!errors.templateName}
              helperText={errors.templateName}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography mt={1} sx={{ fontWeight: 'bold', color: 'black' }}>
              Template Type
            </Typography>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                name="templateType"
                value={templateData?.templateType}
                onChange={handleChange}
              >
                <TypeCard
                  value="notification"
                  label="Push Notifications"
                  description="A push notification is a real-time, clickable message sent directly to subscribers' devices, providing instant updates or promotional alerts."
                  Icon={NotificationsIcon}
                  selected={templateData?.templateType}
                  onClick={() =>
                    handleChange({
                      target: { name: 'templateType', value: 'notification' },
                    })
                  }
                />

                <TypeCard
                  value="webInbox"
                  label="Web Inbox"
                  description="A push notification is a real-time, clickable message sent directly to subscribers' devices, providing instant updates or promotional alerts."
                  Icon={WebIcon}
                  selected={templateData?.templateType}
                  onClick={() =>
                    handleChange({
                      target: { name: 'templateType', value: 'webInbox' },
                    })
                  }
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      ) : (
        <>
          {stepOneModal && templateData.templateType === 'notification' && (
            <NotificationTemplateModal
              open={true}
              onClose={handleCloseAll}
              welcome={welcome}
              refresh={refresh}
              name={templateData?.templateName}
              handleSteps={handleSteps}
              activeStep={activeStep}
              steps={steps}
            />
          )}
          {stepOneModal && templateData.templateType === 'webInbox' && (
            <WebInboxTemplateModel
              open={true}
              onClose={handleCloseAll}
              welcome={welcome}
              refresh={refresh}
              name={templateData?.templateName}
              handleSteps={handleSteps}
              activeStep={activeStep}
              steps={steps}
            />
          )}
        </>
      )}
    </SideDrawer>
  );
};

export default CreateTemplateModal;
