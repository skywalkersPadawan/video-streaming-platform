"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 px-10 py-4 flex justify-between items-center transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <h1 className="text-red-600 text-2xl font-bold tracking-wide">
        NETSTREAM
      </h1>

      {/* Nav items */}
      <div className="flex gap-6 text-sm text-gray-300">
        <span className="hover:text-white cursor-pointer">Home</span>
        <span className="hover:text-white cursor-pointer">TV Shows</span>
        <span className="hover:text-white cursor-pointer">Movies</span>
        <span className="hover:text-white cursor-pointer">My List</span>
      </div>
    </div>
  );
}
