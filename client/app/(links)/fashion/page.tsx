import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Fashion | Amazon",
  description: "Shop the latest fashion trends for men, women, and kids on Amazon.",
}

export default function FashionPage() {
  // Mock data for fashion categories
  const categories = [
    { name: "Women", href: "/fashion/women", image: "👚" },
    { name: "Men", href: "/fashion/men", image: "👔" },
    { name: "Kids", href: "/fashion/kids", image: "👶" },
    { name: "Shoes", href: "/fashion/shoes", image: "👟" },
    { name: "Jewelry", href: "/fashion/jewelry", image: "💍" },
    { name: "Watches", href: "/fashion/watches", image: "⌚" },
    { name: "Handbags", href: "/fashion/handbags", image: "👜" },
    { name: "Accessories", href: "/fashion/accessories", image: "🧣" },
  ]

  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Summer Floral Dress",
      price: 39.99,
      rating: 4.7,
      reviewCount: 1243,
      category: "Women",
      image: "👗",
    },
    {
      id: 2,
      name: "Men's Casual Button-Down Shirt",
      price: 29.99,
      rating: 4.5,
      reviewCount: 876,
      category: "Men",
      image: "👕",
    },
    {
      id: 3,
      name: "Kids' Dinosaur T-Shirt",
      price: 14.99,
      rating: 4.8,
      reviewCount: 567,
      category: "Kids",
      image: "👕",
    },
    {
      id: 4,
      name: "Running Shoes",
      price: 79.99,
      rating: 4.6,
      reviewCount: 2103,
      category: "Shoes",
      image: "👟",
    },
  ]

  // Mock data for trending styles
  const trendingStyles = [
    { name: "Summer Essentials", href: "/fashion/trends/summer", image: "☀️" },
    { name: "Athleisure", href: "/fashion/trends/athleisure", image: "🏃" },
    { name: "Sustainable Fashion", href: "/fashion/trends/sustainable", image: "🌱" },
    { name: "Vintage Inspired", href: "/fashion/trends/vintage", image: "🕰️" },
  ]

  // Mock data for brands
  const brands = [
    "Amazon Essentials",
    "Levi's",
    "Adidas",
    "Calvin Klein",
    "Tommy Hilfiger",
    "Under Armour",
    "Nike",
    "The North Face",
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Amazon Fashion</h1>
      
      <div className="bg-gradient-to-r from-pink-100 to-purple-50 dark:from-pink-900 dark:to-purple-900 p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-xl font-bold mb-3">Discover your style</h2>
            <p className="mb-4">
              Shop the latest trends in clothing, shoes, and accessories for women, men, and kids.
            </p>
            <button className="amazon-button-primary">Shop All Fashion</button>
          </div>
          <div className="md:w-1/3">
            <div className="aspect-video bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center p-4">
              <div className="flex items-center gap-2">
                <span className="text-5xl">👗</span>
                <span className="text-5xl">👔</span>
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
              <div className="border rounded-lg p-4 h-full flex flex-col items-center text-center transition-all hover:shadow-md hover:border-pink-300 dark:hover:border-pink-700">
                <div className="text-4xl mb-3">{category.image}</div>
                <h3 className="font-medium group-hover:text-pink-600 dark:group-hover:text-pink-400">{category.name}</h3>
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
              <div className="text-sm text-pink-600 dark:text-pink-400 mb-1">{product.category}</div>
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 dark:bg-blue-900 p-6">
            <h2 className="text-xl font-bold mb-2">New Arrivals</h2>
            <p className="mb-4">The latest styles just landed. Shop new arrivals for every season.</p>
            <Link href="/fashion/new-arrivals">
              <button className="amazon-button-primary">Shop New Arrivals</button>
            </Link>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-50 dark:bg-purple-900 p-6">
            <h2 className="text-xl font-bold mb-2">Fashion Deals</h2>
            <p className="mb-4">Save on clothing, shoes, and accessories for the whole family.</p>
            <Link href="/deals/fashion">
              <button className="amazon-button-primary">Shop Deals</button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Trending Styles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {trendingStyles.map((style, index) => (
            <Link href={style.href} key={index} className="group">
              <div className="border rounded-lg p-6 h-full flex flex-col items-center text-center transition-all hover:shadow-md">
                <div className="text-4xl mb-3">{style.image}</div>
                <h3 className="font-medium group-hover:text-pink-600 dark:group-hover:text-pink-400">{style.name}</h3>
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
              <Link href={`/fashion/brands/${brand.toLowerCase().replace(/\s+/g, '-')}`} key={index} className="group">
                <div className="border bg-white dark:bg-gray-700 rounded-lg p-4 text-center transition-all hover:shadow-md">
                  <h3 className="font-medium group-hover:text-pink-600 dark:group-hover:text-pink-400">{brand}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3">Women</h2>
          <ul className="space-y-2">
            <li><Link href="/fashion/women/dresses" className="text-blue-600 dark:text-blue-400 hover:underline">Dresses</Link></li>
            <li><Link href="/fashion/women/tops" className="text-blue-600 dark:text-blue-400 hover:underline">Tops</Link></li>
            <li><Link href="/fashion/women/jeans" className="text-blue-600 dark:text-blue-400 hover:underline">Jeans</Link></li>
            <li><Link href="/fashion/women/activewear" className="text-blue-600 dark:text-blue-400 hover:underline">Activewear</Link></li>
            <li><Link href="/fashion/women" className="font-medium hover:underline">See all</Link></li>
          </ul>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3">Men</h2>
          <ul className="space-y-2">
            <li><Link href="/fashion/men/shirts" className="text-blue-600 dark:text-blue-400 hover:underline">Shirts</Link></li>
            <li><Link href="/fashion/men/pants" className="text-blue-600 dark:text-blue-400 hover:underline">Pants</Link></li>
            <li><Link href="/fashion/men/suits" className="text-blue-600 dark:text-blue-400 hover:underline">Suits</Link></li>
            <li><Link href="/fashion/men/activewear" className="text-blue-600 dark:text-blue-400 hover:underline">Activewear</Link></li>
            <li><Link href="/fashion/men" className="font-medium hover:underline">See all</Link></li>
          </ul>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3">Kids</h2>
          <ul className="space-y-2">
            <li><Link href="/fashion/kids/girls" className="text-blue-600 dark:text-blue-400 hover:underline">Girls</Link></li>
            <li><Link href="/fashion/kids/boys" className="text-blue-600 dark:text-blue-400 hover:underline">Boys</Link></li>
            <li><Link href="/fashion/kids/baby" className="text-blue-600 dark:text-blue-400 hover:underline">Baby</Link></li>
            <li><Link href="/fashion/kids/school-uniforms" className="text-blue-600 dark:text-blue-400 hover:underline">School Uniforms</Link></li>
            <li><Link href="/fashion/kids" className="font-medium hover:underline">See all</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Fashion Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/fashion/guides/size-charts" className="border rounded-lg p-6 hover:shadow-md transition-all">
            <h3 className="font-bold mb-2">Size Charts</h3>
            <p>Find your perfect fit with our comprehensive size guides.</p>
          </Link>
          
          <Link href="/fashion/guides/seasonal-trends" className="border rounded-lg p-6 hover:shadow-md transition-all">
            <h3 className="font-bold mb-2">Seasonal Trends</h3>
            <p>Stay up-to-date with the latest fashion trends for every season.</p>
          </Link>
          
          <Link href="/fashion/guides/style-tips" className="border rounded-lg p-6 hover:shadow-md transition-all">
            <h3 className="font-bold mb-2">Style Tips</h3>
            <p>Expert advice to help you look your best for any occasion.</p>
          </Link>
        </div>
      </div>
    </div>
  )
}