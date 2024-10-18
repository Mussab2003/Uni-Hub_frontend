"use client";
import { createContext, useContext, useState, useEffect } from "react";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const setCookie = (name, value, hours = 1) => {
  const expires = new Date(Date.now() + hours * 3600 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [name, setName] = useState(null);
  const [token, setToken] = useState(null);
  const [isGoogle, setIsGoogle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedName = getCookie("name");
    const storedToken = getCookie("token");
    const storedIsGoogle = getCookie("isGoogle");

    if (storedName && storedToken && storedIsGoogle) {
      setName(storedName);
      setToken(storedToken);
      setIsGoogle(storedIsGoogle);
    }
    setLoading(false);
  }, []);

  const setAuthData = (name, token, isGoogle) => {
    setName(name);
    setToken(token);
    setIsGoogle(isGoogle);
    setCookie("name", name);
    setCookie("token", token);
    setCookie("isGoogle", isGoogle);
  };

  const clearAuthData = () => {
    setName(null);
    setToken(null);
    setIsGoogle(null);

    // Remove cookies
    deleteCookie("name");
    deleteCookie("token");
    deleteCookie("isGoogle");
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        name,
        token,
        isGoogle,
        loading,
        setAuthData,
        clearAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
