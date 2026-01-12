"use client";

import React, { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import ItemCard from '@/components/Items/ItemCard';
import { Star } from 'lucide-react';
import { FavoriteData } from '@/entities/Favorite';

interface FeaturedItemsProps {
  onFavoriteChange?: () => void;
}

interface Item {
  id: string;
  title: string;
  description?: string;
  category: string;
  location?: string;
  daily_rate: number;
  availability: boolean;
  instant_booking?: boolean;
  images?: string[];
  videos?: string[];
  view_count?: number;
  favorite_count?: number;
  created_date?: string;
  [key: string]: any;
}

export default function FeaturedItems({ onFavoriteChange }: FeaturedItemsProps) {
  const { user: currentUser, isLoaded: userLoaded } = useUser();
  const { isSignedIn } = useAuth();
  const [featuredItems, setFeaturedItems] = useState<Item[]>([]);
  const [userFavorites, setUserFavorites] = useState<FavoriteData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userLoaded && isSignedIn) {
      // Frontend-only: Use mock data for demonstration
      const mockItems: Item[] = [
        {
          id: "1",
          title: "Pressure washer",
          category: "tools",
          location: "Pozuelo",
          daily_rate: 10,
          availability: true,
          instant_booking: true,
          images: ["https://images.unsplash.com/photo-1628177142898-93e36b4afd25?w=400&h=500&fit=crop"],
        },
        {
          id: "2",
          title: "Drone",
          category: "electronics",
          location: "Paris",
          daily_rate: 25,
          availability: true,
          instant_booking: true,
          images: ["https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=500&fit=crop"],
        },
        {
          id: "3",
          title: "Skis",
          category: "sports",
          location: "Madrid",
          daily_rate: 15,
          availability: true,
          instant_booking: true,
          images: ["https://images.unsplash.com/photo-1551524164-6cf77f5e7f8b?w=400&h=500&fit=crop"],
        },
      ];

      setFeaturedItems(mockItems);

      // Get favorites from localStorage if available
      // Set the first item (Pressure washer) as favorited for demo
      try {
        if (currentUser && typeof window !== 'undefined') {
          const userEmail = currentUser.emailAddresses[0]?.emailAddress;
          if (userEmail) {
            const favoritesKey = `favorites_${userEmail}`;
            const storedFavorites = localStorage.getItem(favoritesKey);
            
            if (storedFavorites) {
              const favorites: FavoriteData[] = JSON.parse(storedFavorites);
              setUserFavorites(favorites);
            } else {
              // Set first item as favorited for demo
              const userEmail = currentUser.emailAddresses[0]?.emailAddress || "";
              if (userEmail) {
                const demoFavorites: FavoriteData[] = [
                  {
                    id: "fav_1",
                    user_email: userEmail,
                    item_id: "1",
                    created_at: new Date().toISOString(),
                  },
                ];
                setUserFavorites(demoFavorites);
              }
            }
          }
        }
      } catch (error) {
        console.log('Could not load favorites:', error);
      }
      
      setIsLoading(false);
    } else if (userLoaded && !isSignedIn) {
      setIsLoading(false);
    }
  }, [userLoaded, isSignedIn, currentUser]);

  const handleFavoriteChange = async () => {
    if (onFavoriteChange) {
      await onFavoriteChange();
    }
    // Reload favorites from localStorage
    try {
      if (currentUser && typeof window !== 'undefined') {
        const userEmail = currentUser.emailAddresses[0]?.emailAddress;
        if (userEmail) {
          const favoritesKey = `favorites_${userEmail}`;
          const storedFavorites = localStorage.getItem(favoritesKey);
          
          if (storedFavorites) {
            const favorites: FavoriteData[] = JSON.parse(storedFavorites);
            setUserFavorites(favorites);
          }
        }
      }
    } catch (error) {
      console.log('Could not load favorites:', error);
    }
  };

  // Don't show if not loaded or not signed in
  if (!userLoaded || !isSignedIn) {
    return null;
  }

  // Don't show if still loading or no items
  if (isLoading || featuredItems.length === 0) {
    return null;
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <Star className="w-5 h-5 text-purple-600 fill-purple-600" />
          <h2 className="text-lg font-semibold text-slate-900">Featured Items</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {featuredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              userFavorites={userFavorites}
              currentUser={currentUser}
              onFavoriteChange={handleFavoriteChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

