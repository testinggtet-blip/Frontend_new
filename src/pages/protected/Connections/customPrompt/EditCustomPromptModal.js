import React, { useEffect, useState } from 'react';
import { Box, Switch, TextField, Typography } from '@mui/material';
import { UpdateCustomPrompt } from 'Api/Api';
import toast from 'react-hot-toast';
import { Loading } from 'components/Loading/Loading';
import { SideDrawer } from 'components/SideDrawer';
import { InnerTextField } from 'components/InputFields';
import { TemplateStyles } from 'pages/protected/Templates/Style';
import Preview from './Preview';
import { CustomSelect } from 'components/CustomSelect';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { DesktopPosition, MobilePosition, Time } from 'constants/appConstant';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const EditCustomPromptModal = ({
  open,
  onClose,
  itemId,
  refreshCustomPrompt,
}) => {
  const [customPrompt, setCustomPrompt] = useState(itemId || {});
  const [image, setImage] = useState({
    logo: '',
  });
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState('1');
  const [isPreview, setIsPreview] = useState(false);
  const [imagePreview, setImagePreview] = useState(false);

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    allowButtonText: false,
    hidePromptFrequency: false,
    showPromptFrequency: false,
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleImagePreview = () => {
    setImagePreview(!imagePreview);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomPrompt((prevState) => {
      if (name in prevState.data.styles) {
        return {
          ...prevState,
          data: {
            ...prevState.data,
            styles: {
              ...prevState.data.styles,
              [name]: value,
            },
          },
        };
      } else {
        return {
          ...prevState,
          data: {
            ...prevState.data,
            [name]: value,
          },
        };
      }
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: typeof value === 'string' && value.trim() === '',
    }));
  };

  const handleToggle = (e) => {
    const { name } = e.target;
    if (name === 'status') {
      const newStatus =
        customPrompt?.status === 'Active' ? 'Inactive' : 'Active';
      setCustomPrompt((prevState) => ({
        ...prevState,
        status: newStatus,
      }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCustomPrompt((prev) => ({
        ...prev,
        iconImage: file,
      }));
      setImage((prev) => ({
        ...prev,
        logo: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      //   title: customPrompt?.data?.title.trim() === '',
      //   description: customPrompt?.data?.description.trim() === '',
      //   allowButtonText:
      //     customPrompt?.data?.styles?.allowButtonText.trim() === '',
      //   hidePromptFrequency:
      //     customPrompt?.data?.styles?.hidePromptFrequency.trim() === '',
      //   showPromptFrequency:
      //     customPrompt?.data?.styles?.showPromptFrequency.trim() === '',
    };
    setErrors(newErrors);
    if (Object.values(newErrors).every((error) => !error)) {
      try {
        setLoading(true);
        const { iconImageURL, ...customPromptData } = customPrompt;
        const response = await UpdateCustomPrompt(
          customPrompt?.id,
          customPromptData
        );
        if (response?.data?.status === true) {
          toast.success(response?.data?.message);
          refreshCustomPrompt();
          onClose();
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message || 'An error occured');
      }
    }
  };

  useEffect(() => {
    if (itemId) {
      const { iconImageURL, ...restItemId } = itemId;
      setCustomPrompt((prev) => ({ ...prev, ...restItemId }));
      if (iconImageURL) {
        setImage({ logo: iconImageURL });
      }
    }
  }, [itemId]);

  const flattenObject = ({ data, ...rest }) => ({
    ...rest,
    ...data,
    ...data?.styles,
  });

  return (
    <>
      <Loading state={loading} />
      <SideDrawer
        open={open}
        onClose={onClose}
        title={isPreview ? 'Custom Prompt Preview' : 'Edit Custom Prompt'}
        handleSubmit={handleSubmit}
        EyeIcon={true}
        isPreview={isPreview}
        setIsPreview={setIsPreview}
      >
        {isPreview ? (
          <Preview
            handleTabChange={handleTabChange}
            tabValue={tabValue}
            setTabValue={setTabValue}
            customPrompt={flattenObject(customPrompt)}
            image={image}
          />
        ) : (
          <Box>
            <Box width={'90%'}>
              <Box>
                <InnerTextField
                  required
                  margin="dense"
                  name="title"
                  label="Title"
                  value={customPrompt?.data?.title}
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <InnerTextField
                  required
                  name="description"
                  label="Description"
                  value={customPrompt?.data?.description}
                  onChange={handleChange}
                />
              </Box>

              <Box marginY={1}>
                <Typography variant="black_4">Status</Typography>
                <Switch
                  name="status"
                  size="large"
                  checked={customPrompt?.status === 'Active'}
                  onChange={handleToggle}
                />
              </Box>
              <Box marginY={2}>
                <Typography variant="subtitle2" fontSize={'19px'} mb={1}>
                  Icon Image
                </Typography>
                <Box mb={2}>
                  <Box
                    sx={{
                      ...TemplateStyles.ImageUploadStyle,
                      position: 'relative',
                    }}
                  >
                    {image.logo ? (
                      <img
                        src={image.logo}
                        alt="Icon Image"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%',
                        }}
                      >
                        No image uploaded
                      </Typography>
                    )}
                    {image.logo && (
                      <Tooltip title="View Full Image">
                        <Button
                          onClick={handleImagePreview}
                          sx={TemplateStyles.ImagePreviewView}
                        >
                          <ZoomInIcon fontSize="small" />
                        </Button>
                      </Tooltip>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                      accept="image/*"
                      id="customPromptImageInput"
                    />
                    <Button
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      onClick={() =>
                        document
                          .getElementById('customPromptImageInput')
                          .click()
                      }
                    >
                      Upload Icon Photo
                    </Button>
                  </Box>
                </Box>
              </Box>

              <Box>
                <Typography sx={{ fontSize: '18px' }} variant="black_p">
                  Allow Button
                </Typography>

                <InnerTextField
                  required
                  name="allowButtonText"
                  label="Text"
                  value={customPrompt?.data?.styles?.allowButtonText}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <InnerTextField
                  required
                  name="allowButtonBackgroundColor"
                  label="Background Color"
                  colorSelection
                  value={customPrompt?.data?.styles?.allowButtonBackgroundColor}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <InnerTextField
                  required
                  name="allowButtonTextColor"
                  label="Text Color"
                  colorSelection
                  value={customPrompt?.data?.styles?.allowButtonTextColor}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <InnerTextField
                  required
                  label="Later Button Text"
                  name="laterButtonText"
                  value={customPrompt?.data?.styles?.laterButtonText}
                  onChange={handleChange}
                />
              </Box>

              {/* <Box my={2}>
                <Typography sx={{ fontSize: '18px' }} variant="subtitle3">
                  Opt-in Timings
                </Typography>
              </Box>
              <Box my={3}>
                <CustomSelect
                  label="Mobile (In Sec)"
                  name="mobileTiming"
                  fullWidth
                  options={Time}
                  value={customPrompt?.data?.styles?.mobileTiming}
                  defaultValue={customPrompt?.data?.styles?.mobileTiming}
                  onChange={handleChange}
                />
              </Box>

              <Box mb={1}>
                <CustomSelect
                  label="Desktop (In Sec)"
                  name="desktopTiming"
                  fullWidth
                  options={Time}
                  value={customPrompt?.data?.styles?.desktopTiming}
                  defaultValue={customPrompt?.data?.styles?.desktopTiming}
                  onChange={handleChange}
                />
              </Box>
              <Box mt={1}>
                <InnerTextField
                  required
                  name="hidePromptFrequency"
                  label="Hide Prompt Frequency"
                  value={customPrompt?.data?.styles?.hidePromptFrequency}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <InnerTextField
                  required
                  name="showPromptFrequency"
                  label="Show Prompt Frequency"
                  value={customPrompt?.data?.styles?.showPromptFrequency}
                  onChange={handleChange}
                />
              </Box> */}

              <Box my={2}>
                <Typography sx={{ fontSize: '18px' }} variant="subtitle3">
                  Position
                </Typography>
              </Box>
              <Box my={3}>
                <CustomSelect
                  label="Desktop"
                  name="desktopPosition"
                  fullWidth
                  value={customPrompt?.data?.styles?.desktopPosition}
                  options={DesktopPosition}
                  defaultValue={customPrompt?.data?.styles?.desktopPosition}
                  onChange={handleChange}
                />
              </Box>
              <Box mb={1}>
                <CustomSelect
                  label="Mobile"
                  name="mobilePosition"
                  fullWidth
                  value={customPrompt?.data?.styles?.mobilePosition}
                  options={MobilePosition}
                  defaultValue={customPrompt?.data?.styles?.mobilePosition}
                  onChange={handleChange}
                />
              </Box>
            </Box>
          </Box>
        )}
      </SideDrawer>

      {imagePreview && image.logo && (
        <Modal
          open={imagePreview}
          onClose={handleImagePreview}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0, 0, 0, 0.4)', 
          }}
        >
          <Box
            sx={{
              width: { xs: '90%', sm: '70%', md: '50%' },
              bgcolor: 'background.paper', 
              borderRadius: 2,
              boxShadow: 24,
              p: 2,
              maxWidth: '90%',
              maxHeight: '90%',
              outline: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <IconButton
              onClick={handleImagePreview}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'black'
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box
              component="img"
              src={image.logo}
              alt="Full Image"
              sx={{
                width: 'auto',
                height: 'auto',
                maxWidth: '500px',
                maxHeight: '500px',
                objectFit: 'contain',
                borderRadius: 1,
                backgroundColor: 'background.paper',
                boxShadow: 3,
              }}
            />
          </Box>
        </Modal>
      )}

    </>
  );
};

export default EditCustomPromptModal;
