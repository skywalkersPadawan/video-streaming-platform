"use client";

import { useState } from "react";
import { SignUp } from "@clerk/nextjs";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // handle login logic here
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
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10">
        {!showSignUp ? (
          <form
            onSubmit={handleLogin}
            className="bg-black/80 p-8 rounded-md w-[350px] space-y-5 shadow-lg mx-auto"
          >
            <h2 className="text-2xl font-bold">Sign-Up</h2>

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
              Sign-Up
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
                onClick={() => setShowSignUp(true)}
                className="text-white hover:underline cursor-pointer"
              >
                Sign up now
              </span>
            </div>
          </form>
        ) : (
          <div className="bg-black/80 p-6 rounded-md shadow-lg">
            <SignUp routing="hash" />
            <p className="text-sm text-gray-400 mt-4 text-center">
              Already have an account?{" "}
              <span
                onClick={() => setShowSignUp(false)}
                className="text-white hover:underline cursor-pointer"
              >
                Sign in
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
