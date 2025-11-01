import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { FetchAllSegment } from 'Api/Api';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import AddBox from '@mui/icons-material/AddBox';
import {
  resetState,
  updateSequenceName,
  updateSubscribers,
} from '../../../redux/reducers/sequenceReducer';
import CreateSegmentModal from '../Segments/CreateSegmentModal';
import { InnerTextField } from 'components/InputFields';
import { CampaignStyle } from '../Campaigns/WebCampaign/Style';

const SequenceSubscribers = ({ handleBack, handleNext }) => {
  const dispatch = useDispatch();
  const sequenceData = useSelector((state) => state.sequence.sequenceData);
  const sequenceName = useSelector((state) => state.sequence.sequenceName);

  const [segmentDetails, setSegmentDetails] = useState([]);
  const [segmentModalOpen, setSegmentModalOpen] = useState(false);
  const [error, setError] = useState({
    segment: false,
    sequenceName: false,
  });

  async function getSegment() {
    try {
      const response = await FetchAllSegment({
        page: 1,
        limit: 25,
      });
      if (response?.data?.status === true) {
        setSegmentDetails(response?.data?.data);
      }
    } catch (error) {}
  }

  const NextPage = () => {
    const errors = {
      sequenceName: sequenceName === '',
      segment: sequenceData?.selectedSegment == null,
    };

    setError(errors);
    if (errors.sequenceName || errors.segment) return;
    handleNext();
  };

  useEffect(() => {
    getSegment();
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '75vh',
        width: '100%',
      }}
    >
      <Box sx={{ width: '40%' }}>
        <Box mt={6}>
          <Typography pl={2} variant="black_h4" sx={{ fontSize: 20 }}>
            Flow name
          </Typography>
        </Box>
        <Box pl={2} sx={{ width: '89%' }}>
          <InnerTextField
            margin="dense"
            required
            error={error.sequenceName}
            placeholder="Flow name"
            value={sequenceName}
            onChange={(e) => {
              dispatch(updateSequenceName(e.target.value));
              if (e.target.value) {
                setError((prev) => ({ ...prev, sequenceName: false }));
              }
            }}
            helperText={error.sequenceName && 'Field required'}
          />
        </Box>

        <Box mt={2} mb={1}>
          <Typography pl={2} variant="black_h4" sx={{ fontSize: 20 }}>
            Add Segment
          </Typography>
        </Box>

        <Box
          pl={2}
          sx={{
            display: 'flex',
            alignItems: 'start',
            width: '100%',
            justifyContent: 'center',
            mb: 1,
          }}
        >
          <Autocomplete
            disablePortal
            options={segmentDetails}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option?.segmentName || ''}
            value={
              segmentDetails?.find(
                (segment) => segment.id === sequenceData?.selectedSegment
              ) || null
            }
            onChange={(e, newValue) => {
              dispatch(
                updateSubscribers({
                  selectedSegment: newValue ? parseInt(newValue?.id) : null,
                  subscriberCount: newValue
                    ? parseInt(newValue?.subscriberCount)
                    : null,
                })
              );
              setError((prev) => ({ ...prev, segment: !newValue }));
            }}
            noOptionsText={
              <span>
                No match found. Please create one by{' '}
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setSegmentModalOpen(true);
                  }}
                  style={{
                    color: '#1976d2',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  click here
                </a>
                .
              </span>
            }
            sx={CampaignStyle.autoSelectStyle}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Segment"
                error={error.segment}
                helperText={error.segment && 'Field required'}
                InputLabelProps={{ style: { color: 'black' } }}
                InputProps={{
                  ...params.InputProps,
                  style: { color: 'black' },
                }}
                sx={{ minHeight: '80px' }}
              />
            )}
            renderOption={(props, option) => (
              <li
                {...props}
                key={option.id}
                style={{ color: 'black', cursor: 'pointer' }}
              >
                {option.segmentName}
              </li>
            )}
          />
          <IconButton
            sx={{
              height: '56px',
              width: '56px',
              // mb: 2,
            }}
            onClick={() => setSegmentModalOpen(true)}
          >
            {' '}
            <AddBox
              sx={{
                color: '#058270',
                height: '50px',
                width: '50px',
                // marginBottom: '10px',
              }}
            />
          </IconButton>
          <CreateSegmentModal
            refresh={getSegment}
            open={segmentModalOpen}
            onClose={() => setSegmentModalOpen(false)}
          />
        </Box>

        <Box mt={1}>
          <Typography pl={2} variant="black_h4" sx={{ fontSize: 20 }}>
            Subscriber Count = {sequenceData?.subscriberCount}
          </Typography>
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
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              dispatch(resetState());
              handleBack();
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" size="large" onClick={NextPage}>
            Next
          </Button>
        </Box> */}
      </Box>
    </Box>
  );
};

export default SequenceSubscribers;
