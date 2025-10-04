"use client";

import type React from "react";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/components/shared/cart-provider";

type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    reviewCount: number;
    category: string;
    isPrime?: boolean;
    discount?: number;
    slug: string;
    currency: string;
};

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const [isWishlisted, setIsWishlisted] = useState(false);

    const toggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsWishlisted(!isWishlisted);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            currency: product.currency,
        });
    };

    const originalPrice = product.discount
        ? ((product.price * 100) / (100 - product.discount)).toFixed(2)
        : null;

    return (
        <Link href={`/products/${product.slug}`}>
            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                    {product.discount && (
                        <div className="absolute top-2 left-2 z-10">
                            <span className="amazon-badge amazon-badge-deal">
                                {product.discount}% off
                            </span>
                        </div>
                    )}
                    <button
                        className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black transition-colors"
                        onClick={toggleWishlist}
                    >
                        <Heart
                            className={`h-4 w-4 ${
                                isWishlisted
                                    ? "fill-red-500 text-red-500"
                                    : "text-gray-600 dark:text-gray-400"
                            }`}
                        />
                    </button>
                    <div className="aspect-square relative p-4">
                        <Image
                            src={
                                product.image ||
                                "/placeholder.svg?height=200&width=200"
                            }
                            alt={product.name}
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
                <CardContent className="p-4">
                    <h3 className="text-sm line-clamp-2 mb-1">
                        {product.name}
                    </h3>
                    <div className="amazon-rating mb-1">
                        <div className="amazon-rating-stars flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                        i < Math.floor(product.rating)
                                            ? "fill-[#FFA41C]"
                                            : "fill-gray-200"
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">
                            {product.reviewCount.toLocaleString()}
                        </span>
                    </div>
                    <div className="mb-2">
                        <span className="amazon-price">
                            <span className="amazon-price-symbol">$</span>
                            {Math.floor(product.price)}
                            <span className="amazon-price-fraction">
                                {(product.price % 1).toFixed(2).substring(1)}
                            </span>
                        </span>
                        {originalPrice && (
                            <span className="amazon-price-was text-xs ml-2">
                                ${originalPrice}
                            </span>
                        )}
                    </div>
                    {product.isPrime && (
                        <div className="flex items-center mb-2">
                            <span className="prime-badge">Prime</span>
                            <span className="text-xs ml-1">FREE delivery</span>
                        </div>
                    )}
                    <button
                        className="amazon-button-add w-full text-sm mt-2"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </CardContent>
            </Card>
        </Link>
    );
}
