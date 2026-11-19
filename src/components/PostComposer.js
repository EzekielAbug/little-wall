"use client";

import { useState } from "react";

const MOODS = [
  { label: "Happy", emoji: "😊" },
  { label: "Chill", emoji: "😎" },
  { label: "Tired", emoji: "🥱" },
  { label: "Gaming", emoji: "🎮" },
];

const MAX_LENGTH = 280;
const MAX_AUTHOR_LENGTH = 30;

export default function PostComposer({ onSubmit, isPending, submitError }) {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [mood, setMood] = useState("Chill");

  const trimmedMessage = message.trim();
  const canSubmit =
    trimmedMessage.length > 0 && trimmedMessage.length <= MAX_LENGTH && !isPending;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    const trimmedAuthor = author.trim() || "Guest";

    const success = await onSubmit({
      author: trimmedAuthor,
      message: trimmedMessage,
      mood,
    });

    // Only reset form inputs if submission succeeded
    if (success) {
      setMessage("");
      setAuthor("");
      setMood("Chill");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg border border-[#E5EAF0] p-4"
    >
      {/* Optional submission error alert */}
      {submitError && (
        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
          {submitError}
        </div>
      )}

      {/* Author name input (optional) */}
      <div className="mb-3">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name (optional, defaults to Guest)"
          maxLength={MAX_AUTHOR_LENGTH}
          className="w-full border border-[#E5EAF0] rounded-md px-3 py-2 text-sm text-[#273449] placeholder-[#68778A] focus:outline-none focus:border-[#3478E5] transition-colors"
        />
      </div>

      {/* Message Textarea */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write something on the wall..."
        maxLength={MAX_LENGTH}
        rows={3}
        className="w-full resize-none border border-[#E5EAF0] rounded-md p-3 text-sm text-[#273449] placeholder-[#68778A] focus:outline-none focus:border-[#3478E5] transition-colors"
      />

      {/* Character counter */}
      <div className="flex justify-end mt-1 mb-3">
        <span
          className={`text-xs ${
            message.length > MAX_LENGTH ? "text-red-500" : "text-[#68778A]"
          }`}
        >
          {message.length}/{MAX_LENGTH}
        </span>
      </div>

      {/* Mood selector and submit */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Mood pills */}
        <div className="flex gap-2 flex-wrap">
          {MOODS.map((m) => (
            <button
              key={m.label}
              type="button"
              onClick={() => setMood(m.label)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                mood === m.label
                  ? "bg-[#3478E5] text-white border-[#3478E5]"
                  : "bg-white text-[#68778A] border-[#E5EAF0] hover:border-[#3478E5]"
              }`}
            >
              {m.emoji} {m.label}
            </button>
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!canSubmit}
          className="px-5 py-1.5 bg-[#3478E5] text-white text-sm font-medium rounded-md hover:bg-[#2a63c0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {isPending ? "Sharing..." : "Share"}
        </button>
      </div>
    </form>
  );
}
