'use client'
import { useEffect, useState, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Loading from '@/app/components/Loading';
import Header from '@/app/components/Header';
import Rating from '@/app/components/Rating';
import QuantityCounter from '@/app/components/QuantityCounter';
import { UserContext } from '@/app/contexts/UserContext';

export default function ProductDetails() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const productId = useParams();
    const router = useRouter();    
    const [productData, setProductData] = useState<any>(null);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

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

    return (
        <main>
            <Header />
            {isLoading ? (
                <Loading />
            ) : (
            <section className="product-details-section px-24 mt-4">
                <div className="mb-6">Breadcrumb</div>
                {productData ? (
                    <div className="flex justify-between gap-16">
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
                            <li>
                                <QuantityCounter 
                                    userId={1}
                                    productId={productData.productId}
                                    quantity={1}
                                />
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