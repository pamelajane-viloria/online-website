"use client"
import React, { useContext, FC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Rating from '@/app/components/Rating';
import Link from 'next/link';
import { UserContext } from '@/app/contexts/UserContext';
import Login from '@/app/components/Login';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface productProps {
    productId: number,
    title: string,
    price: number,
    description: string,
    image: string,
    rate: number,
    count: number,
    onAddToCart: any
};

const ProductCard: FC<productProps> = ({ productId, title, price, description, image, rate, count, onAddToCart }: productProps) => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    return (
        <Card className="bg-transparent shadow-none border-0">
            <Link href={`/products/${productId}`}>
                <CardHeader className="lg:h-96 h-56 p-10 bg-white rounded-xl">
                    <img src={image} className="block w-full h-full object-contain object-center rounded-xl" />
                </CardHeader>
                <CardContent className="flex justify-between px-0 py-3">
                    <div>
                        <CardTitle className="block truncate lg:max-w-48 md:max-w-80 max-w-44">{title}</CardTitle>
                        <CardDescription className="block truncate lg:max-w-48 md:max-w-80 max-w-44 mt-px">{description}</CardDescription>
                        <div className="font-bold xl:hidden">${price}</div>
                        <div className="flex items-center text-xs text-zinc-500 mt-2">
                            <Rating rate={rate} />
                            <span>({count})</span>
                        </div>
                    </div>
                    <div className="font-bold hidden xl:flex">${price}</div>
                </CardContent>
            </Link>
            <CardFooter className="px-0">
            {loggedInUser ? (
                <Button 
                    variant="outline" 
                    className="border-2 border-zinc-900 rounded-full bg-transparent hover:bg-yellow-500 hover:text-white hover:border-yellow-500 font-medium text-sm shadow-none"
                    onClick={() => onAddToCart(productId)}
                >
                    Add to Cart
                </Button>
            ) : (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button 
                            variant="outline" 
                            className="border-2 border-zinc-900 rounded-full bg-transparent hover:bg-yellow-500 hover:text-white hover:border-yellow-500 font-medium text-sm shadow-none"
                        >
                            Add to Cart
                        </Button>
                    </DialogTrigger>
                    <Login />
                </Dialog>
            )}
            </CardFooter>
        </Card>

    );
};

export default ProductCard;