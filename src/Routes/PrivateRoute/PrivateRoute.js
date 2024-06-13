import React, { useContext } from 'react';
import Loader from '../../Components/Loader';
import { AuthContext } from '../../Context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader></Loader>
  }

  if (!user?.uid) {
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
  }

  return children;
};

export default PrivateRoute;