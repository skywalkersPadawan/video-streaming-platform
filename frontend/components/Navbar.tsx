"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { searchMovies, type Movie } from "@/lib/tmdb";
import {
  AVATAR_COLORS,
  type AvatarColor,
  getAvatar,
} from "@/lib/profile";

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

export default function Navbar({ variant = "default" }: { variant?: "default" | "kids" }) {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [avatarColor, setAvatarColor] = useState<AvatarColor>("red");
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const session = localStorage.getItem("session");
    Promise.resolve().then(() => {
      setMounted(true);
      setIsLoggedIn(!!session);
      setAvatarColor(getAvatar());
    });

    const onProfileUpdate = () => setAvatarColor(getAvatar());
    window.addEventListener("profile-updated", onProfileUpdate);
    return () => window.removeEventListener("profile-updated", onProfileUpdate);
  }, []);

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

  useEffect(() => {
    if (!searchQuery.trim()) {
      Promise.resolve().then(() => setSearchResults([]));
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const results = await searchMovies(searchQuery);
        setSearchResults(results.slice(0, 6));
      } catch {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("session");
    setIsLoggedIn(false);
    setProfileOpen(false);
    closeMobile();
    router.push("/login");
  };

  const handleSearchSelect = (id: number) => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    closeMobile();
    router.push(`/watch/${id}`);
  };

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    closeMobile();
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const navLinks = (
    <>
      <Link
        href="/"
        className="hover:text-white py-2 lg:py-0 transition-colors"
        onClick={closeMobile}
      >
        Home
      </Link>
      <Link
        href="/tv-shows"
        className="hover:text-white py-2 lg:py-0 transition-colors"
        onClick={closeMobile}
      >
        TV Shows
      </Link>
      <Link
        href="/movies"
        className="hover:text-white py-2 lg:py-0 transition-colors"
        onClick={closeMobile}
      >
        Movies
      </Link>
      <Link
        href="/browse"
        className="hover:text-white py-2 lg:py-0 transition-colors"
        onClick={closeMobile}
      >
        Browse
      </Link>
      <Link
        href="/my-list"
        className="hover:text-white py-2 lg:py-0 transition-colors"
        onClick={closeMobile}
      >
        My List
      </Link>
    </>
  );

  const searchBlock = (
    <div ref={searchRef} className="relative">
      {searchOpen ? (
        <div className="flex items-center bg-black/80 border border-white/20 rounded-sm px-3 py-2 w-full sm:w-64 backdrop-blur-sm">
          <SearchIcon />
          <input
            className="bg-transparent text-white placeholder:text-white/60 text-sm focus:outline-none flex-1 ml-2"
            type="text"
            placeholder="Titles, people, genres"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            autoFocus
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="p-2 hover:bg-white/10 rounded-sm transition-colors text-gray-300 hover:text-white"
          aria-label="Search"
        >
          <SearchIcon />
        </button>
      )}

      {searchOpen && searchResults.length > 0 && (
        <div className="absolute top-full right-0 mt-2 w-full sm:w-72 bg-zinc-900 border border-zinc-700 rounded-md shadow-2xl overflow-hidden z-50">
          {searchResults.map((movie) => (
            <button
              key={movie.id}
              type="button"
              onClick={() => handleSearchSelect(movie.id)}
              className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-zinc-800 transition-colors"
            >
              <div className="relative h-12 w-8 shrink-0 bg-zinc-800 rounded overflow-hidden">
                {movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title || movie.name || "Movie"}
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-[10px] text-zinc-500">
                    N/A
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm text-white truncate">
                  {movie.title || movie.name}
                </p>
                {movie.release_date && (
                  <p className="text-xs text-zinc-400">
                    {movie.release_date.slice(0, 4)}
                  </p>
                )}
              </div>
            </button>
          ))}
          <button
            type="button"
            onClick={handleSearchSubmit}
            className="w-full px-3 py-2.5 text-sm text-center text-zinc-300 hover:bg-zinc-800 border-t border-zinc-700 transition-colors"
          >
            View all results
          </button>
        </div>
      )}
    </div>
  );

  const profileBlock = isLoggedIn ? (
    <div ref={profileRef} className="relative">
      <button
        type="button"
        onClick={() => setProfileOpen((open) => !open)}
        className="flex items-center gap-2 rounded-sm hover:bg-white/10 p-1.5 transition-colors"
        aria-expanded={profileOpen}
        aria-label="Account menu"
      >
        <span
          className={`flex h-8 w-8 items-center justify-center rounded text-white ${AVATAR_COLORS[avatarColor].bg}`}
        >
          <UserIcon />
        </span>
      </button>

      {profileOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-zinc-900/95 border border-zinc-700 rounded-md shadow-2xl overflow-hidden z-50">
          <Link
            href="/profile"
            className="block px-4 py-2.5 text-sm text-gray-200 hover:bg-zinc-800 transition-colors"
            onClick={() => setProfileOpen(false)}
          >
            Account
          </Link>
          <Link
            href="/my-list"
            className="block px-4 py-2.5 text-sm text-gray-200 hover:bg-zinc-800 transition-colors"
            onClick={() => setProfileOpen(false)}
          >
            My List
          </Link>
          <Link
            href="/kids"
            className="block px-4 py-2.5 text-sm text-gray-200 hover:bg-zinc-800 transition-colors"
            onClick={() => setProfileOpen(false)}
          >
            Kids
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-zinc-800 transition-colors border-t border-zinc-800"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  ) : (
    <button
      type="button"
      onClick={() => router.push("/login")}
      className="bg-[#E50914] px-4 py-2 rounded text-sm font-medium hover:bg-red-700 text-white transition-colors"
    >
      Sign In
    </button>
  );

  if (!mounted) return null;

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 px-4 sm:px-6 lg:px-10 py-3 sm:py-4 flex justify-between items-center gap-4 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-6 lg:gap-8 min-w-0">
          <Link
            href={variant === "kids" ? "/kids" : "/"}
            className={`text-xl sm:text-2xl font-bold tracking-wide shrink-0 hover:opacity-90 transition-opacity ${
              variant === "kids" ? "text-sky-400" : "text-[#E50914]"
            }`}
          >
            {variant === "kids" ? "NETSTREAM KIDS" : "NETSTREAM"}
          </Link>

          <div className="hidden lg:flex gap-5 items-center text-sm text-gray-300">
            {navLinks}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {searchBlock}
          {profileBlock}
        </div>

        <div className="flex lg:hidden items-center gap-1">
          {searchBlock}
          <button
            type="button"
            className="p-2 rounded-md text-xl text-gray-200 hover:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
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
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="block w-full bg-zinc-800 py-3 rounded font-medium text-white text-center mb-3"
                  onClick={closeMobile}
                >
                  Account
                </Link>
                <Link
                  href="/my-list"
                  className="block w-full bg-zinc-800 py-3 rounded font-medium text-white text-center mb-3"
                  onClick={closeMobile}
                >
                  My List
                </Link>
                <Link
                  href="/kids"
                  className="block w-full bg-sky-900 py-3 rounded font-medium text-white text-center mb-3"
                  onClick={closeMobile}
                >
                  Kids
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full bg-zinc-700 py-3 rounded font-medium text-white"
                >
                  Sign out
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  closeMobile();
                  router.push("/login");
                }}
                className="w-full bg-[#E50914] py-3 rounded font-medium text-white"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
