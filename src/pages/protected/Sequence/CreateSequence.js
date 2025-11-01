import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
  Button,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { MainDashboard } from 'components/Style';
import SearchBar from 'components/SearchBar';
import SequenceSubscribers from './SequenceSubscriber';
import SequenceBoard from './SequenceBoard';
import SequenceOption from './SequenceOption';
import SequenceReview from './SequenceReview';
import { protectedRoutes } from 'constants/appRoutes';
import {
  Person as SubscribersIcon,
  AccountTree as FlowIcon,
  Settings as OptionsIcon,
  Preview as ReviewIcon,
  Check as CheckIcon,
} from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import {
  CreateSequence as CreateSequenceApi,
  UpdateSequence as UpdateSequenceApi,
} from 'Api/Api';
import toast from 'react-hot-toast';
import { resetState } from '../../../redux/reducers/sequenceReducer';
import { DateAndTime } from 'utils/commonFunctions';

const noScrollbar = {
  overflowX: 'hidden',
  '&::-webkit-scrollbar': { display: 'none' },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
};

const CreateSequence = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { id } = useParams();
  const isEditMode = Boolean(id);

  const dispatch = useDispatch();
  const sequence = useSelector((state) => state.sequence);
  const { sequenceData, sequenceName } = sequence;
  const options = useSelector((state) => state.sequence.options);

  const time = DateAndTime(sequenceData?.frequencyDateTime);

  const dataToSave = {
    name: sequenceName,
    sequenceData: JSON.stringify(sequenceData),
    timeZone: sequenceData?.timeZone,
    segment_id: sequenceData?.selectedSegment,
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      navigate(protectedRoutes.flows);
    } else {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleSave = async () => {
    if (!sequenceName?.trim()) {
      toast.error('Sequence name is required.');
      return;
    }

    setLoading(true);
    try {
      const apiCall = id
        ? () => UpdateSequenceApi(id, dataToSave)
        : () => CreateSequenceApi(dataToSave);

      const response = await apiCall();

      if (response?.data?.status) {
        toast.success(response.data.message);
        dispatch(resetState());
        navigate(protectedRoutes.flows);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      label: 'Subscribers',
      icon: <SubscribersIcon />,
      description: 'Add or select subscribers for this sequence',
      component: <SequenceSubscribers />,
    },
    {
      label: 'Flow',
      icon: <FlowIcon />,
      description: 'Design your sequence flow',
      component: <SequenceBoard />,
    },
    {
      label: 'Options',
      icon: <OptionsIcon />,
      description: 'Configure sequence settings',
      component: <SequenceOption />,
    },
    {
      label: 'Review',
      icon: <ReviewIcon />,
      description: 'Review and launch your sequence',
      component: (
        <SequenceReview
          handleBack={handleBack}
          handleSave={handleSave}
          loading={loading}
          time={time}
          options={options}
        />
      ),
    },
  ];

  const StepIcon = ({ active, completed, icon }) => (
    <Box
      sx={{
        backgroundColor: completed || active
          ? theme.palette.primary.main
          : theme.palette.grey[300],
        color: completed || active ? '#fff' : theme.palette.text.secondary,
        width: 32,
        height: 32,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 1,
        transition: 'all 0.3s ease',
        boxShadow: active
          ? `0 0 0 8px ${theme.palette.primary.light}40`
          : 'none',
      }}
    >
      {completed ? <CheckIcon fontSize="small" /> : icon}
    </Box>
  );

  return (
    <MainDashboard>
      <Box
        sx={{
          width: '100%',
          minHeight: '40vh',
          p: { xs: 1, md: 1 },
          ...noScrollbar,
        }}
      >
        <Box sx={{ width: '100%', ...noScrollbar }}>
          <SearchBar
            connectionModule={false}
            title={isEditMode ? 'Edit Sequence' : 'New Sequence'}
            hideActionButton
          />
        </Box>
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            ...noScrollbar,
          }}
        >
          <Stepper
            activeStep={activeStep}
            orientation={isMobile ? 'vertical' : 'horizontal'}
            alternativeLabel={!isMobile}
            sx={{
              '& .MuiStepConnector-line': {
                borderColor: theme.palette.divider,
                borderTopWidth: 2,
              },
              '& .MuiStepConnector-active, & .MuiStepConnector-completed': {
                '& .MuiStepConnector-line': {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={({ active, completed }) => (
                    <StepIcon
                      active={active}
                      completed={completed}
                      icon={step.icon}
                    />
                  )}
                  sx={{
                    '& .MuiStepLabel-label': {
                      color:
                        activeStep === index
                          ? theme.palette.text.primary
                          : activeStep > index
                            ? theme.palette.text.secondary
                            : theme.palette.text.disabled,
                      fontWeight: activeStep === index ? 'bold' : 'normal',
                      mt: 1,
                    },
                    '& .MuiStepLabel-label.Mui-completed': {
                      color: theme.palette.text.secondary,
                    },
                  }}
                >
                  {!isMobile && (
                    <>
                      <Typography variant="subtitle2" component="div">
                        {step.label}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {step.description}
                      </Typography>
                    </>
                  )}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        <Paper
          elevation={2}
          sx={{
            p: { xs: 2, md: 2 },
            borderRadius: 2,
            minHeight: '60vh',
            backgroundColor: theme.palette.background.paper,
            ...noScrollbar,
          }}
        >
          <Box sx={{ width: '100%' }}>{steps[activeStep].component}</Box>
        </Paper>

        <Paper
          elevation={1}
          sx={{
            mt: 2,
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {activeStep === 0 ? (
            <Button
              variant="outlined"
              onClick={() => navigate(protectedRoutes.flows)}
            >
              Cancel
            </Button>
          ) : (
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
          )}

          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
        </Paper>
      </Box>
    </MainDashboard>
  );
};

export default CreateSequence;
