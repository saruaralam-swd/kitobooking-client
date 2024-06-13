import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../../Components/Loader';
import { AuthContext } from '../../Context/AuthProvider';
import useSeller from '../../hooks/UseSeller';

const SellerRoute = ({ children }) => {
  const {user, loading} = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  const location = useLocation();
   

  if (loading || isSellerLoading) {
    return <Loader></Loader>
  }

  if (user && isSeller) {
    return children;
  }

  return <Navigate to={user ? '/dashboard' : '/login'} state={{ from: location }} replace></Navigate>
};

export default SellerRoute;