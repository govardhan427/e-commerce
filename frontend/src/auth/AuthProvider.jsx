import React, { createContext, useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig';
import { jwtDecode } from 'jwt-decode'; // FIX: Use named import { jwtDecode }

// 1. Create the Auth Context
const AuthContext = createContext();

// 2. Create the Auth Provider Component
const AuthProvider = ({ children }) => {
  // State to hold the auth tokens and user data
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access) : null); // FIX: Use jwtDecode
  const [loading, setLoading] = useState(true);

  // Function to handle user login
  const loginUser = async (username, password) => {
    try {
      const response = await apiClient.post('/auth/token/', {
        username,
        password,
      });
      
      if (response.status === 200) {
        const data = response.data;
        setAuthTokens(data);
        setUser(jwtDecode(data.access)); // FIX: Use jwtDecode
        localStorage.setItem('authTokens', JSON.stringify(data));
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert('Login failed! Please check your credentials.');
    }
  };

  // Function to handle user logout
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  // The context data that will be available to all children components
  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
  };

  // This useEffect will run once when the component mounts to handle token refreshing, etc.
  useEffect(() => {
    // We will add token refresh logic here later
    setLoading(false);
  }, [authTokens, loading]);

  // Provide the context to the rest of the app
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };