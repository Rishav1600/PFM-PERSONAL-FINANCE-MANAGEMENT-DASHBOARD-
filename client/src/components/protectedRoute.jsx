import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * ProtectedRoute component that redirects to login if the user is not authenticated.
 * It uses the 'token' in localStorage to verify authentication status.
 */
const ProtectedRoute = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (!isAuthenticated) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
