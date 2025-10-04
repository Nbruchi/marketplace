"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/shared/product-card";
import { mockProducts, mockCategories } from "@/lib/mock-data";

interface CategoryPageProps {
    params: {
        slug: string;
    };
}

export default function CategoryPage({ params }: CategoryPageProps) {
    const category = mockCategories.find((c) => c.slug === params.slug) || {
        id: params.slug,
        name: params.slug.charAt(0).toUpperCase() + params.slug.slice(1),
        image: "/placeholder.svg",
        slug: params.slug,
    };

    // Get products for this category
    const products = mockProducts.filter((p) => p.category === params.slug);

    // State for filters
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
    const [sortBy, setSortBy] = useState<string>("featured");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    // Mock brands
    const brands = [
        { id: "brand1", name: "Brand A" },
        { id: "brand2", name: "Brand B" },
        { id: "brand3", name: "Brand C" },
        { id: "brand4", name: "Brand D" },
    ];

    // Toggle brand selection
    const toggleBrand = (brandId: string) => {
        setSelectedBrands((prev) =>
            prev.includes(brandId)
                ? prev.filter((id) => id !== brandId)
                : [...prev, brandId]
        );
    };

    // Toggle rating selection
    const toggleRating = (rating: number) => {
        setSelectedRatings((prev) =>
            prev.includes(rating)
                ? prev.filter((r) => r !== rating)
                : [...prev, rating]
        );
    };

    // Filter products
    const filteredProducts = products.filter((product) => {
        // Price filter
        if (product.price < priceRange[0] || product.price > priceRange[1]) {
            return false;
        }

        // Brand filter (if any selected)
        if (selectedBrands.length > 0) {
            // In a real app, we would check product.brand
            // For mock data, we'll just use a random check
            const brandIndex = Number.parseInt(product.id) % brands.length;
            if (!selectedBrands.includes(brands[brandIndex].id)) {
                return false;
            }
        }

        // Rating filter (if any selected)
        if (selectedRatings.length > 0) {
            const productRating = Math.floor(product.rating);
            if (!selectedRatings.includes(productRating)) {
                return false;
            }
        }

        return true;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.price - b.price;
            case "price-high":
                return b.price - a.price;
            case "rating":
                return b.rating - a.rating;
            case "newest":
                // In a real app, we would sort by date
                return Number.parseInt(b.id) - Number.parseInt(a.id);
            default:
                // Featured - use default order
                return 0;
        }
    });

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Breadcrumbs */}
            <div className="text-sm mb-4">
                <Link href="/" className="amazon-link">
                    Home
                </Link>
                {" › "}
                <span className="text-gray-500">{category.name}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Filters sidebar */}
                <div className="lg:w-1/4">
                    <Card>
                        <CardContent className="p-4">
                            <h2 className="font-bold mb-4">Filters</h2>

                            {/* Price filter */}
                            <div className="mb-6">
                                <h3 className="font-medium mb-2">Price</h3>
                                <div className="mb-4">
                                    <Slider
                                        value={priceRange}
                                        min={0}
                                        max={300}
                                        step={1}
                                        onValueChange={(value) =>
                                            setPriceRange(
                                                value as [number, number]
                                            )
                                        }
                                        className="mb-2"
                                    />
                                    <div className="flex justify-between text-sm">
                                        <span>${priceRange[0]}</span>
                                        <span>${priceRange[1]}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full"
                                        onClick={() => setPriceRange([0, 25])}
                                    >
                                        Under $25
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full"
                                        onClick={() => setPriceRange([25, 50])}
                                    >
                                        $25 to $50
                                    </Button>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full"
                                        onClick={() => setPriceRange([50, 100])}
                                    >
                                        $50 to $100
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full"
                                        onClick={() =>
                                            setPriceRange([100, 300])
                                        }
                                    >
                                        $100 & Above
                                    </Button>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            {/* Brand filter */}
                            <div className="mb-6">
                                <h3 className="font-medium mb-2">Brand</h3>
                                <div className="space-y-2">
                                    {brands.map((brand) => (
                                        <div
                                            key={brand.id}
                                            className="flex items-center"
                                        >
                                            <Checkbox
                                                id={brand.id}
                                                checked={selectedBrands.includes(
                                                    brand.id
                                                )}
                                                onCheckedChange={() =>
                                                    toggleBrand(brand.id)
                                                }
                                                className="amazon-checkbox"
                                            />
                                            <Label
                                                htmlFor={brand.id}
                                                className="ml-2 text-sm"
                                            >
                                                {brand.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator className="my-4" />

                            {/* Rating filter */}
                            <div className="mb-6">
                                <h3 className="font-medium mb-2">
                                    Customer Reviews
                                </h3>
                                <div className="space-y-2">
                                    {[4, 3, 2, 1].map((rating) => (
                                        <div
                                            key={rating}
                                            className="flex items-center"
                                        >
                                            <Checkbox
                                                id={`rating-${rating}`}
                                                checked={selectedRatings.includes(
                                                    rating
                                                )}
                                                onCheckedChange={() =>
                                                    toggleRating(rating)
                                                }
                                                className="amazon-checkbox"
                                            />
                                            <Label
                                                htmlFor={`rating-${rating}`}
                                                className="ml-2 flex items-center"
                                            >
                                                <div className="flex">
                                                    {Array.from({
                                                        length: 5,
                                                    }).map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${
                                                                i < rating
                                                                    ? "fill-[#FFA41C] text-[#FFA41C]"
                                                                    : "fill-gray-200 text-gray-200"
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm ml-1">
                                                    & Up
                                                </span>
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator className="my-4" />

                            {/* Availability filter */}
                            <div>
                                <h3 className="font-medium mb-2">
                                    Availability
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <Checkbox
                                            id="include-out-of-stock"
                                            className="amazon-checkbox"
                                        />
                                        <Label
                                            htmlFor="include-out-of-stock"
                                            className="ml-2 text-sm"
                                        >
                                            Include Out of Stock
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Products */}
                <div className="lg:w-3/4">
                    {/* Category header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold mb-2">
                            {category.name}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {sortedProducts.length} results
                        </p>
                    </div>

                    {/* Sort and view options */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <div className="flex items-center">
                            <span className="text-sm mr-2">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="amazon-select text-sm"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">
                                    Price: Low to High
                                </option>
                                <option value="price-high">
                                    Price: High to Low
                                </option>
                                <option value="rating">
                                    Avg. Customer Review
                                </option>
                                <option value="newest">Newest Arrivals</option>
                            </select>
                        </div>

                        <div className="flex items-center">
                            <Button
                                variant={
                                    viewMode === "grid" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setViewMode("grid")}
                                className="mr-2"
                            >
                                Grid
                            </Button>
                            <Button
                                variant={
                                    viewMode === "list" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setViewMode("list")}
                            >
                                List
                            </Button>
                        </div>
                    </div>

                    {/* Products grid/list */}
                    {sortedProducts.length === 0 ? (
                        <Card>
                            <CardContent className="p-6 text-center">
                                <p className="mb-4">
                                    No products found matching your criteria.
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setPriceRange([0, 300]);
                                        setSelectedBrands([]);
                                        setSelectedRatings([]);
                                    }}
                                >
                                    Clear filters
                                </Button>
                            </CardContent>
                        </Card>
                    ) : viewMode === "grid" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {sortedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {sortedProducts.map((product) => (
                                <Card key={product.id}>
                                    <CardContent className="p-4">
                                        <div className="flex flex-col md:flex-row">
                                            <div className="w-full md:w-48 h-48 relative flex-shrink-0 mb-4 md:mb-0">
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

                                            <div className="flex-1 md:ml-4">
                                                <Link
                                                    href={`/products/${product.slug}`}
                                                    className="hover:text-[#C7511F] hover:underline"
                                                >
                                                    <h3 className="font-medium">
                                                        {product.name}
                                                    </h3>
                                                </Link>

                                                <div className="flex items-center mt-1">
                                                    <div className="flex">
                                                        {Array.from({
                                                            length: 5,
                                                        }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${
                                                                    i <
                                                                    Math.floor(
                                                                        product.rating
                                                                    )
                                                                        ? "fill-[#FFA41C] text-[#FFA41C]"
                                                                        : "fill-gray-200 text-gray-200"
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-sm ml-1">
                                                        {product.reviewCount.toLocaleString()}
                                                    </span>
                                                </div>

                                                <div className="flex items-baseline mt-1">
                                                    <span className="amazon-price-symbol">
                                                        $
                                                    </span>
                                                    <span className="text-lg font-medium">
                                                        {Math.floor(
                                                            product.price
                                                        )}
                                                    </span>
                                                    <span className="amazon-price-fraction">
                                                        {(product.price % 1)
                                                            .toFixed(2)
                                                            .substring(1)}
                                                    </span>
                                                </div>

                                                {product.isPrime && (
                                                    <div className="flex items-center mt-1">
                                                        <span className="prime-badge mr-2">
                                                            Prime
                                                        </span>
                                                        <span className="text-sm">
                                                            FREE delivery
                                                        </span>
                                                    </div>
                                                )}

                                                <div className="text-sm text-[#007600] mt-1">
                                                    In Stock
                                                </div>

                                                <div className="mt-4">
                                                    <Link
                                                        href={`/products/${product.slug}`}
                                                    >
                                                        <Button className="amazon-button-primary">
                                                            View Product
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
                        <div className="flex items-center">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled
                                className="mr-2"
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-gray-100 mr-2"
                            >
                                1
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mr-2"
                            >
                                2
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mr-2"
                            >
                                3
                            </Button>
                            <span className="mx-2">...</span>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mr-2"
                            >
                                10
                            </Button>
                            <Button variant="outline" size="sm">
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
