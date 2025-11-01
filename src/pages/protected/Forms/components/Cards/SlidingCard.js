import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Button,
  Typography,
  TextField,
  LinearProgress,
  Paper,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { buildStepsFromSurvey } from '../utils/QuestionStateBuilder';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { tableScrollbar } from 'components/Style';
import toast from 'react-hot-toast';
import { SaveFormResponse } from 'Api/Api';

function checkCondition(condition, answers) {
  if (!condition || !condition.when) return false;
  const { when } = condition;
  const answer = answers[String(when.questionId)];

  if (answer === undefined || answer === null || answer === '') return false;
  const normalize = (val) => String(val).trim().toLowerCase();

  switch ((when.operator || '').toLowerCase()) {
    case 'equals':
      if (Array.isArray(answer))
        return answer.some((a) => normalize(a) === normalize(when.value));
      return normalize(answer) === normalize(when.value);

    case 'not_equals':
      if (Array.isArray(answer))
        return !answer.some((a) => normalize(a) === normalize(when.value));
      return normalize(answer) !== normalize(when.value);

    case 'contains':
      if (typeof answer === 'string' && typeof when.value === 'string')
        return normalize(answer).includes(normalize(when.value));
      return false;

    case 'greater_than':
      return Number(answer) > Number(when.value);

    case 'less_than':
      return Number(answer) < Number(when.value);

    default:
      return false;
  }
}

const moods = [
  { icon: <SentimentVeryDissatisfiedIcon fontSize="inherit" />, color: 'red' },
  {
    icon: <SentimentDissatisfiedIcon fontSize="inherit" />,
    color: 'orangered',
  },
  { icon: <SentimentNeutralIcon fontSize="inherit" />, color: 'orange' },
  { icon: <SentimentSatisfiedIcon fontSize="inherit" />, color: 'yellowgreen' },
  { icon: <SentimentVerySatisfiedIcon fontSize="inherit" />, color: 'green' },
];

const getMood = (index, range) => {
  const ratio = (index - 1) / (range - 1); // 0 → 1
  const moodIndex = Math.round(ratio * (moods.length - 1));
  return moods[moodIndex];
};

const SlidingCard = ({ survey, preview, connectionId, fullScreen = false }) => {
  const [steps, setSteps] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const singleSelectErrorRef = useRef(null);
  const multiSelectErrorRef = useRef(null);

  useEffect(() => {
    if (!survey) return setSteps([]);
    const s = buildStepsFromSurvey(survey);
    setSteps(s);
    setIndex(0);
    setAnswers({});
    setErrors({});
  }, [survey]);

  useEffect(() => {
    if (steps.length > 0) {
      const initial = {};
      steps.forEach((step) => {
        if (step.type !== 'welcomeCard' && step.type !== 'endCard') {
          initial[String(step.id)] = '';
        }
      });
      setAnswers((prev) => ({ ...initial, ...prev }));
    }
  }, [steps, setAnswers]);

  useEffect(() => {
    const currentStep = steps[index];
    if (!currentStep) return;
    const err = errors[String(currentStep.id)];
    if (!err) return;

    if (currentStep.type === 'single_select' && singleSelectErrorRef.current) {
      singleSelectErrorRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else if (
      currentStep.type === 'multi_select' &&
      multiSelectErrorRef.current
    ) {
      multiSelectErrorRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [errors, index, steps]);

  const currentStep = steps[index];
  if (!currentStep) return null;

  const handleChange = (value, questionId) => {
    const key = String(questionId);
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (step, value) => {
    if (!step || !step.required) return true;
    switch (step.type) {
      case 'text':
      case 'dateAndTime':
        return (
          value !== undefined && value !== null && String(value).trim() !== ''
        );
      case 'rating':
      case 'scale':
        return (
          value !== undefined && value !== null && !Number.isNaN(Number(value))
        );
      case 'single_select':
        return value !== undefined && value !== null && String(value) !== '';
      case 'multi_select':
        return Array.isArray(value) && value.length > 0;
      default:
        return true;
    }
  };

  const nextStep = () => {
    const step = currentStep;
    const key = String(step.id);
    const val = answers[key];

    if (!validate(step, val)) {
      setErrors((prev) => ({ ...prev, [key]: 'This question is required' }));
      return;
    }

    const logicForThisStep = Array.isArray(step.logic) ? step.logic : [];
    for (const condition of logicForThisStep) {
      const whenQid = String(condition?.when?.questionId);
      if (whenQid !== String(step.id)) {
        continue;
      }

      if (checkCondition(condition, answers)) {
        const then = condition.then || {};
        if (then.action === 'jump_to' && then.targetQuestionId !== undefined) {
          const targetId = String(then.targetQuestionId);
          const targetIndex = steps.findIndex((s) => String(s.id) === targetId);
          if (targetIndex !== -1) {
            setIndex(targetIndex);
            return;
          } else {
          }
        }
      }
    }

    if (index < steps.length - 1) {
      setIndex(index + 1);
    }
  };

  const prevStep = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleSubmit = async () => {
    try {
      // if (preview === true || preview === 'true') {
      //   toast.error('Preview mode — responses are not saved.');
      //   return;
      // }
      let formData = new FormData();
      Object.entries(answers).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await SaveFormResponse(survey?.uniqueFormId, answers); // Or formData if API expects FormData
      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        setAnswers({});
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const renderQuestion = (step, value, onChange) => {
    switch (step.type) {
      case 'text': {
        let inputType = 'text';
        if (['email', 'phone', 'url', 'number'].includes(step.format)) {
          inputType = step.format;
        }

        return (
          <TextField
            type={inputType}
            value={value || ''}
            onChange={(e) => onChange(e.target.value, step.id)}
            fullWidth
            placeholder={step.placeholder || 'example@email.com'}
            multiline={!!step.longAnswer}
            rows={step.longAnswer && fullScreen ? 3 : 2}
            variant="outlined"
            error={!!errors[step.id]}
            helperText={errors[step.id]}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
              mt: fullScreen ? '' : 0.5,
              mb: errors[step.id] ? 1.5 : 0,
            }}
          />
        );
      }

      case 'rating':
        return (
          <Box sx={{ width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'start',
                mt: fullScreen ? 2.5 : 3,
                height: { xs: '90px', md: fullScreen ? '70px' : '50px' },
              }}
            >
              {step.scaleType === 'star' ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: fullScreen ? 2 : 0,
                  }}
                >
                  {Array.from({ length: step.range }, (_, i) => (
                    <Box
                      key={i}
                      onClick={() => onChange(i + 1, step.id)}
                      sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <StarIcon
                        sx={{
                          fontSize: fullScreen ? '4rem' : '3rem',
                          color: value >= i + 1 ? '#FFD700' : '#e0e0e0',
                          transition: 'color 0.2s, transform 0.2s',
                          '&:hover': {
                            color: '#FFB400',
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: fullScreen ? 2 : 0,
                  }}
                >
                  {Array.from({ length: step.range }, (_, i) => {
                    const { icon, color } = getMood(i + 1, step.range);
                    return (
                      <Box
                        key={i}
                        onClick={() => onChange(i + 1, step.id)}
                        sx={{
                          flex: 1,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          cursor: 'pointer',
                          fontSize: fullScreen ? '4rem' : '3rem',
                          color: value === i + 1 ? color : 'lightgray',
                          transition: 'color 0.2s, transform 0.2s',
                          '&:hover': { color, transform: 'scale(1.1)' },
                        }}
                      >
                        {icon}
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                mt: fullScreen ? 2 : 1,
                px: fullScreen ? 4 : 1,
              }}
            >
              <Typography
                sx={{
                  minWidth: '80px',
                  mr: 1,
                  alignSelf: 'flex-end',
                  fontSize: fullScreen ? '1.2rem' : '1rem',
                }}
                color="text.secondary"
              >
                {step.lowerLabel}
              </Typography>
              <Typography
                sx={{
                  minWidth: '80px',
                  mr: 1,
                  alignSelf: 'flex-end',
                  fontSize: fullScreen ? '1.2rem' : '1rem',
                }}
                color="text.secondary"
              >
                {step.upperLabel}
              </Typography>
            </Box>
            {errors[step.id] && (
              <Typography
                color="error"
                sx={{ fontSize: 14, mt: 1, textAlign: 'center' }}
              >
                {errors[step.id]}
              </Typography>
            )}
          </Box>
        );

      case 'scale':
        return (
          <Box sx={{ width: '100%' }}>
            {/* Scale (0–10 buttons) */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                gap: fullScreen ? 1 : 0.5,
              }}
            >
              {Array.from({ length: step.range ?? 11 }, (_, i) => (
                <Box
                  key={i}
                  onClick={() => onChange(i, step.id)}
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    mt: fullScreen ? 3 : 2,
                    height: fullScreen ? 50 : 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: fullScreen ? '1.1rem' : '1rem',
                    fontWeight: value === i ? 600 : 400,
                    backgroundColor: value === i ? '#4a5b78' : 'white',
                    color: value === i ? 'white' : 'black',
                    '&:hover': {
                      borderColor: '#4a5b78',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  {i}
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                mt: fullScreen ? 2 : 1,
                px: fullScreen ? 4 : 1,
              }}
            >
              <Typography
                variant={fullScreen ? 'body1' : 'body2'}
                color="text.secondary"
              >
                {step.lowerLabel}
              </Typography>
              <Typography
                variant={fullScreen ? 'body1' : 'body2'}
                color="text.secondary"
              >
                {step.upperLabel}
              </Typography>
            </Box>
            {errors[step.id] && (
              <Typography
                color="error"
                sx={{ fontSize: 14, mt: 1, textAlign: 'center' }}
              >
                {errors[step.id]}
              </Typography>
            )}
          </Box>
        );

      case 'single_select':
        return (
          <FormControl component="fieldset" fullWidth>
            <Box
              sx={{
                maxHeight: fullScreen ? 400 : 250,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: fullScreen ? 3 : 2,
                px: fullScreen ? 1 : 0,
                py: 0.5,
                pr: 1.5,
                ...tableScrollbar,
              }}
            >
              <RadioGroup
                value={value || ''}
                onChange={(e) => onChange(e.target.value, step.id)}
              >
                {step.options.map((opt, i) => (
                  <Paper
                    key={i}
                    elevation={0}
                    sx={{
                      p: fullScreen ? 1.5 : 1,
                      mb: fullScreen ? 1.5 : 1,
                      borderRadius: 2,
                      border: '1px solid #ddd',
                      display: 'flex',
                      alignItems: 'center',
                      transition: '0.2s',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <FormControlLabel
                      value={opt}
                      control={<Radio />}
                      label={opt}
                      sx={{
                        flex: 1,
                        m: 0,
                        '& .MuiTypography-root': {
                          fontSize: fullScreen ? '1.2rem' : '1rem',
                          color: 'black',
                        },
                      }}
                    />
                  </Paper>
                ))}
              </RadioGroup>
            </Box>
            {errors[step.id] && (
              <Typography
                color="error"
                sx={{ fontSize: 14, mt: 1 }}
                ref={singleSelectErrorRef}
              >
                {errors[step.id]}
              </Typography>
            )}
          </FormControl>
        );

      case 'multi_select':
        return (
          <Box
            sx={{
              maxHeight: fullScreen ? 400 : 250,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: fullScreen ? 0.5 : 0,
              px: fullScreen ? 1 : 0,
              py: 0.5,
              pr: 1.5,
              ...tableScrollbar,
            }}
          >
            {step.options.map((opt, i) => {
              const isSelected = Array.isArray(value) && value.includes(opt);
              return (
                <Box
                  key={i}
                  onClick={() => {
                    let newVal = Array.isArray(value) ? [...value] : [];
                    if (newVal.includes(opt)) {
                      newVal = newVal.filter((o) => o !== opt);
                    } else {
                      newVal.push(opt);
                    }
                    onChange(newVal, step.id);
                  }}
                  sx={{
                    p: fullScreen ? 2.5 : 1.8,
                    mb: fullScreen ? 1.5 : 1,
                    borderRadius: 2,
                    border: `1px solid ${isSelected ? '#058270' : '#e0e0e0'}`,
                    display: 'flex',
                    alignItems: 'center',
                    transition: '0.2s',
                    cursor: 'pointer',
                    borderRadius: 2,
                    backgroundColor: isSelected
                      ? 'rgba(5, 130, 112, 0.08)'
                      : 'white',
                    '&:hover': {
                      borderColor: '#058270',
                      backgroundColor: 'rgba(5, 130, 112, 0.04)',
                    },
                  }}
                >
                  <Checkbox
                    checked={isSelected}
                    size={fullScreen ? 'medium' : 'small'}
                    sx={{
                      p: 0,
                      color: '#058270',
                      '&.Mui-checked': { color: '#058270' },
                    }}
                    onChange={() => {}}
                  />
                  <Typography
                    variant="body2"
                    sx={{ fontSize: fullScreen ? '1.2rem' : '1rem', ml: 1 }}
                  >
                    {opt}
                  </Typography>
                </Box>
              );
            })}
            {errors[step.id] && (
              <Typography
                color="error"
                sx={{ mt: 2, fontSize: 14 }}
                ref={multiSelectErrorRef}
              >
                {errors[step.id]}
              </Typography>
            )}
          </Box>
        );

      case 'dateAndTime':
        return (
          <Box mt={fullScreen ? 4 : 3} display="flex" justifyContent="center">
            <TextField
              type="date"
              value={value || ''}
              onChange={(e) => onChange(e.target.value, step.id)}
              error={!!errors[step.id]}
              helperText={errors[step.id]}
              sx={{
                width: fullScreen ? 320 : 260,
                '& .MuiInputBase-root': {
                  borderRadius: '12px',
                  border: '1px solid #d1d5db',
                  fontSize: fullScreen ? '1.1rem' : '1rem',
                  py: fullScreen ? 2 : 1.5,
                  px: 1,
                  transition: 'all 0.2s ease-in-out',
                },
                '& input': {
                  textAlign: 'center',
                  fontSize: fullScreen ? '1.1rem' : '1rem',
                  cursor: 'pointer',
                },
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid #9ca3af',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid #3b82f6',
                },
              }}
            />
          </Box>
        );

      case 'welcomeCard':
        return <></>;

      case 'endCard':
        return <></>;

      default:
        return <Typography>Unknown question type</Typography>;
    }
  };

  const containerStyle = {
    bgcolor: '#f5f5f5',
    width: '100%',
    mx: 'auto',
    mt: fullScreen ? 0 : 4,
    maxWidth: fullScreen ? '100%' : 600,
    minHeight: fullScreen ? '80vh' : 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    py: fullScreen ? 2 : 0,
  };

  return (
    <>
      <Box sx={containerStyle}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              width: fullScreen ? '90%' : '100%',
              maxWidth: fullScreen ? '900px' : '100%',
            }}
          >
            <Paper
              elevation={fullScreen ? 3 : 2}
              sx={{
                p: fullScreen ? 5 : 3,
                borderRadius: 3,
                minHeight: fullScreen ? '50vh' : 280,
                maxHeight: fullScreen ? '85vh' : 'auto',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent:
                  currentStep.type === 'endCard' ? 'center' : 'flex-start',
                alignItems:
                  currentStep.type === 'endCard' ? 'center' : 'stretch',
                textAlign: currentStep.type === 'endCard' ? 'center' : 'left',
              }}
            >
              {currentStep.type !== 'endCard' && (
                <Box sx={{ mb: fullScreen ? 2 : 1 }}>
                  <Typography
                    variant={fullScreen ? 'h6' : 'h8'}
                    fontWeight={600}
                  >
                    {currentStep.label}
                  </Typography>
                  {currentStep.description && (
                    <Typography
                      sx={{
                        color: 'text.secondary',
                        fontSize: fullScreen ? '1.2rem' : '1rem',
                      }}
                    >
                      {currentStep.description}
                    </Typography>
                  )}
                </Box>
              )}

              {/* 🌟 End Card Centered Layout */}
              {currentStep.type === 'endCard' ? (
                <Box
                  sx={{
                    textAlign: 'center',
                    py: fullScreen ? 6 : 4,
                    px: fullScreen ? 3 : 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant={fullScreen ? 'h4' : 'h5'}
                    fontWeight={600}
                    gutterBottom
                  >
                    {currentStep.title || 'Thank you!'}
                  </Typography>

                  {currentStep.description && (
                    <Typography
                      sx={{
                        fontSize: fullScreen ? '1.2rem' : '1rem',
                        color: 'text.secondary',
                        maxWidth: 500,
                      }}
                    >
                      {currentStep.description}
                    </Typography>
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    size={fullScreen ? 'medium' : 'small'}
                    sx={{
                      mt: fullScreen ? 4 : 2,
                      px: 2.5,
                      py: fullScreen ? 1.5 : 0.7,
                      fontSize: fullScreen ? '1.1rem' : '1rem',
                      borderRadius: '10px',
                    }}
                    onClick={handleSubmit}
                  >
                    {currentStep.finishButton || 'Preview & Submit'}
                  </Button>
                </Box>
              ) : (
                <>
                  {/* 🧩 Scrollable content for all other steps */}
                  <Box flex={1} overflow="auto" mb={2}>
                    {renderQuestion(
                      currentStep,
                      answers[currentStep.id],
                      handleChange
                    )}
                  </Box>

                  {/* ⬅️➡️ Navigation buttons */}
                  <Box display="flex" justifyContent="space-between" mt="auto">
                    {index > 0 && (
                      <Button
                        variant="outlined"
                        size={fullScreen ? 'large' : 'small'}
                        onClick={prevStep}
                      >
                        {currentStep.backButton || 'Back'}
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      size={fullScreen ? 'large' : 'small'}
                      onClick={
                        index === steps.length - 1 ? handleSubmit : nextStep
                      }
                    >
                      {index === steps.length - 1
                        ? currentStep.finishButton || 'Finish'
                        : currentStep.nextButton || 'Next'}
                    </Button>
                  </Box>
                </>
              )}

              <LinearProgress
                variant="determinate"
                value={((index + 1) / steps.length) * 100}
                sx={{
                  height: 8,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              />
            </Paper>
          </motion.div>
        </AnimatePresence>
      </Box>
    </>
  );
};

export default SlidingCard;
