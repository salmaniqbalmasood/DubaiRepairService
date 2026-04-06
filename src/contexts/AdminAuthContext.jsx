
import React, { createContext, useContext, useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';

const AdminAuthContext = createContext();

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(pb.authStore.isValid && pb.authStore.model?.collectionName === 'admin_users');
  const [currentAdmin, setCurrentAdmin] = useState(pb.authStore.model);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (pb.authStore.isValid && pb.authStore.model?.collectionName === 'admin_users') {
          await pb.collection('admin_users').authRefresh({ $autoCancel: false });
          setIsAdminAuthenticated(true);
          setCurrentAdmin(pb.authStore.model);
        } else {
          setIsAdminAuthenticated(false);
          setCurrentAdmin(null);
        }
      } catch (error) {
        console.error("Auth refresh failed:", error);
        pb.authStore.clear();
        setIsAdminAuthenticated(false);
        setCurrentAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const unsubscribe = pb.authStore.onChange((token, model) => {
      const isValidAdmin = !!(token && model && model.collectionName === 'admin_users');
      setIsAdminAuthenticated(isValidAdmin);
      setCurrentAdmin(isValidAdmin ? model : null);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const authData = await pb.collection('admin_users').authWithPassword(email, password, { $autoCancel: false });
    return authData;
  };

  const logout = () => {
    pb.authStore.clear();
    setIsAdminAuthenticated(false);
    setCurrentAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminAuthenticated, currentAdmin, login, logout, loading }}>
      {!loading && children}
    </AdminAuthContext.Provider>
  );
};
