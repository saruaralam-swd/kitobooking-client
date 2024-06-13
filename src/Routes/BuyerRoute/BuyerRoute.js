import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../../Components/Loader';
import { AuthContext } from '../../Context/AuthProvider';
import useBuyer from '../../hooks/UseBuyer';

const BuyerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
  const location = useLocation();

  if (loading || isBuyerLoading) {
    return <Loader></Loader>
  }

  if (user && isBuyer) {
    return children;
  }

  return <Navigate to={user ? '/dashboard' : '/login'} state={{ from: location }} replace></Navigate>
};

export default BuyerRoute;