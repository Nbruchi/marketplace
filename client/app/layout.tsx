import type React from "react";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Toaster } from "sonner";
import { CartProvider } from "@/components/shared/cart-provider";
import { LanguageProvider } from "@/components/shared/language-provider";
import { LocationProvider } from "@/components/shared/location-provider";
import { AuthProvider } from "@/components/shared/auth-context";

const workSans = Work_Sans({
    subsets: ["latin"],
    variable: "--font-work-sans",
});

export const metadata: Metadata = {
    title: "Amazon.com: Online Shopping for Electronics, Apparel, Computers, Books, DVDs & more",
    description:
        "Free delivery on millions of items with Prime. Low prices across earth's biggest selection of books, music, DVDs, electronics, computers, software, apparel & accessories, shoes, jewelry, tools & hardware, housewares, furniture, sporting goods, beauty & personal care, groceries & just about anything else.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${workSans.variable} font-sans min-h-screen flex flex-col bg-white dark:bg-gray-900`}
                suppressHydrationWarning
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <LanguageProvider>
                        <LocationProvider>
                            <CartProvider>
                                <AuthProvider>
                                    <Navbar />
                                    <main className="flex-1">{children}</main>
                                    <Footer />
                                    <Toaster
                                        position="top-center"
                                        richColors
                                        closeButton
                                    />
                                </AuthProvider>
                            </CartProvider>
                        </LocationProvider>
                    </LanguageProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
