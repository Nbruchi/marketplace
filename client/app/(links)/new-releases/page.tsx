import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "New Releases | Amazon",
  description: "Discover the newest products on Amazon across all categories.",
}

export default function NewReleasesPage() {
  // Mock data for new release categories
  const categories = [
    { name: "Books", href: "/new-releases/books" },
    { name: "Electronics", href: "/new-releases/electronics" },
    { name: "Home & Kitchen", href: "/new-releases/home-kitchen" },
    { name: "Fashion", href: "/new-releases/fashion" },
    { name: "Toys & Games", href: "/new-releases/toys-games" },
    { name: "Beauty", href: "/new-releases/beauty" },
    { name: "Video Games", href: "/new-releases/video-games" },
    { name: "Movies & TV", href: "/new-releases/movies-tv" },
    { name: "Music", href: "/new-releases/music" },
    { name: "Computers", href: "/new-releases/computers" },
    { name: "Sports & Outdoors", href: "/new-releases/sports" },
    { name: "Pet Supplies", href: "/new-releases/pet-supplies" },
  ]

  // Mock data for featured new releases
  const featuredNewReleases = [
    {
      id: 1,
      name: "The Latest Bestseller",
      category: "Books",
      price: 24.99,
      rating: 4.8,
      reviewCount: 342,
      releaseDate: "June 10, 2025",
      image: "📚",
    },
    {
      id: 2,
      name: "Next-Gen Wireless Earbuds",
      category: "Electronics",
      price: 129.99,
      rating: 4.6,
      reviewCount: 187,
      releaseDate: "June 5, 2025",
      image: "🎧",
    },
    {
      id: 3,
      name: "Smart Home Security System",
      category: "Electronics",
      price: 199.99,
      rating: 4.7,
      reviewCount: 156,
      releaseDate: "June 8, 2025",
      image: "🔒",
    },
    {
      id: 4,
      name: "Ergonomic Office Chair",
      category: "Home & Kitchen",
      price: 249.99,
      rating: 4.5,
      reviewCount: 98,
      releaseDate: "June 1, 2025",
      image: "🪑",
    },
    {
      id: 5,
      name: "Bestselling Video Game",
      category: "Video Games",
      price: 59.99,
      rating: 4.9,
      reviewCount: 421,
      releaseDate: "June 12, 2025",
      image: "🎮",
    },
    {
      id: 6,
      name: "Premium Skincare Set",
      category: "Beauty",
      price: 89.99,
      rating: 4.4,
      reviewCount: 76,
      releaseDate: "June 7, 2025",
      image: "✨",
    },
    {
      id: 7,
      name: "Fitness Tracker Watch",
      category: "Electronics",
      price: 149.99,
      rating: 4.7,
      reviewCount: 203,
      releaseDate: "June 3, 2025",
      image: "⌚",
    },
    {
      id: 8,
      name: "Portable Bluetooth Speaker",
      category: "Electronics",
      price: 79.99,
      rating: 4.6,
      reviewCount: 167,
      releaseDate: "June 9, 2025",
      image: "🔊",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">New Releases</h1>
      
      <div className="bg-gradient-to-r from-blue-100 to-purple-50 dark:from-blue-900 dark:to-purple-900 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-3">Hot New Releases</h2>
        <p className="mb-4">
          Discover the newest and most exciting products on Amazon, updated hourly.
        </p>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Shop New Releases by Department</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link href={category.href} key={index} className="group">
              <div className="border rounded-lg p-4 text-center transition-all hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700">
                <h3 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Featured New Releases</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredNewReleases.slice(0, 4).map((product) => (
            <div key={product.id} className="border rounded-lg p-4 flex flex-col">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-4 flex items-center justify-center">
                <span className="text-5xl">{product.image}</span>
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">New Release in {product.category}</div>
              <h3 className="font-medium mb-1 flex-grow">{product.name}</h3>
              <div className="flex items-center mb-1">
                <div className="text-yellow-500">{'★'.repeat(Math.floor(product.rating))}</div>
                <div className="text-gray-300 dark:text-gray-600">{
                  '★'.repeat(5 - Math.floor(product.rating))
                }</div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">({product.reviewCount})</span>
              </div>
              <div className="font-bold text-lg mb-1">${product.price.toFixed(2)}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">Released: {product.releaseDate}</div>
              <button className="amazon-button-secondary w-full">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">More New Releases</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredNewReleases.slice(4).map((product) => (
            <div key={product.id} className="border rounded-lg p-4 flex flex-col">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-4 flex items-center justify-center">
                <span className="text-5xl">{product.image}</span>
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">New Release in {product.category}</div>
              <h3 className="font-medium mb-1 flex-grow">{product.name}</h3>
              <div className="flex items-center mb-1">
                <div className="text-yellow-500">{'★'.repeat(Math.floor(product.rating))}</div>
                <div className="text-gray-300 dark:text-gray-600">{
                  '★'.repeat(5 - Math.floor(product.rating))
                }</div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">({product.reviewCount})</span>
              </div>
              <div className="font-bold text-lg mb-1">${product.price.toFixed(2)}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">Released: {product.releaseDate}</div>
              <button className="amazon-button-secondary w-full">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-yellow-50 dark:bg-yellow-900 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-3">Coming Soon</h2>
        <p className="mb-4">
          Get notified when new products are released. Set up alerts for upcoming releases in your favorite categories.
        </p>
        <button className="amazon-button-primary">Set Up Alerts</button>
      </div>
    </div>
  )
}