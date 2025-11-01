import React from 'react';
import { Grid, Card, Typography, Box, Stack, Button } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const analyticsData = [ 
    { title: 'Visitors', value: '100', sinceLastWeek: 'Since last week', percentage: '19%', trend: 'up', graphData: [-10, 42, 20, 100,49,64,50,50,70,50,30, 10, 10] },
    { title: 'Engaged Visitors', value: '120', sinceLastWeek: 'Since last week', percentage: '19%', trend: 'up', graphData: [-10, 42, 20, 100,49,64,50,50,70,50,30, 10, 10] },
    { title: 'Engagement Ratio', value: '120', sinceLastWeek: 'Since last week', percentage: '19%', trend: 'up', graphData: [-10, 42, 20, 100,49,64,50,50,70,50,30, 10, 10] },
    { title: 'Impressions', value: '120', sinceLastWeek: 'Since last week', percentage: '19%', trend: 'up', graphData: [-10, 42, 20, 100,49,64,50,50,70,50,30, 10, 10] },
    { title: 'Hovers', value: '100', sinceLastWeek: 'Since last week', percentage: '15.5%', trend: 'up', graphData: [-10, 42, 20, 100,49,64,50,50,70,50,30, 10, 10] },
    { title: 'Clicks', value: '120', sinceLastWeek: 'Since last week', percentage: '19%', trend: 'up', graphData: [-10, 42, 20, 100,49,64,50,50,70,50,30, 10, 10] },
    { title: 'CTR', value: '25.9%', sinceLastWeek: 'Since last week', percentage: '19%', trend: 'up', graphData: [-10, 42, 20, 100,49,64,50,50,70,50,30, 10, 10] },
    { title: 'CTR', value: '25.9%', sinceLastWeek: 'Since last week', percentage: '19%', trend: 'up', graphData: [-10, 42, 20, 100,49,64,50,50,70,50,30, 10, 10] },
];


const MiniLineGraph = ({ graphData }) => {
    const graphHeight = 50;
    const graphWidth = 120;
    const maxDataValue = Math.max(...graphData);
    const minDataValue = Math.min(...graphData);

    const points = graphData
        .map((value, index) => {
            const x = (index / (graphData.length - 1)) * graphWidth;
            const y = graphHeight - ((value - minDataValue) / (maxDataValue - minDataValue)) * graphHeight;
            return `${x},${y}`;
        })
        .join(' ');

    return (
        <svg width={graphWidth} height={graphHeight} style={{ padding: '2px' }}>
            <polyline
                fill="none"
                stroke="#38665f"
                strokeWidth="2"
                points={points}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const RealtimeAnalytics = () => {
    return (
        <Box sx={{ padding: '20px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
            <Typography variant="h5" sx={{ marginBottom: '20px', color: '#333', fontWeight: 'bold' }}>
                Analytics
            </Typography>
            <Grid container spacing={3}>
                {analyticsData.map((data, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                padding: '20px',
                                backgroundColor: '#daece9',
                                borderRadius: '12px',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                height: '150px',
                            }}
                        >
                            <Stack direction="column" spacing={1} sx={{ flex: 1 }}>
                                <Typography variant="subtitle1" sx={{ color: '#779c96' }}>
                                    {data.title}
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#033a32' }}>
                                    {data.value}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#648c85' }}>
                                    {data.sinceLastWeek}
                                </Typography>
                            </Stack>

                           
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <MiniLineGraph graphData={data.graphData} sx={{ maxHeight: '50px', maxWidth: '120px' }} />
                                <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        marginTop: '8px',
                                        padding: '4px 8px',
                                        borderRadius: 'none',
                                        backgroundColor: '#ffffff',
                                        color: data.trend === 'up' ? '#2e7d32' : '#d32f2f',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        minWidth: '80px',
                                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    {data.percentage}
                                    {data.trend === 'up' ? (
                                        <ArrowDropUpIcon sx={{ fontSize: '20px', marginLeft: '4px' }} />
                                    ) : (
                                        <ArrowDropDownIcon sx={{ fontSize: '20px', marginLeft: '4px' }} />
                                    )}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default RealtimeAnalytics;