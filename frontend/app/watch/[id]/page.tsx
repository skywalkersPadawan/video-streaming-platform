"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";

export default function Watch() {
  const params = useParams(); // ✅ make a note of this in the save repo this is the correct way to access params
  const id = params.id as string;

  const [video, setVideo] = useState<any>(null);

  useEffect(() => {
    async function loadVideo() {
      const res = await fetch("http://localhost:3001/videos");
      const data = await res.json();

      const found = data.find((v: any) => v.id === id);
      setVideo(found);
    }

    if (id) loadVideo();
  }, [id]);

  if (!video) return <p className="text-white p-10">Loading...</p>;

  return (
    <div className="p-10">
      <VideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" />
    </div>
  );
}
