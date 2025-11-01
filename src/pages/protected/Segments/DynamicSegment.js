import React from 'react';

const DynamicSegment = () => {
  // const TabContentFirst = ({ tabValue, index, insideIndex }) => {
  //   const isInside = insideIndex != null;

  //   const handleSelectChange = (e) => {
  //     handleConditionChange(index, e, isInside, insideIndex);
  //   };

  //   const getConditionValue = (key) => {
  //     const condition = segmentData?.conditions?.[index];
  //     return isInside
  //       ? condition?.Or?.[insideIndex]?.[key] ?? ''
  //       : condition?.[key] ?? '';
  //   };

  //   switch (tabValue || '') {
  //     case 'Equals':
  //     case 'Does_not_equal':
  //     case 'Is_at_least':
  //     case 'Is_greater_than':
  //     case 'Is_less_than':
  //     case 'Is_at_most':
  //       return (
  //         <Grid item xs={4}>
  //           <CustomSelect
  //             label="Action"
  //             name="action"
  //             margin="dense"
  //             fullWidth
  //             options={ActionArray}
  //             value={getConditionValue('action') || ''}
  //             onChange={handleSelectChange}
  //           />
  //         </Grid>
  //       );

  //     case 'At_least_once':
  //     case 'Zero_times':
  //       return <></>;

  //     default:
  //       return <></>;
  //   }
  // };

  // const handleConditionChange = (
  //   parentIndex,
  //   e,
  //   isOr = false,
  //   orIndex = null
  // ) => {
  //   const { name, value } = e.target;

  //   setSegmentData((prevSegmentData) => {
  //     let updatedConditions = [...prevSegmentData.conditions];

  //     // Mapping of conditions to keys that should be removed
  //     const removeKeysMap = {
  //       In_the_last: [
  //         'date',
  //         'beforeValue',
  //         'afterValue',
  //         'beforeDate',
  //         'afterDate',
  //       ],
  //       At_least: [
  //         'date',
  //         'beforeValue',
  //         'afterValue',
  //         'beforeDate',
  //         'afterDate',
  //       ],
  //       Before: [
  //         'days',
  //         'conditionValue',
  //         'beforeValue',
  //         'afterValue',
  //         'beforeDate',
  //         'afterDate',
  //       ],
  //       After: [
  //         'days',
  //         'conditionValue',
  //         'beforeValue',
  //         'afterValue',
  //         'beforeDate',
  //         'afterDate',
  //       ],
  //       Between: ['date', 'beforeDate', 'afterDate', 'days', 'conditionValue'],
  //       Between_dates: [
  //         'days',
  //         'conditionValue',
  //         'beforeValue',
  //         'afterValue',
  //         'date',
  //       ],
  //       Over_all_time: [
  //         'days',
  //         'conditionValue',
  //         'beforeValue',
  //         'afterValue',
  //         'date',
  //         'beforeDate',
  //         'afterDate',
  //       ],
  //     };

  //     // Conditions where we need to remove "actionValue"
  //     const removeActionKeys = ['Zero_times', 'At_least_once'];

  //     // Get the current condition object
  //     const currentCondition = updatedConditions[parentIndex][orIndex || 0];

  //     if (name === 'main') {
  //       // Update only the main field while preserving other fields
  //       updatedConditions[parentIndex][orIndex || 0] = {
  //         ...currentCondition,
  //         main: value,
  //       };
  //     } else if (name === 'field') {
  //       // Set default condition and value based on field
  //       const defaultCondition =
  //         value === 'createdTime' ? 'After' : SegmentConditionArray[0]?.value;
  //       let defaultValue = '';

  //       if (['mobile', 'browser', 'platform'].includes(value)) {
  //         if (value === 'mobile') defaultValue = 'true';
  //         else if (value === 'browser') defaultValue = 'chrome';
  //         else if (value === 'platform') defaultValue = 'windows';
  //       }

  //       updatedConditions[parentIndex][orIndex || 0] = {
  //         ...currentCondition,
  //         field: value,
  //         fieldCondition: defaultCondition,
  //         fieldValue: defaultValue,
  //       };
  //     } else if (name === 'fieldCondition') {
  //       updatedConditions[parentIndex][orIndex || 0] = {
  //         ...currentCondition,
  //         fieldCondition: value,
  //       };
  //     } else if (name === 'fieldValue') {
  //       updatedConditions[parentIndex][orIndex || 0] = {
  //         ...currentCondition,
  //         fieldValue: value,
  //       };
  //     } else if (name === 'action') {
  //       updatedConditions[parentIndex][orIndex || 0] = {
  //         ...currentCondition,
  //         action: value,
  //       };
  //     } else if (name === 'condition') {
  //       updatedConditions[parentIndex][orIndex || 0] = {
  //         ...currentCondition,
  //         condition: value,
  //       };
  //     } else if (name === 'actionValue') {
  //       updatedConditions[parentIndex][orIndex || 0] = {
  //         ...currentCondition,
  //         actionValue: value,
  //       };
  //     } else if (name === 'conditionValue') {
  //       updatedConditions[parentIndex][orIndex || 0] = {
  //         ...currentCondition,
  //         conditionValue: value,
  //       };
  //     } else if (name === 'days') {
  //       updatedConditions[parentIndex][orIndex || 0] = {
  //         ...currentCondition,
  //         days: value,
  //       };
  //     } else if (name === 'date') {
  //       updatedConditions[parentIndex][orIndex || 0] = {
  //         ...currentCondition,
  //         date: value,
  //       };
  //     } else if (name === 'beforeValue') {
  //       updatedConditions[parentIndex][orIndex || 0] = {
  //         ...currentCondition,
  //         beforeValue: value,
  //       };
  //     } else if (name === 'afterValue') {
  //       updatedConditions[parentIndex][orIndex || 0] = {
  //         ...currentCondition,
  //         afterValue: value,
  //       };
  //     } else if (name === 'beforeDate') {
  //       updatedConditions[parentIndex][orIndex || 0] = {
  //         ...currentCondition,
  //         beforeDate: value,
  //       };
  //     } else if (name === 'afterDate') {
  //       updatedConditions[parentIndex][orIndex || 0] = {
  //         ...currentCondition,
  //         afterDate: value,
  //       };
  //     } else {
  //       // For any other field, update it directly
  //       updatedConditions[parentIndex][orIndex || 0] = {
  //         ...currentCondition,
  //         [name]: value,
  //       };
  //     }

  //     // Remove unwanted keys based on condition
  //     const condition = updatedConditions[parentIndex][orIndex || 0]?.condition;
  //     if (condition && removeKeysMap[condition]) {
  //       removeKeysMap[condition].forEach((key) => {
  //         delete updatedConditions[parentIndex][orIndex || 0][key];
  //       });
  //     }

  //     // Remove actionValue if action is "Zero_times" or "At_least_once"
  //     const action = updatedConditions[parentIndex][orIndex || 0]?.action;
  //     if (action && removeActionKeys.includes(action)) {
  //       delete updatedConditions[parentIndex][orIndex || 0].actionValue;
  //     }

  //     return { ...prevSegmentData, conditions: updatedConditions };
  //   });
  // };

  // const handleToggleOperation = (
  //   index,
  //   newOperation,
  //   isOr = false,
  //   orIndex = null
  // ) => {
  //   const updatedConditions = [...segmentData.conditions];

  //   if (newOperation === 'and') {
  //     // Extract data from current array starting at orIndex
  //     const data = updatedConditions[index].slice(orIndex);

  //     // Remove items from the current array starting at orIndex
  //     updatedConditions[index].splice(orIndex);

  //     // Create new array with the extracted data
  //     updatedConditions.splice(index + 1, 0, data);

  //     // Clean up empty arrays
  //     const cleanedConditions = updatedConditions.filter(
  //       (arr) => arr.length > 0
  //     );
  //     setSegmentData({ ...segmentData, conditions: cleanedConditions });
  //   } else if (newOperation === 'or') {
  //     // Move the current condition to the end of the previous array
  //     const currentCondition = updatedConditions[index][0];
  //     updatedConditions[index - 1].push(currentCondition);

  //     // Remove the current array if it's empty
  //     if (updatedConditions[index].length === 0) {
  //       updatedConditions.splice(index, 1);
  //     } else {
  //       // Keep the remaining conditions in the current array
  //       updatedConditions[index] = updatedConditions[index].slice(1);
  //     }

  //     // Clean up empty arrays
  //     const cleanedConditions = updatedConditions.filter(
  //       (arr) => arr.length > 0
  //     );
  //     setSegmentData({ ...segmentData, conditions: cleanedConditions });
  //   }
  // };

  return (
    <>
      <h1>Dynamic Segment</h1>
      <div>
        {/* {cond?.main === 'What_someone_has_done' && (
          <>
            <Grid container sx={{ position: 'relative' }} spacing={2} my={1}>
              <LineConnector left="10%" top="-22%" />
              <Grid item xs={5}>
                <CustomSelect
                  label="Person has"
                  name="person_has"
                  margin="dense"
                  fullWidth
                  options={PersonHasArray}
                  value={cond?.person_has || ''}
                  onChange={(e) => handleConditionChange(index, e)}
                />
              </Grid>
              <TabContentFirst tabValue={cond?.action} index={index} />
            </Grid>

            <Grid container sx={{ position: 'relative' }} spacing={2} my={1}>
              <LineConnector left="10%" top="-50%" />
              {(() => {
                switch (cond?.action) {
                  case 'Equals':
                  case 'Does_not_equal':
                  case 'Is_at_least':
                  case 'Is_greater_than':
                  case 'Is_less_than':
                  case 'Is_at_most':
                    return (
                      <>
                        <Grid item xs={5}>
                          <InnerTextField
                            fullWidth
                            margin="none"
                            label="Value"
                            name="actionValue"
                            value={cond?.actionValue || ''}
                            onChange={(e) => handleConditionChange(index, e)}
                          />
                        </Grid>
                        {cond?.condition !== 'Over_all_time' && (
                          <Grid item xs={4}>
                            <CustomSelect
                              label="Condition"
                              name="condition"
                              margin="dense"
                              fullWidth
                              options={TimePeriodArray}
                              value={cond?.condition || ''}
                              onChange={(e) => handleConditionChange(index, e)}
                            />
                          </Grid>
                        )}
                      </>
                    );
                  case 'At_least_once':
                  case 'Zero_times':
                    return (
                      <>
                        <Grid item xs={5}>
                          <CustomSelect
                            label="Action"
                            name="action"
                            margin="dense"
                            fullWidth
                            options={ActionArray}
                            value={cond?.action || ''}
                            onChange={(e) => handleConditionChange(index, e)}
                          />
                        </Grid>
                        {['Between', 'Between_dates'].includes(
                          cond?.condition
                        ) && (
                          <Grid item xs={4}>
                            <CustomSelect
                              label="Condition"
                              name="condition"
                              margin="dense"
                              fullWidth
                              options={TimePeriodArray}
                              value={cond?.condition || ''}
                              onChange={(e) => handleConditionChange(index, e)}
                            />
                          </Grid>
                        )}
                      </>
                    );
                  default:
                    return (
                      <>
                        <Grid item xs={5}>
                          <CustomSelect
                            label="Action"
                            name="action"
                            margin="dense"
                            fullWidth
                            options={ActionArray}
                            value={cond?.action || ''}
                            onChange={(e) => handleConditionChange(index, e)}
                          />
                        </Grid>
                      </>
                    );
                }
              })()}
            </Grid>

            <Grid container sx={{ position: 'relative' }} spacing={2} my={1}>
              <LineConnector left="10%" top="-50%" height="108%" />
              {(() => {
                switch (cond?.condition) {
                  case 'In_the_last':
                  case 'At_least':
                    return (
                      <>
                        {['At_least_once', 'Zero_times'].includes(
                          cond?.action
                        ) ? (
                          <>
                            <Grid item xs={5}>
                              <CustomSelect
                                label="Condition"
                                name="condition"
                                margin="dense"
                                fullWidth
                                options={TimePeriodArray}
                                value={cond?.condition || ''}
                                onChange={(e) =>
                                  handleConditionChange(index, e)
                                }
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <InnerTextField
                                fullWidth
                                margin="none"
                                label="Value"
                                name="conditionValue"
                                value={cond?.conditionValue || ''}
                                onChange={(e) =>
                                  handleConditionChange(index, e)
                                }
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <CustomSelect
                                label="Days"
                                name="days"
                                margin="dense"
                                fullWidth
                                options={CalenderArray}
                                value={cond?.days || ''}
                                onChange={(e) =>
                                  handleConditionChange(index, e)
                                }
                              />
                            </Grid>
                          </>
                        ) : (
                          <>
                            <Grid item xs={5}>
                              <InnerTextField
                                fullWidth
                                margin="none"
                                label="Value"
                                name="conditionValue"
                                value={cond?.conditionValue || ''}
                                onChange={(e) =>
                                  handleConditionChange(index, e)
                                }
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <CustomSelect
                                label="Days"
                                name="days"
                                margin="dense"
                                fullWidth
                                options={CalenderArray}
                                value={cond?.days || ''}
                                onChange={(e) =>
                                  handleConditionChange(index, e)
                                }
                              />
                            </Grid>
                          </>
                        )}
                      </>
                    );
                  case 'After':
                  case 'Before':
                    return (
                      <>
                        {['At_least_once', 'Zero_times'].includes(
                          cond?.action
                        ) ? (
                          <>
                            <Grid item xs={5}>
                              <CustomSelect
                                label="Condition"
                                name="condition"
                                margin="dense"
                                fullWidth
                                options={TimePeriodArray}
                                value={cond?.condition || ''}
                                onChange={(e) =>
                                  handleConditionChange(index, e)
                                }
                              />
                            </Grid>
                            <Grid item xs={5}>
                              <DateTimepicker
                                name="date"
                                value={cond?.date || ''}
                                dateSegment={true}
                                onChangeval={(e) =>
                                  handleConditionChange(index, e)
                                }
                              />
                            </Grid>
                          </>
                        ) : (
                          <>
                            <Grid item xs={5}>
                              <DateTimepicker
                                name="date"
                                value={cond?.date || ''}
                                dateSegment={true}
                                onChangeval={(e) =>
                                  handleConditionChange(index, e)
                                }
                              />
                            </Grid>
                          </>
                        )}
                      </>
                    );
                  case 'Between':
                    return (
                      <>
                        <Grid item xs={2.5}>
                          <InnerTextField
                            fullWidth
                            margin="none"
                            label="Value"
                            name="beforeValue"
                            value={cond?.beforeValue || ''}
                            onChange={(e) => handleConditionChange(index, e)}
                          />
                        </Grid>
                        <Grid item xs={2.5}>
                          <InnerTextField
                            fullWidth
                            margin="none"
                            label="Value"
                            name="afterValue"
                            value={cond?.afterValue || ''}
                            onChange={(e) => handleConditionChange(index, e)}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <CustomSelect
                            label="Days"
                            name="days"
                            margin="dense"
                            fullWidth
                            options={CalenderArray}
                            value={cond?.days || ''}
                            onChange={(e) => handleConditionChange(index, e)}
                          />
                        </Grid>
                      </>
                    );
                  case 'Between_dates':
                    return (
                      <>
                        <Grid item xs={5}>
                          <DateTimepicker
                            dateSegment={true}
                            name="beforeDate"
                            value={cond?.beforeDate || ''}
                            onChangeval={(e) => handleConditionChange(index, e)}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <DateTimepicker
                            name="afterDate"
                            value={cond?.afterDate || ''}
                            dateSegment={true}
                            onChangeval={(e) => handleConditionChange(index, e)}
                          />
                        </Grid>
                      </>
                    );
                  case 'Over_all_time':
                    return (
                      <Grid item xs={5}>
                        <CustomSelect
                          label="Condition"
                          name="condition"
                          margin="dense"
                          fullWidth
                          options={TimePeriodArray}
                          value={cond?.condition || ''}
                          onChange={(e) => handleConditionChange(index, e)}
                        />
                      </Grid>
                    );
                  default:
                    return (
                      <>
                        <Grid item xs={5}>
                          <CustomSelect
                            label="Condition"
                            name="condition"
                            margin="dense"
                            fullWidth
                            options={TimePeriodArray}
                            value={cond?.condition || ''}
                            onChange={(e) => handleConditionChange(index, e)}
                          />
                        </Grid>
                      </>
                    );
                }
              })()}
            </Grid>
          </>
        )} */}
      </div>
    </>
  );
};

export default DynamicSegment;
