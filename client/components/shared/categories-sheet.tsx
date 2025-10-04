import { ChevronRight, X } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";

interface CategoriesSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const CategoriesSheet = ({ open, onOpenChange }: CategoriesSheetProps) => {
    const categories = [
        {
            title: "Digital Content & Devices",
            subcategories: [
                "Amazon Music",
                "Kindle E-readers & Books",
                "Amazon Appstore",
                "Prime Video",
                "Echo & Alexa",
                "Fire Tablets",
                "Fire TV",
                "Ring",
                "Blink",
            ],
        },
        {
            title: "Shop by Department",
            subcategories: [
                "Electronics",
                "Computers",
                "Smart Home",
                "Arts & Crafts",
                "Automotive",
                "Baby",
                "Beauty and personal care",
                "Women's Fashion",
                "Men's Fashion",
                "Girls' Fashion",
                "Boys' Fashion",
                "Health and Household",
                "Home and Kitchen",
                "Industrial and Scientific",
                "Luggage",
                "Movies & Television",
                "Pet supplies",
                "Software",
                "Sports and Outdoors",
                "Tools & Home Improvement",
                "Toys and Games",
                "Video Games",
            ],
        },
        {
            title: "Programs & Features",
            subcategories: [
                "Gift Cards",
                "Amazon Live",
                "International Shopping",
                "Amazon Second Chance",
                "Amazon Warehouse",
                "Coupons",
                "Fashion",
                "Amazon Fresh",
                "Amazon Pharmacy",
                "Amazon Renewed",
                "Amazon Business",
                "Prime",
                "Amazon Hub",
                "Climate Pledge Friendly",
            ],
        },
        {
            title: "Help & Settings",
            subcategories: ["Your Account", "Customer Service", "Sign in"],
        },
    ];

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="left" className="w-96 p-0 bg-white">
                <SheetHeader className="bg-[#232F3E] text-white p-4">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-white text-lg font-bold">
                            Browse Categories
                        </SheetTitle>
                    </div>
                </SheetHeader>

                <div className="overflow-y-auto h-full">
                    {categories.map((category, index) => (
                        <div key={index} className="border-b border-gray-200">
                            <div className="p-4 bg-gray-50 font-bold text-amazon-dark-blue border-b">
                                {category.title}
                            </div>
                            <div className="py-2">
                                {category.subcategories.map(
                                    (subcat, subIndex) => (
                                        <Link
                                            key={subIndex}
                                            href={`/s?k=${encodeURIComponent(
                                                subcat.toLowerCase()
                                            )}`}
                                            className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 text-amazon-text"
                                            onClick={() => onOpenChange(false)}
                                        >
                                            <span className="text-sm">
                                                {subcat}
                                            </span>
                                            <ChevronRight className="h-4 w-4 text-gray-400" />
                                        </Link>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default CategoriesSheet;
