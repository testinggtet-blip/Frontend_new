import React from 'react';
import { Box, Typography } from '@mui/material';

export const MetricCard = ({
  title,
  value,
  change,
  icon: Icon,
  color = 'blue',
}) => {
  const colorStyles = {
    blue: { color: '#2563EB', backgroundColor: '#EFF6FF' },
    green: { color: '#16A34A', backgroundColor: '#ECFDF5' },
    amber: { color: '#D97706', backgroundColor: '#FFFBEB' },
    red: { color: '#DC2626', backgroundColor: '#FEE2E2' },
    purple: { color: '#7C3AED', backgroundColor: '#F5F3FF' },
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '80vw',
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: '0px 1px 3px rgba(0,0,0,0.05)',
        border: '1px solid #F3F4F6',
        p: 2.5,
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={500}
            mb={0.5}
          >
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            {value}
          </Typography>
          {change !== undefined && (
            <Box display="flex" alignItems="center" mt={1}>
              <Typography
                variant="body2"
                fontWeight={500}
                sx={{
                  color: change >= 0 ? '#16A34A' : '#DC2626',
                }}
              >
                {change >= 0 ? '+' : ''}
                {change}%
              </Typography>
              <Typography variant="body2" color="text.secondary" ml={0.5}>
                vs last period
              </Typography>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            ...colorStyles[color],
            p: 1.5,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon style={{ width: 24, height: 24 }} />
        </Box>
      </Box>
    </Box>
  );
};
