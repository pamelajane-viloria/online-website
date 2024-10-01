'use client'
import React, { useState, useContext } from 'react'
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UserContext } from '@/app/contexts/UserContext';
import { Label } from "@/components/ui/label";

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
                        if (user) {
                            setLoggedInUser({ id: user.id, username: user.username, token: localStorage.getItem('authToken') });
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
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader className="items-center justify-center">
                <DialogTitle>Welcome back!</DialogTitle>
                <DialogDescription>
                    Please enter your details to sign in.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                        id="username" 
                        className="col-span-4" 
                        placeholder="Enter your username"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                        type="password"
                        id="password" 
                        className="col-span-4" 
                        placeholder="Enter your password"
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
    );
}