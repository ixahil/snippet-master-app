"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme("light");
  const [isLightMode, setIsLightMode] = useState(true);

  const handleToggle = () => {
    setIsLightMode((prev) => !prev);
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="bg-slate-100 rounded-3xl flex items-center gap-2 cursor-pointer p-2 select-none border-2"
      onClick={handleToggle}
    >
      <SunIcon
        className={`rounded-full p-2 transition ease-out duration-200 ${
          theme === "light" ? "text-white bg-accent scale-125" : "text-gray-500"
        }`}
        size={36}
      />
      <MoonIcon
        className={`rounded-full p-2 transition ease-out duration-200 ${
          theme === "dark" ? "text-white bg-accent scale-125" : "text-gray-500"
        }`}
        size={36}
      />
    </div>
  );
};

export default ThemeChanger;
