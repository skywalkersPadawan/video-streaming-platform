"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import type { ToastState } from "@/components/Toast";
import {
  AVATAR_COLORS,
  type AvatarColor,
  type MaturityRating,
  getAvatar,
  setAvatar,
  getAutoplayTrailers,
  setAutoplayTrailers,
  getMaturityRating,
  setMaturityRating,
  getUserEmail,
} from "@/lib/profile";

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [avatar, setAvatarState] = useState<AvatarColor>("red");
  const [autoplay, setAutoplay] = useState(true);
  const [maturity, setMaturity] = useState<MaturityRating>("all");
  const [email, setEmail] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    Promise.resolve().then(() => {
      setAvatarState(getAvatar());
      setAutoplay(getAutoplayTrailers());
      setMaturity(getMaturityRating());
      setEmail(getUserEmail());
      setMounted(true);
    });
  }, []);

  const handleAvatarChange = (color: AvatarColor) => {
    setAvatar(color);
    setAvatarState(color);
    setToast({ message: "Profile updated", type: "success" });
    window.dispatchEvent(new Event("profile-updated"));
  };

  const handleAutoplayChange = (enabled: boolean) => {
    setAutoplayTrailers(enabled);
    setAutoplay(enabled);
    setToast({
      message: enabled ? "Trailer autoplay enabled" : "Trailer autoplay disabled",
      type: "success",
    });
  };

  const handleMaturityChange = (rating: MaturityRating) => {
    setMaturityRating(rating);
    setMaturity(rating);
    setToast({ message: "Viewing preferences updated", type: "success" });
  };

  const handleSignOut = () => {
    localStorage.removeItem("session");
    router.push("/login");
  };

  if (!mounted) return null;

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="pt-24 px-4 sm:px-6 lg:px-10 pb-10 max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">Account</h1>

        {email && (
          <section className="mb-10">
            <h2 className="text-lg font-semibold mb-2 text-zinc-300">
              Email
            </h2>
            <p className="text-zinc-400">{email}</p>
          </section>
        )}

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Profiles</h2>
          <div className="flex flex-wrap gap-4">
            {(Object.keys(AVATAR_COLORS) as AvatarColor[]).map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleAvatarChange(color)}
                className="flex flex-col items-center gap-2 group"
              >
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-md text-white transition-all ${
                    AVATAR_COLORS[color].bg
                  } ${
                    avatar === color
                      ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-105"
                      : "opacity-70 group-hover:opacity-100"
                  }`}
                >
                  <UserIcon />
                </span>
                <span className="text-xs text-zinc-400">
                  {AVATAR_COLORS[color].label}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Kids Profile</h2>
          <Link
            href="/kids"
            className="flex items-center gap-4 p-4 rounded-lg border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/50 transition-colors"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-md bg-sky-500 text-white text-2xl">
              👶
            </span>
            <div>
              <p className="font-medium">Kids</p>
              <p className="text-sm text-zinc-400">
                Family-friendly movies and shows only
              </p>
            </div>
          </Link>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Playback Settings</h2>
          <label className="flex items-center justify-between py-3 border-b border-zinc-800">
            <div>
              <p className="font-medium">Autoplay trailers</p>
              <p className="text-sm text-zinc-400">
                Play previews automatically on the home screen
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={autoplay}
              onClick={() => handleAutoplayChange(!autoplay)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                autoplay ? "bg-[#E50914]" : "bg-zinc-600"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white transition-transform ${
                  autoplay ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </label>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Viewing Restrictions</h2>
          <div className="space-y-2">
            {(
              [
                { value: "all", label: "All Maturity Ratings" },
                { value: "teen", label: "Teen and Below (PG-13)" },
                { value: "kids", label: "Kids Only (G / PG)" },
              ] as const
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleMaturityChange(option.value)}
                className={`w-full text-left px-4 py-3 rounded border transition-colors ${
                  maturity === option.value
                    ? "border-white bg-zinc-900"
                    : "border-zinc-800 hover:border-zinc-600"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>

        <button
          type="button"
          onClick={handleSignOut}
          className="w-full sm:w-auto px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded font-medium transition-colors"
        >
          Sign out of NetStream
        </button>
      </div>
      <Footer />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </main>
  );
}
