'use client'
import { useState, useEffect, useContext, } from 'react'
import axios from 'axios';
import { UserContext } from '@/app/contexts/UserContext';
import Header from '@/app/components/Header';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import CartItems from '@/app/cart/components/CartItems';
import Link from 'next/link';
import Stepper from '@/app/cart/components/Stepper';
import ShippingAddressForm from '@/app/cart/components/ShippingAddressForm';
import PaymentForm from '@/app/cart/components/PaymentForm';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import Loading from '@/app/components/Loading';

export default function ProductsPage() {
    const [cartData, setCartData] = useState<any[]>([]);
    const [productData, setProductData] = useState<any[]>([]);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const [grandTotal, setGrandTotal] = useState<number>(0);
    const steps = ["Cart", "Shipping", "Payment", "Confirm"];
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [shipping, setShipping] = useState<any>(() => {
        const shippingData = localStorage.getItem('shippingData');
        if (shippingData) {
          return JSON.parse(shippingData);
        }
        return {};
    });
    const [payment, setPayment] = useState<any>(() => {
        const paymentData = localStorage.getItem('paymentData');
        if (paymentData) {
          return JSON.parse(paymentData);
        }
        return {};
    });    

    // Get all products in cart based on User ID
    useEffect(() => {
        const fetchCardData = () => {
            setIsLoading(true);
            axios.get(`https://fakestoreapi.com/carts/${loggedInUser.id}`)
                .then(response => {
                    setCartData(response.data);
                    const products = response.data.products;
                    // Start of product details promise
                    const productDetailsPromise = products.map((product: { productId: number; quantity: number }) => {
                        return axios.get(`https://fakestoreapi.com/products/${product.productId}`)
                            .then(response => ({
                                ...response.data,
                                quantity: product.quantity
                            }));
                    });

                    Promise.all(productDetailsPromise)
                        .then(productData => {
                            setProductData(productData);
                            const initialTotal = productData.reduce((sum, product) => {
                                return sum + product.price * product.quantity;
                            }, 0);
                            setGrandTotal(initialTotal);
                            setIsLoading(false);
                        })
                        .catch(error => {
                            console.error(error);
                    });
                    // End of promise

                })
                .catch(error => {
                    console.error(error);
                });
        };
        fetchCardData();
    }, []);

    // Handle total amount updates from each cart item
    const calculateGrandTotal = (newQuantity:number) => {
        const newTotal = productData.reduce((sum, product) => {
            return sum + product.price * newQuantity;
        }, 0);
        setGrandTotal(newTotal);
    };

    // Handle delete items in cart
    const handleClearCart = () => {
        axios.delete('https://fakestoreapi.com/carts/3')
            .then(response => {
                setProductData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    // Handle for next step on button click 
    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    // Handle for previous step on button click 
    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    // Fetch shipping data
    useEffect(() => {
        setShipping(JSON.parse(localStorage.getItem('shippingData') || '[]'));
    }, []);

    // Fetch payment data
    useEffect(() => {
        setPayment(JSON.parse(localStorage.getItem('paymentData') || '[]'));
    }, []); 

    return (
        <main>
            <Header />
            <main className="cart-section px-24 mt-4">
                <Stepper
                    steps={steps}
                    currentStep={currentStep}
                />
                {currentStep === 1 && 
                <section className="cart-items-section flex gap-16 items-start mb-16">
                    <ul className="rounded-xl w-3/4 border-zinc-200 bg-white py-5 px-7 shadow-xl">
                        <li className="flex justify-between">
                            <h2 className="font-semibold text-lg">Cart</h2>
                            <Button className="bg-transparent hover:bg-red-50 shadow-none text-xs text-red-500" onClick={handleClearCart}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 me-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                                Clear cart
                            </Button>
                        </li>
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <>
                            {productData.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-transparent">
                                            <TableHead>Product</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Price</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {productData.map((product) => (
                                            <CartItems 
                                                key={product.id}
                                                userId={loggedInUser.id}
                                                id={product.id}
                                                title={product.title}
                                                image={product.image}
                                                category={product.category}
                                                price={product.price}
                                                quantity={product.quantity}
                                                onUpdateTotal={calculateGrandTotal}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="text-center my-4 w-full text-zinc-400">
                                    <img src="/empty-cart.svg" className="size-10 mx-auto mb-4" />
                                    <h3 className="font-bold text-xl mb-1">Your Cart is empty :^(</h3>
                                    <p className="text-base mb-7">Looks like you haven't added anything to your cart yet</p>
                                    <Link href="/products" className="bg-yellow-400 text-white font-medium px-5 py-3 rounded-lg mt-3">Start Shopping</Link>
                                </div>
                            )}
                            </>
                        )}
                        <li>
                        </li>
                    </ul>
                    {productData.length > 0 && (
                    <ul className="rounded-xl w-1/4 border-zinc-200 bg-white py-5 px-7 shadow-xl space-y-2">
                        <li className="font-semibold text-lg mb-4">Order Summary</li>
                        <li className="flex justify-between">
                            <p className="text-xs text-zinc-400">Cart Subtotal</p>
                            <span className="text-sm">$ {grandTotal.toFixed(2)}</span>
                        </li>
                        <li className="flex justify-between">
                            <p className="text-xs text-zinc-400">Discount</p>
                            <span className="text-sm">$0.00</span>
                        </li>
                        <li className="flex justify-between">
                            <p className="text-xs text-zinc-400">Delivery Charges</p>
                            <span className="text-sm">Free Delivery</span>
                        </li>
                        <li><hr className="h-px my-4 bg-zinc-300 border-0" /></li>
                        <li className="flex justify-between">
                            <p className="text-sm font-bold">Total Amount</p>
                            <span className="font-bold">{grandTotal.toFixed(2)}</span>
                        </li>
                        <li className="mt-3">
                            <Button className="w-full font-semibold bg-yellow-300 text-zinc-900 rounded-lg hover:bg-yellow-400" onClick={handleNextStep}>
                                Place Order
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ms-1 size-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </Button>
                        </li>
                    </ul>
                    )}
                </section>             
                }
                {currentStep === 2 &&
                <section className="delivery-section flex gap-16 items-start mb-16">
                    <ul className="rounded-xl w-3/4 border-zinc-200 bg-white py-5 px-7 shadow-xl">
                        <li>
                            <Button className="bg-transparent hover:bg-transparent text-xs shadow-none text-zinc-900 px-0" onClick={handlePreviousStep}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 me-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                            Back to Cart
                            </Button>
                            <h2 className="font-semibold text-lg">Shipping Details</h2>
                            <p className="text-sm text-zinc-500">Please provide relevant information for your order</p>
                        </li>
                        <li>
                            <ShippingAddressForm 
                                handleNext={handleNextStep}
                            />
                        </li>
                    </ul>
                    <ul className="rounded-xl w-1/4 border-zinc-200 bg-white py-5 px-7 shadow-xl space-y-2">
                        <li className="font-semibold text-lg mb-4">Order Summary</li>
                        {productData.length > 0 && (
                        <li>
                            {productData.map((product) => (
                                <div key={product.id} className="flex justify-between items-center mb-2 gap-3">
                                    <img src={product.image} className="w-1/4" />
                                    <ul className="text-sm w-3/4">
                                        <li className="font-medium truncate">{product.title}</li>
                                        <li>Quantity: {product.quantity}</li>
                                        <li className="text-base font-bold">$ {product.price}</li>
                                    </ul>
                                </div>
                            ))}
                        </li>
                        )}
                        <li className="flex justify-between">
                            <p className="text-xs text-zinc-400">Cart Subtotal</p>
                            <span className="text-sm">$ {grandTotal.toFixed(2)}</span>
                        </li>
                        <li className="flex justify-between">
                            <p className="text-xs text-zinc-400">Discount</p>
                            <span className="text-sm">$0.00</span>
                        </li>
                        <li className="flex justify-between">
                            <p className="text-xs text-zinc-400">Delivery Charges</p>
                            <span className="text-sm">Free Delivery</span>
                        </li>
                        <li><hr className="h-px my-4 bg-zinc-300 border-0" /></li>
                        <li className="flex justify-between">
                            <p className="text-sm font-bold">Total Amount</p>
                            <span className="font-bold">{grandTotal.toFixed(2)}</span>
                        </li>
                    </ul>
                </section>             
                }
                {currentStep === 3 &&
                <section className="delivery-section flex gap-16 items-start mb-16">
                    <ul className="rounded-xl w-3/4 border-zinc-200 bg-white py-5 px-7 shadow-xl">
                        <li>
                            <Button className="bg-transparent hover:bg-transparent text-xs shadow-none text-zinc-900 px-0" onClick={handlePreviousStep}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 me-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                            Back to Shipping
                            </Button>
                            <h2 className="font-semibold text-lg">Payment Details</h2>
                            <p className="text-sm text-zinc-500">Please provide relevant information for your order</p>
                        </li>
                        <li>
                            <PaymentForm 
                                handleNext={handleNextStep}
                            />
                        </li>
                    </ul>
                    <ul className="rounded-xl w-1/4 border-zinc-200 bg-white py-5 px-7 shadow-xl space-y-2">
                        <li className="font-semibold text-lg mb-4">Order Summary</li>
                        {productData.length > 0 && (
                        <li>
                            {productData.map((product) => (
                                <div key={product.id} className="flex justify-between items-center mb-2 gap-3">
                                    <img src={product.image} className="w-1/4" />
                                    <ul className="text-sm w-3/4">
                                        <li className="font-medium truncate">{product.title}</li>
                                        <li>Quantity: {product.quantity}</li>
                                        <li className="text-base font-bold">$ {product.price}</li>
                                    </ul>
                                </div>
                            ))}
                        </li>
                        )}
                        <li className="flex justify-between">
                            <p className="text-xs text-zinc-400">Cart Subtotal</p>
                            <span className="text-sm">$ {grandTotal.toFixed(2)}</span>
                        </li>
                        <li className="flex justify-between">
                            <p className="text-xs text-zinc-400">Discount</p>
                            <span className="text-sm">$0.00</span>
                        </li>
                        <li className="flex justify-between">
                            <p className="text-xs text-zinc-400">Delivery Charges</p>
                            <span className="text-sm">Free Delivery</span>
                        </li>
                        <li><hr className="h-px my-4 bg-zinc-300 border-0" /></li>
                        <li className="flex justify-between">
                            <p className="text-sm font-bold">Total Amount</p>
                            <span className="font-bold">{grandTotal.toFixed(2)}</span>
                        </li>
                    </ul>
                </section>
                }
                {currentStep === 4 &&
                <section className="delivery-section flex gap-16 items-start mb-16">
                    <ul className="rounded-xl w-3/4 border-zinc-200 bg-white py-5 px-7 shadow-xl">
                        <li>
                            <Button className="bg-transparent hover:bg-transparent text-xs shadow-none text-zinc-900 px-0" onClick={handlePreviousStep}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 me-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                            Back to Payment
                            </Button>
                            <h2 className="font-semibold text-lg">Confirm Details</h2>
                            <p className="text-sm text-zinc-500">Please double check your information regarding your order</p>
                        </li>
                        <li><hr className="h-px my-4 bg-zinc-300 border-0" /></li>
                        <li>
                            <h3 className="font-medium">Shipping</h3>
                            <div className="text-zinc-500 text-sm">
                                Shipping to: {shipping.firstName} {shipping.lastName} / {shipping.address} / {shipping.postalCode} / {shipping.phoneNumber}
                            </div>
                        </li>
                        <li><hr className="h-px my-4 bg-zinc-300 border-0" /></li>
                        <li>
                            <h3 className="font-medium">Payment</h3>
                            <div className="text-zinc-500 text-sm">
                                Shipping to: {payment.cardNumber} / {payment.expirationDate} / {payment.name}
                            </div>
                        </li>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="mt-4 bg-yellow-300 text-zinc-900 rounded-lg hover:bg-yellow-400 shadow-none font-semibold w-full">Confirm</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader className="items-center justify-center">
                                    <img src="/check-circle.svg" className="size-12" />
                                    <DialogTitle>Thank your for your order</DialogTitle>
                                    <DialogDescription>
                                        The order confirmation has been sent to {shipping.email}
                                    </DialogDescription>
                                </DialogHeader>
                                <Link href="/">
                                    <DialogClose asChild>
                                        <Button type="button" className="flex w-full bg-yellow-400 text-zinc-900 hover:bg-yellow-500">
                                            Continue Shopping
                                        </Button>
                                    </DialogClose>
                                </Link>
                            </DialogContent>
                        </Dialog>
                    </ul>
                    <ul className="rounded-xl w-1/4 border-zinc-200 bg-white py-5 px-7 shadow-xl space-y-2">
                        <li className="font-semibold text-lg mb-4">Order Summary</li>
                        {productData.length > 0 && (
                        <li>
                            {productData.map((product) => (
                                <div key={product.id} className="flex justify-between items-center mb-2 gap-3">
                                    <img src={product.image} className="w-1/4" />
                                    <ul className="text-sm w-3/4">
                                        <li className="font-medium truncate">{product.title}</li>
                                        <li>Quantity: {product.quantity}</li>
                                        <li className="text-base font-bold">$ {product.price}</li>
                                    </ul>
                                </div>
                            ))}
                        </li>
                        )}
                        <li className="flex justify-between">
                            <p className="text-xs text-zinc-400">Cart Subtotal</p>
                            <span className="text-sm">$ {grandTotal.toFixed(2)}</span>
                        </li>
                        <li className="flex justify-between">
                            <p className="text-xs text-zinc-400">Discount</p>
                            <span className="text-sm">$0.00</span>
                        </li>
                        <li className="flex justify-between">
                            <p className="text-xs text-zinc-400">Delivery Charges</p>
                            <span className="text-sm">Free Delivery</span>
                        </li>
                        <li><hr className="h-px my-4 bg-zinc-300 border-0" /></li>
                        <li className="flex justify-between">
                            <p className="text-sm font-bold">Total Amount</p>
                            <span className="font-bold">{grandTotal.toFixed(2)}</span>
                        </li>
                    </ul>
                </section>   
                }
            </main>
        </main>
    );
};