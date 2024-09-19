'use client'
import Header from "./components/Header";
import React, { useContext } from 'react';
import Slides from './components/Slides';
import Link from 'next/link';

export default function Home() {
	const customerExperience = [
		{ id: 1, icon: "/new-arrival-everyday.svg", title: "New Arrival Everyday", description: "We update our collection almost everyday" },
		{ id: 2, icon: "/all-year-discount.svg", title: "All Year Deals", description: "Enjoy exclusive deals and promos" },
		{ id: 3, icon: "/fast-shipping.svg", title: "Fast & Free Shipping", description: "We offer fast and free shipping to our loyal customers" },
		{ id: 4, icon: "/satisfaction-guarantee.svg", title: "Satisfaction Guarantee", description: "Exchange the product you've purchased if it doesn't fit you" },
	]

	const categories = [
		{ id: 1, name: "electronics", picture: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg" },
		{ id: 2, name: "jewelery", picture: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg" },
		{ id: 3, name: "men's clothing", picture: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
		{ id: 4, name: "women's clothing", picture: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg" },
	]
	return (
		<main>
			<Header />
			<Slides />
			<section className="customer-experience-container px-24 my-12">
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
			<section className="categories-container px-24 my-12">				
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
					<div className="col-span-2 sm:col-span-1 md:col-span-2 bg-gray-50 h-auto md:h-full flex flex-col">
						<Link href="#" className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 flex-grow">
							<img src="/categories.webp" 
								alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" 
							/>
							<div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-gray-900/10"></div>
							<h3 className="z-10 text-2xl font-bold text-zinc-100 absolute top-0 left-0 p-10 xs:text-xl md:text-5xl">Explore all our categories</h3>
						</Link>
					</div>
					<div className="col-span-2 sm:col-span-1 md:col-span-2 bg-stone-50">
						<Link href="#" className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 mb-4">
							<img src="/electronics.jpeg" 
								alt="" 
								className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" 
							/>
							<div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-gray-900/10"></div>
							<h3 className="z-10 font-bold text-white absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-zinc-900 rounded-full uppercase tracking-wider px-3 py-2">Electronics</h3>
						</Link>
						<div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
							<Link href="#" className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40">
								<img src="/men's clothing.jpeg" alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
								<div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-gray-900/10"></div>
								<h3 className="z-10 font-bold text-nowrap text-white absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-zinc-900 rounded-full uppercase tracking-wider px-3 py-2">Men's Clothing</h3>
							</Link>
							<Link href="#" className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40">
								<img src="/women's clothing.webp" alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
								<div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-gray-900/10"></div>
								<h3 className="z-10 font-bold text-nowrap text-white absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-zinc-900 rounded-full uppercase tracking-wider px-3 py-2">Women's Clothing</h3>
							</Link>
						</div>
					</div>
					<div className="col-span-2 sm:col-span-1 md:col-span-1 bg-sky-50 h-auto md:h-full flex flex-col">
						<Link href="#" className="group relative flex flex-col overflow-hidden rounded-2xl px-4 pb-4 pt-40 flex-grow">
							<img src="/jewelry.jpeg" alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
							<div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-gray-900/10"></div>
							<h3 className="z-10 font-bold text-white absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-zinc-900 rounded-full uppercase tracking-wider px-3 py-2">Jewelry</h3>
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
