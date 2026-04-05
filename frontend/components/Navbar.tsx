"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("session");
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const navLinks = (
    <>
      <Link
        href="/my-list"
        className="hover:underline py-2 lg:py-0"
        onClick={closeMobile}
      >
        My List
      </Link>
      <Link
        href="/"
        className="hover:text-white py-2 lg:py-0"
        onClick={closeMobile}
      >
        Home
      </Link>
      <Link
        href="/"
        className="hover:text-white py-2 lg:py-0"
        onClick={closeMobile}
      >
        TV Shows
      </Link>
      <Link
        href="/"
        className="hover:text-white py-2 lg:py-0"
        onClick={closeMobile}
      >
        Movies
      </Link>
    </>
  );

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 px-4 sm:px-6 lg:px-10 py-3 sm:py-4 flex justify-between items-center gap-3 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <h1 className="text-red-600 text-xl sm:text-2xl font-bold tracking-wide shrink-0">
          NETSTREAM
        </h1>

        <div className="hidden lg:flex gap-6 items-center text-sm text-gray-300">
          {navLinks}
          {!isLoggedIn && (
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-white"
            >
              Sign In
            </button>
          )}
          {isLoggedIn && (
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("session");
                setIsLoggedIn(false);
                router.push("/login");
              }}
              className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 text-white"
            >
              Logout
            </button>
          )}
        </div>

        <button
          type="button"
          className="lg:hidden p-2 rounded-md text-xl text-gray-200 hover:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-40 lg:hidden bg-black/95 pt-[4.5rem] px-6 flex flex-col text-gray-200"
        >
          <nav className="flex flex-col text-base gap-1 border-b border-zinc-800 pb-6">
            {navLinks}
          </nav>
          <div className="mt-6">
            {!isLoggedIn && (
              <button
                type="button"
                onClick={() => {
                  closeMobile();
                  router.push("/login");
                }}
                className="w-full bg-red-600 py-3 rounded font-medium text-white"
              >
                Sign In
              </button>
            )}
            {isLoggedIn && (
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("session");
                  setIsLoggedIn(false);
                  closeMobile();
                  router.push("/login");
                }}
                className="w-full bg-gray-700 py-3 rounded font-medium text-white"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
