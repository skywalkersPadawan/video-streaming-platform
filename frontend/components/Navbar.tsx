"use client";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-10 py-4 bg-black text-white">
      <h1 className="text-2xl font-bold text-red-600">NETSTREAM</h1>

      <div className="flex gap-6 text-sm">
        <a href="/">Home</a>
        <a href="/">TV Shows</a>
        <a href="/">Movies</a>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
