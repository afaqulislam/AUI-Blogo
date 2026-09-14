"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, MonitorIcon } from "./Icons";

const order = ["light", "dark", "system"] as const;

const nextTheme = (current?: string) => {
  const index = order.indexOf(current as (typeof order)[number]);
  return order[(index + 1) % order.length];
};

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      title={`Theme: ${theme}`}
      aria-label={`${theme} theme, click to switch`}
      className="border border-purple-500 rounded-2xl p-1 hover:bg-purple-500 hover:bg-opacity-10 dark:hover:bg-opacity-10 dark:hover:bg-amber-50"
      onClick={() => setTheme(nextTheme(theme))}
    >
      {theme === "dark" ? <SunIcon /> : theme === "system" ? <MonitorIcon /> : <MoonIcon />}
    </button>
  );
};

export default ThemeSwitch;