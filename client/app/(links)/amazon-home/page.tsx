import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Amazon Home | Amazon",
  description: "Shop furniture, home decor, storage, appliances, and more for every room in your home.",
}

export default function AmazonHomePage() {
  // Mock data for home categories
  const categories = [
    { name: "Furniture", href: "/amazon-home/furniture", image: "🪑" },
    { name: "Kitchen & Dining", href: "/amazon-home/kitchen", image: "🍽️" },
    { name: "Bedding", href: "/amazon-home/bedding", image: "🛏️" },
    { name: "Bath", href: "/amazon-home/bath", image: "🛁" },
    { name: "Home Decor", href: "/amazon-home/decor", image: "🏺" },
    { name: "Storage & Organization", href: "/amazon-home/storage", image: "📦" },
    { name: "Appliances", href: "/amazon-home/appliances", image: "🧰" },
    { name: "Lighting", href: "/amazon-home/lighting", image: "💡" },
  ]

  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Modern Accent Chair",
      price: 249.99,
      rating: 4.7,
      reviewCount: 1243,
      category: "Furniture",
      image: "🪑",
    },
    {
      id: 2,
      name: "Premium Cotton Bed Sheets Set",
      price: 79.99,
      rating: 4.8,
      reviewCount: 3576,
      category: "Bedding",
      image: "🛏️",
    },
    {
      id: 3,
      name: "Stainless Steel Cookware Set",
      price: 129.99,
      rating: 4.6,
      reviewCount: 2187,
      category: "Kitchen",
      image: "🍳",
    },
    {
      id: 4,
      name: "Smart LED Floor Lamp",
      price: 89.99,
      rating: 4.5,
      reviewCount: 876,
      category: "Lighting",
      image: "💡",
    },
  ]

  // Mock data for room ideas
  const roomIdeas = [
    { name: "Living Room", href: "/amazon-home/ideas/living-room", image: "🛋️" },
    { name: "Bedroom", href: "/amazon-home/ideas/bedroom", image: "🛏️" },
    { name: "Kitchen", href: "/amazon-home/ideas/kitchen", image: "🍽️" },
    { name: "Home Office", href: "/amazon-home/ideas/home-office", image: "💻" },
    { name: "Bathroom", href: "/amazon-home/ideas/bathroom", image: "🚿" },
    { name: "Dining Room", href: "/amazon-home/ideas/dining-room", image: "🍽️" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Amazon Home</h1>
      
      <div className="bg-gradient-to-r from-teal-100 to-blue-50 dark:from-teal-900 dark:to-blue-900 p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-xl font-bold mb-3">Make yourself at home</h2>
            <p className="mb-4">
              Shop furniture, home decor, storage solutions, appliances, and more for every room in your home.
            </p>
            <button className="amazon-button-primary">Shop All Home</button>
          </div>
          <div className="md:w-1/3">
            <div className="aspect-video bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center p-4">
              <div className="flex items-center">
                <span className="text-5xl">🏠</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Link href={category.href} key={index} className="group">
              <div className="border rounded-lg p-4 h-full flex flex-col items-center text-center transition-all hover:shadow-md hover:border-teal-300 dark:hover:border-teal-700">
                <div className="text-4xl mb-3">{category.image}</div>
                <h3 className="font-medium group-hover:text-teal-600 dark:group-hover:text-teal-400">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 flex flex-col">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-4 flex items-center justify-center">
                <span className="text-6xl">{product.image}</span>
              </div>
              <div className="text-sm text-teal-600 dark:text-teal-400 mb-1">{product.category}</div>
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
      </div>
      
      <div className="mb-8">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Room Ideas & Inspiration</h2>
          <p className="mb-4">Discover ideas to transform every room in your home.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {roomIdeas.map((room, index) => (
              <Link href={room.href} key={index} className="group">
                <div className="border bg-white dark:bg-gray-700 rounded-lg p-4 h-full flex flex-col items-center text-center transition-all hover:shadow-md">
                  <div className="text-4xl mb-2">{room.image}</div>
                  <h3 className="font-medium text-sm group-hover:text-teal-600 dark:group-hover:text-teal-400">{room.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-yellow-50 dark:bg-yellow-900 p-6">
            <h2 className="text-xl font-bold mb-2">Home Deals</h2>
            <p className="mb-4">Save on furniture, decor, and more for your home.</p>
            <Link href="/deals/home">
              <button className="amazon-button-primary">Shop Deals</button>
            </Link>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 dark:bg-blue-900 p-6">
            <h2 className="text-xl font-bold mb-2">Amazon Basics Home</h2>
            <p className="mb-4">Quality home essentials at great prices.</p>
            <Link href="/amazon-basics/home">
              <button className="amazon-button-primary">Shop Amazon Basics</button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Popular in Home</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/amazon-home/furniture/sofas" className="group">
            <div className="border rounded-lg p-4 text-center transition-all hover:shadow-md">
              <h3 className="font-medium group-hover:text-teal-600 dark:group-hover:text-teal-400">Sofas & Couches</h3>
            </div>
          </Link>
          <Link href="/amazon-home/bedding/comforters" className="group">
            <div className="border rounded-lg p-4 text-center transition-all hover:shadow-md">
              <h3 className="font-medium group-hover:text-teal-600 dark:group-hover:text-teal-400">Comforter Sets</h3>
            </div>
          </Link>
          <Link href="/amazon-home/kitchen/cookware" className="group">
            <div className="border rounded-lg p-4 text-center transition-all hover:shadow-md">
              <h3 className="font-medium group-hover:text-teal-600 dark:group-hover:text-teal-400">Cookware</h3>
            </div>
          </Link>
          <Link href="/amazon-home/decor/curtains" className="group">
            <div className="border rounded-lg p-4 text-center transition-all hover:shadow-md">
              <h3 className="font-medium group-hover:text-teal-600 dark:group-hover:text-teal-400">Curtains</h3>
            </div>
          </Link>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Home Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 flex flex-col items-center text-center">
            <div className="text-4xl mb-3">🧹</div>
            <h3 className="font-bold mb-2">Cleaning Services</h3>
            <p className="mb-4">Professional home cleaning services.</p>
            <Link href="/services/home-cleaning">
              <button className="amazon-button-secondary">Book Now</button>
            </Link>
          </div>
          
          <div className="border rounded-lg p-6 flex flex-col items-center text-center">
            <div className="text-4xl mb-3">🔧</div>
            <h3 className="font-bold mb-2">Furniture Assembly</h3>
            <p className="mb-4">Expert assembly for your new furniture.</p>
            <Link href="/services/furniture-assembly">
              <button className="amazon-button-secondary">Book Now</button>
            </Link>
          </div>
          
          <div className="border rounded-lg p-6 flex flex-col items-center text-center">
            <div className="text-4xl mb-3">🔨</div>
            <h3 className="font-bold mb-2">Home Improvement</h3>
            <p className="mb-4">Handyman services for your home projects.</p>
            <Link href="/services/home-improvement">
              <button className="amazon-button-secondary">Book Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}