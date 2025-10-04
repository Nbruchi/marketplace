import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gift Registry | Amazon",
  description: "Create and manage your Amazon gift registry for weddings, baby showers, and other special occasions.",
}

export default function RegistryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Gift Registry</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border rounded-lg p-6 flex flex-col items-center text-center">
          <h2 className="text-xl font-bold mb-3">Wedding Registry</h2>
          <p className="mb-4">Create a registry for your special day and share it with friends and family.</p>
          <button className="amazon-button-primary mt-auto">Create a Wedding Registry</button>
        </div>
        
        <div className="border rounded-lg p-6 flex flex-col items-center text-center">
          <h2 className="text-xl font-bold mb-3">Baby Registry</h2>
          <p className="mb-4">Prepare for your little one with everything you need from Amazon.</p>
          <button className="amazon-button-primary mt-auto">Create a Baby Registry</button>
        </div>
        
        <div className="border rounded-lg p-6 flex flex-col items-center text-center">
          <h2 className="text-xl font-bold mb-3">Birthday Registry</h2>
          <p className="mb-4">Let friends and family know what you'd like for your birthday.</p>
          <button className="amazon-button-primary mt-auto">Create a Birthday Registry</button>
        </div>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Find a Registry</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Search by registrant name" 
            className="flex-1 p-2 border rounded"
          />
          <button className="amazon-button-primary">Search</button>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Manage Your Registry</h2>
        <p className="mb-4">Already have a registry? Sign in to manage your existing registry.</p>
        <button className="amazon-button-secondary">Sign In to Your Registry</button>
      </div>
    </div>
  )
}