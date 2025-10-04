import { categories } from "@/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

const MobileMenu = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-white"
                >
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
                <div className="amazon-navbar p-4 flex items-center">
                    <User className="h-8 w-8 mr-3" />
                    <h2 className="text-xl font-bold">Hello, Sign in</h2>
                </div>
                <div className="p-4 overflow-y-auto">
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-bold mb-2">
                                Shop By Department
                            </h3>
                            <ul className="space-y-2">
                                {categories.slice(0, 10).map((category) => (
                                    <li key={category.value}>
                                        <Link
                                            href={`/products/category/${category.value}`}
                                            className="block py-1 hover:text-[#F08804]"
                                        >
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link
                                        href="/categories"
                                        className="amazon-link"
                                    >
                                        See All Categories
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="border-t pt-4">
                            <h3 className="text-lg font-bold mb-2">
                                Help & Settings
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/account"
                                        className="block py-1 hover:text-[#F08804]"
                                    >
                                        Your Account
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/customer-service"
                                        className="block py-1 hover:text-[#F08804]"
                                    >
                                        Customer Service
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/signin"
                                        className="block py-1 hover:text-[#F08804]"
                                    >
                                        Sign In
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;
