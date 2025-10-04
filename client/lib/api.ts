// API service for interacting with the backend
// This file contains functions for making API calls to the server

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Helper function for making API requests
async function fetchApi(endpoint: string, options: RequestInit = {}) {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, {
        ...options,
        credentials: 'include', // Include cookies in requests
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!response.ok) {
        // Handle error responses
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
    }

    return response.json();
}

// Product API functions
export const productApi = {
    // Get all products with optional filtering
    getProducts: async (params?: {
        keyword?: string;
        category?: string;
        page?: number;
        limit?: number;
        sort?: string;
    }) => {
        const queryParams = new URLSearchParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined) {
                    queryParams.append(key, value.toString());
                }
            });
        }

        const query = queryParams.toString()
            ? `?${queryParams.toString()}`
            : "";
        return fetchApi(`/products${query}`);
    },

    // Get a single product by ID or slug
    getProductById: async (id: string) => {
        return fetchApi(`/products/${id}`);
    },

    // Get top rated products
    getTopProducts: async () => {
        return fetchApi("/products/top");
    },

    // Create a product review
    createProductReview: async (
        productId: string,
        review: {
            rating: number;
            comment: string;
            title?: string;
        }
    ) => {
        return fetchApi(`/products/${productId}/reviews`, {
            method: "POST",
            body: JSON.stringify(review),
        });
    },
};

// Category API functions
export const categoryApi = {
    // Get all categories
    getCategories: async () => {
        // Note: This endpoint might need to be implemented on the server
        return fetchApi("/categories");
    },
};

// Cart API functions
export const cartApi = {
    // Get user's cart
    getCart: async () => {
        return fetchApi("/cart");
    },

    // Add item to cart
    addToCart: async (productId: string, quantity: number = 1) => {
        return fetchApi("/cart", {
            method: "POST",
            body: JSON.stringify({ productId, quantity }),
        });
    },

    // Update cart item quantity
    updateCartItem: async (itemId: string, quantity: number) => {
        return fetchApi(`/cart/${itemId}`, {
            method: "PUT",
            body: JSON.stringify({ quantity }),
        });
    },

    // Remove item from cart
    removeFromCart: async (itemId: string) => {
        return fetchApi(`/cart/${itemId}`, {
            method: "DELETE",
        });
    },
};

// Order API functions
export const orderApi = {
    // Create a new order
    createOrder: async (orderData: any) => {
        return fetchApi("/orders", {
            method: "POST",
            body: JSON.stringify(orderData),
        });
    },

    // Get user's orders
    getOrders: async () => {
        return fetchApi("/orders");
    },

    // Get order details
    getOrderById: async (id: string) => {
        return fetchApi(`/orders/${id}`);
    },
};

// Auth API functions
export const authApi = {
    // Login user
    login: async (email: string, password: string) => {
        const response = await fetchApi("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        // Token is handled by the server setting an HTTP-only cookie
        // The token cookie is set by the server in the response headers
        // The browser automatically stores this cookie and sends it with future requests
        // We only need to return the user data
        return response;
    },

    // Register user
    register: async (userData: {
        name: string;
        email: string;
        password: string;
    }) => {
        return fetchApi("/auth/register", {
            method: "POST",
            body: JSON.stringify(userData),
        });
    },

    // Get user profile
    getProfile: async () => {
        return fetchApi("/auth/profile");
    },

    // Update user profile
    updateProfile: async (userData: any) => {
        return fetchApi("/auth/profile", {
            method: "PUT",
            body: JSON.stringify(userData),
        });
    },

    // Logout
    logout: async () => {
        return fetchApi("/auth/logout", {
            method: "POST",
        });
    },

    requestOtp: async (email: string) => {
        return fetchApi("/auth/request-otp", {
            method: "POST",
            body: JSON.stringify({ email }),
        });
    },

    verifyOTP: async ({
        userId,
        otp,
        password,
    }: {
        userId: string;
        otp: string;
        password: string;
    }) => {
        return fetchApi("/auth/verify-otp", {
            method: "POST",
            body: JSON.stringify({ userId, otp, password }),
        });
    },
};

// Wishlist API functions
export const wishlistApi = {
    // Get user's wishlist
    getWishlist: async () => {
        return fetchApi("/wishlist");
    },

    // Add item to wishlist
    addToWishlist: async (productId: string) => {
        return fetchApi("/wishlist", {
            method: "POST",
            body: JSON.stringify({ productId }),
        });
    },

    // Remove item from wishlist
    removeFromWishlist: async (itemId: string) => {
        return fetchApi(`/wishlist/${itemId}`, {
            method: "DELETE",
        });
    },

    // Clear wishlist
    clearWishlist: async () => {
        return fetchApi("/wishlist", {
            method: "DELETE",
        });
    },
};

// Review API functions
export const reviewApi = {
    // Get all reviews
    getReviews: async (params?: {
        productId?: string;
        userId?: string;
        page?: number;
        limit?: number;
    }) => {
        const queryParams = new URLSearchParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined) {
                    queryParams.append(key, value.toString());
                }
            });
        }

        const query = queryParams.toString()
            ? `?${queryParams.toString()}`
            : "";
        return fetchApi(`/reviews${query}`);
    },

    // Get review by ID
    getReviewById: async (id: string) => {
        return fetchApi(`/reviews/${id}`);
    },

    // Update a review
    updateReview: async (
        id: string,
        reviewData: {
            rating?: number;
            title?: string;
            content?: string;
        }
    ) => {
        return fetchApi(`/reviews/${id}`, {
            method: "PUT",
            body: JSON.stringify(reviewData),
        });
    },

    // Delete a review
    deleteReview: async (id: string) => {
        return fetchApi(`/reviews/${id}`, {
            method: "DELETE",
        });
    },

    // Mark a review as helpful
    markReviewHelpful: async (id: string) => {
        return fetchApi(`/reviews/${id}/helpful`, {
            method: "POST",
        });
    },
};

// Export a default API object with all services
const api = {
    product: productApi,
    category: categoryApi,
    cart: cartApi,
    order: orderApi,
    auth: authApi,
    wishlist: wishlistApi,
    review: reviewApi,
};

export default api;
