import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Switch, Typography, Tooltip } from '@mui/material';
import { ConditionsArray, listViewIcons } from 'constants/appConstant';
import { formatDateTime } from 'utils/commonFunctions';
import { InnerTextField } from 'components/InputFields';
import { LineConnector, StyledButton, StyledPaper } from '../Style';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditSegmentModal from '../EditSegmentModal';
import { CustomSelect } from 'components/CustomSelect';
import { DeleteModal } from 'components/Modals';
import { DeleteSegment } from 'Api/Api';
import toast from 'react-hot-toast';
import theme from 'styles/app.theme';

const Details = ({ onClose, itemId, refresh }) => {
  const [loading, setLoading] = useState(false);
  const [segmentData, setSegmentData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const parseConditions = (conditions) => {
    try {
      if (typeof conditions === 'string') {
        let parsed = JSON.parse(conditions);
        if (typeof parsed === 'string') {
          parsed = JSON.parse(parsed);
        }
        if (Array.isArray(parsed)) {
          return parsed.map((group) =>
            Array.isArray(group) ? group : [group]
          );
        }
        return [[]];
      }
      return conditions;
    } catch (error) {
      console.error('Error parsing conditions:', error);
      return [[]];
    }
  };

  useEffect(() => {
    if (itemId) {
      setSegmentData({
        ...itemId,
        conditions: parseConditions(itemId.conditions),
      });
    }
  }, [itemId]);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleClickTooltip = (title) => {
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
      const response = await DeleteSegment(segmentData?.id);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        refresh();
        onClose();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (refresh) {
      refresh();
    }
  }, []);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <Typography fontSize={'18px'} fontWeight={600} color={'black'}>
          Segment Details
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
                    onClick={() => handleClickTooltip(data.title)}
                    alt={`${data.title} icon`}
                  />
                </span>
              </Tooltip>
            ))}
        </Box>
      </Box>

      {segmentData?.conditions?.map((andGroup, index) => (
        <Box key={index} sx={{ marginTop: '10px' }}>
          {segmentData?.conditions?.length > 1 && index !== 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <StyledPaper elevation={0} sx={{ my: 2 }}>
                  <StyledButton isAnd={true}>AND</StyledButton>
                  <StyledButton isAnd={false}>OR</StyledButton>
                </StyledPaper>
              </Box>
            </Box>
          )}

          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'white',
            }}
          >
            {index === 0 && (
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12}>
                  <Box>
                    <InnerTextField
                      required
                      name="segmentName"
                      label="Segment Name"
                      fullWidth
                      margin="normal"
                      value={segmentData.segmentName}
                      sx={{ marginBottom: 0, paddingBottom: 0 }}
                    />
                  </Box>
                </Grid>
              </Grid>
            )}

            {andGroup?.map((cond, orIndex) => (
              <Box key={orIndex}>
                {orIndex > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <StyledPaper elevation={0} sx={{ my: 2 }}>
                        <StyledButton isAnd={false} disableRipple>
                          AND
                        </StyledButton>
                        <StyledButton isAnd={true} disableRipple>
                          OR
                        </StyledButton>
                      </StyledPaper>
                    </Box>
                  </Box>
                )}

                <Box
                  sx={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'white',
                  }}
                >
                  <Grid container>
                    <Grid container spacing={2} my={1}>
                      <Grid item xs={12}>
                        <CustomSelect
                          label="Conditions"
                          name="main"
                          margin="dense"
                          options={ConditionsArray}
                          value={cond?.main || ''}
                        />
                      </Grid>
                    </Grid>
                    {cond?.main === 'properties' && (
                      <>
                        <Grid
                          container
                          sx={{ position: 'relative' }}
                          spacing={2}
                          my={1}
                        >
                          <LineConnector left="10%" top="-22%" />
                          <Grid item xs={5}>
                            <InnerTextField
                              label="Field"
                              name="field"
                              margin="dense"
                              fullWidth
                              value={cond?.field || ''}
                            />
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          sx={{ position: 'relative' }}
                          spacing={2}
                          my={1}
                        >
                          <LineConnector left="10%" top="-50%" />
                          <Grid item xs={5}>
                            <InnerTextField
                              label="Condition"
                              name="fieldCondition"
                              margin="dense"
                              fullWidth
                              value={cond?.fieldCondition || ''}
                            />
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          sx={{ position: 'relative' }}
                          spacing={2}
                          my={1}
                        >
                          <LineConnector left="10%" top="-50%" height="108%" />
                          <Grid item xs={5}>
                            <InnerTextField
                              fullWidth
                              margin="none"
                              label="Value"
                              name="fieldValue"
                              value={cond?.fieldValue || ''}
                            />
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Grid>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mt: 2,
                      mb: 1,
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        border: '1px solid #036355',
                        textTransform: 'none',
                        color: '#036355',
                      }}
                      endIcon={<AddBoxIcon />}
                    >
                      Add Condition
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ))}

      <Box marginTop={2}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={2}>
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
                {segmentData?.status || 'Not specified'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3.7}>
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
                {formatDateTime(segmentData?.createdTime) || 'Not available'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3.7}>
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
                {formatDateTime(segmentData?.modifiedTime) || 'Not modified'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2.6}>
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
                Subscriber
              </Typography>
              <Typography variant="body2">
                {segmentData?.subscriberCount}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <EditSegmentModal
        open={openModal}
        onClose={handleClose}
        itemId={segmentData}
        refresh={refresh}
      />

      <DeleteModal
        open={deleteModalOpen}
        close={() => setDeleteModalOpen(false)}
        placeholder="Segment"
        deleteFunction={handleDelete}
        refresh={refresh}
      />
    </>
  );
};

export default Details;
