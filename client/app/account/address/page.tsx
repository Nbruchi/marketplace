"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Plus } from "lucide-react"

export default function AddressPage() {
  const [addresses, setAddresses] = useState([
    {
      id: "1",
      name: "John Doe",
      line1: "123 Main St",
      line2: "Apt 4B",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "United States",
      phone: "(555) 123-4567",
      isDefault: true,
    },
    {
      id: "2",
      name: "John Doe",
      line1: "456 Market Ave",
      line2: "",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "(555) 987-6543",
      isDefault: false,
    },
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Addresses</h1>
        <Link href="/account">
          <Button variant="outline">Back to Account</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add new address card */}
        <div className="border border-gray-200 rounded-md p-6 flex flex-col items-center justify-center h-64 hover:bg-gray-50 transition-colors">
          <Plus className="h-12 w-12 mb-4 text-gray-400" />
          <h2 className="font-bold text-lg mb-2">Add a new address</h2>
          <Button className="mt-2">Add address</Button>
        </div>

        {/* Existing addresses */}
        {addresses.map((address) => (
          <div 
            key={address.id} 
            className="border border-gray-200 rounded-md p-6 h-64 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <h2 className="font-bold text-lg">{address.name}</h2>
                {address.isDefault && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Default</span>
                )}
              </div>
              <p className="mt-2">{address.line1}</p>
              {address.line2 && <p>{address.line2}</p>}
              <p>{`${address.city}, ${address.state} ${address.zipCode}`}</p>
              <p>{address.country}</p>
              <p className="mt-2">{address.phone}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="outline" size="sm">Remove</Button>
              {!address.isDefault && (
                <Button variant="outline" size="sm">Set as Default</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}