import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

export const CountryStats = ({ countryData }) => {
  const maxVisitors = Math.max(...countryData.map((c) => c.visitors));

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '80vw',
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: '0px 1px 3px rgba(0,0,0,0.05)',
        border: '1px solid #F3F4F6',
        p: 3,
      }}
    >
      <Typography variant="h6" fontWeight="600" color="text.primary" mb={3}>
        Top Countries
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        {countryData.map((country, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 1,
              py: 1,
              borderRadius: 2,
              transition: 'background-color 0.2s',
              '&:hover': {
                backgroundColor: '#F9FAFB',
              },
            }}
          >
            {/* Left side: Flag and Country Name */}
            <Box display="flex" alignItems="center" gap={1.5}>
              <Typography variant="body1" fontSize="1.25rem">
                {country.flag}
              </Typography>
              <Typography variant="body1" fontWeight={500} color="text.primary">
                {country.country}
              </Typography>
            </Box>

            {/* Right side: Progress bar and number */}
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                sx={{
                  width: 80,
                  height: 8,
                  backgroundColor: '#E5E7EB',
                  borderRadius: 999,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: `${(country.visitors / maxVisitors) * 100}%`,
                    backgroundColor: '#3B82F6',
                    transition: 'width 0.5s ease',
                  }}
                />
              </Box>
              <Typography
                variant="body2"
                fontWeight={500}
                color="text.primary"
                sx={{ minWidth: 64, textAlign: 'right' }}
              >
                {country.visitors.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
