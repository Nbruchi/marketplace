"use client";

import type React from "react";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useAuth } from "@/components/shared/auth-context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authApi } from "@/lib/api";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState<"email" | "otp" | "password">("email");
    const { login, loading } = useAuth();
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [otpPassword, setOtpPassword] = useState("");
    const [sessionId, setSessionId] = useState(""); // userId for OTP
    const [isPassword, setIsPassword] = useState(false);
    const { setUser } = useAuth();

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.error("Enter your email");
            return;
        }
        try {
            // Call the new requestOtp endpoint
            const res = await authApi.requestOtp(email);
            if (res.otpSent && res.userId) {
                setSessionId(res.userId);
                setStep("otp");
                toast.success("OTP sent to your email");
            } else if (res.requirePassword) {
                setStep("password");
            } else {
                toast.error("Unexpected response from server");
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to send OTP");
        }
    };

    // Handle OTP submit

    const handleOTPSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!otp.trim() || !otpPassword.trim()) {
            toast.error("Enter the OTP and your password");
            return;
        }
        try {
            const res = await authApi.verifyOTP({
                userId: sessionId,
                otp,
                password: otpPassword,
            });
            setUser(res.user);
            localStorage.setItem("user", JSON.stringify(res.user));
            toast.success("Signed in successfully");
            router.push("/");
        } catch (err: any) {
            toast.error(err.message || "OTP verification failed");
        }
    };

    // Handle password submit
    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password.trim()) {
            toast.error("Enter your password");
            return;
        }
        try {
            await login(email, password);
            toast.success("Successfully signed in");
            router.push(`/`);
        } catch (error: any) {
            toast.error(error.message || "Login failed");
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
                    {step === "email" && (
                        <>
                            <h1 className="text-2xl font-medium mb-4">
                                Sign in
                            </h1>
                            <form onSubmit={handleEmailSubmit}>
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium mb-1"
                                    >
                                        Email or mobile phone number
                                    </label>
                                    <Input
                                        id="email"
                                        type="text"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="amazon-input"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="amazon-button-primary w-full"
                                    disabled={loading}
                                >
                                    Continue
                                </Button>
                            </form>

                            <div className="mt-4 text-sm">
                                By continuing, you agree to Amazon&apos;s{" "}
                                <Link
                                    href="/conditions-of-use"
                                    className="amazon-link"
                                >
                                    Conditions of Use
                                </Link>{" "}
                                and{" "}
                                <Link
                                    href="/privacy-notice"
                                    className="amazon-link"
                                >
                                    Privacy Notice
                                </Link>
                                .
                            </div>

                            <div className="mt-6">
                                <details className="text-sm">
                                    <summary className="amazon-link cursor-pointer">
                                        <span className="flex items-center">
                                            <ChevronRight className="h-4 w-4" />
                                            Need help?
                                        </span>
                                    </summary>
                                    <div className="mt-2 pl-6 space-y-2">
                                        <Link
                                            href="/forgot-password"
                                            className="amazon-link block"
                                        >
                                            Forgot Password
                                        </Link>
                                        <Link
                                            href="/other-issues"
                                            className="amazon-link block"
                                        >
                                            Other issues with Sign-In
                                        </Link>
                                    </div>
                                </details>
                            </div>
                        </>
                    )}

                    {step === "otp" && (
                        <>
                            <h1 className="text-2xl font-medium mb-4">
                                Enter OTP
                            </h1>
                            <form onSubmit={handleOTPSubmit}>
                                <div className="mb-4">
                                    <label
                                        htmlFor="otp"
                                        className="block text-sm font-medium mb-1"
                                    >
                                        Enter the OTP sent to your email
                                    </label>
                                    <Input
                                        id="otp"
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="amazon-input"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="otpPassword"
                                        className="block text-sm font-medium mb-1"
                                    >
                                        Password
                                    </label>
                                    <Input
                                        id="otpPassword"
                                        type="password"
                                        value={otpPassword}
                                        onChange={(e) =>
                                            setOtpPassword(e.target.value)
                                        }
                                        className="amazon-input"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="amazon-button-primary w-full"
                                    disabled={loading}
                                >
                                    Verify OTP & Sign In
                                </Button>
                            </form>
                        </>
                    )}

                    {step === "password" && (
                        <>
                            <h1 className="text-2xl font-medium mb-4">
                                Sign in
                            </h1>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <span className="font-bold">{email}</span>
                                    <button
                                        onClick={() => setStep("email")}
                                        className="amazon-link text-sm ml-2"
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handlePasswordSubmit}>
                                <div className="mb-4">
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium mb-1"
                                        >
                                            Password
                                        </label>
                                        <Link
                                            href="/forgot-password"
                                            className="amazon-link text-sm"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <div className="relative flex items-center justify-between w-full">
                                        <Input
                                            id="password"
                                            type={
                                                isPassword ? "text" : "password"
                                            }
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            className="amazon-input"
                                        />
                                        <span
                                            className="text-gray-400 absolute right-2"
                                            onClick={() =>
                                                setIsPassword(!isPassword)
                                            }
                                        >
                                            {isPassword ? <Eye /> : <EyeOff />}
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="amazon-button-primary w-full"
                                    disabled={loading}
                                >
                                    Sign in
                                </Button>
                            </form>

                            <div className="mt-4">
                                <div className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id="keep-signed-in"
                                        className="amazon-checkbox"
                                    />
                                    <label
                                        htmlFor="keep-signed-in"
                                        className="ml-2 text-sm"
                                    >
                                        Keep me signed in.{" "}
                                        <Link
                                            href="/help/keep-signed-in"
                                            className="amazon-link"
                                        >
                                            Details
                                        </Link>
                                    </label>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="mt-4">
                    <div className="relative">
                        <Separator className="my-4" />
                        <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#EAEDED] dark:bg-gray-900 px-2 text-sm text-gray-500">
                            New to Amazon?
                        </span>
                    </div>

                    <Link href="/register">
                        <Button
                            variant="outline"
                            className="w-full border-gray-300 dark:border-gray-700"
                        >
                            Create your Amazon account
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
