import AddBox from '@mui/icons-material/AddBox';
import {
  Autocomplete,
  Box,
  Checkbox,
  FormGroup,
  Grid,
  IconButton,
  Switch,
  TextField,
  Typography,
  Zoom,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import React, { useEffect, useState } from 'react';
import { getCurrentDateTimeLocal } from 'utils/commonFunctions';
import CreateTemplateModal from 'pages/protected/Templates/NotificationTemplateModal';
import { CampaignStyle } from '../WebCampaign/Style';
import DateTimePicker from 'components/DateTime/DateTimePicker';
import { InnerTextField } from 'components/InputFields';
import { CampaignScheuduler } from 'constants/appConstant';
import { CustomSelect } from 'components/CustomSelect';
import CreateSegmentModal from 'pages/protected/Segments/CreateSegmentModal';
import CustomTooltip from 'components/Tooltip/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import TimezoneSelect from 'react-timezone-select';
import { timeZoneStyle } from 'components/Style';

const CampaignPushNotification = ({
  templates = [],
  segments = [],
  FetchTemplate,
  FetchSegment,
  campaignDetails = {},
  setCampaignDetails,
  errors = {},
  setErrors,
  campaignType,
  open,
  onClose,
  refresh,
}) => {
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [segmentModalOpen, setSegmentModalOpen] = useState(false);

  const safeCampaignDetails = {
    campaignName: '',
    templateID: null,
    segmentID: null,
    status: 'Active',
    frequency: 'now',
    frequencyDateTime: getCurrentDateTimeLocal(),
    timeZone: '',
    subscribersInteractionNeeded: false,
    ...campaignDetails,
  };

  const closeModals = () => {
    setTemplateModalOpen(false);
    setSegmentModalOpen(false);
  };

  const handleToggle = () => {
    setCampaignDetails((prevState) => ({
      ...prevState,
      status: prevState.status === 'Active' ? 'Inactive' : 'Active',
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCampaignDetails((prev) => ({ ...prev, [name]: checked }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaignDetails((prev) => ({
      ...prev,
      [name]: value || null,
    }));
    setErrors((prev) => ({ ...prev, [name]: !value?.trim() }));
  };

  const handleFrequencyChange = (event) => {
    const { value } = event.target;
    setCampaignDetails((prev) => ({
      ...prev,
      frequency: value,
      frequencyDateTime:
        value !== 'on_specific_date'
          ? getCurrentDateTimeLocal()
          : prev.frequencyDateTime,
    }));
    setErrors((prev) => ({ ...prev, frequency: !value?.trim() }));
  };

  useEffect(() => {
    if (safeCampaignDetails.frequency === 'now') {
      setCampaignDetails((prev) => ({
        ...prev,
        frequencyDateTime: getCurrentDateTimeLocal(),
      }));
    }
  }, [safeCampaignDetails.frequency, setCampaignDetails]);

  return (
    <>
      <Grid item xs={12} md={10.5}>
        <Box>
          <InnerTextField
            required
            margin="dense"
            name="campaignName"
            label="Campaign Name"
            onChange={handleChange}
            error={Boolean(errors.campaignName)}
            value={safeCampaignDetails.campaignName}
            helperText={errors.campaignName ? 'Campaign Name is required' : ''}
          />
        </Box>
      </Grid>

      <Grid item xs={12} md={12}>
        <Box sx={CampaignStyle.selectInputFlex} my={2}>
          <Autocomplete
            disablePortal
            options={templates}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            getOptionLabel={(option) => option?.templateName || ''}
            value={
              templates.find((t) => t.id === safeCampaignDetails.templateID) ||
              null
            }
            onChange={(e, newValue) => {
              setCampaignDetails((prev) => ({
                ...prev,
                templateID: newValue ? parseInt(newValue.id) : null,
              }));
              setErrors((prev) => ({
                ...prev,
                templateID: newValue ? false : true,
              }));
            }}
            sx={CampaignStyle.autoSelectStyle}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Template"
                error={Boolean(errors.templateID)}
                helperText={errors.templateID ? 'Template is required' : ''}
                InputLabelProps={{ style: { color: 'black' } }}
                InputProps={{
                  ...params.InputProps,
                  style: { color: 'black' },
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} style={{ color: 'black' }}>
                {option.templateName}
              </li>
            )}
          />
          <IconButton onClick={() => setTemplateModalOpen(true)}>
            <AddBox sx={{ color: '#058270', height: '50px', width: '50px' }} />
          </IconButton>
          <CreateTemplateModal
            refresh={FetchTemplate}
            open={templateModalOpen}
            onClose={closeModals}
            welcome={false}
          />
        </Box>
      </Grid>

      <Grid item xs={12} md={12}>
        <Box sx={CampaignStyle.selectInputFlex} my={2}>
          <Autocomplete
            disablePortal
            options={segments}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            getOptionLabel={(option) => option?.segmentName || ''}
            value={
              segments.find((s) => s.id === safeCampaignDetails.segmentID) ||
              null
            }
            onChange={(e, newValue) => {
              setCampaignDetails((prev) => ({
                ...prev,
                segmentID: newValue ? parseInt(newValue.id) : null,
              }));
              setErrors((prev) => ({
                ...prev,
                segmentID: newValue ? false : true,
              }));
            }}
            sx={CampaignStyle.autoSelectStyle}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Segment"
                error={Boolean(errors.segmentID)}
                helperText={errors.segmentID ? 'Segment is required' : ''}
                InputLabelProps={{ style: { color: 'black' } }}
                InputProps={{
                  ...params.InputProps,
                  style: { color: 'black' },
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} style={{ color: 'black' }}>
                {option.segmentName}
              </li>
            )}
          />
          <IconButton onClick={() => setSegmentModalOpen(true)}>
            <AddBox sx={{ color: '#058270', height: '50px', width: '50px' }} />
          </IconButton>
          <CreateSegmentModal
            refresh={FetchSegment}
            open={segmentModalOpen}
            onClose={closeModals}
          />
        </Box>
      </Grid>

      <Box mb={2} display={'flex'}>
        <Typography sx={{ fontSize: 20, color: 'black' }}>Status</Typography>
        <Switch
          name="status"
          size="large"
          checked={safeCampaignDetails.status === 'Active'}
          onChange={handleToggle}
        />
      </Box>

      <Box width="100%" display={'flex'} alignItems={'end'} gap={2}>
        <FormControl sx={{ width: '44%' }}>
          <CustomSelect
            label="Schedule"
            margin="normal"
            fullWidth
            error={Boolean(errors.frequency)}
            options={CampaignScheuduler}
            value={safeCampaignDetails.frequency}
            onChange={handleFrequencyChange}
            helperText={errors.frequency ? 'Schedule is required' : ''}
          />
        </FormControl>

        {safeCampaignDetails.frequency !== 'now' && (
          <DateTimePicker
            label={'Date and time'}
            name="frequencyDateTime"
            value={safeCampaignDetails.frequencyDateTime}
            onChangeval={(val) => {
              if (typeof val === 'string') {
                setCampaignDetails((prev) => ({
                  ...prev,
                  frequencyDateTime: val,
                }));
              }
            }}
          />
        )}
      </Box>

      {safeCampaignDetails.frequency !== 'now' && (
        <Box>
          <Box display="flex" alignItems="center" mt={3}>
            <Typography variant="black_h4" sx={{ fontSize: 18, mr: 1, mb: 1 }}>
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
          <Box sx={{ mt: 1 }}>
            <TimezoneSelect
              displayValue="UTC"
              value={safeCampaignDetails.timeZone}
              label="Choose a country"
              onChange={(selectedTimezone) => {
                setCampaignDetails((prev) => ({
                  ...prev,
                  timeZone: selectedTimezone.value,
                }));
              }}
              styles={timeZoneStyle}
            />
          </Box>
        </Box>
      )}
      {/* Subscribers Interaction Checkbox Section */}
      {/* <Box ml={-1} mt={3}>
        <FormGroup>
          <Box display="flex" alignItems="center">
            <Checkbox
              checked={campaignDetails?.subscribersInteractionNeeded}
              onChange={handleCheckboxChange}
              name="subscribersInteractionNeeded"
            />
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '1.1rem',
                color: 'black',
              }}
            >
              Subscribers Interaction Needed
            </Typography>

            <CustomTooltip
              title="This option requires interaction from subscribers to proceed."
              arrow
              placement="top"
              TransitionComponent={Zoom}
            >
              <IconButton size="small" sx={{ padding: 0, ml: 1 }}>
                <InfoIcon fontSize="small" />
              </IconButton>
            </CustomTooltip>
          </Box>
        </FormGroup>
      </Box> */}
      {/* </SideDrawer> */}
    </>
  );
};

export default CampaignPushNotification;
