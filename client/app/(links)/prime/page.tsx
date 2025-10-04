import Link from "next/link"
import Image from "next/image"
import { Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PrimePage() {
  // Prime benefits
  const benefits = [
    {
      title: "FREE & Fast Delivery",
      description: "Fast, FREE delivery on over 100 million items",
      icon: "/placeholder.svg?height=50&width=50",
    },
    {
      title: "Prime Video",
      description: "Watch movies, TV, and award-winning Amazon Originals",
      icon: "/placeholder.svg?height=50&width=50",
    },
    {
      title: "Amazon Music",
      description: "Stream millions of songs and thousands of playlists",
      icon: "/placeholder.svg?height=50&width=50",
    },
    {
      title: "Prime Reading",
      description: "Unlimited access to a rotating selection of eBooks",
      icon: "/placeholder.svg?height=50&width=50",
    },
    {
      title: "Prime Gaming",
      description: "Free games, in-game content, and a Twitch channel subscription",
      icon: "/placeholder.svg?height=50&width=50",
    },
    {
      title: "Prime Photos",
      description: "Unlimited full-resolution photo storage",
      icon: "/placeholder.svg?height=50&width=50",
    },
  ]

  // Prime plans
  const plans = [
    {
      name: "Monthly",
      price: 14.99,
      period: "per month",
      features: [
        "FREE & Fast Delivery",
        "Prime Video",
        "Amazon Music",
        "Prime Reading",
        "Prime Gaming",
        "Prime Photos",
      ],
      cta: "Try Prime free for 30 days",
      link: "/prime/signup",
      popular: false,
    },
    {
      name: "Annual",
      price: 139,
      period: "per year",
      features: [
        "FREE & Fast Delivery",
        "Prime Video",
        "Amazon Music",
        "Prime Reading",
        "Prime Gaming",
        "Prime Photos",
      ],
      cta: "Try Prime free for 30 days",
      link: "/prime/signup",
      popular: true,
      savings: "Save $40.88 vs monthly",
    },
  ]

  return (
    <div>
      {/* Hero section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-indigo-900" />
        <Image
          src="/placeholder.svg?height=500&width=1500"
          alt="Amazon Prime"
          fill
          className="object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Amazon Prime</h1>
              <p className="text-xl mb-8">Fast, FREE delivery, award-winning shows, exclusive deals, and more.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/prime/signup">
                  <Button size="lg" className="bg-[#FFD814] hover:bg-[#F7CA00] text-black">
                    Try Prime free for 30 days
                  </Button>
                </Link>
                <Link href="#plans">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    See plans
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Prime benefits you'll love</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 relative mr-4">
                      <Image
                        src={benefit.icon || "/placeholder.svg"}
                        alt={benefit.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold">{benefit.title}</h3>
                  </div>
                  <p className="text-gray-600 flex-1">{benefit.description}</p>
                  <Link
                    href={`/prime/${benefit.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="amazon-link mt-4 flex items-center"
                  >
                    Learn more
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plans section */}
      <section id="plans" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Choose your Prime plan</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Cancel anytime. Restrictions apply. See terms and conditions for more details.
          </p>

          <div className="flex flex-col lg:flex-row gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`flex-1 ${plan.popular ? "border-blue-500 border-2" : ""}`}>
                {plan.popular && (
                  <div className="bg-blue-500 text-white text-center py-1 font-medium">MOST POPULAR</div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-1">
                    <span className="text-sm">$</span>
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  {plan.savings && <div className="text-green-600 text-sm mb-4">{plan.savings}</div>}

                  <ul className="space-y-3 my-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={plan.link}>
                    <Button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black">{plan.cta}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 text-sm text-gray-600">
            After your free trial, Amazon Prime is just $14.99/month (plus any applicable taxes).
            <br />
            Cancel anytime.
          </div>
        </div>
      </section>

      {/* Prime Video section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Prime Video</h2>
              <p className="text-lg mb-6">
                Watch award-winning Amazon Originals like The Marvelous Mrs. Maisel and Tom Clancy&apos;s Jack Ryan, as
                well as popular movies and TV shows, with Prime Video.
              </p>
              <Link href="/prime-video">
                <Button className="bg-[#FFD814] hover:bg-[#F7CA00] text-black">Explore Prime Video</Button>
              </Link>
            </div>
            <div className="lg:w-1/2 relative h-[300px] lg:h-[400px] w-full">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Prime Video"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Prime Music section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
            <div className="lg:w-1/2 relative h-[300px] lg:h-[400px] w-full">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Amazon Music"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Amazon Music</h2>
              <p className="text-lg mb-6">
                With your Prime membership, you can stream 2 million songs ad-free, listen to playlists and stations,
                and download songs for offline listening.
              </p>
              <Link href="/amazon-music">
                <Button className="bg-[#FFD814] hover:bg-[#F7CA00] text-black">Explore Amazon Music</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">What is Amazon Prime?</h3>
                <p className="text-gray-600">
                  Amazon Prime is a membership program that gives you access to a wide range of services, including FREE
                  fast delivery, streaming of movies, TV shows, and music, exclusive shopping deals, unlimited reading,
                  and more.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">How much does Amazon Prime cost?</h3>
                <p className="text-gray-600">
                  Amazon Prime costs $14.99 per month or $139 per year. Prime Student costs $7.49 per month or $69 per
                  year.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Can I cancel my Amazon Prime membership?</h3>
                <p className="text-gray-600">
                  Yes, you can cancel your Amazon Prime membership at any time. If you cancel, you can continue to use
                  your Prime benefits until the end of your current billing period.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="billing" className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">When will I be charged for Amazon Prime?</h3>
                <p className="text-gray-600">
                  Your Amazon Prime membership fee will be charged when your free trial ends. If you don&apos;t have a
                  free trial, your membership fee will be charged when you sign up.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">How do I update my payment method?</h3>
                <p className="text-gray-600">
                  You can update your payment method by going to Your Account &gt; Prime Membership &gt; Update payment
                  method.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="benefits" className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">What delivery benefits do I get with Prime?</h3>
                <p className="text-gray-600">
                  Prime members get FREE Two-Day Delivery on eligible items, FREE Same-Day Delivery in eligible zip
                  codes, and FREE 2-hour grocery delivery from Amazon Fresh and Whole Foods Market in eligible regions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">What streaming benefits do I get with Prime?</h3>
                <p className="text-gray-600">
                  Prime members get access to thousands of movies and TV shows with Prime Video, including award-winning
                  Amazon Originals. You also get access to 2 million songs with Amazon Music Prime.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Amazon Prime today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start your 30-day free trial and enjoy all the benefits of Prime membership.
          </p>
          <Link href="/prime/signup">
            <Button size="lg" className="bg-[#FFD814] hover:bg-[#F7CA00] text-black">
              Try Prime free for 30 days
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
