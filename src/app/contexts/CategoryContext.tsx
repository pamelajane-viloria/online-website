"use client"
import { createContext, useState, ReactNode } from "react";
import { useRouter } from 'next/navigation';

export const CategoryContext = createContext<any>(null);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const router = useRouter();

    const handleCategoryClick = (category:string) => {
		setSelectedCategory(category);
		router.push('/products');
	};

    return (
        <CategoryContext.Provider value={{ selectedCategory, handleCategoryClick }}>
            {children}
        </CategoryContext.Provider>
    );
};