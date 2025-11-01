import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Activity, Users } from 'lucide-react';
import { RealTimeApi } from 'Api/Api';
import { tableScrollbar } from 'components/Style';

export const RealTimeWidget = ({ siteId, range }) => {
  const [currentVisitors, setCurrentVisitors] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await RealTimeApi(siteId, 'day', range);
        setCurrentVisitors(data.currentVisitors);
        setRecentActivity(data.recentActivity);
      } catch (err) {
        console.error('Failed to fetch real-time data:', err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [siteId, range]);

  return (
    <Box
      sx={{
        maxWidth: '26vw',
        bgcolor: 'white',
        borderRadius: 2,
        boxShadow: 1,
        borderColor: 'grey.100',
        px: 2.5,
        py: 1.5,
        height: 'auto',
        ...tableScrollbar,
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="h6" fontWeight={400} color="text.primary">
          Real-time
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 8,
              height: 8,
              backgroundColor: 'green',
              borderRadius: '50%',
              animation: 'pulse 1.5s infinite',
            }}
          />
          <Typography variant="body2" color="green" fontWeight={500}>
            Live
          </Typography>
        </Box>
      </Box>

      {/* Current Visitors */}
      <Box display="flex" alignItems="center" gap={2} mb={1}>
        <Users size={20} color="#2563EB" />
        <Typography variant="h4" fontWeight={700} color="text.primary">
          {currentVisitors}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          online now
        </Typography>
      </Box>

      {/* Recent Activity Header */}
      <Box
        display="flex"
        justifyContent={'right'}
        alignItems="center"
        gap={1}
        mb={2}
      >
        <Activity size={16} color="#9CA3AF" />
        <Typography variant="body2" fontWeight={500} color="text.secondary">
          Recent Activity
        </Typography>
      </Box>

      {/* Scrollable Activity List */}
      <Box
        sx={{
          ...tableScrollbar,
          maxHeight: 250,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {recentActivity?.map((activity, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              p: 1,
              borderRadius: 2,
              transition: 'background-color 0.2s',
              '&:hover': {
                backgroundColor: '#F9FAFB',
              },
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                mt: 1,
                backgroundColor: '#3B82F6',
                borderRadius: '50%',
                flexShrink: 0,
              }}
            />
            <Box flex={1} minWidth={0}>
              <Typography variant="body2" color="text.primary" noWrap>
                {activity.action || 'Visited a page'}
              </Typography>
              <Box display="flex" justifyContent="space-between" mt={0.5}>
                <Typography
                  variant="caption"
                  color="primary"
                  fontWeight={500}
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '60%',
                  }}
                >
                  {activity.url}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {activity.time}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
