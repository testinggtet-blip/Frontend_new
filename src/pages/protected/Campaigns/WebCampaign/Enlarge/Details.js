import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  Tooltip,
  useTheme,
  useMediaQuery,
  Grid,
} from '@mui/material';
import { DeleteCampaign } from 'Api/Api';
import DateTimepicker from 'components/DateTime/DateTimePicker';
import toast from 'react-hot-toast';
import { formatDateTime } from 'utils/commonFunctions';
import { InnerTextField } from 'components/InputFields';
import { CustomSelect } from 'components/CustomSelect';
import { CampaignScheuduler, listViewIcons } from 'constants/appConstant';
import EditCampaignModal from '../EditCampaignModal';
import { DeleteModal } from 'components/Modals';
import { Loading } from 'components/Loading/Loading';
import dayjs from 'dayjs';

const Details = ({
  item,
  onClose,
  refresh,
  templates = [],
  segments = [],
  fetchSegment,
  fetchTemplate,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [openModal, setOpenModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleClickTooltip = (title, item) => {
    switch (title) {
      case 'Edit':
        setOpenModal(true);
        break;
      case 'Delete':
        setDeleteModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await DeleteCampaign(item.id);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        refresh();
        onClose();
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (refresh) {
      refresh();
    }
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', sm: '500px', md: '600px' },
        margin: 'auto',
        padding: theme.spacing(1),
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h8">Campaign Details</Typography>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          {listViewIcons
            .filter((data) => data.title !== 'Enlarge')
            .map((data, index) => (
              <Tooltip title={data.title} arrow key={index}>
                <span style={{ cursor: 'pointer' }}>
                  <img
                    src={data.icon}
                    width={data.title === 'Enlarge' ? 17 : 23}
                    height={data.title === 'Enlarge' ? 17 : 23}
                    onClick={() => handleClickTooltip(data.title, item)}
                    alt={`${data.title} icon`}
                  />
                </span>
              </Tooltip>
            ))}
        </Box>
      </Box>

      <EditCampaignModal
        open={openModal}
        onClose={handleClose}
        itemId={item}
        refresh={refresh}
        templates={templates}
        segments={segments}
        FetchTemplate={fetchTemplate}
        FetchSegment={fetchSegment}
      />

      <DeleteModal
        open={deleteModalOpen}
        close={() => setDeleteModalOpen(false)}
        placeholder="Campaign"
        deleteFunction={() => handleDelete()}
      />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InnerTextField
            label="Campaign Name"
            value={item?.campaignName || ''}
            readOnly
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <InnerTextField
            label="Template"
            value={item?.template?.templateName || ''}
            readOnly
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <InnerTextField
            label="Segment"
            value={item?.segment?.segmentName || ''}
            readOnly
            fullWidth
          />
        </Grid>

        {/* Put both in the same row */}

        <Grid item xs={12}>
          <Box width="100%" display={'flex'} alignItems={'end'} gap={2}>
            <FormControl sx={{ width: '44%' }}>
              <CustomSelect
                label="Schedule"
                options={CampaignScheuduler}
                value={item?.frequency || ''}
                readOnly
              />
            </FormControl>

            {item?.frequency !== 'now' && (
              <DateTimepicker
                readOnly
                label="Date and time"
                value={formatDateTime(item?.frequencyDateTime) || ''}
              />
            )}
          </Box>
        </Grid>
      </Grid>

      <Box marginTop={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.palette.background.default,
                padding: theme.spacing(1.5),
                borderRadius: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                color="black"
                fontWeight={600}
                marginBottom={0.5}
              >
                Status
              </Typography>
              <Typography variant="body2">
                {item?.status || 'Not specified'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4.5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.palette.background.default,
                padding: theme.spacing(1.5),
                borderRadius: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                color="black"
                fontWeight={600}
                marginBottom={0.5}
              >
                Created Time
              </Typography>
              <Typography variant="body2">
                {formatDateTime(item?.createdTime) || 'Not available'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4.5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.palette.background.default,
                padding: theme.spacing(1.5),
                borderRadius: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                color="black"
                fontWeight={600}
                marginBottom={0.5}
              >
                Modified Time
              </Typography>
              <Typography variant="body2">
                {formatDateTime(item?.modifiedTime) || 'Not modified'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Details;
