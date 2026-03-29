"use client";

import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import VideoRow from "../components/VideoRow";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <HeroBanner />

      <div className="space-y-8 px-10 py-6">
        <VideoRow
          title="Trending Now"
          endpoint="/trending/movie/week"
        />
        <VideoRow
          title="Top Rated"
          endpoint="/movie/top_rated"
        />
        <VideoRow
          title="Action Movies"
          endpoint="/discover/movie?with_genres=28"
        />
        <VideoRow
          title="Comedy Movies"
          endpoint="/discover/movie?with_genres=35"
        />
      </div>
    </main>
  );
}
