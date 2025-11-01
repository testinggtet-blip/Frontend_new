import React, { useState } from 'react';
import {
  Grid,
  Typography,
  FormControl,
  RadioGroup,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { InnerTextField } from 'components/InputFields';
import { SideDrawer } from 'components/SideDrawer';
import { Loading } from 'components/Loading/Loading';
import DynamicSegment from './DynamicSegment';
import StaticSegment from './StaticSegment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import toast from 'react-hot-toast';
import { CreateSegment } from 'Api/Api';
import TypeCard from 'components/TypeCard';

const CreateSegmentModal = ({ open, onClose, refresh }) => {
  const initialField = {
    main: '',
    field: '',
    fieldCondition: '',
    fieldValue: '',
  };

  const [errors, setErrors] = useState({});

  const [segmentData, setSegmentData] = useState({
    segmentName: '',
    type: 'static',
    status: 'Active',
    subscriberCount: 0,
    conditions: [[{ ...initialField }]],
  });
  const [loading, setLoading] = useState(false);
  const [firstStep, setFirstStep] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Segment Type', 'Segment Configuration'];

  const handleSteps = (index) => {
    if (index === 0) {
      setActiveStep(index);
    } else {
      if (validateSegmentName()) {
        setActiveStep(index);
      } else {
        // toast.error('Please complete step 1 first');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSegmentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (name === 'segmentName') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        segmentName: value.trim() === '' ? 'Segment name is required' : '',
      }));
    }
  };

  const validateSegmentName = () => {
    const nameErrors = {};

    if (!segmentData?.segmentName?.trim()) {
      nameErrors.segmentName = 'Segment name is required';
    } else if (segmentData.segmentName.length < 3) {
      nameErrors.segmentName = 'Segment name must be at least 3 characters';
    }

    setErrors(nameErrors);
    return Object.keys(nameErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSegmentName()) {
      setFirstStep(false);
      setActiveStep(1);
    }
  };

  const handleClose = () => {
    onClose();
    setSegmentData({
      segmentName: '',
      type: 'static',
      status: 'Active',
      subscriberCount: 0,
      conditions: [[{ ...initialField }]],
    });
    setFirstStep(true);
    setActiveStep(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (Object.keys(errors).length > 0) {
      toast.error('All fields are required.');
      return;
    }
    if (Object.keys(errors).length === 0) {
      try {
        setLoading(true);
        const response = await CreateSegment(segmentData);
        if (response?.data?.status === true) {
          toast.success(response?.data?.message);
          refresh();
          handleClose();
          setLoading(false);
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
        onClose={handleClose}
        title={'New Segment'}
        handleSubmit={activeStep === 0 ? handleNext : handleSubmit}
        firstStep={activeStep === 0}
        segment={true}
      >
        {/* Stepper Navigation */}
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

        {/* Conditional Rendering Based on Step */}
        {activeStep === 0 ? (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <InnerTextField
                required
                name="segmentName"
                label="Segment Name"
                value={segmentData?.segmentName}
                onChange={handleChange}
                error={!!errors.segmentName}
                helperText={errors.segmentName}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography mt={1} sx={{ color: 'black', fontWeight: 'bold' }}>
                Segment Type
              </Typography>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  name="type"
                  value={segmentData.type}
                  onChange={handleChange}
                >
                  <TypeCard
                    value="static"
                    label="Static Segment"
                    description="A static segment is a fixed list of subscribers based on set criteria, unaffected by future changes in subscriber's data."
                    Icon={NotificationsIcon}
                    selected={segmentData?.type}
                    onClick={() =>
                      handleChange({
                        target: { name: 'type', value: 'static' },
                      })
                    }
                  />
                  <TypeCard
                    value="dynamic"
                    label="Dynamic Segment"
                    description="Dynamic segments for existing and new subscribers utilizing real-time data, enabling instant updates based on subscriber behavior, preferences, and interactions for targeted notifications."
                    Icon={PeopleIcon}
                    selected={segmentData?.type}
                    onClick={() =>
                      handleChange({
                        target: { name: 'type', value: 'dynamic' },
                      })
                    }
                    // disabled
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        ) : (
          <>
            {segmentData.type === 'static' ? (
              <StaticSegment
                segmentData={segmentData}
                setSegmentData={setSegmentData}
                initialField={initialField}
                loading={loading}
                setLoading={setLoading}
                onClose={handleClose}
                open={open}
                refresh={refresh}
                initial={initialField}
              />
            ) : (
              <DynamicSegment />
            )}
          </>
        )}
      </SideDrawer>
    </>
  );
};

export default CreateSegmentModal;
