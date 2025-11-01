import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import Image from '../assets/Images/Common/NoRecordImage.png';
import PropTypes from 'prop-types';

const NoRecord = ({
  moduleName,
  title,
  description,
  buttonText,
  onAction,
  hideButton,
}) => {
  const displayTitle = title || `No ${moduleName} record found`;
  const displayDescription =
    description ||
    `Please click the button below to create a new ${moduleName}.`;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 6,
        px: 2,
        minHeight: '60vh',
      }}
    >
      {/* Illustration */}
      <Box
        component="img"
        src={Image}
        alt="No record illustration"
        sx={{
          width: { xs: 160, sm: 200 },
          height: 'auto',
          mb: 3,
          opacity: 0.9,
        }}
      />

      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: '1.25rem', sm: '1.5rem' },
          fontWeight: 600,
          mb: 1.5,
          color: 'text.primary',
        }}
      >
        {displayTitle}
      </Typography>

      {/* Description */}
      {!hideButton && (
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            fontSize: { xs: '0.95rem', sm: '1.05rem' },
            maxWidth: 600,
            lineHeight: 1.6,
            color: 'text.secondary',
          }}
        >
          {displayDescription}
        </Typography>
      )}

      {/* Action Button */}
      {!hideButton && onAction && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddToPhotosIcon />}
          onClick={onAction}
          sx={{
            px: 4,
            py: 1.4,
            fontSize: '1rem',
            textTransform: 'none',
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          {buttonText || 'Create'}
        </Button>
      )}
    </Box>
  );
};

NoRecord.propTypes = {
  moduleName: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  onAction: PropTypes.func,
  hideButton: PropTypes.bool,
};

NoRecord.defaultProps = {
  title: '',
  description: '',
  buttonText: 'Create',
  hideButton: false,
};

export default NoRecord;
