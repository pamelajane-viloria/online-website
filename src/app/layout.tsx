import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { UserProvider } from "./contexts/UserContext";
import { Toaster } from "@/components/ui/sonner";
import { CategoryProvider } from "./contexts/CategoryContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jennie & Co",
  description: "Online store platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <CategoryProvider>
            {children}
          </CategoryProvider>
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}