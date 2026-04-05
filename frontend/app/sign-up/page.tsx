"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e?: any) => {
    if (e) e.preventDefault();

    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email, password }));

    alert("User created. Please sign in.");

    router.push("/login");
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-black text-white px-4 py-8">
      <form
        onSubmit={handleSignup}
        className="bg-zinc-900/80 p-6 sm:p-8 rounded-lg space-y-4 w-full max-w-md border border-zinc-800"
      >
        <h2 className="text-xl">Sign Up</h2>

        <input
          type="email"
          placeholder="Email"
          className="p-2 bg-gray-700 w-full"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-2 bg-gray-700 w-full"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-red-600 px-4 py-2 w-full">Sign Up</button>
      </form>
    </div>
  );
}
