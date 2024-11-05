"use client"
import Header from "@/app/components/Header";
import React, { useContext, useState, useEffect } from 'react';
import Slides from '@/app/components/Slides';
import Link from 'next/link';
import { CategoryContext } from "@/app/contexts/CategoryContext";
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import './styles/slides.css';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Rating from "@/app/components/Rating";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserContext } from '@/app/contexts/UserContext';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Login from "@/app/components/Login";
import Footer from "@/app/components/Footer";

export default function Home() {
	const { handleCategoryClick } = useContext(CategoryContext);
    const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
	const { loggedInUser, getCartItemCount } = useContext(UserContext);

	const customerExperience = [
		{ id: 1, icon: "/new-arrival-everyday.svg", title: "New Arrival Everyday", description: "We update our collection almost everyday" },
		{ id: 2, icon: "/all-year-discount.svg", title: "All Year Deals", description: "Enjoy exclusive deals and promos" },
		{ id: 3, icon: "/fast-shipping.svg", title: "Fast & Free Shipping", description: "We offer fast and free shipping to our loyal customers" },
		{ id: 4, icon: "/satisfaction-guarantee.svg", title: "Satisfaction Guarantee", description: "Exchange the product you've purchased if it doesn't fit you" },
	];

	useEffect(() => {
        const fetchProducts = () => {
            axios.get('https://fakestoreapi.com/products?limit=6')
                .then(response => {
                    setFeaturedProducts(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        };
        fetchProducts();
    }, []);

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
					const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
					const existingProduct = cartItems.find((item: { productId: number }) => item.productId === productId);
					if (existingProduct) {
						existingProduct.quantity += 1;
					} else {
						cartItems.push({ productId, quantity: 1 });
					}
					localStorage.setItem('cartItems', JSON.stringify(cartItems));
					getCartItemCount();
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
		<main className="mt-32">
			<Header />
			<Slides />
			<section className="customer-experience-container xl:px-24 lg:px-12 px-5 my-16">
				<div>
					<h2 className="text-3xl font-bold">We provide best customer experience</h2>
					<p className="text-zinc-400 italic">We ensure our customers have the best shopping experience</p>
				</div>
				<ul className="mt-8 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 justify-between">
					{customerExperience.map((item) => (
						<li className="lg:text-start text-center" key={item.id}>
							<div className="size-10 p-2 bg-yellow-100 rounded-lg mb-3 mx-auto lg:mx-0">
								<img src={item.icon} />
							</div>
							<h3 className="font-medium mb-px">{item.title}</h3>
							<p className="text-sm text-zinc-400 italic lg:w-2/3">{item.description}</p>
						</li>
					))}
				</ul>
			</section>
			<section className="categories-container xl:px-24 lg:px-12 px-5 my-16">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
					<div className="col-span-2 sm:col-span-1 md:col-span-2 bg-gray-50 h-auto md:h-full flex flex-col">
						<div onClick={() => handleCategoryClick("")} className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 flex-grow">
							<img src="/categories.webp" 
								alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" 
							/>
							<div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-gray-900/10"></div>
							<h3 className="z-10 text-2xl font-bold text-zinc-100 absolute top-0 left-0 p-10 xs:text-xl md:text-5xl">Explore all our categories</h3>
						</div>
					</div>
					<div className="col-span-2 sm:col-span-1 md:col-span-2 bg-stone-50">
						<div onClick={() => handleCategoryClick("electronics")} className="cursor-pointer group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 mb-4">
							<img src="/electronics.jpeg" 
								alt="" 
								className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" 
							/>
							<div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-gray-900/10"></div>
							<h3 className="z-10 xl:font-bold font-medium lg:text-nowrap md:text-wrap text-nowrap xl:text-lg text-sm text-white absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-yellow-400 rounded-full uppercase px-3 py-2">Electronics</h3>
						</div>
						<div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
							<div onClick={() => handleCategoryClick("men's clothing")} className="cursor-pointer group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40">
								<img src="/men's clothing.jpeg" alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
								<div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-gray-900/10"></div>
								<h3 className="z-10 xl:font-bold font-medium lg:text-nowrap md:text-wrap text-nowrap xl:text-lg text-sm text-white absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-yellow-400 rounded-full uppercase px-3 py-2">Men's Clothing</h3>
							</div>
							<div onClick={() => handleCategoryClick("women's clothing")} className="cursor-pointer group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40">
								<img src="/women's clothing.webp" alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
								<div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-gray-900/10"></div>
								<h3 className="z-10 xl:font-bold font-medium lg:text-nowrap md:text-wrap text-nowrap xl:text-lg text-sm text-white absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-yellow-400 rounded-full uppercase px-3 py-2">Women's Clothing</h3>
							</div>
						</div>
					</div>
					<div className="col-span-2 sm:col-span-1 md:col-span-1 bg-sky-50 h-auto md:h-full flex flex-col">
						<div onClick={() => handleCategoryClick("jewelery")} className="cursor-pointer group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 flex-grow">
							<img src="/jewelry.jpeg" alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
							<div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-gray-900/10"></div>
							<h3 className="z-10 xl:font-bold font-medium lg:text-nowrap md:text-wrap text-nowrap xl:text-lg text-sm text-white absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-yellow-400 rounded-full uppercase px-3 py-2">Jewelry</h3>
						</div>
					</div>
				</div>
			</section>
			<section className="featured-products-container xl:px-24 lg:px-12 px-5 my-16">
				<div className="flex justify-between items-center">
					<h2 className="text-3xl font-bold my-8 relative">Featured products</h2>
					<div className="navigation-container">
						<Button className="swiper-button image-swiper-button-prev bg-transparent px-2 shadow-none rounded-none rounded-l-lg border-2" variant={"outline"}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
							</svg>
						</Button>
						<Button className="swiper-button image-swiper-button-next bg-transparent px-2 shadow-none rounded-none rounded-r-lg border-2" variant={"outline"}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
							</svg>						
						</Button>
					</div>
				</div>
				<div className="featured-products-swiper-container">
					<Swiper
						navigation={{
							nextEl: ".image-swiper-button-next",
							prevEl: ".image-swiper-button-prev",
							disabledClass: "swiper-button-disabled"
						}}
						breakpoints={{
							320: { slidesPerView: 2, spaceBetween: 30 },
							480: { slidesPerView: 2, spaceBetween: 30 },
							768: { slidesPerView: 3, spaceBetween: 30 },
						}}
						pagination={{clickable: true,}}
						modules={[Navigation]}
					>
						{featuredProducts.map((product) => (
							<SwiperSlide key={product.id}>
								<div className="lg:h-96 h-36 lg:p-10 p-2 bg-white rounded-xl">
									<img src={product.image} />
								</div>
								<div className="flex justify-between mt-3">
									<Link href={`/products/${product.id}`}>
										<div className="text-left lg:w-3/4">
											<h4 className="font-medium text-sm">{product.title}</h4>
											<p className="text-lg font-bold">${product.price}</p>
										</div>
									</Link>
									{loggedInUser ? (
									<Button onClick={() => handleAddToCartClick(product.id)} className="hidden lg:flex bg-yellow-400 hover:bg-yellow-600">
										<img src="/add-cart.svg"/>
									</Button>
									) : (
									<Dialog>
										<DialogTrigger asChild>
											<Button className="hidden lg:flex bg-yellow-400 hover:bg-yellow-600">
												<img src="/add-cart.svg"/>
											</Button>
										</DialogTrigger>
										<Login />
									</Dialog>
									)}
								</div>
							</SwiperSlide>
						))}					
					</Swiper>
				</div>
			</section>
			<section className="discount-banner-container xl:px-24 lg:px-12 px-5 my-16">
				<div className="bg-yellow-500 flex items-center rounded-xl">
					<div className="w-2/5 lg:me-24 md:me-12 hidden md:flex">
						<img src="/discount-image.jpeg" className="w-full h-full object-cover object-center rounded-l-xl" />
					</div>
					<ul className="md:text-start text-center md:w-auto w-full md:py-0 py-5">
						<li className="uppercase lg:text-sm text-xs text-yellow-50">Limited Time Offer</li>
						<li className="font-bold text-white lg:text-5xl md:text-4xl text-xl">Black Friday Sale</li>
						<li className="font-medium lg:text-2xl md:text-xl text-base mt-2 text-white">Get an extra 10% off & free shipping</li>
						<li className="mt-3">
							<Button variant="outline" className="bg-transparent rounded-sm  text-white border-white hover:bg-white hover:text-zinc-900 shadow-none">
								<Link href="/products">Shop now →</Link>
							</Button>
						</li>
					</ul>
				</div>
			</section>
			<section className="reviews-container xl:px-24 lg:px-12 px-5 my-16">
				<h2 className="text-3xl font-bold">We love hearing from our customers</h2>
				<p className="text-zinc-400 italic mt-3">See what our customers are saying about their interaction with us to get a better understanding of our dedication to showing you only genuine, truthful, and satisfying transactions and shopping experience.</p>
				<div className="flex lg:flex-row flex-col gap-8 justify-between mt-5">
					<Card className="shadow-lg border-0">
						<CardHeader className="pb-3">
							<img src="/quotation.svg" className="size-7 mb-1"/>
							<CardTitle>Positive Experience!</CardTitle>
						</CardHeader>
						<CardContent className="flex justify-between gap-5">
							<p>I had a fantastic experience shopping at Jennie & Co! The shipping was fast, and the product arrived in excellent condition. I would definitely recommend this shop to my friends and family.</p>								
						</CardContent>
						<CardFooter className="flex gap-3">
							<div className="size-12 ">
								<img src="/person2.webp" className="w-full h-full object-cover object-top rounded-full " />
							</div>
							<div>
								<p className="font-bold">Cristina Reyes</p>
								<Rating rate={4} />
							</div>
						</CardFooter>
					</Card>
					<Card className="shadow-lg border-0">
						<CardHeader className="pb-3">
							<img src="/quotation.svg" className="size-7 mb-1"/>
							<CardTitle>Excellent Customer Service</CardTitle>
						</CardHeader>
						<CardContent className="flex justify-between gap-5">
							<p>I recently purchased a shirt. The product is of high quality, and the customer service was exceptional. When I had a question about my order, the customer support team responded promptly and were very helpful.</p>								
						</CardContent>
						<CardFooter className="flex gap-3">
							<div className="size-12 ">
								<img src="/person1.webp" className="w-full h-full object-cover object-top rounded-full " />
							</div>
							<div>
								<p className="font-bold">Maria del Pilar Cruz</p>
								<Rating rate={5} />
							</div>
						</CardFooter>
					</Card>
				</div>
				<Button className="rounded-full bg-yellow-400 text-white hover:bg-yellow-700 font-bold mt-5 shadow-none float-end">Read more →</Button>
			</section>
			<section className="newsletter-container xl:px-24 lg:px-12 px-5 my-16">
				<ul className="flex flex-col justify-center items-center gap-3">
					<li className="lg:text-3xl text-2xl font-bold lg:px-56 text-center">Subscribe to our newsletter to get updates to our latest collections</li>
					<li className="text-zinc-400 italic lg:text-base text-sm text-center">Get 20% off on your first order just by subscribing to our newsletter</li>
					<li className="flex w-full max-w-sm items-center space-x-2">
						<Input type="email" placeholder="Email" className="bg-white"/>
						<Button type="submit" className="bg-yellow-500 hover:bg-yellow-700">Subscribe</Button>
					</li>
				</ul>
			</section>
			<Footer />
		</main>
	);
}
