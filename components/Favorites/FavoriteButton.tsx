'use client';

import React, { useState } from 'react';
import { Favorite, type FavoriteData } from '@/entities/Favorite';
import { User, type UserData } from '@/entities/User';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FavoriteButtonProps {
  itemId: string;
  userFavorites?: FavoriteData[];
  currentUser?: UserData | null;
  onFavoriteChange?: () => void | Promise<void>;
  size?: "default" | "sm";
}

export default function FavoriteButton({
  itemId,
  userFavorites = [],
  currentUser = null,
  onFavoriteChange,
  size = "default"
}: FavoriteButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const isFavorited = userFavorites.some((fav) => fav.item_id === itemId);

  const handleToggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      await User.login();
      return;
    }

    setIsProcessing(true);
    try {
      if (isFavorited) {
        const favorite = userFavorites.find((fav) => fav.item_id === itemId);
        if (favorite && favorite.id) {
          await Favorite.delete(favorite.id);
        }
      } else {
        // Handle both Clerk user object and UserData type
        const userEmail = (currentUser as any).email || 
                         (currentUser as any).emailAddresses?.[0]?.emailAddress ||
                         currentUser.email;
        await Favorite.create({
          user_email: userEmail,
          item_id: itemId
        });
      }
      
      if (onFavoriteChange) {
        await onFavoriteChange();
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const buttonSize = size === "sm" ? "w-7 h-7" : "w-8 h-8";
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleFavorite}
      disabled={isProcessing}
      className={`${buttonSize} bg-white/90 hover:bg-white rounded-full shadow-md backdrop-blur-sm transition-all duration-200`}
    >
      <Heart 
        className={`${iconSize} transition-all duration-200 ${
          isFavorited 
            ? 'fill-red-500 text-red-500' 
            : 'text-slate-600 hover:text-red-500'
        }`}
      />
    </Button>
  );
}