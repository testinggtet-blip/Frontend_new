import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Tooltip,
  useTheme,
  Grid,
  Switch,
  Button,
  Modal,
  IconButton,
} from '@mui/material';
import { DeleteCampaign } from 'Api/Api';
import toast from 'react-hot-toast';
import { formatDateTime } from 'utils/commonFunctions';
import { InnerTextField } from 'components/InputFields';
import { listViewIcons } from 'constants/appConstant';
import EditRealTimeCampaignModal from '../EditRealTimeCampaignModal';
import { DeleteModal } from 'components/Modals';
import { Loading } from 'components/Loading/Loading';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Preview from './Preview';

const Details = ({
  item,
  onClose,
  refresh,
  segments = [],

}) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullImagePreview, setFullImagePreview] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [tabValue, setTabValue] = useState('1');
  const [image, setImage] = useState({
    logo: '',
  });

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


  // Parse social proof data JSON
  let parsedData = {};
  try {
    if (item?.data) parsedData = JSON.parse(item.data);
  } catch (_) {
    parsedData = {};
  }
  const nonEmptyUrls = (parsedData?.displayUrls || []).filter((u) => (u || '').trim().length > 0);

  const handleImagePreview = (imageType) => {
    setFullImagePreview(imageType === fullImagePreview ? null : imageType);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (item !== null) {
      const { logo, ...restItemId } = item;
      if (logo) {
        setImage({ logo: logo });
      }
    }
  }, [item]);

  const renderImageSection = (imageType, imageUrl, label) => (
    <Box marginY={2}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={1}
      >
        <Typography
          variant="subtitle1"
          fontWeight={500}
          sx={{ fontSize: '16px', color: 'black' }}
        >
          {label}
        </Typography>
      </Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: { xs: '250px', sm: '300px', md: '400px' },
          aspectRatio: '16/9',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 2,
          transition: 'transform 0.3s',
          '&:hover': { transform: 'scale(1.02)' },
        }}
      >
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={`${label} Image`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <Tooltip title="View Full Image">
              <Button
                onClick={() => handleImagePreview(imageType)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  minWidth: 'auto',
                  p: 1,
                  borderRadius: '50%',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                }}
              >
                <ZoomInIcon fontSize="small" />
              </Button>
            </Tooltip>
          </>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
          >
            No image uploaded
          </Typography>
        )}
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', sm: '500px', md: '600px' },
        margin: 'auto',
        padding: theme.spacing(1),
      }}
    >
      <Loading state={loading} />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h8">Campaign Details</Typography>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Tooltip
            title={isPreview ? 'Cancel Preview' : 'Campaign Preview'}
          >
            <Button
              onClick={() => setIsPreview((prev) => !prev)}
              sx={{
                minWidth: 'auto',
                p: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                  transform: 'scale(1.1)',
                },
              }}
              disableRipple
            >
              {isPreview ? (
                <VisibilityOffIcon
                  sx={{
                    color: 'gray',
                    cursor: 'pointer',
                    width: '25px',
                    height: '25px',
                  }}
                />
              ) : (
                <VisibilityOutlinedIcon
                  sx={{
                    color: 'gray',
                    cursor: 'pointer',
                    width: '25px',
                    height: '25px',
                  }}
                />
              )}
            </Button>
          </Tooltip>

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

      <EditRealTimeCampaignModal
        open={openModal}
        onClose={handleClose}
        itemId={item}
        refresh={refresh}
        segments={segments}
        isPreview={isPreview}
        setIsPreview={setIsPreview}
        isDetail={false}
      />

      <DeleteModal
        open={deleteModalOpen}
        close={() => setDeleteModalOpen(false)}
        placeholder="Campaign"
        deleteFunction={() => handleDelete()}
      />

      {isPreview ? (
        <Preview
          handleTabChange={handleTabChange}
          tabValue={tabValue}
          campaignDetails={{
            description: parsedData?.messageText || '',
            desktopPosition: parsedData?.notificationPosition === 'Left Corner' ? 'bottom-left' : 'bottom-right',
            mobilePosition: parsedData?.notificationPosition === 'Left Corner' ? 'bottom-left' : 'bottom-right',
          }}
          image={image}
        />
      ) : (
        <>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InnerTextField label="Campaign Name" value={item?.campaignName || ''} readOnly fullWidth />
        </Grid>
        <Grid item xs={12} sm={12}>
          <InnerTextField label="Trigger For" value={parsedData?.triggerFor || ''} readOnly fullWidth />
        </Grid>

        {parsedData?.triggerFor === 'Existing' && (
          <Grid item xs={12}>
            <InnerTextField label="Segment" value={item?.segment?.segmentName || ''} readOnly fullWidth />
          </Grid>
        )}
      </Grid>

      {/* Social Proof specific readonly fields */}
      <Box marginTop={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {renderImageSection('logo', item?.logo || item?.icon, 'Notification Icon')}
          </Grid>
          <Grid item xs={12}>
            <InnerTextField label="Message Text" value={parsedData?.messageText || ''} readOnly fullWidth />
          </Grid>
          <Grid item xs={12} sm={12}>
            <InnerTextField label="Where To Display" value={parsedData?.whereToDisplay || ''} readOnly fullWidth />
          </Grid>
          {nonEmptyUrls.length > 0 && (
            <Grid item xs={12}>
              <InnerTextField label="Display URLs" value={nonEmptyUrls.join(', ')} readOnly fullWidth />
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <InnerTextField label="Notification Position" value={parsedData?.notificationPosition || ''} readOnly fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InnerTextField label="Redirecting Notification" value={parsedData?.redirectingNotification || ''} readOnly fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InnerTextField label="Display Duration" value={String(parsedData?.displayDuration ?? '')} readOnly fullWidth />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                backgroundColor: theme.palette.background.default,
                padding: theme.spacing(1.2),
                borderRadius: 2,
                height: '56px',
              }}
            >
              <Typography variant="subtitle2" >
                Closable
              </Typography>
              <Switch checked={!!parsedData?.closable} disabled />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Full Image Preview Modal */}
      {fullImagePreview && (
        <Modal
          open={!!fullImagePreview}
          onClose={() => handleImagePreview(null)}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Box
            sx={{
              maxWidth: '90%',
              maxHeight: '90%',
              outline: 'none',
              position: 'relative',
            }}
          >
            <IconButton
              onClick={() => handleImagePreview(null)}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
              }}
            >
              <CloseIcon />
            </IconButton>
            <img
              src={item?.logo || item?.icon}
              alt={`Full Image`}
              style={{ width: '100%', height: '100%', objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
            />
          </Box>
        </Modal>
      )}

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
              <Typography variant="subtitle2" color="black" fontWeight={600} marginBottom={0.5}>
                Status
              </Typography>
              <Typography variant="body2">{item?.status || 'Not specified'}</Typography>
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
              <Typography variant="subtitle2" color="black" fontWeight={600} marginBottom={0.5}>
                Created Time
              </Typography>
              <Typography variant="body2">{formatDateTime(item?.createdTime) || 'Not available'}</Typography>
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
              <Typography variant="subtitle2" color="black" fontWeight={600} marginBottom={0.5}>
                Modified Time
              </Typography>
              <Typography variant="body2">{formatDateTime(item?.modifiedTime) || 'Not modified'}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
        </>
      )}
    </Box>
  );
};

export default Details;
