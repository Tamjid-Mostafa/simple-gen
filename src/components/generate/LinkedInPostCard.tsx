"use client";

import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
  console.log(post);
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
          src={post.author.imageUrl || "/default-avatar.png"}
          alt="Author"
          width={48}
          height={48}
          className="rounded-full w-12 h-12 object-cover"
        />
        <div className="flex flex-col justify-center">
          <span className="font-semibold text-sm">
            {post.author.name}
          </span>
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
            className={cn(
              "text-sm whitespace-pre-wrap overflow-hidden",
              {
                "line-clamp-3": !expanded && showMore,
                "line-clamp-none": expanded,
              }
            )}
          >
            {expanded || !showMore
              ? content
              : content.substring(0, 200).trim() + "..."}
          </motion.p>
        </AnimatePresence>

        {showMore && (
          <Button
            type="button"
            variant="link"
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 text-sm mt-1 px-0"
          >
            {expanded ? "Show less" : "…more"}
          </Button>
        )}
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
              className="w-full max-h-[450px] object-cover"
            />
          ) : (
            <div className="relative w-full">
              <Image
                src={post.post.imageUrl || "/default-thumbnail.jpg"}
                alt="Post preview"
                width={800}
                height={450}
                className="w-full max-h-[450px] object-cover"
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
            className="w-full max-h-[450px] object-cover"
          />
        </motion.div>
      ) : null}

      {/* Footer actions */}
      <div className="px-4 py-2 text-xs text-gray-400 border-t flex items-center gap-2">
        <span className=" font-medium">1</span>
        <span>· 2 Comments</span>
      </div>
      <div className="px-4 py-2 border-t flex justify-around text-sm text-gray-500">
        <button className="pointer-events-none">
          👍 Like
        </button>
        <button className="pointer-events-none">
          💬 Comment
        </button>
        <button className="pointer-events-none">
          🔗 Share
        </button>
        <button className="pointer-events-none">
          📄 Transcript
        </button>
      </div>
    </motion.div>
  );
}
