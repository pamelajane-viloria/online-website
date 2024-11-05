"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const Back = () => {
    const router = useRouter();

    return (
    <Button onClick={() => router.back()} variant="ghost" className="hover:bg-transparent hover:underline px-0 font-semibold mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 me-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Back
    </Button>
    );
};

export default Back;