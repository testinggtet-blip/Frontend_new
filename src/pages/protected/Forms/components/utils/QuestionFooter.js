import React from 'react';
import { Box, Switch, FormControlLabel, Divider } from '@mui/material';

export default function QuestionCardFooter({
  required,
  onRequiredChange,
  showLongAnswer,
  longAnswer,
  onLongAnswerChange,
}) {
  return (
    <>
      <Divider sx={{ mt: 2 }} />
      <Box
        sx={{
          p: 1.25,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {showLongAnswer && (
            <FormControlLabel
              control={
                <Switch
                  checked={!!longAnswer}
                  onChange={(e) => onLongAnswerChange?.(e.target.checked)}
                  color="primary"
                  size="small"
                />
              }
              label="Long answer"
              sx={{ mr: 2 }}
            />
          )}
          <FormControlLabel
            control={
              <Switch
                checked={!!required}
                onChange={(e) => onRequiredChange(e.target.checked)}
                color="primary"
                size="small"
              />
            }
            label="Required"
          />
        </Box>
      </Box>
    </>
  );
}
