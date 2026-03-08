"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
  id: string;
  title: string;
  thumbnail: string;
}

export default function VideoCard({ id, title, thumbnail }: Props) {
  return (
    <Link href={`/watch/${id}`}>
      <motion.div
        whileHover={{ scale: 1.08 }}
        className="cursor-pointer w-[220px]"
      >
        <img
          src={thumbnail || "https://picsum.photos/400/225"}
          alt={title}
          className="rounded-md object-cover w-full h-[130px]"
        />

        <p className="text-sm mt-2 text-gray-300">{title}</p>
      </motion.div>
    </Link>
  );
}
