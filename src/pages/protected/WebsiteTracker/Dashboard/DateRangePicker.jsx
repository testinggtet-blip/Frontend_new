import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Popper,
  Paper,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Grow,
  Typography,
} from '@mui/material';
import { Calendar, ChevronDown } from 'lucide-react';

export const DateRangePicker = ({ setRange }) => {
  const [selectedRange, setSelectedRange] = useState('Last 7 days');
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const ranges = [
    { name: 'Today', value: 'today' },
    { name: 'Yesterday', value: 'yesterday' },
    { name: 'Last 7 days', value: 'last7' },
    { name: 'Last 30 days', value: 'last30' },
    // { name: 'Last 3 months', value: 'last90' },
    // { name: 'Last 12 months', value: 'last365' },
    // { name: 'Custom range', value: 'custom' },
  ];

  const handleToggle = () => setOpen((prev) => !prev);

  const handleClose = (event) => {
    if (anchorRef.current?.contains(event.target)) return;
    setOpen(false);
  };

  const handleSelect = (rangeObj) => {
    setSelectedRange(rangeObj.name);
    setRange(rangeObj.value);
    setOpen(false);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        ref={anchorRef}
        onClick={handleToggle}
        variant="outlined"
        sx={{
          px: 2,
          py: 1,
          gap: 1,
          backgroundColor: '#fff',
          borderColor: '#d1d5db',
          textTransform: 'none',
          minWidth: 180,
        }}
      >
        <Calendar size={16} color="#6b7280" />
        <Typography variant="body2" fontWeight={500} color="text.primary">
          {selectedRange}
        </Typography>
        <ChevronDown size={16} color="#6b7280" />
      </Button>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        transition
        style={{ zIndex: 10 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper
              sx={{
                mt: 1,
                width: 200,
                border: '1px solid #e5e7eb',
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList dense disablePadding>
                  {ranges.map((range) => (
                    <MenuItem
                      key={range.value}
                      onClick={() => handleSelect(range)}
                      selected={selectedRange === range.name}
                      sx={{
                        px: 2,
                        py: 1.25,
                        fontSize: '0.875rem',
                        color:
                          selectedRange === range.name
                            ? 'primary.main'
                            : 'text.primary',
                        backgroundColor:
                          selectedRange === range.name
                            ? 'rgba(59,130,246,0.1)'
                            : '',
                      }}
                    >
                      {range.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};
