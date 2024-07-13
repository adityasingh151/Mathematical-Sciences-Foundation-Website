import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './databaseConfig/firebaseConfig'; // Adjust the import path if needed

const ProtectedRoute = () => {
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!user || error) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
