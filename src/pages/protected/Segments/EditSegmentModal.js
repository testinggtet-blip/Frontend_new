import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Switch,
  Typography,
  TextField
} from '@mui/material';
import { CustomSelect } from 'components/CustomSelect';
import DeleteIcon from '@mui/icons-material/Delete';
import { TotalSubscribers, UpdateSegment } from 'Api/Api';
import toast from 'react-hot-toast';
import { SideDrawer } from 'components/SideDrawer';
import { Loading } from 'components/Loading/Loading';
import {
  SegmentConditionArray,
  SegmentFieldsArray,
  ConditionsArray
} from 'constants/appConstant';
import { formatDateTime } from 'utils/commonFunctions';
import { InnerTextField } from 'components/InputFields';
import { LineConnector, StyledButton, StyledPaper } from './Style';
import { trashIcon } from 'constants/appImages';
import AddBoxIcon from '@mui/icons-material/AddBox';


const EditSegmentModal = ({ open, onClose, itemId, isDetail, refresh }) => {
  const initialField = { 
    main: '', 
    field: '', 
    fieldCondition: '', 
    fieldValue: '' 
  };

  const parseConditions = (conditions) => {
    try {
      if (typeof conditions === "string") {
        // Parse once
        let parsed = JSON.parse(conditions);
        // Check if it's still a string (i.e., double-stringified) and parse again
        if (typeof parsed === "string") {
          parsed = JSON.parse(parsed);
        }
        // Ensure the structure is correct
        if (Array.isArray(parsed)) {
          return parsed.map(group => 
            Array.isArray(group) ? group : [group]
          );
        }
        return [[]]; // Return array with one empty group if invalid
      }
      return conditions; // Already an object/array
    } catch (error) {
      console.error("Error parsing conditions:", error);
      return [[]]; // Return array with one empty group if parsing fails
    }
  };


  const [segmentData, setSegmentData] = useState(() => {
    return itemId ? { ...itemId, conditions: parseConditions(itemId.conditions) } : {};
  });


  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);



  const handleEditChange = () => {
    setEdit(!edit);
  };




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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {}; // Validate form data if needed

    if (Object.keys(errors).length > 0) {
      toast.error('All fields are required.');
      return;
    }

    try {
      setLoading(true);
      const updatedSegmentData = {
        ...segmentData,
        conditions: Array.isArray(segmentData.conditions) ? segmentData.conditions : JSON.parse(segmentData.conditions),
      };

      const response = await UpdateSegment(segmentData.id, updatedSegmentData);
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        refresh();
        onClose();
      } else {
        toast.error(response?.data?.message || 'Failed to update segment.');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (itemId) {
      setSegmentData({
        ...itemId,
        conditions: parseConditions(itemId.conditions),
      });
    }
  }, [itemId,open]);


  const handleConditionChange = (parentIndex, e, isOr = false, orIndex = null) => {
    const { name, value } = e.target;

    setSegmentData((prevSegmentData) => {
      let updatedConditions = [...prevSegmentData.conditions];

      // Get the current condition object
      const currentCondition = updatedConditions[parentIndex][orIndex || 0];

      if (name === "main") {
        // When main condition changes, reset other fields
        updatedConditions[parentIndex][orIndex || 0] = {
          main: value,
          field: '',
          fieldCondition: '',
          fieldValue: ''
        };
      } else if (name === "field") {
        // Set default condition and value based on field
        const defaultCondition = value === 'createdTime' ? 'After' : SegmentConditionArray[0]?.value;
        let defaultValue = '';
        
        if (['mobile', 'browser', 'platform'].includes(value)) {
          if (value === 'mobile') defaultValue = true;
          else if (value === 'browser') defaultValue = 'chrome';
          else if (value === 'platform') defaultValue = 'windows';
        }
        
        updatedConditions[parentIndex][orIndex || 0] = {
          ...currentCondition,
          field: value,
          fieldCondition: defaultCondition,
          fieldValue: defaultValue
        };
      } else if (name === "fieldCondition") {
        updatedConditions[parentIndex][orIndex || 0] = {
          ...currentCondition,
          fieldCondition: value
        };
      } else if (name === "fieldValue") {
        updatedConditions[parentIndex][orIndex || 0] = {
          ...currentCondition,
          fieldValue: value
        };
      }

      return { ...prevSegmentData, conditions: updatedConditions };
    });
  };

  const handleToggleOperation = (index, newOperation, isOr = false, orIndex = null) => {
    const updatedConditions = [...segmentData.conditions];

    if (newOperation === 'and') {
      // Extract data from current array starting at orIndex
      const data = updatedConditions[index].slice(orIndex);

      // Remove items from the current array starting at orIndex
      updatedConditions[index].splice(orIndex);

      // Create new array with the extracted data
      updatedConditions.splice(index + 1, 0, data);

      // Clean up empty arrays
      const cleanedConditions = updatedConditions.filter(arr => arr.length > 0);
      setSegmentData({ ...segmentData, conditions: cleanedConditions });
    } else if (newOperation === 'or') {
      // Move the current condition to the end of the previous array
      const currentCondition = updatedConditions[index][0];
      updatedConditions[index - 1].push(currentCondition);
      
      // Remove the current array if it's empty
      if (updatedConditions[index].length === 0) {
        updatedConditions.splice(index, 1);
      } else {
        // Keep the remaining conditions in the current array
        updatedConditions[index] = updatedConditions[index].slice(1);
      }

      // Clean up empty arrays
      const cleanedConditions = updatedConditions.filter(arr => arr.length > 0);
      setSegmentData({ ...segmentData, conditions: cleanedConditions });
    }
  };

  const removeOrCondition = (index, orIndex) => {
    const updatedConditions = [...segmentData.conditions];

    updatedConditions[index].splice(orIndex, 1);
    
    // If the array is empty after removal, remove the entire array
    if (updatedConditions[index].length === 0) {
      updatedConditions.splice(index, 1);
      
      // If all conditions are deleted, add one initial field
      if (updatedConditions.length === 0) {
        updatedConditions.push([{ ...initialField }]);
      }
    }

    setSegmentData({ ...segmentData, conditions: updatedConditions });
  };

  const addConditionToOr = (parentIndex) => {
    const updatedConditions = [...segmentData.conditions];
    
    // Add new condition to the current array
    updatedConditions[parentIndex].push({ ...initialField });
    
    setSegmentData({ ...segmentData, conditions: updatedConditions });
  };

  return (
    <>
      <Loading state={loading} />
      <SideDrawer
        open={open}
        onClose={onClose}
        isDetail={isDetail}
        edit={edit}
        setEdit={handleEditChange}
        title={!edit && isDetail ? 'Segment Details' : 'Edit Segment'}
        handleSubmit={handleSubmit}
      >
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

              {andGroup?.map((cond, orIndex) => {

                return (
                  <Box key={orIndex}>
                    {orIndex > 0 && (
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <StyledPaper elevation={0} sx={{ my: 2 }}>
                          <StyledButton
                            isAnd={false}
                            disableRipple
                            onClick={() => handleToggleOperation(index, 'and', true, orIndex)}
                          >
                            AND
                          </StyledButton>
                          <StyledButton
                            isAnd={true}
                            disableRipple
                            onClick={() => handleToggleOperation(index, 'or', true, orIndex)}
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
                            onChange={(e) => handleConditionChange(index, e, false, orIndex)}
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
                                onChange={(e) => handleConditionChange(index, e, false, orIndex)}
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
                                      { name: 'After', value: 'After' },
                                      { name: 'Before', value: 'Before' }
                                    ]
                                    : SegmentConditionArray
                                }
                                value={cond?.fieldCondition || ''}
                                onChange={(e) => handleConditionChange(index, e, false, orIndex)}
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
                              {['mobile', 'browser', 'platform'].includes(cond?.field) ? (
                                <CustomSelect
                                  label="Value"
                                  name="fieldValue"
                                  margin="none"
                                  fullWidth
                                  options={
                                    cond?.field === 'mobile'
                                      ? [
                                        { name: 'true', value: true },
                                        { name: 'false', value: "false" }
                                      ]
                                      : cond?.field === 'browser'
                                        ? [
                                          { name: 'Chrome', value: 'chrome' },
                                          { name: 'Firefox', value: 'firefox' },
                                          { name: 'Safari', value: 'safari' },
                                          { name: 'Edge', value: 'edge' },
                                          { name: 'Opera', value: 'opera' },
                                          { name: 'Internet Explorer', value: 'internet_explorer' }
                                        ]
                                        : cond?.field === 'platform'
                                          ? [
                                            { name: 'Windows', value: 'windows' },
                                            { name: 'macOS', value: 'macos' },
                                            { name: 'Linux', value: 'linux' },
                                            { name: 'Chrome OS', value: 'chromeos' },
                                            { name: 'iPadOS', value: 'ipados' },
                                            { name: 'Android', value: 'android' },
                                            { name: 'iOS', value: 'ios' }
                                          ]
                                          : []
                                  }
                                  value={cond?.fieldValue || ''}
                                  onChange={(e) => handleConditionChange(index, e, false, orIndex)}
                                />
                              ) : cond?.field === 'visited_url' ? (
                                <InnerTextField
                                  fullWidth
                                  margin="none"
                                  label="Value"
                                  name="fieldValue"
                                  value={cond?.fieldValue || ''}
                                  onChange={(e) => handleConditionChange(index, e, false, orIndex)}
                                />
                              ) : cond?.field === 'createdTime' ? (
                                <TextField
                                  fullWidth
                                  margin="none"
                                  label="Value"
                                  type="date"
                                  name="fieldValue"
                                  value={cond?.fieldValue || ''}
                                  onChange={(e) => handleConditionChange(index, e, false, orIndex)}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                              ) : (
                                <InnerTextField
                                  fullWidth
                                  margin="none"
                                  label="Value"
                                  name="fieldValue"
                                  value={cond?.fieldValue || ''}
                                  onChange={(e) => handleConditionChange(index, e, false, orIndex)}
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
              )
              })}
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
        <Box>
          {isDetail && !edit ? (
            <Box>
              <Typography variant="subtitle2" my={1}>
                Created time : {formatDateTime(segmentData?.createdTime)}
              </Typography>
              <Typography variant="subtitle2" my={1}>
                Modified time : {formatDateTime(segmentData?.modifiedTime)}
              </Typography>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </SideDrawer>
    </>
  );
};

export default EditSegmentModal;
