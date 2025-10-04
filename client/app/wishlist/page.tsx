"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Trash2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/components/shared/cart-provider";
import { mockProducts } from "@/lib/mock-data";
import { toast } from "sonner";

export default function WishlistPage() {
    const { addToCart } = useCart();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("date-added");

    // Mock wishlist items (using some products from mockProducts)
    const [wishlistItems, setWishlistItems] = useState(
        mockProducts.slice(0, 5)
    );

    // Search wishlist
    const filteredItems = searchQuery
        ? wishlistItems.filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : wishlistItems;

    // Sort wishlist
    const sortedItems = [...filteredItems].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.price - b.price;
            case "price-high":
                return b.price - a.price;
            case "name":
                return a.name.localeCompare(b.name);
            default:
                return 0; // Default to date added (which is the original order)
        }
    });

    const handleAddToCart = (product: any) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            currency: product.currency,
        });
        toast.success(`${product.name} added to cart`);
    };

    const handleRemoveFromWishlist = (id: string) => {
        setWishlistItems(wishlistItems.filter((item) => item.id !== id));
        toast.info("Item removed from wishlist");
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-medium mb-6">Your Lists</h1>

            <Tabs defaultValue="wishlist" className="mb-6">
                <TabsList>
                    <TabsTrigger value="wishlist">Wish List</TabsTrigger>
                    <TabsTrigger value="shopping-list">
                        Shopping List
                    </TabsTrigger>
                    <TabsTrigger value="create-list">Create a List</TabsTrigger>
                </TabsList>

                <TabsContent value="wishlist" className="mt-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1 flex">
                            <Input
                                type="text"
                                placeholder="Search wishlist"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="rounded-r-none"
                            />
                            <Button className="rounded-l-none">
                                <Search className="h-4 w-4" />
                                <span className="sr-only">Search</span>
                            </Button>
                        </div>

                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-full md:w-[200px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date-added">
                                    Date Added
                                </SelectItem>
                                <SelectItem value="price-low">
                                    Price: Low to High
                                </SelectItem>
                                <SelectItem value="price-high">
                                    Price: High to Low
                                </SelectItem>
                                <SelectItem value="name">Name</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {sortedItems.length === 0 ? (
                        <Card>
                            <CardContent className="p-6 text-center">
                                <p className="mb-4">Your wishlist is empty.</p>
                                <Link href="/">
                                    <Button className="amazon-button-primary">
                                        Continue shopping
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-6">
                            {sortedItems.map((item) => (
                                <Card key={item.id}>
                                    <CardContent className="p-4">
                                        <div className="flex flex-col md:flex-row">
                                            <div className="w-32 h-32 relative flex-shrink-0 mb-4 md:mb-0">
                                                <Image
                                                    src={
                                                        item.image ||
                                                        "/placeholder.svg?height=150&width=150"
                                                    }
                                                    alt={item.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>

                                            <div className="flex-1 md:ml-4">
                                                <Link
                                                    href={`/products/${item.slug}`}
                                                    className="hover:text-[#C7511F] hover:underline"
                                                >
                                                    <h3 className="font-medium">
                                                        {item.name}
                                                    </h3>
                                                </Link>

                                                <div className="flex items-baseline mt-1">
                                                    <span className="amazon-price-symbol">
                                                        $
                                                    </span>
                                                    <span className="text-lg font-medium">
                                                        {Math.floor(item.price)}
                                                    </span>
                                                    <span className="amazon-price-fraction">
                                                        {(item.price % 1)
                                                            .toFixed(2)
                                                            .substring(1)}
                                                    </span>
                                                </div>

                                                {item.isPrime && (
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

                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    <Button
                                                        className="amazon-button-add"
                                                        onClick={() =>
                                                            handleAddToCart(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                                        Add to Cart
                                                    </Button>

                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() =>
                                                            handleRemoveFromWishlist(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>

                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                    >
                                                        <Share2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="mt-4 md:mt-0 md:ml-4 md:w-32 flex flex-col items-end">
                                                <Select defaultValue="1">
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Qty: 1" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="1">
                                                            Qty: 1
                                                        </SelectItem>
                                                        <SelectItem value="2">
                                                            Qty: 2
                                                        </SelectItem>
                                                        <SelectItem value="3">
                                                            Qty: 3
                                                        </SelectItem>
                                                        <SelectItem value="4">
                                                            Qty: 4
                                                        </SelectItem>
                                                        <SelectItem value="5">
                                                            Qty: 5
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>

                                                <div className="text-sm mt-2">
                                                    <Link
                                                        href="#"
                                                        className="amazon-link"
                                                    >
                                                        Move to another list
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="shopping-list" className="mt-6">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-medium mb-4">
                                Shopping List
                            </h2>
                            <p>Your shopping list is empty.</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="create-list" className="mt-6">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-medium mb-4">
                                Create a List
                            </h2>
                            <p className="mb-4">
                                Create a custom list to save items for later.
                            </p>
                            <Button className="amazon-button-primary">
                                Create List
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
