"use client";

import { useState } from "react";

// Generate 1-2 initials from a name (e.g. "Kiel Abug" -> "KA", "Kiel" -> "K")
function getInitials(name) {
  if (!name) return "WO";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function ProfileSidebar({ ownerName, onUpdateName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(ownerName);

  function handleSave(e) {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (trimmed) {
      onUpdateName(trimmed);
    } else {
      setNameInput(ownerName);
    }
    setIsEditing(false);
  }

  function handleCancel() {
    setNameInput(ownerName);
    setIsEditing(false);
  }

  const initials = getInitials(ownerName);

  return (
    <aside className="bg-white rounded-lg border border-[#E5EAF0] p-5">
      {/* Avatar and name */}
      <div className="flex flex-col items-center text-center">
        {/* Dynamic Avatar Initials */}
        <div className="w-20 h-20 rounded-full bg-[#3478E5] flex items-center justify-center text-white text-2xl font-bold shadow-xs">
          {initials}
        </div>

        {/* Name / Inline Editing */}
        <div className="mt-3 w-full">
          {isEditing ? (
            <form onSubmit={handleSave} className="flex flex-col items-center gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                maxLength={30}
                autoFocus
                placeholder="Enter your name"
                className="w-full border border-[#3478E5] rounded px-2 py-1 text-sm text-center font-semibold text-[#273449] focus:outline-none"
              />
              <div className="flex gap-2 text-xs">
                <button
                  type="submit"
                  className="px-3 py-1 bg-[#3478E5] text-white rounded font-medium hover:bg-[#2a63c0] cursor-pointer"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-3 py-1 bg-[#F5F7FA] text-[#68778A] border border-[#E5EAF0] rounded font-medium hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="group flex items-center justify-center gap-1.5">
              <h2 className="text-base font-semibold text-[#273449]">
                {ownerName}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setNameInput(ownerName);
                  setIsEditing(true);
                }}
                title="Edit profile name"
                className="text-xs text-[#3478E5] hover:underline cursor-pointer opacity-80 hover:opacity-100"
              >
                ✏️
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-[#68778A] mt-0.5">Welcome to my little wall!</p>

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
