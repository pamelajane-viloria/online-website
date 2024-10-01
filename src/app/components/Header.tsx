"use client"
import React, { useContext, useState, useEffect } from 'react';
import Login from './Login';
import { UserContext } from '@/app/contexts/UserContext';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import axios from 'axios';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';

const Header = () => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const [search, setSearch] = useState<string>('');
    const [productsData, setProductsData] = useState<any[]>([]);
    const [isInputExpanded, setisInputExpanded] = useState<boolean>(false);
    const router = useRouter();

    const handleShowSearchInput = () => {
        !isInputExpanded ? setisInputExpanded(true) : setisInputExpanded(false);
    };

    // Get all products, default render
    useEffect(() => {
        const fetchProductData = () => {
            axios.get('https://fakestoreapi.com/products')
                .then(response => {
                    setProductsData(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        };
        fetchProductData();
    }, []);

    // Handle for log out user
    const handleLogoutUser = () => {
        setLoggedInUser('');
        router.push('/')
    };

    return (
        <div>
            <header className="bg-yellow-400 hidden md:block">
                <div className="flex justify-between px-24">
                    <ul className="flex flex-row items-center gap-3">
                        <li>
                            <Select defaultValue="EN">
                                <SelectTrigger className="w-[150px] rounded-none border-0 focus:ring-0 shadow-none text-xs">
                                    <SelectValue placeholder="EN">English</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="EN" className="text-xs">English</SelectItem>
                                    <SelectItem value="ZH" className="text-xs">Chinese (Mandarin)</SelectItem>
                                    <SelectItem value="ES" className="text-xs">Spanish</SelectItem>
                                </SelectContent>
                            </Select>
                        </li>
                        <li>
                            <Select defaultValue="USD">
                                <SelectTrigger className="w-[150px] rounded-none border-0 focus:ring-0 shadow-none text-xs">
                                    <SelectValue placeholder="USD">US dollar</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USD" className="text-xs">US dollar</SelectItem>
                                    <SelectItem value="CNY" className="text-xs">Chinese yuan</SelectItem>
                                    <SelectItem value="EUR" className="text-xs">Euro</SelectItem>
                                </SelectContent>
                            </Select>
                        </li>
                        <li>
                            <a href="tel:+4733378901" className="text-xs">Need Any Help? Call us: (+800) 1234 56</a>
                        </li>
                    </ul>
                    <ul className="flex flex-row items-center gap-3 text-xs">
                        <li><Link href="#">Store Location</Link></li>
                        <li><Link href="#">Services</Link></li>
                        <li><Link href="#">Subscribe</Link></li>
                        <li><Link href="#">Gift Cards</Link></li>
                    </ul>
                </div>
            </header>
            <nav className="flex flex-row justify-between items-center px-24 py-3 relative">
                <Link href="/">
                    <h1 className="inline text-xl font-bold">Jennie & CO</h1>
                </Link>
                <NavigationMenu className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <NavigationMenuList>
                        <NavigationMenuItem className="hover:bg-zinc-200 rounded-md w-max py-2 px-3">
                            <Link href="/" legacyBehavior passHref>
                                <NavigationMenuLink className="font-medium text-sm">Home</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="hover:bg-zinc-200 rounded-md w-max py-2 px-3">
                            <Link href="/products" legacyBehavior passHref>
                                <NavigationMenuLink className="font-medium text-sm px-3">Shop</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="hover:bg-zinc-200 rounded-md w-max py-2 px-3">
                            <Link href="/about" legacyBehavior passHref>
                                <NavigationMenuLink className="font-medium text-sm px-3">About Us</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <ul className="flex flex-row justify-between items-center gap-3">
                    <li className="relative flex justify-end">
                        <motion.div
                            initial={{ width: '0%', opacity: 0 }}
                            animate={{ width: isInputExpanded ? '100%' : '0%', opacity: isInputExpanded ? 1 : 0 }}
                            transition={{ duration: 1, ease: 'easeInOut' }}
                        >
                            <Input 
                                type="search" 
                                placeholder="Search products" 
                                value={search}
                                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                                className="z-10"
                            />
                            {search && (
                                <div id="dropdown" className="absolute mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 z-[100]">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                        {productsData.filter((row) => {
                                            if(row.title.toLowerCase().includes(search)) {
                                                return row;
                                            }})
                                            .map((row, key) => (
                                                <li key={key} className="">
                                                    <Link href={`/products/${row.id}`} className="block truncate max-w-xs px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                        {row.title}
                                                    </Link>
                                                </li>
                                        ))}
                                    </ul>
                                </div>
                            )}   
                        </motion.div>
                        <Button variant="ghost" className="absolute inset-y-0 right-0 hover:bg-trasparent" onClick={() => handleShowSearchInput()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </Button>
                    </li>
                    <li>
                        {loggedInUser ? (
                        <Link href="/cart" className="relative z-[20]">
                            <img src="/cart.svg" className="size-6" />
                        </Link>
                        ) : (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" className="px-0 relative z-[20]">
                                    <img src="/cart.svg" className="size-6" />
                                </Button>
                            </DialogTrigger>
                            <Login />
                        </Dialog>
                        )}
                    </li>
                    <li>
                    {loggedInUser ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="py-2 px-4">
                                <img src="/user.svg" className="size-6" />                            
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={handleLogoutUser}>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        ) : (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost">
                                    <img src="/user.svg" className="size-6" />
                                </Button>
                            </DialogTrigger>
                            <Login />
                        </Dialog>
                    )}
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;