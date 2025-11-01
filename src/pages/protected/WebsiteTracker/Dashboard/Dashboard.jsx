import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { Users, Eye, Clock, TrendingUp } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { TrafficChart } from './TrafficChart';
import { PopularPages } from './PopularPages';
import { VisitorLogs } from './VisitorLogs';
import { RealTimeWidget } from './RealTimeWidget';
import {
  FetchChartData,
  FetchPopularPages,
  FetchVisitorLogs,
  FetchVisitorStats,
} from 'Api/Api';
import { tableScrollbar } from 'components/Style';
import { TrackerContainer } from 'pages/protected/Profile/style';

export const Dashboard = ({ selectedSite, range }) => {
  const [visitorStats, setVisitorStats] = useState([]);
  const [chart, setChartData] = useState([]);
  const [visitorLogs, setVisitorLogs] = useState([]);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const siteId = selectedSite?.id;

  useEffect(() => {
    if (!siteId || !range) return;

    const loadVisitorStats = async () => {
      setLoading(true);
      try {
        const results = await Promise.allSettled([
          FetchVisitorStats(siteId, 'day', range),
          FetchChartData(siteId, 'day', range),
          FetchVisitorLogs(siteId, 'day', range),
          FetchPopularPages(siteId, 'day', range),
        ]);

        const [visitors, chartData, visitorData, pagesData] = results.map(
          (result) => (result.status === 'fulfilled' ? result.value : null)
        );

        if (visitors) setVisitorStats(visitors);
        if (chartData) setChartData(chartData);
        if (visitorData) setVisitorLogs(visitorData);
        if (pagesData) setPages(pagesData);

        if (results.some((r) => r.status === 'rejected')) {
          console.warn('Some data failed to load:', results);
        }
      } catch (error) {
        console.error('Unexpected failure during data load:', error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    loadVisitorStats();
  }, [siteId, range]);

  if (loading) {
    return (
      <Box sx={TrackerContainer}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        ...tableScrollbar,
        px: 3,
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        overflowX: 'hidden',
      }}
    >
      {/* Key Metrics */}
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 1fr',
            lg: 'repeat(4, 1fr)',
          },
        }}
      >
        <MetricCard
          title="Total Visitors"
          value={(visitorStats?.visitors ?? 0).toLocaleString()}
          // change={12.5}
          icon={Users}
          color="blue"
        />
        <MetricCard
          title="Page Views"
          value={(visitorStats?.pageViews ?? 0).toLocaleString()}
          // change={8.3}
          icon={Eye}
          color="green"
        />
        <MetricCard
          title="Avg. Session Duration"
          value={visitorStats?.avgTimeOnSite ?? '0:00'}
          // change={-2.1}
          icon={Clock}
          color="amber"
        />
        <MetricCard
          title="Bounce Rate"
          value={`${visitorStats?.bounceRate ?? 0}%`}
          // change={-5.2}
          icon={TrendingUp}
          color="red"
        />
      </Box>

      {/* Charts and Real-Time */}
      <Box
        sx={{
          maxWidth: '80vw',
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
        }}
      >
        <TrafficChart siteId={siteId} chartData={chart} range={range} />
        <RealTimeWidget siteId={siteId} range={range} />
      </Box>

      {/* Visitor Logs and Pages */}
      <Box
        sx={{
          maxWidth: '80vw',
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
        }}
      >
        <VisitorLogs visitorLogs={visitorLogs} />
        <PopularPages pages={pages} />
      </Box>
    </Box>
  );
};
