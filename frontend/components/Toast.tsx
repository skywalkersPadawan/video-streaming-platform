"use client";

import { useEffect } from "react";

export type ToastState = {
  message: string;
  type?: "success" | "error";
} | null;

type Props = {
  toast: ToastState;
  onClose: () => void;
  duration?: number;
};

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#46d369" />
      <path
        d="M7 12.5l3 3 7-7"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#e50914" />
      <path
        d="M15 9l-6 6M9 9l6 6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Toast({ toast, onClose, duration = 2500 }: Props) {
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [toast, onClose, duration]);

  if (!toast) return null;

  const isError = toast.type === "error";

  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-8 sm:translate-x-0 z-[9999] animate-toast-in"
    >
      <div className="flex items-center gap-3 bg-[#333]/95 backdrop-blur-md text-white px-5 py-3.5 rounded shadow-2xl border border-white/10 min-w-[260px]">
        {isError ? <ErrorIcon /> : <CheckIcon />}
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
    </div>
  );
}
