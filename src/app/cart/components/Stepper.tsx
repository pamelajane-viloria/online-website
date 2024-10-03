"use client"
import React, { FC } from 'react';

interface stepperProps {
    steps: string[],
    currentStep: number,
};

const Stepper: FC<stepperProps> = ({ steps, currentStep }: stepperProps) => {

    return (
        <div className="flex items-start max-w-screen-lg justify-center">
            {steps.map((step, index) => (
            <div className={" " + (index <= 2 ? "w-full" : "")} key={index}>
                <div className="flex items-center w-full">
                    <div className={"w-8 h-8 shrink-0 mx-[-1px] p-1.5 flex items-center justify-center rounded-full " + (currentStep >= index + 1 ? "bg-yellow-400" : "bg-zinc-500")}>
                        <span className="text-base text-white font-bold">{index + 1}</span>
                    </div>
                    {index <= 2 && (
                        <div className={"w-full h-1 mx-4 rounded-lg " + (currentStep >= index + 2 ? "bg-yellow-600" : "bg-zinc-500")}></div>
                    )}
                </div>
                <div className="mt-2 mr-4">
                    <h6 className="text-sm md:text-base font-bold text-yellow-500">{step}</h6>
                </div>
            </div>
            // <div className="w-full">
            // <div className="flex items-center w-full">
            //     <div className="w-8 h-8 shrink-0 mx-[-1px] bg-blue-600 p-1.5 flex items-center justify-center rounded-full">
            //     <span className="text-base text-white font-bold">2</span>
            //     </div>
            //     <div className="w-full h-1 mx-4 rounded-lg bg-blue-600"></div>
            // </div>
            // <div className="mt-2 mr-4">
            //     <h6 className="text-base font-bold text-blue-500">Education</h6>
            //     <p className="text-xs text-gray-400">Completed</p>
            // </div>
            // </div>
            // <div>
            //     <div className="flex items-center">
            //         <div className="w-8 h-8 shrink-0 mx-[-1px] bg-gray-300 p-1.5 flex items-center justify-center rounded-full">
            //             <span className="text-base text-white font-bold">3</span>
            //         </div>
            //     </div>
            //     <div className="mt-2">
            //         <h6 className="text-base font-bold text-blue-500">Review</h6>
            //         <p className="text-xs text-gray-400">Pending</p>
            //     </div>
            // </div>
            ))}
        </div>
  
    );
};

export default Stepper;