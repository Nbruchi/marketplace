"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/components/shared/cart-provider";
import { ProductCard } from "@/components/shared/product-card";
import { mockProducts } from "@/lib/mock-data";

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
    const [isGift, setIsGift] = useState(false);

    // Calculate subtotal
    const subtotal = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Calculate estimated tax (for demo purposes)
    const estimatedTax = subtotal * 0.1;

    // Calculate total
    const total = subtotal + estimatedTax;

    // Count total items
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    // Recommended products
    const recommendedProducts = mockProducts.slice(0, 4);

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-medium mb-6">Shopping Cart</h1>

            {cart.items.length === 0 ? (
                <div className="amazon-section text-center py-12">
                    <h2 className="text-2xl mb-4">Your Amazon Cart is empty</h2>
                    <p className="mb-6">
                        Your shopping cart is waiting. Give it purpose – fill it
                        with groceries, clothing, household supplies,
                        electronics, and more.
                    </p>
                    <Link href="/">
                        <Button className="amazon-button-primary">
                            Continue shopping
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Cart items */}
                    <div className="lg:w-3/4">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-medium">
                                        Shopping Cart
                                    </h2>
                                    <span className="text-sm text-gray-500">
                                        Price
                                    </span>
                                </div>

                                <Separator className="mb-4" />

                                {cart.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex py-4 border-b"
                                    >
                                        <div className="w-24 h-24 relative flex-shrink-0">
                                            <Image
                                                src={
                                                    item.image ||
                                                    "/placeholder.svg?height=100&width=100"
                                                }
                                                alt={item.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>

                                        <div className="flex-1 ml-4">
                                            <div className="flex justify-between">
                                                <Link
                                                    href={`/products/${item.id}`}
                                                    className="text-lg hover:text-[#C7511F] hover:underline"
                                                >
                                                    {item.name}
                                                </Link>
                                                <div className="text-lg font-medium">
                                                    $
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </div>
                                            </div>

                                            <div className="text-sm text-[#007600] mb-2">
                                                In Stock
                                            </div>

                                            <div className="text-sm mb-1">
                                                <span className="text-gray-500">
                                                    Ships from:{" "}
                                                </span>
                                                Amazon.com
                                            </div>

                                            <div className="text-sm mb-3">
                                                <span className="text-gray-500">
                                                    Sold by:{" "}
                                                </span>
                                                Amazon.com
                                            </div>

                                            <div className="flex items-center">
                                                <div className="flex items-center border rounded-md">
                                                    <button
                                                        className="px-2 py-1 hover:bg-gray-100"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                Math.max(
                                                                    1,
                                                                    item.quantity -
                                                                        1
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="px-4 py-1 border-x">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        className="px-2 py-1 hover:bg-gray-100"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity +
                                                                    1
                                                            )
                                                        }
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>

                                                <Separator
                                                    orientation="vertical"
                                                    className="mx-3 h-6"
                                                />

                                                <button
                                                    className="text-sm amazon-link"
                                                    onClick={() =>
                                                        removeFromCart(item.id)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                                <Separator
                                                    orientation="vertical"
                                                    className="mx-3 h-6"
                                                />

                                                <button className="text-sm amazon-link">
                                                    Save for later
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex justify-between items-center mt-4 text-lg">
                                    <span>
                                        Subtotal ({itemCount}{" "}
                                        {itemCount === 1 ? "item" : "items"}):
                                    </span>
                                    <span className="font-bold">
                                        ${subtotal.toFixed(2)}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Saved for later */}
                        <Card className="mt-6">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-medium mb-4">
                                    Saved for later (0 items)
                                </h2>
                                <p className="text-sm text-gray-500">
                                    You haven't saved any items for later. To
                                    save an item for later, remove it from your
                                    cart by clicking "Save for later".
                                </p>
                            </CardContent>
                        </Card>

                        {/* Recommendations */}
                        <div className="mt-8">
                            <h2 className="text-xl font-medium mb-4">
                                Recommended based on items in your cart
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {recommendedProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Checkout card */}
                    <div className="lg:w-1/4">
                        <Card className="sticky top-20">
                            <CardContent className="p-4">
                                <div className="flex items-start mb-4">
                                    <Check className="h-5 w-5 text-[#007600] mr-2 mt-0.5" />
                                    <div>
                                        <span className="text-[#007600] font-medium">
                                            Your order qualifies for FREE
                                            Shipping.
                                        </span>
                                        <span className="block text-sm">
                                            Choose this option at checkout. See
                                            details
                                        </span>
                                    </div>
                                </div>

                                <div className="text-lg mb-4">
                                    <div className="flex justify-between">
                                        <span>
                                            Subtotal ({itemCount}{" "}
                                            {itemCount === 1 ? "item" : "items"}
                                            ):
                                        </span>
                                        <span className="font-bold">
                                            ${subtotal.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center mb-4">
                                    <input
                                        type="checkbox"
                                        id="gift"
                                        checked={isGift}
                                        onChange={() => setIsGift(!isGift)}
                                        className="amazon-checkbox"
                                    />
                                    <label
                                        htmlFor="gift"
                                        className="ml-2 text-sm"
                                    >
                                        This order contains a gift
                                    </label>
                                </div>

                                <Link href="/checkout">
                                    <Button className="amazon-button-buy w-full mb-3">
                                        Proceed to checkout
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}
