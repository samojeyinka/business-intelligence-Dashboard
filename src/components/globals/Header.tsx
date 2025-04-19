'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useThemeStore } from '@/lib/stores/themeStore';
import PdfToolsDropdown from './PdfToolsDropdown';
import { logo } from '../../../public/assets/assets';
import Image from 'next/image';

export default function Header() {
  const { darkMode, toggleDarkMode } = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when resizing to larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 ${
        darkMode
          ? "bg-gray-900/90 border-gray-800"
          : "bg-white/80 border-gray-200"
      } backdrop-blur-lg border-b transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo section */}
          <div className="flex items-center">
            <Image src={logo} alt='Noteppaper AI' className='w-[44px] transition-transform duration-300 hover:scale-105' />
            <span className="text-2xl font-semibold bg-gradient-to-r from-purple-500 to-blue-600 text-transparent bg-clip-text ml-2">
              NotepaperAI
            </span>
          </div>
          
          {/* Desktop menu */}
          <div className={`hidden md:flex items-center space-x-4 ${darkMode ? "text-white" : "text-black"}`}>
            <PdfToolsDropdown />
            <a
              href="#pricing"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Testimonials
            </a>
            <a
              href="#roadmap"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Roadmap
            </a>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-md transition-all duration-300 ${
                darkMode
                  ? "bg-gray-800 text-yellow-300 hover:bg-gray-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200">
              Log in
            </button>
          </div>
          
          {/* Mobile menu controls */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-md transition-all duration-300 ${
                darkMode
                  ? "bg-gray-800 text-yellow-300"
                  : "bg-gray-200 text-gray-700"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div
        className={`md:hidden ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        } transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        <div className="px-4 py-2 space-y-2">
          <PdfToolsDropdown />
          <a
            href="#pricing"
            className="block py-2 hover:text-blue-600 transition-colors"
          >
            Pricing
          </a>
          <a
            href="#testimonials"
            className="block py-2 hover:text-blue-600 transition-colors"
          >
            Testimonials
          </a>
          <a
            href="#roadmap"
            className="block py-2 hover:text-blue-600 transition-colors"
          >
            Roadmap
          </a>
          <button className="w-full mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
            Log in
          </button>
        </div>
      </div>
    </header>
  );
}