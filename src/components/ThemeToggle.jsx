import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { toggleTheme, isDark } = useTheme();
  const label = isDark ? 'Ativar tema claro' : 'Ativar tema escuro';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`group grid size-10 flex-none place-items-center rounded-full bg-on-header/10 text-on-header transition hover:bg-on-header/15 active:scale-90 ${className}`}
    >
      {isDark ? (
        <Sun className="size-5 transition-transform duration-300 group-hover:rotate-45" />
      ) : (
        <Moon className="size-5 transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );
}
