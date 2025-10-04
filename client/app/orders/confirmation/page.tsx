"use client"

import Link from "next/link"
import Image from "next/image"
import { Check, ChevronRight, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function OrderConfirmationPage() {
  // Mock order details
  const orderDetails = {
    id: "114-2875557-3262269",
    date: "June 13, 2023",
    total: 149.97,
    shippingAddress: {
      name: "John Doe",
      street: "123 Main Street",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "United States",
    },
    paymentMethod: "Visa ending in 1234",
    items: [
      {
        id: "1",
        name: "Wireless Bluetooth Headphones",
        price: 149.99,
        image: "/placeholder.svg?height=100&width=100",
        quantity: 1,
        deliveryDate: "Tuesday, June 18",
      },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="amazon-section text-center py-8 mb-6">
        <div className="flex items-center justify-center mb-4">
          <Check className="h-12 w-12 text-[#007600] mr-2" />
          <h1 className="text-3xl font-medium">Order placed, thank you!</h1>
        </div>
        <p className="mb-4">Confirmation will be sent to your email.</p>
        <div className="flex justify-center gap-4">
          <Link href="/orders">
            <Button variant="outline">View order details</Button>
          </Link>
          <Link href="/">
            <Button className="amazon-button-primary">Continue shopping</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipping details */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-medium mb-4">Shipping Details</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Shipping Address</h3>
                <div className="text-sm">
                  <p>{orderDetails.shippingAddress.name}</p>
                  <p>{orderDetails.shippingAddress.street}</p>
                  <p>
                    {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}{" "}
                    {orderDetails.shippingAddress.zip}
                  </p>
                  <p>{orderDetails.shippingAddress.country}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-1">Shipping Method</h3>
                <div className="text-sm">
                  <p>FREE Prime Delivery</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order details */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-medium mb-4">Order Details</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Order Number</h3>
                <p className="text-sm">{orderDetails.id}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-1">Order Date</h3>
                <p className="text-sm">{orderDetails.date}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-1">Order Total</h3>
                <p className="text-sm">${orderDetails.total.toFixed(2)}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-1">Payment Method</h3>
                <p className="text-sm">{orderDetails.paymentMethod}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery details */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-medium mb-4">Delivery Information</h2>

            <div className="space-y-4">
              {orderDetails.items.map((item) => (
                <div key={item.id} className="flex items-start">
                  <Truck className="h-5 w-5 mr-2 text-[#007600] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Delivery Date: {item.deliveryDate}</p>
                    <p className="text-sm">{item.name}</p>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <Link href="/track" className="amazon-link flex items-center">
                  Track package
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order items */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-medium mb-4">Order Items</h2>

          <div className="space-y-6">
            {orderDetails.items.map((item) => (
              <div key={item.id} className="flex">
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
                </div>

                <div className="flex-1 ml-4">
                  <Link href={`/products/${item.id}`} className="hover:text-[#C7511F] hover:underline">
                    {item.name}
                  </Link>

                  <div className="text-sm text-[#007600] mb-1">Arriving {item.deliveryDate}</div>

                  <div className="flex items-center text-sm mb-1">
                    <span className="text-gray-500">Qty: </span>
                    <span className="ml-1">{item.quantity}</span>
                  </div>

                  <div className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</div>

                  <div className="flex gap-4 mt-2">
                    <Button variant="outline" size="sm">
                      Track package
                    </Button>
                    <Button variant="outline" size="sm">
                      Return or replace items
                    </Button>
                    <Button variant="outline" size="sm">
                      Write a product review
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <h2 className="text-xl font-medium mb-4">Need Help?</h2>
        <div className="flex justify-center gap-6">
          <Link href="/help/order" className="amazon-link">
            View or manage order
          </Link>
          <Link href="/returns" className="amazon-link">
            Returns & refunds
          </Link>
          <Link href="/customer-service" className="amazon-link">
            Customer Service
          </Link>
        </div>
      </div>
    </div>
  )
}
