"use client";

import { useCallback, useState, KeyboardEvent } from "react";

const EVENT_NAME = "hi-vision-open-chat";

export default function HomeSearchBox() {
  const [query, setQuery] = useState("");

  const dispatchToChat = useCallback(
    (text: string) => {
      const message = text.trim();
      if (!message) return;
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent(EVENT_NAME, { detail: { message } })
        );
      }
      setQuery("");
    },
    [setQuery]
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatchToChat(query);
    }
  };

  return (
    <div className="flex flex-wrap sm:flex-nowrap h-auto bg-white sm:h-16 border border-gray-200 rounded-full shadow-md w-full max-w-screen-sm overflow-hidden focus-within:ring-2 focus-within:ring-sky-300 focus-within:ring-offset-2 transition-all duration-150 ease-in-out">
      <input
        placeholder="Search..."
        type="text"
        name="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
        className="flex-1 px-4 py-2 text-base sm:text-lg bg-transparent focus:outline-none min-w-0"
      />
      <div className="flex gap-2 items-center px-4 py-2 sm:py-0">
        <IconButton onClick={() => dispatchToChat(query)}>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <ImageIcon />
        </IconButton>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

function IconButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="custom-btn bg-blue-500 text-white p-1.5 rounded-md w-8 h-8 flex items-center justify-center hover:bg-blue-600 transition-colors"
      aria-label="action"
    >
      {children}
    </button>
  );
}

function SearchIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
      <path d="M12 1a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

