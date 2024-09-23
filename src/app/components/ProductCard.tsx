"use client"
import React, { useContext, useState, FC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Rating from '@/app/components/Rating';

interface productProps {
    productId: number,
    title: string,
    price: number,
    description: string,
    image: string,
    rate: number,
    count: number,
    onAddToCart: any
}

const ProductCard: FC<productProps> = ({ productId, title, price, description, image, rate, count, onAddToCart }: productProps) => {

    return (
        <Card className="bg-transparent shadow-none border-0">
            <CardHeader className="h-96 p-10 bg-white rounded-xl">
                <img src={image} className="block w-full h-full object-contain object-center rounded-xl" />
            </CardHeader>
            <CardContent className="flex justify-between px-0 pt-3">
                <div>
                    <CardTitle className="block truncate max-w-48">{title}</CardTitle>
                    <CardDescription className="block truncate max-w-48 mt-px">{description}</CardDescription>
                    <div className="flex items-center text-xs text-zinc-500 mt-2">
                        <Rating rate={rate} />
                        <span>({count})</span>
                    </div>
                    <Button 
                        variant="outline" 
                        className="border-2 border-zinc-900 rounded-full bg-transparent hover:bg-yellow-500 hover:text-white hover:border-yellow-500 font-medium text-sm mt-4 shadow-none"
                        onClick={() => onAddToCart(productId)}
                    >
                        Add to Cart
                    </Button>
                </div>
                <div className="font-bold">${price}</div>
            </CardContent>
        </Card>

    );
};

export default ProductCard;