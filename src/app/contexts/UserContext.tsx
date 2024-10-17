"use client"
import { createContext, useState, ReactNode, useEffect } from 'react';
import Loading from '@/app/components/Loading';

export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [loggedInUser, setLoggedInUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div className="py-16"><Loading/></div>;
    }
    
    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </UserContext.Provider>
    );
};


    // const [loggedInUser, setLoggedInUser] = useState<any>(() => {
    //     const user = localStorage.getItem('user');
    //     return user ? JSON.parse(user) : false;
    // });

    // // Save user data to localStorage whenever it changes
    // useEffect(() => {
    //     if (loggedInUser) {
    //         localStorage.setItem('user', JSON.stringify(loggedInUser));
    //     }
    // }, [loggedInUser]);