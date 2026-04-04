"use client";

import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import VideoRow from "../components/VideoRow";
import { useState, useEffect } from "react";
import { getMyList } from "@/lib/api";

export default function Home() {
  const [myListIds, setMyListIds] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMyList();
        setMyListIds(data.map((item: any) => item.movieId));
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <HeroBanner />

      <div className="space-y-8 px-10 py-6">
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
      {toast && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded shadow-lg z-[9999]">
          {toast}
        </div>
      )}
    </main>
  );
}
