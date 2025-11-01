import React, { useEffect, useState } from 'react';
import { Handle } from 'reactflow';
import { Box, Button, Card } from '@mui/material';

const StartNode = ({ data, addNotification, edges }) => {
  const [containsChild, setContainsChild] = useState(true);
  useEffect(() => {
    const haveChild = edges.filter((val) => val.source === data.id);
    setContainsChild(haveChild.length > 0);
  }, [edges]);

  return (
    <>
      <Card
        variant="outlined"
        sx={
          data.parent !== 'conditional'
            ? { width: 140, bgcolor: 'rgb(240,240,240)' }
            : {
                width: 140,
                bgcolor: 'rgba(0,0,0,0)',
                boxShadow: 0,
                border: '1px solid rgba(0, 0, 0, 0)',
              }
        }
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 1.5,
            alignItems: 'center',
            height: '100%',
          }}
        >
          {containsChild ? (
            <Button
              variant="contained"
              sx={{ bgcolor: '#033A32', fontSize: 6, py: 0.5 }}
            >
              Start
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => addNotification(data.id)}
              sx={{ bgcolor: '#033A32', fontSize: 6, py: 0.5 }}
            >
              Add Notification
            </Button>
          )}
        </Box>

        <Handle
          type="source"
          position="bottom"
          style={{
            background: '#555',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </Card>
    </>
  );
};

export default StartNode;
