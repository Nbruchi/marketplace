"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { categories } from "@/constants";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const NavSearch = () => {
    const [searchCategory, setSearchCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(
                `/search?category=${searchCategory.toLowerCase()}&query=${encodeURIComponent(
                    searchQuery.trim()
                )}`
            );
        }
    };

    return (
        <div className="flex-1 max-w-6xl">
            <form onSubmit={handleSearch} className="flex">
                <div className="relative flex-1 flex">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="flex items-center justify-between min-w-[100px] px-2 py-2 bg-gray-100 dark:bg-gray-700 border-r border-gray-300 dark:border-gray-600 rounded-l-md text-sm text-black"
                            >
                                <span className="truncate">
                                    {searchCategory}
                                </span>
                                <ChevronDown className="h-4 w-4 ml-1" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 max-h-80 overflow-y-auto">
                            {categories.map((category) => (
                                <DropdownMenuItem
                                    key={category.value}
                                    onClick={() =>
                                        setSearchCategory(category.name)
                                    }
                                    className="text-sm"
                                >
                                    {category.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Input
                        type="text"
                        placeholder="Search Amazon"
                        className="flex-1 rounded-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button
                    type="submit"
                    className="rounded-l-none rounded-r-md bg-[#FEBD69] hover:bg-[#F3A847] text-black"
                >
                    <Search className="h-5 w-5" />
                </Button>
            </form>
        </div>
    );
};

export default NavSearch;
