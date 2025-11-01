import { memo } from 'react';
import ApexChart from 'react-apexcharts';

import { alpha, styled } from '@mui/material/styles';

function bgBlur(props) {
  const color = '#000000';
  const blur = 6;
  const opacity = 1;
  const imgUrl = props?.imgUrl;

  if (imgUrl) {
    return {
      position: 'relative',
      backgroundImage: `url(${imgUrl})`,
      '&:before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity),
      },
    };
  }
}

// ----------------------------------------------------------------------

const Chart = styled(ApexChart)(({ theme }) => ({
  '& .apexcharts-canvas': {
    // Tooltip
    '& .apexcharts-tooltip': {
      backgroundColor: 'rgba(0,0,0,.4)',
      color: '#F9FAFB',
      boxShadow: `0 0 2px 0 ${alpha(
        '#919EAB',
        0.24
      )}, -20px 20px 40px -4px ${alpha('#919EAB', 0.24)}`,
      borderRadius: '1.25rem',
    },
    '& .apexcharts-xaxistooltip': {
      ...bgBlur({
        color: '#F9FAFB',
      }),
      borderColor: 'transparent',
      boxShadow: `0 0 2px 0 ${alpha(
        '#919EAB',
        0.24
      )}, -20px 20px 40px -4px ${alpha('#919EAB', 0.24)}`,
      borderRadius: theme.shape.borderRadius * 1.25,
      '&:before': {
        borderBottomColor: alpha('#919EAB', 0.24),
      },
      '&:after': {
        borderBottomColor: alpha('#F9FAFB', 0.8),
      },
    },
    '& .apexcharts-tooltip-title': {
      textAlign: 'center',
      fontWeight: theme.typography.fontWeightBold,
      backgroundColor: alpha('#919EAB', 0.08),
      color: '#F9FAFB',
    },

    // LEGEND
    '& .apexcharts-legend': {
      padding: 0,
    },
    '& .apexcharts-legend-series': {
      display: 'inline-flex !important',
      alignItems: 'center',
    },
    '& .apexcharts-legend-marker': {
      marginRight: 8,
    },
    '& .apexcharts-legend-text': {
      lineHeight: '18px',
      textTransform: 'capitalize',
    },
  },
}));

export default memo(Chart);
