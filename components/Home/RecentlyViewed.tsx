"use client";

import React, { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import ItemCard from '@/components/Items/ItemCard';
import { Clock } from 'lucide-react';
import { FavoriteData } from '@/entities/Favorite';

interface RecentlyViewedProps {
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

export default function RecentlyViewed({ onFavoriteChange }: RecentlyViewedProps) {
  const { user: currentUser, isLoaded: userLoaded } = useUser();
  const { isSignedIn } = useAuth();
  const [recentItems, setRecentItems] = useState<Item[]>([]);
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
      ];

      setRecentItems(mockItems);

      // Get favorites from localStorage if available
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
  if (isLoading || recentItems.length === 0) {
    return null;
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-900">Recently Viewed</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {recentItems.map((item) => (
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
