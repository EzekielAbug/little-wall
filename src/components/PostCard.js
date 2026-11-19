"use client";

import { useState, useEffect } from "react";

const MOOD_EMOJI = {
  Happy: "😊",
  Chill: "😎",
  Tired: "🥱",
  Gaming: "🎮",
};

/**
 * Returns a human-friendly relative time string.
 * Calculated safely on the client to avoid SSR/prerender hydration mismatches.
 */
function getRelativeTime(dateString) {
  if (!dateString) return "just now";
  const timestamp = new Date(dateString).getTime();
  if (isNaN(timestamp)) return "recently";

  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return new Date(dateString).toLocaleDateString();
}

export default function PostCard({ post }) {
  const [relativeTime, setRelativeTime] = useState("just now");

  useEffect(() => {
    setRelativeTime(getRelativeTime(post.created_at));
  }, [post.created_at]);

  return (
    <article className="bg-white rounded-lg border border-[#E5EAF0] p-4">
      {/* Header: avatar, name, mood, time */}
      <div className="flex items-start gap-3">
        {/* Avatar placeholder with Initials */}
        <div className="w-9 h-9 rounded-full bg-[#E5EAF0] flex items-center justify-center text-xs font-bold text-[#68778A] shrink-0">
          G
        </div>

        <div className="min-w-0 flex-1">
          {/* Name and mood badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-[#273449]">
              {post.author}
            </span>

            {post.mood && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F5F7FA] text-xs text-[#68778A] border border-[#E5EAF0]">
                <span>{MOOD_EMOJI[post.mood] || "😎"}</span>
                <span>{post.mood}</span>
              </span>
            )}
          </div>

          {/* Timestamp */}
          <p className="text-xs text-[#68778A] mt-0.5">
            {relativeTime}
          </p>
        </div>
      </div>

      {/* Message content */}
      <p className="mt-3 text-sm text-[#273449] leading-relaxed whitespace-pre-wrap break-words">
        {post.message}
      </p>
    </article>
  );
}
