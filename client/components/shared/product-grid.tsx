"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

interface ProductGridProps {
    products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
    const { addToCart } = useCart();
    const [wishlist, setWishlist] = useState<string[]>([]);

    const toggleWishlist = (id: string) => {
        setWishlist((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    };

    const handleAddToCart = (product: Product) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            currency: product.currency,
        });
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <Card
                    key={product.id}
                    className="overflow-hidden product-card-hover"
                >
                    <div className="relative">
                        {product.discount && (
                            <div className="absolute top-2 right-2 z-10">
                                <Badge className="bg-red-500 hover:bg-red-600">
                                    {product.discount}% OFF
                                </Badge>
                            </div>
                        )}
                        <button
                            className="absolute top-2 left-2 z-10 p-1.5 bg-white/80 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black transition-colors"
                            onClick={() => toggleWishlist(product.id)}
                        >
                            <Heart
                                className={`h-4 w-4 ${
                                    wishlist.includes(product.id)
                                        ? "fill-red-500 text-red-500"
                                        : "text-gray-600 dark:text-gray-400"
                                }`}
                            />
                        </button>
                        <Link href={`/products/${product.slug}`}>
                            <div className="aspect-square relative">
                                <Image
                                    src={
                                        product.image ||
                                        "/placeholder.svg?height=300&width=300"
                                    }
                                    alt={product.name}
                                    fill
                                    className="object-contain p-4"
                                />
                            </div>
                        </Link>
                    </div>
                    <CardContent className="p-4">
                        <Link href={`/products/${product.slug}`}>
                            <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">
                                {product.name}
                            </h3>
                        </Link>
                        <div className="flex items-center gap-1 mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                        i < Math.floor(product.rating)
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                    }`}
                                />
                            ))}
                            <span className="text-xs text-muted-foreground">
                                ({product.reviewCount})
                            </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                                <span className="font-bold">
                                    {product.currency === "USD" ? "$" : "€"}
                                    {product.price.toFixed(2)}
                                </span>
                                {product.discount && (
                                    <span className="text-sm line-through text-muted-foreground">
                                        {product.currency === "USD" ? "$" : "€"}
                                        {(
                                            (product.price * 100) /
                                            (100 - product.discount)
                                        ).toFixed(2)}
                                    </span>
                                )}
                            </div>
                            {product.isPrime && (
                                <Badge className="prime-badge">Prime</Badge>
                            )}
                        </div>
                        <Button
                            className="w-full mt-3 gap-2"
                            onClick={() => handleAddToCart(product)}
                        >
                            <ShoppingCart className="h-4 w-4" />
                            Add to Cart
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
