"use client";

import { useEffect, useState } from "react";
import { getMyList } from "@/lib/api";
import type { ToastState } from "@/components/Toast";

export function useMyList() {
  const [myListIds, setMyListIds] = useState<number[]>([]);
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMyList();
        setMyListIds(data.map((item: { movieId: number }) => item.movieId));
      } catch {
        // User may not be logged in
      }
    };

    load();
  }, []);

  return { myListIds, setMyListIds, toast, setToast };
}
