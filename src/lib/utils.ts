import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatInstagramDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: Record<string, number> = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  if (seconds < 60) return "Just now";

  for (const key in intervals) {
    const interval = Math.floor(seconds / intervals[key]);
    if (interval >= 1) {
      if (key === "day" && interval === 1) return "Yesterday";
      return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
    }
  }

  // fallback = date classique
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};
