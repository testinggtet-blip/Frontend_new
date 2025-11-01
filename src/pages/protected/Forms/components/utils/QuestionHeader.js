import React from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import { Trash } from 'lucide-react';
import { QUESTION_TYPES } from '../../CreateFormModal';

const QuestionHeader = ({
  label = 'Untitled Question',
  type,
  required = false,
  isDefault = false,
  onClick,
  onDelete,
}) => {
  const typeConfig = QUESTION_TYPES.find((t) => t.value === type);
  const IconComponent = typeConfig?.icon;

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'box-shadow 0.15s, background 0.15s',
        backgroundColor: '#fff',
        '&:hover': { backgroundColor: '#F2F3F4' },
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        {IconComponent && (
          <IconComponent size={20} color="green" style={{ marginRight: 2 }} />
        )}
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            mx: 1,
            height: 40,
            alignSelf: 'stretch',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            p: 0.5,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: 18,
              flexGrow: 1,
              color: '#000',
              fontWeight: 500,
              lineHeight: 1.1,
            }}
          >
            {label?.trim() || 'Untitled Question'}
          </Typography>
          <Typography
            variant="body2"
            sx={{ px: 1, color: '#000', lineHeight: 1.1, mt: 0.2 }}
          >
            {required ? 'Required' : 'Optional'}
          </Typography>
        </Box>
      </Box>

      {!isDefault && (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
        >
          <Trash size={18} />
        </IconButton>
      )}
    </Box>
  );
};

export default QuestionHeader;
