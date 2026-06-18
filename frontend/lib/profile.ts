export type AvatarColor = "red" | "blue" | "green" | "yellow" | "kids";

export type MaturityRating = "all" | "teen" | "kids";

const AVATAR_KEY = "netstream_avatar";
const AUTOPLAY_KEY = "netstream_autoplay_trailers";
const MATURITY_KEY = "netstream_maturity";

export const AVATAR_COLORS: Record<
  AvatarColor,
  { bg: string; label: string }
> = {
  red: { bg: "bg-[#E50914]", label: "Primary" },
  blue: { bg: "bg-blue-600", label: "Blue" },
  green: { bg: "bg-emerald-600", label: "Green" },
  yellow: { bg: "bg-amber-500", label: "Yellow" },
  kids: { bg: "bg-sky-500", label: "Kids" },
};

export function getAvatar(): AvatarColor {
  if (typeof window === "undefined") return "red";
  return (localStorage.getItem(AVATAR_KEY) as AvatarColor) || "red";
}

export function setAvatar(color: AvatarColor) {
  localStorage.setItem(AVATAR_KEY, color);
}

export function getAutoplayTrailers(): boolean {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem(AUTOPLAY_KEY);
  return stored === null ? true : stored === "true";
}

export function setAutoplayTrailers(enabled: boolean) {
  localStorage.setItem(AUTOPLAY_KEY, String(enabled));
}

export function getMaturityRating(): MaturityRating {
  if (typeof window === "undefined") return "all";
  return (localStorage.getItem(MATURITY_KEY) as MaturityRating) || "all";
}

export function setMaturityRating(rating: MaturityRating) {
  localStorage.setItem(MATURITY_KEY, rating);
}

export function getUserEmail(): string | null {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  if (!user) return null;
  try {
    return JSON.parse(user).email ?? null;
  } catch {
    return null;
  }
}
