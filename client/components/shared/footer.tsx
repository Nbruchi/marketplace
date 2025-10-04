"use client";

import Link from "next/link";
import { useLanguage } from "@/components/shared/language-provider";
import { ChevronUp } from "lucide-react";
import Image from "next/image";

export function Footer() {
    const { t } = useLanguage();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const footerLinks = [
        {
            title: "Get to Know Us",
            links: [
                { name: "Careers", href: "/careers" },
                { name: "Blog", href: "/blog" },
                { name: "About Amazon", href: "/about" },
                { name: "Investor Relations", href: "/investor-relations" },
                { name: "Amazon Devices", href: "/amazon-devices" },
                { name: "Amazon Science", href: "/amazon-science" },
            ],
        },
        {
            title: "Make Money with Us",
            links: [
                { name: "Sell products on Amazon", href: "/sell" },
                { name: "Sell on Amazon Business", href: "/business/sell" },
                { name: "Sell apps on Amazon", href: "/apps/sell" },
                { name: "Become an Affiliate", href: "/associates" },
                { name: "Advertise Your Products", href: "/advertising" },
                { name: "Self-Publish with Us", href: "/self-publish" },
                { name: "Host an Amazon Hub", href: "/logistics/amazon-hub" },
                { name: "See More Make Money with Us", href: "/make-money" },
            ],
        },
        {
            title: "Amazon Payment Products",
            links: [
                { name: "Amazon Business Card", href: "/business-card" },
                { name: "Shop with Points", href: "/points" },
                { name: "Reload Your Balance", href: "/reload-balance" },
                {
                    name: "Amazon Currency Converter",
                    href: "/currency-converter",
                },
            ],
        },
        {
            title: "Let Us Help You",
            links: [
                { name: "Amazon and COVID-19", href: "/covid19" },
                { name: "Your Account", href: "/account" },
                { name: "Your Orders", href: "/orders" },
                {
                    name: "Shipping Rates & Policies",
                    href: "/shipping-policies",
                },
                { name: "Returns & Replacements", href: "/returns" },
                {
                    name: "Manage Your Content and Devices",
                    href: "/content-devices",
                },
                { name: "Amazon Assistant", href: "/assistant" },
                { name: "Help", href: "/help" },
            ],
        },
    ];

    return (
        <footer>
            {/* Back to top button */}
            <div
                className="bg-[#37475A] hover:bg-[#485769] text-white text-center py-3 cursor-pointer"
                onClick={scrollToTop}
            >
                <span className="flex items-center justify-center">
                    Back to top
                    <ChevronUp className="ml-1 h-4 w-4" />
                </span>
            </div>

            {/* Main footer links */}
            <div className="amazon-footer-top">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {footerLinks.map((column) => (
                            <div key={column.title}>
                                <h3 className="font-bold mb-4">
                                    {column.title}
                                </h3>
                                <ul className="space-y-2">
                                    {column.links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-gray-300 hover:underline"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Amazon logo and language/country selectors */}
            <div className="amazon-footer-middle border-t border-gray-700">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col items-center mb-6">
                        <Link href="/" className="mb-4 flex-shrink-0">
                            <Image
                                src="/logo-light.svg"
                                alt="logo"
                                width={100}
                                height={20}
                            />
                        </Link>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/language-selector"
                                className="text-sm text-gray-300 border border-gray-600 rounded px-3 py-1 hover:border-white"
                            >
                                English
                            </Link>
                            <Link
                                href="/currency-selector"
                                className="text-sm text-gray-300 border border-gray-600 rounded px-3 py-1 hover:border-white"
                            >
                                $ USD - U.S. Dollar
                            </Link>
                            <Link
                                href="/country-selector"
                                className="text-sm text-gray-300 border border-gray-600 rounded px-3 py-1 hover:border-white flex items-center"
                            >
                                <span className="mr-1">🇺🇸</span> United States
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright and legal links */}
            <div className="amazon-footer-bottom">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-400 mb-2">
                        <Link
                            href="/conditions-of-use"
                            className="hover:underline"
                        >
                            Conditions of Use
                        </Link>
                        <Link
                            href="/privacy-notice"
                            className="hover:underline"
                        >
                            Privacy Notice
                        </Link>
                        <Link
                            href="/interest-based-ads"
                            className="hover:underline"
                        >
                            Interest-Based Ads
                        </Link>
                        <Link href="/tax-exemption" className="hover:underline">
                            Tax Exemption
                        </Link>
                        <Link
                            href="/communications"
                            className="hover:underline"
                        >
                            Communications
                        </Link>
                        <Link
                            href="/ca-supply-chain"
                            className="hover:underline"
                        >
                            CA Supply Chain Act
                        </Link>
                        <Link href="/report-abuse" className="hover:underline">
                            Report Abuse
                        </Link>
                        <Link href="/help" className="hover:underline">
                            Help
                        </Link>
                    </div>
                    <div className="text-center text-xs text-gray-400">
                        © 1996-{new Date().getFullYear()}, Amazon.com, Inc. or
                        its affiliates
                    </div>
                </div>
            </div>
        </footer>
    );
}
