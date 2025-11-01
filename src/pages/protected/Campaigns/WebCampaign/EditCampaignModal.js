import {
  Autocomplete,
  Box,
  Checkbox,
  FormGroup,
  IconButton,
  Switch,
  TextField,
  Typography,
  Zoom,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { UpdateCampaign } from 'Api/Api';
import { Loading } from 'components/Loading/Loading';
import { SideDrawer } from 'components/SideDrawer';
import DateTimepicker from 'components/DateTime/DateTimePicker';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { formatDateTime, getCurrentDateTimeLocal } from 'utils/commonFunctions';
import { CampaignStyle } from './Style';
import { InnerTextField } from 'components/InputFields';
import { CustomSelect } from 'components/CustomSelect';
import { CampaignScheuduler, convertToUTC } from 'constants/appConstant';
import CustomTooltip from 'components/Tooltip/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import TimezoneSelect from 'react-timezone-select';
import { timeZoneStyle } from 'components/Style';

const EditCampaignModal = ({
  open,
  onClose,
  itemId,
  isDetail,
  refresh,
  templates = [],
  segments = [],
}) => {
  const [campaignDetails, setCampaignDetails] = useState(itemId || {});
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState(
    itemId?.template?.id || null
  );
  const [selectedSegment, setSelectedSegment] = useState(
    itemId?.segment?.id || null
  );

  const handleEditChange = () => setEdit(!edit);

  const handleToggle = (e) => {
    const name = e.target.name;
    if (name === 'status') {
      const newStatus =
        campaignDetails?.status === 'Active' ? 'Inactive' : 'Active';
      setCampaignDetails((prevState) => ({
        ...prevState,
        status: newStatus,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaignDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: !value.trim() }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCampaignDetails((prev) => ({ ...prev, [name]: checked }));
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
    setErrors((prev) => ({ ...prev, frequency: !value.trim() }));
  };

  const handleSubmit = async () => {
    const newErrors = {
      campaignName: !campaignDetails.campaignName.trim(),
      templateID: !campaignDetails.templateID,
      segmentID: !campaignDetails.segmentID,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        const updatedDetails = {
          ...campaignDetails,
          templateID: parseInt(campaignDetails.templateID),
          segmentID: parseInt(campaignDetails.segmentID),
        };

        let formData = new FormData();
        Object.entries(updatedDetails).forEach(([key, value]) => {
          if (
            key === 'frequencyDateTime' &&
            campaignDetails?.frequencyDateTime
          ) {
            formData.append(
              'frequencyDateTime',
              campaignDetails?.frequencyDateTime
            );
          } else {
            formData.append(key, value);
          }
        });

        const response = await UpdateCampaign(campaignDetails?.id, formData);
        if (response?.data?.status === true) {
          toast.success(response?.data?.message);
          refresh();
          onClose();
          setLoading(false);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setCampaignDetails(itemId);
  }, [itemId]);

  useEffect(() => {
    setCampaignDetails((prev) => ({ ...prev, ...itemId }));
    if (
      itemId?.template &&
      itemId?.segment &&
      templates.length &&
      segments.length
    ) {
      const defaultTemplate = templates.find(
        (template) => template.id === parseInt(itemId.template.id)
      );
      const defaultSegment = segments.find(
        (segment) => segment.id === parseInt(itemId.segment.id)
      );

      if (defaultTemplate) {
        setSelectedTemplate(defaultTemplate);
        setCampaignDetails((prevState) => ({
          ...prevState,
          templateID: parseInt(defaultTemplate.id),
        }));
      }

      if (defaultSegment) {
        setSelectedSegment(defaultSegment);
        setCampaignDetails((prevState) => ({
          ...prevState,
          segmentID: parseInt(defaultSegment.id),
        }));
      }
    }
    setErrors({});
  }, [itemId, templates, segments, open]);

  return (
    <>
      <Loading state={loading} />
      <SideDrawer
        open={open}
        onClose={onClose}
        isDetail={isDetail}
        edit={edit}
        setEdit={handleEditChange}
        title={!edit && isDetail ? 'Edit Campaign' : 'Edit Campaign'}
        handleSubmit={handleSubmit}
      >
        <Box>
          <InnerTextField
            required
            name="campaignName"
            label="Campaign Name"
            onChange={handleChange}
            placeholder="Enter Campaign name"
            error={errors.campaignName}
            value={campaignDetails?.campaignName || ''}
            helperText={errors.campaignName ? 'Field required' : ''}
            readOnly={!edit && isDetail}
          />
        </Box>

        <Box sx={CampaignStyle.selectInputFlex} my={3}>
          <Autocomplete
            disablePortal
            options={templates}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.templateName}
            value={selectedTemplate}
            onChange={(e, newValue) => {
              setSelectedTemplate(newValue);
              setCampaignDetails((prev) => ({
                ...prev,
                templateID: newValue ? parseInt(newValue.id) : '',
              }));
              setErrors((prev) => ({ ...prev, templateID: !newValue }));
            }}
            sx={CampaignStyle.autoSelectStyle}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Template"
                error={errors.templateID}
                helperText={errors.templateID && 'Field required'}
                InputLabelProps={{ style: { color: 'black' } }}
                InputProps={{ ...params.InputProps, style: { color: 'black' } }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} style={{ color: 'black' }}>
                {option.templateName}
              </li>
            )}
          />
        </Box>

        <Box sx={CampaignStyle.selectInputFlex} my={3}>
          <Autocomplete
            disablePortal
            options={segments}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.segmentName}
            value={selectedSegment}
            onChange={(e, newValue) => {
              setSelectedSegment(newValue);
              setCampaignDetails((prev) => ({
                ...prev,
                segmentID: newValue ? parseInt(newValue.id) : null,
              }));
              setErrors((prev) => ({ ...prev, segmentID: !newValue }));
            }}
            sx={CampaignStyle.autoSelectStyle}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Segment"
                error={errors.segmentID}
                helperText={errors.segmentID && 'Field required'}
                InputLabelProps={{ style: { color: 'black' } }}
                InputProps={{ ...params.InputProps, style: { color: 'black' } }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} style={{ color: 'black' }}>
                {option.segmentName}
              </li>
            )}
          />
        </Box>

        <Box mb={2}>
          <Typography variant="black_4">Status</Typography>
          <Switch
            name="status"
            size="large"
            checked={campaignDetails?.status === 'Active'}
            onChange={handleToggle}
            readOnly={!edit && isDetail}
          />
        </Box>

        <Box width="100%" display={'flex'} alignItems={'end'} gap={2}>
          <FormControl sx={{ width: '44%' }}>
            <CustomSelect
              label="Schedule"
              margin="normal"
              fullWidth
              options={CampaignScheuduler}
              value={campaignDetails?.frequency || ''}
              onChange={handleFrequencyChange}
              helperText={errors.frequency ? 'Field required' : ''}
            />
          </FormControl>

          {/* Need to change this component with Date time picker of MUI */}
          {campaignDetails?.frequency !== 'now' && (
            <DateTimepicker
              label="Date and time"
              name="frequencyDateTime"
              value={campaignDetails?.frequencyDateTime || null}
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
        {campaignDetails?.frequency !== 'now' && (
          <Box>
            <Box display="flex" alignItems="center" mt={3}>
              <Typography variant="black_h4" sx={{ fontSize: 18, mr: 1 }}>
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
            <Box sx={{ mt: 1 }}>
              <TimezoneSelect
                displayValue="UTC"
                value={campaignDetails?.timeZone}
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

        <Box>
          {isDetail && !edit ? (
            <Box>
              <Typography variant="subtitle2" my={1}>
                Created time : {formatDateTime(campaignDetails?.createdTime)}
              </Typography>
              <Typography variant="subtitle2" my={1}>
                Modified time : {formatDateTime(campaignDetails?.modifiedTime)}
              </Typography>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </SideDrawer>
    </>
  );
};

export default EditCampaignModal;
