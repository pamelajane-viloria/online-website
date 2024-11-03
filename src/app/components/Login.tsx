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
    const [error, setError] = useState<any>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { loggedInUser, setLoggedInUser, getCartItemCount } = useContext(UserContext);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleLoginUser = () => {
        setIsLoading(true);
        setIsError(false);
        setError('');
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
                            localStorage.setItem('user', JSON.stringify({ id: user.id, username: user.username, token: localStorage.getItem('authToken') }));
                            setIsLoading(false);
                            setIsDialogOpen(false);
                            axios.get(`https://fakestoreapi.com/carts/${user.id}`)
                                .then((response) => {
                                    localStorage.setItem('cartItems', JSON.stringify(response.data.products));
                                    getCartItemCount();
                                });
                        } else {
                            setIsLoading(false);
                            setError("Invalid username or password");
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching user details:', error);
                        setIsLoading(false);
                        setError('Error fetching user details');
                    });
                // End of getting user data
            } else {
                setIsLoading(false);
                setError("Invalid username or password");
            }
        })
        .catch(error => {
            console.error(error);
            setIsLoading(false);
            setError('Invalid username or password');
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
            <div className="grid gap-2 py-4">
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
                {error && <p className="text-red-500 text-xs">{error}</p>}
            </div>
            <DialogFooter>
                <Button onClick={handleLoginUser} disabled={isLoading} className="w-full">
                    {isLoading ? (
                        <div className="flex justify-center">
                            <svg aria-hidden="true" className="inline size-4 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </div>
                    ) : "Sign in"}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}