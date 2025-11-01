// 🔨 Question Builder
export const buildQuestion = (id, type, label) => {
  const base = {
    id,
    type,
    label,
    description: '',
    showDescription: false,
    required: false,
    nextButton: 'Next',
    backButton: 'Back',
    order: id,
    logic: [],
  };

  switch (type) {
    case 'single_select':
      return {
        ...base,
        options: ['Option 1', 'Option 2'],
      };

    case 'multi_select':
      return {
        ...base,
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      };

    case 'rating':
      return {
        ...base,
        scaleType: 'star',
        range: 5,
        lowerLabel: 'Not good',
        upperLabel: 'Very good',
      };

    case 'dateAndTime':
      return {
        ...base,
        format: 'DD-MM-YYYY',
      };

    case 'scale':
      return {
        ...base,
        lowerLabel: 'Not at all likely',
        upperLabel: 'Extremely likely',
      };

    case 'text':
    default:
      return {
        ...base,
        format: 'text',
        placeholder: 'Type your answer here...',
        longAnswer: false,
      };
  }
};

// 🔨 Step Builder (turns survey → runnable steps)
export const buildStepsFromSurvey = (survey) => {
  const steps = [];

  if (!survey) return steps;

  // ✅ Add welcome card
  if (
    survey.welcomeCard?.active === true ||
    survey.welcomeCard?.active === 'true'
  ) {
    steps.push({
      id: 'welcomeCard',
      type: 'welcomeCard',
      label: survey.welcomeCard.title,
      description: survey.welcomeCard.description,
      startButton: survey.welcomeCard.startButton,
      logic: survey.welcomeCard.logic || [],
    });
  }

  // ✅ Add all questions
  (survey.questions || []).forEach((q) => {
    const step = {
      id: String(q.id),
      type: q.type,
      label: q.label,
      description: q.description,
      required: q.required,
      backButton: q.backButton,
      nextButton: q.nextButton,
      order: q.order,
      logic: q.logic || [],
    };

    switch (q.type) {
      case 'single_select':
      case 'multi_select':
        step.options = q.options || [];
        break;

      case 'rating':
        step.scaleType = q.scaleType || 'star';
        step.range = Number(q.range) || 5;
        step.lowerLabel = q.lowerLabel;
        step.upperLabel = q.upperLabel;
        break;

      case 'dateAndTime':
        step.format = q.format;
        break;

      case 'scale':
        step.lowerLabel = q.lowerLabel;
        step.upperLabel = q.upperLabel;
        break;

      case 'text':
      default:
        step.format = q.format;
        step.placeholder = q.placeholder;
        step.longAnswer = q.longAnswer || false;
        break;
    }

    steps.push(step);
  });

  // ✅ Add end card ONLY if it's not already in questions
  const hasEndCardInQuestions = (survey.questions || []).some(
    (q) => q.type === 'endCard'
  );

  if (
    !hasEndCardInQuestions &&
    (survey.endCard?.active === true || survey.endCard?.active === 'true')
  ) {
    steps.push({
      id: 'endCard',
      type: 'endCard',
      label: survey.endCard.title,
      description: survey.endCard.description,
      finishButton: survey.endCard.finishButton,
      logic: survey.endCard.logic || [],
    });
  }

  return steps;
};
