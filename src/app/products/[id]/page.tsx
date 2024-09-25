'use client'
import { useEffect, useState, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Loading from '@/app/components/Loading';
import Header from '@/app/components/Header';
import Rating from '@/app/components/Rating';
import QuantityCounter from '@/app/components/QuantityCounter';
import { UserContext } from '@/app/contexts/UserContext';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function ProductDetails() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const productId = useParams();
    const router = useRouter();    
    const [productData, setProductData] = useState<any>(null);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const [quantityCount, setQuantityCount] = useState<number>(1);

    const handleUpdateQuantity = (addminus:string) => {
        if (addminus === 'add') {
            setQuantityCount(quantityCount + 1);
        } else if (addminus === 'minus') {
            setQuantityCount(quantityCount - 1);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        const fetchProductData = () => {
            axios.get(`https://fakestoreapi.com/products/${productId.id}`)
                .then(response => {
                    setProductData(response.data);
                    setIsLoading(false);
                })
                .catch(error => {   
                    console.error(error);
                });
        };

        if(productId) {
            fetchProductData();
        }
    }, []);

    // Handle for add to cart on click
    const handleAddToCartClick = (productId:number, quantity:number) => {
        axios.post('https://fakestoreapi.com/carts',{
            userId:1,
            date:new Date().toISOString(),
            products:{productId:productId,quantity:quantity}
        })
        .then(response => {
            axios.get(`https://fakestoreapi.com/products/${productId}`)
                .then(response => {
                    const productTitle = response.data.title;
                    toast(`Added ${quantity} ${productTitle} to cart.`);
                })
                .catch(error => {
                    console.error(error);
                });
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <main>
            <Header />
            {isLoading ? (
                <Loading />
            ) : (
            <section className="product-details-section px-24 mt-4">
                <div className="mb-6">Breadcrumb</div>
                {productData ? (
                    <div className="flex justify-between gap-24">
                        <div className="w-1/2 h-[70vh] bg-white p-3 rounded-xl">
                            <img src={productData.image} className="w-full h-full block object-contain object-center" />
                        </div>
                        <ul className="w-1/2">
                            <li className="text-3xl font-bold mb-3">{productData.title}</li>
                            <li className="text-sm mb-3">{productData.description}</li>
                            <li className="mb-5">
                                <Rating rate={productData.rating.rate}/>
                                <span className="text-zinc-500 text-xs ms-1">({productData.rating.count})</span>
                            </li>
                            <li className="font-bold text-4xl">${productData.price}</li>
                            <hr className="h-[2px] my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            <li className="flex gap-7 items-center">
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
                                <div className="text-xs">
                                    <p>Only <span className="text-red-500 font-medium">12 items</span> left!</p>
                                    <p>Don't miss it</p>
                                </div>
                            </li>
                            <li>
                                <Button  
                                    className="rounded-lg bg-yellow-500 hover:bg-yellow-600 hover:text-white hover:border-yellow-500 font-bold mt-7 shadow-none w-full py-5"
                                    onClick={() => handleAddToCartClick(productData.id, quantityCount)}
                                >
                                    Add to Cart 
                                </Button>
                                <span className="text-xs flex items-center gap-3 mt-2">
                                    <img src="/fast-shipping.svg" className="size-5" />
                                    Free delivery on orders over $30.0
                                </span>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <p>No Product Data</p>
                )}
            </section>
            )}
        </main>
    )
}