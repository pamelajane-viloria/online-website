"use client"
import Header from "@/app/components/Header";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import Footer from "@/app/components/Footer";

export default function Faqs() {
    return (
        <main className="mt-32">
            <Header />
            <section className="faq-section xl:px-24 lg:px-12 px-5 pb-16 lg:mt-[1rem] mt-10">
                <h2 className="text-3xl font-bold text-center">Frequent Asked Questions</h2>
                <p className="text-center text-zinc-500">If you have other burning questions we weren't able to address here, feel free to contact customer support.</p>
                <ul>
                    <li className="flex flex-col lg:flex-row lg:justify-between items-start my-8">
                        <h3 className="py-4 mt-3 text-2xl font-bold">Shopping FAQs</h3>
                        <Accordion type="single" collapsible className="lg:w-2/3 w-full mt-3">
                            <AccordionItem value="shopping1">
                                <AccordionTrigger>What Shipping Methods Are Available?</AccordionTrigger>
                                <AccordionContent>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis risus ut efficitur malesuada. In in nibh a mauris blandit blandit. Aenean ultricies tincidunt vestibulum.                                
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="shopping2">
                                <AccordionTrigger>Do You Ship Internationally?</AccordionTrigger>
                                <AccordionContent>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis risus ut efficitur malesuada. In in nibh a mauris blandit blandit. Aenean ultricies tincidunt vestibulum.                                
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="shopping3">
                                <AccordionTrigger>How long does it take for home delivery?</AccordionTrigger>
                                <AccordionContent>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis risus ut efficitur malesuada. In in nibh a mauris blandit blandit. Aenean ultricies tincidunt vestibulum.                                
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="shopping4">
                                <AccordionTrigger>How Long Will It Take To Get My Package?</AccordionTrigger>
                                <AccordionContent>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis risus ut efficitur malesuada. In in nibh a mauris blandit blandit. Aenean ultricies tincidunt vestibulum.                                
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </li>
                    <li className="flex flex-col lg:flex-row lg:justify-between items-start my-8">
                        <h3 className="py-4 mt-3 text-2xl font-bold">Payment FAQs</h3>
                        <Accordion type="single" collapsible className="lg:w-2/3 w-full mt-3">
                            <AccordionItem value="payment1">
                                <AccordionTrigger>What Payment Methods Are Accepted?</AccordionTrigger>
                                <AccordionContent>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis risus ut efficitur malesuada. In in nibh a mauris blandit blandit. Aenean ultricies tincidunt vestibulum.                                
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="payment2">
                                <AccordionTrigger>How Do I Track My Order?</AccordionTrigger>
                                <AccordionContent>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis risus ut efficitur malesuada. In in nibh a mauris blandit blandit. Aenean ultricies tincidunt vestibulum.                                
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="payment3">
                                <AccordionTrigger>Can I use a different payment method?</AccordionTrigger>
                                <AccordionContent>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis risus ut efficitur malesuada. In in nibh a mauris blandit blandit. Aenean ultricies tincidunt vestibulum.                                
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </li>
                    <li className="flex flex-col lg:flex-row lg:justify-between items-start my-8">
                        <h3 className="py-4 mt-3 text-2xl font-bold">Orders & Returns FAQs</h3>
                        <Accordion type="single" collapsible className="lg:w-2/3 w-full mt-3">
                            <AccordionItem value="orderreturn1">
                                <AccordionTrigger>How do I place an Order?</AccordionTrigger>
                                <AccordionContent>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis risus ut efficitur malesuada. In in nibh a mauris blandit blandit. Aenean ultricies tincidunt vestibulum.                                
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="orderreturn2">
                                <AccordionTrigger>How Can I Cancel Or Change My Order?</AccordionTrigger>
                                <AccordionContent>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis risus ut efficitur malesuada. In in nibh a mauris blandit blandit. Aenean ultricies tincidunt vestibulum.                                
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="orderreturn3">
                                <AccordionTrigger>Do I need an account to place an order?</AccordionTrigger>
                                <AccordionContent>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis risus ut efficitur malesuada. In in nibh a mauris blandit blandit. Aenean ultricies tincidunt vestibulum.                                
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="orderreturn4">
                                <AccordionTrigger>How Can I Return a Product?</AccordionTrigger>
                                <AccordionContent>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis risus ut efficitur malesuada. In in nibh a mauris blandit blandit. Aenean ultricies tincidunt vestibulum.                                
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </li>
                </ul>
            </section>
            <Footer />
        </main>
    );
};