import React, { useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import StartNode from './components/Nodes/startNode';
import AddNode from './components/Nodes/addNode';
import CustomNode from './components/Nodes/customNode';
import { useDispatch, useSelector } from 'react-redux';
import { CreateSequence, UpdateSequence } from 'Api/Api';
import toast from 'react-hot-toast';
import { resetState } from '../../../redux/reducers/sequenceReducer';
import { protectedRoutes } from 'constants/appRoutes';
import { DateAndTime } from 'utils/commonFunctions';

const SequenceReview = ({ handleBack }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { nodes: reduxNodes, edges: reduxEdges } = useSelector(
    (state) => state.sequence.sequenceData.sequence
  );
  const sequence = useSelector((state) => state.sequence);
  const { sequenceData, sequenceName } = sequence;
  const [loading, setLoading] = useState(false);

  const options = useSelector((state) => state.sequence.options);

  const [nodes, setNodes, onNodesChange] = useNodesState(reduxNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(reduxEdges);
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const nodeTypes = useMemo(
    () => ({
      custom: (props) => <CustomNode {...props} edges={reduxEdges} />,
      startNode: (props) => <StartNode {...props} edges={reduxEdges} />,
      addNode: (props) => <AddNode {...props} edges={reduxEdges} />,
    }),
    [reduxEdges]
  );

  const time = DateAndTime(sequenceData?.frequencyDateTime);

  const dataToSave = {
    name: sequenceName,
    sequenceData: JSON.stringify(sequenceData),
    timeZone: sequenceData?.timeZone,
    segment_id: sequenceData?.selectedSegment,
  };

  const PreviousPage = () => {
    if (id) {
      navigate(`/create-flows/${id}`);
    } else {
      handleBack();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        const response = await UpdateSequence(id, dataToSave);
        if (response?.data?.status === true) {
          toast.success(response.data.message);
          dispatch(resetState());
          navigate(protectedRoutes.flows);
        }
      } else {
        const response = await CreateSequence(dataToSave);
        if (response?.data?.status === true) {
          toast.success(response.data.message);
          dispatch(resetState());
          navigate(protectedRoutes.flows);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to save.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      mt={2}
      sx={{
        position: 'relative',
        height: isMobile ? 'auto' : '70vh',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        width: '98%',
        paddingY: 1.5,
        paddingX: 2.5,
        gap: 2,
      }}
    >
      <Box
        sx={{
          flex: 2,
          borderRadius: 2,
          border: '1px solid #000000',
          overflow: 'hidden',
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box
          sx={{
            borderRadius: 2,
            border: '1px solid #000000',
            p: 2,
          }}
        >
          <Typography fontWeight={500} fontSize={18} color="black">
            Subscriber
          </Typography>
          <Typography mt={1} color="black" fontWeight={400} fontSize={20}>
            Subscriber Count = {sequenceData?.subscriberCount}
          </Typography>
        </Box>

        <Box
          sx={{
            borderRadius: 2,
            border: '1px solid #000000',
            p: 2,
          }}
        >
          <Typography fontWeight={600} fontSize={18} color="black">
            Options
          </Typography>
          <Typography mt={1} fontSize={16} color="text.secondary">
            {`Schedule ${sequenceData?.schedule} on ${time}`}
          </Typography>

          {options?.triggerCampaign && (
            <Typography mt={1} fontSize={16} color="text.secondary">
              Trigger Campaign based on the Subscriber Timezone
            </Typography>
          )}

          {options?.convertIntoAutomation && (
            <Typography mt={1} fontSize={16} color="text.secondary">
              Converted into Automation
            </Typography>
          )}
        </Box>
      </Box>

      {/* Footer with separate Back and Save */}
      {/* <Box
        mt={2}
        sx={{
          width: '100%',
          position: 'absolute',
          bottom: -75,
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 6, // bigger space between buttons
          backgroundColor: '#fff', // white background
          borderTop: '1px solid #ddd',
        }}
      >
        <Box>
          <Button variant="outlined" size="large" onClick={PreviousPage}>
            Back
          </Button>
        </Box>

        <Box>
          <Button
            variant="contained"
            size="large"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </Box>
      </Box> */}
    </Box>
  );
};

export default SequenceReview;
