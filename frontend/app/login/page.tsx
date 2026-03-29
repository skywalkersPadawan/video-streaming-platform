"use client";

import { SignInButton } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div
      className="relative h-screen w-full flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url(https://assets.nflxext.com/ffe/siteui/vlv3/9c9d7c8d-6d08-4d93-9d8e-0b1c3a0b6c4d/0c5a6d6d-1c4d-4d9a-bc73-8c9d9c1c1e1a/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-6 px-6">
        <h1 className="text-4xl md:text-6xl font-bold">
          Unlimited movies, TV shows and more
        </h1>

        <p className="text-lg text-gray-300">Watch anywhere. Cancel anytime.</p>

        {/* Sign In Button */}
        <SignInButton mode="modal">
          <button className="bg-red-600 px-6 py-3 rounded text-lg font-semibold hover:bg-red-700">
            Get Started
          </button>
        </SignInButton>
      </div>
    </div>
  );
}
