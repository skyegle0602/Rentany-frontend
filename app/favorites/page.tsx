import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function FavoritesPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/auth/signin");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Browse
        </button>
        <div className="flex items-center gap-3">
          <svg
            className="h-8 w-8 text-red-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
        </div>
        <p className="mt-2 text-gray-600">0 items saved</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500">No favorites yet. Start browsing to add items to your favorites!</p>
      </div>
    </div>
  );
}

