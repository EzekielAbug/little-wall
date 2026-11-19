"use client";

import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import ProfileSidebar from "@/components/ProfileSidebar";
import PostComposer from "@/components/PostComposer";
import PostFeed from "@/components/PostFeed";
import { supabase } from "@/lib/supabase";

const APPROVED_MOODS = ["Happy", "Chill", "Tired", "Gaming"];

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedError, setFeedError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // 1. Fetch the latest 50 posts from Supabase (newest first)
  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setFeedError("");

    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) {
        throw error;
      }

      setPosts(data || []);
    } catch (err) {
      console.error("Error loading posts:", err);
      setFeedError(err.message || "Failed to load posts from the wall.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 2. Initial load and Supabase Realtime subscription
  useEffect(() => {
    fetchPosts();

    // Subscribe to new posts inserted into the 'posts' table
    const channel = supabase
      .channel("public:posts")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          const newPost = payload.new;
          if (!newPost || !newPost.id) return;

          setPosts((prev) => {
            // Deduplicate: avoid adding if post already exists in state
            if (prev.some((p) => p.id === newPost.id)) {
              return prev;
            }
            // Maintain newest-first order
            return [newPost, ...prev];
          });
        }
      )
      .subscribe();

    // Clean up realtime channel on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPosts]);

  // 3. Handle post submission
  async function handleAddPost({ author, message, mood }) {
    setSubmitError("");

    // Client-side validation
    const trimmedMessage = message.trim();
    if (!trimmedMessage || trimmedMessage.length > 280) {
      setSubmitError("Message must be between 1 and 280 characters.");
      return false;
    }

    const postAuthor = (author && author.trim()) ? author.trim().slice(0, 30) : "Guest";
    const selectedMood = APPROVED_MOODS.includes(mood) ? mood : "Chill";

    setIsPending(true);

    try {
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            author: postAuthor,
            message: trimmedMessage,
            mood: selectedMood,
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Add to state immediately (if Realtime hasn't already delivered it)
      if (data) {
        setPosts((prev) => {
          if (prev.some((p) => p.id === data.id)) {
            return prev;
          }
          return [data, ...prev];
        });
      }

      return true; // Indicates success so PostComposer can clear input
    } catch (err) {
      console.error("Failed to post message:", err);
      setSubmitError(err.message || "Could not publish message. Please try again.");
      return false;
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col text-[#273449]">
      <Navbar />

      {/* Main container */}
      <main className="max-w-5xl w-full mx-auto px-4 py-6 flex-1">
        {/* 2-column layout: Left sidebar + Main feed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <ProfileSidebar />
          </div>

          {/* Main content: Composer + Feed */}
          <div className="md:col-span-2 space-y-6">
            <PostComposer
              onSubmit={handleAddPost}
              isPending={isPending}
              submitError={submitError}
            />

            <PostFeed
              posts={posts}
              isLoading={isLoading}
              error={feedError}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
