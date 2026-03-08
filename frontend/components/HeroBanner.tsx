"use client";

export default function HeroBanner() {
  return (
    <div
      className="relative min-h-[80vh] flex items-center justify-center text-white"
      style={{
        backgroundImage: "url('/hero-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 text-center max-w-xl">
        <h1 className="text-5xl font-bold">
          Unlimited movies, TV shows, and more
        </h1>

        <p className="mt-6 text-lg opacity-90">
          Stream high quality content instantly.
        </p>

        <button className="mt-8 bg-red-600 px-8 py-3 rounded-md font-semibold hover:bg-red-700">
          ▶ Start Watching
        </button>
      </div>
    </div>
  );
}
