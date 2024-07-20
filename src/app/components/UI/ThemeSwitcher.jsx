'use client';

import { useState, useEffect } from 'react';
import { HiMoon, HiSun } from "react-icons/hi";
export function ThemeSwitcher({ toggleTheme, isAnimating, theme }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`theme-switcher flex items-center w-[2.5rem] rounded-full transition-all duration-300 ease-in-out ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <button onClick={toggleTheme} className='w-full focus:outline-none relative'>
        <HiMoon className={`absolute -bottom-3 text-[1.6rem] moon-icon ${isAnimating ? 'opacity-0' : (theme === 'light' ? 'opacity-100' : 'opacity-0')}`} />
        <HiSun className={`absolute -bottom-3 text-[1.6rem] sun-icon ${isAnimating ? 'opacity-0' : (theme === 'dark' ? 'opacity-100' : 'opacity-0')}`} />
      </button>
    </div>
  )
}