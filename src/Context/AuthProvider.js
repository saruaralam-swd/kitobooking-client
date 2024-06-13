import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.config';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch(`https://used-products-resale-server.vercel.app/categories`);
      const data = await res.json();
      return data;
    }
  });

  const {data: allPhones = [], isLoading: allPhonesLoading} = useQuery({
    queryKey: ['allProducts'],
    queryFn: async () => {
      const res = await fetch('https://used-products-resale-server.vercel.app/allProducts');
      const data  = await res.json();
      return data;
    }
  });

  // authentication start
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (profile) => {
    return updateProfile(auth.currentUser, profile)
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = (provider) => {
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log('user Observing', currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);
  // authentication end


  const authInfo = {
    user,
    loading,
    createUser,
    googleLogin,
    updateUser,
    signIn,
    logOut,
    categories, categoriesLoading,
    allPhones, allPhonesLoading
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;