import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Books | Amazon",
  description: "Shop for books at Amazon - fiction, non-fiction, textbooks, children's books, and more.",
}

export default function BooksPage() {
  // Mock data for book categories
  const categories = [
    { name: "Literature & Fiction", href: "/books/literature-fiction" },
    { name: "Mystery & Thriller", href: "/books/mystery-thriller" },
    { name: "Science Fiction & Fantasy", href: "/books/science-fiction-fantasy" },
    { name: "Romance", href: "/books/romance" },
    { name: "Children's Books", href: "/books/childrens" },
    { name: "Biographies & Memoirs", href: "/books/biographies" },
    { name: "History", href: "/books/history" },
    { name: "Self-Help", href: "/books/self-help" },
    { name: "Business & Money", href: "/books/business" },
    { name: "Cookbooks", href: "/books/cookbooks" },
    { name: "Arts & Photography", href: "/books/arts" },
    { name: "Travel", href: "/books/travel" },
  ]

  // Mock data for bestselling books
  const bestsellingBooks = [
    {
      id: 1,
      title: "The Summer Novel",
      author: "Jane Smith",
      price: 14.99,
      rating: 4.7,
      reviewCount: 1243,
      category: "Fiction",
      format: "Paperback",
      image: "📗",
    },
    {
      id: 2,
      title: "The Business of Success",
      author: "John Johnson",
      price: 24.99,
      rating: 4.5,
      reviewCount: 876,
      category: "Business",
      format: "Hardcover",
      image: "📘",
    },
    {
      id: 3,
      title: "Mystery at Midnight",
      author: "Sarah Williams",
      price: 12.99,
      rating: 4.8,
      reviewCount: 1567,
      category: "Mystery",
      format: "Paperback",
      image: "📕",
    },
    {
      id: 4,
      title: "Cooking for Everyone",
      author: "Chef Michael",
      price: 29.99,
      rating: 4.9,
      reviewCount: 2103,
      category: "Cookbook",
      format: "Hardcover",
      image: "📙",
    },
  ]

  // Mock data for new releases
  const newReleases = [
    {
      id: 5,
      title: "Future Worlds",
      author: "Alex Rivera",
      price: 16.99,
      rating: 4.6,
      reviewCount: 342,
      category: "Science Fiction",
      format: "Paperback",
      image: "📗",
    },
    {
      id: 6,
      title: "Historical Perspectives",
      author: "Dr. Emily Chen",
      price: 22.99,
      rating: 4.4,
      reviewCount: 187,
      category: "History",
      format: "Hardcover",
      image: "📘",
    },
    {
      id: 7,
      title: "The Art of Mindfulness",
      author: "Robert Peace",
      price: 15.99,
      rating: 4.7,
      reviewCount: 563,
      category: "Self-Help",
      format: "Paperback",
      image: "📕",
    },
    {
      id: 8,
      title: "World Traveler's Guide",
      author: "Lisa Wanderlust",
      price: 19.99,
      rating: 4.5,
      reviewCount: 421,
      category: "Travel",
      format: "Paperback",
      image: "📙",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Books</h1>
      
      <div className="bg-gradient-to-r from-amber-100 to-yellow-50 dark:from-amber-900 dark:to-yellow-900 p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-xl font-bold mb-3">Discover your next great read</h2>
            <p className="mb-4">
              From bestsellers to new releases, find books you'll love in every genre.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="amazon-button-primary">Shop All Books</button>
              <Link href="/kindle-books">
                <button className="amazon-button-secondary">Kindle eBooks</button>
              </Link>
              <Link href="/audible">
                <button className="amazon-button-secondary">Audiobooks</button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="aspect-video bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center p-4">
              <div className="flex">
                <span className="text-5xl transform -rotate-6">📚</span>
                <span className="text-5xl transform rotate-6">📖</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link href={category.href} key={index} className="group">
              <div className="border rounded-lg p-4 text-center transition-all hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700">
                <h3 className="font-medium group-hover:text-amber-600 dark:group-hover:text-amber-400">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Bestsellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellingBooks.map((book) => (
            <div key={book.id} className="border rounded-lg p-4 flex flex-col">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-4 flex items-center justify-center">
                <span className="text-6xl">{book.image}</span>
              </div>
              <div className="text-sm text-amber-600 dark:text-amber-400 mb-1">{book.category}</div>
              <h3 className="font-medium mb-1">{book.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">by {book.author}</p>
              <div className="flex items-center mb-1">
                <div className="text-yellow-500">{'★'.repeat(Math.floor(book.rating))}</div>
                <div className="text-gray-300 dark:text-gray-600">{
                  '★'.repeat(5 - Math.floor(book.rating))
                }</div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">({book.reviewCount.toLocaleString()})</span>
              </div>
              <div className="text-sm mb-1">{book.format}</div>
              <div className="font-bold text-lg mb-3">${book.price.toFixed(2)}</div>
              <button className="amazon-button-secondary w-full">Add to Cart</button>
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
              <div className="text-sm text-amber-600 dark:text-amber-400 mb-1">{book.category}</div>
              <h3 className="font-medium mb-1">{book.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">by {book.author}</p>
              <div className="flex items-center mb-1">
                <div className="text-yellow-500">{'★'.repeat(Math.floor(book.rating))}</div>
                <div className="text-gray-300 dark:text-gray-600">{
                  '★'.repeat(5 - Math.floor(book.rating))
                }</div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">({book.reviewCount})</span>
              </div>
              <div className="text-sm mb-1">{book.format}</div>
              <div className="font-bold text-lg mb-3">${book.price.toFixed(2)}</div>
              <button className="amazon-button-secondary w-full">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Kindle Unlimited</h2>
          <p className="mb-4">
            Enjoy unlimited reading of over 1 million titles and thousands of audiobooks.
          </p>
          <Link href="/kindle-unlimited">
            <button className="amazon-button-primary">Try Kindle Unlimited</button>
          </Link>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Audible Premium Plus</h2>
          <p className="mb-4">
            Listen to thousands of audiobooks and exclusive Audible Originals.
          </p>
          <Link href="/audible">
            <button className="amazon-button-primary">Try Audible</button>
          </Link>
        </div>
      </div>
    </div>
  )
}