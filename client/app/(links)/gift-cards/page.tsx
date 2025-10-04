import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gift Cards | Amazon",
  description: "Amazon Gift Cards are the perfect way to give someone exactly what they're wishing for.",
}

export default function GiftCardsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Amazon Gift Cards</h1>
      
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-xl font-bold mb-3">The Perfect Gift for Anyone, Any Occasion</h2>
            <p className="mb-4">Amazon Gift Cards are the perfect way to give someone exactly what they're wishing for, even if you don't know what it is.</p>
            <button className="amazon-button-primary">Shop Gift Cards</button>
          </div>
          <div className="md:w-1/3">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-4xl">🎁</span>
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Gift Card Types</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border rounded-lg p-6">
          <h3 className="font-bold mb-2">eGift Cards</h3>
          <p className="mb-4">Send by email, text, or messaging app. Schedule delivery or send immediately.</p>
          <button className="amazon-button-secondary w-full">Shop eGift Cards</button>
        </div>
        
        <div className="border rounded-lg p-6">
          <h3 className="font-bold mb-2">Physical Gift Cards</h3>
          <p className="mb-4">Send by mail with free One-Day shipping. Choose from multiple designs.</p>
          <button className="amazon-button-secondary w-full">Shop Physical Cards</button>
        </div>
        
        <div className="border rounded-lg p-6">
          <h3 className="font-bold mb-2">Print at Home</h3>
          <p className="mb-4">Print your own gift card at home for immediate gifting.</p>
          <button className="amazon-button-secondary w-full">Shop Printable Cards</button>
        </div>
      </div>
      
      <div className="border-t pt-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Gift Card Balance</h2>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1">
            <p>Check your gift card balance or redeem a gift card.</p>
          </div>
          <div className="flex gap-3">
            <button className="amazon-button-secondary">Check Balance</button>
            <button className="amazon-button-primary">Redeem a Gift Card</button>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Corporate Gift Cards</h2>
        <p className="mb-4">Looking for bulk gift cards for your business? Amazon Business has solutions for employee rewards, customer appreciation, and more.</p>
        <button className="amazon-button-secondary">Learn About Business Gift Cards</button>
      </div>
    </div>
  )
}