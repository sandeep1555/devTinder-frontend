import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("authToken"));

  const logIn = (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  const logOut = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
  };

  const isLoggedIn = () => {
    return authToken ? true : false;
  }

  return (
    <AuthContext.Provider value={{ authToken, logIn, logOut,isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
