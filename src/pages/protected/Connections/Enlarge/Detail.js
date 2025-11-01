import React, { useEffect } from 'react';
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
import { useState } from 'react';
import { formatDateTime } from 'utils/commonFunctions';
import EditConnectModal from '../EditConnectModal';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CloseIcon from '@mui/icons-material/Close';
import { DeleteModal } from 'components/Modals';
import { DeleteConnection } from 'Api/Api';
import toast from 'react-hot-toast';
import { listViewIcons } from 'constants/appConstant';

export const Detail = ({ item, refresh }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [openModal, setOpenModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [fullImagePreview, setFullImagePreview] = useState(null);

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

  const handleImagePreview = (imageType) => {
    setFullImagePreview(imageType === fullImagePreview ? null : imageType);
  };

  const handleDelete = async () => {
    try {
      const response = await DeleteConnection(item?.id);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        refresh();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    refresh();
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
        marginBottom={2}
      >
        <Typography fontSize={'18px'} fontWeight={600} color={'black'}>
          Connection Details
        </Typography>
        <Box sx={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
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
                  />
                </span>
              </Tooltip>
            ))}
        </Box>
      </Box>

      <EditConnectModal
        open={openModal}
        onClose={handleClose}
        itemId={item}
        refresh={refresh}
      />

      <DeleteModal
        open={deleteModalOpen}
        close={() => setDeleteModalOpen(false)}
        placeholder="Connection"
        deleteFunction={handleDelete}
        refresh={refresh}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InnerTextField
            label="Connection Name"
            value={item?.connectionName || ''}
            readOnly={true}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InnerTextField
            label="Connection URL"
            value={item?.connectionUrl || ''}
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
          <Typography variant="subtitle2">Connection Image</Typography>
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
          {item?.connectionImage ? (
            <>
              <img
                src={item?.connectionImage}
                alt="Connection Image"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <Tooltip title="View Full Image">
                <Button
                  onClick={() => handleImagePreview(item?.connectionImage)}
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
                fontWeight={500}
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
                fontWeight={500}
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

      {fullImagePreview && (
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
              boxShadow: 24,
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
                bgcolor: 'none'
              }}
            >
              <CloseIcon />
            </IconButton>

            <img
              src={fullImagePreview}
              alt="Full Connection Image"
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
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

export default Detail;
