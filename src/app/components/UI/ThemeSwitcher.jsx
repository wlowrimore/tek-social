'use client';

import { useTheme } from "next-themes";
import { useState, useEffect } from 'react';
import { HiMoon, HiOutlineLightBulb, HiOutlineMoon } from "react-icons/hi";
export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false); // Track animation state

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setTheme(theme === 'light' ? 'dark' : 'light');
    }, 200);
  }

  return (
    <div className={`theme-switcher flex items-center w-[5rem] justify-between rounded-full transition-all duration-300 ease-in-out ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <button onClick={toggleTheme} className='w-full focus:outline-none relative'>
        <HiMoon className={`absolute -mt-3.5 top-1/4 left-1/4 text-[1.6rem] transform -translate-x-1/4 -translate-y-1/4 transition-all duration-200 ease-in-out ${isAnimating ? 'opacity-0' : (theme === 'light' ? 'opacity-100' : 'opacity-0')}`} />
        <HiOutlineLightBulb className={`absolute -mt-3.5 top-1/4 left-1/4 text-[1.6rem] transform -translate-x-1/4 -translate-y-1/4 transition-all duration-200 ease-in-out ${isAnimating ? 'opacity-0' : (theme === 'dark' ? 'opacity-100' : 'opacity-0')}`} />
      </button>
    </div>
  )
}