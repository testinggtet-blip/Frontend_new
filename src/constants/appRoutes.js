export const unprotectedRoutes = {
  login: '/login',
  termsAndCondition: process.env.REACT_APP_TERMS_AND_CONDITIONS,
};

export const AppScreenRoute = '';

export const protectedRoutes = {
  app: '/*',
  home: AppScreenRoute + '/home',
  questions: AppScreenRoute + '/questions',
  createConnect: '/create-connection',
  dashboard: AppScreenRoute + '/dashboard',
  websiteTracker: AppScreenRoute + '/website-tracker',
  codeInjection: '/code-injection',
  connections: AppScreenRoute + '/connections',
  customPrompt: AppScreenRoute + '/connections/custom-prompt/*',
  templates: AppScreenRoute + '/templates',
  flows: AppScreenRoute + '/flows',
  createflows: AppScreenRoute + '/create-flows',
  editflows: AppScreenRoute + '/create-flows/:id',
  forms: AppScreenRoute + '/forms',
  enlargeforms: AppScreenRoute + '/show-forms/:id',
  editforms: AppScreenRoute + '/show-forms/:id',
  webCampaigns: AppScreenRoute + '/web-campaigns',
  realtimeCampaigns: AppScreenRoute + '/realtime-campaigns',
  analytics: AppScreenRoute + '/analytics',
  feeds: AppScreenRoute + '/feeds',
  subscribers: AppScreenRoute + '/subscribers',
  segments: AppScreenRoute + '/segments',
  profile: AppScreenRoute + '/profile',
  webBuilder: AppScreenRoute + '/web-builder',
};
