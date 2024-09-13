"use client"
import React, { useContext } from 'react';
import Login from './Login';
import { UserContext } from '../contexts/UserContext';
import Link from 'next/link';

const Header = () => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    
    return (
        <header className="bg-zinc-300">
            <h1>My Global Header</h1>
			<Link href="/cart">Cart</Link>
            <Login />
        </header>
    );
};

export default Header;