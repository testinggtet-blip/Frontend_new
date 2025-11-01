import React, { useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Box, Typography, Button, Dialog, Grid } from '@mui/material';
import CustomNode from '../components/Nodes/customNode';
import StartNode from '../components/Nodes/startNode';
import AddNode from '../components/Nodes/addNode';
import { DateAndTime, formatDateTime } from 'utils/commonFunctions';
import theme from 'styles/app.theme';

const Details = ({ item, segments }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState(
    item?.segment_id || null
  );

  const parseSequence = (v) => {
    if (v && typeof v.sequenceData === 'string') {
      try {
        return { ...v, sequenceData: JSON.parse(v.sequenceData) };
      } catch {}
    }
    return v;
  };

  const data = parseSequence(item);

  const reduxNodes = data?.sequenceData?.sequence?.nodes || [];
  const reduxEdges = data?.sequenceData?.sequence?.edges || [];

  const [nodes] = useNodesState(reduxNodes);
  const [edges] = useEdgesState(reduxEdges);

  const nodeTypes = useMemo(
    () => ({
      custom: (props) => <CustomNode {...props} edges={reduxEdges} />,
      startNode: (props) => <StartNode {...props} edges={reduxEdges} />,
      addNode: (props) => <AddNode {...props} edges={reduxEdges} />,
    }),
    []
  );

  const seqData = data?.sequenceData || {};
  const FlowView = ({ height }) => (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      zoomOnScroll={false}
      zoomOnPinch={true}
      zoomOnDoubleClick={false}
      panOnDrag={true}
      style={{ height }}
    >
      <Background />
      <Controls showInteractive={false} />
    </ReactFlow>
  );

  return (
    <>
      {/* Main Details Modal Content */}
      <Box
        sx={{
          width: 520,
          maxHeight: '90vh',
          bgcolor: '#fff',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            fontSize={22}
            variant="subtitle2"
            color="black"
            fontWeight={600}
            // marginBottom={0.5}
          >
            Flow Details
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant="contained"
              onClick={() => setIsExpanded(true)}
            >
              Expand
            </Button>
            {/* <Button
              size="small"
              variant="outlined"
              onClick={() => setIsExpanded(false)}
            >
              Close
            </Button> */}
          </Box>
        </Box>

        {/* React Flow - Small View */}
        <Box sx={{ height: 350, borderBottom: '1px solid #ddd' }}>
          <FlowView height="100%" />
        </Box>

        <Box marginTop={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: theme.palette.background.default,
                  padding: theme.spacing(1.5),
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="black"
                  fontWeight={600}
                  marginBottom={0.5}
                >
                  Flow Name
                </Typography>
                <Typography variant="body2">{data?.name}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4.5}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: theme.palette.background.default,
                  padding: theme.spacing(1.5),
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="black"
                  fontWeight={600}
                  marginBottom={0.5}
                >
                  Selected Segment
                </Typography>
                <Typography variant="body2">
                  {segments?.find((seg) => seg.id === selectedSegment)
                    ?.segmentName || 'N/A'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4.5}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: theme.palette.background.default,
                  padding: theme.spacing(1.5),
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="black"
                  fontWeight={600}
                  marginBottom={0.5}
                >
                  Subscriber Count
                </Typography>
                <Typography variant="body2">
                  {seqData?.subscriberCount}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: theme.palette.background.default,
                  padding: theme.spacing(1.5),
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="black"
                  fontWeight={600}
                  marginBottom={0.5}
                >
                  Time Zone
                </Typography>
                <Typography variant="body2">
                  {data?.timeZone || 'Not specified'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4.5}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: theme.palette.background.default,
                  padding: theme.spacing(1.5),
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="black"
                  fontWeight={600}
                  marginBottom={0.5}
                >
                  Frequency
                </Typography>
                <Typography variant="body2">
                  {seqData?.schedule || 'Not specified'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4.5}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: theme.palette.background.default,
                  padding: theme.spacing(1.5),
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="black"
                  fontWeight={600}
                  marginBottom={0.5}
                >
                  Created Time
                </Typography>
                <Typography variant="body2">
                  {formatDateTime(item?.modifiedTime) || 'Not modified'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={7}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: theme.palette.background.default,
                  padding: theme.spacing(1.5),
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="black"
                  fontWeight={600}
                  marginBottom={0.5}
                >
                  Schedule
                </Typography>
                <Typography
                  variant="body2"
                  noWrap
                  sx={{
                    overflow: 'hidden',
                    // textOverflow: 'ellipsis',
                  }}
                >
                  {seqData?.frequency}{' '}
                  {seqData?.frequencyDateTime
                    ? `on ${formatDateTime(seqData?.frequencyDateTime)}`
                    : ''}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Expanded Fullscreen Dialog */}
      <Dialog
        open={isExpanded}
        onClose={() => setIsExpanded(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{ sx: { height: '90vh', bgcolor: '#fff' } }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography fontSize={20} fontWeight={600}>
            Full Flow View
          </Typography>
          <Button
            onClick={() => setIsExpanded(false)}
            variant="outlined"
            size="small"
          >
            Close
          </Button>
        </Box>
        <Box sx={{ flex: 1, height: '100%', borderTop: '1px solid #ddd' }}>
          <FlowView height="calc(90vh - 60px)" />
        </Box>
      </Dialog>
    </>
  );
};

export default Details;
