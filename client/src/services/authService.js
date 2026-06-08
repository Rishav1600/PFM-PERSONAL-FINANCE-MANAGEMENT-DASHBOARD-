import api from './api';

// Register user
const register = async (userData) => {
  const response = await api.post('/auth/register', userData);

  if (response.data) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userName', response.data.name);
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await api.post('/auth/login', userData);

  if (response.data) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userName', response.data.name);
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
};

// Update password
const updatePassword = async (passwords) => {
    const response = await api.put('/auth/updatepassword', passwords);
    return response.data;
};

const authService = {
  register,
  logout,
  login,
  updatePassword,
};

export default authService;
