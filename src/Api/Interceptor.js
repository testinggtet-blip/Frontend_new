import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const api = axios.create({
  baseURL: process.env.REACT_APP_SITE_URL,
});

export const staticUserApi = axios.create({
  baseURL: process.env.REACT_APP_SITE_URL,
});

export const userApi = axios.create({
  baseURL: process.env.REACT_APP_SITE_URL,
});

export const connectionApi = axios.create({
  baseURL: process.env.REACT_APP_SITE_URL,
});

api.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    const connectionId = localStorage.getItem('connectionId') || undefined;
    if(token){
      req.headers.Authorization = `Bearer ${token}`;
      req.headers['x-connection-id'] = connectionId
    }
    return req;
  },
  (error) => {
    throw error;
  }
);

// Add response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      // Option 1: Use window.location to force a reload and redirect
      window.location.href = '/login';
      // Option 2: If you have access to navigate, use it
      // navigate('/login');
    }
    return Promise.reject(error);
  }
);

connectionApi.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    const connectionId = localStorage.getItem('connectionId') || undefined;

    if(token){
      req.headers.Authorization = `Bearer ${token}`;
      req.headers['x-connection-id'] = connectionId
    }

    return req;
  },
  (error) => {
    throw error;
  }
);

connectionApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error;
  }
);

staticUserApi.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = process.env.REACT_APP_X_API_KEY;
    const token = process.env.REACT_APP_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    throw error;
  }
);

userApi.interceptors.request.use(
  (req) => {
    req.headers["x-api-key"] = process.env.REACT_APP_X_API_KEY;
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    throw error;
  }
);