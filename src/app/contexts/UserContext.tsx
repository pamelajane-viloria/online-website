"use client"
import { createContext, useState, ReactNode, useEffect } from 'react';

export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [loggedInUser, setLoggedInUser] = useState<any>(() => {
        const user = localStorage.getItem('user');
        if (!user) {
          return false;
        } else {
            return JSON.parse(user);
        }
    });

    // Save user data to localStorage whenever it changes
    // useEffect(() => {
    //     localStorage.setItem('user', JSON.stringify(loggedInUser));
    // }, [loggedInUser]);

    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </UserContext.Provider>
    );
};