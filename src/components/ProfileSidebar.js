export default function ProfileSidebar() {
  return (
    <aside className="bg-white rounded-lg border border-[#E5EAF0] p-5">
      {/* Avatar and name */}
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-[#3478E5] flex items-center justify-center text-white text-2xl font-bold">
          WO
        </div>
        <h2 className="mt-3 text-base font-semibold text-[#273449]">
          Wall Owner
        </h2>
        <p className="text-sm text-[#68778A]">Welcome to my little wall!</p>

        {/* Online indicator */}
        <div className="flex items-center gap-1.5 mt-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs text-[#68778A]">Online</span>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-4 border-[#E5EAF0]" />

      {/* About Me */}
      <div>
        <h3 className="text-sm font-semibold text-[#273449] mb-2">About Me</h3>
        <p className="text-sm text-[#68778A] leading-relaxed">
          Just a wall on the internet. Leave a message, share your mood, and say
          hi to other visitors. Everyone is welcome here. 🧱
        </p>
      </div>
    </aside>
  );
}
