"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e?: any) => {
    if (e) e.preventDefault();

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("User does not exist. Please sign up.");
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    if (parsedUser.email === email && parsedUser.password === password) {
      localStorage.setItem("session", "true");
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      className="relative h-screen w-full flex items-center justify-center text-white"
      style={{
        backgroundImage: "url(/hero-background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-4 left-4 sm:top-6 sm:left-10 z-20 text-red-600 text-2xl sm:text-3xl font-bold">
        NETSTREAM
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 w-full h-full max-w-6xl mx-auto flex flex-col items-center justify-center px-4 sm:px-6 text-center pt-16 sm:pt-0">
        <div className="max-w-2xl mb-6 sm:mb-10 mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
            Unlimited movies, TV shows and more
          </h1>

          <p className="text-lg text-gray-300 mt-4">
            Watch anywhere. Cancel anytime.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-black/80 p-6 sm:p-8 rounded-md w-full max-w-[350px] space-y-5 shadow-lg mx-auto"
        >
          <h2 className="text-2xl font-bold">Sign In</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-700/80 rounded text-white outline-none focus:ring-2 focus:ring-red-600"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-700/80 rounded text-white outline-none focus:ring-2 focus:ring-red-600"
          />

          <button className="w-full bg-red-600 py-3 rounded-md font-semibold hover:bg-red-700">
            Sign In
          </button>

          <div className="flex items-center justify-between text-sm text-gray-400 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-red-600"
              />
              Remember me
            </label>
            <span className="hover:underline cursor-pointer">Need help?</span>
          </div>

          <div className="text-sm text-gray-400 mt-4">
            New to Netstream?{" "}
            <span
              onClick={() => (window.location.href = "/sign-up")}
              className="text-white hover:underline cursor-pointer"
            >
              Sign up now
            </span>
          </div>

          <div className="text-xs text-gray-500 mt-2">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
          </div>
        </form>
      </div>
    </div>
  );
}
