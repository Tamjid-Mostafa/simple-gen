"use client";

import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import LinkedInPostCardFooter from "./LinkedInPostCardFooter";

export function LinkedInPostCard({
  post,
}: {
  post: {
    author: {
      name: string;
      title: string;
      imageUrl: string | null;
    };
    post: {
      publishedAt: string;
      content: string;
      imageUrl: string | null;
      videoUrl: string | null;
    };
  };
}) {
  const [expanded, setExpanded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const content = post.post.content || "No content available";
  const showMore = content.length > 200;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-xl mx-auto border rounded-lg  shadow-sm overflow-hidden"
    >
      {/* Top section */}
      <div className="flex gap-3 p-4">
        <Image
          src={post.author.imageUrl || "/default-avatar.svg"}
          alt="Author"
          width={48}
          height={48}
          className="rounded-full w-12 h-12 object-cover"
        />
        <div className="flex flex-col justify-center">
          <span className="font-semibold text-sm">{post.author.name}</span>
          <span className="text-xs text-gray-400 leading-tight line-clamp-1">
            {post.author.title}
          </span>
          <span className="text-xs text-gray-400">{post.post.publishedAt}</span>
        </div>
      </div>

      {/* Post content */}
      <div className="relative px-4 pb-2">
        <AnimatePresence initial={false}>
          <motion.p
            key={expanded ? "expanded" : "collapsed"}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={cn("text-sm whitespace-pre-wrap overflow-hidden")}
          >
            <div className="space-y-2 text-sm outline-none border-none focus:outline-none focus:border-none whitespace-break-spaces">
              {expanded || !showMore
                ? content
                : content.substring(0, 150).trim()}{" "}
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className={cn(
                  "text-[#0a66c2] dark:text-[#71b7fb] hover:underline text-[15px]",
                  {
                    inline: !expanded,
                    "block mt-2": expanded,
                  }
                )}
              >
                {" "}
                {expanded ? "...less" : "...more"}
              </button>
            </div>
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Post media */}
      {/* Post media (click to play video) */}
      {post.post.videoUrl ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-full max-h-[450px] overflow-hidden"
        >
          {showVideo ? (
            <video
              src={post.post.videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full"
            />
          ) : (
            <div className="relative w-full">
              <Image
                src={post.post.imageUrl || "/default-thumbnail.jpg"}
                alt="Post preview"
                width={800}
                height={450}
                className="w-full"
              />
              <button
                className="absolute inset-0 flex items-center justify-center"
                onClick={() => setShowVideo(true)}
              >
                <PlayCircle className="w-16 h-16 text-white opacity-80 hover:opacity-100 transition" />
              </button>
            </div>
          )}
        </motion.div>
      ) : post.post.imageUrl ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full"
        >
          <Image
            src={post.post.imageUrl}
            alt="Post media"
            width={800}
            height={450}
            className="w-full"
          />
        </motion.div>
      ) : null}

      {/* Footer actions */}
      <LinkedInPostCardFooter/>
    </motion.div>
  );
}
