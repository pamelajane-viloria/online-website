'use client'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

export default function ProductsPage() {
    const [cartData, setCartData] = useState<any[]>([]);
    const [productData, setProductData] = useState<any[]>([]);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    // Get all products in cart based on User ID
    useEffect(() => {
        const fetchCardData = () => {
            axios.get(`https://fakestoreapi.com/carts/${loggedInUser.id}`)
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
    }, []);

    return (
        <main>
            {productData ? (
                <ul>
                    {productData.map((product) => (
                        <li key={product.id}>{product.title}</li>
                    ))}
                </ul>
            ) : (
                <p>Cart Empty</p>
            )}
        </main>
    );
}