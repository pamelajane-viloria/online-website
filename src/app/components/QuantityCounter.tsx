"use client"
import React, { useContext, useState, FC } from 'react';
import axios from 'axios';
import { toast } from "sonner"

interface quantityProps {
    userId: number
    productId: number,
    quantity: number
}

const QuantityCounter: FC<quantityProps> = ({ userId, productId, quantity }: quantityProps) => {
    const [quantityCount, setQuantityCount] = useState<number>(quantity);

    const handleUpdateQuantity = (addminus:string) => {
        if (addminus === 'add') {
            setQuantityCount(quantityCount + 1);
        } else if (addminus === 'minus') {
            setQuantityCount(quantityCount - 1);
        }
        axios.put('https://fakestoreapi.com/carts/7',{
                userId: userId,
                date:new Date().toISOString(),
                products:{productId:productId,quantity:quantityCount}
            })
            .then(response => {
                toast(`Quantity updated.`);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <form className="max-w-xs">
            <div className="relative flex items-center max-w-[8rem]">
                <button type="button" id="decrement-button" onClick={() => handleUpdateQuantity('minus')} data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
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
                    className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
                <button type="button" id="increment-button" onClick={() => handleUpdateQuantity('add')} data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                </button>
            </div>
        </form>
    );
};

export default QuantityCounter;