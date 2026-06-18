"use client";

import { use } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoRow from "@/components/VideoRow";
import Toast from "@/components/Toast";
import { useMyList } from "@/hooks/useMyList";
import { getGenreById } from "@/lib/genres";

export default function GenrePage({
  params,
}: {
  params: Promise<{ genreId: string }>;
}) {
  const { genreId } = use(params);
  const genre = getGenreById(Number(genreId));
  const { myListIds, setMyListIds, toast, setToast } = useMyList();

  if (!genre) {
    return (
      <main className="bg-black text-white min-h-screen">
        <Navbar />
        <div className="pt-24 px-4 text-center">
          <p className="text-zinc-400 mb-4">Genre not found.</p>
          <Link href="/browse" className="text-white hover:underline">
            Back to browse
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="pt-24 px-4 sm:px-6 lg:px-10 pb-10">
        <Link
          href="/browse"
          className="text-sm text-zinc-400 hover:text-white mb-4 inline-block"
        >
          ← All Genres
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">{genre.name}</h1>

        <div className="space-y-6 sm:space-y-8">
          <VideoRow
            title={`Popular ${genre.name}`}
            endpoint={`/discover/movie?with_genres=${genre.id}&sort_by=popularity.desc`}
            myListIds={myListIds}
            setMyListIds={setMyListIds}
            setToast={setToast}
          />
          <VideoRow
            title={`Top Rated ${genre.name}`}
            endpoint={`/discover/movie?with_genres=${genre.id}&sort_by=vote_average.desc&vote_count.gte=200`}
            myListIds={myListIds}
            setMyListIds={setMyListIds}
            setToast={setToast}
          />
          <VideoRow
            title={`New ${genre.name} Releases`}
            endpoint={`/discover/movie?with_genres=${genre.id}&sort_by=release_date.desc`}
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
