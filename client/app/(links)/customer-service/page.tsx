import Link from "next/link"
import Image from "next/image"
import { Search, ChevronRight, MessageCircle, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CustomerServicePage() {
  // Common help topics
  const helpTopics = [
    {
      title: "Where's my stuff?",
      description: "Track your package, view orders, or report a problem",
      icon: "/placeholder.svg?height=50&width=50",
      link: "/orders",
    },
    {
      title: "Returns & Refunds",
      description: "Return items, get refund status, and more",
      icon: "/placeholder.svg?height=50&width=50",
      link: "/returns",
    },
    {
      title: "Manage Prime",
      description: "Learn about Prime benefits and manage membership",
      icon: "/placeholder.svg?height=50&width=50",
      link: "/prime",
    },
    {
      title: "Payment & Gift Cards",
      description: "Add or edit payment methods and manage gift cards",
      icon: "/placeholder.svg?height=50&width=50",
      link: "/payments",
    },
    {
      title: "Account Settings",
      description: "Change email or password, update personal info",
      icon: "/placeholder.svg?height=50&width=50",
      link: "/account",
    },
    {
      title: "Digital Services",
      description: "Troubleshoot device and digital content issues",
      icon: "/placeholder.svg?height=50&width=50",
      link: "/digital-services",
    },
  ]

  // FAQ items
  const faqItems = [
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by going to Your Orders in your Amazon account. Select the order you want to track and click on 'Track Package'.",
    },
    {
      question: "How do I return an item?",
      answer:
        "To return an item, go to Your Orders, select the order with the item you want to return, and click on 'Return or Replace Items'. Follow the instructions to complete your return.",
    },
    {
      question: "When will I get my refund?",
      answer:
        "Once we receive your return, it typically takes 2-3 business days to process the refund. The time it takes for the money to appear in your account depends on your payment method.",
    },
    {
      question: "How do I cancel an order?",
      answer:
        "To cancel an order, go to Your Orders, find the order you want to cancel, and click on 'Cancel items'. If the order has already shipped, you'll need to wait for it to arrive and then return it.",
    },
    {
      question: "How do I change my payment method?",
      answer:
        "You can change your payment method by going to Your Account > Payment options. From there, you can add, edit, or remove payment methods.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-medium mb-6">Customer Service</h1>

      {/* Search section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-medium mb-4">What can we help you with?</h2>
          <div className="flex">
            <Input type="text" placeholder="Search our help library" className="rounded-r-none" />
            <Button className="rounded-l-none">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Help topics */}
      <h2 className="text-xl font-medium mb-4">Common help topics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {helpTopics.map((topic, index) => (
          <Link key={index} href={topic.link}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-start">
                <div className="w-12 h-12 relative mr-4 flex-shrink-0">
                  <Image src={topic.icon || "/placeholder.svg"} alt={topic.title} fill className="object-contain" />
                </div>
                <div>
                  <h3 className="font-medium">{topic.title}</h3>
                  <p className="text-sm text-gray-500">{topic.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* FAQ section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-medium mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <span className="font-medium">{item.question}</span>
                  <ChevronRight className="h-5 w-5 transition-transform group-open:rotate-90" />
                </summary>
                <div className="mt-2 text-gray-600 pl-4">{item.answer}</div>
              </details>
            ))}
          </div>

          <div className="mt-6">
            <Link href="/help/faq">
              <Button variant="outline">View all FAQs</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Contact options */}
      <h2 className="text-xl font-medium mb-4">Contact Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <MessageCircle className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="font-medium mb-2">Chat with Us</h3>
            <p className="text-sm text-gray-500 mb-4">Connect with a customer service representative via live chat.</p>
            <Button className="amazon-button-primary w-full">Start Chat</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Phone className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="font-medium mb-2">Call Us</h3>
            <p className="text-sm text-gray-500 mb-4">Speak directly with a customer service representative.</p>
            <Button className="amazon-button-primary w-full">Request Call</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Mail className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="font-medium mb-2">Email Us</h3>
            <p className="text-sm text-gray-500 mb-4">Send us an email and we'll get back to you within 24 hours.</p>
            <Button className="amazon-button-primary w-full">Send Email</Button>
          </CardContent>
        </Card>
      </div>

      {/* Help by category */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-medium mb-4">Help by Category</h2>

          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="returns">Returns</TabsTrigger>
              <TabsTrigger value="prime">Prime</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="mt-6">
              <ul className="space-y-2">
                <li>
                  <Link href="/help/orders/tracking" className="amazon-link flex items-center">
                    Track your package
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link href="/help/orders/missing" className="amazon-link flex items-center">
                    Where's my stuff?
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link href="/help/orders/cancel" className="amazon-link flex items-center">
                    Cancel an order
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link href="/help/orders/problems" className="amazon-link flex items-center">
                    Report a problem with an order
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
              </ul>
            </TabsContent>

            <TabsContent value="returns" className="mt-6">
              <ul className="space-y-2">
                <li>
                  <Link href="/help/returns/start" className="amazon-link flex items-center">
                    Start a return
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link href="/help/returns/status" className="amazon-link flex items-center">
                    Check return status
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link href="/help/returns/refunds" className="amazon-link flex items-center">
                    Refund timing
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link href="/help/returns/policy" className="amazon-link flex items-center">
                    Return policies
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
              </ul>
            </TabsContent>

            <TabsContent value="prime" className="mt-6">
              <ul className="space-y-2">
                <li>
                  <Link href="/help/prime/benefits" className="amazon-link flex items-center">
                    Prime benefits
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link href="/help/prime/manage" className="amazon-link flex items-center">
                    Manage Prime membership
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link href="/help/prime/cancel" className="amazon-link flex items-center">
                    Cancel Prime membership
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link href="/help/prime/sharing" className="amazon-link flex items-center">
                    Prime sharing
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
              </ul>
            </TabsContent>

            <TabsContent value="payments" className="mt-6">
              <ul className="space-y-2">
                <li>
                  <Link href="/help/payments/methods" className="amazon-link flex items-center">
                    Manage payment methods
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link href="/help/payments/gift-cards" className="amazon-link flex items-center">
                    Gift cards
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link href="/help/payments/currency" className="amazon-link flex items-center">
                    Currency converter
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link href="/help/payments/billing" className="amazon-link flex items-center">
                    Billing issues
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
              </ul>
            </TabsContent>

            <TabsContent value="account" className="mt-6">
              <ul className="space-y-2">
                <li>
                  <Link href="/help/account/edit" className="amazon-link flex items-center">
                    Edit account information
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link href="/help/account/password" className="amazon-link flex items-center">
                    Change password
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link href="/help/account/addresses" className="amazon-link flex items-center">
                    Manage addresses
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link href="/help/account/security" className="amazon-link flex items-center">
                    Account security
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
              </ul>
            </TabsContent>

            <TabsContent value="devices" className="mt-6">
              <ul className="space-y-2">
                <li>
                  <Link href="/help/devices/kindle" className="amazon-link flex items-center">
                    Kindle e-readers
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link href="/help/devices/fire-tablet" className="amazon-link flex items-center">
                    Fire tablets
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link href="/help/devices/echo" className="amazon-link flex items-center">
                    Echo & Alexa
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link href="/help/devices/fire-tv" className="amazon-link flex items-center">
                    Fire TV
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Contact hours */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start">
            <Clock className="h-6 w-6 mr-4 text-gray-500 flex-shrink-0" />
            <div>
              <h3 className="font-medium mb-2">Customer Service Hours</h3>
              <p className="text-gray-600">
                Our customer service team is available 24/7 to assist you with any questions or concerns.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
