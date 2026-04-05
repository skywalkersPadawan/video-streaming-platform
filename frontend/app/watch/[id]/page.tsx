"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Hls from "hls.js";
import { saveProgress, getProgress } from "@/lib/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type TmdbVideo = {
  type: string;
  site: string;
  key: string;
};

export default function PlayerPage() {
  const { id } = useParams();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const movieId = Number(id);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const init = async () => {
      // Load previous progress
      const progressData = await getProgress(movieId);

      const savedTime = progressData?.progress || 0;

      video.onloadedmetadata = () => {
        if (savedTime > 0) {
          video.currentTime = savedTime;
        }
      };

      const streamUrl = `${BASE_URL}/streams/${movieId}/master.m3u8`;

      try {
        const res = await fetch(streamUrl, { method: "HEAD" });

        if (res.ok) {
          if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = streamUrl;
          } else if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(streamUrl);
            hls.attachMedia(video);
          }

          video.onloadedmetadata = () => {
            if (savedTime > 0) {
              video.currentTime = savedTime;
            }
          };

          // throttled progress saving
          let lastSaved = 0;

          video.addEventListener("timeupdate", () => {
            if (video.currentTime - lastSaved > 5) {
              lastSaved = video.currentTime;
              saveProgress(movieId, video.currentTime);
            }
          });
        } else {
          await fetchTrailer();
        }
      } catch {
        await fetchTrailer();
      }
    };

    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        );

        const data = (await res.json()) as { results?: TmdbVideo[] };

        const trailer = data.results?.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube",
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (err) {
        console.error("Trailer fetch failed:", err);
      }
    };

    init();
  }, [movieId]);

  return (
    <div className="bg-black h-screen flex items-center justify-center">
      {trailerKey ? (
        <iframe
          title="Movie trailer"
          className="w-[80%] h-[70%] rounded"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <video
          ref={videoRef}
          controls
          autoPlay
          className="w-[80%] rounded"
        />
      )}
    </div>
  );
}
