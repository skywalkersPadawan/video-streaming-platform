"use client";

import { useEffect, useState } from "react";
import VideoPlayer from "../../../components/VideoPlayer";

interface Video {
  id: string;
  title: string;
  description: string;
  streamUrl: string;
}

export default function Watch({ params }: { params: { id: string } }) {
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    async function loadVideo() {
      const res = await fetch("http://localhost:3001/videos");
      const data: Video[] = await res.json();

      const found = data.find((v) => v.id === params.id);
      if (found) setVideo(found);
    }

    loadVideo();
  }, [params.id]);

  if (!video) return <p>Loading...</p>;

  const src = "http://localhost:3001" + video.streamUrl;

  return (
    <main style={{ padding: 40 }}>
      <h1>{video.title}</h1>

      <VideoPlayer src={src} />

      <p style={{ marginTop: 20 }}>{video.description}</p>
    </main>
  );
}
