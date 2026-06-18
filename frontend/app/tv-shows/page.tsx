"use client";

import Navbar from "@/components/Navbar";
import VideoRow from "@/components/VideoRow";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { useMyList } from "@/hooks/useMyList";

export default function TvShowsPage() {
  const { myListIds, setMyListIds, toast, setToast } = useMyList();

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="pt-24 pb-10">
        <div className="px-4 sm:px-6 lg:px-10 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">TV Shows</h1>
          <p className="text-zinc-400">
            Binge-worthy series, documentaries, and limited runs.
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <VideoRow
            title="Trending TV Shows"
            endpoint="/trending/tv/week"
            myListIds={myListIds}
            setMyListIds={setMyListIds}
            setToast={setToast}
          />
          <VideoRow
            title="Popular TV Shows"
            endpoint="/tv/popular"
            myListIds={myListIds}
            setMyListIds={setMyListIds}
            setToast={setToast}
          />
          <VideoRow
            title="Top Rated Series"
            endpoint="/tv/top_rated"
            myListIds={myListIds}
            setMyListIds={setMyListIds}
            setToast={setToast}
          />
          <VideoRow
            title="Crime Dramas"
            endpoint="/discover/tv?with_genres=80"
            myListIds={myListIds}
            setMyListIds={setMyListIds}
            setToast={setToast}
          />
          <VideoRow
            title="Comedy Series"
            endpoint="/discover/tv?with_genres=35"
            myListIds={myListIds}
            setMyListIds={setMyListIds}
            setToast={setToast}
          />
          <VideoRow
            title="Sci-Fi & Fantasy"
            endpoint="/discover/tv?with_genres=10765"
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
