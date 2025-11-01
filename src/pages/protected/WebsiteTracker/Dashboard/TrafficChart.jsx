import React from 'react';
import { Box, Typography } from '@mui/material';

export const TrafficChart = ({ siteId, chartData }) => {
  if (!Array.isArray(chartData) || chartData.length === 0) return null;

  const maxVisitors = Math.max(...chartData.map((d) => d.visitors));
  const maxPageViews = Math.max(...chartData.map((d) => d.pageViews));

  const chartHeight = 320;
  const paddingBottom = 30; // for labels inside the chart

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'white',
        borderRadius: 2,
        boxShadow: 1,
        py: 1.5,
        px: 3,
        mx: 'auto',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" fontWeight={400}>
          Visitors Overview
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                bgcolor: '#3b82f6',
                borderRadius: '50%',
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Visitors
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                bgcolor: '#10b981',
                borderRadius: '50%',
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Page Views
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Chart Area */}
      <Box sx={{ position: 'relative', height: chartHeight }}>
        <svg viewBox={`0 0 800 ${chartHeight}`} width="100%" height="100%">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={(y / 100) * (chartHeight - paddingBottom)}
              x2="800"
              y2={(y / 100) * (chartHeight - paddingBottom)}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}

          {/* Visitors Line */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={chartData
              .map(
                (d, i) =>
                  `${(i * 800) / (chartData.length - 1)},${
                    chartHeight -
                    paddingBottom -
                    (d.visitors / maxVisitors) *
                      (chartHeight - paddingBottom - 20)
                  }`
              )
              .join(' ')}
          />

          {/* Page Views Line */}
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={chartData
              .map(
                (d, i) =>
                  `${(i * 800) / (chartData.length - 1)},${
                    chartHeight -
                    paddingBottom -
                    (d.pageViews / maxPageViews) *
                      (chartHeight - paddingBottom - 20)
                  }`
              )
              .join(' ')}
          />

          {/* Data Points + Date Labels */}
          {chartData.map((d, i) => {
            const x = (i * 800) / (chartData.length - 1);
            const yVisitors =
              chartHeight -
              paddingBottom -
              (d.visitors / maxVisitors) * (chartHeight - paddingBottom - 20);
            const yPageViews =
              chartHeight -
              paddingBottom -
              (d.pageViews / maxPageViews) * (chartHeight - paddingBottom - 20);

            return (
              <g key={i}>
                <circle cx={x} cy={yVisitors} r="4" fill="#3b82f6" />
                <circle cx={x} cy={yPageViews} r="4" fill="#10b981" />
                {/* Date Label Below */}
                <text
                  x={x}
                  y={chartHeight - 10}
                  fontSize="10"
                  textAnchor="middle"
                  fill="#6b7280"
                >
                  {new Date(d.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </text>
              </g>
            );
          })}
        </svg>
      </Box>
    </Box>
  );
};
