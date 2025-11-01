import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
  Zoom,
} from '@mui/material';
import DateTimepicker from 'components/DateTime/DateTimePicker';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateOptions } from '../../../redux/reducers/sequenceReducer';
import { CustomSelect } from 'components/CustomSelect';
import { SequenceScheuduler } from 'constants/appConstant';
import { getCurrentDateTimeLocal } from 'utils/commonFunctions';
import InfoIcon from '@mui/icons-material/Info';
import CustomTooltip from 'components/Tooltip/Tooltip';
import TimezoneSelect from 'react-timezone-select';
import { useSelector } from 'react-redux';
import { timeZoneStyle } from 'components/Style';

const SequenceOption = ({ handleBack, handleNext }) => {
  const dispatch = useDispatch();

  const sequenceOptions = useSelector((state) => state.sequence.sequenceData);
  const [formState, setFormState] = useState({
    schedule: sequenceOptions.schedule ?? 'now',
    frequency: sequenceOptions.frequency ?? '',
    frequencyDateTime: sequenceOptions.frequencyDateTime ?? '',
    timeZone: sequenceOptions.timeZone ?? null,
  });

  const [errors, setErrors] = useState({});

  const handleScheduleChange = (event) => {
    const { value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      schedule: value,
      frequency: value === 'now' ? 'now' : prevState.frequency,
    }));
  };

  const handleFrequencyChange = (event) => {
    const { value } = event.target;
    setFormState((prev) => ({
      ...prev,
      frequency: value,
      frequencyDateTime:
        value !== 'on_specific_date'
          ? getCurrentDateTimeLocal()
          : prev.frequencyDateTime,
    }));
    setErrors((prev) => ({ ...prev, frequency: !value.trim() }));
  };

  // const handleCheckboxChange = (event) => {
  //   const { name, checked } = event.target;
  //   setFormState((prevState) => ({
  //     ...prevState,
  //     [name]: checked,
  //   }));
  // };

  const NextPage = () => {
    dispatch(updateOptions({ formState }));
    handleNext();
  };

  useEffect(() => {
    if (formState.schedule === 'now') {
      setFormState((prev) => ({
        ...prev,
        frequency: 'now',
        frequencyDateTime: getCurrentDateTimeLocal(),
      }));
    }
  }, [formState.schedule]);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '75vh',
        width: '100%',
        paddingY: 2,
      }}
    >
      <Box p={3} sx={{ width: '95%' }}>
        <Typography p={0} variant="black_h4" sx={{ fontSize: 25 }}>
          Iteration
        </Typography>

        <Box mt={1} ml={1} width="100%">
          <RadioGroup
            name="schedule"
            value={formState?.schedule}
            onChange={handleScheduleChange}
          >
            <Box>
              <FormControlLabel
                value="now"
                control={<Radio />}
                label="Send Now"
                sx={{
                  '.MuiFormControlLabel-label': {
                    fontWeight: '500',
                    fontSize: '1.2rem',
                    color: 'black',
                  },
                }}
              />
            </Box>

            <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
              <FormControlLabel
                value="later"
                control={<Radio />}
                label="Schedule Later"
                sx={{
                  minWidth: '180px',
                  '.MuiFormControlLabel-label': {
                    fontWeight: '500',
                    fontSize: '1.2rem',
                    color: 'black',
                  },
                }}
              />

              {/* Reserve space using fixed height and visibility */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'end',
                  gap: '2%',
                  width: '50%',
                  height: '65px',
                  visibility:
                    formState?.schedule === 'later' ? 'visible' : 'hidden',
                }}
              >
                <FormControl sx={{ flex: 1 }}>
                  <CustomSelect
                    label={'Select frequency'}
                    margin="dense"
                    fullWidth
                    error={errors.frequency}
                    options={SequenceScheuduler}
                    value={formState?.frequency}
                    onChange={handleFrequencyChange}
                    helperText={errors.frequency ? 'Field required' : ''}
                  />
                </FormControl>

                <FormControl sx={{ flex: 1 }}>
                  <DateTimepicker
                    value={formState.frequencyDateTime}
                    onChangeval={(e) =>
                      setFormState({ ...formState, frequencyDateTime: e })
                    }
                  />
                </FormControl>
              </Box>
            </Box>
          </RadioGroup>
        </Box>
      </Box>

      <Box>
        <Box display="flex" alignItems="center" ml={3} mb={1}>
          <Typography variant="black_h4" sx={{ fontSize: 25, mr: 1 }}>
            Subscriber Time Zone
          </Typography>
          <CustomTooltip
            title="This option triggers the workflow according to the subscriber's time zone."
            arrow
            placement="top"
            TransitionComponent={Zoom}
          >
            <IconButton size="small" sx={{ padding: 0 }}>
              <InfoIcon fontSize="small" />
            </IconButton>
          </CustomTooltip>
        </Box>

        {/* Autocomplete Section */}
        <Box ml={3} sx={{ width: '35%', mt: 1 }}>
          <TimezoneSelect
            displayValue="UTC"
            value={formState?.timeZone}
            label="Choose a country"
            onChange={(selectedTimezone) => {
              setFormState((prev) => ({
                ...prev,
                timeZone: selectedTimezone.value,
              }));
            }}
            styles={timeZoneStyle}
          />
        </Box>

        {/* Subscribers Interaction Checkbox Section */}
        {/* <Box ml={3} mt={3}>
          <FormGroup>
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={formState?.subscribersInteractionNeeded}
                onChange={handleCheckboxChange}
                name="subscribersInteractionNeeded"
              />
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: '1.2rem',
                  color: 'black',
                }}
              >
                Subscribers Interaction Needed
              </Typography>

              <CustomTooltip
                title="This option requires interaction from subscribers to proceed."
                arrow
                placement="right"
                TransitionComponent={Zoom}
              >
                <IconButton size="small" sx={{ padding: 0, ml: 1 }}>
                  <InfoIcon fontSize="small" />
                </IconButton>
              </CustomTooltip>
            </Box>
          </FormGroup>
        </Box> */}
      </Box>

      {/* <Box
        mt={2}
        sx={{
          width: '100%',
          position: 'absolute',
          bottom: -55,
          height: '60px',
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f0f2f5',
        }}
      >
        <Button variant="outlined" size="large" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" size="large" onClick={NextPage}>
          Next
        </Button>
      </Box> */}
    </Box>
  );
};

export default SequenceOption;
