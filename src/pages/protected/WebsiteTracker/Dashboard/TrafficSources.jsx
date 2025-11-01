import React from 'react';
import { Box, Typography } from '@mui/material';

export const TrafficSources = ({ trafficSources }) => {
  return (
    <Box
      sx={{
        width: '83vw',
        bgcolor: 'white',
        borderRadius: 2,
        boxShadow: 1,
        border: '1px solid',
        borderColor: 'grey.100',
        p: 3,
        mx: 'auto',
      }}
    >
      <Typography variant="h6" fontWeight={600} color="text.primary" mb={3}>
        Traffic Sources
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {trafficSources.map((source, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  bgcolor: source.color,
                }}
              />
              <Typography fontWeight={500} color="text.primary">
                {source.source}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {source.visitors.toLocaleString()}
              </Typography>
              <Typography
                variant="body2"
                fontWeight={500}
                color="text.primary"
                sx={{ width: 48, textAlign: 'right' }}
              >
                {source.percentage}%
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Donut chart */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: 128, height: 128, position: 'relative' }}>
          <svg
            viewBox="0 0 100 100"
            style={{
              width: '100%',
              height: '100%',
              transform: 'rotate(-90deg)',
            }}
          >
            {trafficSources.reduce((acc, source, index) => {
              const previousSum = trafficSources
                .slice(0, index)
                .reduce((sum, s) => sum + s.percentage, 0);
              const strokeDasharray = `${source.percentage * 2.51} ${
                251.2 - source.percentage * 2.51
              }`;
              const strokeDashoffset = -previousSum * 2.51;

              acc.push(
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={source.color}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                />
              );
              return acc;
            }, [])}
          </svg>
        </Box>
      </Box>
    </Box>
  );
};
