"use client"
import React, { useContext, useState, useEffect } from 'react';
import Login from './Login';
import { UserContext } from '../contexts/UserContext';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, } from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion';
import axios from 'axios';

const Header = () => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const [search, setSearch] = useState<string>('');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [productsData, setProductsData] = useState<any[]>([]);
    const [isInputExpanded, setisInputExpanded] = useState<boolean>(false);

    const handleShowSearchInput = () => {
        !isInputExpanded ? setisInputExpanded(true) : setisInputExpanded(false);
    };

    // Get all products, default render
    useEffect(() => {
        const fetchProductData = () => {
            axios.get('https://fakestoreapi.com/products')
                .then(response => {
                    setProductsData(response.data);
                    console.log("Fetch product data success");
                })
                .catch(error => {
                    console.error(error);
                });
        };
        fetchProductData();
    }, []);

    return (
        <div>
            <header className="bg-yellow-400 hidden md:block">
                <div className="flex justify-between px-10">
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
            <nav className="flex flex-row justify-between items-center px-10 py-3 relative">
                <h1 className="inline text-xl font-bold">Jennie & CO</h1>
                <NavigationMenu className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/" legacyBehavior passHref>
                                <NavigationMenuLink className="text-sm font-medium">
                                    <Button variant="ghost">Home</Button>
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid grid-rows-4 grid-flow-col gap-1 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li>
                                        <span className="text-sm font-bold ">Second Best</span>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link href="#" className="block rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                <span className="text-xs">Second Best</span>
                                            </Link>  
                                        </NavigationMenuLink>
                                    </li>
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <span className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                                                <div className="mb-2 mt-4 text-lg font-medium">
                                                    Sales & Special Offer
                                                </div>
                                            </span>
                                        </NavigationMenuLink>  
                                    </li>
                                </ul>   
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    <li>
                                        <NavigationMenuLink>
                                            <Link href="#" className="block text-sm font-medium ">
                                                Second best
                                            </Link>  
                                        </NavigationMenuLink>  
                                    </li>
                                </ul>   
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Pages</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    <li>
                                        <NavigationMenuLink>
                                            <Link href="#" className="block text-sm font-medium ">
                                                Second best
                                            </Link>  
                                        </NavigationMenuLink>  
                                    </li>
                                </ul>   
                            </NavigationMenuContent>
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
                                <div id="dropdown" className="absolute mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
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
                        <Button variant="ghost" className="absolute inset-y-0 right-0" onClick={() => handleShowSearchInput()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </Button>
                    </li>
                    <li>
                        <Link href="/cart">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </Link>
                    </li>
                    <li><Login /></li>
                </ul>
            </nav>

        </div>
    );
};

export default Header;