"use client";

import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";

interface Video {
  id: string;
  title: string;
  description: string;
  streamUrl: string;
}

export default function Home() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    async function loadVideos() {
      const res = await fetch("http://localhost:3001/videos");
      const data: Video[] = await res.json();

      if (data.length > 0) {
        setVideoUrl("http://localhost:3001" + data[0].streamUrl);
      }
    }

    loadVideos();
  }, []);

  if (!videoUrl) return <p>Loading video...</p>;

  return (
    <main style={{ padding: 40 }}>
      <h1>Streaming Test</h1>

      <VideoPlayer src={videoUrl} />
    </main>
  );
}
