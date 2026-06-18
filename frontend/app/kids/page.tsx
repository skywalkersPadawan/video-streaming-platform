"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import VideoRow from "@/components/VideoRow";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { useMyList } from "@/hooks/useMyList";
import { fetchMovies, type Movie } from "@/lib/tmdb";

export default function KidsPage() {
  const { myListIds, setMyListIds, toast, setToast } = useMyList();
  const [featured, setFeatured] = useState<Movie | null>(null);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const movies = await fetchMovies(
          "/discover/movie?with_genres=10751&sort_by=popularity.desc",
        );
        const pick = movies.find((m) => m.backdrop_path) ?? movies[0];
        setFeatured(pick ?? null);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  const title = featured?.title || featured?.name || "Kids";

  return (
    <main className="bg-gradient-to-b from-sky-950 to-black text-white min-h-screen">
      <Navbar variant="kids" />
      <div className="pt-20">
        {featured?.backdrop_path && (
          <div className="relative h-[40vh] sm:h-[50vh] w-full flex items-end overflow-hidden">
            <Image
              src={`https://image.tmdb.org/t/p/original${featured.backdrop_path}`}
              alt={title}
              fill
              className="object-cover object-top"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-sky-950/50 to-transparent" />
            <div className="relative z-10 p-4 sm:p-8 max-w-xl">
              <span className="inline-block bg-sky-500 text-white text-xs font-bold px-2 py-1 rounded mb-3">
                KIDS
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold">{title}</h1>
              <p className="mt-2 text-sm sm:text-base text-sky-100/80 line-clamp-2">
                {featured.overview}
              </p>
              <button
                type="button"
                onClick={() => router.push(`/watch/${featured.id}`)}
                className="mt-4 bg-white text-sky-900 px-5 py-2 rounded font-semibold hover:bg-sky-50 text-sm"
              >
                ▶ Watch Now
              </button>
            </div>
          </div>
        )}

        <div className="px-4 sm:px-6 lg:px-10 py-6">
          <Link
            href="/profile"
            className="text-sm text-sky-300 hover:text-white mb-6 inline-block"
          >
            ← Switch Profile
          </Link>
        </div>

        <div className="space-y-6 sm:space-y-8 pb-10">
          <VideoRow
            title="Family Favorites"
            endpoint="/discover/movie?with_genres=10751&sort_by=popularity.desc"
            myListIds={myListIds}
            setMyListIds={setMyListIds}
            setToast={setToast}
          />
          <VideoRow
            title="Animated Adventures"
            endpoint="/discover/movie?with_genres=16&certification_country=US&certification.lte=PG"
            myListIds={myListIds}
            setMyListIds={setMyListIds}
            setToast={setToast}
          />
          <VideoRow
            title="Kids TV Shows"
            endpoint="/discover/tv?with_genres=10762"
            myListIds={myListIds}
            setMyListIds={setMyListIds}
            setToast={setToast}
          />
          <VideoRow
            title="Musicals & Sing-Alongs"
            endpoint="/discover/movie?with_genres=10402,10751"
            myListIds={myListIds}
            setMyListIds={setMyListIds}
            setToast={setToast}
          />
        </div>
      </div>
      <Footer />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </main>
  );
}
