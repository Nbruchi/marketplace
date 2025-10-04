import Link from "next/link";
import { accountSections } from "@/constants";
import Image from "next/image";

export default function AccountPage() {
    return (
        <div className="container mx-auto px-32 py-8">
            <h1 className="text-2xl font-bold mb-6">Your Account</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accountSections.map((section) => (
                    <Link
                        key={section.title}
                        href={section.href}
                        className="flex items-start p-4 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors gap-2"
                    >
                        <Image
                            src={section.imageURL}
                            alt={section.title}
                            width={40}
                            height={20}
                        />
                        <div>
                            <h2 className="font-bold text-xl">
                                {section.title}
                            </h2>
                            <p className="text-lg text-gray-600">
                                {section.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
