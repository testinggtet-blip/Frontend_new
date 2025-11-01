import {
  accountIcon,
  helpIcon,
  joinCommunityIcon,
  logoutIcon,
  reviewIcon,
  termsAndConditionIcon,
} from 'assets/Icons/ProfileImages';
import { protectedRoutes, unprotectedRoutes } from './appRoutes';
import * as appImages from './appImages';

import {
  analyticsIconActive,
  analyticsIconInactive,
  automationIconActive,
  automationIconInactive,
  campaignIconActive,
  campaignIconInactive,
  connectionIconActive,
  connectionIconInactive,
  dashboardIconActive,
  dashboardIconInactive,
  feedsIconActive,
  feedsIconInactive,
  realTimeIconActive,
  realTimeIconInactive,
  segmentIconActive,
  segmentIconInactive,
  sequenceIconActive,
  sequenceIconInactive,
  subscriberIconActive,
  subscriberIconInactive,
  templateIconActive,
  templateIconInactive,
  webPushIconActive,
  webPushIconInactive,
  formIconActive,
  formIconInactive,
} from 'assets/Icons/SideBarImages';
import EmailLink from 'components/Email';

export const ProfileMenuItems = [
  {
    name: 'Profile',
    icon: accountIcon,
    link: protectedRoutes?.profile,
  },
  // {
  //   name: 'Settings',
  //   icon: settingsIcon,
  //   link: '',
  // },
  {
    name: 'Help',
    icon: helpIcon,
    link: `mailto:${process.env.REACT_APP_EMAIL || 'hello@letsnotify.in'}`,
  },
  {
    name: 'Leave a Review',
    icon: reviewIcon,
    link: 'https://forms.gle/bRSmDqgm3iD61HMB8',
  },

  {
    name: 'Join Community',
    icon: joinCommunityIcon,
    link: 'https://discord.gg/wHHyNPUg',
  },
  {
    name: 'Terms And Conditions',
    icon: termsAndConditionIcon,
    link: unprotectedRoutes.termsAndCondition,
  },
  {
    name: 'Log Out',
    icon: logoutIcon,
    link: protectedRoutes.login,
  },
];

export const SideMenuItems = [
  {
    name: 'Campaigns',
    icon: {
      active: campaignIconActive,
      inactive: campaignIconInactive,
    },
    link: protectedRoutes.webCampaigns,
  },
  {
    name: 'Segments',
    icon: {
      active: segmentIconActive,
      inactive: segmentIconInactive,
    },
    link: protectedRoutes.segments,
  },
  {
    name: 'Templates',
    icon: {
      active: templateIconActive,
      inactive: templateIconInactive,
    },
    link: protectedRoutes.templates,
  },
  {
    name: 'Subscribers',
    icon: {
      active: subscriberIconActive,
      inactive: subscriberIconInactive,
    },
    link: protectedRoutes.subscribers,
  },
  {
    name: 'Connections',
    icon: {
      active: connectionIconActive,
      inactive: connectionIconInactive,
    },
    link: protectedRoutes.connections,
  },
  {
    name: 'Flows',
    icon: {
      active: sequenceIconActive,
      inactive: sequenceIconInactive,
    },
    link: protectedRoutes.flows,
    // comingSoon: true,
  },
  {
    name: 'Forms',
    icon: {
      active: formIconActive,
      inactive: formIconInactive,
    },
    link: protectedRoutes.forms,
    // comingSoon: true,
  },
  {
    name: 'Tracking',
    icon: {
      active: dashboardIconActive,
      inactive: dashboardIconInactive,
    },
    link: protectedRoutes.websiteTracker,
    // comingSoon: true,
  },
  {
    name: 'Web Builder',
    icon: {
      active: templateIconActive,
      inactive: templateIconInactive,
    },
    link: protectedRoutes.webBuilder,
    // comingSoon: true,
  },
];

export const CampaignTableColumns = [
  {
    id: 'campaignName',
    label: 'Campaign Name',
    align: 'left',
    width: '10%',
    textAlign: 'left',
    hoverable: true,
  },
  {
    id: 'type',
    label: 'Type',
    align: 'left',
    width: '5%',
    textAlign: 'left',
    hoverable: false,
  },
  {
    id: 'frequency',
    label: 'Frequency',
    align: 'left',
    width: '10%',
    textAlign: 'left',
    hoverable: false,
  },
  {
    id: 'createdTime',
    label: 'Created Time',
    align: 'left',
    width: '8%',
    textAlign: 'left',
    hoverable: false,
  },
  {
    id: 'modifiedTime',
    label: 'Updated Time',
    align: 'left',
    width: '8%',
    textAlign: 'left',
    hoverable: false,
  },
  // {
  //   id: 'status',
  //   label: 'Status',
  //   align: 'left',
  //   width: '1%',
  //   textAlign: 'left',
  //   hoverable: false,
  // },
];

export const FeedTableColumns = [
  {
    id: 'status',
    label: 'Status',
    align: 'left',
    width: '1%',
    textAlign: 'left',
    hoverable: false,
  },
  {
    id: 'feedName',
    label: 'Feed Name',
    align: 'center',
    width: '15%',
    textAlign: 'left',
    hoverable: true,
  },
  {
    id: 'feedurl',
    label: 'Url',
    align: 'center',
    width: '15%',
    textAlign: 'left',
    hoverable: true,
  },
  {
    id: 'frequency',
    label: 'Frequency',
    align: 'center',
    width: '5%',
    textAlign: 'center',
    hoverable: false,
  },
  {
    id: 'createdTime',
    label: 'Created Time',
    align: 'center',
    width: '12%',
    textAlign: 'center',
    hoverable: false,
  },
  {
    id: 'Source',
    label: 'Source',
    align: 'center',
    width: '12%',
    textAlign: 'center',
    hoverable: false,
  },
];

export const TemplateTableColumns = [
  {
    id: 'templateName',
    label: 'Template Name',
    align: 'left',
    width: '12%',
    textAlign: 'left',
    hoverable: true,
  },
  {
    id: 'title',
    label: 'Title',
    align: 'left',
    width: '8%',
    textAlign: 'left',
    hoverable: false,
  },
  {
    id: 'pageURL',
    label: 'Redirecting URL',
    align: 'left',
    width: '12%',
    textAlign: 'left',
    hoverable: false,
  },
  {
    id: 'createdTime',
    label: 'Created Time',
    align: 'left',
    width: '8%',
    textAlign: 'left',
    hoverable: false,
  },
  {
    id: 'modifiedTime',
    label: 'Updated Time',
    align: 'left',
    width: '8%',
    textAlign: 'left',
    hoverable: false,
  },
  {
    id: 'status',
    label: 'Status',
    align: 'left',
    width: '1%',
    textAlign: 'left',
    hoverable: false,
  },
];

export const ConnectionTableColumns = [
  {
    id: 'connectionName',
    label: 'Connection Name',
    align: 'left',
    width: '15%',
    textAlign: 'left',
    hoverable: true,
  },
  {
    id: 'connectionUrl',
    label: 'Connection URL',
    align: 'left',
    width: '15%',
    textAlign: 'left',
    hoverable: false,
  },
  {
    id: 'createdTime',
    label: 'Created Time',
    align: 'left',
    width: '15%',
    textAlign: 'left',
    hoverable: false,
  },
  {
    id: 'modifiedTime',
    label: 'Updated Time',
    align: 'left',
    width: '15%',
    textAlign: 'left',
    hoverable: false,
  },
];

export const SegmentTableColumns = [
  {
    id: 'segmentName',
    label: 'Segment Name',
    align: 'left',
    width: '10%',
    textAlign: 'left',
    hoverable: true,
  },
  {
    id: 'subscriberCount',
    label: 'Count',
    align: 'left',
    width: '5%',
    textAlign: 'left',
    hoverable: false,
  },
  {
    id: 'createdTime',
    label: 'Created Time',
    align: 'left',
    width: '8%',
    textAlign: 'left',
    hoverable: false,
  },
  {
    id: 'modifiedTime',
    label: 'Updated Time',
    align: 'left',
    width: '8%',
    textAlign: 'left  ',
    hoverable: false,
  },
  {
    id: 'status',
    label: 'Status',
    align: 'left',
    width: '1%',
    textAlign: 'center',
    hoverable: false,
  },
];

export const SubscribersTableColumns = [
  {
    id: 'subscriptionId',
    label: 'Subscribers ID',
    align: 'left',
    width: '10%',
    textAlign: 'left',
    hoverable: true,
  },
  {
    id: 'mobile',
    label: 'Mobile',
    align: 'left',
    width: '8%',
    textAlign: 'left',
    hoverable: false,
  },
  {
    id: 'platform',
    label: 'Platform',
    align: 'left',
    width: '8%',
    textAlign: 'left',
    hoverable: false,
  },
  {
    id: 'browser',
    label: 'Browser',
    align: 'left',
    width: '8%',
    textAlign: 'left',
    hoverable: false,
  },
  {
    id: 'createdTime',
    label: 'Created Time',
    align: 'left',
    width: '8%',
    textAlign: 'left',
    hoverable: false,
  },
  {
    id: 'modifiedTime',
    label: 'Updated Time',
    align: 'left',
    width: '8%',
    textAlign: 'left',
    hoverable: false,
  },
  // {
  //   id: 'status',
  //   label: 'Status',
  //   align: 'left',
  //   width: '1%',
  //   textAlign: 'left',
  //   hoverable: false,
  // },
];

export const WebBuilderTableColumns = [
  {
    id: 'webBuilderName',
    label: 'Web Site Name',
    align: 'left',
    width: '15%',
    textAlign: 'left',
    hoverable: true,
  },
  {
    id: 'createdTime',
    label: 'Created Time',
    align: 'left',
    width: '8%',
    textAlign: 'left',
    hoverable: false,
  },
  {
    id: 'modifiedTime',
    label: 'Updated Time',
    align: 'left',
    width: '8%',
    textAlign: 'left',
    hoverable: false,
  },
];

export const SequenceTableColumns = [
  {
    id: 'name',
    label: 'Flow Name',
    align: 'left',
    width: '15%',
    textAlign: 'left',
    hoverable: true,
  },
  {
    id: 'timeZone',
    label: 'Time Zone',
    align: 'left',
    width: '15%',
    textAlign: 'left',
  },
  {
    id: 'createdTime',
    label: 'Created Time',
    align: 'left',
    width: '12%',
    textAlign: 'left',
  },
  {
    id: 'modifiedTime',
    label: 'Updated Time',
    align: 'left',
    width: '12%',
    textAlign: 'left',
  },
  {
    id: 'status',
    label: 'Status',
    align: 'left',
    width: '1%',
    textAlign: 'center',
  },
];

export const FormsTableColumns = [
  {
    id: 'title',
    label: 'Form Name',
    align: 'left',
    width: '20%',
    textAlign: 'left',
    hoverable: true,
  },
  {
    id: 'uniqueFormId',
    label: 'Form ID',
    align: 'left',
    width: '20%',
    textAlign: 'left',
    hoverable: false,
  },
  {
    id: 'createdTime',
    label: 'Created Time',
    align: 'left',
    width: '20%',
    textAlign: 'left',
    hoverable: false,
  },
  {
    id: 'modifiedTime',
    label: 'Updated Time',
    align: 'left',
    width: '20%',
    textAlign: 'left',
    hoverable: false,
  },
  // {
  //   id: 'status',
  //   label: 'Status',
  //   align: 'left',
  //   width: '10%',
  //   textAlign: 'center',
  // hoverable: false,
  // },
];

export const PersonHasArray = [
  { name: 'Active on Site', value: 'Active_on_Site' },
];

export const ActionArray = [
  { name: 'At least once', value: 'At_least_once' },
  { name: 'Zero times', value: 'Zero_times' },
  { name: 'Equals', value: 'Equals' },
  { name: 'Does not equal', value: 'Does_not_equal' },
  { name: 'Is at least', value: 'Is_at_least' },
  { name: 'Is greater than', value: 'Is_greater_than' },
  { name: 'Is less than', value: 'Is_less_than' },
  { name: 'Is at most', value: 'Is_at_most' },
];

export const TimePeriodArray = [
  { name: 'In the last', value: 'In_the_last' },
  { name: 'After', value: 'After' },
  { name: 'Before', value: 'Before' },
  { name: 'Between', value: 'Between' },
  { name: 'Between dates', value: 'Between_dates' },
  { name: 'At least', value: 'At_least' },
  { name: 'Over all time', value: 'Over_all_time' },
];

export const CalenderArray = [
  { name: 'Days', value: 'Days' },
  { name: 'Weeks', value: 'Weeks' },
  { name: 'Hours', value: 'Hours' },
];

export const ConditionDrawerArray = [
  { name: 'Minutes', value: 'Minutes' },
  { name: 'Hours', value: 'Hours' },
  { name: 'Days', value: 'Days' },
];

export const WaitingTimeArray = Array.from({ length: 60 }, (_, i) => ({
  name: `${i}`,
  value: i,
}));

export const commonIcons = {
  campaignIcon: appImages.campaignIcon,
  segmentIcon: appImages.segmentIcon,
  copyIcon: appImages.copyIcon,
  conditionIcon: appImages.conditionIcon,
  editIcon: appImages.editIcon,
  listViewEdit: appImages.listViewEdit,
  enlargeIcon: appImages.enlargeIcon,
  trashIcon: appImages.trashIcon,
  detailsIcon: appImages.detailsIcon,
};

export const listViewIcons = [
  {
    icon: appImages.listViewEdit,
    title: 'Edit',
  },
  {
    icon: appImages.enlargeIcon,
    title: 'Enlarge',
  },
  {
    icon: appImages.trashIcon,
    title: 'Delete',
  },
];

export const svgBorder = `
<svg xmlns="http://www.w3.org/2000/svg" width="2" height="30" viewBox="0 0 2 39" fill="none">
  <path d="M1 1L1 38" stroke="#B9B9B9" stroke-opacity="0.9" stroke-linecap="round" stroke-width="2"/>
</svg>
`;

export const CampaignScheuduler = [
  { name: 'Now', value: 'now' },
  { name: 'On specific date', value: 'on_specific_date' },
  { name: 'Daily', value: 'daily' },
  { name: 'Weekly', value: 'weekly' },
  { name: 'Monthly', value: 'monthly' },
];

export const WebInboxTemplateScheuduler = [
  { name: 'All', value: 'now' },
  { name: 'Promotion', value: 'promotion' },
  { name: 'Offers', value: 'offers' },
  { name: 'Create New', value: 'createNow' },
];

export const SequenceScheuduler = [
  { name: 'On specific date', value: 'on_specific_date' },
  { name: 'Daily', value: 'daily' },
  { name: 'Weekly', value: 'weekly' },
  { name: 'Monthly', value: 'monthly' },
];

export const ActivitySortBy = [
  { name: 'Date', value: 'createdTime' },
  { name: 'Action', value: 'action' },
  { name: 'Module', value: 'module' },
];

export const ActivitySortOrder = [
  { name: 'Newest First', value: 'desc' },
  { name: 'Oldest First', value: 'asc' },
];

export const ActivityFilterAction = [
  { name: 'On specific date', value: 'all' },
  { name: 'Created', value: 'Created' },
  { name: 'Updated', value: 'Updated' },
  { name: 'Deleted', value: 'Deleted' },
];

export const ActivityDateRange = [
  { name: 'All Time', value: 'all' },
  { name: 'Last Week', value: '1week' },
  { name: 'Last Month', value: '1month' },
  { name: 'Last 3 Months', value: '3months' },
  { name: 'Last 6 Months', value: '6months' },
  { name: 'Last Year', value: '1year' },
];

export const SegmentFieldsArray = [
  { name: 'Mobile', value: 'mobile' },
  { name: 'Platform', value: 'platform' },
  { name: 'Browser', value: 'browser' },
  { name: 'Created Time', value: 'createdTime' },
  // { name: 'Subscriber ID', value: 'subscriberId' },
  // { name: 'Visitor Url', value: 'visited_url' },
];

export const SegmentConditionArray = [
  { name: 'Equal', value: 'equal' },
  { name: 'Not Equal', value: 'not equal' },
];

export const ConditionsArray = [
  { name: 'Properties about someone', value: 'properties' },
  // {
  //   name: 'What someone has done(or not done)',
  //   value: 'What_someone_has_done',
  // },
];

export const SegmentBrowserArray = [
  { name: 'Chrome', value: 'chrome' },
  { name: 'Firefox', value: 'firefox' },
  { name: 'Edge', value: 'edge' },
  { name: 'Brave', value: 'brave' },
  { name: 'Arc', value: 'arc' },
  { name: 'Safari', value: 'safari' },
  { name: 'Opera', value: 'opera' },
  { name: 'Other', value: 'other' },
];

export const SegmentMobileArray = [
  { name: 'True', value: 'true' },
  { name: 'False', value: 'false' },
];

export const SegmentPlatformArray = [
  { name: 'Windows', value: 'windows' },
  { name: 'Mac OS', value: 'macos' },
  { name: 'Linux', value: 'linux' },
  { name: 'Chrome OS', value: 'chromeos' },
  { name: 'iPad OS', value: 'ipados' },
  { name: 'Android', value: 'android' },
  { name: 'iPhone', value: 'iphone' },
];

export const getPositionStyles = (position) => {
  switch (position) {
    case 'center':
      return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };
    case 'top':
      return { display: 'flex', justifyContent: 'center' };
    case 'top-left':
      return { display: 'flex', justifyContent: 'start', alignItems: 'start' };
    case 'top-right':
      return { display: 'flex', justifyContent: 'end', alignItems: 'start' };
    case 'bottom-left':
      return { display: 'flex', justifyContent: 'start', alignItems: 'end' };
    case 'bottom-right':
      return { display: 'flex', justifyContent: 'end', alignItems: 'end' };
    default:
      return {};
  }
};

export const getLogMessageStyle = (action, module) => {
  switch (action) {
    case 'Created':
      return { color: '#2E7D32', message: `The ${module} was Created ` };
    case 'Deleted':
      return { color: '#D32F2F', message: `The ${module} was deleted ` };
    case 'Updated':
      return { color: '#1976D2', message: `${module} updated ` };
    default:
      return { color: 'black', message: `${module} modified ` };
  }
};

export const Time = [
  { name: '0 sec', value: 0 },
  { name: '1 sec', value: 1 },
  { name: '2 sec', value: 2 },
  { name: '4 sec', value: 4 },
  { name: '6 sec', value: 6 },
  { name: '8 sec', value: 8 },
];

export const DesktopPosition = [
  { name: 'Center', value: 'center' },
  { name: 'Top', value: 'top' },
  { name: 'Top Left', value: 'top-left' },
  { name: 'Top Right', value: 'top-right' },
  { name: 'Bottom Left', value: 'bottom-left' },
  { name: 'Bottom Right', value: 'bottom-right' },
];

export const MobilePosition = [
  { name: 'Center', value: 'center' },
  { name: 'Top', value: 'top' },
];

export const convertToUTC = (frequencyDateTime, timeZone) => {
  const cleanInput = frequencyDateTime.replace(' ', 'T');

  // Parse local input manually
  const parts = cleanInput.split('T');
  const dateParts = parts[0].split('-');
  const timeParts = parts[1].split(':');

  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // JS months are 0-indexed
  const day = parseInt(dateParts[2], 10);
  const hour = parseInt(timeParts[0], 10);
  const minute = parseInt(timeParts[1], 10);
  const second = parseInt(timeParts[2] || '0', 10);

  // Build a date assuming the provided time is in the provided timezone
  const localDate = new Date(Date.UTC(year, month, day, hour, minute, second));

  // Now get the timezone offset
  const tzDate = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(localDate);

  const getPart = (type) => tzDate.find((x) => x.type === type)?.value;

  const adjustedYear = parseInt(getPart('year'), 10);
  const adjustedMonth = parseInt(getPart('month'), 10) - 1;
  const adjustedDay = parseInt(getPart('day'), 10);
  const adjustedHour = parseInt(getPart('hour'), 10);
  const adjustedMinute = parseInt(getPart('minute'), 10);
  const adjustedSecond = parseInt(getPart('second'), 10);

  // Now create a Date object assuming the time is actually in that timezone
  const adjustedDate = new Date(
    Date.UTC(
      adjustedYear,
      adjustedMonth,
      adjustedDay,
      adjustedHour,
      adjustedMinute,
      adjustedSecond
    )
  );

  // Now calculate UTC from that
  const utcTimestamp =
    localDate.getTime() - (adjustedDate.getTime() - localDate.getTime());
  const utcDate = new Date(utcTimestamp);

  const utcYear = utcDate.getUTCFullYear();
  const utcMonth = String(utcDate.getUTCMonth() + 1).padStart(2, '0');
  const utcDay = String(utcDate.getUTCDate()).padStart(2, '0');
  const utcHour = String(utcDate.getUTCHours()).padStart(2, '0');
  const utcMinute = String(utcDate.getUTCMinutes()).padStart(2, '0');
  const utcSecond = String(utcDate.getUTCSeconds()).padStart(2, '0');

  return `${utcYear}-${utcMonth}-${utcDay} ${utcHour}:${utcMinute}:${utcSecond}`;
};

export const columnIcons = {
  templateName: ['Edit', 'Enlarge', 'Delete'],
  campaignName: ['Edit', 'Enlarge', 'Delete'],
  connectionName: ['Edit', 'Enlarge', 'Delete'],
  segmentName: ['Edit', 'Enlarge', 'Delete'],
  connectionName: ['Edit', 'Enlarge', 'Delete'],
  webBuilderName: ['Edit', 'Enlarge', 'Delete'],
  title: ['Enlarge', 'Delete'],
  subscriptionId: ['Enlarge'],
};
