"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { HeroCarousel } from "@/components/shared/hero-carousel";
import { ProductCard } from "@/components/shared/product-card";
import { DealCard } from "@/components/shared/deal-card";
import { mockProducts, mockDeals, mockCategories } from "@/lib/mock-data"; // Keep for fallback
import api from "@/lib/api";

export default function Home() {
    // State for products, categories, and deals
    const [products, setProducts] = React.useState<any[]>([]);
    const [categories, setCategories] = React.useState<any[]>([]);
    const [deals, setDeals] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    // Fetch data when a component mounts
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch products
                const productsData = await api.product.getProducts({
                    limit: 12,
                });
                setProducts(productsData.products || []);

                // Fetch top products for deals
                const topProductsData = await api.product.getTopProducts();
                setDeals(
                    // Transform products to deals format if needed
                    (topProductsData || []).map((product: any) => ({
                        id: product.id,
                        name: product.name,
                        regularPrice: product.price * 1.2, // Simulate the original price
                        salePrice: product.price,
                        discount: product.discount || 20,
                        image: product.image,
                        timeRemaining: 24 * 60 * 60 * 1000, // 24 hours
                        slug: product.slug,
                    }))
                );

                // Try to fetch categories if endpoint exists
                try {
                    const categoriesData = await api.category.getCategories();
                    setCategories(categoriesData || []);
                } catch (err) {
                    // Fallback to mock categories if endpoint doesn't exist
                    console.log("Using mock categories as fallback");
                    setCategories(mockCategories);
                }

                setLoading(false);
            } catch (err: any) {
                console.error("Error fetching data:", err);
                setError(err.message || "Failed to load data");
                setLoading(false);

                // Fallback to mock data if API fails
                setProducts(mockProducts);
                setDeals(mockDeals);
                setCategories(mockCategories);
            }
        };

        fetchData();
    }, []);

    // Show loading state
    if (loading) {
        return (
            <div className="flex flex-col min-h-screen justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
                <p>Loading products...</p>
            </div>
        );
    }

    // Show error state with fallback UI
    if (error && products.length === 0) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                    <p>{error}</p>
                </div>
                <HeroCarousel />
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">Popular Products</h2>
                    <p>Using cached data due to connection issues.</p>
                </div>
            </div>
        );
    }

    // Get electronics products
    const electronicsProducts = products.filter(
        (p) => p.category === "electronics"
    );

    // Ensure we have data to display
    const hasProducts = products.length > 0;
    const hasCategories = categories.length > 0;
    const hasDeals = deals.length > 0;
    const hasElectronics = electronicsProducts.length > 0;

    return (
        <div className="flex flex-col bg-gray-200">
            {/* Hero carousel */}
            <HeroCarousel />

            {/* Main content */}
            <div className="container mx-auto px-4 py-4 -mt-72 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {/* Personalized recommendations */}
                    <Card className="amazon-card">
                        <CardContent className="p-4">
                            <h2 className="text-xl font-bold mb-3">
                                Recommended for you
                            </h2>
                            {hasProducts ? (
                                <>
                                    <div className="grid grid-cols-2 gap-2">
                                        {products
                                            .slice(0, 4)
                                            .map((product, index) => (
                                                <Link
                                                    key={index}
                                                    href={`/products/${product.slug}`}
                                                    className="block"
                                                >
                                                    <div className="aspect-square relative">
                                                        <Image
                                                            src={
                                                                product.image ||
                                                                "/placeholder.svg?height=150&width=150"
                                                            }
                                                            alt={product.name}
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                    <p className="text-xs mt-1 line-clamp-2">
                                                        {product.name}
                                                    </p>
                                                </Link>
                                            ))}
                                    </div>
                                    <Link
                                        href="/recommendations"
                                        className="amazon-link text-sm block mt-3"
                                    >
                                        See more recommendations
                                    </Link>
                                </>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-gray-500 mb-2">
                                        Personalized recommendations will appear
                                        here
                                    </p>
                                    <Link
                                        href="/products"
                                        className="amazon-link text-sm"
                                    >
                                        Browse products
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Sign in card */}
                    <Card className="amazon-card">
                        <CardContent className="p-4">
                            <h2 className="text-xl font-bold mb-3">
                                Sign in for the best experience
                            </h2>
                            <Link href="/signin">
                                <Button className="amazon-button-primary w-full mb-3">
                                    Sign in securely
                                </Button>
                            </Link>
                            <div className="aspect-[4/3] relative">
                                <Image
                                    src="/sections/login.jpg"
                                    alt="Sign in promotion"
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Prime card */}
                    <Card className="amazon-card">
                        <CardContent className="p-4">
                            <h2 className="text-xl font-bold mb-3">
                                We have a surprise for you
                            </h2>
                            <div className="aspect-[4/3] relative mb-3">
                                <Image
                                    src="/sections/audible.jpg"
                                    alt="Prime promotion"
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>
                            <p className="text-sm mb-3">
                                Get 3 months of Audible Premium Plus for free.
                                Limited time offer.
                            </p>
                            <Link href="/prime" className="amazon-link text-sm">
                                Learn more
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Deals card */}
                    <Card className="amazon-card">
                        <CardContent className="p-4">
                            <h2 className="text-xl font-bold mb-3">Top Deal</h2>
                            <div className="aspect-[4/3] relative mb-3">
                                <Image
                                    src="/sections/top-deal.jpg"
                                    alt="Deal promotion"
                                    fill
                                    className="object-cover rounded-md"
                                />
                                <div className="absolute top-2 left-2 bg-[#CC0C39] text-white text-xs font-bold px-2 py-1 rounded">
                                    Up to 40% off
                                </div>
                            </div>
                            <p className="text-sm mb-1">Limited time deal</p>
                            <Link href="/deals" className="amazon-link text-sm">
                                See all deals
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Product carousels */}
                <div className="mt-6 space-y-6">
                    {/* Deals carousel */}
                    <section className="amazon-section">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Today's Deals</h2>
                            <Link href="/deals" className="amazon-link text-sm">
                                See all deals
                            </Link>
                        </div>
                        {hasDeals ? (
                            <Carousel className="w-full">
                                <CarouselContent className="-ml-4">
                                    {deals.map((deal) => (
                                        <CarouselItem
                                            key={deal.id}
                                            className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                                        >
                                            <DealCard deal={deal} />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-2" />
                                <CarouselNext className="right-2" />
                            </Carousel>
                        ) : (
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                                <p className="text-gray-500 dark:text-gray-400 mb-2">
                                    No deals available at the moment
                                </p>
                                <p className="text-sm">
                                    Check back later for new deals
                                </p>
                            </div>
                        )}
                    </section>

                    {/* Categories grid */}
                    <section className="amazon-section">
                        <h2 className="text-xl font-bold mb-4">
                            Shop by Category
                        </h2>
                        {hasCategories ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                                {categories.slice(0, 12).map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/products/category/${category.slug}`}
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            <div className="aspect-square relative w-full max-w-[150px]">
                                                <Image
                                                    src={
                                                        category.image ||
                                                        "/placeholder.svg?height=150&width=150"
                                                    }
                                                    alt={category.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <p className="mt-2 text-sm">
                                                {category.name}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                                <p className="text-gray-500 dark:text-gray-400">
                                    Categories are being loaded
                                </p>
                            </div>
                        )}
                    </section>

                    {/* Popular products */}
                    <section className="amazon-section">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">
                                Popular in Electronics
                            </h2>
                            <Link
                                href="/products/category/electronics"
                                className="amazon-link text-sm"
                            >
                                See more
                            </Link>
                        </div>
                        {hasElectronics ? (
                            <Carousel className="w-full">
                                <CarouselContent className="-ml-4">
                                    {electronicsProducts.map((product) => (
                                        <CarouselItem
                                            key={product.id}
                                            className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                                        >
                                            <ProductCard product={product} />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-2" />
                                <CarouselNext className="right-2" />
                            </Carousel>
                        ) : (
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                                <p className="text-gray-500 dark:text-gray-400 mb-2">
                                    No electronics products found
                                </p>
                                <Link
                                    href="/products"
                                    className="amazon-link text-sm"
                                >
                                    Browse all products
                                </Link>
                            </div>
                        )}
                    </section>

                    {/* Recommended based on browsing history */}
                    <section className="amazon-section">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">
                                Recommended based on your browsing history
                            </h2>
                            <Link
                                href="/browsing-history"
                                className="amazon-link text-sm"
                            >
                                View your browsing history
                            </Link>
                        </div>
                        {hasProducts && products.length > 4 ? (
                            <Carousel className="w-full">
                                <CarouselContent className="-ml-4">
                                    {products.slice(4, 12).map((product) => (
                                        <CarouselItem
                                            key={product.id}
                                            className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                                        >
                                            <ProductCard product={product} />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-2" />
                                <CarouselNext className="right-2" />
                            </Carousel>
                        ) : (
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                                <p className="text-gray-500 dark:text-gray-400 mb-2">
                                    Browse more products to get personalized
                                    recommendations
                                </p>
                                <Link
                                    href="/products"
                                    className="amazon-link text-sm"
                                >
                                    Explore products
                                </Link>
                            </div>
                        )}
                    </section>

                    {/* Featured promotions */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card className="amazon-card">
                            <CardContent className="p-4">
                                <h2 className="text-lg font-bold mb-3">
                                    Amazon Basics
                                </h2>
                                <div className="aspect-[4/3] relative mb-3">
                                    <Image
                                        src="/sections/amazon-basics.jpg"
                                        alt="Amazon Basics"
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                </div>
                                <Link
                                    href="/amazon-basics"
                                    className="amazon-link text-sm"
                                >
                                    See more from Amazon Basics
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="amazon-card">
                            <CardContent className="p-4">
                                <h2 className="text-lg font-bold mb-3">
                                    Discover Amazon
                                </h2>
                                <div className="aspect-[4/3] relative mb-3">
                                    <Image
                                        src="/sections/amazon-concept.jpg"
                                        alt="Discover Amazon"
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                </div>
                                <Link
                                    href="/amazon-home"
                                    className="amazon-link text-sm"
                                >
                                    Learn more about Amazon
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="amazon-card">
                            <CardContent className="p-4">
                                <h2 className="text-lg font-bold mb-3">
                                    Shop Kindle eBooks
                                </h2>
                                <div className="aspect-[4/3] relative mb-3">
                                    <Image
                                        src="/sections/kindle-books.jpg"
                                        alt="Kindle eBooks"
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                </div>
                                <Link
                                    href="/kindle-books"
                                    className="amazon-link text-sm"
                                >
                                    Browse Kindle eBooks
                                </Link>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </div>
        </div>
    );
}
