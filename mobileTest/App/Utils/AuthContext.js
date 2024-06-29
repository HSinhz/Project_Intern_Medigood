import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  console.log("UserEmail: ", phoneNumber);
  const login = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
  };

  const logout = () => {
    setPhoneNumber(null);
    setAccessToken(null)
  };

  return (
    <AuthContext.Provider value={{ phoneNumber, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext; // Xuất AuthContext để có thể sử dụng ở bên ngoài