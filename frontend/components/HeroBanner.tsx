"use client";

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

export default function HeroBanner({
  title = "Unlimited movies, TV shows and more",
  description = "Watch anywhere. Cancel anytime.",
  image = "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
}: Props) {
  return (
    <div
      className="relative h-[75vh] w-full flex items-end text-white"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 p-10 max-w-2xl">
        <h1 className="text-5xl font-bold leading-tight">{title}</h1>

        <p className="mt-4 text-lg text-gray-300">{description}</p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200">
            ▶ Play
          </button>

          <button className="bg-gray-700/70 px-6 py-2 rounded font-semibold hover:bg-gray-600">
            ℹ More Info
          </button>
        </div>
      </div>
    </div>
  );
}
