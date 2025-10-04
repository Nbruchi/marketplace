import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

type Category = {
  id: string
  name: string
  image: string
  slug: string
}

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/products/category/${category.slug}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="aspect-square relative">
          <Image
            src={category.image || "/placeholder.svg?height=200&width=200"}
            alt={category.name}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4 text-center">
          <h3 className="font-medium">{category.name}</h3>
        </CardContent>
      </Card>
    </Link>
  )
}
