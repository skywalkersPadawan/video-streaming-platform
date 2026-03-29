"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomeRedirect() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push("/login");
    } else {
      router.push("/profiles");
    }
  }, [isSignedIn, isLoaded, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      Loading...
    </div>
  );
}
