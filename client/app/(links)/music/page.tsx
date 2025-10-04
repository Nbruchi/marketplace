import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Amazon Music | Amazon",
  description: "Stream and download songs, albums, and playlists on Amazon Music. Enjoy millions of songs with Amazon Music Unlimited.",
}

export default function MusicPage() {
  // Mock data for music categories
  const categories = [
    { name: "Pop", href: "/music/pop" },
    { name: "Rock", href: "/music/rock" },
    { name: "Hip-Hop & Rap", href: "/music/hip-hop" },
    { name: "R&B", href: "/music/rnb" },
    { name: "Country", href: "/music/country" },
    { name: "Jazz", href: "/music/jazz" },
    { name: "Classical", href: "/music/classical" },
    { name: "Electronic", href: "/music/electronic" },
  ]

  // Mock data for featured albums
  const featuredAlbums = [
    {
      id: 1,
      title: "Summer Hits 2025",
      artist: "Various Artists",
      price: 9.99,
      rating: 4.7,
      reviewCount: 1243,
      image: "🎵",
    },
    {
      id: 2,
      title: "Acoustic Sessions",
      artist: "Emma Johnson",
      price: 12.99,
      rating: 4.8,
      reviewCount: 876,
      image: "🎸",
    },
    {
      id: 3,
      title: "Electronic Dreams",
      artist: "DJ Pulse",
      price: 8.99,
      rating: 4.5,
      reviewCount: 567,
      image: "🎧",
    },
    {
      id: 4,
      title: "Classical Masterpieces",
      artist: "London Symphony Orchestra",
      price: 14.99,
      rating: 4.9,
      reviewCount: 321,
      image: "🎻",
    },
  ]

  // Mock data for new releases
  const newReleases = [
    {
      id: 5,
      title: "Neon Lights",
      artist: "The Glow",
      price: 11.99,
      rating: 4.6,
      reviewCount: 342,
      releaseDate: "June 10, 2025",
      image: "🎤",
    },
    {
      id: 6,
      title: "Mountain High",
      artist: "The Climbers",
      price: 10.99,
      rating: 4.4,
      reviewCount: 187,
      releaseDate: "June 5, 2025",
      image: "🥁",
    },
    {
      id: 7,
      title: "Urban Rhythms",
      artist: "City Beats",
      price: 9.99,
      rating: 4.7,
      reviewCount: 263,
      releaseDate: "June 8, 2025",
      image: "🎹",
    },
    {
      id: 8,
      title: "Country Roads",
      artist: "Southern Stars",
      price: 12.99,
      rating: 4.5,
      reviewCount: 421,
      releaseDate: "June 3, 2025",
      image: "🪕",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Amazon Music</h1>
      
      <div className="bg-gradient-to-r from-purple-100 to-blue-50 dark:from-purple-900 dark:to-blue-900 p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-xl font-bold mb-3">Unlimited music streaming</h2>
            <p className="mb-4">
              Stream 100 million songs and podcasts with Amazon Music Unlimited. Listen ad-free with unlimited skips.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="amazon-button-primary">Try Amazon Music Unlimited</button>
              <Link href="/music/prime">
                <button className="amazon-button-secondary">Prime Music</button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="aspect-video bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center p-4">
              <div className="flex items-center">
                <span className="text-5xl">🎵</span>
                <span className="text-5xl ml-2">🎧</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border rounded-lg p-6 flex flex-col items-center text-center">
          <div className="text-4xl mb-3">🎧</div>
          <h3 className="font-bold mb-2">100 Million Songs</h3>
          <p>Stream or download your favorite music with Amazon Music Unlimited</p>
        </div>
        
        <div className="border rounded-lg p-6 flex flex-col items-center text-center">
          <div className="text-4xl mb-3">🎙️</div>
          <h3 className="font-bold mb-2">Podcasts</h3>
          <p>Listen to millions of podcast episodes on any device</p>
        </div>
        
        <div className="border rounded-lg p-6 flex flex-col items-center text-center">
          <div className="text-4xl mb-3">💎</div>
          <h3 className="font-bold mb-2">HD and Ultra HD</h3>
          <p>Experience the highest quality audio with Amazon Music HD</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Browse by Genre</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Link href={category.href} key={index} className="group">
              <div className="border rounded-lg p-4 text-center transition-all hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700">
                <h3 className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Featured Albums</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredAlbums.map((album) => (
            <div key={album.id} className="border rounded-lg p-4 flex flex-col">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-4 flex items-center justify-center">
                <span className="text-6xl">{album.image}</span>
              </div>
              <h3 className="font-medium mb-1">{album.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{album.artist}</p>
              <div className="flex items-center mb-1">
                <div className="text-yellow-500">{'★'.repeat(Math.floor(album.rating))}</div>
                <div className="text-gray-300 dark:text-gray-600">{
                  '★'.repeat(5 - Math.floor(album.rating))
                }</div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">({album.reviewCount.toLocaleString()})</span>
              </div>
              <div className="font-bold text-lg mb-3">${album.price.toFixed(2)}</div>
              <div className="flex gap-2">
                <button className="amazon-button-secondary flex-1">Buy</button>
                <button className="amazon-button-primary flex-1">Stream</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">New Releases</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newReleases.map((album) => (
            <div key={album.id} className="border rounded-lg p-4 flex flex-col">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-4 flex items-center justify-center">
                <span className="text-6xl">{album.image}</span>
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400 mb-1">New Release</div>
              <h3 className="font-medium mb-1">{album.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{album.artist}</p>
              <div className="flex items-center mb-1">
                <div className="text-yellow-500">{'★'.repeat(Math.floor(album.rating))}</div>
                <div className="text-gray-300 dark:text-gray-600">{
                  '★'.repeat(5 - Math.floor(album.rating))
                }</div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">({album.reviewCount})</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Released: {album.releaseDate}</div>
              <div className="font-bold text-lg mb-3">${album.price.toFixed(2)}</div>
              <div className="flex gap-2">
                <button className="amazon-button-secondary flex-1">Buy</button>
                <button className="amazon-button-primary flex-1">Stream</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Amazon Music Unlimited</h2>
          <p className="mb-4">
            Get unlimited access to 100 million songs and podcasts with ad-free listening and unlimited skips.
          </p>
          <button className="amazon-button-primary">Try 30 days free</button>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Amazon Music HD</h2>
          <p className="mb-4">
            Experience the highest quality audio with Amazon Music HD, featuring lossless audio.
          </p>
          <button className="amazon-button-primary">Upgrade to HD</button>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Listen Anywhere</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-bold mb-2">Mobile</h3>
            <p>Listen on iOS and Android devices</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="text-4xl mb-3">💻</div>
            <h3 className="font-bold mb-2">Web</h3>
            <p>Stream directly from your browser</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="text-4xl mb-3">🔊</div>
            <h3 className="font-bold mb-2">Smart Speakers</h3>
            <p>Compatible with Alexa and other smart devices</p>
          </div>
        </div>
      </div>
    </div>
  )
}