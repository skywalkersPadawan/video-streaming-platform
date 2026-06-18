"use client";

import Navbar from "@/components/Navbar";
import VideoRow from "@/components/VideoRow";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { useMyList } from "@/hooks/useMyList";
import Link from "next/link";

export default function MoviesPage() {
  const { myListIds, setMyListIds, toast, setToast } = useMyList();

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="pt-24 pb-10">
        <div className="px-4 sm:px-6 lg:px-10 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Movies</h1>
          <p className="text-zinc-400">
            Blockbusters, indie gems, and everything in between.{" "}
            <Link href="/browse" className="text-white hover:underline">
              Browse by genre
            </Link>
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <VideoRow
            title="Trending Movies"
            endpoint="/trending/movie/week"
            myListIds={myListIds}
            setMyListIds={setMyListIds}
            setToast={setToast}
          />
          <VideoRow
            title="Popular on NetStream"
            endpoint="/movie/popular"
            myListIds={myListIds}
            setMyListIds={setMyListIds}
            setToast={setToast}
          />
          <VideoRow
            title="Now Playing in Theaters"
            endpoint="/movie/now_playing"
            myListIds={myListIds}
            setMyListIds={setMyListIds}
            setToast={setToast}
          />
          <VideoRow
            title="Top Rated Movies"
            endpoint="/movie/top_rated"
            myListIds={myListIds}
            setMyListIds={setMyListIds}
            setToast={setToast}
          />
          <VideoRow
            title="Action & Adventure"
            endpoint="/discover/movie?with_genres=28,12"
            myListIds={myListIds}
            setMyListIds={setMyListIds}
            setToast={setToast}
          />
          <VideoRow
            title="Drama"
            endpoint="/discover/movie?with_genres=18"
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
