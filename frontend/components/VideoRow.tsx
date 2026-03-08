"use client";

import VideoCard from "./VideoCard";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

interface Props {
  title: string;
  videos: Video[];
}

export default function VideoRow({ title, videos }: Props) {
  return (
    <div className="px-10 mt-10">
      <h2 className="text-xl text-white mb-4">{title}</h2>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="min-w-[300px]"
          >
            <VideoCard
              id={video.id}
              title={video.title}
              thumbnail={video.thumbnail}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
