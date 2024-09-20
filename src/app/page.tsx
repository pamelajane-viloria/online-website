'use client'
import Header from "./components/Header";
import React, { useContext, useState, useEffect } from 'react';
import Slides from './components/Slides';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CategoryContext } from "./contexts/CategoryContext";
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import './styles/slides.css';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner"
import Rating from "./components/Rating";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"

export default function Home() {
	const { handleCategoryClick } = useContext(CategoryContext);
    const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

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
		<main>
			<Header />
			<Slides />
			<section className="customer-experience-container px-24 my-16">
				<div>
					<h2 className="text-3xl font-bold">We provide best customer experience</h2>
					<p className="text-zinc-400 italic">We ensure our customers have the best shopping experience</p>
				</div>
				<ul className="mt-8 flex justify-between">
					{customerExperience.map((item) => (
						<li className="w-1/4" key={item.id}>
							<div className="size-10 p-2 bg-yellow-100 rounded-lg mb-3">
								<img src={item.icon} />
							</div>
							<h3 className="font-medium mb-px">{item.title}</h3>
							<p className="text-sm text-zinc-400 italic w-2/3">{item.description}</p>
						</li>
					))}
				</ul>
			</section>
			<section className="categories-container px-24 my-16">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
					<div className="col-span-2 sm:col-span-1 md:col-span-2 bg-gray-50 h-auto md:h-full flex flex-col">
						<Link href="/products" className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 flex-grow">
							<img src="/categories.webp" 
								alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" 
							/>
							<div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-gray-900/10"></div>
							<h3 className="z-10 text-2xl font-bold text-zinc-100 absolute top-0 left-0 p-10 xs:text-xl md:text-5xl">Explore all our categories</h3>
						</Link>
					</div>
					<div className="col-span-2 sm:col-span-1 md:col-span-2 bg-stone-50">
						<div onClick={() => handleCategoryClick("electronics")} className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 mb-4">
							<img src="/electronics.jpeg" 
								alt="" 
								className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" 
							/>
							<div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-gray-900/10"></div>
							<h3 className="z-10 font-bold text-white absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-yellow-400 rounded-full uppercase tracking-wider px-3 py-2">Electronics</h3>
						</div>
						<div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
							<div onClick={() => handleCategoryClick("men's clothing")} className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40">
								<img src="/men's clothing.jpeg" alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
								<div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-gray-900/10"></div>
								<h3 className="z-10 font-bold text-nowrap text-white absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-yellow-400 rounded-full uppercase tracking-wider px-3 py-2">Men's Clothing</h3>
							</div>
							<div onClick={() => handleCategoryClick("women's clothing")} className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40">
								<img src="/women's clothing.webp" alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
								<div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-gray-900/10"></div>
								<h3 className="z-10 font-bold text-nowrap text-white absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-yellow-400 rounded-full uppercase tracking-wider px-3 py-2">Women's Clothing</h3>
							</div>
						</div>
					</div>
					<div className="col-span-2 sm:col-span-1 md:col-span-1 bg-sky-50 h-auto md:h-full flex flex-col">
						<div onClick={() => handleCategoryClick("jewelry")} className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 flex-grow">
							<img src="/jewelry.jpeg" alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
							<div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-gray-900/10"></div>
							<h3 className="z-10 font-bold text-white absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-yellow-400 rounded-full uppercase tracking-wider px-3 py-2">Jewelry</h3>
						</div>
					</div>
				</div>
			</section>
			<section className="featured-products-container px-24 py-16">
				<div className="flex justify-between items-center">
					<h2 className="text-3xl font-bold my-8 relative">Featured products</h2>
					<div className="navigation-container">
						<Button className="swiper-button image-swiper-button-prev bg-transparent px-2 shadow-none rounded-none rounded-l-lg border-2" variant={"outline"}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
								<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
							</svg>
						</Button>
						<Button className="swiper-button image-swiper-button-next bg-transparent px-2 shadow-none rounded-none rounded-r-lg border-2" variant={"outline"}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
								<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
							</svg>						</Button>
					</div>
				</div>
				<Swiper
					navigation={{
						nextEl: ".image-swiper-button-next",
						prevEl: ".image-swiper-button-prev",
						disabledClass: "swiper-button-disabled"
					  }}
					slidesPerView={3}
					spaceBetween={30}
					pagination={{clickable: true,}}
					modules={[Navigation]}
				>
					{featuredProducts.map((product) => (
						<SwiperSlide key={product.id}>
							<div className="h-96 p-10 bg-white rounded-xl">
								<img src={product.image} />
							</div>
							<div className="flex justify-between mt-3">
								<div className="text-left w-3/4">
									<h4 className="font-medium text-sm">{product.title}</h4>
									<p className="text-lg font-bold">${product.price}</p>
								</div>
								<Button onClick={() => handleAddToCartClick(product.id)} className="bg-yellow-400 hover:bg-yellow-600">
									<img src="/add-cart.svg"/>
								</Button>
							</div>
						</SwiperSlide>
					))}					
				</Swiper>
			</section>
			<section className="discount-banner-container px-24 py-16">
				<div className="bg-yellow-500 flex items-center rounded-xl">
					<div className="w-2/5 me-24">
						<img src="/discount-image.jpeg" className="w-full h-full object-cover object-center rounded-l-xl" />
					</div>
					<ul>
						<li className="uppercase text-sm text-yellow-50">Limited Time Offer</li>
						<li className="font-bold text-white text-6xl">Black Friday Sale</li>
						<li className="font-medium text-2xl mt-2 text-white">Get an extra 10% off & free shipping</li>
						<li className="mt-3">
							<Button variant="outline" className="bg-transparent rounded-sm  text-white border-white hover:bg-white hover:text-zinc-900 shadow-none">
								<Link href="/">Shop now →</Link>
							</Button>
						</li>
					</ul>
				</div>
			</section>
			<section className="reviews-container px-24 py-16">
				<h2 className="text-3xl font-bold">We love hearing from our customers</h2>
				<p className="text-zinc-400 italic mt-3">See what our customers are saying about their interaction with us to get a better understanding of our dedication to showing you only genuine, truthful, and satisfying transactions and shopping experience.</p>
				<div className="flex gap-8 justify-between mt-5">
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
			<section className="newsletter-container px-24 py-28">
				<ul className="flex flex-col justify-center items-center gap-3">
					<li className="text-3xl font-bold px-56 text-center	">Subscribe to our newsletter to get updates to our latest collections</li>
					<li className="text-zinc-400 italic">Get 20% off on your first order just by subscribing to our newsletter</li>
					<li className="flex w-full max-w-sm items-center space-x-2">
						<Input type="email" placeholder="Email" className="bg-white"/>
						<Button type="submit" className="bg-yellow-500 hover:bg-yellow-700">Subscribe</Button>
					</li>
				</ul>
			</section>
			<footer className="bg-yellow-100 px-24 py-8 flex justify-between">
				<h4 className="inline text-xl font-bold">Jennie & CO</h4>
				<p>©2024 Jennie & CO All rights reserved.</p>
			</footer>
		</main>
	);
}
