"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { authApi } from "@/lib/api";

interface User {
    id: string;
    name: string;
    email: string;
    profilePicture?: string;
    role?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // Try to get a user profile using the auth token cookie
                const userProfile = await authApi.getProfile();
                if (userProfile && userProfile.user) {
                    setUser(userProfile.user);
                    setIsAuthenticated(true);
                    localStorage.setItem("user", JSON.stringify(userProfile.user));
                } else {
                    // Fallback to localStorage if the API call fails
                    const storedUser = localStorage.getItem("user");
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                        setIsAuthenticated(true);
                    }
                }
            } catch (error) {
                // API call failed, clear any potentially invalid data
                console.error('Auth check failed:', error);
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem("user");
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const res = await authApi.login(email, password);
            if (res && res.user) {
                setUser(res.user);
                setIsAuthenticated(true);
                localStorage.setItem("user", JSON.stringify(res.user));
            } else {
                throw new Error(res?.message || "Login failed");
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            const res = await authApi.logout();
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem("user");
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setLoading(false);
        }
    };

    const setUser = (user: User | null) => {
        setUserState(user);

        if (user) {
            localStorage.setItem(`user`, JSON.stringify(user));
        } else {
            localStorage.removeItem(`user`);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, setUser, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
