import { CreateWebBuilder } from 'Api/Api';
import { api } from '../../../../Api/Interceptor';

// Base API URL - replace with your actual backend URL
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Create a new website with generated details
 * @param {Object} websiteData - Basic website information
 * @returns {Promise} - Promise resolving to the saved website data
 */
export const createWebsite = async (websiteData) => {
  try {

    // Prepare complete website object
    const completeWebsiteData = {
      webBuilderName: websiteData.webBuilderName || 'Untitled Website',
      htmlContent: websiteData.htmlContent || '',
      cssContent: websiteData.cssContent || '',
      jsContent: websiteData.jsContent || 'one', // Default JS content
      deleted: websiteData.deleted || false,
      createdTime: new Date().toISOString(),
      modifiedTime: new Date().toISOString(),
      shortUrl: websiteData.shortUrl || 'o', // Default short URL
      userId: websiteData.userId || null, // Optional: Add user ID if authentication is implemented
    };


    // Call the backend API to save the website (assuming CreateWebBuilder is an HTTP request function)
    // const response = await CreateWebBuilder(completeWebsiteData);
    // Handle response - ensure response.data is a valid object
    // if (!response || !response.data) {
    //   throw new Error('Invalid response from backend');
    // }

    // Return the saved website data
    return {
      ...completeWebsiteData,
      // ...response.data, // Merge with the response data from the backend
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Update an existing website
 * @param {string} websiteId - ID of the website to update
 * @param {Object} websiteData - Updated website information
 * @returns {Promise} - Promise resolving to the updated website data
 */
export const updateWebsite = async (websiteId, websiteData) => {
  try {
    // Prepare update object
    const updateData = {
      ...websiteData,
      updatedAt: new Date().toISOString(),
    };

    // Update website in backend
    const response = await api.put(`websites/${websiteId}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Save website data to the backend
 * @param {Object} websiteData - Comprehensive website details
 * @returns {Promise} - Promise resolving to the saved website data
 */
export const saveWebsite = async (websiteData) => {
  try {
    const response = await api.post('websites', websiteData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch website data by ID
 * @param {string} websiteId - ID of the website to fetch
 * @returns {Promise} - Promise resolving to the website data
 */
export const getWebsiteById = async (websiteId) => {
  try {
    const response = await api.get(`websites/${websiteId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * List all websites for a user
 * @param {string} userId - ID of the user
 * @returns {Promise} - Promise resolving to list of websites
 */
export const listUserWebsites = async (userId) => {
  try {
    const response = await api.get(`websites/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a website by its ID
 * @param {string} websiteId - ID of the website to delete
 * @returns {Promise} - Promise resolving to deletion result
 */
export const deleteWebsite = async (websiteId) => {
  try {
    const response = await api.delete(`websites/${websiteId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
