import { api, userApi, staticUserApi, connectionApi } from './Interceptor';
import {
  transformChartData,
  transformOneSiteResponse,
  transformPopularPages,
  transformRealTimeVisitors,
  transformSitesResponse,
  transformVisitorLogs,
  transformVisitorStats,
} from 'utils/commonFunctions';

/** ---- Template -----
 * Method to get all data Update Edit And Delete Template
 * @params  url = "exmaple" or data = data Object
 * @returns single Item, Array of Items
 */

export const FetchAllTemplate = async ({
  page,
  limit,
  welcomeTemplate = false,
}) => {
  try {
    const response = await api.get('templates', {
      params: { page, limit, welcomeTemplate },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const FetchOneTemplate = async (templateId) => {
  try {
    const response = await api.get(`templates/${templateId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const CreateTemplate = async (data) => {
  try {
    const response = await api.post('templates', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdateTemplate = async (templateId, data) => {
  try {
    const response = await api.patch(`templates/${templateId}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteTemplate = async (templateId) => {
  try {
    const response = await api.delete(`templates/${templateId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/** ---- Campaign -----
 * Method to get all data Update Edit And Delete Campaign
 * @params  url = "exmaple" or data = data Object
 * @returns single Item, Array of Items
 */

export const FetchAllCampaign = async ({ page, limit }) => {
  try {
    const response = await api.get('web-campaigns', {
      params: { page, limit },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const FetchOneCampaign = async (campaignId) => {
  try {
    const response = await api.get(`web-campaigns/${campaignId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const CreateCampaign = async (data) => {
  try {
    const response = await api.post('web-campaigns', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdateCampaign = async (campaignId, data) => {
  try {
    const response = await api.patch(`web-campaigns/${campaignId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteCampaign = async (campaignId) => {
  try {
    const response = await api.delete(`web-campaigns/${campaignId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/** ---- Connection -----
 * Method to get all data Update Edit And Delete Connection
 * @params  url = "exmaple" or data = data Object
 * @returns single Item, Array of Items
 */

export const FetchAllConnnection = async ({ page, limit }) => {
  try {
    const response = await api.get('connections', {
      params: { page, limit },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetAllKeys = async () => {
  try {
    const response = await api.get('connections/keys');
    return response;
  } catch (error) {
    throw error;
  }
};

export const SendNotification = async (data = {}) => {
  try {
    const response = await api.post(
      'notifications/send-notification-to-all',
      data,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const TestNotification = async (data) => {
  try {
    const response = await api.post('notifications/send-to-one', data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const FetchOneConnect = async (connectionId) => {
  try {
    const response = await api.get(`connections/${connectionId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const CreateConnection = async (data) => {
  try {
    const response = await api.post('connections', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdateConnection = async (connectionId, data) => {
  try {
    const response = await api.patch(`connections/${connectionId}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteConnection = async (connectionId) => {
  try {
    const response = await api.delete(`connections/${connectionId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const GenerateAPIKeys = async (connectionId) => {
  try {
    const response = await api.post(`users/create-api-keys/${connectionId}`);
    return response;
  } catch (error) {
    throw new Error('API Key or Secret Key missing in the response');
  }
};

export const GeneratePublicPrivateKeys = async (connectionId) => {
  try {
    const response = await api.post('connections/create-vapid-keys');
    return response;
  } catch (error) {
    throw new Error('API Key or Secret Key missing in the response');
  }
};

/**
 * ---- Connection Action Tracker -----
 * Method to get all action tracker records and create a new record for connections.
 * @params  url = "connections/action-tracker" or data = data Object
 * @returns single Item, Array of Items
 */

export const FetchAllConnectionActionTracker = async () => {
  try {
    const response = await api.get('connections/action-tracker');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CreateConnectionActionTracker = async (data) => {
  try {
    const response = await api.post('connections/action-tracker', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const FetchOneConnectionActionTracker = async (id) => {
  try {
    const response = await api.get(`connections/action-tracker/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/** ---- Segments -----
 * Method to get all data Update Edit And Delete Connection
 * @params  url = "exmaple" or data = data Object
 * @returns single Item, Array of Items
 */

export const FetchAllSegment = async ({ page, limit }) => {
  try {
    const response = await api.get('segments', {
      params: { page, limit },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const FetchOneSegment = async (segmentId) => {
  try {
    const response = await api.get(`segments/${segmentId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const CreateSegment = async (data) => {
  try {
    const response = await api.post('segments', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdateSegment = async (segmentId, data) => {
  try {
    const response = await api.patch(`segments/${segmentId}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteSegment = async (segmentId) => {
  try {
    const response = await api.delete(`segments/${segmentId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * ---- User Action Tracker -----
 * Method to get all action tracker records and create a new record.
 * @params  url = "user/action-tracker" or data = data Object
 * @returns single Item, Array of Items
 */

export const FetchAllActionTracker = async (data) => {
  try {
    const response = await api.post('users/action-tracker', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const CreateActionTracker = async (data) => {
  try {
    const response = await api.post('users/action-tracker', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/** ---- Subscribers -----
 * Method to get all data Update Edit And Delete Connection
 * @params  url = "exmaple" or data = data Object
 * @returns single Item, Array of Items
 */

export const FetchAllSubscribers = async ({ page, limit }) => {
  try {
    const response = await api.get('subscribers', {
      params: { page, limit },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const FetchOneSubscriber = async (subscriptionId) => {
  try {
    const response = await api.get(`subscribers/${subscriptionId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const CreateSubscriber = async (data) => {
  try {
    const response = await api.post('subscribers', data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdateSubscriber = async (subscriptionId, data) => {
  try {
    const response = await api.patch(`subscribers/${subscriptionId}`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteSubscriber = async (subscriptionId) => {
  try {
    const response = await api.delete(`subscribers/${subscriptionId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const TotalSubscribers = async (data) => {
  try {
    const response = await api.post(
      'subscribers/fetch-subscriber-count',
      data,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

/** ----- User -----
 * Method For Register, Edit, Save and Login user
 * @params  url = "exmaple" , data = data Object
 * @returns register, save or Login User
 */
export const RegisterUser = async (data) => {
  try {
    const response = await staticUserApi.post('users/register', data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const LoginUser = async (data) => {
  try {
    const response = await staticUserApi.post('users/login', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const ResetPassword = async (email) => {
  try {
    const emailParam = encodeURIComponent(email);
    const response = await staticUserApi.post(`users/reset-password/${email}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const CheckResetPasswordToken = async (token) => {
  try {
    const response = await userApi.get(
      `users/check-reset-password-token/${token}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdatePassword = async (data) => {
  try {
    const response = await userApi.post('users/update-password', data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const CheckAboutCustomerData = async () => {
  try {
    const response = await userApi.get('users/check-about-customer-data');
    return response;
  } catch (error) {
    throw error;
  }
};

export const SaveAboutUser = async (data) => {
  try {
    const response = await userApi.post('users/about-customer', data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetUserDetails = async () => {
  try {
    const response = await userApi.get('users');
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdateProfile = async (data) => {
  try {
    const response = await userApi.patch('users', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteProfileImage = async () => {
  try {
    const response = await userApi.delete('users/image');
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetAccessKey = async () => {
  try {
    const response = await api.get('/users/access-key');
    return response;
  } catch (error) {
    throw error;
  }
};
export const GenerateNewAccessKey = async () => {
  try {
    const response = await api.post('/users/access-key');
    return response;
  } catch (error) {
    throw error;
  }
};

/** ----- Sequence -----
 * Method For Register, Edit, Save and Login user
 * @params  url = "exmaple" , data = data Object
 * @returns register, save or Login User
 */
export const FetchAllSequence = async ({ page, limit }) => {
  try {
    const response = await api.get('sequence', {
      params: { page, limit },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const FetchOneSequence = async (sequenceId) => {
  try {
    const response = await api.get(`sequence/${sequenceId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const CreateSequence = async (data) => {
  try {
    const response = await api.post('sequence', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdateSequence = async (sequenceId, data) => {
  try {
    const response = await api.patch(`sequence/${sequenceId}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteSequence = async (sequenceId) => {
  try {
    const response = await api.delete(`sequence/${sequenceId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/** ----- Custom Prompt -----
 * Method For Register, Edit, Save and Login user
 * @params  url = "exmaple" , data = data Object
 * @returns register, save or Login User
 */

export const FetchAllCustomPrompt = async () => {
  try {
    const response = await api.get('prompts');
    return response;
  } catch (error) {
    throw error;
  }
};

export const CreateCustomPrompt = async (data) => {
  try {
    const response = await api.post('prompts', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdateCustomPrompt = async (campaignId, data) => {
  try {
    const response = await api.patch(`prompts/${campaignId}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteCustomPrompt = async (promptId) => {
  try {
    const response = await api.delete(`prompts/${promptId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/** ----- Web Builder -----
 * Method For Register, Edit, Save and Login user
 * @params  url = "exmaple" , data = data Object
 * @returns register, save or Login User
 */

export const FetchWebBuilder = async () => {
  try {
    const response = await api.get('web-builder');
    return response;
  } catch (error) {
    throw error;
  }
};

export const CreateWebBuilder = async (data) => {
  try {
    const response = await api.post('web-builder', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdateWebBuilder = async (webBuilderId, data) => {
  try {
    const response = await api.patch(`web-builder/${webBuilderId}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteWebBuilder = async (webBuilderId) => {
  try {
    const response = await api.delete(`web-builder/${webBuilderId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/** ---- Forms -----
 * Method to get all data Update Edit And Delete Connection
 * @params  url = "exmaple" or data = data Object
 * @returns single Item, Array of Items
 */

export const FetchAllForms = async () => {
  try {
    const response = await api.get('forms', {
      // params: { page, limit },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const FetchOneForm = async (formId) => {
  try {
    const response = await api.get(`forms/${formId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const CreateForm = async (data) => {
  try {
    const response = await api.post('forms', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const SaveFormResponse = async (formId, data) => {
  try {
    const payload = { answers: data };
    const response = await api.post(
      `forms/public/${formId}/responses`,
      payload
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const UpdateForm = async (formId, data) => {
  try {
    const response = await api.patch(`forms/${formId}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteForm = async (formId) => {
  try {
    const response = await api.delete(`forms/${formId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/** ---- Website tracking  -----
 * Method to get all data Update Edit And Delete Template
 * @params  url = "exmaple" or data = data Object
 * @returns single Item, Array of Items
 */

export const FetchOneSite = async (id) => {
  try {
    const response = await api.get(`/sites`);
    return transformOneSiteResponse(response.data);
  } catch (error) {
    throw error;
  }
};

export const DeleteSite = async (siteId) => {
  try {
    const response = await api.delete(`sites/${siteId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddSite = async (connectionId) => {
  try {
    const response = await api.post('/add-website', {
      connectionId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetJavascriptTag = async (siteId) => {
  try {
    const response = await api.get(`/sites/${siteId}/get-js-tags`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const FetchVisitorStats = async (
  siteId,
  period = 'day',
  date = 'last7'
) => {
  try {
    const response = await api.get(`analytics/sites/${siteId}/visits`, {
      params: { period, date },
    });
    return transformVisitorStats(response.data);
  } catch (error) {
    throw error;
  }
};

export const FetchChartData = async (
  siteId,
  period = 'day',
  date = 'last7'
) => {
  try {
    const response = await api.get(`analytics/sites/${siteId}/visits`, {
      params: { period, date }, // ⬅️ sending query params
    });
    return transformChartData(response.data);
  } catch (error) {
    throw error;
  }
};

export const RealTimeApi = async (siteId, period = 'day', date = 'last7') => {
  try {
    const response = await api.get(`/analytics/sites/${siteId}/realtime`, {
      params: { period, date }, // ⬅️ sending query params
    });
    const visitors = Array.isArray(response.data) ? response.data : [];
    return {
      currentVisitors: visitors.length,
      recentActivity: transformRealTimeVisitors(visitors),
    };
  } catch (error) {
    throw error;
  }
};

export const FetchPopularPages = async (
  siteId,
  period = 'day',
  date = 'last7'
) => {
  try {
    const response = await api.get(`/analytics/sites/${siteId}/pages`, {
      params: { period, date }, // ⬅️ sending query params
    });
    return transformPopularPages(response.data);
  } catch (error) {
    throw error;
  }
};

export const FetchVisitorLogs = async (
  siteId,
  period = 'day',
  date = 'last7'
) => {
  try {
    const response = await api.get(`/analytics/sites/${siteId}/visitor-logs`, {
      params: { period, date }, // ⬅️ sending query params
    });
    return transformVisitorLogs(response.data);
  } catch (error) {
    throw error;
  }
};

export default api;
