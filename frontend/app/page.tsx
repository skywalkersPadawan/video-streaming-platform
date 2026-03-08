"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import VideoRow from "../components/VideoRow";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    async function loadVideos() {
      const res = await fetch("http://localhost:3001/videos");
      const data = await res.json();
      setVideos(data);
    }

    loadVideos();
  }, []);

  if (!videos.length) return <p>Loading...</p>;

  const featured = videos[0];

  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />

      <HeroBanner
        title={featured.title}
        description={featured.description}
        image={featured.thumbnail || "https://picsum.photos/1200/500"}
      />

      <VideoRow
        title="Trending Now"
        videos={videos}
      />

      <VideoRow
        title="New Releases"
        videos={videos}
      />
    </main>
  );
}
