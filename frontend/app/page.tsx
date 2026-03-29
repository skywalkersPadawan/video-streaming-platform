"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import VideoRow from "../components/VideoRow";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <HeroBanner />

      <div className="space-y-8 px-10 py-6">
        <VideoRow
          title="Trending Now"
          videos={videos}
        />
        <VideoRow
          title="New Releases"
          videos={videos}
        />
      </div>
    </main>
  );
}
