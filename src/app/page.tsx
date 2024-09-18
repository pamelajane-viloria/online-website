'use client'
import Image from "next/image";
import Header from "./components/Header";
import React, { useContext } from 'react';
import Slides from './components/Slides';

export default function Home() {

	return (
		<main>
			<Header />
			<Slides />
			
		</main>
	);
}
