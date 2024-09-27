"use client"
import React, { useContext, useState, useEffect, FC } from 'react';
import { UserContext } from '@/app/contexts/UserContext';
import Link from 'next/link';
import { Button } from "@/components/ui/button"

interface stepperProps {
    steps: string[],
    currentStep: number,
    // onNext: () => void;
    // onPrevious: () => void;
}

const Stepper: FC<stepperProps> = ({ steps, currentStep }: stepperProps) => {
// const Stepper: FC<stepperProps> = ({ steps, onNext, onPrevious }: stepperProps) => {
    const [activeStep, setActiveStep] = useState(currentStep || 1);
    type ShippingAddress = {
        firstName: string;
        lastName: string;
        company: string,
        streetAddress: string,
        city: string,
        state: string,
        postalCode: string,
        country: string,
        phoneNumber: string,
    };
    // const handleStepClick = (step:number) => {
    //     setActiveStep(step);
    // };
    // +1 in stepper
    // const handleNextStep = () => {
    //     if(currentStep < steps.length - 1) {
    //         setCurrentStep(currentStep + 1);
    //     onNext();
    //     }
    // };

    // -1 in stepper
    // const handlePreviousStep = () => {
    //     if(currentStep > 0) {
    //         setCurrentStep(currentStep - 1);
    //         onPrevious();
    //     }
    // };

    return (
        <div className="flex justify-center mt-4 mb-6">
            <ol className="flex items-center w-1/3 text-xs text-gray-900 font-medium sm:text-base">
                {steps.map((step, index) => (
                <li key={index} className="flex w-full relative text-gray-900 justify-center">
                    <div className="block whitespace-nowrap z-10 text-sm text-center">
                        <span className="size-6 bg-white shadow-md rounded-full flex justify-center items-center mx-auto mb-2 lg:w-10 lg:h-10">{index + 1}</span> {step}
                    </div>
                </li>
                ))}
                {/* <li className="flex w-full relative text-indigo-600  after:content-['']  after:w-full after:h-0.5  after:bg-indigo-600 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
                    <div className="block whitespace-nowrap z-10">
                        <span className="w-6 h-6 bg-indigo-600 border-2 border-transparent rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-white lg:w-10 lg:h-10">1</span> Step 1
                    </div>
                </li>
                <li className="flex w-full relative text-gray-900  after:content-['']  after:w-full after:h-0.5  after:bg-gray-200 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
                    <div className="block whitespace-nowrap z-10">
                        <span className="w-6 h-6 bg-indigo-50 border-2 border-indigo-600 rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-indigo-600 lg:w-10 lg:h-10">2</span> Step 2
                    </div>
                </li> */}
                
            </ol>

        </div>
    );
};

export default Stepper;