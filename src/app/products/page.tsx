'use client'
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function ProductsPage() {
    const [productsData, setProductsData] = useState<any[]>([]);

    useEffect(() => {
        const fetchProductData = () => {
            axios.get('https://fakestoreapi.com/products')
                .then(response => {
                    const products = response.data;
                    setProductsData(products);
                })
                .catch(error => {
                    console.error(error);
                });
        };

        fetchProductData();
    }, []);
    
    // Console.log Area
    console.log(productsData);
    
    return (
        <div>
            {productsData ? (
                <ul>
                    {productsData.map((product) => (
                        <li key={product.id}>{product.title}</li>
                    ))}
                </ul>
            ) : (
                <p>No data</p>
            )}
        </div>
    );
}