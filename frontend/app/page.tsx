"use client";

import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import VideoRow from "@/components/VideoRow";
import ContinueWatchingRow from "@/components/ContinueWatchingRow";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { useMyList } from "@/hooks/useMyList";

export default function Home() {
  const { myListIds, setMyListIds, toast, setToast } = useMyList();

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <HeroBanner
        myListIds={myListIds}
        setMyListIds={setMyListIds}
        setToast={setToast}
      />

      <div className="space-y-6 sm:space-y-8 py-6">
        <ContinueWatchingRow />
        <VideoRow
          title="Top 10 Movies Today"
          endpoint="/trending/movie/day"
          variant="top10"
          myListIds={myListIds}
          setMyListIds={setMyListIds}
          setToast={setToast}
        />
        <VideoRow
          title="Trending Now"
          endpoint="/trending/movie/week"
          myListIds={myListIds}
          setMyListIds={setMyListIds}
          setToast={setToast}
        />
        <VideoRow
          title="Top Rated"
          endpoint="/movie/top_rated"
          myListIds={myListIds}
          setMyListIds={setMyListIds}
          setToast={setToast}
        />
        <VideoRow
          title="Action Movies"
          endpoint="/discover/movie?with_genres=28"
          myListIds={myListIds}
          setMyListIds={setMyListIds}
          setToast={setToast}
        />
        <VideoRow
          title="Comedy Movies"
          endpoint="/discover/movie?with_genres=35"
          myListIds={myListIds}
          setMyListIds={setMyListIds}
          setToast={setToast}
        />
      </div>

      <Footer />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </main>
  );
}
