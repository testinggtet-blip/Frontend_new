import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Collapse,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import { Trash2, PlusIcon, ChevronUp, ChevronDown } from 'lucide-react';
import QuestionConditionalLogic from '../utils/QuestionConditionalLogic';
import QuestionBase from '../utils/QuestionBase';
import QuestionFooter from '../utils/QuestionFooter';
import QuestionHeader from '../utils/QuestionHeader';

export default function SingleSelect({
  question,
  questions,
  onChangeField,
  onDelete,
  isDefault,
  onActivate,
}) {
  const [expanded, setExpanded] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  /** 🔄 Normalize options so numbering is clean */
  const normalizeOptions = (opts) =>
    opts.map((opt, idx) =>
      /^Option\s\d+$/i.test(opt) ? `Option ${idx + 1}` : opt
    );

  const updateOption = (index, value) => {
    const updatedOptions = [...(question.options || [])];
    updatedOptions[index] = value;
    onChangeField(question.id, 'options', normalizeOptions(updatedOptions));
  };

  const removeOption = (index) => {
    const updatedOptions = (question.options || []).filter(
      (_, i) => i !== index
    );
    onChangeField(question.id, 'options', normalizeOptions(updatedOptions));
  };

  const addOption = (index) => {
    const currentOptions = question.options || [];
    const updatedOptions = [...currentOptions];
    // insert new option after index
    updatedOptions.splice(index + 1, 0, `Option ${index + 2}`);
    onChangeField(question.id, 'options', normalizeOptions(updatedOptions));
  };

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
          sx={{ py: 1.5, px: 2, display: 'flex', flexDirection: 'column' }}
        >
          <QuestionBase question={question} onChangeField={onChangeField} />

          {/* Options */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Options
            </Typography>
            {(question.options || []).map((opt, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 1,
                  '&:hover .action-buttons': { opacity: 1 },
                }}
              >
                <TextField
                  size="small"
                  value={opt}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  sx={{ flex: 1 }}
                />

                <Box
                  className="action-buttons"
                  sx={{
                    display: 'flex',
                    gap: 0.5,
                    opacity: 0,
                    transition: 'opacity 0.2s',
                  }}
                >
                  {question.options.length > 2 && (
                    <IconButton
                      size="small"
                      onClick={() => removeOption(index)}
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  )}
                  <IconButton size="small" onClick={() => addOption(index)}>
                    <PlusIcon size={16} />
                  </IconButton>
                </Box>
              </Box>
            ))}

            {/* If no options, allow adding one */}
            {(!question.options || question.options.length === 0) && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<PlusIcon size={14} />}
                onClick={() =>
                  onChangeField(question.id, 'options', ['Option 1'])
                }
              >
                Add Option
              </Button>
            )}
          </Box>

          {/* Advanced Settings Toggle */}
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
