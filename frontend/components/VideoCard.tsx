"use client";

import { motion } from "framer-motion";

interface Props {
  id: string;
  title: string;
  thumbnail: string;
}

export default function VideoCard({ id, title, thumbnail }: Props) {
  return (
    <a href={`/watch/${id}`}>
      <motion.div
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.2 }}
        className="cursor-pointer"
      >
        <img
          src={thumbnail || "https://picsum.photos/400/225"}
          className="rounded-lg w-[300px] h-[170px] object-cover"
        />

        <p className="text-sm mt-2 text-gray-200">{title}</p>
      </motion.div>
    </a>
  );
}
