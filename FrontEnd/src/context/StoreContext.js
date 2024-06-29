import React, { Children, createContext, useContext, useState } from 'react';

const StoreContext = createContext();

export const StoreProvider = ({children}) => {
    const [storeContext, setStoreContext] = useState(null);

    return (
        <StoreContext.Provider value={{ storeContext, setStoreContext}}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = () => useContext(StoreContext);


