import React, { useEffect, useState } from 'react';
import { Handle } from 'reactflow';
import {
  Box,
  Button,
  Card,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { BsFillSendFill } from 'react-icons/bs';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { TbHierarchy2 } from 'react-icons/tb';
import { IoIosTimer } from 'react-icons/io';
import AddCondition from '../Drawers/conditionDrawer';
import AddDelay from '../Drawers/delayDrawer';
import AddNotification from '../Drawers/notificationDrawer';
import { useLocation } from 'react-router-dom';

const CustomNode = ({
  data,
  addDelay,
  addNotification,
  edges,
  save,
  deleteNode,
  addConditional,
}) => {
  const [containsChild, setContainsChild] = useState(true);
  const [conditionalDrawer, setConditionalDrawer] = useState(false);
  const [notificationDrawer, setNotificationDrawer] = useState(false);
  const [delayDrawer, setDelayDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { pathname } = useLocation();
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
    setContainsChild(
      edges.filter((val) => val.source === data.id).length === 0
    );
  }, [edges]);

  const OpenDrawer = () => {
    if (data.label === 'Conditional') {
      setConditionalDrawer(true);
    }
    if (data.label === 'Delay') {
      setDelayDrawer(true);
    }
    if (data.label === 'Notification') {
      setNotificationDrawer(true);
    }
  };
  const CloseDrawer = () => {
    setConditionalDrawer(false);
    setDelayDrawer(false);
    setNotificationDrawer(false);
  };
  const saveData = (value) => {
    CloseDrawer();
    save(value, data.id);
  };
  const deleteById = () => {
    deleteNode(data.id);
  };
  return (
    <>
      <AddCondition
        deletenode={deleteById}
        data={data.value}
        saveData={saveData}
        close={CloseDrawer}
        open={conditionalDrawer}
      />
      <AddDelay
        deletenode={deleteById}
        data={data.value}
        saveData={saveData}
        close={CloseDrawer}
        open={delayDrawer}
      />
      <AddNotification
        deletenode={deleteById}
        saveData={saveData}
        close={CloseDrawer}
        open={notificationDrawer}
      />
      <Card variant="outlined" sx={{ width: 140, bgcolor: 'rgb(240,240,240)' }}>
        <Box
          sx={{
            height: 20,
            display: 'flex',
            px: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ fontSize: 8 }} variant="p">
            {data.label}
          </Typography>
          {!pathname.includes('review') && (
            <Button
              sx={{ padding: 0.2, minWidth: 0, pointerEvents: 'all' }}
              variant="text"
            >
              <TuneIcon
                onClick={OpenDrawer}
                sx={{ color: 'black', fontSize: '10px' }}
              />
            </Button>
          )}
        </Box>
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              bgcolor: 'white',
              px: 1,
              py: 0.8,
              height: '100%',
              borderRadius: 1,
            }}
          >
            {data.label === 'Conditional' && (
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {' '}
                <Typography sx={{ fontSize: 7 }} variant="p">
                  Trigger on:{' '}
                  <span className="text-teal-600">{data.value.trigger}</span>
                </Typography>
                <Typography sx={{ fontSize: 7 }} variant="p">
                  Waiting time:{' '}
                  <span className="text-teal-600">
                    {data.value.waitingTime} {data.value.waitingTimeType}
                  </span>
                </Typography>
              </Box>
            )}
            {data.label === 'Delay' && (
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ fontSize: 7 }} variant="p">
                  Waiting time:{' '}
                  <span className="text-teal-600">
                    {data.value.waitingTime} {data.value.waitingTimeType}
                  </span>
                </Typography>
              </Box>
            )}
            {data.label === 'Notification' && (
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ fontSize: 7 }} variant="p">
                  Template name:{' '}
                  <span className="text-teal-600">
                    {data.value.templateId?.templateName}{' '}
                    {data.value.waitingTimeType}
                  </span>
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
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
              {containsChild && (
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
          {data.label !== 'Delay' && (
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
          )}
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
            <BsFillSendFill /> Notification
          </MenuItem>
        </Menu>
      </Card>
    </>
  );
};

export default CustomNode;
