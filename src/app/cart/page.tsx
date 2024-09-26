'use client'
import { useState, useEffect, useCallback, useContext, } from 'react'
import axios from 'axios';
import { UserContext } from '@/app/contexts/UserContext';
import Header from '@/app/components/Header';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import CartItems from '@/app/components/CartItems';

export default function ProductsPage() {
    const [cartData, setCartData] = useState<any[]>([]);
    const [productData, setProductData] = useState<any[]>([]);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const [grandTotal, setGrandTotal] = useState<number>(0);

    // Get all products in cart based on User ID
    useEffect(() => {
        const fetchCardData = () => {
            // axios.get(`https://fakestoreapi.com/carts/${loggedInUser.id}`)
            axios.get(`https://fakestoreapi.com/carts/3`)
                .then(response => {
                    setCartData(response.data);
                    const products = response.data.products;

                    // Start of product details promise
                    const productDetailsPromise = products.map((product: { productId: number; quantity: number }) => {
                        return axios.get(`https://fakestoreapi.com/products/${product.productId}`)
                            .then(response => ({
                                ...response.data,
                                quantity: product.quantity
                            }));
                    });

                    Promise.all(productDetailsPromise)
                        .then(productData => {
                            setProductData(productData);
                            const initialTotal = productData.reduce((sum, product) => {
                                return sum + product.price * product.quantity;
                            }, 0);
                            setGrandTotal(initialTotal);
                        })
                        .catch(error => {
                            console.error(error);
                    });
                    // End of promise

                })
                .catch(error => {
                    console.error(error);
                });
        };
        fetchCardData();
    }, [productData]);


    // Handle total amount updates from each cart item
    const calculateGrandTotal = (newQuantity:number) => {
        const newTotal = productData.reduce((sum, product) => {
            return sum + product.price * newQuantity;
        }, 0);
        setGrandTotal(newTotal);
    };
    
    const handleClearCart = () => {
        axios.delete('https://fakestoreapi.com/carts/3')
            .then(() => {
                setProductData([]);
                setCartData([]);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <main>
            <Header />
            <section className="cart-items-section px-24 mt-4">
                <div className="flex gap-24">
                    <ul className="rounded-xl w-2/3 border-zinc-200 bg-white py-5 px-7">
                        <li className="flex justify-between">
                            <h2 className="font-semibold text-lg">Cart</h2>
                            <Button className="bg-transparent hover:bg-red-50 shadow-none text-xs text-red-500" onClick={handleClearCart}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 me-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                                Clear cart
                            </Button>
                        </li>
                        {productData ? (
                        <li>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {productData.map((product) => (
                                        <CartItems 
                                            key={product.id}
                                            userId={1}
                                            id={product.id}
                                            title={product.title}
                                            image={product.image}
                                            category={product.category}
                                            price={product.price}
                                            quantity={product.quantity}
                                            onUpdateTotal={calculateGrandTotal}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                            
                        </li>
                        ) : (
                            <p>Cart Empty</p>
                        )}
                    </ul>
                    <ul>
                        <li><h3>Grand Total: $ {grandTotal.toFixed(2)}</h3></li>
                    </ul>
                </div>
            </section>
        </main>
    );
}