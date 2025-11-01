import React from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  Tooltip,
  Modal,
  IconButton,
} from '@mui/material';
import { InnerTextField } from 'components/InputFields';
import { useEffect, useState } from 'react';
import EditCustomPromptModal from '../customPrompt/EditCustomPromptModal';
import { editIcon, trashIcon } from 'constants/appImages';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CloseIcon from '@mui/icons-material/Close';
import { DeleteModal } from 'components/Modals';
import { DeleteCustomPrompt } from 'Api/Api';
import toast from 'react-hot-toast';
import NoRecord from 'components/NoRecord';
import CreateCustompromptPage from '../customPrompt/CreateCustomPrompt';
import { Loading } from 'components/Loading/Loading';
import { listViewIcons, Time } from 'constants/appConstant';
import { formatDateTime } from 'utils/commonFunctions';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Preview from '../customPrompt/Preview';

export const CustomPrompt = ({
  initialLoading,
  customPrompt,
  refreshCustomPrompt,
  setCustomPrompts,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [openModal, setOpenModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [fullImagePreview, setFullImagePreview] = useState(false);
  const [flag, setFlag] = useState(customPrompt !== null);
  const [loading, setLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [tabValue, setTabValue] = useState('1');
  const [image, setImage] = useState({
    logo: '',
  });

  const handleOpen = () => {
    setOpenModal(true);
  };

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
      let response = await DeleteCustomPrompt(customPrompt.id);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setCustomPrompts(null);
        refreshCustomPrompt();
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (customPrompt !== null) {
      setFlag(customPrompt);
      const { iconImageURL, ...restItemId } = customPrompt;
      if (iconImageURL) {
        setImage({ logo: iconImageURL });
      }
    }
  }, [customPrompt]);

  useEffect(() => {
    refreshCustomPrompt();
  }, [openModal]);

  if (loading) {
    return <Loading state={loading} />;
  }

  const flattenObject = ({ data, ...rest }) => ({
    ...rest,
    ...data,
    ...data?.styles,
  });

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', sm: '500px', md: '600px' },
        margin: 'auto',
        padding: theme.spacing(1),
      }}
    >
      {flag ? (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Typography fontSize={'18px'} fontWeight={600} color={'black'}>
              Custom Prompt Details
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
                        onClick={() => handleClickTooltip(data.title, customPrompt)}
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
              customPrompt={flattenObject(customPrompt)}
              image={image}
            />
          ) : (
            <>
              <EditCustomPromptModal
                open={openModal}
                onClose={handleClose}
                itemId={customPrompt}
                refreshCustomPrompt={refreshCustomPrompt}
              />

              <DeleteModal
                open={deleteModalOpen}
                close={() => setDeleteModalOpen(false)}
                deleteFunction={handleDelete}
                title="Delete Custom Prompt"
                description="Are you sure you want to delete this custom prompt? This action cannot be undone and will remove the prompt permanently from your connections."
                placeholder={{
                  description: customPrompt?.data?.description,
                }}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InnerTextField
                    label="Title"
                    value={customPrompt?.data?.title || ''}
                    readOnly={true}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InnerTextField
                    label="Description"
                    value={customPrompt?.data?.description || ''}
                    readOnly={true}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Box marginY={2}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  marginBottom={1}
                >
                  <Typography variant="subtitle2">Notification Icon</Typography>
                </Box>
                <Box
                  mb={1}
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
                  {customPrompt?.iconImageURL ? (
                    <>
                      <img
                        src={customPrompt?.iconImageURL}
                        alt="Notification Icon"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <Tooltip title="View Full Image">
                        <Button
                          onClick={() =>
                            handleImagePreview(customPrompt?.iconImageURL)
                          }
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

              <Box my={1}>
                <Typography sx={{ fontSize: '18px' }} variant="black_p">
                  Button
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InnerTextField
                    label="Allow Button Label"
                    value={customPrompt?.data?.styles?.allowButtonText || ''}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InnerTextField
                    label="Background Color"
                    colorSelection
                    value={
                      customPrompt?.data?.styles?.allowButtonBackgroundColor ||
                      ''
                    }
                    readOnly
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InnerTextField
                    label="Later Button Label"
                    value={customPrompt?.data?.styles?.laterButtonText || ''}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InnerTextField
                    label="Text Color"
                    colorSelection
                    value={
                      customPrompt?.data?.styles?.allowButtonTextColor || ''
                    }
                    readOnly
                  />
                </Grid>
              </Grid>

              {/* <Box my={1}>
                <Typography sx={{ fontSize: '18px' }} variant="subtitle3">
                  Opt-in Timings
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InnerTextField
                    label="Mobile (In Sec)"
                    fullWidth
                    value={customPrompt?.data?.styles?.mobileTiming || ''}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InnerTextField
                    label="Desktop (In Sec)"
                    fullWidth
                    options={Time}
                    value={customPrompt?.data?.styles?.desktopTiming || ''}
                    readOnly
                  />
                </Grid>
              </Grid>

              <Box my={1}>
                <Typography sx={{ fontSize: '18px' }} variant="subtitle3">
                  Prompt Frequency
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InnerTextField
                    required
                    name="hidePromptFrequency"
                    label="Hide Prompt Frequency"
                    value={
                      customPrompt?.data?.styles?.hidePromptFrequency || ''
                    }
                    readOnly
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InnerTextField
                    required
                    name="showPromptFrequency"
                    label="Show Prompt Frequency"
                    value={
                      customPrompt?.data?.styles?.showPromptFrequency || ''
                    }
                    readOnly
                  />
                </Grid>
              </Grid> */}

              <Box my={1}>
                <Typography sx={{ fontSize: '18px' }} variant="subtitle3">
                  Position
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InnerTextField
                    label="Desktop"
                    name="desktopPosition"
                    fullWidth
                    value={customPrompt?.data?.styles?.desktopPosition || ''}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InnerTextField
                    label="Mobile"
                    name="mobilePosition"
                    fullWidth
                    value={customPrompt?.data?.styles?.mobilePosition || ''}
                    readOnly
                  />
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
                        fontWeight={500}
                        marginBottom={0.5}
                      >
                        Status
                      </Typography>
                      <Typography variant="body2">
                        {customPrompt?.status || 'Not specified'}
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
                        fontWeight={500}
                        marginBottom={0.5}
                      >
                        Created Time
                      </Typography>
                      <Typography variant="body2">
                        {formatDateTime(customPrompt?.createdTime) ||
                          'Not available'}
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
                        fontWeight={500}
                        marginBottom={0.5}
                      >
                        Modified Time
                      </Typography>
                      <Typography variant="body2">
                        {formatDateTime(customPrompt?.modifiedTime) ||
                          'Not modified'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </>
      ) : (
        <Box>
          <NoRecord
            type="callback"
            moduleName="Custom Prompt"
            title="Create Your First Notification Prompt"
            description="Design a pop-up that asks visitors for permission to send them notifications"
            onAction={handleOpen}
          />
          <CreateCustompromptPage
            open={openModal}
            onClose={handleClose}
            refreshCustomPrompt={refreshCustomPrompt}
          />
        </Box>
      )}

      {/* Full Image Preview Modal */}
      {fullImagePreview && customPrompt?.iconImageURL && (
        <Modal
          open={!!fullImagePreview}
          onClose={() => handleImagePreview(null)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'auto',
          }}
        >
          <Box
            sx={{
              width: { xs: '90%', sm: '70%', md: '50%' },
              maxHeight: '90vh',
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 'none',
              p: 2,
              outline: 'none',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconButton
              onClick={() => handleImagePreview(null)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'black',

              }}
            >
              <CloseIcon />
            </IconButton>

            <img
              src={customPrompt.iconImageURL}
              alt="Full Image"
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: 8,
              }}
            />
          </Box>
        </Modal>
      )}

    </Box>
  );
};

export default CustomPrompt;
