import axios from 'axios';

// Create an Axios instance with default configurations
const api = axios.create({
  // Use local backend URL by default
  baseURL: '/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically attach the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global responses (e.g. 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear local storage if token is invalid or expired
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
    }
    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  updatePassword: async (passwords) => {
    const response = await api.put('/auth/updatepassword', passwords);
    return response.data;
  }
};

// Budget services
export const budgetService = {
  getBudgets: async () => {
    const response = await api.get('/budgets');
    return response.data;
  },
  setBudget: async (budgetData) => {
    const response = await api.post('/budgets', budgetData);
    return response.data;
  }
};

// Transaction services
export const transactionService = {
  getTransactions: async () => {
    const response = await api.get('/transactions');
    return response.data;
  },
  createTransaction: async (txData) => {
    const response = await api.post('/transactions', txData);
    return response.data;
  }
};

// Plaid integration services
export const plaidService = {
  createLinkToken: async () => {
    const response = await api.post('/plaid/create_link_token');
    return response.data;
  },
  exchangePublicToken: async (publicTokenData) => {
    const response = await api.post('/plaid/exchange_public_token', publicTokenData);
    return response.data;
  },
  getAccounts: async () => {
    const response = await api.get('/plaid/accounts');
    return response.data;
  }
};

export default api;
