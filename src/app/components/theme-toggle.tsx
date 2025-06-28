"use client";

import { useEffect, useState } from "react";

interface ThemeToggleProps {
  isDarkTheme: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isDarkTheme, onToggle }: ThemeToggleProps) {
  const [icon, setIcon] = useState(isDarkTheme ? '🌙' : '☀️');

  useEffect(() => {
    setIcon(isDarkTheme ? '🌙' : '☀️');
  }, [isDarkTheme]);

  return (
    <button
      onClick={onToggle}
      className="p-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
    >
      {icon}
    </button>
  );
}