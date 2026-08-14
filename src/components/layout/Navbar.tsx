'use client';
type AppRoute = string;
import React, { useState } from 'react';
import {
  Shield,
  Moon,
  Sun,
  Menu,
  X,
  Send,
  Lock,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useData } from '@/context/DataContext';

export const Navbar: React.FC = () => {
  const { currentRoute, setCurrentRoute, theme, toggleTheme, setContactModalOpen, isAdminAuthenticated } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; route: AppRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'About', route: 'about' },
    { label: 'Projects', route: 'projects' },
    { label: 'Achievements', route: 'achievements' },
    { label: 'Skills', route: 'skills' },
    { label: 'Journey', route: 'journey' },
  ];

  const handleNavClick = (route: AppRoute) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-[#0A1628]/85 backdrop-blur-md border-b border-[#DCE7F5] dark:border-[#1E3A66] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-1.5 text-2xl font-extrabold tracking-tight text-[#102A56] dark:text-white cursor-pointer group focus:outline-none"
        >
          <span>Malik</span>
          <span className="text-[#1769E8] font-black group-hover:scale-125 transition-transform">.</span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map(link => {
            const isActive = currentRoute === link.route;
            return (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#1769E8] bg-[#EBF3FF] dark:bg-[#132E56] font-semibold'
                    : 'text-[#62708A] dark:text-slate-300 hover:text-[#15233D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Contact Me CTA */}
          <button
            onClick={() => setContactModalOpen(true)}
            className="px-4 py-2 bg-[#1769E8] hover:bg-[#0D3B8E] text-white text-xs sm:text-sm font-semibold rounded-full shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center gap-1.5"
          >
            <span>Contact Me</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full text-[#62708A] dark:text-slate-300 hover:text-[#15233D] dark:hover:text-white hover:bg-[#F2F7FF] dark:hover:bg-slate-800 transition cursor-pointer border border-[#DCE7F5] dark:border-[#1E3A66]"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Admin CMS Access */}
          <button
            onClick={() => handleNavClick('admin')}
            title="Admin CMS"
            className={`p-2 rounded-full transition cursor-pointer border ${
              currentRoute.startsWith('admin')
                ? 'bg-blue-600 text-white border-blue-600'
                : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 border-[#DCE7F5] dark:border-[#1E3A66]'
            }`}
          >
            {isAdminAuthenticated ? <Shield className="w-4 h-4 text-emerald-500" /> : <Lock className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile menu and controls */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setContactModalOpen(true)}
            className="px-3 py-1.5 bg-[#1769E8] text-white text-xs font-semibold rounded-full"
          >
            Contact
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-[#DCE7F5] dark:border-[#1E3A66] bg-white dark:bg-[#0A1628] px-4 py-4 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          {navLinks.map(link => {
            const isActive = currentRoute === link.route;
            return (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-left text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#EBF3FF] dark:bg-[#132E56] text-[#1769E8] font-bold'
                    : 'text-[#15233D] dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-2">
            <button
              onClick={() => handleNavClick('admin')}
              className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 hover:text-blue-600"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin CMS Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
