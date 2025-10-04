import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Amazon Blog | Amazon",
  description: "The official Amazon blog. News, stories, and updates about Amazon, its products, services, and innovations.",
}

export default function BlogPage() {
  // Mock data for featured blog posts
  const featuredPosts = [
    {
      id: 1,
      title: "Amazon announces new sustainability initiatives",
      excerpt: "Amazon is committed to building a sustainable business for our customers and the planet. Learn about our latest initiatives to reduce our carbon footprint.",
      category: "Sustainability",
      author: "Amazon Staff",
      date: "June 10, 2025",
      image: "🌱",
    },
    {
      id: 2,
      title: "Introducing new Alexa features for a smarter home",
      excerpt: "Discover the latest Alexa features that make your smart home even more intuitive and helpful in your daily life.",
      category: "Devices & Services",
      author: "Alexa Team",
      date: "June 5, 2025",
      image: "🔊",
    },
    {
      id: 3,
      title: "Supporting small businesses: Amazon's commitment",
      excerpt: "Small and medium-sized businesses are the backbone of Amazon's store. Learn how we're helping them succeed.",
      category: "Small Business",
      author: "Marketplace Team",
      date: "June 1, 2025",
      image: "🏪",
    },
  ]

  // Mock data for recent blog posts
  const recentPosts = [
    {
      id: 4,
      title: "Amazon Web Services expands global infrastructure",
      excerpt: "AWS announces new regions and availability zones to better serve customers worldwide.",
      category: "AWS",
      author: "AWS Team",
      date: "May 28, 2025",
    },
    {
      id: 5,
      title: "Prime Video's summer lineup: What to watch",
      excerpt: "Check out the exciting new shows and movies coming to Prime Video this summer.",
      category: "Entertainment",
      author: "Prime Video Team",
      date: "May 25, 2025",
    },
    {
      id: 6,
      title: "Amazon's approach to artificial intelligence",
      excerpt: "How Amazon is developing AI technologies responsibly to improve customer experiences.",
      category: "Technology",
      author: "AI Research Team",
      date: "May 20, 2025",
    },
    {
      id: 7,
      title: "Inside Amazon's operations: Meet our frontline heroes",
      excerpt: "Stories from the people who keep Amazon's operations running smoothly every day.",
      category: "Operations",
      author: "Operations Team",
      date: "May 15, 2025",
    },
  ]

  // Mock data for blog categories
  const categories = [
    { name: "Company News", href: "/blog/company-news", count: 156 },
    { name: "Sustainability", href: "/blog/sustainability", count: 87 },
    { name: "AWS", href: "/blog/aws", count: 243 },
    { name: "Devices & Services", href: "/blog/devices-services", count: 198 },
    { name: "Entertainment", href: "/blog/entertainment", count: 124 },
    { name: "Small Business", href: "/blog/small-business", count: 92 },
    { name: "Operations", href: "/blog/operations", count: 76 },
    { name: "Technology", href: "/blog/technology", count: 187 },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Amazon Blog</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Featured Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <Link href={`/blog/posts/${post.id}`} key={post.id} className="group">
              <div className="border rounded-lg overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
                <div className="bg-gray-100 dark:bg-gray-800 p-8 flex items-center justify-center">
                  <span className="text-6xl">{post.image}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-blue-600 dark:text-blue-400">{post.category}</span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">{post.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">{post.excerpt}</p>
                  <p className="text-xs text-gray-500">By {post.author}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
          <div className="space-y-6">
            {recentPosts.map((post) => (
              <Link href={`/blog/posts/${post.id}`} key={post.id} className="group">
                <div className="border rounded-lg p-6 transition-all hover:shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-blue-600 dark:text-blue-400">{post.category}</span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">{post.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{post.excerpt}</p>
                  <p className="text-xs text-gray-500">By {post.author}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/blog/archive" className="amazon-button-secondary inline-block">View All Posts</Link>
          </div>
        </div>
        
        <div>
          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Categories</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link href={category.href} className="flex justify-between items-center group">
                    <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400">{category.name}</span>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border rounded-lg p-6 mt-6">
            <h2 className="text-lg font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Stay updated with the latest news, stories, and insights from Amazon.</p>
            <div className="space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full p-2 border rounded"
              />
              <button className="amazon-button-primary w-full">Subscribe</button>
            </div>
          </div>
          
          <div className="border rounded-lg p-6 mt-6">
            <h2 className="text-lg font-bold mb-4">Follow Us</h2>
            <div className="flex gap-4">
              <Link href="https://twitter.com/amazon" className="text-2xl">🐦</Link>
              <Link href="https://facebook.com/amazon" className="text-2xl">📘</Link>
              <Link href="https://instagram.com/amazon" className="text-2xl">📷</Link>
              <Link href="https://linkedin.com/company/amazon" className="text-2xl">💼</Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Featured Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/blog/topics/sustainability" className="group">
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg text-center transition-all hover:shadow-md">
                <div className="text-4xl mb-2">🌱</div>
                <h3 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">Sustainability</h3>
              </div>
            </Link>
            <Link href="/blog/topics/innovation" className="group">
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg text-center transition-all hover:shadow-md">
                <div className="text-4xl mb-2">💡</div>
                <h3 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">Innovation</h3>
              </div>
            </Link>
            <Link href="/blog/topics/community" className="group">
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg text-center transition-all hover:shadow-md">
                <div className="text-4xl mb-2">🤝</div>
                <h3 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">Community</h3>
              </div>
            </Link>
            <Link href="/blog/topics/workplace" className="group">
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg text-center transition-all hover:shadow-md">
                <div className="text-4xl mb-2">🏢</div>
                <h3 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">Workplace</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">From the Archives</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link href="/blog/posts/history-of-amazon" className="border rounded-lg p-4 hover:shadow-md transition-all">
            <h3 className="font-bold mb-1">The History of Amazon</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">From online bookstore to global technology company: the Amazon journey.</p>
          </Link>
          <Link href="/blog/posts/prime-day-origins" className="border rounded-lg p-4 hover:shadow-md transition-all">
            <h3 className="font-bold mb-1">The Origins of Prime Day</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">How Amazon's biggest shopping event came to be.</p>
          </Link>
          <Link href="/blog/posts/kindle-evolution" className="border rounded-lg p-4 hover:shadow-md transition-all">
            <h3 className="font-bold mb-1">The Evolution of Kindle</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">How Amazon revolutionized reading with Kindle e-readers.</p>
          </Link>
        </div>
      </div>
    </div>
  )
}