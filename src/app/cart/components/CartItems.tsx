"use client"
import React, { useContext, useState, FC, useCallback, useEffect } from 'react';
import axios from 'axios';
import { toast } from "sonner"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Button } from "@/components/ui/button";

interface cartItemsProps {
    userId: number,
    id:number,
    title:string,
    image:string,
    category:string,
    price:number,
    quantity:number,
    onUpdateTotal: (newQuantity:number) => void;
}

const CartItems: FC<cartItemsProps> = ({ userId, id, title, image, category, price, quantity, onUpdateTotal }: cartItemsProps) => {
    const [quantityCount, setQuantityCount] = useState<number>(quantity);
    const [totalAmount, setTotalAmount] = useState<number>(quantity*price);

    const handleUpdateQuantity = (addminus:string) => {
        if (addminus === 'add') {
            setQuantityCount(quantityCount + 1);
        } else if (addminus === 'minus') {
            setQuantityCount(Math.max(quantityCount - 1, 1)); 
        }
        onUpdateTotal(quantityCount);
        axios.put('https://fakestoreapi.com/carts/7',{
                userId: userId,
                date:new Date().toISOString(),
                products:{productId:id,quantity:quantityCount}
            })
            .then(response => {
                toast(`Quantity updated.`);
            })
            .catch(error => {
                console.error(error);
            });
    }

    // Calculate and update total amount of each item
    useEffect(() => {
        const newTotalAmount = quantityCount * price;
        setTotalAmount(newTotalAmount);
    }, [quantityCount]);

    return (
        <TableRow key={id} className="hover:bg-transparent">
            <TableCell className="font-medium flex items-center gap-6 py-8 w">
                <img src={image} className="w-10" />
                <div>
                    <p className="text-wrap">{title}</p>
                    <span className="text-zinc-400 text-regular">{category}</span>
                </div>
            </TableCell>
            <TableCell>
                <form className="max-w-xs">
                    <div className="relative flex items-center max-w-[8rem] border border-2 rounded-xl bg-white">
                        <button type="button" id="decrement-button" onClick={() => handleUpdateQuantity('minus')} data-input-counter-decrement="quantity-input" className="rounded-s-lg p-3 h-11 focus:ring-gray-100">
                            <svg className="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                            </svg>
                        </button>
                        <input 
                            type="text" 
                            id="quantity-input" 
                            value={quantityCount}
                            onChange={(e) => setQuantityCount(Number(e.target.value))}
                            data-input-counter 
                            aria-describedby="helper-text-explanation" 
                            className="border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm block w-full py-2.5" 
                        />
                        <button type="button" id="increment-button" onClick={() => handleUpdateQuantity('add')} data-input-counter-increment="quantity-input" className="rounded-e-lg p-3 h-11 focus:ring-gray-100">
                            <svg className="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </TableCell>
            <TableCell className="font-bold text-lg">$ {totalAmount.toFixed(2)}</TableCell>
            <TableCell>
                <Button variant="ghost" className="hover:bg-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </Button>
            </TableCell>
        </TableRow>


    );
};

export default CartItems;