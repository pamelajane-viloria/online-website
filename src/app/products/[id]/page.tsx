'use client'
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function ProductDetails() {
    const productId = useParams();
    const router = useRouter();    
    const [productData, setProductData] = useState<any>(null);

    useEffect(() => {
        const fetchProductData = () => {
            axios.get(`https://fakestoreapi.com/products/${productId.id}`)
                .then(response => {
                    setProductData(response.data);
                })
                .catch(error => {   
                    console.error(error);
                });
        };

        if(productId) {
            fetchProductData();
        }
    }, []);

    return (
        <div>
            { productData ? (
                <p>{productData.title}</p>
            ) : (
                <p>No Data</p>
            )}
        </div>
    )
}