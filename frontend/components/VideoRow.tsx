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
      <h2 className="text-xl mb-4">{title}</h2>

      <div className="flex overflow-x-scroll space-x-4 scrollbar-hide">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            {...video}
          />
        ))}
      </div>
    </div>
  );
}
