import React, { useState } from 'react';
import { SideDrawer } from 'components/SideDrawer';
import WelcomeCard from './components/Cards/WelcomeCard';
import EndingCard from './components/Cards/EndingCard';
import { Tabs, Tab, Box, Stack, Typography, Switch, Grid } from '@mui/material';
import QuestionCard from './components/Cards/QuestionCard';
import AddQuestionCard from './components/Cards/AddQuestionCard';
import {
  MessageSquareText,
  Database,
  List,
  Star,
  Laptop,
  CalendarDays,
} from 'lucide-react';
import { CreateForm } from 'Api/Api';
import toast from 'react-hot-toast';
import FormStylingCard from './components/Cards/FormStylingCard';
import CardStylingCard from './components/Cards/CardStylingCard';
import BackgroundStylingCard from './components/Cards/BackgroundStylingCard';
import FormPreview from './Preview';
import { InnerTextField } from 'components/InputFields';

export const QUESTION_TYPES = [
  {
    value: 'text',
    label: 'Free Text',
    icon: MessageSquareText,
    aliases: ['What would you like to know?'],
  },
  { value: 'single_select', label: 'Single Select', icon: Database },
  { value: 'multi_select', label: 'Multi Select', icon: List },
  { value: 'rating', label: 'Rating', icon: Star },
  { value: 'scale', label: 'Scale', icon: Laptop },
  { value: 'dateAndTime', label: 'Date', icon: CalendarDays },
];

const initialSurveyState = {
  title: '',
  description: '',
  welcomeCard: {
    active: false,
    welcomeLogo: '',
    title: 'Welcome!',
    description: "Thanks for providing your feedback - let's go!",
    startButton: 'Next',
  },
  questions: [
    {
      id: 1,
      type: 'text',
      format: 'text',
      label: 'What would you like to know?',
      description: '',
      placeholder: 'Type your answer here...',
      required: false,
      nextButton: 'Next',
      backButton: 'Back',
      order: 1,
      logic: [],
    },
  ],
  endCard: {
    active: true,
    endLogo: '',
    title: 'Thank you!',
    description: 'We appreciate your feedback.',
    finishButton: 'Finish',
  },
  style: {
    active: false,
    formStyling: {
      brandColor: '#64748b',
      questionColor: '#2b2524',
      inputColor: '#ffffff',
      inputBorderColor: '#cbd5e1',
    },
    cardStyling: {
      roundness: 25,
      cardBackgroundColor: '#ffffff',
      cardBorderColor: '#f8fafc',
    },
    backgroungStyling: {
      brightness: 25,
      backgroundImage: null,
      backgroundColor: '#ffffff',
    },
  },
};

const CreateFormModal = ({ open, onClose, refresh }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [surveys, setSurveys] = useState(initialSurveyState);
  const [activeIndex, setActiveIndex] = useState(null);
  const [newQuestionType, setNewQuestionType] = useState('text');
  const [tabValue, setTabValue] = useState('1');
  const [loading, setLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const updateWelcome = (updates) => {
    setSurveys((prev) => ({
      ...prev,
      welcomeCard: {
        ...prev.welcomeCard,
        ...updates,
        welcomeLogo:
          updates.welcomeLogo !== undefined
            ? updates.welcomeLogo
            : prev.welcomeCard.welcomeLogo,
      },
    }));
  };

  const updateStyle = (section, updates) => {
    setSurveys((prev) => ({
      ...prev,
      style: {
        ...prev.style,
        [section]: {
          ...prev.style[section],
          ...updates,
        },
      },
    }));
  };

  const updateEnding = (updates) => {
    setSurveys((prev) => ({
      ...prev,
      endCard: {
        ...prev.endCard,
        ...updates,
        endLogo:
          updates.endLogo !== undefined
            ? updates.endLogo
            : prev.endCard.endLogo,
      },
    }));
  };

  const handleChangeField = (id, field, value) => {
    setSurveys((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      ),
    }));
  };

  const handleDeleteQuestion = (id) => {
    setSurveys((prev) => {
      if (id === 1) return prev;
      const filtered = prev.questions.filter((q) => q.id !== id);
      const renumbered = filtered.map((q, idx) => ({
        ...q,
        id: idx + 1,
        order: idx + 1,
      }));
      if (activeTab >= renumbered.length)
        setActiveTab(Math.max(0, renumbered.length - 1));
      return { ...prev, questions: renumbered };
    });
  };

  const handleAddQuestion = () => {
    setSurveys((prev) => {
      const newId = prev.questions.length + 1;
      const label =
        prev.questions.length === 0
          ? 'What would you like to know?'
          : QUESTION_TYPES.find((t) => t.value === newQuestionType)?.label ||
            'New Question';
      const newQuestion = {
        id: Number(newId),
        type: newQuestionType,
        label,
        required: false,
        nextButton: 'Next',
        backButton: 'Back',
        order: Number(newId),
        logic: [],
      };
      return {
        ...prev,
        questions: [...prev.questions, newQuestion],
      };
    });
  };

  const handleSave = async () => {
    try {
      let formData = new FormData();
      Object.entries(surveys).forEach(([key, value]) => {
        if (key === 'questions' || key === 'welcomeCard' || key === 'endCard') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });
      const response = await CreateForm(surveys);
      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        setLoading(false);
        setSurveys(initialSurveyState);
        handleClose();
        refresh();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleClose = () => {
    setSurveys(initialSurveyState);
    setActiveTab(0);
    onClose();
    setIsPreview(false);
  };

  return (
    <SideDrawer
      open={open}
      onClose={handleClose}
      handleSubmit={handleSave}
      md={750}
      EyeIcon={true}
      isPreview={isPreview}
      setIsPreview={setIsPreview}
      title={isPreview ? 'Form Preview' : 'New Form'}
    >
      {isPreview ? (
        <FormPreview
          handleTabChange={handleTabChange}
          tabValue={tabValue}
          setTabValue={setTabValue}
          survey={surveys}
          preview={true}
        />
      ) : (
        <Box>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              mb: 2,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Tabs
              value={activeTab}
              onChange={(_, newTab) => setActiveTab(newTab)}
              centered
            >
              <Tab label="Question" />
              <Tab label="Styling" />
            </Tabs>
          </Box>

          {activeTab === 0 && (
            <Box>
              <Grid container spacing={3} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <Box pl={0} border={'2px solid d'}>
                    <InnerTextField
                      required
                      name="title"
                      label="Survey Title"
                      fullWidth
                      margin="normal"
                      value={surveys?.title}
                      placeholder="Enter survey title"
                      onChange={(e) =>
                        setSurveys((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      sx={{ marginBottom: 0, paddingBottom: 0 }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <InnerTextField
                      required
                      name="description"
                      label="Survey Description"
                      fullWidth
                      margin="normal"
                      value={surveys?.description}
                      placeholder="Enter survey description"
                      onChange={(e) =>
                        setSurveys((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      sx={{ marginBottom: 0, paddingBottom: 0 }}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Stack spacing={2}>
                {/* 1. Welcome Card */}
                <WelcomeCard
                  welcome={surveys.welcomeCard}
                  setWelcome={updateWelcome}
                />

                {/* 2,3. All Questions (first FreeText by default, others added) */}
                {surveys.questions.map((q, index) => (
                  <QuestionCard
                    key={q.id}
                    question={q}
                    onChangeField={handleChangeField}
                    onDelete={handleDeleteQuestion}
                    isDefault={index === 0}
                    questions={surveys?.questions}
                    onActivate={() => setActiveIndex(index)}
                  />
                ))}

                <AddQuestionCard
                  surveys={surveys}
                  setSurveys={setSurveys}
                  questionTypes={QUESTION_TYPES}
                  onAdd={handleAddQuestion}
                />

                <EndingCard ending={surveys.endCard} setEnding={updateEnding} />
              </Stack>
            </Box>
          )}

          {activeTab === 1 && (
            <>
              {/* Toggle + Heading + Subheading */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  mb: 2,
                  p: 1.5,
                  borderRadius: 2,
                  border: '1px solid #e5e7eb',
                  backgroundColor: '#f9fafb',
                }}
              >
                <Stack
                  direction="row"
                  spacing={0}
                  alignItems="center"
                  border={'2px solid greenw'}
                >
                  <Switch
                    checked={surveys.style.active}
                    onChange={(e) =>
                      setSurveys((prev) => ({
                        ...prev,
                        style: { ...prev.style, active: e.target.checked },
                      }))
                    }
                  />
                  <Stack spacing={-0.5} border={'2px solid redw'}>
                    <Typography variant="subtitle2" fontWeight={400}>
                      Add custom style
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      Override the theme with individual style for this survey.
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>

              {/* Show cards ONLY when active */}
              {surveys.style.active && (
                <Stack spacing={2}>
                  <FormStylingCard
                    style={surveys?.style?.formStyling}
                    setStyles={updateStyle}
                  />
                  <CardStylingCard
                    style={surveys?.style?.cardStyling}
                    setStyles={updateStyle}
                  />
                  <BackgroundStylingCard
                    style={surveys?.style?.backgroungStyling}
                    setStyles={updateStyle}
                  />
                </Stack>
              )}
            </>
          )}
        </Box>
      )}
    </SideDrawer>
  );
};

export default CreateFormModal;
