import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
      <div className="relative w-64 h-64 mb-6">
        <Image src="/placeholder.svg?height=250&width=250&text=404" alt="404" fill className="object-contain" />
      </div>

      <h1 className="text-3xl font-bold mb-4">Looking for something?</h1>

      <p className="text-lg text-gray-600 mb-6 max-w-lg">
        We're sorry. The Web address you entered is not a functioning page on our site.
      </p>

      <div className="space-y-4 mb-8">
        <p className="font-medium">Try one of these instead:</p>
        <ul className="space-y-2">
          <li>• Check the URL for typing errors</li>
          <li>
            • Go to the{" "}
            <Link href="/" className="amazon-link">
              Amazon.com homepage
            </Link>
          </li>
          <li>• Use the search bar at the top of the page</li>
        </ul>
      </div>

      <Link href="/">
        <Button className="amazon-button-primary">Go to Amazon.com Homepage</Button>
      </Link>
    </div>
  )
}
