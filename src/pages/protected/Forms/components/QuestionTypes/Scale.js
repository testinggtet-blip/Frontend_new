import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Collapse,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { ChevronDown, ChevronUp } from 'lucide-react';
import QuestionConditionalLogic from '../utils/QuestionConditionalLogic';
import QuestionBase from '../utils/QuestionBase';
import QuestionFooter from '../utils/QuestionFooter';
import QuestionHeader from '../utils/QuestionHeader';

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
