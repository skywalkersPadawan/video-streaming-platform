"use client";

import Link from "next/link";

interface Props {
  id: string;
  title: string;
  thumbnail: string;
}

export default function VideoCard({ id, title, thumbnail }: Props) {
  return (
    <Link href={`/watch/${id}`}>
      <div className="group relative min-w-[220px] cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:z-30">
        {/* Thumbnail */}
        <div className="overflow-hidden rounded-lg shadow-md group-hover:shadow-2xl">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-[130px] object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg flex flex-col justify-end p-3">
          {/* Title */}
          <p className="text-white text-sm font-semibold">{title}</p>

          {/* Fake controls (Netflix vibe) */}
          <div className="flex gap-2 mt-2">
            <span className="bg-white text-black text-xs px-2 py-1 rounded">
              ▶ Play
            </span>
            <span className="bg-gray-700 text-xs px-2 py-1 rounded">
              + List
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
