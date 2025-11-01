import React, { useEffect, useState } from 'react';
import { Handle } from 'reactflow';
import { Card, IconButton, Menu, MenuItem } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { TbHierarchy2 } from 'react-icons/tb';
import { IoIosTimer } from 'react-icons/io';
import { BsFillSendFill } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

const AddNode = ({
  data,
  addDelay,
  addNotification,
  edges,
  addConditional,
}) => {
  const [containsChild, setContainsChild] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { pathname } = useLocation();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (val) => {
    setAnchorEl(null);
    if (val === 'Delay') {
      addDelay(data.id);
    }
    if (val === 'Conditional') {
      addConditional(data.id);
    }
    if (val === 'Notification') {
      addNotification(data.id);
    }
  };
  useEffect(() => {
    const haveChild = edges.filter((val) => val.source === data.id);
    setContainsChild(haveChild.length > 0);
  }, [edges]);
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          width: 140,
          bgcolor: 'rgba(0,0,0,0)',
          boxShadow: 0,
          border: '1px solid rgba(0, 0, 0, 0)',
        }}
      >
        <Handle
          type="target"
          position="top"
          style={{
            background: '#555',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />

        <Handle
          type="source"
          position="bottom"
          style={{
            background: '#555',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {!pathname.includes('review') && (
            <>
              {!containsChild && (
                <IconButton
                  style={{ pointerEvents: 'all' }}
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <AddCircleRoundedIcon
                    sx={{
                      pointerEvents: 'all',
                      zIndex: 4,
                      fontSize: 12,
                      bgcolor: 'white',
                      borderRadius: '50%',
                      color: 'black',
                    }}
                  />
                </IconButton>
              )}
            </>
          )}
        </Handle>
        <div>
          <Menu
            id="basic-men"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            sx={{ borderRadius: 4, color: 'black' }}
          >
            <MenuItem
              sx={{
                borderRadius: 2,
                mx: 1,
                display: 'flex',
                gap: 2,
                color: 'black',
              }}
              onClick={() => handleClose('Delay')}
            >
              <IoIosTimer /> Delay
            </MenuItem>
            <MenuItem
              sx={{
                borderRadius: 2,
                mx: 1,
                display: 'flex',
                gap: 2,
                color: 'black',
              }}
              onClick={() => handleClose('Conditional')}
            >
              {' '}
              <TbHierarchy2 /> Conditional
            </MenuItem>
            <MenuItem
              sx={{
                borderRadius: 2,
                mx: 1,
                display: 'flex',
                gap: 2,
                color: 'black',
              }}
              onClick={() => handleClose('Notification')}
            >
              {' '}
              <BsFillSendFill /> Notification
            </MenuItem>
          </Menu>
        </div>
      </Card>
    </>
  );
};

export default AddNode;
