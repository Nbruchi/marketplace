"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [timeFilter, setTimeFilter] = useState("last30")

  // Mock orders
  const orders = [
    {
      id: "114-2875557-3262269",
      date: "June 10, 2023",
      total: 149.99,
      items: [
        {
          id: "1",
          name: "Wireless Bluetooth Headphones",
          image: "/placeholder.svg?height=100&width=100",
          price: 149.99,
          deliveryDate: "June 15, 2023",
          status: "Delivered",
        },
      ],
    },
    {
      id: "112-5647891-7894561",
      date: "May 22, 2023",
      total: 59.98,
      items: [
        {
          id: "2",
          name: "Smart Home Security Camera",
          image: "/placeholder.svg?height=100&width=100",
          price: 39.99,
          deliveryDate: "May 25, 2023",
          status: "Delivered",
        },
        {
          id: "3",
          name: "USB C Cable 3-Pack",
          image: "/placeholder.svg?height=100&width=100",
          price: 19.99,
          deliveryDate: "May 25, 2023",
          status: "Delivered",
        },
      ],
    },
    {
      id: "113-9874563-1234567",
      date: "April 15, 2023",
      total: 24.99,
      items: [
        {
          id: "4",
          name: "Stainless Steel Water Bottle",
          image: "/placeholder.svg?height=100&width=100",
          price: 24.99,
          deliveryDate: "April 18, 2023",
          status: "Delivered",
        },
      ],
    },
  ]

  // Filter orders based on time filter
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.date)
    const now = new Date()

    switch (timeFilter) {
      case "last30":
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(now.getDate() - 30)
        return orderDate >= thirtyDaysAgo
      case "last3months":
        const threeMonthsAgo = new Date()
        threeMonthsAgo.setMonth(now.getMonth() - 3)
        return orderDate >= threeMonthsAgo
      case "2023":
        return orderDate.getFullYear() === 2023
      case "2022":
        return orderDate.getFullYear() === 2022
      default:
        return true
    }
  })

  // Search orders
  const searchedOrders = searchQuery
    ? filteredOrders.filter(
        (order) =>
          order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          order.id.includes(searchQuery),
      )
    : filteredOrders

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-medium mb-6">Your Orders</h1>

      <Tabs defaultValue="orders" className="mb-6">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="buy-again">Buy Again</TabsTrigger>
          <TabsTrigger value="not-shipped">Not Yet Shipped</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 flex">
              <Input
                type="text"
                placeholder="Search all orders"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none"
              />
              <Button className="rounded-l-none">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>

            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Last 30 days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last30">Last 30 days</SelectItem>
                <SelectItem value="last3months">Last 3 months</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="all">Archived Orders</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {searchedOrders.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="mb-4">No orders found for the selected period.</p>
                <Button variant="outline" onClick={() => setTimeFilter("all")}>
                  View all orders
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {searchedOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-0">
                    {/* Order header */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 dark:bg-gray-800 p-4 border-b">
                      <div>
                        <div className="text-xs text-gray-500">ORDER PLACED</div>
                        <div className="text-sm">{order.date}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">TOTAL</div>
                        <div className="text-sm">${order.total.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">SHIP TO</div>
                        <div className="text-sm">
                          <button className="amazon-link text-sm">John Doe</button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">ORDER # {order.id}</div>
                        <div className="text-sm">
                          <Link href={`/orders/${order.id}`} className="amazon-link">
                            View order details
                          </Link>
                          <span className="mx-2">|</span>
                          <Link href={`/orders/${order.id}/invoice`} className="amazon-link">
                            Invoice
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="p-6">
                      <h3 className="font-medium mb-4">
                        {order.items.length > 1 ? `${order.items.length} items in this order` : "1 item in this order"}
                      </h3>

                      <div className="space-y-6">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex flex-col md:flex-row">
                            <div className="w-24 h-24 relative flex-shrink-0 mb-4 md:mb-0">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-contain"
                              />
                            </div>

                            <div className="flex-1 md:ml-4">
                              <Link href={`/products/${item.id}`} className="hover:text-[#C7511F] hover:underline">
                                {item.name}
                              </Link>

                              <div className="text-sm text-[#007600] mb-1">
                                {item.status} on {item.deliveryDate}
                              </div>

                              <div className="flex flex-wrap gap-2 mt-3">
                                <Button variant="outline" size="sm">
                                  Buy it again
                                </Button>
                                <Link href={`/products/${item.id}/review`}>
                                  <Button variant="outline" size="sm">
                                    Write a product review
                                  </Button>
                                </Link>
                                <Link href={`/returns/${order.id}/${item.id}`}>
                                  <Button variant="outline" size="sm">
                                    Return or replace items
                                  </Button>
                                </Link>
                              </div>
                            </div>

                            <div className="mt-4 md:mt-0 md:ml-4">
                              <Link href={`/products/${item.id}`} className="amazon-link flex items-center">
                                View product
                                <ChevronRight className="h-4 w-4" />
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6">
                        <Link href={`/orders/${order.id}`} className="amazon-link">
                          Archive order
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="buy-again" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-4">Buy Again</h2>
              <p>Items you've purchased that you might want to buy again.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="not-shipped" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-4">Not Yet Shipped</h2>
              <p>You don't have any orders that haven't shipped yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-4">Cancelled Orders</h2>
              <p>You haven't cancelled any orders in the last 6 months.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
