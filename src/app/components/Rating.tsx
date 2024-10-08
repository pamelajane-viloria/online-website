"use client"
import React, { FC } from 'react';

interface ratingProps {
    rate: number
}

const Rating: FC<ratingProps> = ({ rate }: ratingProps) => {
    return (
       <div className="inline">
            {[1,2,3,4,5].map((star) => (
                <img key={star} src={star <= rate ? "/star-full.svg" : "/star-blank.svg"} className="size-4 inline me-1"/>
            ))}
       </div> 
    );
}

export default Rating;