import React, { createContext, useState } from "react";

export const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = () => {
    // implement your login logic here
    setLoggedIn(true);
  };

  const logout = () => {
    // implement your logout logic here
    setLoggedIn(false);
  };

  return (
    <LoginContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
}
