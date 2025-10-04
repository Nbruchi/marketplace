export const categories = [
    { name: "All", value: "all" },
    { name: "Alexa Skills", value: "alexa-skills" },
    { name: "Amazon Devices", value: "amazon-devices" },
    { name: "Amazon Pharmacy", value: "amazon-pharmacy" },
    { name: "Appliances", value: "appliances" },
    { name: "Apps & Games", value: "apps-games" },
    { name: "Arts, Crafts & Sewing", value: "arts-crafts" },
    { name: "Audible Books & Originals", value: "audible" },
    { name: "Automotive", value: "automotive" },
    { name: "Baby", value: "baby" },
    { name: "Beauty & Personal Care", value: "beauty" },
    { name: "Books", value: "books" },
    { name: "CDs & Vinyl", value: "music" },
    { name: "Cell Phones & Accessories", value: "mobile" },
    { name: "Clothing, Shoes & Jewelry", value: "fashion" },
    { name: "Collectibles & Fine Art", value: "collectibles" },
    { name: "Computers", value: "computers" },
    { name: "Credit and Payment Cards", value: "financial" },
    { name: "Digital Music", value: "digital-music" },
    { name: "Electronics", value: "electronics" },
    { name: "Garden & Outdoor", value: "garden" },
    { name: "Gift Cards", value: "gift-cards" },
    { name: "Grocery & Gourmet Food", value: "grocery" },
    { name: "Handmade", value: "handmade" },
    { name: "Health, Household & Baby Care", value: "hpc" },
    { name: "Home & Kitchen", value: "home" },
    { name: "Industrial & Scientific", value: "industrial" },
    { name: "Kindle Store", value: "kindle" },
    { name: "Luggage & Travel Gear", value: "luggage" },
    { name: "Luxury Stores", value: "luxury" },
    { name: "Magazine Subscriptions", value: "magazines" },
    { name: "Movies & TV", value: "movies-tv" },
    { name: "Musical Instruments", value: "musical-instruments" },
    { name: "Office Products", value: "office-products" },
    { name: "Pet Supplies", value: "pets" },
    { name: "Premium Beauty", value: "premium-beauty" },
    { name: "Prime Video", value: "prime-video" },
    { name: "Smart Home", value: "smart-home" },
    { name: "Software", value: "software" },
    { name: "Sports & Outdoors", value: "sports" },
    { name: "Subscribe & Save", value: "subscribe-save" },
    { name: "Subscription Boxes", value: "subscription-boxes" },
    { name: "Tools & Home Improvement", value: "tools" },
    { name: "Toys & Games", value: "toys" },
    { name: "Video Games", value: "video-games" },
    { name: "Whole Foods Market", value: "whole-foods" },
];

export const languageOptions = {
    en: { label: "EN", flag: "/images/us.png" },
    fr: { label: "FR", flag: "/images/france.png" },
    es: { label: "ES", flag: "/images/spain.png" },
};

export const secondaryNavbarOptions = [
    { label: "Today's Deals", href: "/deals" },
    { label: "Customer Service", href: "/customer-service" },
    { label: "Registry", href: "/registry" },
    { label: "Gift Cards", href: "/gift-cards" },
    { label: "Sell", href: "/sell" },
    { label: "Prime", href: "/prime", highlight: true },
    { label: "Amazon Basics", href: "/amazon-basics" },
    { label: "New Releases", href: "/new-releases" },
    { label: "Books", href: "/books" },
    { label: "Pharmacy", href: "/pharmacy" },
    { label: "Music", href: "/music" },
    { label: "Amazon Home", href: "/amazon-home" },
    { label: "Fashion", href: "/fashion" },
    { label: "Kindle Books", href: "/kindle-books" },
    { label: "Toys & Games", href: "/toys-games" },
];

export const accountSections = [
    {
        title: "Your Orders",
        description:
            "Track, return, cancel an order, download invoice or buy again",
        imageURL: "/images/orders.png",
        href: "/orders",
    },
    {
        title: "Login & Security",
        description: "Edit login, name, and mobile number",
        imageURL: "/images/login-security.png",
        href: "/account/security",
    },
    {
        title: "Prime",
        description:
            "Manage your membership, view benefits and payment settings",
        imageURL: "/images/prime.png",
        href: "/prime",
    },
    {
        title: "Your Addresses",
        description: "Edit, remove or set default address",
        imageURL: "/images/addresses.png",
        href: "/account/address",
    },
    {
        title: "Your business account",
        description:
            "Cut accounting time in half:Automatic invoice transfers to your books",
        imageURL: "/images/business-account.png",
        href: "/account/business",
    },
    {
        title: "Gift cards",
        description:
            "View balance or redeem a card, and purchase a new Gift Card",
        imageURL: "/images/gift-cards.png",
        href: "/account/gifts",
    },
    {
        title: "Your Payments",
        description:
            "View all transactions, manage payment methods and settings",
        imageURL: "/images/payments.png",
        href: "/account/payments",
    },
    {
        title: "Your Amazon family",
        description: "Manage profiles, sharing and permissions in one place",
        imageURL: "/images/family.png",
        href: "/account/family",
    },
    {
        title: "Digital Services and Device Support",
        description:
            "Troubleshoot device issues, manage or cancel digital subscriptions",
        imageURL: "/images/digital-services.png",
        href: "/account/digital-services",
    },
    {
        title: "Archived Orders",
        description: "View and manage your archived orders",
        imageURL: "/images/archived-orders.png",
        href: "/account/archived-orders",
    },
    {
        title: "Your Lists",
        description: "View, modify and share your lists, or create new ones",
        imageURL: "/images/lists.png",
        href: "/lists",
    },
    {
        title: "Customer Service",
        description: "Browse self service options, help articles or contact us",
        imageURL: "/images/customer-service.png",
        href: "/account/customer-service",
    },
    {
        title: "Your Messages",
        description:
            "View or respond to messages from Amazon, Sellers and Buyers",
        imageURL: "/images/messages.jpg",
        href: "/account/messages",
    },
];

export const heroSlides = [
    {
        id: "1",
        title:"Gaming",
        image: "/images/gaming.jpg",
    },
    {
        id: "2",
        title: "Fashion",
        image: "/images/fashion.jpg",
    },
    {
        id: "3",
        title: "Kitchen",
        image: "/images/kitchen.jpg",
    },
    {
        id: "4",
        title: "Toys",
        image: "/images/toys.jpg",
    },
];
