/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import { GlobalContextType } from '../types/GlobalContextType';

export const GlobalContext = React.createContext<GlobalContextType>(
  {} as GlobalContextType
);

type AppcontextProps = { children: any };
const AppContextProvider: React.FC<AppcontextProps> = ({ children }) => {
  const [lang, setLang] = useState(
    localStorage.getItem('language') || navigator.language
  );

  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    localStorage.setItem('language', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  const isLogin = () => {
    if (localStorage && localStorage.getItem('token')) {
      return true;
    }
    return false;
  };

  return (
    <GlobalContext.Provider
      value={{
        lang,
        setLang,
        token,
        setToken,
        isLogin,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContextProvider;
