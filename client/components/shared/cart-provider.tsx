"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/components/shared/language-provider";

export type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    currency: string;
};

type CartContextType = {
    cart: {
        items: CartItem[];
        subtotal: number;
        currency: string;
    };
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const languageContext = useLanguage();
    const { t } = languageContext || {
        t: (key: string) => {
            const fallbackTranslations: Record<string, string> = {
                added_to_cart: "Added to cart",
                removed_from_cart: "Removed from cart",
                cart_cleared: "Cart cleared",
            };
            return fallbackTranslations[key] || key;
        },
    };

    const [cart, setCart] = useState<{
        items: CartItem[];
        subtotal: number;
        currency: string;
    }>({
        items: [],
        subtotal: 0,
        currency: "USD",
    });

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error("Failed to parse cart from localStorage", error);
            }
        }
    }, []);

    // Save cart to localStorage when it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Calculate subtotal whenever items change
    useEffect(() => {
        const newSubtotal = cart.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        setCart((prev) => ({ ...prev, subtotal: newSubtotal }));
    }, [cart.items]);

    const addToCart = (item: Omit<CartItem, "quantity">) => {
        setCart((prev) => {
            const existingItemIndex = prev.items.findIndex(
                (i) => i.id === item.id
            );

            if (existingItemIndex >= 0) {
                // Item exists, update quantity
                const updatedItems = [...prev.items];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + 1,
                };

                toast.success(t("added_to_cart"));

                return {
                    ...prev,
                    items: updatedItems,
                };
            } else {
                // New item
                toast.success(t("added_to_cart"));

                return {
                    ...prev,
                    items: [...prev.items, { ...item, quantity: 1 }],
                };
            }
        });
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => ({
            ...prev,
            items: prev.items.filter((item) => item.id !== id),
        }));

        toast.info(t("removed_from_cart"));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;

        setCart((prev) => ({
            ...prev,
            items: prev.items.map((item) =>
                item.id === id ? { ...item, quantity } : item
            ),
        }));
    };

    const clearCart = () => {
        setCart({
            items: [],
            subtotal: 0,
            currency: "USD",
        });

        toast.info(t("cart_cleared"));
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
