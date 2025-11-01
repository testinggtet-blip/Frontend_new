import React, { useState, useEffect, useMemo } from 'react';
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

  const flattenObject = (obj, parentKey = '', result = {}) => {
    if (!obj || typeof obj !== 'object') return result;

    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      const value = obj[key];

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        flattenObject(value, newKey, result);
      } else {
        result[newKey] = value;
      }
    }
    return result;
  };

  const formatLabel = (str) =>
    String(str)
      .replace(/\./g, ' ')
      .replace(/[-_]/g, ' ')
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const LABELS = {
    'data.title': 'Title',
    'data.description': 'Description',
    'data.styles.iconImageURL': 'Notification Icon',
    'data.styles.allowButtonText': 'Allow Button Label',
    'data.styles.laterButtonText': 'Later Button Label',
    'data.styles.allowButtonBackgroundColor': 'Allow Button Background',
    'data.styles.allowButtonTextColor': 'Allow Button Text Color',
    'data.styles.desktopPosition': 'Desktop Position',
    'data.styles.mobilePosition': 'Mobile Position',
    'data.mobileTiming': 'Mobile Timing (sec)',
    'data.desktopTiming': 'Desktop Timing (sec)',
    'data.hidePromptFrequency': 'Hide Prompt Frequency',
    'data.showPromptFrequency': 'Show Prompt Frequency',
    promptId: 'Prompt ID',
    banner: 'Banner Image',
    icon: 'Welcome Template Icon',
    connectionImageBase64: 'Welcome Template Image',
  };

  const EXCLUDED_KEYS = new Set([
    'templateId',
    'userId',
    'id',
    'welcomeTemplate',
    'welcomeTemplateId',
  ]);

  const EXCLUDED_PREFIXES = ['options.', 'headers.'];

  const IMAGE_FIELDS = new Set([
    'connectionImageBase64',
    'banner',
    'icon',
    'data.styles.iconImageURL',
  ]);

  const isUrl = (value) =>
    typeof value === 'string' && /^https?:\/\//i.test(value);

  const getLabel = (key) =>
    LABELS[key] ||
    formatLabel(key.replace(/^data\.styles\./, '').replace(/^data\./, ''));

  const renderChangedValues = () => {
    if (!preValue || !postValue) return null;

    const flatPre = flattenObject(preValue || {});
    const flatPost = flattenObject(postValue || {});

    const changes = Object.keys(flatPost)
      .filter((key) => {
        if (EXCLUDED_KEYS.has(key)) return false;
        if (EXCLUDED_PREFIXES.some((p) => key.startsWith(p))) return false;
        if (key.toLowerCase().includes('connectionid')) return false;

        const oldVal = flatPre[key];
        const newVal = flatPost[key];

        if (typeof oldVal === 'object' || typeof newVal === 'object')
          return false;
        return oldVal !== newVal;
      })
      .map((key) => ({
        key,
        label: getLabel(key),
        pre: flatPre[key],
        post: flatPost[key],
      }));

    if (!changes.length) return null;

    return (
      <Box sx={{ marginTop: '8px' }}>
        {changes.map(({ key, label, pre, post }) => {
          const isImageField = IMAGE_FIELDS.has(key);

          return (
            <Box key={key} sx={{ marginBottom: '8px' }}>
              {isImageField ? (
                <>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}
                  >
                    {label} updated:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                    {pre && (
                      <img
                        src={pre}
                        alt="Previous"
                        width={60}
                        height={60}
                        style={{ borderRadius: 4 }}
                      />
                    )}
                    {post && (
                      <img
                        src={post}
                        alt="Updated"
                        width={60}
                        height={60}
                        style={{ borderRadius: 4 }}
                      />
                    )}
                  </Box>
                </>
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', wordBreak: 'break-word' }}
                >
                  <strong>{label}:</strong>{' '}
                  {pre !== undefined &&
                    (isUrl(pre) ? (
                      <a href={pre} target="_blank" rel="noopener noreferrer">
                        {pre}
                      </a>
                    ) : (
                      pre
                    ))}
                  {pre !== undefined && post !== undefined && ' → '}
                  {post !== undefined &&
                    (isUrl(post) ? (
                      <a href={post} target="_blank" rel="noopener noreferrer">
                        {post}
                      </a>
                    ) : (
                      post
                    ))}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    );
  };

  if (
    action === 'Updated' &&
    (!preValue || !postValue || !renderChangedValues())
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
          transform: 'scale(1.01)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          // transform: 'none',
          // boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
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

const ActivityTemplate = ({ item }) => {
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        moduleName: 'Connection',
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
          marginBottom: '25px',
          marginLeft: '0px',
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

export default ActivityTemplate;
