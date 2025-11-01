import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Skeleton,
  Grid,
  FormControl,
  Button,
} from '@mui/material';
import { CustomSelect } from 'components/CustomSelect';
import { FetchAllActionTracker } from 'Api/Api';
import { formatedDateTime } from 'utils/commonFunctions';
import {
  ActivitySortBy,
  ActivitySortOrder,
  ActivityFilterAction,
  ActivityDateRange,
  getLogMessageStyle,
} from 'constants/appConstant';

const parseSequence = (v) => {
  if (v && typeof v.sequenceData === 'string') {
    try {
      return { ...v, sequenceData: JSON.parse(v.sequenceData) };
    } catch {}
  }
  return v;
};

const normalize = (logs) =>
  logs.map((l) => ({
    ...l,
    preValue: parseSequence(l.preValue),
    postValue: parseSequence(l.postValue),
  }));

// Deep diff
const deepDiff = (a, b, p = '', out = []) => {
  if (typeof a !== typeof b) out.push({ field: p, from: a ?? '', to: b ?? '' });
  else if (typeof a === 'object' && a && b)
    Array.from(new Set([...Object.keys(a), ...Object.keys(b)])).forEach((k) =>
      deepDiff(a[k], b[k], p ? p + '.' + k : k, out)
    );
  else if (a !== b) out.push({ field: p, from: a ?? '', to: b ?? '' });
  return out;
};

export function getChanges(pre = {}, post = {}, excluded = []) {
  const changes = [];

  const compare = (a, b, parentKey = '') => {
    const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);

    for (const key of keys) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      if (excluded.includes(fullKey.split('.')[0])) continue;

      const valA = a?.[key];
      const valB = b?.[key];

      const isObjectA =
        valA && typeof valA === 'object' && !Array.isArray(valA);
      const isObjectB =
        valB && typeof valB === 'object' && !Array.isArray(valB);

      if (isObjectA || isObjectB) {
        compare(valA || {}, valB || {}, fullKey);
      } else if (String(valA) !== String(valB)) {
        changes.push({
          field: key, // only the leaf key
          from: valA ?? '',
          to: valB ?? '',
        });
      }
    }
  };

  compare(pre, post);
  return changes;
}

// --- FILTER + SORT
const DAYS_MAP = {
  '1week': 7,
  '1month': 30,
  '3months': 90,
  '6months': 180,
  '1year': 365,
};

// --- HOOK ---
const useActivityLogs = (id, moduleName) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const r = await FetchAllActionTracker({ recordId: id, moduleName });
        setLogs(normalize(r?.data?.data || []));
      } catch {
        setLogs([]);
      }
      setLoading(false);
    })();
  }, [id, moduleName]);
  return { logs, loading };
};

// --- COMPONENTS ---

const ActivityFilterBar = ({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  filterAction,
  setFilterAction,
  dateRangeFilter,
  setDateRangeFilter,
  onClearFilters,
}) => (
  <Grid container spacing={2} sx={{ mb: 2 }}>
    {[
      // Render all selectors in a row
      [sortBy, ActivitySortBy, setSortBy],
      [sortOrder, ActivitySortOrder, setSortOrder],
      [filterAction, ActivityFilterAction, setFilterAction],
      [dateRangeFilter, ActivityDateRange, setDateRangeFilter],
    ].map(([val, opts, fn], i) => (
      <Grid item xs={12} sm={3} key={i}>
        <FormControl fullWidth size="small">
          <CustomSelect
            value={val}
            options={opts}
            onChange={(e) => fn(e.target.value)}
          />
        </FormControl>
      </Grid>
    ))}
    <Grid item xs={12} textAlign="right">
      <Button size="small" variant="outlined" onClick={onClearFilters}>
        Clear Filters
      </Button>
    </Grid>
  </Grid>
);

const renderDiffValue = (val) =>
  val === null || val === undefined ? (
    <i style={{ color: '#a00' }}>empty</i>
  ) : typeof val === 'object' ? (
    <pre
      style={{
        background: '#fafbfc',
        display: 'inline-block',
        padding: 2,
        m: 0,
        borderRadius: 4,
        fontSize: '0.92em',
      }}
    >
      {JSON.stringify(val, null, 2)}
    </pre>
  ) : (
    <span>{val}</span>
  );

const highlightDiff = (from, to) =>
  typeof from === 'string' && typeof to === 'string' && from !== to ? (
    <>
      <span style={{ color: 'black' }}>{from}</span>
      <b> → </b>
      <span style={{ color: 'black' }}>{to}</span>
    </>
  ) : (
    <>
      <span style={{ color: 'black' }}>{renderDiffValue(from)}</span>
      <b> → </b>
      <span style={{ color: 'black' }}>{renderDiffValue(to)}</span>
    </>
  );

const LogItem = ({ log, excluded }) => {
  const { createdTime, modifiedTime, action, module, preValue, postValue } =
    log;
  const { date, time } = formatedDateTime(createdTime);
  const { date1, time1 } = formatedDateTime(modifiedTime);
  const { color, message } = getLogMessageStyle(action, module);

  const isCreated = action === 'Created';
  const isUpdated = action === 'Updated';
  const changes = isUpdated ? getChanges(preValue, postValue, excluded) : [];

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.06)',
        p: 2.5,
        mb: 2,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.01)',
          boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={isUpdated && changes.length > 0 ? 1.5 : 0}
      >
        <Typography
          fontWeight="bold"
          color={isCreated ? '#228B22' : '#007bff'}
          sx={{ fontSize: '1rem' }}
        >
          {message}
        </Typography>
        <Typography
          variant="caption"
          fontWeight="bold"
          sx={{ fontSize: '0.85rem', color: '#555' }}
        >
          {date} {time}
        </Typography>
      </Box>

      {isUpdated &&
        changes.length > 0 &&
        changes.map(({ field, from, to }, idx) => (
          <Typography
            key={idx}
            variant="body2"
            sx={{
              fontSize: '0.9rem',
              color: '#333',
              mb: 0.5,
            }}
          >
            {field
              .replace(/^sequenceData\./, 'sequenceData → ')
              .replace(/\./g, ' → ')}{' '}
            : {highlightDiff(from, to)}
          </Typography>
        ))}
    </Box>
  );
};

// --- MAIN VIEWER ---

const ActivityLogViewer = ({
  item, // { id }
  moduleName, // e.g. "Sequence"
  excluded = [], // fields to exclude
}) => {
  const [sortBy, setSortBy] = useState('createdTime');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterAction, setFilterAction] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState('all');
  const { logs, loading } = useActivityLogs(item?.id, moduleName);

  const filteredLogs = useMemo(() => {
    let r = logs;
    if (filterAction !== 'all') r = r.filter((l) => l.action === filterAction);
    if (dateRangeFilter !== 'all' && DAYS_MAP[dateRangeFilter]) {
      const cutoff = Date.now() - DAYS_MAP[dateRangeFilter] * 864e5;
      r = r.filter((l) => new Date(l.createdTime).getTime() >= cutoff);
    }
    return r.slice().sort((a, b) => {
      const m = sortOrder === 'asc' ? 1 : -1;
      const va =
        sortBy === 'createdTime'
          ? new Date(a.createdTime)
          : (a[sortBy] ?? '').toString().toLowerCase();
      const vb =
        sortBy === 'createdTime'
          ? new Date(b.createdTime)
          : (b[sortBy] ?? '').toString().toLowerCase();
      return va < vb ? -1 * m : va > vb ? 1 * m : 0;
    });
  }, [logs, sortBy, sortOrder, filterAction, dateRangeFilter]);

  if (loading)
    return (
      <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
    );

  return (
    <Box>
      <ActivityFilterBar
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        filterAction={filterAction}
        setFilterAction={setFilterAction}
        dateRangeFilter={dateRangeFilter}
        setDateRangeFilter={setDateRangeFilter}
        onClearFilters={() => {
          setSortBy('createdTime');
          setSortOrder('desc');
          setFilterAction('all');
          setDateRangeFilter('all');
        }}
      />
      <Typography variant="h6" sx={{ mb: 2, color: 'grey' }}>
        {new Date().toLocaleString('default', {
          month: 'long',
          year: 'numeric',
        })}
      </Typography>
      {filteredLogs.length ? (
        filteredLogs.map((log, i) => (
          <LogItem key={i} log={log} excluded={excluded} />
        ))
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          mt={2}
        >
          No activity logs available
        </Typography>
      )}
    </Box>
  );
};

export default ActivityLogViewer;
