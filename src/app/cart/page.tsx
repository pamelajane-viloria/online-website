'use client'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import QuantityCounter from '../components/QuantityCounter';
import Header from '../components/Header';

export default function ProductsPage() {
    const [cartData, setCartData] = useState<any[]>([]);
    const [productData, setProductData] = useState<any[]>([]);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    
    // Get all products in cart based on User ID
    useEffect(() => {
        const fetchCardData = () => {
            // axios.get(`https://fakestoreapi.com/carts/${loggedInUser.id}`)
            axios.get(`https://fakestoreapi.com/carts/1`)
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
                            console.log(productData);
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
            <Header />
            {productData ? (
                <ul>
                    {productData.map((product) => (
                        <li key={product.id}>{product.title}
                            <QuantityCounter 
                                userId={1}
                                quantity={product.quantity}
                                productId={product.id}
                                // userId={loggedInUser.id}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Cart Empty</p>
            )}
        </main>
    );
}