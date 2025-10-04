import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sell on Amazon | Amazon",
  description: "Learn how to sell on Amazon and reach millions of customers.",
}

export default function SellPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Sell on Amazon</h1>
      
      <div className="bg-gradient-to-r from-orange-100 to-yellow-50 dark:from-orange-900 dark:to-yellow-800 p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-xl font-bold mb-3">Start selling today</h2>
            <p className="mb-4">Put your products in front of the millions of customers who search Amazon.com every day.</p>
            <button className="amazon-button-primary">Sign up now</button>
          </div>
          <div className="md:w-1/3">
            <div className="aspect-video bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center p-4">
              <span className="text-4xl">📦</span>
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Choose your selling plan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border rounded-lg p-6">
          <h3 className="font-bold mb-2">Individual</h3>
          <p className="text-lg mb-2">$0.99 per sale</p>
          <ul className="list-disc pl-5 mb-4 space-y-1">
            <li>Sell fewer than 40 items a month</li>
            <li>No monthly subscription fee</li>
            <li>Access to basic selling tools</li>
            <li>List products in more than 20 categories</li>
          </ul>
          <button className="amazon-button-secondary w-full">Start selling as an individual</button>
        </div>
        
        <div className="border rounded-lg p-6 border-orange-300 dark:border-orange-700">
          <div className="bg-orange-100 dark:bg-orange-900 px-3 py-1 rounded-full text-sm font-bold inline-block mb-2">RECOMMENDED</div>
          <h3 className="font-bold mb-2">Professional</h3>
          <p className="text-lg mb-2">$39.99 per month</p>
          <ul className="list-disc pl-5 mb-4 space-y-1">
            <li>Sell more than 40 items a month</li>
            <li>No per-item fee</li>
            <li>Access to advanced selling tools</li>
            <li>List products in more than 30 categories</li>
            <li>Eligibility for top placement on product detail pages</li>
            <li>Ability to upload products in bulk</li>
          </ul>
          <button className="amazon-button-primary w-full">Start selling as a professional</button>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-4">How it works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">1</span>
          </div>
          <h3 className="font-bold mb-2">Create an account</h3>
          <p>Register with your business information and create a seller account</p>
        </div>
        
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">2</span>
          </div>
          <h3 className="font-bold mb-2">List your products</h3>
          <p>Add your products to the Amazon catalog</p>
        </div>
        
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">3</span>
          </div>
          <h3 className="font-bold mb-2">Sell your products</h3>
          <p>Customers shop and purchase your products</p>
        </div>
        
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">4</span>
          </div>
          <h3 className="font-bold mb-2">Ship and get paid</h3>
          <p>Deliver products to customers and receive payment</p>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Resources for sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">Seller University</h3>
            <p className="mb-3">Free online training to help you learn how to sell on Amazon</p>
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Learn more</a>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">Seller Forums</h3>
            <p className="mb-3">Connect with other sellers to share best practices</p>
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Visit forums</a>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">Seller Support</h3>
            <p className="mb-3">Get help with your seller account and selling on Amazon</p>
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Contact support</a>
          </div>
        </div>
      </div>
    </div>
  )
}