'use client'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Loading from './loading';
import Header from '../components/Header';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { toast } from "sonner"
import Link from 'next/link';

export default function ProductsPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [productsData, setProductsData] = useState<any[]>([]);
    const [categoriesData, setCategoriesData] = useState<any[]>([]);
    const [sort, setSort] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [cartItem, setCartItem] = useState<any[]>([]);
    // const { toast } = useToast();

    // Get all products, default render
    useEffect(() => {
        const fetchProductData = () => {
            setIsLoading(true);
            axios.get('https://fakestoreapi.com/products')
                .then(response => {
                    const products = response.data;
                    setProductsData(products);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setIsLoading(false);
                });
        };
        fetchProductData();
    }, []);

    // Handler for sorted products
    const handleSortClick = (order:string) => {
        if (order === 'desc') {
            setSort(true);
        } else {
            setSort(false);
        }

        axios.get(`https://fakestoreapi.com/products?sort=${order}`)
            .then(response => {
                setProductsData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleViewSingleProduct = () => {
        // Router.push(`/products/1`);
    }

    // Get all categories
    useEffect(() => {
        const fetchCategoriesData = () => {
            axios.get('https://fakestoreapi.com/products/categories')
                .then(response => {
                    const categories = response.data;
                    setCategoriesData(categories);
                })
                .catch(error => {
                    console.error(error);
                });
        };
        fetchCategoriesData();
    }, []);
    
    // Handler for selected category
    const handleCategoryClick = (category:string) => {
        axios.get(`https://fakestoreapi.com/products/category/${category}`)
        .then(response => {
            setProductsData(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    };

    const handleAddToCartClick = (productId:number) => {
        axios.post('https://fakestoreapi.com/carts',{
            userId:5,
            date:new Date().toISOString(),
            products:{productId:productId,quantity:1}
        })
        .then(response => {
            const productId = response.data.products.productId;
            const quantity = response.data.products.quantity;
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
        <div>
            <Header />
            <main>
                <h1>Shop</h1>
                {isLoading ? (
                    <Loading />
                ): (
                    <>
                        <h2>Categories</h2>
                        {categoriesData ? (
                            <ul>
                                {categoriesData.map((category) => (
                                    <li key={category}>
                                        <button onClick={() => handleCategoryClick(category)}>{category}</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No category data</p>
                        )}
                        <h2>Products</h2>
                        <button onClick={() => handleSortClick(sort ? 'asc' : 'desc')}>Sort {sort ? '↓' : '↑'}</button>
                        {productsData ? (
                            <ul>
                                {productsData.map((product) => (
                                    <li key={product.id}>
                                        <Link href={`/products/${product.id}`}>
                                            {product.title}
                                        </Link>
                                        <Button onClick={() => handleAddToCartClick(product.id)}>Add to Cart</Button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No product data</p>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}