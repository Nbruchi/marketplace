"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";

type Location = {
    name: string;
    zipCode: string;
    country: string;
};

type LocationContextType = {
    location: Location;
    setLocation: (location: Location) => void;
};

const LocationContext = createContext<LocationContextType | undefined>(
    undefined
);

export function LocationProvider({ children }: { children: React.ReactNode }) {
    const [location, setLocationState] = useState<Location>({
        name: "Bruce",
        zipCode: "98101",
        country: "Rwanda",
    });

    // Load location from localStorage on mount
    useEffect(() => {
        const savedLocation = localStorage.getItem("location");
        if (savedLocation) {
            try {
                setLocationState(JSON.parse(savedLocation));
            } catch (error) {
                console.error(
                    "Failed to parse location from localStorage",
                    error
                );
            }
        }
    }, []);

    // Save location to localStorage when it changes
    const setLocation = (newLocation: Location) => {
        setLocationState(newLocation);
        localStorage.setItem("location", JSON.stringify(newLocation));
    };

    return (
        <LocationContext.Provider value={{ location, setLocation }}>
            {children}
        </LocationContext.Provider>
    );
}

export function useLocation() {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error("useLocation must be used within a LocationProvider");
    }
    return context;
}
