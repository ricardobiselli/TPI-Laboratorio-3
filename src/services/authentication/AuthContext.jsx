import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (userNameOrEmail, password) => {
    try {
      const response = await fetch('https://localhost:7069/api/authentication/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userNameOrEmail: userNameOrEmail, password: password }),
      });
  
      if (response.ok) {
        const data = await response.text();
        const decodedToken = jwtDecode(data);
        setToken(data);
        setUser(decodedToken);
        localStorage.setItem('token', data);
        console.log('Login successful, user:', decodedToken);
        return true;
      } else {
        console.log('Login failed');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    console.log('Logged out');
  };

  useEffect(() => {
    const loadToken = async () => {
      setLoading(true);
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const decodedToken = jwtDecode(storedToken);
          setToken(storedToken);
          setUser(decodedToken);
          console.log('Token loaded from storage, user:', decodedToken);
        } catch (error) {
          console.error('Failed to decode token', error);
          logout();
        }
      } else {
        console.log('No token found in storage');
      }
      setLoading(false);
    };
  
    loadToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;

