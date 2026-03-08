"use client";

interface Props {
  title: string;
  description: string;
  image: string;
}

export default function HeroBanner({ title, description, image }: Props) {
  return (
    <div
      className="relative h-[500px] w-full flex items-center text-white"
      style={{
        backgroundImage: `url(${image || "https://picsum.photos/1200/600"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

      <div className="relative z-10 ml-16 max-w-xl">
        <h1 className="text-5xl font-bold">{title}</h1>
        <p className="mt-4 text-gray-300">{description}</p>

        <button className="mt-6 bg-white text-black px-6 py-3 rounded font-semibold">
          ▶ Play
        </button>
      </div>
    </div>
  );
}
