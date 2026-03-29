"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem("session");
    setIsLoggedIn(!!session);
  }, []);

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
      <div className="flex gap-6 items-center text-sm text-gray-300">
        <span className="hover:text-white cursor-pointer">Home</span>
        <span className="hover:text-white cursor-pointer">TV Shows</span>
        <span className="hover:text-white cursor-pointer">Movies</span>
        <span className="hover:text-white cursor-pointer">My List</span>
        {!isLoggedIn && (
          <button
            onClick={() => router.push("/login")}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-white"
          >
            Sign In
          </button>
        )}

        {isLoggedIn && (
          <button
            onClick={() => {
              localStorage.removeItem("session");
              router.push("/login");
            }}
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 text-white"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
