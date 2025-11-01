import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Modal,
  IconButton,
  Tooltip,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import EditTemplateModal from '../EditTemplateModal';
import { InnerTextField } from 'components/InputFields';
import { formatDateTime } from 'utils/commonFunctions';
import { DeleteTemplate } from 'Api/Api';
import toast from 'react-hot-toast';
import { DeleteModal } from 'components/Modals';
import { Loading } from 'components/Loading/Loading';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { listViewIcons } from 'constants/appConstant';
import Preview from './Preview';

const Details = ({
  item,
  onClose,
  refresh,
  refreshWelcomeTemplate,
  welcomeTemplate,
  setWelcomeTemplates,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [isPreview, setIsPreview] = useState(false);
  const [tabValue, setTabValue] = useState('1');
  const [openModal, setOpenModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullImagePreview, setFullImagePreview] = useState(null);
  const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0;

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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleImagePreview = (imageType) => {
    setFullImagePreview(imageType === fullImagePreview ? null : imageType);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await DeleteTemplate(item?.id);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setWelcomeTemplates(null);
        {
          item?.welcomeTemplate === true ? refreshWelcomeTemplate() : refresh();
        }
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

  if (loading) {
    return <Loading state={loading} />;
  }

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
          sx={{
            fontSize: '16px',
            color: 'black',
          }}
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
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={`${label} Image`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
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
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                  },
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
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <Typography variant="h8">
          {item?.welcomeTemplate === true
            ? 'Welcome Template Details'
            : 'Template Details'}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip
            title={isPreview ? 'Cancel Preview' : 'Custom Prompt Preview'}
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

      {isPreview ? (
        <Preview
          handleTabChange={handleTabChange}
          tabValue={tabValue}
          setTabValue={setTabValue}
          customPrompt={welcomeTemplate}
          // image={image}
        />
      ) : (
        <>
          <EditTemplateModal
            open={openModal}
            onClose={handleClose}
            itemId={item}
            refresh={
              item?.welcomeTemplate === true ? refreshWelcomeTemplate : refresh
            }
          />

          <DeleteModal
            open={deleteModalOpen}
            close={() => setDeleteModalOpen(false)}
            placeholder="Template"
            deleteFunction={() => handleDelete()}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InnerTextField
                label="Template Name"
                value={item?.templateName || ''}
                readOnly={true}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InnerTextField
                label="Title"
                value={item?.title || ''}
                readOnly={true}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <InnerTextField
                label="Message"
                value={item?.message || ''}
                readOnly={true}
                fullWidth
                multiline
                rows={3}
              />
            </Grid>

            <Grid item xs={12}>
              <InnerTextField
                label="Redirecting URL"
                value={item?.pageURL || ''}
                readOnly={true}
                fullWidth
              />
            </Grid>
          </Grid>

          {renderImageSection('icon', item?.icon, 'Notification Icon')}
          {renderImageSection('banner', item?.banner, 'Banner Image')}

          <Box marginTop={2}>
            {!isEmptyObject(item?.actionButtons) && (
              <>
                {item.actionButtons.map((btn, idx) => (
                  <Box key={idx} mb={2}>
                    <Typography variant="black_h4" mb={1}>
                      Button {idx + 1}
                    </Typography>
                    <Box display="flex" gap={2} alignItems="center">
                      <InnerTextField
                        label="Title"
                        value={btn.title}
                        InputProps={{ readOnly: true }}
                        fullWidth
                      />
                      <InnerTextField
                        label="Button Link"
                        value={btn.launchUrl}
                        InputProps={{ readOnly: true }}
                        fullWidth
                      />
                    </Box>
                  </Box>
                ))}
              </>
            )}
          </Box>

          <Box marginTop={1}>
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

          {/* Full Image Preview Modal */}
          {fullImagePreview && (
            <Modal
              open={!!fullImagePreview}
              onClose={() => handleImagePreview(null)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
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
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.7)',
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <img
                  src={fullImagePreview === 'icon' ? item?.icon : item?.banner}
                  alt={`${fullImagePreview} Image`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                />
              </Box>
            </Modal>
          )}
        </>
      )}
    </Box>
  );
};

export default Details;
