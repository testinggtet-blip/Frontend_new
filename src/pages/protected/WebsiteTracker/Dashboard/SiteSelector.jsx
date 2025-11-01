import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Popper,
  Paper,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Grow,
} from '@mui/material';
import { Globe, ChevronDown, Check } from 'lucide-react';

export const SiteSelector = ({ sites, selectedSite, onSiteChange }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);

  const activeSites = Array.isArray(sites)
    ? sites.filter((site) => site.status === 'active')
    : [];

  const handleToggle = () => {
    setOpen(false);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  const handleSelect = (site) => {
    onSiteChange(site);
    setOpen(false);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        ref={anchorRef}
        onClick={handleToggle}
        variant="outlined"
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 2,
          minWidth: 220,
          padding: '8px 12px',
          borderColor: '#e5e7eb',
          backgroundColor: '#f9fafb',
          textTransform: 'none',
          borderRadius: 2,
        }}
      >
        <Globe size={16} color="#6b7280" />
        <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
          <Typography variant="body2" fontWeight={500} color="text.primary">
            {selectedSite?.name || 'Select a site'}
          </Typography>
          {selectedSite?.url && (
            <Typography variant="body2" color="text.secondary" noWrap>
              {selectedSite.url}
            </Typography>
          )}
        </Box>
        <ChevronDown size={16} color="#6b7280" />
      </Button>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        transition
        style={{ zIndex: 20 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper
              sx={{
                mt: 1,
                width: 320,
                border: '1px solid #e5e7eb',
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Box p={1}>
                  <Typography
                    variant="caption"
                    fontWeight={600}
                    color="text.secondary"
                    sx={{ textTransform: 'uppercase', p: 1 }}
                  >
                    Active Sites ( {activeSites.length} )
                  </Typography>
                  <MenuList dense disablePadding>
                    {activeSites?.map((site) => (
                      <MenuItem
                        key={site.id}
                        onClick={() => handleSelect(site)}
                        selected={selectedSite?.id === site.id}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-center',
                          p: 1,
                          mt: 1,
                          borderRadius: 1,
                          gap: 1,
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          },
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            color="black"
                            fontWeight={600}
                          >
                            {site.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {site.url}
                          </Typography>
                        </Box>
                        {selectedSite?.id === site.id && (
                          <Check size={16} color="#2563eb" />
                        )}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};
