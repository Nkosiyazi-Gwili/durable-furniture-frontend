'use client'
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Demo accounts - CORRECTED EMAIL
      const demoAccounts = {
        'admin@comforthaven.com': { 
          password: 'admin123', 
          name: 'Admin User', 
          role: 'admin',
          _id: 'demo-admin-001'
        },
        'john@example.com': { 
          password: 'customer123', 
          name: 'John Doe', 
          role: 'customer',
          _id: 'demo-customer-001'
        }
      };

      if (demoAccounts[email] && demoAccounts[email].password === password) {
        const userData = demoAccounts[email];
        const token = 'demo-token-' + Math.random().toString(36).substr(2, 9);
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        return { success: true };
      } else {
        return { 
          success: false, 
          message: 'Invalid email or password' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        message: 'Login failed' 
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const userData = {
        _id: 'demo-' + Date.now(),
        name,
        email,
        role: 'customer'
      };

      const token = 'demo-token-' + Math.random().toString(36).substr(2, 9);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};