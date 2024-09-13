'use client'
import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { UserContext } from '../contexts/UserContext';

export default function Login() {
    const [username, setUsername] = useState<any>('');
    const [password, setPassword] = useState<any>('');
    const [error, setError] = useState<any>(null);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    const handleLoginUser = () => {
        axios.post('https://fakestoreapi.com/auth/login',{
            username: username,
            password: password
        })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                // Start of getting user data
                axios.get(`https://fakestoreapi.com/users`)
                    .then(response => {
                        const user = response.data.find((data: any) => data.username === username);
                        console.log(user);
                        if (user) {
                            setLoggedInUser({ id: user.id, username: user.username, token: localStorage.getItem('authToken') }); // update loggedinuser data (id, username, token)
                        } else {
                            setError('User not found');
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching user details:', error);
                        setError('Error fetching user details');
                    });
                // End of getting user data
            } else {
                setError("Invalid username or password");
            }
        })
        .catch(error => {
            console.error(error);
            setError('An error occurred while trying to log in');
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Input 
                            id="username" 
                            className="col-span-4" 
                            placeholder="Your username*"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Input 
                            id="password" 
                            className="col-span-4" 
                            placeholder="Your password*"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={handleLoginUser}>
                            Sign In
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}