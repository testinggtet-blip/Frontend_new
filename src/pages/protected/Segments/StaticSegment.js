import React from 'react';
import {
  Box,
  Button,
  Grid,
  Switch,
  Typography,
  TextField,
} from '@mui/material';
import { InnerTextField } from 'components/InputFields';
import { CustomSelect } from 'components/CustomSelect';
import { TotalSubscribers } from 'Api/Api';
import toast from 'react-hot-toast';
import {
  SegmentConditionArray,
  SegmentFieldsArray,
  ConditionsArray,
  SegmentMobileArray,
  SegmentBrowserArray,
  SegmentPlatformArray,
} from 'constants/appConstant';
import { trashIcon } from 'constants/appImages';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { LineConnector, StyledButton, StyledPaper } from './Style';

function StaticSegment({
  segmentData,
  setSegmentData,
  initialField,
  setLoading,
  loading,
  open,
  onClose,
  refresh,
}) {
  const handleToggle = (e) => {
    const name = e.target.name;
    if (name === 'status') {
      const newStatus =
        segmentData?.status === 'Active' ? 'Inactive' : 'Active';
      setSegmentData((prevState) => ({
        ...prevState,
        status: newStatus,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSegmentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    onClose();
    setSegmentData({
      segmentName: '',
      type: 'static',
      status: 'Active',
      subscriberCount: 0,
      conditions: [[{ ...initialField }]],
    });
  };

  const handleConditionChange = (
    parentIndex,
    e,
    isOr = false,
    orIndex = null
  ) => {
    const { name, value } = e.target;

    setSegmentData((prevSegmentData) => {
      let updatedConditions = [...prevSegmentData.conditions];
      const currentCondition = updatedConditions[parentIndex][orIndex || 0];

      if (name === 'main') {
        updatedConditions[parentIndex][orIndex || 0] = {
          ...currentCondition,
          main: value,
        };
      } else if (name === 'field') {
        const defaultCondition =
          value === 'createdTime' ? 'after' : SegmentConditionArray[0]?.value;
        let defaultValue = '';

        if (['mobile', 'browser', 'platform'].includes(value)) {
          if (value === 'mobile') defaultValue = 'true';
          else if (value === 'browser') defaultValue = 'chrome';
          else if (value === 'platform') defaultValue = 'windows';
        }

        updatedConditions[parentIndex][orIndex || 0] = {
          ...currentCondition,
          field: value,
          fieldCondition: defaultCondition,
          fieldValue: value === 'createdTime' ? [''] : defaultValue,
        };
      } else if (name === 'fieldCondition') {
        let fieldValue =
          currentCondition.field === 'createdTime'
            ? value === 'between'
              ? ['', '']
              : ['']
            : '';

        updatedConditions[parentIndex][orIndex || 0] = {
          ...currentCondition,
          fieldCondition: value,
          fieldValue,
        };
      } else if (name === 'fieldValue') {
        if (currentCondition.field === 'createdTime') {
          let updatedFieldValue = [...(currentCondition.fieldValue || [''])];
          if (currentCondition.fieldCondition === 'between') {
            updatedFieldValue[0] = value;
          } else {
            updatedFieldValue = [value];
          }
          updatedConditions[parentIndex][orIndex || 0] = {
            ...currentCondition,
            fieldValue: updatedFieldValue,
          };
        } else {
          updatedConditions[parentIndex][orIndex || 0] = {
            ...currentCondition,
            fieldValue: value,
          };
        }
      } else if (name === 'startDate') {
        if (currentCondition.field === 'createdTime') {
          let updatedFieldValue = [
            ...(currentCondition.fieldValue || ['', '']),
          ];
          updatedFieldValue[0] = value;
          updatedConditions[parentIndex][orIndex || 0] = {
            ...currentCondition,
            fieldValue: updatedFieldValue,
          };
        }
      } else if (name === 'endDate') {
        if (currentCondition.field === 'createdTime') {
          let updatedFieldValue = [
            ...(currentCondition.fieldValue || ['', '']),
          ];
          updatedFieldValue[1] = value;
          updatedConditions[parentIndex][orIndex || 0] = {
            ...currentCondition,
            fieldValue: updatedFieldValue,
          };
        }
      }

      return { ...prevSegmentData, conditions: updatedConditions };
    });
  };

  const handleToggleOperation = (
    index,
    newOperation,
    isOr = false,
    orIndex = null
  ) => {
    const updatedConditions = [...segmentData.conditions];

    if (newOperation === 'and') {
      const data = updatedConditions[index].slice(orIndex);
      updatedConditions[index].splice(orIndex);
      updatedConditions.splice(index + 1, 0, data);

      const cleanedConditions = updatedConditions.filter(
        (arr) => arr.length > 0
      );
      setSegmentData({ ...segmentData, conditions: cleanedConditions });
    } else if (newOperation === 'or') {
      const currentCondition = updatedConditions[index][0];
      updatedConditions[index - 1].push(currentCondition);

      if (updatedConditions[index].length === 0) {
        updatedConditions.splice(index, 1);
      } else {
        updatedConditions[index] = updatedConditions[index].slice(1);
      }
      const cleanedConditions = updatedConditions.filter(
        (arr) => arr.length > 0
      );
      setSegmentData({ ...segmentData, conditions: cleanedConditions });
    }
  };

  const removeCondition = (index) => {
    const updatedConditions = [...segmentData.conditions];

    if (updatedConditions.length > 1) {
      updatedConditions.splice(index, 1);
      setSegmentData({ ...segmentData, conditions: updatedConditions });
    }
  };

  const removeOrCondition = (index, orIndex) => {
    const updatedConditions = [...segmentData.conditions];
    updatedConditions[index].splice(orIndex, 1);
    if (updatedConditions[index].length === 0) {
      updatedConditions.splice(index, 1);
      if (updatedConditions.length === 0) {
        updatedConditions.push([{ ...initialField }]);
      }
    }
    setSegmentData({ ...segmentData, conditions: updatedConditions });
  };

  const addConditionToOr = (parentIndex) => {
    const updatedConditions = [...segmentData.conditions];
    updatedConditions[parentIndex].push({ ...initialField });
    setSegmentData({ ...segmentData, conditions: updatedConditions });
  };

  const handleCount = async () => {
    try {
      const response = await TotalSubscribers(segmentData);
      if (response?.data?.status === true) {
        const newCount = response?.data?.data;
        setSegmentData((prevState) => ({
          ...prevState,
          subscriberCount: parseInt(newCount),
        }));
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(response?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      {/* <SideDrawer
        open={open}
        onClose={onClose}
        title="Create Segment"
        handleSubmit={handleSubmit}
      > */}
      {segmentData?.conditions?.map((andGroup, index) => (
        <Box key={index} sx={{ marginTop: '10px' }}>
          {segmentData?.conditions?.length > 1 && index !== 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <StyledPaper elevation={0} sx={{ my: 2 }}>
                  <StyledButton
                    isAnd={true}
                    disableRipple
                    onClick={() => handleToggleOperation(index, 'and')}
                  >
                    AND
                  </StyledButton>
                  <StyledButton
                    isAnd={false}
                    disableRipple
                    onClick={() => handleToggleOperation(index, 'or')}
                  >
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
                      placeholder="Enter segment name"
                      onChange={handleChange}
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
                        <StyledButton
                          isAnd={false}
                          disableRipple
                          onClick={() =>
                            handleToggleOperation(index, 'and', true, orIndex)
                          }
                        >
                          AND
                        </StyledButton>
                        <StyledButton
                          isAnd={true}
                          disableRipple
                          onClick={() =>
                            handleToggleOperation(index, 'or', true, orIndex)
                          }
                        >
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
                      <Grid item xs={11}>
                        <CustomSelect
                          label="Conditions"
                          name="main"
                          margin="dense"
                          options={ConditionsArray}
                          value={cond?.main || ''}
                          onChange={(e) =>
                            handleConditionChange(index, e, false, orIndex)
                          }
                        />
                      </Grid>
                      {!(index === 0 && orIndex === 0) && (
                        <Grid
                          item
                          xs={1}
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <img
                            src={trashIcon}
                            alt="deleteIcon"
                            width={23}
                            height={23}
                            style={{ cursor: 'pointer' }}
                            onClick={() => removeOrCondition(index, orIndex)}
                          />
                        </Grid>
                      )}
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
                            <CustomSelect
                              label="Field"
                              name="field"
                              margin="dense"
                              fullWidth
                              options={SegmentFieldsArray}
                              value={cond?.field || ''}
                              onChange={(e) =>
                                handleConditionChange(index, e, false, orIndex)
                              }
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
                            <CustomSelect
                              label="Condition"
                              name="fieldCondition"
                              margin="dense"
                              fullWidth
                              options={
                                cond?.field === 'createdTime'
                                  ? [
                                      { name: 'Equal', value: 'equal' },
                                      { name: 'Not Equal', value: 'not equal' },
                                      { name: 'After', value: 'after' },
                                      { name: 'Before', value: 'before' },
                                      { name: 'Between', value: 'between' },
                                    ]
                                  : cond?.field === 'browser'
                                  ? [
                                      { name: 'Equal', value: 'equal' },
                                      { name: 'Not Equal', value: 'not equal' },
                                      { name: 'Other', value: 'other' },
                                    ]
                                  : SegmentConditionArray
                              }
                              value={cond?.fieldCondition || ''}
                              onChange={(e) =>
                                handleConditionChange(index, e, false, orIndex)
                              }
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
                          <Grid
                            item
                            xs={
                              cond?.field === 'createdTime' &&
                              cond?.fieldCondition === 'between'
                                ? 10
                                : 5
                            }
                          >
                            {['mobile', 'browser', 'platform'].includes(
                              cond?.field
                            ) ? (
                              cond?.field === 'browser' &&
                              cond?.fieldCondition === 'other' ? (
                                <InnerTextField
                                  fullWidth
                                  margin="none"
                                  label="Value"
                                  name="fieldValue"
                                  value={cond?.fieldValue || ''}
                                  onChange={(e) =>
                                    handleConditionChange(
                                      index,
                                      e,
                                      false,
                                      orIndex
                                    )
                                  }
                                />
                              ) : (
                                <CustomSelect
                                  label="Value"
                                  name="fieldValue"
                                  margin="none"
                                  fullWidth
                                  options={
                                    cond?.field === 'mobile'
                                      ? SegmentMobileArray
                                      : cond?.field === 'browser'
                                      ? SegmentBrowserArray
                                      : cond?.field === 'platform'
                                      ? SegmentPlatformArray
                                      : []
                                  }
                                  value={cond?.fieldValue || ''}
                                  onChange={(e) =>
                                    handleConditionChange(
                                      index,
                                      e,
                                      false,
                                      orIndex
                                    )
                                  }
                                />
                              )
                            ) : cond?.field === 'createdTime' ? (
                              cond?.fieldCondition === 'between' ? (
                                <Grid
                                  container
                                  spacing={2}
                                  sx={{ width: '100%' }}
                                >
                                  <Grid item xs={6}>
                                    <TextField
                                      fullWidth
                                      margin="none"
                                      label="Start Date"
                                      type="date"
                                      name="startDate"
                                      value={cond?.fieldValue?.[0] || ''}
                                      onChange={(e) =>
                                        handleConditionChange(
                                          index,
                                          e,
                                          false,
                                          orIndex
                                        )
                                      }
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={6}>
                                    <TextField
                                      fullWidth
                                      margin="none"
                                      label="End Date"
                                      type="date"
                                      name="endDate"
                                      value={cond?.fieldValue?.[1] || ''}
                                      onChange={(e) =>
                                        handleConditionChange(
                                          index,
                                          e,
                                          false,
                                          orIndex
                                        )
                                      }
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              ) : (
                                <TextField
                                  fullWidth
                                  margin="none"
                                  label="Value"
                                  type="date"
                                  name="fieldValue"
                                  value={cond?.fieldValue || ''}
                                  onChange={(e) =>
                                    handleConditionChange(
                                      index,
                                      e,
                                      false,
                                      orIndex
                                    )
                                  }
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                              )
                            ) : (
                              <InnerTextField
                                fullWidth
                                margin="none"
                                label="Value"
                                name="fieldValue"
                                value={cond?.fieldValue || ''}
                                onChange={(e) =>
                                  handleConditionChange(
                                    index,
                                    e,
                                    false,
                                    orIndex
                                  )
                                }
                              />
                            )}
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
                      onClick={() => addConditionToOr(index)}
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

      <Box my={1}>
        <Typography variant="black_4">Status</Typography>
        <Switch
          name="status"
          size="large"
          checked={segmentData?.status === 'Active'}
          onChange={handleToggle}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        mb={4}
      >
        <Typography variant="black_h4">
          Total numbers of Subscribers : {segmentData?.subscriberCount}
        </Typography>
        <Button variant="outlined" onClick={handleCount}>
          Apply
        </Button>
      </Box>
      {/* </SideDrawer> */}
    </>
  );
}

export default StaticSegment;
