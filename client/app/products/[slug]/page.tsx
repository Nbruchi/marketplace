"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Truck, Shield, Gift, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/shared/product-card";
import { mockProducts } from "@/lib/mock-data"; // Keep for fallback
import { AddToCartButton } from "@/components/shared/add-to-cart-button";
import api from "@/lib/api";

interface ProductPageProps {
    params: {
        slug: string;
    };
}

export default function ProductPage({ params }: ProductPageProps) {
    // This component uses client-side data fetching

    const [product, setProduct] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [similarProducts, setSimilarProducts] = React.useState<any[]>([]);

    React.useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                // Fetch product by slug
                const productData = await api.product.getProductById(
                    params.slug
                );
                setProduct(productData);

                // Fetch similar products
                const productsData = await api.product.getProducts({
                    category: productData.category,
                    limit: 6,
                });
                // Filter out the current product
                const filteredProducts = productsData.products
                    .filter((p: any) => p.id !== productData.id)
                    .slice(0, 6);
                setSimilarProducts(filteredProducts);

                setLoading(false);
            } catch (err: any) {
                console.error("Error fetching product:", err);
                setError(err.message || "Failed to load product");
                setLoading(false);

                // Fallback to mock data if API fails
                const mockProduct =
                    mockProducts.find((p) => p.slug === params.slug) ||
                    mockProducts[0];
                setProduct(mockProduct);
                setSimilarProducts(
                    mockProducts
                        .filter(
                            (p) =>
                                p.category === mockProduct.category &&
                                p.id !== mockProduct.id
                        )
                        .slice(0, 6)
                );
            }
        };

        fetchProduct();
    }, [params.slug]);

    // Show loading state
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-6 flex justify-center items-center min-h-[50vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p>Loading product...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error && !product) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    <p>{error}</p>
                    <p className="mt-2">
                        <Link href="/products" className="amazon-link">
                            Browse all products
                        </Link>
                    </p>
                </div>
            </div>
        );
    }

    // Fallback to mock data if API fails
    if (!product) {
        const fallbackProduct =
            mockProducts.find((p) => p.slug === params.slug) || mockProducts[0];
        setProduct(fallbackProduct);
    }

    // Product images (either from API or placeholders)
    const productImages = [
        product?.image || "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600&text=Image+2",
        "/placeholder.svg?height=600&width=600&text=Image+3",
        "/placeholder.svg?height=600&width=600&text=Image+4",
        "/placeholder.svg?height=600&width=600&text=Image+5",
    ];

    // Mock product details
    const productDetails = {
        brand: "Brand Name",
        model: "Model XYZ-123",
        dimensions: "10 x 5 x 2 inches",
        weight: "1.2 pounds",
        color: "Black",
        material: "Aluminum",
        warranty: "1 year limited warranty",
    };

    // Mock product features
    const productFeatures = [
        "High-quality materials for durability",
        "Energy efficient design",
        "Easy to use interface",
        "Compatible with most devices",
        "Lightweight and portable",
    ];

    // Mock reviews
    const reviews = [
        {
            id: "1",
            author: "John D.",
            rating: 5,
            title: "Excellent product!",
            date: "Reviewed in the United States on June 10, 2023",
            content:
                "This product exceeded my expectations. The quality is outstanding and it works perfectly for my needs.",
            helpful: 42,
        },
        {
            id: "2",
            author: "Sarah M.",
            rating: 4,
            title: "Good value for money",
            date: "Reviewed in the United States on May 22, 2023",
            content:
                "I'm happy with this purchase. It's not perfect but definitely worth the price. Would recommend to others looking for a budget-friendly option.",
            helpful: 18,
        },
        {
            id: "3",
            author: "Robert K.",
            rating: 3,
            title: "Decent but has some issues",
            date: "Reviewed in the United States on April 15, 2023",
            content:
                "The product works as advertised most of the time, but I've encountered some minor issues. Customer service was helpful in resolving them.",
            helpful: 7,
        },
    ];

    // Calculate average rating
    const avgRating = product.rating;

    // Calculate rating distribution
    const ratingDistribution = [
        { stars: 5, percentage: 70 },
        { stars: 4, percentage: 15 },
        { stars: 3, percentage: 8 },
        { stars: 2, percentage: 4 },
        { stars: 1, percentage: 3 },
    ];

    // Similar products are now fetched from the API in useEffect

    // Original price if discounted
    const originalPrice = product.discount
        ? ((product.price * 100) / (100 - product.discount)).toFixed(2)
        : null;

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Breadcrumbs */}
                <div className="text-sm mb-4 lg:hidden">
                    <Link href="/" className="amazon-link">
                        Home
                    </Link>
                    {" › "}
                    <Link
                        href={`/products/category/${product.category}`}
                        className="amazon-link"
                    >
                        {product.category.charAt(0).toUpperCase() +
                            product.category.slice(1)}
                    </Link>
                    {" › "}
                    <span className="text-gray-500">{product.name}</span>
                </div>

                {/* Product images */}
                <div className="lg:w-2/5">
                    <div className="sticky top-20">
                        <div className="hidden lg:block text-sm mb-4">
                            <Link href="/" className="amazon-link">
                                Home
                            </Link>
                            {" › "}
                            <Link
                                href={`/products/category/${product.category}`}
                                className="amazon-link"
                            >
                                {product.category.charAt(0).toUpperCase() +
                                    product.category.slice(1)}
                            </Link>
                            {" › "}
                            <span className="text-gray-500">
                                {product.name}
                            </span>
                        </div>

                        <div className="aspect-square relative mb-4">
                            <Image
                                src={productImages[0] || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {productImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="w-16 h-16 relative border border-gray-300 cursor-pointer hover:border-[#e77600]"
                                >
                                    <Image
                                        src={image || "/placeholder.svg"}
                                        alt={`${product.name} - Image ${
                                            index + 1
                                        }`}
                                        fill
                                        className="object-contain p-1"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product info */}
                <div className="lg:w-2/5">
                    <h1 className="text-xl lg:text-2xl font-medium mb-1">
                        {product.name}
                    </h1>

                    <Link
                        href="#reviews"
                        className="amazon-link flex items-center mb-2"
                    >
                        <div className="amazon-rating-stars flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                        i < Math.floor(product.rating)
                                            ? "fill-[#FFA41C]"
                                            : "fill-gray-200"
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="ml-1">
                            {product.rating.toFixed(1)}
                        </span>
                        <span className="mx-2">|</span>
                        <span>
                            {product.reviewCount.toLocaleString()} ratings
                        </span>
                    </Link>

                    <Separator className="my-3" />

                    <div className="mb-3">
                        {product.discount && (
                            <div className="flex items-center mb-1">
                                <Badge className="amazon-badge amazon-badge-deal mr-2">
                                    {product.discount}% off
                                </Badge>
                                <span className="text-sm text-[#CC0C39]">
                                    Limited time deal
                                </span>
                            </div>
                        )}

                        <div className="flex items-baseline">
                            <span className="amazon-price-symbol text-sm align-top">
                                $
                            </span>
                            <span className="text-2xl font-medium">
                                {Math.floor(product.price)}
                            </span>
                            <span className="amazon-price-fraction">
                                {(product.price % 1).toFixed(2).substring(1)}
                            </span>
                        </div>

                        {originalPrice && (
                            <div className="flex items-center mt-1">
                                <span className="amazon-price-was mr-2">
                                    List Price: ${originalPrice}
                                </span>
                                <span className="amazon-price-save">
                                    You Save: $
                                    {(
                                        Number(originalPrice) - product.price
                                    ).toFixed(2)}{" "}
                                    ({product.discount}%)
                                </span>
                            </div>
                        )}
                    </div>

                    {product.isPrime && (
                        <div className="flex items-center mb-3">
                            <span className="prime-badge mr-2">Prime</span>
                            <span className="text-sm">FREE delivery</span>
                        </div>
                    )}

                    <div className="mb-4">
                        <div className="flex items-center text-sm mb-1">
                            <span className="font-bold mr-2">Brand:</span>
                            <span>{productDetails.brand}</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <span className="font-bold mr-2">Model:</span>
                            <span>{productDetails.model}</span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-bold mb-2">About this item:</h3>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                            {productFeatures.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>

                    <Tabs defaultValue="description" className="mb-4">
                        <TabsList className="w-full">
                            <TabsTrigger value="description" className="flex-1">
                                Description
                            </TabsTrigger>
                            <TabsTrigger value="details" className="flex-1">
                                Details
                            </TabsTrigger>
                            <TabsTrigger value="shipping" className="flex-1">
                                Shipping
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="description"
                            className="text-sm mt-4"
                        >
                            <p>
                                {product.name} is a high-quality product
                                designed to meet your needs. It features premium
                                materials and construction for long-lasting
                                performance. This versatile item is perfect for
                                everyday use and will exceed your expectations.
                            </p>
                        </TabsContent>
                        <TabsContent value="details" className="text-sm mt-4">
                            <div className="grid grid-cols-2 gap-2">
                                {Object.entries(productDetails).map(
                                    ([key, value]) => (
                                        <div key={key}>
                                            <span className="font-bold">
                                                {key.charAt(0).toUpperCase() +
                                                    key.slice(1)}
                                                :
                                            </span>{" "}
                                            {value}
                                        </div>
                                    )
                                )}
                            </div>
                        </TabsContent>
                        <TabsContent value="shipping" className="text-sm mt-4">
                            <p className="mb-2">
                                <span className="font-bold">Delivery:</span>{" "}
                                FREE delivery available
                            </p>
                            <p className="mb-2">
                                <span className="font-bold">Returns:</span>{" "}
                                Eligible for Return, Refund or Replacement
                                within 30 days of receipt
                            </p>
                            <p>
                                <span className="font-bold">
                                    Shipping from:
                                </span>{" "}
                                Amazon.com
                            </p>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Buy box */}
                <div className="lg:w-1/5">
                    <div className="amazon-card sticky top-20">
                        <div className="mb-3">
                            <span className="amazon-price">
                                <span className="amazon-price-symbol">$</span>
                                {Math.floor(product.price)}
                                <span className="amazon-price-fraction">
                                    {(product.price % 1)
                                        .toFixed(2)
                                        .substring(1)}
                                </span>
                            </span>

                            {originalPrice && (
                                <div className="text-sm mt-1">
                                    <span className="amazon-price-was">
                                        List Price: ${originalPrice}
                                    </span>
                                </div>
                            )}
                        </div>

                        {product.isPrime && (
                            <div className="flex items-center mb-3">
                                <span className="prime-badge mr-2">Prime</span>
                                <span className="text-sm">FREE delivery</span>
                            </div>
                        )}

                        <div className="text-sm mb-4">
                            <div className="flex items-start mb-1">
                                <Truck className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                <span>
                                    <span className="font-bold">
                                        FREE delivery
                                    </span>{" "}
                                    Tuesday, June 18
                                </span>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                                <span>Deliver to John - Seattle 98101</span>
                            </div>
                        </div>

                        <div className="text-lg font-medium text-[#007600] mb-4">
                            In Stock
                        </div>

                        <div className="space-y-2 mb-4">
                            <AddToCartButton product={product} variant="add" />
                            <AddToCartButton product={product} variant="buy" />
                        </div>

                        <div className="text-sm space-y-3">
                            <div className="flex">
                                <Shield className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span>
                                    <Link
                                        href="/returns"
                                        className="amazon-link"
                                    >
                                        Secure transaction
                                    </Link>
                                </span>
                            </div>

                            <div className="flex">
                                <Gift className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span>
                                    <Link
                                        href="/gift-wrap"
                                        className="amazon-link"
                                    >
                                        Add gift options
                                    </Link>
                                </span>
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                            >
                                Add to List
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product details section */}
            <div className="mt-12">
                <h2 className="text-xl font-bold mb-4">Product Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-bold mb-2">Technical Details</h3>
                        <table className="w-full text-sm">
                            <tbody>
                                {Object.entries(productDetails).map(
                                    ([key, value], index) => (
                                        <tr
                                            key={index}
                                            className={
                                                index % 2 === 0
                                                    ? "bg-gray-100 dark:bg-gray-800"
                                                    : ""
                                            }
                                        >
                                            <td className="py-2 px-4 font-medium">
                                                {key.charAt(0).toUpperCase() +
                                                    key.slice(1)}
                                            </td>
                                            <td className="py-2 px-4">
                                                {value}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2">
                            Additional Information
                        </h3>
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="bg-gray-100 dark:bg-gray-800">
                                    <td className="py-2 px-4 font-medium">
                                        ASIN
                                    </td>
                                    <td className="py-2 px-4">B0123456789</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 font-medium">
                                        Customer Reviews
                                    </td>
                                    <td className="py-2 px-4">
                                        <Link
                                            href="#reviews"
                                            className="amazon-link flex items-center"
                                        >
                                            <div className="amazon-rating-stars flex">
                                                {Array.from({ length: 5 }).map(
                                                    (_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${
                                                                i <
                                                                Math.floor(
                                                                    product.rating
                                                                )
                                                                    ? "fill-[#FFA41C]"
                                                                    : "fill-gray-200"
                                                            }`}
                                                        />
                                                    )
                                                )}
                                            </div>
                                            <span className="ml-1">
                                                {product.rating.toFixed(1)} out
                                                of 5
                                            </span>
                                        </Link>
                                    </td>
                                </tr>
                                <tr className="bg-gray-100 dark:bg-gray-800">
                                    <td className="py-2 px-4 font-medium">
                                        Best Sellers Rank
                                    </td>
                                    <td className="py-2 px-4">
                                        #1,234 in{" "}
                                        {product.category
                                            .charAt(0)
                                            .toUpperCase() +
                                            product.category.slice(1)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 font-medium">
                                        Date First Available
                                    </td>
                                    <td className="py-2 px-4">
                                        January 15, 2023
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Reviews section */}
            <div id="reviews" className="mt-12 scroll-mt-20">
                <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <div className="amazon-rating-stars flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${
                                                i < Math.floor(avgRating)
                                                    ? "fill-[#FFA41C]"
                                                    : "fill-gray-200"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="ml-2 text-lg">
                                    {avgRating.toFixed(1)} out of 5
                                </span>
                            </div>
                            <div className="text-sm text-gray-500">
                                {product.reviewCount.toLocaleString()} global
                                ratings
                            </div>
                        </div>

                        <div className="space-y-1 mb-6">
                            {ratingDistribution.map((item) => (
                                <div
                                    key={item.stars}
                                    className="flex items-center text-sm"
                                >
                                    <Link href="#" className="amazon-link mr-2">
                                        {item.stars} star
                                    </Link>
                                    <div className="w-48 bg-gray-200 h-4 rounded-sm overflow-hidden mr-2">
                                        <div
                                            className="bg-[#FFA41C] h-full"
                                            style={{
                                                width: `${item.percentage}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <span>{item.percentage}%</span>
                                </div>
                            ))}
                        </div>

                        <Button className="w-full mb-2">
                            Write a customer review
                        </Button>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <div key={review.id} className="border-b pb-6">
                                    <div className="flex items-center mb-2">
                                        <span className="font-bold mr-2">
                                            {review.author}
                                        </span>
                                        <div className="amazon-rating-stars flex">
                                            {Array.from({ length: 5 }).map(
                                                (_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${
                                                            i < review.rating
                                                                ? "fill-[#FFA41C]"
                                                                : "fill-gray-200"
                                                        }`}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <h4 className="font-bold mb-1">
                                        {review.title}
                                    </h4>
                                    <div className="text-sm text-gray-500 mb-2">
                                        {review.date}
                                    </div>
                                    <p className="text-sm mb-3">
                                        {review.content}
                                    </p>

                                    <div className="text-sm">
                                        <span>
                                            {review.helpful} people found this
                                            helpful
                                        </span>
                                        <div className="flex items-center mt-1 gap-2">
                                            <Button variant="outline" size="sm">
                                                Helpful
                                            </Button>
                                            <Link
                                                href="#"
                                                className="amazon-link text-xs"
                                            >
                                                Report abuse
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6">
                            <Link href="#" className="amazon-link">
                                See all reviews
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Similar products */}
            <div className="mt-12">
                <h2 className="text-xl font-bold mb-4">Similar products</h2>
                <Carousel className="w-full">
                    <CarouselContent className="-ml-4">
                        {similarProducts && similarProducts.length > 0 ? (
                            similarProducts.map((similarProduct) => (
                                <CarouselItem
                                    key={similarProduct.id}
                                    className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                                >
                                    <ProductCard product={similarProduct} />
                                </CarouselItem>
                            ))
                        ) : (
                            <CarouselItem className="pl-4 md:basis-full">
                                <p className="text-center py-8 text-gray-500">
                                    No similar products found
                                </p>
                            </CarouselItem>
                        )}
                    </CarouselContent>
                    {similarProducts && similarProducts.length > 1 && (
                        <>
                            <CarouselPrevious className="left-2" />
                            <CarouselNext className="right-2" />
                        </>
                    )}
                </Carousel>
            </div>
        </div>
    );
}
