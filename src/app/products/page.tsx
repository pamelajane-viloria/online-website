'use client'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import Loading from '@/app/components/Loading';
import Header from '@/app/components/Header';
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { CategoryContext } from '@/app/contexts/CategoryContext';
import ProductCard from '@/app/products/components/ProductCard';
import { UserContext } from '@/app/contexts/UserContext';
import Footer from '@/app/components/Footer';

export default function ProductsPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [productsData, setProductsData] = useState<any[]>([]);
    const [categoriesData, setCategoriesData] = useState<any[]>([]);
    const [sort, setSort] = useState<boolean>(false);
    const { selectedCategory } = useContext(CategoryContext);
    const [activeCategory, setActiveCategory] = useState<'all' | string>(selectedCategory || 'all');
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    // Get all products, default render
    useEffect(() => {
        const fetchProductData = () => {
            setIsLoading(true);
            if(selectedCategory) {
                axios.get(`https://fakestoreapi.com/products/category/${selectedCategory}`)
                .then(response => {
                    setProductsData(response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error(error);
                });
            } else {
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
            }
        };
        fetchProductData();
    }, [selectedCategory]);

    // Handler for sorted products
    const handleSortClick = (order:string) => {
        setIsLoading(true);
        const sortedProducts = [...productsData]; // Copy the products data
        if (order === 'desc') {
            sortedProducts.sort((a, b) => (a.title > b.title ? -1 : 1));
            setSort(true);
        } else {
            sortedProducts.sort((a, b) => (a.title < b.title ? -1 : 1));
            setSort(false);
        }
        setProductsData(sortedProducts);
        setIsLoading(false);
    };

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
        let url = "";
        if(category === "all") {
            url = 'https://fakestoreapi.com/products';
        } else {
            url = `https://fakestoreapi.com/products/category/${category}`;
        }
        setIsLoading(true);
        setActiveCategory(category);
        axios.get(url)
            .then(response => {
                setProductsData(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
            });
    };

    // Handle for add to cart on click
    const handleAddToCartClick = (productId:number) => {
        axios.post('https://fakestoreapi.com/carts',{
            userId:loggedInUser.id,
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
    };
    
    return (
        <div>
            <Header />
            <section className="heading-section xl:px-24 lg:px-12 md:px-5 z-1 md:mt-4">
                <div className="bg-zinc-900 w-full h-[70vh] md:rounded-2xl">
                    <img className="block w-full h-full object-cover object-center opacity-90 rounded-xl" src="/header1.jpeg" />
                </div>
            </section>
            <section className="products-section xl:px-24 lg:px-12 px-5 my-16">
                <h2 className="text-3xl font-bold">Products</h2>
                {isLoading ? (
                    <div className="h-screen">
                        <Loading />
                    </div>
                ): (
                    <>
                        {categoriesData ? (
                            <div className="flex justify-between items-start">
                                <ul className="flex flex-wrap gap-2 my-4">
                                    <li>
                                        <Button 
                                            variant="secondary" 
                                            className={`hover:bg-yellow-100 rounded-full shadow-none ${
                                                activeCategory === 'all' ? 'bg-yellow-400 text-zinc-900' : 'bg-zinc-200'
                                              }`}
                                            onClick={() => handleCategoryClick("all")} 
                                        >
                                            All
                                        </Button>
                                    </li>
                                    {categoriesData.map((category) => (
                                        <li key={category}>
                                            <Button 
                                                variant="secondary" 
                                                className={`hover:bg-yellow-100 rounded-full shadow-none ${
                                                    activeCategory === category ? 'bg-yellow-400 text-zinc-900' : 'bg-zinc-200'
                                                  }`}
                                                onClick={() => handleCategoryClick(category)} 
                                            >
                                                {category}
                                            </Button>
                                        </li>
                                    ))}
                                    <li>
                                        <Button 
                                            variant="outline"
                                            className="rounded-full shadow-none bg-transparent hover:bg-yellow-100 flex md:hidden"
                                            onClick={() => handleSortClick(sort ? 'asc' : 'desc')}
                                        >
                                            Sort {sort ? (
                                                <img src='/sort-a-to-z.svg' className="size-5"/>
                                            ) : (
                                                <img src='/sort-z-to-a.svg' className="size-5"/>
                                            )}
                                        </Button>
                                    </li>
                                </ul>
                                <Button 
                                    variant="outline"
                                    className="rounded-full shadow-none bg-transparent hover:bg-yellow-100 my-4 hidden md:flex"
                                    onClick={() => handleSortClick(sort ? 'asc' : 'desc')}
                                >
                                    Sort {sort ? (
                                        <img src='/sort-a-to-z.svg' className="size-5"/>
                                    ) : (
                                        <img src='/sort-z-to-a.svg' className="size-5"/>
                                    )}
                                </Button>
                            </div>
                        ) : (
                            <p>No category data</p>
                        )}
                        {productsData ? (
                            <ul className="grid lg:grid-cols-4 grid-cols-2 gap-5">
                                {productsData.map((product) => (
                                    <li key={product.id}>
                                        <ProductCard 
                                            productId={product.id}
                                            title={product.title}
                                            price={product.price}
                                            description={product.description}
                                            image={product.image}
                                            rate={product.rating.rate}
                                            count={product.rating.count}
                                            onAddToCart={handleAddToCartClick}
                                        />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No product data</p>
                        )}
                    </>
                )}
            </section>
            <Footer />
        </div>
    );
};