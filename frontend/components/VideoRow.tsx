"use client";

import VideoCard from "./VideoCard";

interface Props {
  title: string;
  videos: any[];
}

export default function VideoRow({ title, videos }: Props) {
  return (
    <div className="space-y-3">
      {/* Section Title */}
      <h2 className="text-xl md:text-2xl font-bold px-2">{title}</h2>

      {/* Row */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-2 py-2">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            id={video.id}
            title={video.title}
            thumbnail={video.thumbnail}
          />
        ))}
      </div>
    </div>
  );
}
