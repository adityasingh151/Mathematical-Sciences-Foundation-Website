import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from './store/authSlice';

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const timestamp = useSelector((state) => state.auth.timestamp);
  const expireTime = 3600 * 1000; // 1 hour in milliseconds

  useEffect(() => {
    // Check if session has expired
    if (timestamp && Date.now() - timestamp > expireTime) {
      dispatch(clearUser());
    }

    console.log("ProtectedRoute.")
  }, [timestamp, dispatch, expireTime]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login"/>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
