import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Collapse,
  Grid,
  Divider,
} from '@mui/material';
import { buildQuestion } from '../utils/QuestionStateBuilder';
import { Plus } from 'lucide-react';
export default function AddQuestionCard({
  questionTypes,
  setSurveys,
  activeIndex,
}) {
  const [expanded, setExpanded] = useState(false);

  const handleAdd = (type) => {
    setSurveys((prev) => {
      const insertIndex =
        activeIndex != null ? activeIndex + 1 : prev.questions.length;
      const newId = prev.questions.length + 1;

      const typeLabel =
        questionTypes.find((qt) => qt.value === type)?.label || 'New Question';

      const newQuestion = buildQuestion(newId, type, typeLabel);

      const updatedQuestions = [...prev.questions];
      updatedQuestions.splice(insertIndex, 0, newQuestion);

      const renumbered = updatedQuestions.map((q, i) => ({
        ...q,
        id: i + 1,
        order: i + 1,
      }));

      return {
        ...prev,
        questions: renumbered,
      };
    });

    setExpanded(false);
  };

  return (
    <Card
      sx={{ mb: 1, boxShadow: 2, borderRadius: 2, backgroundColor: '#fff' }}
    >
      {/* Header */}
      <Box
        onClick={() => {
          setExpanded((prev) => !prev);
        }}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'box-shadow 0.15s, background 0.15s',
          backgroundColor: '#fff',
          '&:hover': {
            backgroundColor: '#F2F3F4',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Plus size={20} color="green" style={{ marginRight: 2 }} />
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              mx: 1,
              height: 40, // taller divider height for more vertical look
              alignSelf: 'stretch', // ensure it stretches vertically within flex container
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
              {'Add Question'}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                px: 1,
                color: '#000',
                lineHeight: 1.1,
                mt: 0.2,
              }}
            >
              {'Add a new question to your survey'}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Collapse in={expanded}>
        <CardContent>
          <Grid container spacing={2} justifyContent="center">
            {questionTypes.map((qt) => (
              <Grid item xs={12} sm={6} key={qt.value}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleAdd(qt.value)}
                  sx={{
                    py: 2,
                    textTransform: 'none',
                    fontWeight: 500,
                  }}
                >
                  <qt.icon size={16} style={{ marginRight: 6 }} />
                  {qt.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
}
