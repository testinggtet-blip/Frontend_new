import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Chart, { useChart } from '.';

// ----------------------------------------------------------------------

export default function Graph({ title, subheader, chart, ...other }) {
  const { labels, colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)}`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <Box sx={{ pl: 3, pt: 2 }}>
        <Typography sx={{ fontSize: 23, color: 'black' }}>{title}</Typography>
        <Typography>
          {subheader}%<span> gain this month </span>
        </Typography>
      </Box>

      <Box sx={{ p: 3, gap: 3, pb: 1, pt: 0 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={344}
        />
      </Box>
    </Card>
  );
}

Graph.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
