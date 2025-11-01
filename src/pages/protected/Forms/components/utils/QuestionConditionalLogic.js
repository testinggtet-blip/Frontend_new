import React from 'react';
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Select,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { Plus, Split, Trash, Info } from 'lucide-react';

const ACTIONS = [{ value: 'jump_to', label: 'Jump to question' }];

const getOperatorOptions = (questionType) => {
  switch (questionType) {
    case 'text':
      return [
        { value: 'equals', label: 'Equals' },
        { value: 'not_equals', label: 'Not equals' },
        { value: 'contains', label: 'Contains' },
      ];
    case 'rating':
    case 'scale':
    case 'dateAndTime':
      return [
        { value: 'equals', label: 'Equals' },
        { value: 'not_equals', label: 'Not equals' },
        { value: 'greater_than', label: 'Greater than' },
        { value: 'less_than', label: 'Less than' },
      ];
    case 'single_select':
    case 'multi_select':
      return [
        { value: 'equals', label: 'Equals' },
        { value: 'not_equals', label: 'Not equals' },
      ];
    default:
      return [
        { value: 'equals', label: 'Equals' },
        { value: 'not_equals', label: 'Not equals' },
      ];
  }
};

export default function ConditionalLogicEditor({
  questionId,
  logic = [],
  onChangeField,
  questions,
  question,
  onCreateNewQuestion,
}) {
  const getQuestionType = (id) => {
    const q = questions.find((q) => q.id === id);
    return q ? q.type : null;
  };

  const canAddLogic = () => {
    const existingQuestionIds = logic.map((l) => l.when.questionId);
    return !existingQuestionIds.includes(questionId);
  };

  const updateLogic = (index, path, value) => {
    const updatedLogic = [...logic];
    const keys = path.split('.');
    let ref = updatedLogic[index];
    keys.slice(0, -1).forEach((k) => (ref = ref[k]));
    ref[keys.at(-1)] = value;
    onChangeField(questionId, 'logic', updatedLogic);
  };

  const addLogic = () => {
    if (!canAddLogic()) return;
    onChangeField(questionId, 'logic', [
      ...logic,
      {
        when: { questionId: questionId, operator: '', value: '' },
        then: { action: '', targetQuestionId: '' },
      },
    ]);
  };

  const removeLogic = (index) => {
    onChangeField(
      questionId,
      'logic',
      logic.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          "Next" button label
        </Typography>

        <TextField
          fullWidth
          size="small"
          value={question.nextButton || ''}
          onChange={(e) =>
            onChangeField(questionId, 'nextButton', e.target.value)
          }
        />

        {question?.id !== 1 && (
          <>
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
              "Back" button label
            </Typography>
            <TextField
              size="small"
              fullWidth
              value={question.backButton || ''}
              onChange={(e) =>
                onChangeField(questionId, 'backButton', e.target.value)
              }
            />
          </>
        )}
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="h6" gutterBottom>
          Conditional Logic
        </Typography>
        <Split size={20} style={{ transform: 'rotate(90deg)' }} />
      </Box>

      <Box>
        {logic.length > 0 &&
          logic.map((rule = {}, index) => {
            const when = rule.when || { questionId, operator: '', value: '' };
            const then = rule.then || { action: '', targetQuestionId: '' };

            const whenQuestionType = getQuestionType(when.questionId);
            const operatorOptions = getOperatorOptions(whenQuestionType);

            const whenIndex = questions.findIndex(
              (q) => q.id === when.questionId
            );
            const filteredThenQuestions = questions.filter(
              (_, idx) => idx > whenIndex
            );
            const hasNextQuestions = filteredThenQuestions.length > 0;

            return (
              <Box
                key={index}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                  p: 2.5,
                  mb: 2,
                  backgroundColor: '#fafafa',
                  boxShadow: '0px 1px 3px rgba(0,0,0,0.08)',
                  position: 'relative',
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    {/* <Split size={18} style={{ transform: 'rotate(90deg)' }} /> */}
                    <Typography variant="subtitle1" fontWeight={600}>
                      {/* Rule header */}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => removeLogic(index)}
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'error.main',
                        background: 'transparent',
                      },
                    }}
                  >
                    <Trash size={16} />
                  </IconButton>
                </Box>

                {/* WHEN row */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1.5,
                    alignItems: 'center',
                    mb: 1.5,
                  }}
                >
                  <Typography sx={{ whiteSpace: 'nowrap', fontWeight: 500 }}>
                    When
                  </Typography>
                  <Select
                    size="small"
                    value={when.questionId}
                    onChange={(e) =>
                      updateLogic(index, 'when.questionId', e.target.value)
                    }
                    sx={{ minWidth: 180 }}
                  >
                    {/* Active question only */}
                    <MenuItem value={questionId}>
                      {questions.find((q) => q.id === questionId)?.label || ''}
                    </MenuItem>
                  </Select>

                  <Select
                    size="small"
                    value={when.operator}
                    onChange={(e) =>
                      updateLogic(index, 'when.operator', e.target.value)
                    }
                    // displayEmpty
                    sx={{ minWidth: 160 }}
                  >
                    {operatorOptions.map((op) => (
                      <MenuItem key={op.value} value={op.value}>
                        {op.label}
                      </MenuItem>
                    ))}
                  </Select>

                  <TextField
                    size="small"
                    value={when.value}
                    placeholder="Value"
                    onChange={(e) =>
                      updateLogic(index, 'when.value', e.target.value)
                    }
                    sx={{ flex: 1 }}
                    type={
                      ['rating', 'scale', 'dateAndTime'].includes(
                        whenQuestionType
                      )
                        ? 'number'
                        : 'text'
                    }
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                  <Typography sx={{ whiteSpace: 'nowrap', fontWeight: 500 }}>
                    Then
                  </Typography>
                  <Select
                    size="small"
                    placeholder="Select Action"
                    value={then.action}
                    onChange={(e) =>
                      updateLogic(index, 'then.action', e.target.value)
                    }
                    sx={{ minWidth: 180 }}
                  >
                    {ACTIONS.map((a) => (
                      <MenuItem key={a.value} value={a.value}>
                        {a.label}
                      </MenuItem>
                    ))}
                  </Select>

                  <Select
                    size="small"
                    value={then.targetQuestionId}
                    onChange={(e) =>
                      updateLogic(
                        index,
                        'then.targetQuestionId',
                        e.target.value
                      )
                    }
                    // displayEmpty
                    sx={{ minWidth: 180 }}
                  >
                    {hasNextQuestions ? (
                      filteredThenQuestions.map((q) => (
                        <MenuItem key={q.id} value={q.id}>
                          {q.label}
                        </MenuItem>
                      ))
                    ) : (
                      <>
                        <MenuItem disabled>
                          No next questions available - create a new question
                        </MenuItem>
                        {onCreateNewQuestion && (
                          <MenuItem
                            onClick={onCreateNewQuestion}
                            sx={{ color: 'primary.main' }}
                          >
                            + Create new question
                          </MenuItem>
                        )}
                      </>
                    )}
                  </Select>

                  <Tooltip title="Only questions below the selected one will be shown">
                    <Info
                      size={16}
                      style={{ cursor: 'pointer', color: '#666' }}
                    />
                  </Tooltip>
                </Box>
              </Box>
            );
          })}
      </Box>

      <Button
        variant="contained"
        size="small"
        endIcon={<Plus size={18} style={{ transform: 'rotate(90deg)' }} />}
        sx={{
          mb: 2,
          alignSelf: 'flex-start',
          textTransform: 'none',
          borderRadius: 1,
          transition: 'background-color 0.3s',
        }}
        onClick={addLogic}
        disabled={!canAddLogic()}
      >
        Add Logic
      </Button>
    </>
  );
}
