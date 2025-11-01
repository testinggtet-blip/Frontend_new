import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

const EditFeedModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 300,
          bgcolor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Hello World!</Typography>
      </Box>
    </Modal>
  );
};

export default EditFeedModal;
