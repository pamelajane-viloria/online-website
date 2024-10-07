"use client"
import React, { useContext, useState, useEffect } from 'react';
import Login from './Login';
import { UserContext } from '@/app/contexts/UserContext';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { motion } from 'framer-motion';
import axios from 'axios';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";

const Header = () => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const [search, setSearch] = useState<string>('');
    const [productsData, setProductsData] = useState<any[]>([]);
    const [isInputExpanded, setisInputExpanded] = useState<boolean>(false);
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const router = useRouter();

    // clear search input after hiding
    const handleShowSearchInput = () => {
        !isInputExpanded ? setisInputExpanded(true) : setisInputExpanded(false);
        setTimeout(() => {
            handleClearSearch();
          }, 1000);
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
        localStorage.removeItem("user");
        localStorage.removeItem("shippingData");
        localStorage.removeItem("paymentData");
        router.push('/')
    };

    const handleClearSearch = () => {
        setSearch("");
    };

    return (
        <div className="shadow md:shadow-none bg-white md:bg-transparent">
            <header className="bg-yellow-400 hidden lg:block">
                <div className="flex justify-between xl:px-24 lg:px-12 px-5">
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
            <nav className="flex flex-row justify-between items-center xl:px-24 lg:px-12 px-5 py-3 relative">
                <Link href="/">
                    <h1 className="hidden md:inline text-xl text-base font-bold">Jennie & CO</h1>
                    <h1 className="inline md:hidden text-xl text-base font-bold">J&CO</h1>
                </Link>
                <NavigationMenu className="hidden md:flex md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
                    <NavigationMenuList>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuItem className="hover:bg-zinc-200 cursor-pointer rounded-md w-max py-2 px-3">
                                <NavigationMenuLink className="font-medium text-sm">Home</NavigationMenuLink>
                            </NavigationMenuItem>
                        </Link>
                        <Link href="/products" legacyBehavior passHref>
                            <NavigationMenuItem className="hover:bg-zinc-200 cursor-pointer rounded-md w-max py-2 px-3">
                                <NavigationMenuLink className="font-medium text-sm px-3">Shop</NavigationMenuLink>
                            </NavigationMenuItem>
                        </Link>
                        <Link href="/faqs" legacyBehavior passHref>
                            <NavigationMenuItem className="hover:bg-zinc-200 cursor-pointer rounded-md w-max py-2 px-3">
                                <NavigationMenuLink className="font-medium text-sm px-3">FAQs</NavigationMenuLink>
                            </NavigationMenuItem>
                        </Link>
                    </NavigationMenuList>
                </NavigationMenu>
                <ul className="flex flex-row justify-between items-center gap-5 md:gap-3">
                    <li className="relative flex justify-end hidden md:flex">
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
                                                <li key={key} onClick={handleClearSearch}>
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
                    <li className="hidden md:flex">
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
                    <li className="md:hidden">
                        <Dialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="bg-transparent">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                        </svg>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuGroup>
                                        <Link href="/" legacyBehavior passHref>
                                            <DropdownMenuItem>
                                                Home
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link href="/products" legacyBehavior passHref>
                                            <DropdownMenuItem>
                                                Products
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link href="/faqs" legacyBehavior passHref>
                                            <DropdownMenuItem>
                                                FAQs
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    {loggedInUser ? (
                                        <DropdownMenuItem onClick={handleLogoutUser}>
                                            Logout
                                        </DropdownMenuItem>
                                    ) : (
                                        <DialogTrigger asChild>
                                            <DropdownMenuItem>
                                            Login
                                            </DropdownMenuItem>
                                        </DialogTrigger>

                                    )}
                                </DropdownMenuContent> 
                                <Login />
                            </DropdownMenu>
                        </Dialog>
                    </li>
                </ul>
            </nav>
            <div className="md:hidden bg-white px-3 pb-2 focus-visible:ring-0">
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
            </div>
        </div>
    );
};

export default Header;