import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  TextField,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  Button,
  Tooltip,
  IconButton,
  Modal,
} from '@mui/material';
import { UpdateConnection } from 'Api/Api';
import toast from 'react-hot-toast';
import { Loading } from 'components/Loading/Loading';
import { SideDrawer } from 'components/SideDrawer';
import { TemplateStyles } from '../Templates/Style';
import { InnerTextField } from 'components//InputFields';
import { imageValidation } from 'utils/commonFunctions';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const EditConnectModal = ({ open, onClose, itemId, isDetail, refresh }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [connectionDetails, setConnectionDetails] = useState({});
  const [updateConnection, setUpdateConnection] = useState({
    id: itemId?.id,
  });
  const [errors, setErrors] = useState({
    connectionName: false,
    connectionImage: false,
  });

  // Ref for hidden file input
  const connectionImageFileInputRef = useRef(null);

  const handleEditChange = () => setEdit(!edit);

  const handleImagePreview = () => {
    setImagePreview(!imagePreview);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== 'connectionImage') {
      setConnectionDetails((prev) => ({ ...prev, [name]: value }));
      setUpdateConnection((prev) => ({ ...prev, [name]: value }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value.trim() === '',
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      const isValid = imageValidation(file, setErrors);
      if (isValid) {
        const newFile = new File([file], file.name, { type: file.type });
        setConnectionDetails((prev) => ({ ...prev, [name]: newFile }));
        setUpdateConnection((prev) => ({ ...prev, [name]: newFile }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
        setImage(URL.createObjectURL(newFile));
        if (e.target) {
          e.target.value = '';
        }
      }
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: true }));
    }
  };

  const handleRemoveImage = () => {
    setImage('');
    setConnectionDetails((prev) => ({ ...prev, connectionImage: '' }));
    setUpdateConnection((prev) => ({ ...prev, connectionImage: '' }));
    setErrors((prevErrors) => ({ ...prevErrors, connectionImage: false }));
    if (connectionImageFileInputRef.current) {
      connectionImageFileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      connectionName: connectionDetails.connectionName.trim() === '',
    };
    setErrors(newErrors);
    if (Object.values(newErrors).every((error) => !error)) {
      try {
        setLoading(true);
        let formData = new FormData();
        Object.entries(updateConnection).forEach(([key, value]) => {
          formData.append(key, value);
        });
        const response = await UpdateConnection(
          connectionDetails?.id,
          formData
        );
        if (response?.data?.status === true) {
          toast.success(response?.data?.message);
          refresh();
          onClose();
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    const { connectionImage, ...restItemId } = itemId || {};
    setConnectionDetails(restItemId);
    setUpdateConnection({ id: restItemId.id });
    if (connectionImage) {
      setImage(connectionImage);
      // setImagePreview(imageURL);
    }
  }, [itemId,open]);

  return (
    <>
      <Loading state={loading} />
      <SideDrawer
        open={open}
        onClose={onClose}
        isDetail={isDetail}
        edit={edit}
        setEdit={handleEditChange}
        title={!edit && isDetail ? 'Connection Details' : 'Edit Connection'}
        handleSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InnerTextField
              required
              error={errors.connectionName}
              name="connectionName"
              label="Connection Name"
              value={connectionDetails?.connectionName || ''}
              placeholder="Enter connection name"
              onChange={handleChange}
              helperText={errors.connectionName ? 'Field required' : ''}
              readOnly={!edit && isDetail}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" mb={1}>
              Connection Image
            </Typography>
            <Box mb={2}>
              <Box
                sx={{ ...TemplateStyles.ImageUploadStyle, position: 'relative' }}
              >
                {image ? (
                  <img
                    src={image}
                    alt="Connection Image"
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
                {image && (
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
                  ref={connectionImageFileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  name="connectionImage"
                  accept="image/*"
                />
                <Button
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  onClick={() => connectionImageFileInputRef.current?.click()}
                  disabled={!edit && isDetail}
                  sx={{ textTransform: 'none' }}
                >
                  Upload Connection Photo
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleRemoveImage}
                  disabled={!image || (!edit && isDetail)}
                  sx={{ textTransform: 'none' }}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </SideDrawer>

      {/* Full Image Preview Modal */}
      {imagePreview && image && (
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
              src={image}
              alt="Full Image"
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
  );
};

export default EditConnectModal;
