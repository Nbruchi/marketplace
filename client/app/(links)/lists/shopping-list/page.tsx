"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  ShoppingCart, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  Share2, 
  MoreHorizontal,
  ArrowRight,
  Printer,
  Download
} from "lucide-react"
import { mockProducts } from "@/lib/mock-data"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function ShoppingListPage() {
  const [items, setItems] = useState(
    mockProducts.slice(0, 5).map(product => ({
      ...product,
      addedDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      quantity: Math.floor(Math.random() * 3) + 1,
      checked: false,
      notes: "",
    }))
  )

  const [newItemName, setNewItemName] = useState("")

  const addItem = () => {
    if (newItemName.trim()) {
      setItems([
        ...items,
        {
          id: `new-${Date.now()}`,
          name: newItemName,
          price: 0,
          image: "/placeholder.svg?height=100&width=100",
          addedDate: new Date().toISOString(),
          quantity: 1,
          checked: false,
          notes: "",
          currency: "USD",
        },
      ])
      setNewItemName("")
    }
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const toggleItemCheck = (id: string) => {
    setItems(
      items.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    )
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      setItems(
        items.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  // Calculate totals
  const totalItems = items.length
  const checkedItems = items.filter(item => item.checked).length
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Shopping List</h1>
          <p className="text-gray-600">
            {checkedItems} of {totalItems} items checked
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/lists">
            <Button variant="outline">Back to Lists</Button>
          </Link>
          <Button>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add All to Cart
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-3">
          {/* Add new item form */}
          <div className="bg-white p-4 rounded-md shadow-sm mb-6">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add an item to your list"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addItem}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          {/* Items list */}
          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Items ({totalItems})</h2>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Printer className="h-4 w-4 mr-1" />
                  Print
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>

            {items.length > 0 ? (
              <div>
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className={`border-b border-gray-200 p-4 flex items-center ${
                      item.checked ? "bg-gray-50" : ""
                    }`}
                  >
                    <Checkbox 
                      checked={item.checked}
                      onCheckedChange={() => toggleItemCheck(item.id)}
                      className="mr-4"
                    />
                    <div className="relative h-16 w-16 flex-shrink-0 mr-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${item.checked ? "line-through text-gray-500" : ""}`}>
                        {item.name}
                      </h3>
                      {item.price > 0 && (
                        <p className="text-sm font-bold mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                      )}
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-600 mr-4">Qty:</span>
                        <button 
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-l"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="w-8 h-6 flex items-center justify-center border-t border-b border-gray-300">
                          {item.quantity}
                        </span>
                        <button 
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-r"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-1 ml-4">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-red-500"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your shopping list is empty</h3>
                <p className="text-gray-500 mb-4">Add items to your shopping list</p>
              </div>
            )}
          </div>
        </div>

        <div>
          {/* Summary card */}
          <div className="bg-white p-4 rounded-md shadow-sm sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Items:</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Checked:</span>
                <span>{checkedItems}</span>
              </div>
              {totalPrice > 0 && (
                <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
                  <span>Estimated Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              )}
            </div>
            
            <Button className="w-full mb-2">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add All to Cart
            </Button>
            
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export List
            </Button>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="font-semibold mb-2">Quick Actions</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button className="text-blue-600 hover:underline flex items-center">
                    <Check className="h-4 w-4 mr-1" />
                    Check all items
                  </button>
                </li>
                <li>
                  <button className="text-blue-600 hover:underline flex items-center">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove checked items
                  </button>
                </li>
                <li>
                  <button className="text-blue-600 hover:underline flex items-center">
                    <ArrowRight className="h-4 w-4 mr-1" />
                    Move to another list
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}