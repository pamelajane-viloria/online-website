"use client"
import { createContext, useState, ReactNode, useEffect } from 'react';
import Loading from '@/app/components/Loading';
import axios from 'axios';

export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [loggedInUser, setLoggedInUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [itemCount, setItemCount] = useState<number>(0);
    
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setLoggedInUser(JSON.parse(user));
            const parsedUser = JSON.parse(user);
            // Fetch cart item count if user is logged in
            axios.get(`https://fakestoreapi.com/carts/${parsedUser.id}`)
                .then((response) => {
                    setItemCount(response.data.products.length);
                })
                .catch((error) => {
                    console.error('Error fetching cart items:', error);
                });
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div className="py-16"><Loading/></div>;
    }
    
    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser, itemCount, setItemCount }}>
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