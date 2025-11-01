import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Collapse,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import { ChevronDown, ChevronUp } from 'lucide-react';
import QuestionConditionalLogic from '../utils/QuestionConditionalLogic';
import QuestionBase from '../utils/QuestionBase';
import QuestionFooter from '../utils/QuestionFooter';
import QuestionHeader from '../utils/QuestionHeader';
import { Type, Mail, Link, Hash, Phone } from 'lucide-react'; // example icons

const ICON_MAP = {
  text: <Type size={18} />,
  email: <Mail size={18} />,
  url: <Link size={18} />,
  number: <Hash size={18} />,
  phone: <Phone size={18} />,
};

const INPUT_TYPES = [
  { value: 'text', label: 'Text', placeholder: 'Enter your answer' },
  { value: 'email', label: 'Email', placeholder: 'example@email.com' },
  { value: 'url', label: 'URL', placeholder: 'https://example.com' },
  { value: 'number', label: 'Number', placeholder: 'Enter a number' },
  { value: 'phone', label: 'Phone', placeholder: 'Enter phone number' },
];

export default function FreeText({
  question,
  questions,
  onChangeField,
  onDelete,
  isDefault,
  onActivate,
}) {
  const [expanded, setExpanded] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const tabIndex = Math.max(
    0,
    INPUT_TYPES.findIndex((t) => t.value === question.format)
  );

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
        questions={questions}
        question={question}
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
          <QuestionBase question={question} onChangeField={onChangeField} />

          {/* Input Type Tabs */}
          <Box sx={{ mb: 2, width: '100%' }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Input type
            </Typography>
            <Tabs
              value={tabIndex}
              onChange={(e, idx) => {
                const selected = INPUT_TYPES[idx];
                onChangeField(question.id, 'format', selected.value);
                onChangeField(question.id, 'placeholder', selected.placeholder);
                if (selected.value !== 'text') {
                  onChangeField(question.id, 'longAnswer', false);
                }
              }}
              sx={{
                backgroundColor: '#f6f7f9',
                borderRadius: 2,
                minHeight: 50,
                '& .MuiTabs-flexContainer': {
                  gap: 1,
                  padding: '0 8px',
                },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  borderRadius: 1.5,
                  backgroundColor: '#e3e6e8',
                  minWidth: 0,
                  flexGrow: 1,
                  minHeight: 44,
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  color: '#374151',
                  transition: 'background-color 0.3s, color 0.3s',
                },
                '& .Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: '#fff !important',
                  boxShadow: '0 2px 8px rgb(30 41 59 / 0.24)',
                  '& svg': {
                    stroke: '#fff',
                  },
                },
              }}
            >
              {INPUT_TYPES?.map((t) => (
                <Tab
                  key={t.value}
                  label={t.label}
                  icon={ICON_MAP[t.value]}
                  iconPosition="start"
                  disableRipple
                />
              ))}
            </Tabs>
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

          {/* Uncomment and adapt for char limit input
          {question.hasCharLimit && (
            <TextField
              type="number"
              label="Max Characters"
              value={question.charLimit || ''}
              onChange={(e) => onChangeField(question.id, 'charLimit', Number(e.target.value))}
              InputProps={{ endAdornment: (<InputAdornment position="end">chars</InputAdornment>) }}
              sx={{ width: 200, mt: 1, ml: 'auto' }}
            />
          )}
          */}
        </CardContent>

        {/* Footer */}
        <QuestionFooter
          required={question.required}
          onRequiredChange={(checked) =>
            onChangeField(question.id, 'required', checked)
          }
          showLongAnswer={question.format === 'text'}
          longAnswer={question.longAnswer}
          onLongAnswerChange={(checked) =>
            onChangeField(question.id, 'longAnswer', checked)
          }
        />
      </Collapse>
    </Card>
  );
}
