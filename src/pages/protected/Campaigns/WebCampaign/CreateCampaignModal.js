import React, { useState, lazy, Suspense, useEffect, useMemo } from 'react';
import {
  Box,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  Badge,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import { SideDrawer } from 'components/SideDrawer';
import { Loading } from 'components/Loading/Loading';
import { InnerTextField } from 'components/InputFields';
import toast from 'react-hot-toast';
import { CreateCampaign } from 'Api/Api';
import { convertToUTC } from 'constants/appConstant';
import { NameValidation } from 'utils/commonFunctions';
import { Campaign } from '@mui/icons-material';
import Preview from '../SocialCampaign/Enlarge/Preview';
import EmailIcon from '@mui/icons-material/Email';
import WebIcon from '@mui/icons-material/Public';
import LayersIcon from '@mui/icons-material/Layers';
import TypeCard from 'components/TypeCard';

// Lazy load campaign type components
const CampaignPushNotification = lazy(() =>
  import('./CampaignPushNotification')
);
const CampaignSocialProof = lazy(() => import('./CampaignSocialProof'));

function CreateCampaignModal({
  open,
  onClose,
  refresh,
  templates = [],
  segments = [],
  FetchTemplate,
  FetchSegment,
  openRealTime,
  refreshRealTime,
}) {
  const [campaignName, setCampaignName] = useState('');
  const [campaignType, setCampaignType] = useState('Push_Notifications');
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [comingSoonLabel, setComingSoonLabel] = useState('');
  const [stepOneModal, setStepOneModal] = useState(false);
  const [stepTwoModal, setStepTwoModal] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [tabValue, setTabValue] = useState('1');
  const steps = ['Campaign Type', 'Campaign Configuration'];

  // Push Notification campaign state
  const [campaignDetails, setCampaignDetails] = useState({
    campaignName: campaignName || '',
    templateID: null,
    segmentID: null,
    frequency: 'now',
    frequencyDateTime: '',
    status: 'Active',
    type: campaignType || 'Push_Notifications',
    subscribersInteractionNeeded: false,
    timeZone: null,
  });

  // Social Proof campaign state
  const [socialProofDetails, setSocialProofDetails] = useState({
    campaignName: campaignName || '',
    type: 'Social_Proof',
    triggerFor: '',
    status: 'Active',
    whereToDisplay: '',
    displayUrls: [''],
    messageText: '',
    notificationPosition: '',
    closable: false,
    redirectingNotification: '',
    displayDuration: 0,
    segmentID: null,
    logo: '',
  });

  // Separate image state for preview URLs (like in CreateCustomPrompt.js)
  const [previewImage, setPreviewImage] = useState({
    logo: '',
  });

  const [errors, setErrors] = useState({
    campaignName: false,
    templateID: false,
    segmentID: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== 'frequency' && name !== 'frequencyDateTime') {
      setCampaignDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value.trim() === '' ? true : false,
      }));
    }
  };

  const validateStep = (step) => {
    let isValid = true;
    const newErrors = { ...errors };

    if (step === 0) {
      const name = campaignDetails?.campaignName?.trim();
      if (!name || name.length < 3) {
        newErrors.campaignName = true;
        isValid = false;
      } else {
        newErrors.campaignName = false;
      }
    }

    if (step === 1 && campaignType === 'Push_Notifications') {
      const templateID = campaignDetails?.templateID;
      const segmentID = campaignDetails?.segmentID;

      if (!templateID) {
        newErrors.templateID = true;
        isValid = false;
      } else {
        newErrors.templateID = false;
      }

      if (!segmentID) {
        newErrors.segmentID = true;
        isValid = false;
      } else {
        newErrors.segmentID = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSteps = (targetStep) => {
    if (targetStep > activeStep) {
      // Moving forward – validate current step first
      if (!validateStep(activeStep)) return;
    }

    setActiveStep(targetStep);
    setStepOneModal(targetStep === 1);
    setStepTwoModal(targetStep === 2);
  };

  const handleCampaignNameChange = (e) => {
    const value = e.target.value;
    setCampaignName(value);

    setErrors((prev) => ({
      ...prev,
      campaignName: !value.trim() || value.trim().length < 3,
    }));
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      setStepOneModal(nextStep === 1);
      setStepTwoModal(nextStep === 2);
    }
  };

  const handleBack = () => {
    const prevStep = activeStep - 1;
    setActiveStep(prevStep);
    setStepOneModal(prevStep === 1);
    setStepTwoModal(prevStep === 2);
  };

  const handleClose = () => {
    onClose();
    setCampaignDetails({
      campaignName: '',
      templateID: null,
      segmentID: null,
      frequency: 'now',
      frequencyDateTime: '',
      status: 'Active',
      type: 'Push_Notifications',
      subscribersInteractionNeeded: false,
      timeZone: null,
    });
    setSocialProofDetails({
      campaignName: '',
      type: 'Social_Proof',
      triggerFor: '',
      status: 'Active',
      whereToDisplay: '',
      displayUrls: [''],
      messageText: '',
      notificationPosition: '',
      closable: false,
      redirectingNotification: '',
      displayDuration: 0,
      segmentID: null,
      logo: '',
    });
    setPreviewImage({
      logo: '',
    });
    setCampaignType('Push_Notifications');
    setCampaignName('');
    setActiveStep(0);
    setErrors({});
    setStepOneModal(false);
    setStepTwoModal(false);
  };

  useEffect(() => {
    setCampaignDetails((prev) => ({ ...prev, campaignName }));
    setSocialProofDetails((prev) => ({ ...prev, campaignName }));
  }, [campaignName]);

  const handleCampaignTypeChange = (event) => {
    const selectedType = event.target.value;
    setCampaignType(selectedType);
  };

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const previewPositions = useMemo(() => {
    const isRight = socialProofDetails.notificationPosition === 'Right Corner';
    const pos = isRight ? 'bottom-right' : 'bottom-left';
    return { desktopPosition: pos, mobilePosition: pos };
  }, [socialProofDetails.notificationPosition]);
  const previewPrompt = useMemo(
    () => ({
      title: socialProofDetails.campaignName || '',
      description: socialProofDetails.messageText || '',
      allowButtonText: '',
      allowButtonBackgroundColor: '#058270',
      allowButtonTextColor: '#e5e5e5',
      laterButtonText: '',
      ...previewPositions,
    }),
    [
      socialProofDetails.campaignName,
      socialProofDetails.messageText,
      previewPositions,
    ]
  );

  // Push Notification submit
  const handlePushNotificationSubmit = async () => {
    const validationRules = {
      campaignName: {
        required: true,
        validator: NameValidation,
        errorMessage:
          'Invalid template name, the field supports only alphanumeric characters.',
      },
      templateID: { required: true },
      segmentID: { required: true },
      frequency: { required: true },
      frequencyDateTime: { required: true },
    };

    const newErrors = {};
    let hasError = false;

    Object.entries(validationRules).forEach(([field, rule]) => {
      if (
        rule.required &&
        (!campaignDetails[field] ||
          (typeof campaignDetails[field] === 'string' &&
            !campaignDetails[field].trim()))
      ) {
        newErrors[field] = true;
        hasError = true;
      } else if (rule.validator && !rule.validator(campaignDetails[field])) {
        toast.error(rule.errorMessage);
        newErrors[field] = true;
        hasError = true;
      } else {
        newErrors[field] = false;
      }
    });

    setErrors(newErrors);

    if (!hasError) {
      setLoading(true);
      try {
        let formData = new FormData();
        Object.entries(campaignDetails).forEach(([key, value]) => {
          if (key === 'templateID' || key === 'segmentID') {
            formData.append(key, value ? parseInt(value) : null);
          } else {
            formData.append(key, value);
          }
        });

        const response = await CreateCampaign(formData);
        if (response?.data?.status === true) {
          toast.success(response?.data?.message);
          refresh();
          handleClose();
          setLoading(false);
          setCampaignDetails({ frequency: 'now', status: 'Active' });
        }
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      }
    }
  };

  // Social Proof submit
  const handleSocialProofSubmit = async (event) => {
    if (event) event.preventDefault();
    setLoading(true);
    try {
      const {
        campaignName: spName,
        segmentID,
        status,
        type,
        logo,
        ...rest
      } = socialProofDetails;

      // Create FormData for file upload
      let formData = new FormData();

      // Add basic campaign data
      formData.append('campaignName', spName || '');
      formData.append('segmentID', segmentID != null ? segmentID : 0);
      formData.append('status', status || 'Active');
      formData.append('type', 'Social_Proof');
      formData.append('templateID', 0);
      formData.append('frequency', 'now');
      formData.append('frequencyDateTime', '2025-08-13T22:19');
      formData.append('data', JSON.stringify({ ...rest }));

      // Add logo file if it exists
      if (logo && logo instanceof File) {
        formData.append('logo', logo);
      } else if (logo && typeof logo === 'string') {
        // If logo is a string (base64), convert it to a file
        try {
          const response = await fetch(logo);
          const blob = await response.blob();
          const file = new File([blob], 'logo.png', { type: 'image/png' });
          formData.append('logo', file);
        } catch (error) {
          // If conversion fails, send as string
          formData.append('logo', logo);
        }
      }

      const response = await CreateCampaign(formData);
      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        refresh();
        handleClose();
        setSocialProofDetails({
          campaignName: '',
          type: 'Social_Proof',
          triggerFor: '',
          status: 'Active',
          whereToDisplay: '',
          displayUrls: [''],
          messageText: '',
          notificationPosition: '',
          closable: false,
          redirectingNotification: '',
          displayDuration: 0,
          segmentID: null,
          logo: '',
        });
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Failed to create campaign'
      );
    } finally {
      setLoading(false);
    }
  };

  // SideDrawer handleSubmit logic
  const handleDrawerSubmit = () => {
    let isValid = validateStep(activeStep);

    if (!isValid) {
      toast.error('Few mandatory values are missing!');
      return;
    }

    if (activeStep === 0) {
      handleNext();
    } else if (activeStep === 1) {
      if (campaignType === 'Push_Notifications') {
        handlePushNotificationSubmit();
      } else if (campaignType === 'Social_Proof') {
        handleSocialProofSubmit();
      }
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userDetails'));
    const userTimeZone = userData?.timeZone || 'UTC';
    setCampaignDetails((prev) => ({
      ...prev,
      type: campaignType,
      timeZone: userTimeZone,
    }));
  }, [campaignType]);

  return (
    <>
      <Loading state={loading} />
      <SideDrawer
        open={open}
        onClose={handleClose}
        title="Create Campaign"
        handleSubmit={handleDrawerSubmit}
        EyeIcon={campaignType === 'Social_Proof'}
        isPreview={isPreview}
        setIsPreview={setIsPreview}
        firstStep={activeStep === 0}
      >
        {campaignType === 'Social_Proof' && isPreview ? (
          <Preview
            handleTabChange={handleTabChange}
            tabValue={tabValue}
            setTabValue={setTabValue}
            customPrompt={previewPrompt}
            image={previewImage}
          />
        ) : (
          <>
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
              !stepOneModal ? (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12}>
                    <InnerTextField
                      required
                      name="campaignName"
                      label="Campaign Name"
                      value={campaignName}
                      onChange={handleCampaignNameChange}
                      error={errors.campaignName}
                      helperText={
                        errors.campaignName
                          ? 'Campaign name must be at least 3 characters.'
                          : ''
                      }
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      mt={1}
                      sx={{ color: 'black', fontWeight: 'bold' }}
                    >
                      Campaign Type
                    </Typography>
                    <FormControl component="fieldset" fullWidth>
                      <RadioGroup
                        name="type"
                        value={campaignType}
                        onChange={handleCampaignTypeChange}
                      >
                        <TypeCard
                          value="Push_Notifications"
                          label="Push Notifications"
                          description="A push notification is a real-time, clickable message sent directly to subscribers' devices, providing instant updates or promotional alerts."
                          Icon={NotificationsIcon}
                          selected={campaignType}
                          onClick={setCampaignType}
                        />

                        <TypeCard
                          value="Social_Proof"
                          label="Social Proof"
                          description="It enhances trust and sales by leveraging social proof and FOMO notifications. Displaying real-time customer actions like purchases, sign-ups, or reviews, it creates urgency and boosts conversion rates."
                          Icon={PeopleIcon}
                          selected={campaignType}
                          onClick={setCampaignType}
                          // disabled
                        />

                        <TypeCard
                          value="Email"
                          label="Email"
                          description="An email campaign is a planned series of emails sent to a targeted audience, aiming to inform, engage, or convert recipients through personalized content, promotions, or newsletters."
                          Icon={EmailIcon}
                          selected={campaignType}
                          onClick={setCampaignType}
                          // disabled
                        />
                        <TypeCard
                          value="Pop_up"
                          label="Pop-up"
                          description="Pop-up empowers brands to boost email and SMS opt-ins through customizable, no-code pop-ups, optimizing customer acquisition and engagement for higher conversions and lowered costs."
                          Icon={LayersIcon}
                          selected={campaignType}
                          onClick={setCampaignType}
                          // disabled
                        />
                        <TypeCard
                          value="Web_Inbox"
                          label="Web Inbox"
                          description="The Web Inbox channel delivers real-time, personalized web notifications, enhancing user engagement and conversion rates through a site-based notification window."
                          Icon={WebIcon}
                          selected={campaignType}
                          onClick={setCampaignType}
                          // disabled
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              ) : (
                <Suspense fallback={<Loading state={true} />}>
                  {campaignType === 'Push_Notifications' ? (
                    <CampaignPushNotification
                      FetchSegment={FetchSegment}
                      FetchTemplate={FetchTemplate}
                      templates={templates}
                      onClose={handleClose}
                      open={open}
                      refresh={refresh}
                      campaignType={campaignType}
                      campaignDetails={campaignDetails}
                      setCampaignDetails={setCampaignDetails}
                      errors={errors}
                      setErrors={setErrors}
                    />
                  ) : (
                    <CampaignSocialProof
                      campaignDetails={socialProofDetails}
                      setCampaignDetails={setSocialProofDetails}
                      handleRealTimeSubmit={handleSocialProofSubmit}
                      segments={segments}
                      FetchSegment={FetchSegment}
                      setPreviewImage={setPreviewImage}
                    />
                  )}
                </Suspense>
              )
            ) : (
              <>
                {!stepTwoModal ? (
                  <Box sx={{ marginTop: 5 }}>
                    <Suspense fallback={<Loading state={true} />}>
                      {campaignType === 'Push_Notifications' ? (
                        <CampaignPushNotification
                          FetchSegment={FetchSegment}
                          FetchTemplate={FetchTemplate}
                          segments={segments}
                          templates={templates}
                          onClose={handleClose}
                          open={open}
                          refresh={refresh}
                          campaignType={campaignType}
                          campaignDetails={campaignDetails}
                          setCampaignDetails={setCampaignDetails}
                          errors={errors}
                          setErrors={setErrors}
                        />
                      ) : (
                        <CampaignSocialProof
                          campaignDetails={socialProofDetails}
                          setCampaignDetails={setSocialProofDetails}
                          handleRealTimeSubmit={handleSocialProofSubmit}
                          segments={segments}
                          FetchSegment={FetchSegment}
                          setPreviewImage={setPreviewImage}
                        />
                      )}
                    </Suspense>
                  </Box>
                ) : (
                  <>
                    <h1> Configuration settings</h1>
                  </>
                )}
              </>
            )}
          </>
        )}
      </SideDrawer>

      <Dialog
        open={comingSoonOpen}
        onClose={() => setComingSoonOpen(false)}
        aria-labelledby="coming-soon-dialog-title"
        aria-describedby="coming-soon-dialog-description"
      >
        <DialogTitle id="coming-soon-dialog-title">
          {comingSoonLabel}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="coming-soon-dialog-description">
            {comingSoonLabel} campaign type is currently under development. Stay
            tuned for exciting new features!
          </DialogContentText>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              onClick={() => setComingSoonOpen(false)}
              color="primary"
              autoFocus
            >
              Understood
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default React.memo(CreateCampaignModal);
