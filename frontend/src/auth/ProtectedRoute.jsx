import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './useAuth';

/**
 * A component that acts as a guard for private routes.
 * It checks if a user is authenticated.
 * If yes, it renders the child components (the protected page).
 * If no, it redirects the user to the /login page.
 */
const ProtectedRoute = () => {
  const { user } = useAuth(); // Use our custom hook to get the user state

  // If there is no user, redirect to the login page.
  // The 'replace' prop is used to replace the current entry in the
  // history stack instead of pushing a new one, which is better for login redirects.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, render the child route content using the Outlet component.
  return <Outlet />;
};

export default ProtectedRoute;