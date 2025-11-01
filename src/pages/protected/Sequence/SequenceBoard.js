import React, { useEffect, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import AddNode from './components/Nodes/addNode';
import CustomNode from './components/Nodes/customNode';
import StartNode from './components/Nodes/startNode';
import { Box, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSequence } from '../../../redux/reducers/sequenceReducer';

const SequenceBoard = ({ handleBack, handleNext }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { nodes: reduxNodes, edges: reduxEdges } = useSelector(
    (state) => state.sequence.sequenceData.sequence
  );

  const data = useSelector((state) => state.sequence.sequenceData);
  const data1 = useSelector((state) => state.sequence.sequenceName);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  const PreviousPage = () => {
    handleBack();
  };

  const NextPage = () => {
    UpdateNodeAndEdge();
    handleNext();
  };

  const addConditional = (sourceNodeId) => {
    const mainNodeid = uuidv4();
    const id1 = uuidv4();
    const id2 = uuidv4();

    setNodes((prevNodes) => {
      const sourceNode = prevNodes.find((node) => node.id === sourceNodeId);
      if (!sourceNode) {
        console.error(`Source node with id ${sourceNodeId} not found`);
        return prevNodes;
      }

      const mainNode = {
        id: mainNodeid,
        type: 'custom',
        data: {
          id: mainNodeid,
          label: `Conditional`,
          value: {
            waitingTime: 0,
            waitingTimeType: 'Minutes',
            trigger: 'Opened',
          },
        },
        position: { x: sourceNode.position.x, y: sourceNode.position.y + 100 },
      };

      const newNode1 = {
        id: id1,
        type: 'addNode',
        data: { id: id1, parent: 'conditional', label: true },
        position: {
          x: sourceNode.position.x - 100,
          y: sourceNode.position.y + 220,
        },
      };

      const newNode2 = {
        id: id2,
        type: 'addNode',
        data: { id: id2, parent: 'conditional', label: false },
        position: {
          x: sourceNode.position.x + 100,
          y: sourceNode.position.y + 220,
        },
      };

      const updatedNodes = prevNodes.map((node) => {
        if (node.id !== sourceNodeId) {
          if (node.position.x > sourceNode.position.x) {
            return {
              ...node,
              position: {
                ...node.position,
                x: node.position.x + 100,
              },
            };
          } else {
            return {
              ...node,
              position: {
                ...node.position,
                x: node.position.x - 100,
              },
            };
          }
        }
        return node;
      });
      return [...updatedNodes, mainNode, newNode1, newNode2];
    });

    setEdges((prevEdges) => [
      ...prevEdges,
      {
        id: `edge-${mainNodeid}`,
        source: sourceNodeId,
        target: mainNodeid,
        type: 'smoothstep',
        draggable: false,
      },
      {
        id: `edge-${id1}`,
        source: mainNodeid,
        target: id1,
        label: 'True',
        type: 'smoothstep',
        draggable: false,
      },
      {
        id: `edge-${id2}`,
        source: mainNodeid,
        target: id2,
        label: 'False',
        type: 'smoothstep',
        draggable: false,
      },
    ]);

    UpdateNodeAndEdge();
  };

  const addDelay = (sourceNodeId) => {
    const id = uuidv4();

    setNodes((prevNodes) => {
      const sourceNode = prevNodes.find((node) => node.id === sourceNodeId);
      if (!sourceNode) return prevNodes;

      const newNode = {
        id,
        type: 'custom',
        data: {
          id,
          parent: 'delay',
          label: `Delay`,
          value: { waitingTime: 0, waitingTimeType: 'Minutes' },
        },
        position: { x: sourceNode.position.x, y: sourceNode.position.y + 80 },
      };

      return [...prevNodes, newNode];
    });

    setEdges((prevEdges) => [
      ...prevEdges,
      {
        id: `edge-${id}`,
        source: sourceNodeId,
        target: id,
        label: '',
        type: 'smoothstep',
        draggable: false,
      },
    ]);

    UpdateNodeAndEdge();
  };

  const addNotification = (sourceNodeId) => {
    const id = uuidv4();

    setNodes((prevNodes) => {
      const sourceNode = prevNodes.find((node) => node.id === sourceNodeId);
      if (!sourceNode) return prevNodes;

      const newNode = {
        id,
        type: 'custom',
        data: { id, label: `Notification`, value: {} },
        position: { x: sourceNode.position.x, y: sourceNode.position.y + 100 },
      };

      return [...prevNodes, newNode];
    });

    setEdges((prevEdges) => [
      ...prevEdges,
      {
        id: `edge-${id}`,
        source: sourceNodeId,
        target: id,
        label: '',
        type: 'smoothstep',
        draggable: false,
      },
    ]);

    UpdateNodeAndEdge();
  };

  const saveValuetoNode = (value, id) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                value,
              },
            }
          : node
      )
    );
  };

  const deleteNode = (nodeId) => {
    const nodeToDelete = nodes.find((node) => node.id === nodeId);
    if (!nodeToDelete) return;

    const { label } = nodeToDelete.data;

    if (label === 'Conditional') {
      const deleteSubtree = (id) => {
        const childEdges = edges.filter((edge) => edge.source === id);
        childEdges.forEach((edge) => deleteSubtree(edge.target));
        setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
        setEdges((prevEdges) =>
          prevEdges.filter((edge) => edge.source !== id && edge.target !== id)
        );
      };
      deleteSubtree(nodeId);
    } else {
      const parentEdges = edges.filter((edge) => edge.target === nodeId);
      const childEdges = edges.filter((edge) => edge.source === nodeId);
      const parentId = parentEdges.length > 0 ? parentEdges[0].source : null;
      const childId = childEdges.length > 0 ? childEdges[0].target : null;

      setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
      setEdges((prevEdges) =>
        prevEdges.filter(
          (edge) => edge.source !== nodeId && edge.target !== nodeId
        )
      );

      if (parentId && childId) {
        setEdges((prevEdges) => [
          ...prevEdges,
          {
            id: uuidv4(),
            source: parentId,
            target: childId,
            type: 'smoothstep',
          },
        ]);
      }
    }

    UpdateNodeAndEdge();
  };

  const nodeTypes = useMemo(
    () => ({
      custom: (props) => (
        <CustomNode
          {...props}
          addDelay={addDelay}
          edges={edges}
          save={saveValuetoNode}
          deleteNode={deleteNode}
          addNotification={addNotification}
          addConditional={addConditional}
        />
      ),
      startNode: (props) => (
        <StartNode
          {...props}
          addDelay={addDelay}
          edges={edges}
          addNotification={addNotification}
          addConditional={addConditional}
        />
      ),
      addNode: (props) => (
        <AddNode
          {...props}
          addDelay={addDelay}
          edges={edges}
          addNotification={addNotification}
          addConditional={addConditional}
        />
      ),
    }),
    [edges]
  );

  useEffect(() => {
    setNodes(reduxNodes || []);
    setEdges(reduxEdges || []);
  }, []);

  const UpdateNodeAndEdge = () => {
    dispatch(updateSequence({ nodes, edges }));
  };

  return (
    <Box
      sx={{
        marginTop: '15px',
        height: '74vh',
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </Box>
      {/* <Box
        mt={2}
        sx={{
          width: '100%',
          position: 'absolute',
          bottom: -45,
          height: '60px',
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f0f2f5',
        }}
      >
        <Button variant="outlined" size="large" onClick={PreviousPage}>
          Back
        </Button>
        <Button variant="contained" size="large" onClick={NextPage}>
          Next
        </Button>
      </Box> */}
    </Box>
  );
};

export default SequenceBoard;
