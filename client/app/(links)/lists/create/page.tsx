"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Heart, 
  ShoppingCart, 
  Gift, 
  List, 
  Package, 
  Bookmark, 
  Calendar, 
  Home,
  ArrowLeft,
  Lock,
  Users,
  Globe
} from "lucide-react"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function CreateListPage() {
  const [listName, setListName] = useState("")
  const [listDescription, setListDescription] = useState("")
  const [listType, setListType] = useState("wishlist")
  const [privacy, setPrivacy] = useState("private")
  
  const listIcons = [
    { id: "heart", icon: <Heart className="h-6 w-6" />, label: "Heart" },
    { id: "shopping", icon: <ShoppingCart className="h-6 w-6" />, label: "Shopping Cart" },
    { id: "gift", icon: <Gift className="h-6 w-6" />, label: "Gift" },
    { id: "list", icon: <List className="h-6 w-6" />, label: "List" },
    { id: "package", icon: <Package className="h-6 w-6" />, label: "Package" },
    { id: "bookmark", icon: <Bookmark className="h-6 w-6" />, label: "Bookmark" },
    { id: "calendar", icon: <Calendar className="h-6 w-6" />, label: "Calendar" },
    { id: "home", icon: <Home className="h-6 w-6" />, label: "Home" },
  ]
  
  const [selectedIcon, setSelectedIcon] = useState("heart")
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the list to a database
    // For now, we'll just redirect to the lists page
    window.location.href = "/lists"
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/lists" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Create a New List</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-md shadow-sm">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="list-name" className="text-base font-medium">
                    List Name
                  </Label>
                  <Input
                    id="list-name"
                    placeholder="Enter a name for your list"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="list-description" className="text-base font-medium">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="list-description"
                    placeholder="Add a description to help you remember what this list is for"
                    value={listDescription}
                    onChange={(e) => setListDescription(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label className="text-base font-medium">
                    List Type
                  </Label>
                  <Select value={listType} onValueChange={setListType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a list type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wishlist">Wish List</SelectItem>
                      <SelectItem value="shopping">Shopping List</SelectItem>
                      <SelectItem value="gift">Gift Ideas</SelectItem>
                      <SelectItem value="custom">Custom List</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-base font-medium">
                    Choose an Icon
                  </Label>
                  <div className="grid grid-cols-4 gap-4 mt-2">
                    {listIcons.map((iconItem) => (
                      <div 
                        key={iconItem.id}
                        className={`border rounded-md p-3 flex flex-col items-center cursor-pointer transition-colors ${
                          selectedIcon === iconItem.id 
                            ? "border-blue-500 bg-blue-50" 
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedIcon(iconItem.id)}
                      >
                        <div className="mb-2">
                          {iconItem.icon}
                        </div>
                        <span className="text-xs text-center">{iconItem.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="text-base font-medium">
                    Privacy Settings
                  </Label>
                  <RadioGroup value={privacy} onValueChange={setPrivacy} className="mt-2">
                    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                      <RadioGroupItem value="private" id="private" />
                      <Label htmlFor="private" className="flex items-center cursor-pointer">
                        <Lock className="h-4 w-4 mr-2" />
                        <div>
                          <div>Private</div>
                          <div className="text-xs text-gray-500">Only you can see this list</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                      <RadioGroupItem value="shared" id="shared" />
                      <Label htmlFor="shared" className="flex items-center cursor-pointer">
                        <Users className="h-4 w-4 mr-2" />
                        <div>
                          <div>Shared</div>
                          <div className="text-xs text-gray-500">Share with specific people</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public" className="flex items-center cursor-pointer">
                        <Globe className="h-4 w-4 mr-2" />
                        <div>
                          <div>Public</div>
                          <div className="text-xs text-gray-500">Anyone with the link can view</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <Button type="submit" className="mr-2" disabled={!listName.trim()}>
                    Create List
                  </Button>
                  <Link href="/lists">
                    <Button variant="outline">Cancel</Button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        <div>
          <div className="bg-white p-6 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold mb-4">About Lists</h2>
            <div className="space-y-4 text-sm">
              <p>
                Lists help you keep track of items you're interested in, whether it's products you want to buy, gift ideas, or items for a specific occasion.
              </p>
              <div>
                <h3 className="font-medium mb-1">List Types:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Heart className="h-4 w-4 mr-2 mt-0.5 text-red-500" />
                    <div>
                      <span className="font-medium">Wish List</span> - Items you want to purchase or receive as gifts
                    </div>
                  </li>
                  <li className="flex items-start">
                    <ShoppingCart className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                    <div>
                      <span className="font-medium">Shopping List</span> - Items you need to buy regularly
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Gift className="h-4 w-4 mr-2 mt-0.5 text-purple-500" />
                    <div>
                      <span className="font-medium">Gift Ideas</span> - Items you're considering as gifts for others
                    </div>
                  </li>
                </ul>
              </div>
              <p>
                You can add items to your lists while browsing Amazon, and easily share your lists with friends and family.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}