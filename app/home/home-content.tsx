"use client";

import { useState } from "react";
import Link from "next/link";
import HowItWorks from "@/components/Home/HowItWorks";
import RecentlyViewed from "@/components/Home/RecentlyViewed";
import FeaturedItems from "@/components/Home/FeaturedItems";
import Testerminal from "@/components/Home/Testerminal";
import TrustBadges from "@/components/Home/TrustBadge";
import ItemFilters from "@/components/Items/ItemFilters";
import { useLanguage } from "@/components/Language/LanguageContext";

type CategoryValue = "all" | "electronics" | "tools" | "fashion" | "sports" | "vehicles" | "home" | "books" | "music" | "photography" | "other";
type SortByType = "relevance" | "price_low" | "price_high" | "rating" | "newest" | "popular";
type AvailabilityFilterType = "all" | "available" | "unavailable";
type ViewType = "list" | "map";

export default function HomeContent() {
  const { t } = useLanguage();
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [locationQuery, setLocationQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryValue>("all");
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: "", max: "" });
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilterType>("all");
  const [distanceFilter, setDistanceFilter] = useState<{ enabled: boolean; maxDistance: number; centerLocation: string }>({
    enabled: false,
    maxDistance: 10,
    centerLocation: ""
  });
  const [dateFilter, setDateFilter] = useState<{ enabled: boolean; start_date: string; end_date: string }>({
    enabled: false,
    start_date: "",
    end_date: ""
  });
  const [ratingFilter, setRatingFilter] = useState<{ enabled: boolean; min_rating: number }>({
    enabled: false,
    min_rating: 4
  });
  const [sortBy, setSortBy] = useState<SortByType>("relevance");
  const [view, setView] = useState<ViewType>("list");
  const [locationError, setLocationError] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Dark Section - Hero */}
      <div className="flex-1 bg-[#1A1E28] flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            {t('home.heroTitle')}
          </h1>

          {/* Sub-headline with colored text */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            {(() => {
              const highlight = t('home.heroHighlight');
              const parts = highlight.split('. ');
              return (
                <>
                  <span className="text-[#F78B5D]">{parts[0]}.</span>{" "}
                  <span className="text-[#E76F7F]">{parts[1] || ''}</span>
                </>
              );
            })()}
          </h2>

          {/* Descriptive Paragraph */}
          <p className="text-lg md:text-xl text-white mb-12 max-w-2xl mx-auto">
            {t('home.heroSubtitle')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {/* Left Button - 3 items available */}
            <button className="flex items-center justify-center gap-3 px-6 py-4 bg-[#333741] border border-white rounded-lg hover:bg-[#3d4451] transition-colors">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <span className="text-white font-medium">3 {t('home.itemsAvailable')}</span>
            </button>

            {/* Right Button - Growing community */}
            <button className="flex items-center justify-center gap-3 px-6 py-4 bg-[#333741] border border-white rounded-lg hover:bg-[#3d4451] transition-colors">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span className="text-white font-medium">{t('home.growingCommunity')}</span>
            </button>
          </div>

          {/* Footer Links */}
          <div className="flex items-center justify-center gap-2 text-sm text-white">
            <Link
              href="/privacy-policy"
              className="hover:text-gray-300 transition-colors"
            >
              {t('common.privacyPolicy')}
            </Link>
            <span className="text-white">•</span>
            <Link
              href="/contact"
              className="hover:text-gray-300 transition-colors"
            >
              {t('common.contactUs')}
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Badges Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBadges />
        </div>
      </div>
      
      {/* Item Filters Section */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ItemFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            locationQuery={locationQuery}
            setLocationQuery={setLocationQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            availabilityFilter={availabilityFilter}
            setAvailabilityFilter={setAvailabilityFilter}
            distanceFilter={distanceFilter}
            setDistanceFilter={setDistanceFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            ratingFilter={ratingFilter}
            setRatingFilter={setRatingFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            locationError={locationError}
            view={view}
            setView={setView}
          />
        </div>
      </div>
      
      {/* Recently Viewed Section */}
      <RecentlyViewed />
      {/* Featured Items Section */}
      <FeaturedItems />
      {/* How It Works Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HowItWorks />
        </div>
      </div>
      {/* Testerminal Section  */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Testerminal />
        </div>
      </div>

    </div>
  );
}
