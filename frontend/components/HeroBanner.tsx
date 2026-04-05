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
      className="relative min-h-[50vh] sm:min-h-[60vh] md:h-[75vh] w-full flex items-end text-white"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-6 md:p-10 max-w-2xl w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          {title}
        </h1>

        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-300">
          {description}
        </p>

        {/* Buttons */}
        <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-4">
          <button
            type="button"
            className="bg-white text-black px-5 sm:px-6 py-2 rounded font-semibold hover:bg-gray-200 text-sm sm:text-base min-h-[44px]"
          >
            ▶ Play
          </button>

          <button
            type="button"
            className="bg-gray-700/70 px-5 sm:px-6 py-2 rounded font-semibold hover:bg-gray-600 text-sm sm:text-base min-h-[44px]"
          >
            ℹ More Info
          </button>
        </div>
      </div>
    </div>
  );
}
