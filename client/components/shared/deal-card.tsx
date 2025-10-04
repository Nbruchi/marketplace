"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CountdownTimer } from "@/components/shared/countdown-timer";

type Deal = {
    id: string;
    name: string;
    regularPrice: number;
    salePrice: number;
    discount: number;
    image: string;
    timeRemaining: number;
    slug: string;
    percentClaimed?: number;
};

interface DealCardProps {
    deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
    const percentClaimed =
        deal.percentClaimed || Math.floor(Math.random() * 80) + 10;

    return (
        <Link href={`/deals/${deal.slug}`}>
            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                    <div className="absolute top-2 left-2 z-10">
                        <span className="amazon-badge amazon-badge-deal">
                            {deal.discount}% off
                        </span>
                    </div>
                    <div className="aspect-square relative p-4">
                        <Image
                            src={
                                deal.image ||
                                "/placeholder.svg?height=200&width=200"
                            }
                            alt={deal.name}
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
                <CardContent className="p-4">
                    <div className="mb-2">
                        <span className="amazon-price">
                            <span className="amazon-price-symbol">$</span>
                            {Math.floor(deal.salePrice)}
                            <span className="amazon-price-fraction">
                                {(deal.salePrice % 1).toFixed(2).substring(1)}
                            </span>
                        </span>
                        <span className="amazon-price-was text-xs ml-2">
                            ${deal.regularPrice.toFixed(2)}
                        </span>
                    </div>
                    <h3 className="text-sm line-clamp-2 mb-2">{deal.name}</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span>{percentClaimed}% claimed</span>
                            <CountdownTimer
                                targetDate={
                                    new Date(Date.now() + deal.timeRemaining)
                                }
                                compact
                            />
                        </div>
                        <Progress value={percentClaimed} className="h-1.5" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
