"use client"
import { createContext, useState, ReactNode } from "react";
import { useRouter } from 'next/navigation';

export const CategoryContext = createContext<any>(null);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<'all' | string>(selectedCategory || 'all');
	const router = useRouter();

    const handleCategoryClick = (category:string) => {
		setSelectedCategory(category);
        if(!category) {
            setActiveCategory("all");
        }
		router.push('/products');
	};
    
    return (
        <CategoryContext.Provider value={{ selectedCategory, handleCategoryClick, activeCategory, setActiveCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};