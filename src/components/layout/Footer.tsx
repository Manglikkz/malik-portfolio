'use client';
import React from 'react';
import { CodeSquare, Mail, MessageCircle, Globe } from 'lucide-react';
import { useData } from '@/context/DataContext';

export const Footer: React.FC = () => {
  const { siteSettings, aboutProfile, setCurrentRoute } = useData();

  const emailUrl = siteSettings.contactEmail
    ? `mailto:${siteSettings.contactEmail}`
    : 'mailto:malik.ibrahim.dev@gmail.com';
  const instagramUrl = siteSettings.instagramUrl || 'https://instagram.com';
  const whatsappUrl = siteSettings.whatsappUrl || 'https://wa.me/6281234567890';
  const githubUrl = siteSettings.githubUrl || 'https://github.com';

  const socialLinks = [
    {
      id: 'footer-email',
      name: 'Email',
      href: emailUrl,
      icon: Mail,
      isExternal: false,
      hoverClass: 'hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50',
    },
    {
      id: 'footer-instagram',
      name: 'Instagram',
      href: instagramUrl,
      icon: Globe,
      isExternal: true,
      hoverClass: 'hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-950/50',
    },
    {
      id: 'footer-whatsapp',
      name: 'WhatsApp',
      href: whatsappUrl,
      icon: MessageCircle,
      isExternal: true,
      hoverClass: 'hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50',
    },
    {
      id: 'footer-github',
      name: 'GitHub',
      href: githubUrl,
      icon: CodeSquare,
      isExternal: true,
      hoverClass: 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800',
    },
  ];

  return (
    <footer className="w-full bg-[#F2F7FF] dark:bg-[#081220] border-t border-[#DCE7F5] dark:border-[#1E3A66] py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Author info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <button
            onClick={() => setCurrentRoute('home')}
            className="text-lg font-extrabold text-[#102A56] dark:text-white flex items-center gap-1 cursor-pointer"
          >
            <span>{aboutProfile.name}</span>
            <span className="text-[#1769E8]">.</span>
          </button>
          <p className="text-xs text-[#62708A] dark:text-slate-400 mt-1">
            {aboutProfile.headline || 'Full-Stack Developer & Cybersecurity Enthusiast'}
          </p>
        </div>

        {/* Social channels: only Email, instagramUrl, WhatsApp, GitHub */}
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          {socialLinks.map(link => {
            const Icon = link.icon;
            return (
              <a
                key={link.id}
                href={link.href}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                title={link.name}
                aria-label={link.name}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-900/60 border border-[#DCE7F5] dark:border-[#1E3A66] transition-all shadow-xs ${link.hoverClass}`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Copyright & Admin link */}
        <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-col md:flex-row items-center gap-2">
          <span>{siteSettings.footerText || '© 2026 Malik Ibrahim. All rights reserved.'}</span>
          <span className="hidden md:inline">•</span>
          <button
            onClick={() => setCurrentRoute('admin')}
            className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer text-[11px] underline"
          >
            Admin CMS
          </button>
        </div>
      </div>
    </footer>
  );
};
