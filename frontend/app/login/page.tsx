"use client";

import { useState } from "react";
import { useSignIn, useClerk } from "@clerk/nextjs";

export default function LoginPage() {
  const { signIn } = useSignIn();
  const { setActive } = useClerk();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!signIn) return;

    try {
      const signInAttempt: any = await signIn.create({
        identifier: email,
      });

      const result: any = await (signIn as any).attemptFirstFactor({
        strategy: "password",
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        window.location.href = "/";
      } else {
        console.log(result);
      }
    } catch (err: any) {
      console.log("CLERK ERROR:", err.errors);
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
      <div className="absolute top-6 left-10 z-20 text-red-600 text-3xl font-bold">
        NETSTREAM
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 w-full h-full max-w-6xl mx-auto flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-2xl mb-10 mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Unlimited movies, TV shows and more
          </h1>

          <p className="text-lg text-gray-300 mt-4">
            Watch anywhere. Cancel anytime.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-black/80 p-8 rounded-md w-[350px] space-y-5 shadow-lg mx-auto"
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
