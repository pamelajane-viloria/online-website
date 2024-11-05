"use client"
import { useState, useEffect, useCallback, useContext, FC } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { z } from 'zod';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface shippingProps {
	handleShippingFormSubmit: (data: ShippingFormData) => void;
};

interface ShippingFormData {
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    city: string,
    state: string,
    postalCode: string,
    country: string,
    phoneNumber: string,
};

const CheckoutForm: FC<shippingProps> = ({ handleShippingFormSubmit }: shippingProps) => {
    const formSchema = z.object({
        firstName: z.string().min(1, "First Name is required"),
        lastName: z.string().min(1, "Last Name is required"),
        email: z.string().email("Invalid email address"),
        address: z.string().min(1, "Address is required"),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
        postalCode: z.string().regex(/^\d+$/, "Postal Code must contain only numbers").min(4, "Postal Code must be at least 4 characters"),
        country: z.string().min(1, "Country is required"),
        phoneNumber: z.string().regex(/^\d+$/, "Phone number must contain only numbers").min(10, "Phone number must be at least 10 digits"),
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

	const onSubmit = (data: ShippingFormData) => {
		handleShippingFormSubmit(data);
	};
  

	return (
		<Form {...methods}>
			<form onSubmit={handleSubmit(onSubmit)} className="md:grid md:grid-cols-2 flex flex-col gap-3 mt-4">
				<FormItem className="space-y-1">
					<FormLabel className="font-semibold text-sm">First Name <span className="text-red-500">*</span></FormLabel>
					<FormControl>
						<Input type="text" className="shadow-none focus-visible:ring-0 focus:border-yellow-200 focus:border-2 pt-px" {...register('firstName')} placeholder="Enter your first name" />
					</FormControl>
					{errors.firstName && <span className="text-xs text-red-500">{errors.firstName.message}</span>}
				</FormItem>

				<FormItem className="space-y-1">
					<FormLabel className="font-semibold text-sm">Last Name <span className="text-red-500">*</span></FormLabel>
					<FormControl>
						<Input type="text" className="shadow-none focus-visible:ring-0 focus:border-yellow-200 focus:border-2 pt-px" {...register('lastName')} placeholder="Enter your last name" />
					</FormControl>
					{errors.lastName && <span className="text-xs text-red-500">{errors.lastName.message}</span>}
				</FormItem>

				<FormItem className="space-y-1">
					<FormLabel className="font-semibold text-sm">Email <span className="text-red-500">*</span></FormLabel>
					<FormControl>
						<Input type="email" className="shadow-none focus-visible:ring-0 focus:border-yellow-200 focus:border-2 pt-px" {...register('email')} placeholder="Enter your email" />
					</FormControl>
					{errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
				</FormItem>

				<FormItem className="space-y-1">
					<FormLabel className="font-semibold text-sm">Phone Number <span className="text-red-500">*</span></FormLabel>
					<FormControl>
						<Input type="text" className="shadow-none focus-visible:ring-0 focus:border-yellow-200 focus:border-2 pt-px" {...register('phoneNumber')} placeholder="Enter your phone number" />
					</FormControl>
					{errors.phoneNumber && <span className="text-xs text-red-500">{errors.phoneNumber.message}</span>}
				</FormItem>
			
				<div className="md:col-span-2 flex md:flex-row flex-col gap-5">
					<FormItem className="md:w-2/3 space-y-1">
						<FormLabel className="font-semibold text-sm">Address <span className="text-red-500">*</span></FormLabel>
						<FormControl>
							<Input type="text" className="shadow-none focus-visible:ring-0 focus:border-yellow-200 focus:border-2 pt-px" {...register('address')} placeholder="Street Address" />
						</FormControl>
						{errors.address && <span className="text-xs text-red-500">{errors.address.message}</span>}
					</FormItem>
					<FormItem className="md:w-1/3 space-y-1">
						<FormLabel className="font-semibold text-sm">Postal Code <span className="text-red-500">*</span></FormLabel>
						<FormControl>
							<Input type="text" className="shadow-none focus-visible:ring-0 focus:border-yellow-200 focus:border-2 pt-px" {...register('postalCode')} placeholder="Postal Code" />
						</FormControl>
						{errors.postalCode && <span className="text-xs text-red-500">{errors.postalCode.message}</span>}
					</FormItem>
				</div>

				<div className="md:col-span-2 flex md:flex-row flex-col gap-5">
					<FormItem className="md:w-1/3 space-y-1">
						<FormLabel className="font-semibold text-sm">City <span className="text-red-500">*</span></FormLabel>
						<FormControl>
							<Input type="text" className="shadow-none focus-visible:ring-0 focus:border-yellow-200 focus:border-2 pt-px" {...register('city')} placeholder="City" />
						</FormControl>
						{errors.city && <span className="text-xs text-red-500">{errors.city.message}</span>}
					</FormItem>

					<FormItem className="md:w-1/3 space-y-1">
						<FormLabel className="font-semibold text-sm">State <span className="text-red-500">*</span></FormLabel>
						<FormControl>
							<Input type="text" className="shadow-none focus-visible:ring-0 focus:border-yellow-200 focus:border-2 pt-px" {...register('state')} placeholder="State" />
						</FormControl>
						{errors.state && <span className="text-xs text-red-500">{errors.state.message}</span>}
					</FormItem>

					<FormItem className="md:w-1/3 space-y-1">
						<FormLabel className="font-semibold text-sm">Country <span className="text-red-500">*</span></FormLabel>
						<FormControl>
							<Input type="text" className="shadow-none focus-visible:ring-0 focus:border-yellow-200 focus:border-2 pt-px" {...register('country')} placeholder="Country" />
						</FormControl>
						{errors.country && <span className="text-xs text-red-500">{errors.country.message}</span>}
					</FormItem>
				</div>
				<Button type="submit" className="fixed bottom-0 right-0 left-0 w-full lg:static lg:bottom-auto col-span-2 mt-4 bg-yellow-300 text-zinc-900 lg:rounded-lg rounded-none hover:bg-yellow-400 shadow-none font-semibold">
					Proceed to Payment 
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ms-1 size-3">
						<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
					</svg>
				</Button>
			</form>  
		</Form>
	);
};

export default CheckoutForm;
