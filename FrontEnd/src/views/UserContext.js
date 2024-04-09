import React,  { useState } from "react";

const UserContext = React.createContext();

export const UserProvider  =  ({ children }) => {
    // User is the name of the "data" that gets stored in context
    // const [user, setUser] = React.useState({ name: 'ssssss', auth: false });
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("account")) || { isAuthenticated: false, Token: '' }
    );

    // Login updates the user data with a name parameter
    const  loginContext = (userData) => {
        setUser(  userData
           
        );
    };

    // Logout updates the user data to default
    const logout = () => {
        setUser((user) => ({
        name: '',
        auth: false,
        }));
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => React.useContext(UserContext)

export default UserContext