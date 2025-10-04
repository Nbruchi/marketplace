"use client";

import type React from "react";
import { secondaryNavbarOptions } from "@/constants";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/shared/cart-provider";
import { useLocation } from "@/components/shared/location-provider";
import Image from "next/image";
import LanguageSelector from "./navbar/language-selector";
import AccountDropdown from "./navbar/account-dropdown";
import NavSearch from "./navbar/nav-search";
import MobileMenu from "./navbar/mobile-menu";
import CategoriesSheet from "./categories-sheet";

export function Navbar() {
    const { cart } = useCart();
    const { location } = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [showCategories, setShowCategories] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const cartItemCount = cart.items.length;

    return (
        <header className="sticky top-0 z-50 w-full">
            {/* Top navbar */}
            <div className="amazon-navbar">
                <div className="header-container mx-auto px-2 py-2">
                    <div className="flex items-center gap-2 justify-between w-full">
                        {/* Logo */}
                        <Link href="/" className="mr-2 flex-shrink-0">
                            <Image
                                src="/logo-light.svg"
                                alt="logo"
                                width={100}
                                height={20}
                            />
                        </Link>

                        {/* Deliver to */}
                        <Link
                            href="/account/address"
                            className="hidden md:flex items-end"
                        >
                            <MapPin className="h-4 w-4 mr-1 mb-1.5" />
                            <p>
                                <span className="text-gray-300 text-xs">
                                    Deliver to
                                </span>
                                <span className="flex items-center font-bold">
                                    {location.country}
                                </span>
                            </p>
                        </Link>

                        {/* Search bar */}
                        <NavSearch />

                        {/* Right side icons */}
                        <div className="flex items-center gap-1 md:gap-4">
                            <LanguageSelector />

                            {/* Account & Lists */}
                            <AccountDropdown />

                            {/* Returns & Orders */}
                            <Link
                                href="/orders"
                                className="hidden md:flex flex-col text-sm text-white"
                            >
                                <span className="text-xs">Returns</span>
                                <span className="font-bold">& Orders</span>
                            </Link>

                            {/* Cart */}
                            <Link
                                href="/cart"
                                className="flex items-end text-white"
                            >
                                <div className="relative">
                                    <ShoppingCart className="h-8 w-8" />
                                    <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-[#F08804] text-black text-xs font-bold">
                                        {cartItemCount}
                                    </span>
                                </div>
                                <span className="hidden md:inline font-bold">
                                    Cart
                                </span>
                            </Link>

                            {/* Mobile menu */}
                            <MobileMenu />
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary navbar */}
            <div className="amazon-navbar-secondary">
                <div className="header-container mx-auto px-2 py-1">
                    <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
                        <Button
                            className="flex items-center text-sm whitespace-nowrap bg-transparent hover:border"
                            onClick={() => setShowCategories(true)}
                        >
                            <Menu className="h-5 w-5 mr-1" />
                            All
                        </Button>
                        {secondaryNavbarOptions.map((option) => (
                            <Link
                                key={option.label}
                                href={option.href}
                                className={`text-sm whitespace-nowrap${
                                    option.highlight
                                        ? " font-bold text-[#F69931]"
                                        : ""
                                }`}
                            >
                                {option.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <CategoriesSheet
                open={showCategories}
                onOpenChange={setShowCategories}
            />
        </header>
    );
}
