"use client"
import { createContext, useContext, useState } from 'react';
import { ReactNode } from 'react';

export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [loggedInUser, setLoggedInUser] = useState<any>(null);

    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </UserContext.Provider>
    );
};