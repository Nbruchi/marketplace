import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Careers at Amazon | Amazon",
  description: "Find and apply for jobs at Amazon. Discover opportunities in tech, operations, customer service, and more.",
}

export default function CareersPage() {
  // Mock data for job categories
  const jobCategories = [
    { name: "Software Development", href: "/careers/software-development", count: 1243 },
    { name: "Operations", href: "/careers/operations", count: 876 },
    { name: "Customer Service", href: "/careers/customer-service", count: 567 },
    { name: "Marketing", href: "/careers/marketing", count: 321 },
    { name: "Finance", href: "/careers/finance", count: 198 },
    { name: "Human Resources", href: "/careers/human-resources", count: 156 },
    { name: "Design", href: "/careers/design", count: 243 },
    { name: "Research", href: "/careers/research", count: 187 },
  ]

  // Mock data for featured jobs
  const featuredJobs = [
    {
      id: 1,
      title: "Software Development Engineer",
      location: "Seattle, WA",
      type: "Full-time",
      category: "Software Development",
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "Operations Manager",
      location: "Nashville, TN",
      type: "Full-time",
      category: "Operations",
      posted: "1 week ago",
    },
    {
      id: 3,
      title: "UX Designer",
      location: "Remote",
      type: "Full-time",
      category: "Design",
      posted: "3 days ago",
    },
    {
      id: 4,
      title: "Financial Analyst",
      location: "New York, NY",
      type: "Full-time",
      category: "Finance",
      posted: "5 days ago",
    },
  ]

  // Mock data for locations
  const locations = [
    "Seattle, WA",
    "Arlington, VA",
    "New York, NY",
    "San Francisco, CA",
    "Austin, TX",
    "Nashville, TN",
    "Boston, MA",
    "Remote",
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Careers at Amazon</h1>
      
      <div className="bg-gradient-to-r from-blue-100 to-teal-50 dark:from-blue-900 dark:to-teal-900 p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-xl font-bold mb-3">Come build the future with us</h2>
            <p className="mb-4">
              Amazon is a place where builders can build. We hire the world's brightest minds and offer them an environment in which they can invent and innovate to improve the experience for our customers.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="amazon-button-primary">Search All Jobs</button>
              <Link href="/careers/students">
                <button className="amazon-button-secondary">Student Opportunities</button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="aspect-video bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center p-4">
              <div className="flex items-center">
                <span className="text-5xl">👩‍💻</span>
                <span className="text-5xl ml-2">👨‍💼</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Explore Job Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {jobCategories.map((category, index) => (
            <Link href={category.href} key={index} className="group">
              <div className="border rounded-lg p-4 h-full flex flex-col transition-all hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700">
                <h3 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">{category.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{category.count} open positions</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Featured Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredJobs.map((job) => (
            <Link href={`/careers/jobs/${job.id}`} key={job.id} className="group">
              <div className="border rounded-lg p-6 h-full flex flex-col transition-all hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700">
                <h3 className="font-medium text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">{job.title}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full">{job.location}</span>
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full">{job.type}</span>
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full">{job.category}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-auto">Posted {job.posted}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/careers/jobs" className="amazon-button-secondary inline-block">View All Jobs</Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 dark:bg-blue-900 p-6">
            <h2 className="text-xl font-bold mb-2">Why Amazon?</h2>
            <p className="mb-4">Learn about our culture, benefits, and what makes Amazon a great place to work.</p>
            <Link href="/careers/why-amazon">
              <button className="amazon-button-primary">Learn More</button>
            </Link>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 dark:bg-green-900 p-6">
            <h2 className="text-xl font-bold mb-2">Our Hiring Process</h2>
            <p className="mb-4">Understand what to expect when you apply for a job at Amazon.</p>
            <Link href="/careers/hiring-process">
              <button className="amazon-button-primary">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Locations</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {locations.map((location, index) => (
            <Link href={`/careers/locations/${location.toLowerCase().replace(/,?\s+/g, '-')}`} key={index} className="group">
              <div className="border rounded-lg p-4 text-center transition-all hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700">
                <h3 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">{location}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Our Leadership Principles</h2>
          <p className="mb-6">Our Leadership Principles describe how Amazon does business, how leaders lead, and how we keep the customer at the center of our decisions.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Customer Obsession</h3>
              <p className="text-sm">Leaders start with the customer and work backwards.</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Ownership</h3>
              <p className="text-sm">Leaders are owners. They think long term and don't sacrifice long-term value for short-term results.</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Invent and Simplify</h3>
              <p className="text-sm">Leaders expect and require innovation and invention from their teams and always find ways to simplify.</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Learn and Be Curious</h3>
              <p className="text-sm">Leaders are never done learning and always seek to improve themselves.</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link href="/careers/principles" className="text-blue-600 dark:text-blue-400 hover:underline">View All Leadership Principles</Link>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3">Students & Recent Graduates</h2>
          <p className="mb-4">Launch your career at Amazon with internships, full-time roles, and programs for students and recent graduates.</p>
          <Link href="/careers/students">
            <button className="amazon-button-secondary">Learn More</button>
          </Link>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3">Military & Veterans</h2>
          <p className="mb-4">Amazon values the leadership and skills that military veterans bring to our workforce.</p>
          <Link href="/careers/military">
            <button className="amazon-button-secondary">Learn More</button>
          </Link>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3">Diversity & Inclusion</h2>
          <p className="mb-4">We're committed to building a diverse and inclusive workplace for people of all backgrounds.</p>
          <Link href="/careers/diversity">
            <button className="amazon-button-secondary">Learn More</button>
          </Link>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">FAQs</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">How do I apply for a job at Amazon?</h3>
            <p>Search for jobs on our careers site, create a profile, and submit your application online. You can also set up job alerts to be notified when positions that match your interests become available.</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">What is the interview process like?</h3>
            <p>Our interview process typically includes a phone screen, followed by in-person or virtual interviews. We use behavioral-based interviewing, which uses your past experiences as indicators of future success.</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">What benefits does Amazon offer?</h3>
            <p>Amazon offers a comprehensive benefits package including health insurance, 401(k) with company match, paid time off, parental leave, and employee discounts. Benefits may vary by location and position.</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-bold mb-2">Does Amazon offer remote work options?</h3>
            <p>Yes, Amazon offers remote and hybrid work options for many roles. The availability of remote work depends on the specific job and team requirements.</p>
          </div>
        </div>
      </div>
    </div>
  )
}