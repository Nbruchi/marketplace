"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/shared/cart-provider";

type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    currency: string;
};

interface AddToCartButtonProps {
    product: Product;
    variant: "add" | "buy";
}

export function AddToCartButton({ product, variant }: AddToCartButtonProps) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            currency: product.currency,
        });

        if (variant === "buy") {
            // Redirect to checkout
            setTimeout(() => {
                window.location.href = "/checkout";
            }, 300);
        }
    };

    return (
        <Button
            className={
                variant === "add"
                    ? "amazon-button-add w-full"
                    : "amazon-button-buy w-full"
            }
            onClick={handleAddToCart}
        >
            {variant === "add" ? (
                <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                </>
            ) : (
                "Buy Now"
            )}
        </Button>
    );
}
