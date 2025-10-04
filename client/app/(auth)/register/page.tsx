"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPassword, setIsPassword] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !name.trim() ||
            !email.trim() ||
            !password.trim() ||
            !confirmPassword
        ) {
            toast.error(`All fields are required`);
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            // Show loading toast
            const loadingToast = toast.loading("Creating your account...");

            // Import API dynamically to avoid server-side issues
            const { default: api } = await import("@/lib/api");

            // Call the register API
            const response = await api.auth.register({
                name,
                email,
                password,
            });

            // Dismiss loading toast
            toast.dismiss(loadingToast);

            // Show success message
            toast.success("Account created successfully");

            // Store the token in localStorage
            localStorage.setItem("token", response.token);
            router.push(`/signin`);
        } catch (error: any) {
            // Show error message
            toast.error(error.message || "Failed to create account");
        }
    };

    return (
        <div className="flex justify-center py-8">
            <div className="w-full max-w-md">
                <div className="text-center mb-4">
                    <Link href="/" className="inline-block">
                        <Image
                            src="/logo-dark.svg"
                            alt="logo"
                            width={200}
                            height={40}
                        />
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md p-6">
                    <h1 className="text-2xl font-medium mb-4">
                        Create account
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium mb-1"
                            >
                                Your name
                            </label>
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="First and last name"
                                className="amazon-input"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium mb-1"
                            >
                                Mobile phone number or email
                            </label>
                            <Input
                                id="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="amazon-input"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium mb-1"
                            >
                                Password
                            </label>
                            <div className="relative flex items-center justify-between w-full">
                                <Input
                                    id="password"
                                    type={isPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="At least 6 characters"
                                    className="amazon-input"
                                />
                                <span
                                    className="absolute right-2 text-gray-400"
                                    onClick={() => setIsPassword(!isPassword)}
                                >
                                    {isPassword ? <Eye /> : <EyeOff />}
                                </span>
                            </div>
                            <p className="text-xs mt-1">
                                <span className="text-gray-500">i</span>{" "}
                                Passwords must be at least 6 characters.
                            </p>
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="confirm-password"
                                className="block text-sm font-medium mb-1"
                            >
                                Re-enter password
                            </label>
                            <div className="flex items-center justify-between w-full relative">
                                <Input
                                    id="confirm-password"
                                    type={isConfirm ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className="amazon-input"
                                />
                                <span
                                    className="absolute right-2 text-gray-400"
                                    onClick={() => setIsConfirm(!isConfirm)}
                                >
                                    {isConfirm ? <Eye /> : <EyeOff />}
                                </span>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="amazon-button-primary w-full"
                        >
                            Create your Amazon account
                        </Button>
                    </form>

                    <div className="mt-4 text-sm">
                        By creating an account, you agree to Amazon&apos;s{" "}
                        <Link href="/conditions-of-use" className="amazon-link">
                            Conditions of Use
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy-notice" className="amazon-link">
                            Privacy Notice
                        </Link>
                        .
                    </div>

                    <Separator className="my-4" />

                    <div className="text-sm">
                        Already have an account?{" "}
                        <Link href="/signin" className="amazon-link">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
