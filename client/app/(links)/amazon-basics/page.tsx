import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Amazon Basics | Amazon",
  description: "Shop Amazon Basics for everyday essentials at great prices.",
}

export default function AmazonBasicsPage() {
  // Mock data for Amazon Basics categories
  const categories = [
    { name: "Home & Kitchen", image: "🏠", href: "/amazon-basics/home-kitchen" },
    { name: "Electronics", image: "🔌", href: "/amazon-basics/electronics" },
    { name: "Office Products", image: "📎", href: "/amazon-basics/office" },
    { name: "Pet Supplies", image: "🐾", href: "/amazon-basics/pet-supplies" },
    { name: "Bedding", image: "🛏️", href: "/amazon-basics/bedding" },
    { name: "Furniture", image: "🪑", href: "/amazon-basics/furniture" },
    { name: "Batteries", image: "🔋", href: "/amazon-basics/batteries" },
    { name: "Cables & Chargers", image: "🔌", href: "/amazon-basics/cables" },
  ]

  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Amazon Basics Non-Stick Cookware Set, 8-Piece",
      price: 39.99,
      rating: 4.5,
      reviewCount: 12543,
      image: "🍳",
    },
    {
      id: 2,
      name: "Amazon Basics High-Speed HDMI Cable - 6 Feet",
      price: 7.99,
      rating: 4.7,
      reviewCount: 28765,
      image: "📺",
    },
    {
      id: 3,
      name: "Amazon Basics 8-Sheet Capacity Paper Shredder",
      price: 35.99,
      rating: 4.3,
      reviewCount: 5432,
      image: "📄",
    },
    {
      id: 4,
      name: "Amazon Basics Microfiber Sheet Set - Queen",
      price: 19.99,
      rating: 4.6,
      reviewCount: 18976,
      image: "🛏️",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Amazon Basics</h1>
      
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-xl font-bold mb-3">Quality products at great prices</h2>
            <p className="mb-4">
              Amazon Basics offers everyday items for your home, office, garden, and more. All Amazon Basics products are 
              designed with quality and value in mind, giving you what you need without unnecessary features or packaging.
            </p>
            <button className="amazon-button-primary">Shop All Amazon Basics</button>
          </div>
          <div className="md:w-1/3">
            <div className="aspect-video bg-white dark:bg-gray-600 rounded-lg flex items-center justify-center p-4">
              <span className="text-4xl">📦</span>
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {categories.map((category, index) => (
          <Link href={category.href} key={index} className="group">
            <div className="border rounded-lg p-4 h-full flex flex-col items-center text-center transition-all hover:shadow-md">
              <div className="text-4xl mb-3">{category.image}</div>
              <h3 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
      
      <h2 className="text-xl font-bold mb-4">Featured Products</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {featuredProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 flex flex-col">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-4 flex items-center justify-center">
              <span className="text-5xl">{product.image}</span>
            </div>
            <h3 className="font-medium mb-2 flex-grow">{product.name}</h3>
            <div className="flex items-center mb-1">
              <div className="text-yellow-500">{'★'.repeat(Math.floor(product.rating))}</div>
              <div className="text-gray-300 dark:text-gray-600">{
                '★'.repeat(5 - Math.floor(product.rating))
              }</div>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">({product.reviewCount.toLocaleString()})</span>
            </div>
            <div className="font-bold text-lg mb-3">${product.price.toFixed(2)}</div>
            <button className="amazon-button-secondary w-full">Add to Cart</button>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Why Amazon Basics?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-4">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="font-bold mb-2">Great Value</h3>
            <p>Quality products at prices you'll love</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="font-bold mb-2">Highly Rated</h3>
            <p>Trusted by millions of customers</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="text-4xl mb-3">🚚</div>
            <h3 className="font-bold mb-2">Fast Delivery</h3>
            <p>Prime eligible with fast, free shipping</p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-3">Join Prime for the best of Amazon Basics</h2>
        <p className="mb-4">
          Amazon Prime members enjoy fast, free delivery on millions of items, including Amazon Basics products.
        </p>
        <Link href="/prime">
          <button className="amazon-button-primary">Try Prime Free</button>
        </Link>
      </div>
    </div>
  )
}