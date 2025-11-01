import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { ScrollText } from 'lucide-react';
import { getCountryFlag, getBrowserIcon, getDeviceIcon } from './DashboardStyles';
import { tableScrollbar } from 'components/Style';

export const VisitorLogs = ({ visitorLogs }) => {
  return (
    <Box
      sx={{
        ...tableScrollbar,
        width: '100%',
        bgcolor: 'white',
        borderRadius: 2,
        boxShadow: 1,
        borderColor: 'grey.100',
        px: 2.5,
        py: 1.5,
        mr: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography variant="h6" fontWeight={400} color="text.primary">
          Visitor Logs
        </Typography>
        <ScrollText size={20} color="#9ca3af" />
      </Box>

      {visitorLogs.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No visitor logs available.
        </Typography>
      ) : (
        <Box
          sx={{ maxHeight: 400, overflowY: 'auto', pr: 1, ...tableScrollbar }}
        >
          <Box
            sx={{
              ...tableScrollbar,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {visitorLogs.map((log, index) => (
              <Paper
                key={index}
                variant="outlined"
                sx={{
                  p: 2,
                  backgroundColor: '#f9fafb',
                  borderRadius: 2,
                  borderColor: 'grey.200',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.primary">
                    Visit Time: {log.visitTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {log.duration}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" mb={1}>
                  <strong>Referrer:</strong> {log.referrer || 'Direct'}
                  <br />
                  <strong>Device:</strong> {getDeviceIcon(log.device ?? '')}{' '}
                  {log.device ?? 'Unknown'} • {log.os ?? 'Unknown'} •{' '}
                  {getBrowserIcon(log.browser ?? '')} {log.browser ?? 'Unknown'}
                  <br />
                  <strong>Location:</strong> {getCountryFlag(log.country ?? '')}{' '}
                  {log.country ?? 'Unknown'} {log.ip && `(${log.ip})`}
                </Typography>

                <Box>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="text.primary"
                    mb={0.5}
                  >
                    Actions:
                  </Typography>
                  <Box
                    component="ul"
                    sx={{ pl: 3, m: 0, color: 'text.primary' }}
                  >
                    {log.actions.map((action, idx) => (
                      <li key={idx}>
                        [{action.type}] <strong>{action.title}</strong> -{' '}
                        {action.url} ({action.timeSpent})
                      </li>
                    ))}
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
