"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCart } from "@/components/shared/cart-provider";
import { useLocation } from "@/components/shared/location-provider";
import { toast } from "sonner";

export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const { location } = useLocation();
    const [paymentMethod, setPaymentMethod] = useState("credit-card");
    const [shippingOption, setShippingOption] = useState("free");

    // Calculate subtotal
    const subtotal = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Calculate shipping cost
    const shippingCost =
        shippingOption === "free"
            ? 0
            : shippingOption === "expedited"
            ? 5.99
            : 19.99;

    // Calculate estimated tax (for demo purposes)
    const estimatedTax = subtotal * 0.1;

    // Calculate total
    const total = subtotal + shippingCost + estimatedTax;

    // Count total items
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    const handlePlaceOrder = () => {
        toast.success("Order placed successfully!");
        clearCart();
        setTimeout(() => {
            window.location.href = "/orders/confirmation";
        }, 1000);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-center mb-6">
                <Link href="/" className="inline-block">
                    <div className="relative h-8 w-24">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="96"
                            height="32"
                            viewBox="0 0 192 64"
                            fill="none"
                            className="text-black dark:text-white"
                        >
                            <path
                                d="M116.3 33.9c-5.3 3.9-13 6-19.6 6-9.3 0-17.6-3.4-23.9-9.1-.5-.5-.1-1.1.5-.7 6.9 4 15.4 6.4 24.2 6.4 5.9 0 12.4-1.2 18.4-3.8.9-.4 1.7.6.4 1.2z"
                                fill="#FF9900"
                            />
                            <path
                                d="M119.1 30.7c-.7-.9-4.5-.4-6.2-.2-.5.1-.6-.4-.1-.7 3-2.1 8-1.5 8.6-.8.6.7-.2 5.4-2.8 7.7-.4.3-.8.2-.6-.3.6-1.5 1.9-4.8 1.1-5.7z"
                                fill="#FF9900"
                            />
                            <path
                                d="M108.1 10.3v-2c0-.3.2-.5.5-.5h9.6c.3 0 .5.2.5.5v1.7c0 .3-.3.7-.7.1-.4-.5-3.9-1-3.9-1s5.2 7.8 5.2 17.8v2.2c0 .3-.2.5-.5.5h-5c-.3 0-.5-.2-.5-.5V28c0-5.5.6-13.2-4.7-19.5-.2-.2-.5-.5-.5-.2zM73.7 29.9h-5.2c-.3 0-.5-.2-.5-.5V7.7c0-.3.2-.5.5-.5h4.8c.3 0 .5.2.5.5v2.8h.1c1.3-3.4 3.6-5 6.8-5 3.2 0 5.3 1.6 6.7 5 1.3-3.4 4.1-5 7.2-5 2.2 0 4.5.9 6 2.9 1.6 2.2 1.3 5.5 1.3 8.3l-.1 13.2c0 .3-.2.5-.5.5h-5.1c-.3 0-.5-.2-.5-.5V19.3c0-.8.1-2.9-.1-3.7-.3-1.3-1.2-1.7-2.4-1.7-1 0-2 .7-2.4 1.7-.4 1.1-.4 2.9-.4 3.7v10.1c0 .3-.2.5-.5.5h-5.1c-.3 0-.5-.2-.5-.5V19.3c0-2.4.4-5.9-2.5-5.9-2.9 0-2.8 3.5-2.8 5.9v10.1c-.1.3-.3.5-.6.5zM133.6 7.2c7.6 0 11.7 6.5 11.7 14.8 0 8-4.6 14.4-11.7 14.4-7.5 0-11.5-6.5-11.5-14.6 0-8.1 4.1-14.6 11.5-14.6zm0 5.4c-3.8 0-4 5.2-4 8.4 0 3.2 0 10.1 4 10.1s4.2-7 4.2-10.2c0-2.6-.1-4.7-.7-6.7-.5-1.7-1.6-2.6-3.5-2.6zM151.5 29.9h-5.1c-.3 0-.5-.2-.5-.5V7.7c0-.3.2-.5.5-.5h4.8c.2 0 .4.2.5.4v3h.1c1.4-3.6 3.4-5.3 7-5.3 2.3 0 4.5.8 6 3 1.3 2 1.3 5.4 1.3 7.9v12.2c0 .3-.2.5-.5.5h-5.2c-.3 0-.5-.2-.5-.5V18.2c0-2.3.3-5.7-2.5-5.7-1 0-1.9.7-2.3 1.7-.6 1.3-.7 2.5-.7 4v11.2c0 .3-.2.5-.5.5zM53.9 19.9c0 2 .1 3.7-1 5.5-1.4 2.2-3.7 3.6-6.3 3.6-3.5 0-5.5-2.7-5.5-6.6 0-7.8 7-9.2 13.6-9.2v1.2c0 1.8 0 3.3-.8 5.5zm5.1 10c-.3.3-.8.3-1.2.1-1.7-1.4-2-2.1-2.9-3.4-2.8 2.9-4.8 3.7-8.4 3.7-4.3 0-7.6-2.6-7.6-7.9 0-4.1 2.2-6.9 5.4-8.3 2.8-1.2 6.6-1.4 9.6-1.8V12c0-1.2.1-2.6-.6-3.7-.6-.9-1.8-1.3-2.9-1.3-2 0-3.7 1-4.2 3-.1.3-.3.6-.6.6l-5-.5c-.3-.1-.5-.3-.5-.6C41.8 3.2 46.9 1 51.5 1c2.3 0 5.4.6 7.2 2.4 2.3 2.2 2.1 5.2 2.1 8.4v7.6c0 2.3 1 3.3 1.9 4.5.3.4.4.9 0 1.2-.9.8-2.6 2.2-3.5 3l-.2-.2z"
                                fill="#000000"
                                className="dark:fill-white"
                            />
                            <path
                                d="M19.8 33.2c-9.6 7.1-23.6 10.9-35.6 10.9-16.9 0-32-6.2-43.5-16.6-.9-.8-.1-1.9.9-1.3 12.5 7.3 28 11.7 44 11.7 10.8 0 22.7-2.3 33.6-6.9 1.6-.7 3 1.1.6 2.2z"
                                fill="#FF9900"
                            />
                            <path
                                d="M24.9 27.4c-1.2-1.6-8.2-.7-11.3-.4-.9.1-1.1-.7-.2-1.3 5.5-3.9 14.5-2.8 15.6-1.5 1.1 1.3-.3 9.9-5.1 14-.8.6-1.5.3-1.1-.6 1.1-2.7 3.5-8.7 2.1-10.2z"
                                fill="#FF9900"
                            />
                        </svg>
                    </div>
                </Link>
            </div>

            <h1 className="text-3xl font-medium text-center mb-6">Checkout</h1>

            {cart.items.length === 0 ? (
                <div className="amazon-section text-center py-12">
                    <h2 className="text-2xl mb-4">Your cart is empty</h2>
                    <p className="mb-6">
                        You have no items in your cart. To buy something, click
                        "Add to Cart" next to the item.
                    </p>
                    <Link href="/">
                        <Button className="amazon-button-primary">
                            Continue shopping
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left column - Checkout steps */}
                    <div className="lg:w-2/3">
                        {/* Shipping address */}
                        <Card className="mb-6">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-medium">
                                        1. Shipping address
                                    </h2>
                                    <Button
                                        variant="link"
                                        className="amazon-link p-0"
                                    >
                                        <Edit className="h-4 w-4 mr-1" />
                                        Change
                                    </Button>
                                </div>

                                <div className="pl-6">
                                    <p className="font-medium">John Doe</p>
                                    <p>123 Main Street</p>
                                    <p>Seattle, WA 98101</p>
                                    <p>United States</p>
                                    <p>Phone: (555) 123-4567</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment method */}
                        <Card className="mb-6">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-medium">
                                        2. Payment method
                                    </h2>
                                </div>

                                <RadioGroup
                                    value={paymentMethod}
                                    onValueChange={setPaymentMethod}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                                        <RadioGroupItem
                                            value="credit-card"
                                            id="credit-card"
                                        />
                                        <Label
                                            htmlFor="credit-card"
                                            className="flex-1"
                                        >
                                            <div className="flex justify-between items-center">
                                                <span>
                                                    Credit or debit card
                                                </span>
                                                <div className="flex gap-2">
                                                    <div className="w-10 h-6 bg-blue-600 rounded"></div>
                                                    <div className="w-10 h-6 bg-red-500 rounded"></div>
                                                    <div className="w-10 h-6 bg-green-500 rounded"></div>
                                                </div>
                                            </div>
                                        </Label>
                                    </div>

                                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                                        <RadioGroupItem
                                            value="amazon-store-card"
                                            id="amazon-store-card"
                                        />
                                        <Label
                                            htmlFor="amazon-store-card"
                                            className="flex-1"
                                        >
                                            Amazon Store Card
                                        </Label>
                                    </div>

                                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                                        <RadioGroupItem
                                            value="gift-card"
                                            id="gift-card"
                                        />
                                        <Label
                                            htmlFor="gift-card"
                                            className="flex-1"
                                        >
                                            Gift Card, Promotional Code, or
                                            Vouchers
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </CardContent>
                        </Card>

                        {/* Shipping options */}
                        <Card className="mb-6">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-medium">
                                        3. Shipping options
                                    </h2>
                                </div>

                                <RadioGroup
                                    value={shippingOption}
                                    onValueChange={setShippingOption}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                                        <RadioGroupItem
                                            value="free"
                                            id="free"
                                        />
                                        <Label
                                            htmlFor="free"
                                            className="flex-1"
                                        >
                                            <div className="flex justify-between">
                                                <div>
                                                    <div className="font-medium">
                                                        FREE Prime Delivery
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Tuesday, June 18
                                                    </div>
                                                </div>
                                                <div className="font-medium">
                                                    $0.00
                                                </div>
                                            </div>
                                        </Label>
                                    </div>

                                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                                        <RadioGroupItem
                                            value="expedited"
                                            id="expedited"
                                        />
                                        <Label
                                            htmlFor="expedited"
                                            className="flex-1"
                                        >
                                            <div className="flex justify-between">
                                                <div>
                                                    <div className="font-medium">
                                                        Expedited Shipping
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Friday, June 14
                                                    </div>
                                                </div>
                                                <div className="font-medium">
                                                    $5.99
                                                </div>
                                            </div>
                                        </Label>
                                    </div>

                                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                                        <RadioGroupItem
                                            value="one-day"
                                            id="one-day"
                                        />
                                        <Label
                                            htmlFor="one-day"
                                            className="flex-1"
                                        >
                                            <div className="flex justify-between">
                                                <div>
                                                    <div className="font-medium">
                                                        One-Day Shipping
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Tomorrow, June 13
                                                    </div>
                                                </div>
                                                <div className="font-medium">
                                                    $19.99
                                                </div>
                                            </div>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </CardContent>
                        </Card>

                        {/* Review items */}
                        <Card className="mb-6">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-medium">
                                        4. Review items and shipping
                                    </h2>
                                </div>

                                <div className="space-y-6">
                                    {cart.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex py-4"
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
                                                <Link
                                                    href={`/products/${item.id}`}
                                                    className="hover:text-[#C7511F] hover:underline"
                                                >
                                                    {item.name}
                                                </Link>

                                                <div className="text-sm text-[#007600] mb-1">
                                                    In Stock
                                                </div>

                                                <div className="flex items-center text-sm mb-1">
                                                    <span className="text-gray-500">
                                                        Qty:{" "}
                                                    </span>
                                                    <span className="ml-1">
                                                        {item.quantity}
                                                    </span>
                                                </div>

                                                <div className="text-sm font-medium">
                                                    $
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right column - Order summary */}
                    <div className="lg:w-1/3">
                        <Card className="sticky top-20">
                            <CardContent className="p-6">
                                <Button
                                    className="amazon-button-buy w-full mb-4"
                                    onClick={handlePlaceOrder}
                                >
                                    <Lock className="h-4 w-4 mr-2" />
                                    Place your order
                                </Button>

                                <p className="text-xs text-center mb-4">
                                    By placing your order, you agree to
                                    Amazon&apos;s{" "}
                                    <Link
                                        href="/conditions-of-use"
                                        className="amazon-link"
                                    >
                                        privacy notice
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        href="/privacy-notice"
                                        className="amazon-link"
                                    >
                                        conditions of use
                                    </Link>
                                    .
                                </p>

                                <div className="border rounded-md p-4">
                                    <h3 className="text-lg font-medium mb-4">
                                        Order Summary
                                    </h3>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Items ({itemCount}):</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Shipping & handling:</span>
                                            <span>
                                                ${shippingCost.toFixed(2)}
                                            </span>
                                        </div>

                                        <Separator className="my-2" />

                                        <div className="flex justify-between">
                                            <span>Total before tax:</span>
                                            <span>
                                                $
                                                {(
                                                    subtotal + shippingCost
                                                ).toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>
                                                Estimated tax to be collected:
                                            </span>
                                            <span>
                                                ${estimatedTax.toFixed(2)}
                                            </span>
                                        </div>

                                        <Separator className="my-2" />

                                        <div className="flex justify-between text-xl font-bold text-[#B12704]">
                                            <span>Order total:</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}
