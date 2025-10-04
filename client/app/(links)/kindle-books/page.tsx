import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Kindle Books | Amazon",
  description: "Discover and read Kindle eBooks on any device. Millions of titles available instantly.",
}

export default function KindleBooksPage() {
  // Mock data for book categories
  const categories = [
    { name: "Literature & Fiction", href: "/kindle-books/literature-fiction" },
    { name: "Mystery & Thriller", href: "/kindle-books/mystery-thriller" },
    { name: "Science Fiction & Fantasy", href: "/kindle-books/science-fiction-fantasy" },
    { name: "Romance", href: "/kindle-books/romance" },
    { name: "Biographies & Memoirs", href: "/kindle-books/biographies" },
    { name: "Business & Money", href: "/kindle-books/business" },
    { name: "Self-Help", href: "/kindle-books/self-help" },
    { name: "History", href: "/kindle-books/history" },
  ]

  // Mock data for bestselling ebooks
  const bestsellingBooks = [
    {
      id: 1,
      title: "The Summer Novel",
      author: "Jane Smith",
      price: 9.99,
      originalPrice: 14.99,
      rating: 4.7,
      reviewCount: 1243,
      category: "Fiction",
      image: "📱",
    },
    {
      id: 2,
      title: "The Business of Success",
      author: "John Johnson",
      price: 12.99,
      originalPrice: 19.99,
      rating: 4.5,
      reviewCount: 876,
      category: "Business",
      image: "📱",
    },
    {
      id: 3,
      title: "Mystery at Midnight",
      author: "Sarah Williams",
      price: 7.99,
      originalPrice: 11.99,
      rating: 4.8,
      reviewCount: 1567,
      category: "Mystery",
      image: "📱",
    },
    {
      id: 4,
      title: "Cooking for Everyone",
      author: "Chef Michael",
      price: 10.99,
      originalPrice: 16.99,
      rating: 4.9,
      reviewCount: 2103,
      category: "Cookbook",
      image: "📱",
    },
  ]

  // Mock data for new releases
  const newReleases = [
    {
      id: 5,
      title: "Future Worlds",
      author: "Alex Rivera",
      price: 8.99,
      rating: 4.6,
      reviewCount: 342,
      category: "Science Fiction",
      releaseDate: "June 10, 2025",
      image: "📱",
    },
    {
      id: 6,
      title: "Historical Perspectives",
      author: "Dr. Emily Chen",
      price: 11.99,
      rating: 4.4,
      reviewCount: 187,
      category: "History",
      releaseDate: "June 5, 2025",
      image: "📱",
    },
    {
      id: 7,
      title: "The Art of Mindfulness",
      author: "Robert Peace",
      price: 6.99,
      rating: 4.7,
      reviewCount: 563,
      category: "Self-Help",
      releaseDate: "June 8, 2025",
      image: "📱",
    },
    {
      id: 8,
      title: "World Traveler's Guide",
      author: "Lisa Wanderlust",
      price: 9.99,
      rating: 4.5,
      reviewCount: 421,
      category: "Travel",
      releaseDate: "June 3, 2025",
      image: "📱",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Kindle eBooks</h1>
      
      <div className="bg-gradient-to-r from-blue-100 to-green-50 dark:from-blue-900 dark:to-green-900 p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-xl font-bold mb-3">Millions of books at your fingertips</h2>
            <p className="mb-4">
              Read anytime, anywhere with the Kindle app. Browse over 6 million titles, including bestsellers and new releases.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="amazon-button-primary">Shop All Kindle eBooks</button>
              <Link href="/kindle-unlimited">
                <button className="amazon-button-secondary">Try Kindle Unlimited</button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="aspect-video bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center p-4">
              <div className="flex items-center">
                <span className="text-5xl">📱</span>
                <span className="text-5xl ml-2">📚</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border rounded-lg p-6 flex flex-col items-center text-center">
          <div className="text-4xl mb-3">💰</div>
          <h3 className="font-bold mb-2">Great Deals</h3>
          <p>Save up to 80% on bestsellers, new releases, and more</p>
        </div>
        
        <div className="border rounded-lg p-6 flex flex-col items-center text-center">
          <div className="text-4xl mb-3">🔄</div>
          <h3 className="font-bold mb-2">Read Anywhere</h3>
          <p>Sync across devices with the free Kindle app</p>
        </div>
        
        <div className="border rounded-lg p-6 flex flex-col items-center text-center">
          <div className="text-4xl mb-3">⚡</div>
          <h3 className="font-bold mb-2">Instant Delivery</h3>
          <p>Get your books instantly after purchase</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
        <h2 className="text-xl font-bold mb-4">Bestselling eBooks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellingBooks.map((book) => (
            <div key={book.id} className="border rounded-lg p-4 flex flex-col">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-4 flex items-center justify-center">
                <div className="relative">
                  <span className="text-6xl">{book.image}</span>
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    Save {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%
                  </div>
                </div>
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">{book.category}</div>
              <h3 className="font-medium mb-1">{book.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">by {book.author}</p>
              <div className="flex items-center mb-1">
                <div className="text-yellow-500">{'★'.repeat(Math.floor(book.rating))}</div>
                <div className="text-gray-300 dark:text-gray-600">{
                  '★'.repeat(5 - Math.floor(book.rating))
                }</div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">({book.reviewCount.toLocaleString()})</span>
              </div>
              <div className="flex items-center mb-3">
                <div className="font-bold text-lg">${book.price.toFixed(2)}</div>
                <div className="text-sm text-gray-500 line-through ml-2">${book.originalPrice.toFixed(2)}</div>
              </div>
              <button className="amazon-button-secondary w-full">Buy Now</button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">New Releases</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newReleases.map((book) => (
            <div key={book.id} className="border rounded-lg p-4 flex flex-col">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-4 flex items-center justify-center">
                <span className="text-6xl">{book.image}</span>
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">New in {book.category}</div>
              <h3 className="font-medium mb-1">{book.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">by {book.author}</p>
              <div className="flex items-center mb-1">
                <div className="text-yellow-500">{'★'.repeat(Math.floor(book.rating))}</div>
                <div className="text-gray-300 dark:text-gray-600">{
                  '★'.repeat(5 - Math.floor(book.rating))
                }</div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">({book.reviewCount})</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Released: {book.releaseDate}</div>
              <div className="font-bold text-lg mb-3">${book.price.toFixed(2)}</div>
              <button className="amazon-button-secondary w-full">Buy Now</button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Kindle Unlimited</h2>
          <p className="mb-4">
            Enjoy unlimited reading of over 2 million titles, thousands of audiobooks, and current magazines with Kindle Unlimited.
          </p>
          <Link href="/kindle-unlimited">
            <button className="amazon-button-primary">Try Kindle Unlimited Free</button>
          </Link>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Prime Reading</h2>
          <p className="mb-4">
            Prime members can read thousands of books, magazines, and more at no additional cost.
          </p>
          <Link href="/prime-reading">
            <button className="amazon-button-primary">Explore Prime Reading</button>
          </Link>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Kindle Devices</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 flex flex-col items-center text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-bold mb-2">Kindle</h3>
            <p className="mb-4">The most affordable Kindle with a built-in front light.</p>
            <Link href="/kindle-devices/kindle">
              <button className="amazon-button-secondary">Learn More</button>
            </Link>
          </div>
          
          <div className="border rounded-lg p-6 flex flex-col items-center text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-bold mb-2">Kindle Paperwhite</h3>
            <p className="mb-4">Waterproof with a flush-front design and 300 ppi display.</p>
            <Link href="/kindle-devices/paperwhite">
              <button className="amazon-button-secondary">Learn More</button>
            </Link>
          </div>
          
          <div className="border rounded-lg p-6 flex flex-col items-center text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-bold mb-2">Kindle Oasis</h3>
            <p className="mb-4">Our best Kindle with adjustable warm light and page turn buttons.</p>
            <Link href="/kindle-devices/oasis">
              <button className="amazon-button-secondary">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Kindle Reading Apps</h2>
        <p className="mb-4">Read anytime, anywhere with the free Kindle app for your phone, tablet, or computer.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/kindle-apps/ios" className="border rounded-lg p-4 text-center hover:shadow-md transition-all">
            <h3 className="font-medium">iOS App</h3>
          </Link>
          <Link href="/kindle-apps/android" className="border rounded-lg p-4 text-center hover:shadow-md transition-all">
            <h3 className="font-medium">Android App</h3>
          </Link>
          <Link href="/kindle-apps/windows" className="border rounded-lg p-4 text-center hover:shadow-md transition-all">
            <h3 className="font-medium">Windows App</h3>
          </Link>
          <Link href="/kindle-apps/mac" className="border rounded-lg p-4 text-center hover:shadow-md transition-all">
            <h3 className="font-medium">Mac App</h3>
          </Link>
        </div>
      </div>
    </div>
  )
}