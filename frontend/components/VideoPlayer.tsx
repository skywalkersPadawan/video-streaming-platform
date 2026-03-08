"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface Props {
  src: string;
}

export default function VideoPlayer({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Safari supports HLS natively
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }

    // Other browsers use hls.js
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      width="800"
      style={{ background: "black" }}
    />
  );
}
