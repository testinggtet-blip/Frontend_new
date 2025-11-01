import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Switch,
  Typography,
  TextField,
  Modal,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import { TemplateStyles } from './Style';
import toast from 'react-hot-toast';
import { UpdateTemplate } from 'Api/Api';
import { Loading } from 'components/Loading/Loading';
import { SideDrawer } from 'components/SideDrawer';
import { InnerTextField } from 'components/InputFields';
import { formatDateTime } from 'utils/commonFunctions';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const EditTemplateModal = ({ open, onClose, itemId, isDetail, refresh }) => {
  const [templateDetails, setTemplateDetails] = useState(itemId || {});
  const [imagePreview, setImagePreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const isEmptyArray = (arr) => !arr || arr.length === 0;
  const [buttonToggle, setButtonToggle] = useState(
    templateDetails.actionButtons &&
      !isEmptyArray(templateDetails.actionButtons)
  );
  const [updatedFields, setUpdatedFields] = useState(() => ({
    id: itemId?.id,
    welcomeTemplate: itemId?.welcomeTemplate ?? '',
  }));
  const [images, setImages] = useState({
    banner: itemId?.banner || '',
    icon: itemId?.icon || '',
  });
  const [errors, setErrors] = useState({
    templateName: false,
    title: false,
    message: false,
    pageURL: false,
    icon: false,
    banner: false,
    actionButtons: [
      { title: '', launchUrl: '' },
      { title: '', launchUrl: '' },
    ],
  });

  // Refs for hidden file inputs
  const iconFileInputRef = useRef(null);
  const bannerFileInputRef = useRef(null);

  const handleEditChange = () => setEdit(!edit);

  const handleImagePreview = () => {
    setImagePreview(!imagePreview);
  };

  const handleToggle = (e) => {
    const name = e.target.name;
    if (name === 'buttons') {
      const newToggle = !buttonToggle;
      setButtonToggle(newToggle);
      setTemplateDetails((prev) => ({
        ...prev,
        actionButtons: newToggle
          ? [
              { action: '', title: '', icon: '', launchUrl: '' },
              { action: '', title: '', icon: '', launchUrl: '' },
            ]
          : [],
      }));
      setErrors((prev) => ({
        ...prev,
        actionButtons: [
          { title: '', launchUrl: '' },
          { title: '', launchUrl: '' },
        ],
      }));
    }
    if (name === 'status') {
      const newStatus =
        templateDetails?.status === 'Active' ? 'Inactive' : 'Active';
      setTemplateDetails((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTemplateDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() === '' ? 'Required' : false,
    }));
  };

  const handleActionButtonChange = (e, idx) => {
    const { name, value } = e.target;
    setTemplateDetails((prev) => {
      const updatedButtons = [...prev.actionButtons];
      updatedButtons[idx] = { ...updatedButtons[idx], [name]: value };
      return { ...prev, actionButtons: updatedButtons };
    });
    setErrors((prev) => {
      const updatedErrors = [...prev.actionButtons];
      updatedErrors[idx] = {
        ...updatedErrors[idx],
        [name]: value.trim() === '' ? 'Required' : '',
      };
      return { ...prev, actionButtons: updatedErrors };
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      const newFile = new File([file], file.name, { type: file.type });
      setTemplateDetails((prev) => ({ ...prev, [name]: newFile }));
      setUpdatedFields((prev) => ({ ...prev, [name]: newFile }));
      setImages((prev) => ({ ...prev, [name]: URL.createObjectURL(newFile) }));
      setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
      if (e.target) {
        e.target.value = '';
      }
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: true }));
    }
  };

  const handleRemoveIcon = () => {
    setImages((prev) => ({ ...prev, icon: '' }));
    setTemplateDetails((prev) => ({ ...prev, icon: '' }));
    setUpdatedFields((prev) => ({ ...prev, icon: '' }));
    setErrors((prevErrors) => ({ ...prevErrors, icon: false }));
    if (iconFileInputRef.current) {
      iconFileInputRef.current.value = '';
    }
  };

  const handleRemoveBanner = () => {
    setImages((prev) => ({ ...prev, banner: '' }));
    setTemplateDetails((prev) => ({ ...prev, banner: '' }));
    setUpdatedFields((prev) => ({ ...prev, banner: '' }));
    setErrors((prevErrors) => ({ ...prevErrors, banner: false }));
    if (bannerFileInputRef.current) {
      bannerFileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};

    // Validate basic fields
    ['templateName', 'title', 'message', 'pageURL'].forEach((field) => {
      if (!templateDetails[field]?.trim()) {
        newErrors[field] = true;
      }
    });

    if (buttonToggle) {
      newErrors.actionButtons = templateDetails.actionButtons.map((btn) => {
        const btnErrors = {};
        if (!btn.title?.trim()) {
          btnErrors.title = 'Required';
        }
        if (!btn.launchUrl?.trim()) {
          btnErrors.launchUrl = 'Required';
        }
        return btnErrors;
      });
    }

    setErrors(newErrors);

    const hasError =
      Object.keys(newErrors).length > 0 &&
      Object.values(newErrors).some((err) => {
        if (Array.isArray(err)) {
          return err.some((e) => Object.keys(e).length > 0);
        }
        return !!err;
      });

    if (!hasError) {
      try {
        setLoading(true);
        let formData = new FormData();

        Object.entries(templateDetails).forEach(([key, value]) => {
          if (key === 'actionButtons') {
            formData.append('actionButtons', JSON.stringify(value));
          } else if (value instanceof File) {
            formData.append(key, value, value.name);
          } else if (value !== undefined && value !== null) {
            formData.append(key, value);
          }
        });

        const response = await UpdateTemplate(templateDetails?.id, formData);
        if (response?.data?.status === true) {
          toast.success(response?.data?.message);
          refresh();
          onClose();
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const { banner, icon, ...restItemId } = itemId || {};
    setTemplateDetails((prev) => ({ ...prev, ...restItemId }));

    if (itemId?.banner || itemId?.icon) {
      setImages({ banner: itemId.banner, icon: itemId.icon });
    }

    if (itemId?.actionButtons && itemId?.actionButtons.length > 0) {
      setButtonToggle(true);
      setTemplateDetails((prev) => ({
        ...prev,
        actionButtons: itemId?.actionButtons,
      }));
    } else {
      setButtonToggle(false);
      setTemplateDetails((prev) => ({
        ...prev,
        actionButtons: [],
      }));
    }
    setUpdatedFields((prev) => ({
      ...prev,
      id: itemId?.id,
      welcomeTemplate: itemId?.welcomeTemplate,
    }));
  }, [itemId, open]);

  return (
    <>
      <Loading state={loading} />
      <SideDrawer
        open={open}
        onClose={onClose}
        isDetail={isDetail}
        edit={edit}
        setEdit={handleEditChange}
        title={
          itemId?.welcomeTemplate ? 'Edit Welcome Template' : 'Edit Template'
        }
        handleSubmit={handleSubmit}
      >
        <Box>
          <InnerTextField
            required
            error={errors.templateName}
            name="templateName"
            label="Template Name"
            value={templateDetails?.templateName || ''}
            placeholder="Enter template name"
            onChange={handleChange}
            helperText={errors.templateName ? 'Field required' : ''}
            readOnly={!edit && isDetail}
          />
        </Box>
        <Box>
          <InnerTextField
            required
            error={errors.title}
            name="title"
            label="Title"
            value={templateDetails?.title || ''}
            onChange={handleChange}
            helperText={errors.title ? 'Field required' : ''}
            readOnly={!edit && isDetail}
          />
        </Box>
        <Box>
          <InnerTextField
            required
            error={errors.pageURL}
            name="pageURL"
            label="Redirecting URL"
            value={templateDetails?.pageURL || ''}
            placeholder="http://example.com"
            onChange={handleChange}
            helperText={errors.pageURL ? 'Field required' : ''}
            readOnly={!edit && isDetail}
          />
        </Box>
        <Box mb={2}>
          <InnerTextField
            required
            multiline
            error={errors.message}
            name="message"
            label="Message"
            rows={2}
            value={templateDetails?.message || ''}
            onChange={handleChange}
            helperText={errors.message ? 'Field required' : ''}
            readOnly={!edit && isDetail}
          />
        </Box>

        {/* Icon Image Section */}
        <Typography variant="subtitle2" mb={1}>
          Notification Icon
        </Typography>
        <Box mb={2}>
          <Box
            sx={{ ...TemplateStyles.ImageUploadStyle, position: 'relative' }}
          >
            {images.icon ? (
              <img
                src={images.icon}
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
            {images.icon && (
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
              ref={iconFileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              name="icon"
              accept="image/*"
            />
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={() => iconFileInputRef.current?.click()}
              disabled={!edit && isDetail}
            >
              Upload Photo
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleRemoveIcon}
              disabled={!images.icon || (!edit && isDetail)} // Disable if no image or in view mode
            >
              Remove
            </Button>
          </Box>
        </Box>

        {/* Banner Image Section */}
        <Typography variant="subtitle2" mb={1}>
          Banner Image
        </Typography>
        <Box mb={2}>
          <Box
            sx={{ ...TemplateStyles.ImageUploadStyle, position: 'relative' }}
          >
            {images.banner ? (
              <img
                src={images.banner}
                alt="Banner Image"
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
            {images.banner && (
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
              ref={bannerFileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              name="banner"
              accept="image/*"
            />
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={() => bannerFileInputRef.current?.click()}
              disabled={!edit && isDetail}
            >
              Upload Photo
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleRemoveBanner}
              disabled={!images.banner || (!edit && isDetail)} // Disable if no image or in view mode
            >
              Remove
            </Button>
          </Box>
        </Box>

        <Box my={2}>
          <Box>
            <Typography fontSize="20px" variant="black_4">
              Buttons
            </Typography>
            <Switch
              name="buttons"
              size="medium"
              checked={buttonToggle}
              onChange={handleToggle}
            />
          </Box>

          {buttonToggle && Array.isArray(templateDetails?.actionButtons) && (
            <>
              {templateDetails.actionButtons.length > 0 ? (
                templateDetails.actionButtons.map((btn, idx) => (
                  <Box key={idx} mb={3}>
                    <Typography variant="black_h4" mb={1}>
                      Button {idx + 1}
                    </Typography>
                    <Box display="flex" gap={2} alignItems="center">
                      <InnerTextField
                        required
                        margin="dense"
                        name="title"
                        label="Title"
                        value={btn.title}
                        onChange={(e) => handleActionButtonChange(e, idx)}
                        placeholder="Enter Title"
                        error={!!errors.actionButtons?.[idx]?.title}
                        helperText={errors.actionButtons?.[idx]?.title || ' '}
                        FormHelperTextProps={{ style: { minHeight: 24 } }}
                      />
                      <InnerTextField
                        required
                        margin="dense"
                        name="launchUrl"
                        label="Button Link"
                        value={btn.launchUrl}
                        onChange={(e) => handleActionButtonChange(e, idx)}
                        placeholder="Button Link"
                        error={!!errors.actionButtons?.[idx]?.launchUrl}
                        helperText={
                          errors.actionButtons?.[idx]?.launchUrl || ' '
                        }
                        FormHelperTextProps={{ style: { minHeight: 24 } }}
                      />
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No action buttons added yet
                </Typography>
              )}
            </>
          )}
        </Box>

        <Box>
          <Box my={1}>
            <Typography variant="black_4">Status</Typography>
            <Switch
              name="status"
              size="large"
              checked={templateDetails?.status === 'Active'}
              onChange={handleToggle}
              readOnly={!edit && isDetail}
            />
          </Box>
        </Box>
        <Box>
          {isDetail && !edit ? (
            <Box>
              <Typography variant="subtitle2" my={1}>
                Created time : {formatDateTime(templateDetails?.createdTime)}
              </Typography>
              <Typography variant="subtitle2" my={1}>
                Modified time : {formatDateTime(templateDetails?.modifiedTime)}
              </Typography>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </SideDrawer>

      {/* Full Image Preview Modal */}
      {imagePreview && (images.icon || images.banner) && (
        <Modal
          open={imagePreview}
          onClose={handleImagePreview}
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
              onClick={handleImagePreview}
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
              src={images.icon || images.banner}
              alt="Full Image"
              style={{
                width: '800px',
                height: '800px',
                objectFit: 'contain',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default EditTemplateModal;
