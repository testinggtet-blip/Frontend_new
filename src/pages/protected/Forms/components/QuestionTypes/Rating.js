import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Collapse,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { ChevronDown, ChevronUp } from 'lucide-react';
import QuestionConditionalLogic from '../utils/QuestionConditionalLogic';
import QuestionBase from '../utils/QuestionBase';
import QuestionFooter from '../utils/QuestionFooter';
import QuestionHeader from '../utils/QuestionHeader';

// These can be pulled to a constants file if shared
const SCALE_TYPES = [
  { value: 'star', label: 'Star', icon: '⭐' },
  { value: 'smiley', label: 'Smiley', icon: '😊' },
  // add more if you need
];
const RANGE_OPTIONS = [
  { value: 3, label: '3 points' },
  { value: 5, label: '5 points' },
  { value: 7, label: '7 points' },
  { value: 10, label: '10 points' },
  // add more ranges if needed
];

export default function Rating({
  question,
  questions,
  onChangeField,
  onDelete,
  isDefault,
  onActivate,
}) {
  const [expanded, setExpanded] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <Card
      sx={{ mb: 1, boxShadow: 2, borderRadius: 2, backgroundColor: '#fff' }}
    >
      {/* Header */}
      <QuestionHeader
        label={question.label?.trim() || 'Untitled Question'}
        type={question.type || 'text'}
        required={question.required}
        isDefault={isDefault}
        onClick={() => {
          setExpanded((prev) => !prev);
          onActivate?.();
        }}
        onDelete={() => onDelete(question.id)}
      />

      {/* Content */}
      <Collapse in={expanded}>
        <CardContent
          sx={{
            py: 1.5,
            px: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/*--- Shared basic question stuff (label, description, etc.) ---*/}
          <QuestionBase
            question={question}
            onChangeField={onChangeField}
            hideTypes
          />

          <Grid container spacing={2}>
            {/* Scale selector */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Scale</InputLabel>
                <Select
                  value={question.scaleType || 'star'}
                  label="Scale"
                  onChange={(e) =>
                    onChangeField(question.id, 'scaleType', e.target.value)
                  }
                >
                  {SCALE_TYPES.map((st) => (
                    <MenuItem key={st.value} value={st.value}>
                      {st.icon} {st.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Range selector */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Range</InputLabel>
                <Select
                  value={question.range || 10}
                  label="Range"
                  onChange={(e) =>
                    onChangeField(question.id, 'range', e.target.value)
                  }
                >
                  {RANGE_OPTIONS.map((ro) => (
                    <MenuItem key={ro.value} value={ro.value}>
                      {ro.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Lower label */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Lower Label"
                value={question.lowerLabel || ''}
                onChange={(e) =>
                  onChangeField(question.id, 'lowerLabel', e.target.value)
                }
                fullWidth
              />
            </Grid>
            {/* Upper label */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Upper Label"
                value={question.upperLabel || ''}
                onChange={(e) =>
                  onChangeField(question.id, 'upperLabel', e.target.value)
                }
                fullWidth
              />
            </Grid>
          </Grid>

          {/* Advanced settings */}
          <Button
            variant="text"
            disableRipple
            startIcon={
              showAdvanced ? <ChevronUp size={20} /> : <ChevronDown size={20} />
            }
            onClick={() => setShowAdvanced((prev) => !prev)}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              borderRadius: 1,
              mb: 1,
              fontWeight: 600,
              color: 'text.primary',
              backgroundColor: 'transparent',
              transition: 'all 0.3s ease',
              width: 'fit-content', // 👈 button only as wide as its content
              alignSelf: 'flex-start', // 👈 keeps it left-aligned in flex parent
            }}
          >
            {showAdvanced ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
          </Button>

          {/* Conditional Logic */}
          <Collapse in={showAdvanced} unmountOnExit>
            <Box sx={{ mt: 1 }}>
              <QuestionConditionalLogic
                questionId={question.id}
                logic={question.logic || []}
                onChangeField={onChangeField}
                questions={questions}
                question={question}
                showAdvanced={showAdvanced}
              />
            </Box>
          </Collapse>
        </CardContent>

        {/* Footer */}
        <QuestionFooter
          required={question.required}
          onRequiredChange={(checked) =>
            onChangeField(question.id, 'required', checked)
          }
          showLongAnswer={question.type === 'text'}
          longAnswer={question.longAnswer}
          onLongAnswerChange={(checked) =>
            onChangeField(question.id, 'longAnswer', checked)
          }
        />
      </Collapse>
    </Card>
  );
}
