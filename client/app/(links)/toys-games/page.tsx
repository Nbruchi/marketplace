import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Toys & Games | Amazon",
  description: "Shop for toys and games for kids of all ages at Amazon. Find action figures, dolls, board games, outdoor toys, and more.",
}

export default function ToysGamesPage() {
  // Mock data for toy categories
  const categories = [
    { name: "Action Figures", href: "/toys-games/action-figures", image: "🦸" },
    { name: "Dolls & Accessories", href: "/toys-games/dolls", image: "👧" },
    { name: "Building Toys", href: "/toys-games/building-toys", image: "🧱" },
    { name: "Games & Puzzles", href: "/toys-games/games-puzzles", image: "🧩" },
    { name: "Arts & Crafts", href: "/toys-games/arts-crafts", image: "🎨" },
    { name: "Stuffed Animals", href: "/toys-games/stuffed-animals", image: "🧸" },
    { name: "Outdoor Play", href: "/toys-games/outdoor", image: "🏐" },
    { name: "Educational Toys", href: "/toys-games/educational", image: "🔍" },
  ]

  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Deluxe Building Block Set",
      price: 29.99,
      rating: 4.7,
      reviewCount: 1243,
      ageRange: "6-12 years",
      category: "Building Toys",
      image: "🧱",
    },
    {
      id: 2,
      name: "Adventure Hero Action Figure",
      price: 19.99,
      rating: 4.5,
      reviewCount: 876,
      ageRange: "4+ years",
      category: "Action Figures",
      image: "🦸",
    },
    {
      id: 3,
      name: "Family Board Game Collection",
      price: 34.99,
      rating: 4.8,
      reviewCount: 2567,
      ageRange: "8+ years",
      category: "Games & Puzzles",
      image: "🎲",
    },
    {
      id: 4,
      name: "Plush Teddy Bear",
      price: 14.99,
      rating: 4.9,
      reviewCount: 3103,
      ageRange: "All ages",
      category: "Stuffed Animals",
      image: "🧸",
    },
  ]

  // Mock data for age groups
  const ageGroups = [
    { name: "0-2 Years", href: "/toys-games/age/0-2" },
    { name: "3-5 Years", href: "/toys-games/age/3-5" },
    { name: "6-8 Years", href: "/toys-games/age/6-8" },
    { name: "9-11 Years", href: "/toys-games/age/9-11" },
    { name: "12+ Years", href: "/toys-games/age/12-plus" },
  ]

  // Mock data for popular brands
  const brands = [
    "LEGO",
    "Hasbro",
    "Mattel",
    "Fisher-Price",
    "Melissa & Doug",
    "Playmobil",
    "Nintendo",
    "Barbie",
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Toys & Games</h1>
      
      <div className="bg-gradient-to-r from-yellow-100 to-orange-50 dark:from-yellow-900 dark:to-orange-900 p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-xl font-bold mb-3">Discover the perfect toys</h2>
            <p className="mb-4">
              Shop our huge selection of toys and games for children of all ages. From educational toys to outdoor fun.
            </p>
            <button className="amazon-button-primary">Shop All Toys & Games</button>
          </div>
          <div className="md:w-1/3">
            <div className="aspect-video bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center p-4">
              <div className="flex items-center gap-2">
                <span className="text-5xl">🧸</span>
                <span className="text-5xl">🎮</span>
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
              <div className="border rounded-lg p-4 h-full flex flex-col items-center text-center transition-all hover:shadow-md hover:border-yellow-300 dark:hover:border-yellow-700">
                <div className="text-4xl mb-3">{category.image}</div>
                <h3 className="font-medium group-hover:text-yellow-600 dark:group-hover:text-yellow-400">{category.name}</h3>
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
              <div className="text-sm text-yellow-600 dark:text-yellow-400 mb-1">{product.category}</div>
              <h3 className="font-medium mb-2 flex-grow">{product.name}</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Age: {product.ageRange}</div>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 dark:bg-blue-900 p-6">
            <h2 className="text-xl font-bold mb-2">New Arrivals</h2>
            <p className="mb-4">Check out the latest toys and games that just arrived.</p>
            <Link href="/toys-games/new-arrivals">
              <button className="amazon-button-primary">Shop New Arrivals</button>
            </Link>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 dark:bg-green-900 p-6">
            <h2 className="text-xl font-bold mb-2">Deals on Toys</h2>
            <p className="mb-4">Save on top toys and games for kids of all ages.</p>
            <Link href="/deals/toys-games">
              <button className="amazon-button-primary">Shop Deals</button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Shop by Age</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {ageGroups.map((age, index) => (
            <Link href={age.href} key={index} className="group">
              <div className="border rounded-lg p-4 text-center transition-all hover:shadow-md hover:border-yellow-300 dark:hover:border-yellow-700">
                <h3 className="font-medium group-hover:text-yellow-600 dark:group-hover:text-yellow-400">{age.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Popular Brands</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {brands.map((brand, index) => (
              <Link href={`/toys-games/brands/${brand.toLowerCase().replace(/[&\s-]+/g, '-')}`} key={index} className="group">
                <div className="border bg-white dark:bg-gray-700 rounded-lg p-4 text-center transition-all hover:shadow-md">
                  <h3 className="font-medium group-hover:text-yellow-600 dark:group-hover:text-yellow-400">{brand}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3">Educational Toys</h2>
          <p className="mb-4">Make learning fun with toys that teach important skills.</p>
          <ul className="space-y-2">
            <li><Link href="/toys-games/educational/stem" className="text-blue-600 dark:text-blue-400 hover:underline">STEM Toys</Link></li>
            <li><Link href="/toys-games/educational/reading" className="text-blue-600 dark:text-blue-400 hover:underline">Reading & Writing</Link></li>
            <li><Link href="/toys-games/educational/math" className="text-blue-600 dark:text-blue-400 hover:underline">Math & Counting</Link></li>
            <li><Link href="/toys-games/educational" className="font-medium hover:underline">See all Educational Toys</Link></li>
          </ul>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3">Outdoor Play</h2>
          <p className="mb-4">Get kids active with outdoor toys and games.</p>
          <ul className="space-y-2">
            <li><Link href="/toys-games/outdoor/sports" className="text-blue-600 dark:text-blue-400 hover:underline">Sports Equipment</Link></li>
            <li><Link href="/toys-games/outdoor/playsets" className="text-blue-600 dark:text-blue-400 hover:underline">Playsets & Swing Sets</Link></li>
            <li><Link href="/toys-games/outdoor/pools" className="text-blue-600 dark:text-blue-400 hover:underline">Pools & Water Toys</Link></li>
            <li><Link href="/toys-games/outdoor" className="font-medium hover:underline">See all Outdoor Toys</Link></li>
          </ul>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3">Games & Puzzles</h2>
          <p className="mb-4">Family fun with board games, card games, and puzzles.</p>
          <ul className="space-y-2">
            <li><Link href="/toys-games/games-puzzles/board-games" className="text-blue-600 dark:text-blue-400 hover:underline">Board Games</Link></li>
            <li><Link href="/toys-games/games-puzzles/card-games" className="text-blue-600 dark:text-blue-400 hover:underline">Card Games</Link></li>
            <li><Link href="/toys-games/games-puzzles/puzzles" className="text-blue-600 dark:text-blue-400 hover:underline">Puzzles</Link></li>
            <li><Link href="/toys-games/games-puzzles" className="font-medium hover:underline">See all Games & Puzzles</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Gift Ideas</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/toys-games/gifts/birthday" className="border rounded-lg p-4 text-center hover:shadow-md transition-all">
            <h3 className="font-medium">Birthday Gifts</h3>
          </Link>
          <Link href="/toys-games/gifts/holiday" className="border rounded-lg p-4 text-center hover:shadow-md transition-all">
            <h3 className="font-medium">Holiday Gifts</h3>
          </Link>
          <Link href="/toys-games/gifts/under-25" className="border rounded-lg p-4 text-center hover:shadow-md transition-all">
            <h3 className="font-medium">Gifts Under $25</h3>
          </Link>
          <Link href="/toys-games/gifts/top-100" className="border rounded-lg p-4 text-center hover:shadow-md transition-all">
            <h3 className="font-medium">Top 100 Toys</h3>
          </Link>
        </div>
      </div>
    </div>
  )
}