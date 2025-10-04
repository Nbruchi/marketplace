"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

// Define available languages
const languages = ["en", "fr","es"] as const
type Language = (typeof languages)[number]

// Define translations
const translations = {
  en: {
    // Navbar
    search_placeholder: "Search products, brands, and categories...",
    voice_search: "Voice search",
    search: "Search",
    language: "Language",
    light: "Light",
    dark: "Dark",
    system: "System",
    account: "Account",
    login: "Login",
    register: "Register",
    profile: "Profile",
    orders: "Orders",
    wishlist: "Wishlist",
    cart: "Cart",
    categories: "Categories",
    light_mode: "Light Mode",
    dark_mode: "Dark Mode",

    // Categories
    electronics: "Electronics",
    clothing: "Clothing",
    books: "Books",
    home: "Home & Kitchen",
    toys: "Toys & Games",
    sports: "Sports & Outdoors",
    beauty: "Beauty & Personal Care",
    grocery: "Grocery",

    // Product
    add_to_cart: "Add to Cart",
    add_to_wishlist: "Add to Wishlist",
    buy_now: "Buy Now",
    in_stock: "In Stock",
    out_of_stock: "Out of Stock",
    free_delivery: "Free Delivery",
    reviews: "Reviews",
    description: "Description",
    specifications: "Specifications",
    related_products: "Related Products",

    // Cart
    added_to_cart: "Added to cart",
    removed_from_cart: "Removed from cart",
    cart_cleared: "Cart cleared",

    // Footer
    newsletter_title: "Subscribe to our newsletter",
    newsletter_description: "Get the latest updates on new products and upcoming sales",
    email_placeholder: "Enter your email",
    subscribe: "Subscribe",
    free_shipping: "Free Shipping",
    free_shipping_text: "On orders over $50",
    secure_payment: "Secure Payment",
    secure_payment_text: "100% secure payment",
    money_back: "Money Back",
    money_back_text: "30 days guarantee",
    support: "24/7 Support",
    support_text: "Dedicated support",
    shop: "Shop",
    deals: "Today's Deals",
    bestsellers: "Best Sellers",
    new_releases: "New Releases",
    customer_service: "Customer Service",
    your_account: "Your Account",
    your_orders: "Your Orders",
    returns: "Returns & Replacements",
    help: "Help",
    about: "About",
    about_us: "About Us",
    careers: "Careers",
    press: "Press Releases",
    blog: "Blog",
    download_app: "Download Our App",
    download_on: "Download on",
    all_rights_reserved: "All rights reserved.",
    privacy_policy: "Privacy Policy",
    terms_of_service: "Terms of Service",
    cookie_policy: "Cookie Policy",
    footer_description: "Your one-stop shop for all your shopping needs with unbeatable prices and quality products.",
  },
  fr: {
    // Navbar
    search_placeholder: "Rechercher produits, marques et catégories...",
    voice_search: "Recherche vocale",
    search: "Rechercher",
    language: "Langue",
    light: "Clair",
    dark: "Sombre",
    system: "Système",
    account: "Compte",
    login: "Connexion",
    register: "S'inscrire",
    profile: "Profil",
    orders: "Commandes",
    wishlist: "Liste d'envies",
    cart: "Panier",
    categories: "Catégories",
    light_mode: "Mode Clair",
    dark_mode: "Mode Sombre",

    // Categories
    electronics: "Électronique",
    clothing: "Vêtements",
    books: "Livres",
    home: "Maison & Cuisine",
    toys: "Jouets & Jeux",
    sports: "Sports & Plein air",
    beauty: "Beauté & Soins",
    grocery: "Épicerie",

    // Product
    add_to_cart: "Ajouter au panier",
    add_to_wishlist: "Ajouter à la liste",
    buy_now: "Acheter maintenant",
    in_stock: "En stock",
    out_of_stock: "Rupture de stock",
    free_delivery: "Livraison gratuite",
    reviews: "Avis",
    description: "Description",
    specifications: "Spécifications",
    related_products: "Produits associés",

    // Cart
    added_to_cart: "Ajouté au panier",
    removed_from_cart: "Retiré du panier",
    cart_cleared: "Panier vidé",

    // Footer
    newsletter_title: "Abonnez-vous à notre newsletter",
    newsletter_description: "Recevez les dernières mises à jour sur les nouveaux produits et les promotions à venir",
    email_placeholder: "Entrez votre email",
    subscribe: "S'abonner",
    free_shipping: "Livraison Gratuite",
    free_shipping_text: "Pour les commandes de plus de 50€",
    secure_payment: "Paiement Sécurisé",
    secure_payment_text: "Paiement 100% sécurisé",
    money_back: "Remboursement",
    money_back_text: "Garantie de 30 jours",
    support: "Support 24/7",
    support_text: "Support dédié",
    shop: "Boutique",
    deals: "Offres du jour",
    bestsellers: "Meilleures ventes",
    new_releases: "Nouveautés",
    customer_service: "Service client",
    your_account: "Votre compte",
    your_orders: "Vos commandes",
    returns: "Retours & Remplacements",
    help: "Aide",
    about: "À propos",
    about_us: "À propos de nous",
    careers: "Carrières",
    press: "Communiqués de presse",
    blog: "Blog",
    download_app: "Téléchargez notre application",
    download_on: "Télécharger sur",
    all_rights_reserved: "Tous droits réservés.",
    privacy_policy: "Politique de confidentialité",
    terms_of_service: "Conditions d'utilisation",
    cookie_policy: "Politique des cookies",
    footer_description:
      "Votre guichet unique pour tous vos besoins d'achat avec des prix imbattables et des produits de qualité.",
  },
  es: {
    // Navbar
    search_placeholder: "Buscar productos, marcas y categorías...",
    voice_search: "Búsqueda por voz",
    search: "Buscar",
    language: "Idioma",
    light: "Claro",
    dark: "Oscuro",
    system: "Sistema",
    account: "Cuenta",
    login: "Iniciar sesión",
    register: "Registrarse",
    profile: "Perfil",
    orders: "Pedidos",
    wishlist: "Lista de deseos",
    cart: "Carrito",
    categories: "Categorías",
    light_mode: "Modo Claro",
    dark_mode: "Modo Oscuro",

    // Categories
    electronics: "Electrónica",
    clothing: "Ropa",
    books: "Libros",
    home: "Hogar y Cocina",
    toys: "Juguetes y Juegos",
    sports: "Deportes y Aire Libre",
    beauty: "Belleza y Cuidado Personal",
    grocery: "Comestibles",

    // Product
    add_to_cart: "Añadir al carrito",
    add_to_wishlist: "Añadir a la lista",
    buy_now: "Comprar ahora",
    in_stock: "En stock",
    out_of_stock: "Agotado",
    free_delivery: "Envío gratis",
    reviews: "Reseñas",
    description: "Descripción",
    specifications: "Especificaciones",
    related_products: "Productos relacionados",

    // Cart
    added_to_cart: "Añadido al carrito",
    removed_from_cart: "Eliminado del carrito",
    cart_cleared: "Carrito vaciado",

    // Footer
    newsletter_title: "Suscríbete a nuestro boletín",
    newsletter_description: "Recibe las últimas novedades sobre nuevos productos y próximas ofertas",
    email_placeholder: "Introduce tu correo electrónico",
    subscribe: "Suscribirse",
    free_shipping: "Envío gratis",
    free_shipping_text: "En pedidos superiores a $50",
    secure_payment: "Pago seguro",
    secure_payment_text: "Pago 100% seguro",
    money_back: "Devolución de dinero",
    money_back_text: "Garantía de 30 días",
    support: "Soporte 24/7",
    support_text: "Soporte dedicado",
    shop: "Tienda",
    deals: "Ofertas de hoy",
    bestsellers: "Más vendidos",
    new_releases: "Novedades",
    customer_service: "Atención al cliente",
    your_account: "Tu cuenta",
    your_orders: "Tus pedidos",
    returns: "Devoluciones y reemplazos",
    help: "Ayuda",
    about: "Acerca de",
    about_us: "Sobre nosotros",
    careers: "Carreras",
    press: "Notas de prensa",
    blog: "Blog",
    download_app: "Descarga nuestra app",
    download_on: "Descargar en",
    all_rights_reserved: "Todos los derechos reservados.",
    privacy_policy: "Política de privacidad",
    terms_of_service: "Términos de servicio",
    cookie_policy: "Política de cookies",
    footer_description: "Tu tienda integral para todas tus necesidades de compra con precios inmejorables y productos de calidad.",
  },
}

type TranslationKeys = keyof typeof translations.en
type TranslationsType = Record<TranslationKeys, string>

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKeys) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && languages.includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  // Translation function
  const t = (key: TranslationKeys): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
