import apiClient from '../api/axiosConfig';

/**
 * A function to handle the user registration API call.
 * @param {object} userData - The user's registration data (username, email, password, etc.).
 * @returns {Promise} - The promise from the Axios API call.
 */
export const registerUser = (userData) => {
  return apiClient.post('/auth/register/', userData);
};

// Note: The login API call is already handled inside AuthProvider.js
// because it's directly tied to setting the authentication state.
// We could move it here for consistency, but for now, this is fine.