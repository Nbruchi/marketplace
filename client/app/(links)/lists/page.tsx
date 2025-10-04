"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  Heart, 
  ShoppingCart, 
  Gift, 
  Plus, 
  MoreHorizontal, 
  Share2, 
  Edit, 
  Trash2,
  Lock,
  Globe,
  Users,
  Search
} from "lucide-react"
import { mockProducts } from "@/lib/mock-data"

export default function ListsPage() {
  const [lists, setLists] = useState([
    {
      id: "1",
      name: "Wish List",
      type: "wishlist",
      itemCount: 12,
      lastUpdated: "2023-06-10",
      isDefault: true,
      privacy: "private",
      icon: <Heart className="h-5 w-5" />,
    },
    {
      id: "2",
      name: "Shopping List",
      type: "shopping",
      itemCount: 5,
      lastUpdated: "2023-06-05",
      isDefault: false,
      privacy: "private",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      id: "3",
      name: "Birthday Ideas",
      type: "custom",
      itemCount: 8,
      lastUpdated: "2023-05-20",
      isDefault: false,
      privacy: "shared",
      sharedWith: 2,
      icon: <Gift className="h-5 w-5" />,
    },
    {
      id: "4",
      name: "Home Decor",
      type: "custom",
      itemCount: 15,
      lastUpdated: "2023-05-15",
      isDefault: false,
      privacy: "public",
      icon: <Heart className="h-5 w-5" />,
    },
  ])

  // Sample items for the first list (Wish List)
  const [wishlistItems, setWishlistItems] = useState(
    mockProducts.slice(0, 4).map(product => ({
      ...product,
      addedDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      notes: "",
      priority: Math.floor(Math.random() * 3) + 1, // 1-3
    }))
  )

  const deleteList = (id: string) => {
    setLists(lists.filter(list => list.id !== id))
  }

  const removeFromList = (id: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id))
  }

  const getPrivacyIcon = (privacy: string) => {
    switch (privacy) {
      case "private":
        return <Lock className="h-4 w-4" />
      case "shared":
        return <Users className="h-4 w-4" />
      case "public":
        return <Globe className="h-4 w-4" />
      default:
        return <Lock className="h-4 w-4" />
    }
  }

  const getPrivacyLabel = (privacy: string) => {
    switch (privacy) {
      case "private":
        return "Private"
      case "shared":
        return "Shared"
      case "public":
        return "Public"
      default:
        return "Private"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Lists</h1>
        <Link href="/lists/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create List
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Total Lists</h2>
          <p className="text-3xl font-bold">{lists.length}</p>
          <p className="text-sm text-gray-600">Organize your shopping with lists</p>
        </div>

        <div className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Wish List Items</h2>
          <p className="text-3xl font-bold">{wishlistItems.length}</p>
          <p className="text-sm text-gray-600">Items in your default Wish List</p>
        </div>

        <div className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Shared Lists</h2>
          <p className="text-3xl font-bold">{lists.filter(list => list.privacy === "shared").length}</p>
          <p className="text-sm text-gray-600">Lists shared with friends or family</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {lists.map((list) => (
          <div key={list.id} className="bg-white rounded-md border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-md mr-3">
                    {list.icon}
                  </div>
                  <div>
                    <h3 className="font-bold">{list.name}</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      {getPrivacyIcon(list.privacy)}
                      <span className="ml-1">{getPrivacyLabel(list.privacy)}</span>
                      {list.sharedWith && (
                        <span className="ml-1">• Shared with {list.sharedWith}</span>
                      )}
                    </div>
                  </div>
                </div>
                {list.isDefault && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                    Default
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-600">
                {list.itemCount} {list.itemCount === 1 ? 'item' : 'items'}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Last updated: {new Date(list.lastUpdated).toLocaleDateString()}
              </div>
            </div>
            <div className="p-4 bg-gray-50 flex justify-between">
              <Link href={list.type === "shopping" ? "/lists/shopping-list" : `/lists/${list.id}`}>
                <Button size="sm" variant="outline">View List</Button>
              </Link>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
                {!list.isDefault && (
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 text-red-500"
                    onClick={() => deleteList(list.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}

        <Link href="/lists/create">
          <div className="bg-white rounded-md border border-gray-200 border-dashed h-full flex flex-col items-center justify-center p-6 hover:bg-gray-50 transition-colors">
            <Plus className="h-10 w-10 text-gray-400 mb-3" />
            <p className="text-sm font-medium text-center mb-1">Create a New List</p>
            <p className="text-xs text-gray-500 text-center">Organize items for different occasions</p>
          </div>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-md shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Wish List</h2>
          <Link href="/wishlist">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <p className="text-gray-600 mb-6">
          Items you've added to your default Wish List
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-md border border-gray-200 overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-4 border-t border-gray-200">
                <h3 className="font-medium text-sm line-clamp-2 mb-1">{item.name}</h3>
                <div className="font-bold text-sm mb-2">
                  ${item.price.toFixed(2)}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>Added {new Date(item.addedDate).toLocaleDateString()}</span>
                  <span>Priority: {item.priority}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">Add to Cart</Button>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="h-8 w-8"
                    onClick={() => removeFromList(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Link href="/lists/find" className="text-blue-600 hover:underline flex items-center">
          <Search className="h-4 w-4 mr-1" />
          Find a List or Registry
        </Link>
        <Link href="/help/lists" className="text-blue-600 hover:underline">
          Learn more about Amazon Lists
        </Link>
      </div>
    </div>
  )
}
