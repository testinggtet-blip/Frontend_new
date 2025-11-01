import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { FetchAllActionTracker } from 'Api/Api';
import { formatedDateTime } from 'utils/commonFunctions';

const ActivityLogDetails = ({ logs, sx }) => {
  const truncate = (value) => {
    return value.length > 20 ? value.substring(0, 20) + '...' : value;
  };

  return (
    <Box sx={{ paddingLeft: '32px', flexGrow: 1, position: 'relative', ...sx }}>
      <Box
        sx={{
          position: 'absolute',
          left: '8px',
          top: 0,
          bottom: 0,
          width: '1.5px',
          backgroundColor: 'lightgrey',
          zIndex: 1,
        }}
      />
      {logs.length > 0 ? (
        logs.map((log) => {
          const { createdTime, action, preValue, postValue } = log;
          const { date: formattedDate, time: formattedTime } = formatedDateTime(createdTime);

          let logMessage = '';
          let updatedValues = {};
          if (action === 'Created') {
            logMessage = 'The Campaign was Created on';
          } else if (action === 'Deleted') {
            logMessage = 'The Campaign was Deleted on';
          } else if (action === 'Updated') {
            if (preValue && postValue) {
              const keyMapping = {
                campaignName: 'Campaign Name',
                description: 'Description',
                status: 'Status',
                targetURL: 'Target URL'
              };

              updatedValues = Object.keys(postValue).reduce((acc, key) => {
                if (postValue[key] != null && preValue[key] != null && postValue[key] !== preValue[key]) {
                  if (keyMapping[key]) {
                    acc[keyMapping[key]] = {
                      preValue: preValue[key],
                      postValue: postValue[key],
                    };
                  } else {
                    acc[key] = {
                      preValue: preValue[key],
                      postValue: postValue[key],
                    };
                  }
                }
                return acc;
              }, {});
              logMessage = 'The following fields were updated:';
            }
          }

          return (
            <Box
              key={log.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>
                  {logMessage}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 'bold', alignSelf: 'flex-start' }}>
                  {formattedDate} {formattedTime}
                </Typography>
              </Box>

              {action === 'Updated' && (
                <Box sx={{ marginTop: '8px' }}>
                  {Object.keys(updatedValues).length > 0 ? (
                    Object.entries(updatedValues).map(([field, values]) => (
                      <Typography key={field} variant="body2" sx={{ color: 'grey' }}>
                        {field}: {truncate(values.preValue)} → {truncate(values.postValue)}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2" sx={{ color: 'grey' }}>
                      No changes detected.
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          );
        })
      ) : (
        <Typography>No activity logs found.</Typography>
      )}
    </Box>
  );
};

const ActivityRealtimeCampaign = ({ item }) => {
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadActivityLogs = async () => {
    if (!item?.id) {
      setError('Campaign ID is missing.');
      setLoading(false);
      return;
    }

    setLoading(true);
    const data = {
      recordId: item.id,
      moduleName: 'Campaign',
    };

    try {
      const response = await FetchAllActionTracker(data);
      if (response?.data?.status === true && response.data.data) {
        const logs = response.data.data;
        setActivityLogs(logs);
        setError(null);
      } else {
        setActivityLogs([]);
        setError('No activity logs found.');
      }
    } catch (error) {
      setError('Failed to load activity logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (item?.id) {
      loadActivityLogs();
    } else {
      setError('Campaign ID is required to load activity logs.');
      setLoading(false);
    }
  }, [item]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const currentMonthYear = new Date().toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          marginBottom: '25px',
          marginLeft: '-13px',
          color: 'grey',
          marginTop: '16px',
          fontSize: '20px',
        }}
        gutterBottom
      >
        {currentMonthYear}
      </Typography>
      <ActivityLogDetails logs={activityLogs} sx={{ marginTop: '20px' }} />
    </Box>
  );
};

export default ActivityRealtimeCampaign;
