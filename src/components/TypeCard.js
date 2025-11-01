import React from 'react';
import {
  Badge,
  Typography,
  Paper,
  Box,
  FormControlLabel,
  Radio,
} from '@mui/material';

export default function TypeCard({
  value,
  label,
  description,
  Icon,
  selected,
  disabled = false,
  onClick,
}) {
  return (
    <Badge
      badgeContent={
        disabled && (
          <Typography
            variant="caption"
            sx={{
              backgroundColor: 'red',
              color: 'white',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 'bold',
            }}
          >
            Coming Soon
          </Typography>
        )
      }
      sx={{
        position: 'relative',
        '& .MuiBadge-badge': {
          top: 20,
          right: 50,
          transform: 'translate(50%, -50%)',
        },
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          my: 2,
          borderColor: selected === value ? '#036355' : 'grey.300',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 2,
          transition: 'all 0.3s ease',
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
          '&:hover': {
            boxShadow: disabled ? 'none' : 2,
            borderColor: disabled ? 'grey.300' : '#036355',
          },
        }}
        onClick={() => !disabled && onClick?.(value)}
      >
        {Icon && (
          <Icon
            sx={{ mr: 2, color: selected === value ? '#036355' : 'grey.500' }}
          />
        )}
        <Box>
          <FormControlLabel
            value={value}
            control={<Radio disabled={disabled} checked={selected === value} />}
            label={
              <Typography sx={{ fontWeight: 'bold', color: 'black' }}>
                {label}
              </Typography>
            }
          />
          {description && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          )}
        </Box>
      </Paper>
    </Badge>
  );
}
