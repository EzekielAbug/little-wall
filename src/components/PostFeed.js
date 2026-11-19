import PostCard from "./PostCard";

export default function PostFeed({ posts, isLoading, error }) {
  if (error) {
    return (
      <div className="bg-white rounded-lg border border-red-200 p-6 text-center">
        <p className="text-sm text-red-600">
          Something went wrong loading posts.
        </p>
        <p className="text-xs text-[#68778A] mt-1">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg border border-[#E5EAF0] p-4 animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#E5EAF0]" />
              <div className="space-y-2 flex-1">
                <div className="h-3 bg-[#E5EAF0] rounded w-24" />
                <div className="h-2 bg-[#E5EAF0] rounded w-16" />
              </div>
            </div>
            <div className="mt-3 h-3 bg-[#E5EAF0] rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-[#E5EAF0] p-8 text-center">
        <p className="text-sm text-[#68778A]">
          No posts yet. Be the first to write on the wall! ✍️
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
