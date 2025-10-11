import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

/**
 * A custom hook to provide easy access to the AuthContext.
 * Instead of importing useContext and AuthContext in every component,
 * we can just call useAuth().
 * @returns The authentication context (user, authTokens, loginUser, logoutUser)
 */
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;