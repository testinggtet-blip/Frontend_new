import React, { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Popover,
  Typography,
  Button,
  Dialog,
  TextField,
  Zoom,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CodeIcon from '@mui/icons-material/Code';
import DeleteIcon from '@mui/icons-material/Delete';
import { DateRangePicker } from './DateRangePicker';
import { SiteSelector } from './SiteSelector';
import toast from 'react-hot-toast';

export const Header = ({
  sites,
  selectedSite,
  onSiteChange,
  setRange,
  jsTag,
  onDeleteSite,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [editableCode, setEditableCode] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmSiteName, setConfirmSiteName] = useState('');
  const [siteNameError, setSiteNameError] = useState('');

  const handleDeleteSite = async () => {
    if (!selectedSite) return;

    if (confirmSiteName.trim() !== selectedSite.name.trim()) {
      setSiteNameError('Please type the correct site name to confirm');
      return;
    }

    try {
      await onDeleteSite(selectedSite.id);
      toast.success(`Site "${selectedSite.name}" deleted successfully!`);
    } catch (error) {
      toast.error(error.message || 'Failed to delete site');
    } finally {
      setDeleteDialogOpen(false);
      setConfirmSiteName('');
      setSiteNameError('');
    }
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (jsTag) {
      setEditableCode(jsTag.replace(/\\n/g, '\n'));
    }
  }, [jsTag]);

  const handleTogglePopover = (event) => {
    setAnchorEl(open ? null : event.currentTarget);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editableCode);
    toast.success('Copied sucessfully');
  };

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        px: 3,
        py: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <SiteSelector
        sites={sites}
        selectedSite={selectedSite}
        onSiteChange={onSiteChange}
      />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <DateRangePicker setRange={setRange} />

        {/* {jsTag && (
          <Tooltip title="Edit embed code">
            <IconButton onClick={handleTogglePopover}>
              <CodeIcon style={{ color: '#9ca3af' }} />
            </IconButton>
          </Tooltip>
        )} */}

        {selectedSite && (
          <Tooltip title="Delete Site">
            <IconButton
              onClick={() => setDeleteDialogOpen(true)}
              sx={{ color: 'error.main' }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            setDeleteDialogOpen(false);
            setConfirmSiteName('');
            setSiteNameError('');
          }
        }}
        TransitionComponent={Zoom}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            maxWidth: '450px',
            width: '90%',
            padding: '24px',
            boxShadow: `
              0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05)
            `,
            position: 'relative',
            overflow: 'hidden',
            elevation: 4,
          },
        }}
        maxWidth="xs"
        fullWidth
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              borderBottom: '1px solid rgba(0,0,0,0.1)',
              paddingBottom: '12px',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'error.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <DeleteOutlineIcon sx={{ color: 'error.main' }} />
              Delete Site
            </Typography>
            <IconButton
              onClick={() => {
                setDeleteDialogOpen(false);
                setConfirmSiteName('');
                setSiteNameError('');
              }}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.05)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ mb: 2 }}>
              To confirm deletion, please type the name of your site:
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {selectedSite?.name}
            </Typography>
            <TextField
              fullWidth
              label="Type site name to confirm"
              value={confirmSiteName}
              onChange={(e) => setConfirmSiteName(e.target.value)}
              error={!!siteNameError}
              helperText={siteNameError}
              sx={{ mb: 2 }}
            />
            <Typography sx={{ mt: 2, color: 'text.secondary' }}>
              This action will delete all log data that has been collected for
              it. This action is permanent and cannot be undone.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
              mt: 3,
            }}
          >
            <Button
              onClick={() => {
                setDeleteDialogOpen(false);
                setConfirmSiteName('');
                setSiteNameError('');
              }}
              variant="outlined"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '8px',
                padding: '10px 16px',
                minWidth: '120px',
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteSite}
              variant="contained"
              color="error"
              disabled={confirmSiteName.trim() !== selectedSite?.name.trim()}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '8px',
                padding: '10px 16px',
                minWidth: '120px',
                color: 'white',
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Dialog>

      {/* Enhanced Editable Code Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 2,
            p: 3,
            width: 500,
            maxHeight: '80vh',
            overflowY: 'auto',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              JavaScript Tracking Code
            </Typography>
            <IconButton onClick={() => setAnchorEl(null)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            copy the code snippet and paste it immediately before the closing
            &lt;/head&gt; tag (recommended)
          </Typography>

          <Box sx={{ position: 'relative' }}>
            <textarea
              value={editableCode}
              onChange={(e) => setEditableCode(e.target.value)}
              rows={10}
              style={{
                width: '100%',
                fontFamily: 'monospace',
                fontSize: '14px',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                resize: 'none',
                backgroundColor: '#f9fafb',
                outline: 'none',
                '&:focus': {
                  borderColor: '#4f46e5',
                  boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.1)',
                },
              }}
            />
          </Box>

          <Box
            sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'flex-end' }}
          >
            <Button
              onClick={handleCopy}
              variant="contained"
              color="primary"
              startIcon={<ContentCopyIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                borderRadius: '8px',
              }}
            >
              Copy Code
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};
