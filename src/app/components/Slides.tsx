'use client'
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "../styles/slides.css";
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Slide() {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const pictures = [
        {id: 1, title: "Discover the Latest Trends", subtitle: "Explore our newest arrivals in fashion and accessories. Refresh your wardrobe with the latest styles!", url: "https://images.unsplash.com/photo-1645819133607-cd84092bee6f?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
        {id: 2, title: "Unleash Your Style", subtitle: "Find unique and stylish products that fit your personal flair. Elevate your fashion game with standout pieces from our curated selection.",  url: "https://images.unsplash.com/photo-1722247410656-55309195f94c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
        {id: 3, title: "Timeless Elegance", subtitle: "Shop our collection of classic and sophisticated pieces. Perfect for any occasion, from casual outings to formal events.",  url: "https://images.unsplash.com/photo-1697566875313-8e6a88bf1a47?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    ];
    
	return (
        <section className="swiper-container">
            <Swiper
                pagination={true} 
                modules={[Autoplay, Pagination]} 
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
                className="relative rounded-2xl"
            >
                {pictures.map((picture) => (
                    <SwiperSlide key={picture.id}>
                        <img src={picture.url} />
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, ease: 'easeInOut' }}
                        >
                            <div className="absolute top-1/2 transform -translate-y-1/2 w-2/5 text-left px-24">
                                <h2 className="font-bold text-4xl mb-3">{picture.title}</h2>
                                <p className="italic font-light mb-5">{picture.subtitle}</p>
                                <Button variant="outline" className="bg-transparent rounded-sm border-zinc-900 hover:bg-zinc-900 hover:text-zinc-50 shadow-none">
                                    <Link href="/">Shop now!</Link>
                                </Button>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
	);
};
