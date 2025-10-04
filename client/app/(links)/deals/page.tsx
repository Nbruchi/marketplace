import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DealCard } from "@/components/shared/deal-card";
import { mockDeals } from "@/lib/mock-data";

export default function DealsPage() {
    // Featured deals
    const featuredDeals = mockDeals.slice(0, 3);

    // Deal categories
    const dealCategories = [
        {
            name: "Electronics",
            slug: "electronics",
            image: "/placeholder.svg?height=100&width=100",
        },
        {
            name: "Home & Kitchen",
            slug: "home",
            image: "/placeholder.svg?height=100&width=100",
        },
        {
            name: "Fashion",
            slug: "clothing",
            image: "/placeholder.svg?height=100&width=100",
        },
        {
            name: "Beauty",
            slug: "beauty",
            image: "/placeholder.svg?height=100&width=100",
        },
        {
            name: "Toys & Games",
            slug: "toys",
            image: "/placeholder.svg?height=100&width=100",
        },
        {
            name: "Sports & Outdoors",
            slug: "sports",
            image: "/placeholder.svg?height=100&width=100",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-medium mb-6">Today's Deals</h1>

            {/* Hero banner */}
            <div className="relative h-[300px] rounded-lg overflow-hidden mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-indigo-900" />
                <Image
                    src="/placeholder.svg?height=300&width=1200"
                    alt="Deals"
                    fill
                    className="object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4">
                        <div className="max-w-lg text-white">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Deals up to 70% off
                            </h2>
                            <p className="text-lg mb-6">
                                Shop our best deals of the day, updated daily.
                            </p>
                            <Button className="bg-[#FFD814] hover:bg-[#F7CA00] text-black">
                                Shop All Deals
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Deal categories */}
            <h2 className="text-xl font-medium mb-4">Shop Deals by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                {dealCategories.map((category, index) => (
                    <Link key={index} href={`/deals/category/${category.slug}`}>
                        <Card className="h-full hover:shadow-md transition-shadow">
                            <CardContent className="p-4 flex flex-col items-center text-center">
                                <div className="w-16 h-16 relative mb-2">
                                    <Image
                                        src={
                                            category.image || "/placeholder.svg"
                                        }
                                        alt={category.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="font-medium text-sm">
                                    {category.name}
                                </h3>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Featured deals */}
            <h2 className="text-xl font-medium mb-4">Featured Deals</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {featuredDeals.map((deal) => (
                    <Card
                        key={deal.id}
                        className="overflow-hidden hover:shadow-md transition-shadow"
                    >
                        <div className="relative">
                            <div className="absolute top-2 left-2 z-10">
                                <span className="amazon-badge amazon-badge-deal">
                                    {deal.discount}% OFF
                                </span>
                            </div>
                            <div className="aspect-[4/3] relative">
                                <Image
                                    src={
                                        deal.image ||
                                        "/placeholder.svg?height=300&width=400"
                                    }
                                    alt={deal.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-medium mb-2">{deal.name}</h3>
                            <div className="flex items-baseline mb-2">
                                <span className="text-lg font-bold">
                                    ${deal.salePrice.toFixed(2)}
                                </span>
                                <span className="text-sm line-through text-gray-500 ml-2">
                                    ${deal.regularPrice.toFixed(2)}
                                </span>
                            </div>
                            <Link href={`/deals/${deal.slug}`}>
                                <Button className="w-full amazon-button-primary">
                                    See Deal
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* All deals */}
            <h2 className="text-xl font-medium mb-4">All Deals</h2>
            <Tabs defaultValue="all" className="mb-8">
                <TabsList>
                    <TabsTrigger value="all">All Deals</TabsTrigger>
                    <TabsTrigger value="lightning">Lightning Deals</TabsTrigger>
                    <TabsTrigger value="best">Best Deals</TabsTrigger>
                    <TabsTrigger value="prime">Prime Exclusive</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {mockDeals.map((deal) => (
                            <DealCard key={deal.id} deal={deal} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="lightning" className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {mockDeals.slice(0, 4).map((deal) => (
                            <DealCard key={deal.id} deal={deal} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="best" className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {mockDeals.slice(2, 6).map((deal) => (
                            <DealCard key={deal.id} deal={deal} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="prime" className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {mockDeals.slice(1, 5).map((deal) => (
                            <DealCard key={deal.id} deal={deal} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Deal of the day */}
            <Card className="mb-8">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3">
                            <h2 className="text-2xl font-bold mb-4">
                                Deal of the Day
                            </h2>
                            <div className="relative aspect-square">
                                <Image
                                    src="/placeholder.svg?height=400&width=400"
                                    alt="Deal of the Day"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <div className="md:w-2/3">
                            <h3 className="text-xl font-bold mb-2">
                                Smart Home Bundle
                            </h3>
                            <div className="flex items-baseline mb-2">
                                <span className="text-2xl font-bold">
                                    $149.99
                                </span>
                                <span className="text-lg line-through text-gray-500 ml-2">
                                    $299.99
                                </span>
                                <span className="amazon-badge amazon-badge-deal ml-2">
                                    50% OFF
                                </span>
                            </div>

                            <p className="text-gray-600 mb-4">
                                This smart home bundle includes a smart speaker,
                                smart bulbs, and a smart plug. Control your home
                                with your voice or the companion app.
                            </p>

                            <div className="mb-4">
                                <div className="text-sm text-gray-500 mb-1">
                                    Deal ends in:
                                </div>
                                <div className="flex gap-2">
                                    <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded">
                                        <span className="text-xl font-bold">
                                            12
                                        </span>
                                        <span className="text-xs block">
                                            hours
                                        </span>
                                    </div>
                                    <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded">
                                        <span className="text-xl font-bold">
                                            45
                                        </span>
                                        <span className="text-xs block">
                                            mins
                                        </span>
                                    </div>
                                    <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded">
                                        <span className="text-xl font-bold">
                                            30
                                        </span>
                                        <span className="text-xs block">
                                            secs
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button className="amazon-button-add">
                                    Add to Cart
                                </Button>
                                <Button className="amazon-button-buy">
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Upcoming deals */}
            <h2 className="text-xl font-medium mb-4">Upcoming Deals</h2>
            <Card>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex">
                                <div className="w-24 h-24 relative flex-shrink-0">
                                    <Image
                                        src="/placeholder.svg?height=100&width=100"
                                        alt={`Upcoming Deal ${i}`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>

                                <div className="ml-4">
                                    <h3 className="font-medium">
                                        Upcoming Deal {i}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-2">
                                        Starts in {i * 2} hours
                                    </p>
                                    <Button variant="outline" size="sm">
                                        Remind Me
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
