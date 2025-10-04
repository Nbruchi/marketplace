import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Amazon Pharmacy | Amazon",
  description: "Amazon Pharmacy - Affordable medications delivered to your door with Prime prescription delivery.",
}

export default function PharmacyPage() {
  // Mock data for pharmacy categories
  const categories = [
    { name: "Prescription Medications", href: "/pharmacy/prescriptions" },
    { name: "Over-the-Counter", href: "/pharmacy/otc" },
    { name: "Vitamins & Supplements", href: "/pharmacy/vitamins" },
    { name: "Health Care", href: "/pharmacy/health-care" },
    { name: "Personal Care", href: "/pharmacy/personal-care" },
    { name: "First Aid", href: "/pharmacy/first-aid" },
  ]

  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Multivitamin Daily Supplement",
      price: 19.99,
      rating: 4.7,
      reviewCount: 3245,
      image: "💊",
    },
    {
      id: 2,
      name: "Digital Blood Pressure Monitor",
      price: 39.99,
      rating: 4.5,
      reviewCount: 1876,
      image: "🩺",
    },
    {
      id: 3,
      name: "Pain Relief Medication",
      price: 8.99,
      rating: 4.8,
      reviewCount: 5432,
      image: "💊",
    },
    {
      id: 4,
      name: "First Aid Kit - 215 Pieces",
      price: 24.99,
      rating: 4.9,
      reviewCount: 2103,
      image: "🩹",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Amazon Pharmacy</h1>
      
      <div className="bg-gradient-to-r from-blue-100 to-teal-50 dark:from-blue-900 dark:to-teal-900 p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-xl font-bold mb-3">Pharmacy made easy</h2>
            <p className="mb-4">
              Save time and money with Amazon Pharmacy. Enjoy transparent pricing, convenient delivery, and automatic refills.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="amazon-button-primary">Transfer Prescriptions</button>
              <button className="amazon-button-secondary">Start a New Prescription</button>
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="aspect-video bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center p-4">
              <span className="text-5xl">💊</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border rounded-lg p-6 flex flex-col items-center text-center">
          <div className="text-4xl mb-3">💰</div>
          <h3 className="font-bold mb-2">Save up to 80%</h3>
          <p>Compare prices and save on your medications with Amazon Prime prescription savings benefit</p>
        </div>
        
        <div className="border rounded-lg p-6 flex flex-col items-center text-center">
          <div className="text-4xl mb-3">🚚</div>
          <h3 className="font-bold mb-2">Free delivery</h3>
          <p>Get your medications delivered right to your door with free two-day delivery for Prime members</p>
        </div>
        
        <div className="border rounded-lg p-6 flex flex-col items-center text-center">
          <div className="text-4xl mb-3">🔒</div>
          <h3 className="font-bold mb-2">Secure & private</h3>
          <p>Your privacy is protected with secure packaging and HIPAA-compliant service</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link href={category.href} key={index} className="group">
              <div className="border rounded-lg p-4 text-center transition-all hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700">
                <h3 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Popular Health Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 flex flex-col">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-4 flex items-center justify-center">
                <span className="text-6xl">{product.image}</span>
              </div>
              <h3 className="font-medium mb-2 flex-grow">{product.name}</h3>
              <div className="flex items-center mb-1">
                <div className="text-yellow-500">{'★'.repeat(Math.floor(product.rating))}</div>
                <div className="text-gray-300 dark:text-gray-600">{
                  '★'.repeat(5 - Math.floor(product.rating))
                }</div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">({product.reviewCount.toLocaleString()})</span>
              </div>
              <div className="font-bold text-lg mb-3">${product.price.toFixed(2)}</div>
              <button className="amazon-button-secondary w-full">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">How Amazon Pharmacy Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-3">
              <span className="text-lg font-bold">1</span>
            </div>
            <h3 className="font-bold mb-2">Create a profile</h3>
            <p>Add your insurance and payment information</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-3">
              <span className="text-lg font-bold">2</span>
            </div>
            <h3 className="font-bold mb-2">Add medications</h3>
            <p>Transfer existing prescriptions or request new ones</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-3">
              <span className="text-lg font-bold">3</span>
            </div>
            <h3 className="font-bold mb-2">Request refills</h3>
            <p>Order refills when you need them or set up auto-refills</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-3">
              <span className="text-lg font-bold">4</span>
            </div>
            <h3 className="font-bold mb-2">Receive delivery</h3>
            <p>Get your medications delivered to your door</p>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">How do I transfer my prescriptions to Amazon Pharmacy?</h3>
            <p>You can transfer your prescriptions by creating an account, adding your medications, and providing your current pharmacy information. We'll handle the rest.</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">Does Amazon Pharmacy accept insurance?</h3>
            <p>Yes, Amazon Pharmacy accepts most insurance plans. You can add your insurance information to your profile to see your copay prices.</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">How long does delivery take?</h3>
            <p>Prime members receive free two-day delivery. Non-Prime members receive free standard shipping (4-5 business days) or can upgrade to faster shipping for a fee.</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">Can I speak with a pharmacist?</h3>
            <p>Yes, Amazon Pharmacy has licensed pharmacists available 24/7 to answer your questions about medications.</p>
          </div>
        </div>
      </div>
    </div>
  )
}