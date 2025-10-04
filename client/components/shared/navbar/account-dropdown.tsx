"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "../auth-context";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AccountDropdown = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.refresh();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex flex-col items-start text-white hover:bg-transparent hover:text-white"
                >
                    <span className="text-xs font-normal">
                        Hello, {user ? `${user.name}` : `sign in`}
                    </span>
                    <span className="flex items-center text-sm font-bold">
                        Account & Lists
                        <ChevronDown className="h-3 w-3 ml-1" />
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <div className="p-4 flex flex-col items-center">
                    {!user ? (
                        <>
                            <Link href="/signin" className="w-full">
                                <Button className="amazon-button-primary w-full mb-3">
                                    Sign in
                                </Button>
                            </Link>
                            <div className="text-sm">
                                New customer?{" "}
                                <Link href="/register" className="amazon-link">
                                    Start here
                                </Link>
                            </div>
                        </>
                    ) : (
                        <Button
                            className="amazon-button-primary w-full mb-3"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    )}
                </div>
                <DropdownMenuSeparator />
                <div className="grid grid-cols-2 gap-4 p-4">
                    <div>
                        <h3 className="font-bold mb-2">Your Lists</h3>
                        <ul className="space-y-1 text-sm">
                            <li>
                                <Link href="/wishlist" className="amazon-link">
                                    Wish List
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/lists/shopping-list"
                                    className="amazon-link"
                                >
                                    Shopping List
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/lists/create"
                                    className="amazon-link"
                                >
                                    Create a List
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/lists/find"
                                    className="amazon-link"
                                >
                                    Find a List or Registry
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Your Account</h3>
                        <ul className="space-y-1 text-sm">
                            <li>
                                <Link href="/account" className="amazon-link">
                                    Account
                                </Link>
                            </li>
                            <li>
                                <Link href="/orders" className="amazon-link">
                                    Orders
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/account/recommendations"
                                    className="amazon-link"
                                >
                                    Recommendations
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/account/browsing-history"
                                    className="amazon-link"
                                >
                                    Browsing History
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/account/watchlist"
                                    className="amazon-link"
                                >
                                    Watchlist
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/account/video-purchases"
                                    className="amazon-link"
                                >
                                    Video Purchases
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/account/kindle"
                                    className="amazon-link"
                                >
                                    Kindle Unlimited
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/account/content-devices"
                                    className="amazon-link"
                                >
                                    Content & Devices
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/account/subscribe-save"
                                    className="amazon-link"
                                >
                                    Subscribe & Save
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/account/memberships"
                                    className="amazon-link"
                                >
                                    Memberships
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/account/music-library"
                                    className="amazon-link"
                                >
                                    Music Library
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AccountDropdown;
