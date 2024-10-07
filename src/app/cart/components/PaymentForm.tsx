'use client'
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormItem, FormLabel, } from "@/components/ui/form";
import { z } from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface paymentProps {
    handleNext: () => void;
};

const PaymentForm: FC<paymentProps> = ({ handleNext }: paymentProps) => {
	const formSchema = z.object({
		cardNumber: z
			.string()
			.min(16, 'Card number must be at least 16 characters')
			.max(19, 'Card number cannot exceed 19 characters')
			.regex(/^\d{16,19}$/, 'Invalid card number format'),
	  
		expirationDate: z
			.string()
			.regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiration date format'),
	  
		cvv: z
			.string()
			.min(3, 'CVV must be at least 3 characters')
			.max(4, 'CVV cannot exceed 4 characters'),
	  
		name: z
			.string()
			.min(1, 'Name is required')
			.regex(/^[A-Za-z\s]+$/, 'Name must contain only letters and spaces'),
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
				<div className="md:col-span-2 flex md:flex-row flex-col gap-5">
					<FormItem className="md:w-2/3 w-full space-y-1">
						<FormLabel className="font-semibold text-sm">Expiration Date<span className="text-red-500">*</span></FormLabel>
						<FormControl>
							<Input type="text" className="shadow-none focus-visible:ring-0 focus:border-yellow-200 focus:border-2 pt-px" {...register('expirationDate')} placeholder="MM/YY" />
						</FormControl>
						{errors.expirationDate && <span className="text-xs text-red-500">{errors.expirationDate.message}</span>}
					</FormItem>
					<FormItem className="md:w-1/3 w-full space-y-1">
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

				<Button type="submit" className="fixed bottom-0 right-0 left-0 w-full lg:static lg:bottom-auto col-span-2 mt-4 bg-yellow-300 text-zinc-900 lg:rounded-lg rounded-none hover:bg-yellow-400 shadow-none font-semibold">
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
