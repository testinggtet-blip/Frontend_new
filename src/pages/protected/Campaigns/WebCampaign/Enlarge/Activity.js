import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Skeleton,
  FormControl,
  Grid,
  Button,
} from '@mui/material';
import { FetchAllActionTracker } from 'Api/Api';
import { formatedDateTime } from 'utils/commonFunctions';
import {
  ActivityDateRange,
  ActivityFilterAction,
  ActivitySortBy,
  ActivitySortOrder,
  getLogMessageStyle,
} from 'constants/appConstant';
import { CustomSelect } from 'components/CustomSelect';

const LogItem = ({ log }) => {
  const { createdTime, action, module, preValue, postValue } = log;

  const { date: formattedDate, time: formattedTime } =
    formatedDateTime(createdTime);

  const renderChangedValues = () => {
    if (!preValue || !postValue) return null;
    const excludedKeys = [
      'templateId',
      'segmentId',
      'connectionId',
      'id',
      'welcomeTemplate',
      'template',
      'segment',
      'connection',
      'templateID',
      'segmentID',
      'campaignId',
      'userId',
      'deleted',
      'lastTriggeredTime','scheduledTriggeredTime','createdTime','modifiedTime'
    ];
    const changes = Object.keys(postValue)
      .filter(
        (key) =>
          !excludedKeys.includes(key) &&
          preValue[key] !== postValue[key] &&
          typeof preValue[key] !== 'object' &&
          typeof postValue[key] !== 'object'
      )
      .reduce((acc, key) => {
        const keyMapping = {
          banner: 'Banner updated',
          icon: 'Icon updated',
          deleted: 'Deletion status changed',
        };

        const displayKey = keyMapping[key] || key;

        acc[displayKey] = {
          preValue: preValue[key],
          postValue: postValue[key],
        };

        return acc;
      }, {});

    return Object.keys(changes).length > 0 ? (
      <Box sx={{ marginTop: '8px' }}>
        {Object.entries(changes).map(([field, values]) => (
          <Typography
            key={field}
            variant="body2"
            sx={{ color: 'text.secondary' }}
          >
            {field}: {values.preValue} → {values.postValue}
          </Typography>
        ))}
      </Box>
    ) : null;
  };

  if (
    action === 'Updated' &&
    (!preValue ||
      !postValue ||
      Object.keys(renderChangedValues() || {}).length === 0)
  ) {
    return null;
  }

  const { color: messageColor, message: logMessage } = getLogMessageStyle(
    action,
    module
  );

  return (
    <Box
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
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 'bold',
            color: messageColor,
          }}
        >
          {logMessage}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 'bold',
            alignSelf: 'flex-start',
          }}
        >
          {formattedDate} {formattedTime}
        </Typography>
      </Box>

      {action === 'Updated' && renderChangedValues()}
    </Box>
  );
};

const ActivitySegmnet = ({ item }) => {
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New state for sorting and filtering
  const [sortBy, setSortBy] = useState('createdTime'); // Default sort by date
  const [sortOrder, setSortOrder] = useState('desc'); // Default descending
  const [filterAction, setFilterAction] = useState('all'); // Filter by action type
  const [dateRangeFilter, setDateRangeFilter] = useState('all'); // Date range filter

  useEffect(() => {
    const loadActivityLogs = async () => {
      if (!item?.id) {
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
          setActivityLogs(response.data.data);
          setError(null);
        } else {
          setActivityLogs([]);
          setError('No activity logs found.');
        }
      } catch (error) {
        setError('Failed to load activity logs');
        setActivityLogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadActivityLogs();
  }, [item]);

  // Memoized and filtered logs
  const processedLogs = useMemo(() => {
    let filteredLogs = activityLogs;

    // Filter by action type
    if (filterAction !== 'all') {
      filteredLogs = filteredLogs.filter((log) => log.action === filterAction);
    }

    // Date range filter
    const now = new Date();
    if (dateRangeFilter !== 'all') {
      const daysToSubtract = {
        '1week': 7,
        '1month': 30,
        '3months': 90,
        '6months': 180,
        '1year': 365,
      };

      const cutoffDate = new Date(
        now.getTime() - daysToSubtract[dateRangeFilter] * 24 * 60 * 60 * 1000
      );
      filteredLogs = filteredLogs.filter(
        (log) => new Date(log.createdTime) >= cutoffDate
      );
    }

    // Sort logs
    return filteredLogs.sort((a, b) => {
      const modifier = sortOrder === 'asc' ? 1 : -1;

      switch (sortBy) {
        case 'createdTime':
          return modifier * (new Date(a.createdTime) - new Date(b.createdTime));
        case 'action':
          return modifier * a.action.localeCompare(b.action);
        case 'module':
          return modifier * a.module.localeCompare(b.module);
        default:
          return 0;
      }
    });
  }, [activityLogs, sortBy, sortOrder, filterAction, dateRangeFilter]);

  if (loading) {
    return (
      <Skeleton
        variant="rectangular"
        width="100%"
        height={40}
        sx={{ borderRadius: 1 }}
      />
    );
  }

  if (error) return <Typography color="error">{error}</Typography>;

  const currentMonthYear = new Date().toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const handleClearFilters = () => {
    setSortBy('createdTime');
    setSortOrder('desc');
    setFilterAction('all');
    setDateRangeFilter('all');
  };

  return (
    <Box>
      {/* Filtering and Sorting Controls */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth variant="outlined" size="small">
            <CustomSelect
              value={sortBy}
              options={ActivitySortBy}
              onChange={(e) => setSortBy(e.target.value)}
              size="medium"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth variant="outlined" size="small">
            <CustomSelect
              value={sortOrder}
              options={ActivitySortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              size="medium"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth variant="outlined" size="small">
            <CustomSelect
              value={filterAction}
              options={ActivityFilterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              size="medium"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth variant="outlined" size="small">
            <CustomSelect
              value={dateRangeFilter}
              options={ActivityDateRange}
              onChange={(e) => setDateRangeFilter(e.target.value)}
              size="medium"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} textAlign="right">
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        </Grid>
      </Grid>

      <Typography
        variant="h6"
        sx={{
          marginBottom: '10px',
          color: 'grey',
          fontSize: '20px',
        }}
        gutterBottom
      >
        {currentMonthYear}
      </Typography>

      {processedLogs.length > 0 ? (
        processedLogs.map((log, index) => <LogItem key={index} log={log} />)
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', mt: 2 }}
        >
          No activity logs available
        </Typography>
      )}
    </Box>
  );
};

export default ActivitySegmnet;
