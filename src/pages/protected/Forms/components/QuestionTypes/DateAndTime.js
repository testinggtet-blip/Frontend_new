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
import {
  Calendar,
  CalendarCheck,
  ChevronDown,
  ChevronUp,
  Clock,
} from 'lucide-react';
import QuestionConditionalLogic from '../utils/QuestionConditionalLogic';
import QuestionBase from '../utils/QuestionBase';
import QuestionFooter from '../utils/QuestionFooter';
import QuestionHeader from '../utils/QuestionHeader';

export default function DateAndTime({
  question,
  questions,
  onChangeField,
  onDelete,
  isDefault,
  onActivate,
}) {
  const INPUT_TYPES = [
    { value: 'DD-MM-YYYY', label: 'DD-MM-YYYY' },
    { value: 'MM-DD-YYYY', label: 'MM-DD-YYYY' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
  ];

  const ICON_MAP = {
    'DD-MM-YYYY': <Calendar size={18} />,
    'MM-DD-YYYY': <Clock size={18} />,
    'YYYY-MM-DD': <CalendarCheck size={18} />,
  };

  const tabIndex = Math.max(
    0,
    INPUT_TYPES.findIndex((t) => t.value === question.format)
  );

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
          <QuestionBase question={question} onChangeField={onChangeField} />

          {/* Input Type Tabs */}
          <Box sx={{ mb: 2, width: '100%' }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Input type
            </Typography>
            <Tabs
              value={tabIndex}
              onChange={(e, idx) =>
                onChangeField(question.id, 'format', INPUT_TYPES[idx].value)
              }
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
              {INPUT_TYPES.map((t) => (
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
            {showAdvanced ? 'Hide Advanced settings' : 'Show Advanced settings'}
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
