"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOVIE_GENRES } from "@/lib/genres";

export default function BrowsePage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="pt-24 px-4 sm:px-6 lg:px-10 pb-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Browse by Genre</h1>
        <p className="text-zinc-400 mb-8">
          Explore movies organized by your favorite genres.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {MOVIE_GENRES.map((genre) => (
            <Link
              key={genre.id}
              href={`/browse/${genre.id}`}
              className={`group relative aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br ${genre.gradient} flex items-end p-3 sm:p-4 hover:ring-2 hover:ring-white/50 transition-all hover:scale-[1.03]`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <span className="relative text-sm sm:text-base font-bold text-white drop-shadow-lg">
                {genre.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
