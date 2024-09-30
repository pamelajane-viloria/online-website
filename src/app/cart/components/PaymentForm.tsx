'use client'
import { useState, useEffect, useCallback, useContext, FC } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { z } from 'zod';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface paymentProps {
    handleNext: () => void;
}

const PaymentForm: FC<paymentProps> = ({ handleNext }: paymentProps) => {
    const formSchema = z.object({
        cardNumber: z.string().min(1, "First Name is required"),
        expirationDate: z.string().min(1, "Last Name is required"),
        cvv: z.string().min(4, "Invalid email address"),
        name: z.string().min(1, "Address is required"),
	});

	type FormData = z.infer<typeof formSchema>;

	const methods = useForm<FormData>({
		resolver: zodResolver(formSchema),
	});
    
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = methods;

	const onSubmit = (data: FormData) => {
		localStorage.setItem('paymentData', JSON.stringify(data));
		handleNext();
	};
  

	return (
		<Form {...methods}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mt-4">
				<FormItem className="space-y-1">
					<FormLabel className="font-semibold text-sm">Card Number<span className="text-red-500">*</span></FormLabel>
					<FormControl>
						<Input type="text" className="shadow-none focus-visible:ring-0 focus:border-yellow-200 focus:border-2 pt-px" {...register('cardNumber')} placeholder="Enter card number" />
					</FormControl>
					{errors.cardNumber && <span className="text-xs text-red-500">{errors.cardNumber.message}</span>}
				</FormItem>
				<div className="col-span-2 flex gap-5">
					<FormItem className="w-2/3 space-y-1">
						<FormLabel className="font-semibold text-sm">Expiration Date<span className="text-red-500">*</span></FormLabel>
						<FormControl>
							<Input type="text" className="shadow-none focus-visible:ring-0 focus:border-yellow-200 focus:border-2 pt-px" {...register('expirationDate')} placeholder="Expiration date" />
						</FormControl>
						{errors.expirationDate && <span className="text-xs text-red-500">{errors.expirationDate.message}</span>}
					</FormItem>
					<FormItem className="w-1/3 space-y-1">
						<FormLabel className="font-semibold text-sm">CVV<span className="text-red-500">*</span></FormLabel>
						<FormControl>
							<Input type="text" className="shadow-none focus-visible:ring-0 focus:border-yellow-200 focus:border-2 pt-px" {...register('cvv')} placeholder="CVV" />
						</FormControl>
						{errors.cvv && <span className="text-xs text-red-500">{errors.cvv.message}</span>}
					</FormItem>
				</div>
				<FormItem className="space-y-1">
					<FormLabel className="font-semibold text-sm">Name on Card<span className="text-red-500">*</span></FormLabel>
					<FormControl>
						<Input type="text" className="shadow-none focus-visible:ring-0 focus:border-yellow-200 focus:border-2 pt-px" {...register('name')} placeholder="Enter your name" />
					</FormControl>
					{errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
				</FormItem>

				<Button type="submit" className="col-span-2 mt-4 bg-yellow-300 text-zinc-900 rounded-lg hover:bg-yellow-400 shadow-none font-semibold">
					Pay
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ms-1 size-3">
						<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
					</svg>
				</Button>
			</form>  
		</Form>
	);
};

export default PaymentForm;
