"use client"
import React, { FC } from 'react';

interface stepperProps {
    steps: string[],
    currentStep: number,
};

const Stepper: FC<stepperProps> = ({ steps, currentStep }: stepperProps) => {

    return (
        <div className="flex justify-center mt-4 mb-6">
            <ol className="flex items-center w-1/3 text-xs text-gray-900 font-medium sm:text-base">
                {steps.map((step, index) => (
                <li key={index} className={"flex w-full relative text-gray-900 " + (index <= 2 ? "after:content-['']  after:w-full after:h-0.5  after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4 " : "") + (currentStep >= index + 2 ? "after:bg-yellow-600" : "after:bg-zinc-500")}>
                    <div className="block whitespace-nowrap z-10 text-sm text-center">
                        <span className={"size-6 shadow-md rounded-full flex justify-center items-center mx-auto mb-2 lg:w-10 lg:h-10 " + (currentStep >= index + 1 ? "bg-yellow-300" : "bg-white")}>
                            {index + 1}
                        </span>
                        {step}
                    </div>
                </li>
                ))}
            </ol>
        </div>
    );
};

export default Stepper;