'use client';
import React, { useState } from 'react';
import { ShieldCheck, QrCode, Sparkles, User, KeyRound, Wifi } from 'lucide-react';
import { useData } from '@/context/DataContext';

export const LanyardBadge: React.FC = () => {
  const { aboutProfile } = useData();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({
      x: -(y / rect.height) * 16,
      y: (x / rect.width) * 16,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div className="relative flex flex-col items-center select-none group perspective-1000">
      {/* Lanyard Fabric Strap (Top hanging down) */}
      <div className="relative flex flex-col items-center">
        {/* Upper strap loop */}
        <div className="w-9 h-14 bg-gradient-to-b from-[#0F2A56] to-[#1769E8] shadow-md rounded-t-sm flex items-center justify-center relative overflow-hidden border-x border-[#0D3B8E]">
          {/* Lanyard fabric texture lines */}
          <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(45deg,#fff,#fff_2px,transparent_2px,transparent_4px)]" />
          <span className="text-[7px] text-white font-mono uppercase tracking-widest rotate-90 font-bold opacity-80">MALIK</span>
        </div>

        {/* Metal Carabiner Clip */}
        <div className="relative -mt-1 z-10 flex flex-col items-center">
          <div className="w-5 h-4 bg-gradient-to-b from-slate-300 via-slate-100 to-slate-400 rounded-sm shadow border border-slate-400 flex items-center justify-center">
            <div className="w-2.5 h-1.5 bg-slate-600 rounded-full" />
          </div>
          {/* Metal hook loop */}
          <div className="w-2 h-3.5 border-2 border-slate-400 border-t-0 rounded-b-full -mt-0.5 bg-transparent" />
        </div>
      </div>

      {/* Physical Badge Holder */}
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(${isHovered ? '-4px' : '0px'})`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        className="relative -mt-1 w-52 sm:w-56 bg-white dark:bg-[#132238] rounded-2xl p-4 shadow-2xl border border-slate-200/80 dark:border-[#223B63] transition-shadow duration-300 hover:shadow-blue-500/20"
      >
        {/* Punch Hole for clip */}
        <div className="w-8 h-2.5 mx-auto -mt-2.5 mb-3 bg-slate-200 dark:bg-slate-800 rounded-full border border-slate-300 dark:border-slate-700 shadow-inner" />

        {/* Badge Card Content */}
        <div className="flex flex-col items-center text-center">
          {/* Top Status & RFID icon */}
          <div className="w-full flex items-center justify-between text-[10px] text-slate-400 font-mono mb-2">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              VERIFIED
            </span>
            <div className="flex items-center gap-1 text-slate-400">
              <Wifi className="w-3 h-3 text-blue-500" />
              <span>NFC</span>
            </div>
          </div>

          {/* Avatar Monogram */}
          <div className="relative mb-3 group-hover:scale-105 transition-transform">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1769E8] to-[#4DA3FF] p-0.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-white dark:bg-[#0A1628] rounded-[14px] flex items-center justify-center text-2xl font-black text-[#1769E8] dark:text-[#4DA3FF]">
                M
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Name & Role */}
          <h3 className="text-base font-extrabold text-[#15233D] dark:text-white tracking-tight">
            {aboutProfile.name.toUpperCase()}
          </h3>
          <p className="text-[11px] font-semibold text-[#1769E8] dark:text-[#4DA3FF] mt-0.5">
            Developer
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            Cybersecurity Enthusiast
          </p>

          {/* Subtle separator */}
          <div className="w-full h-px bg-slate-100 dark:bg-slate-800 my-3" />

          {/* QR Code and Identity Meta */}
          <div className="w-full flex items-center justify-between gap-2 px-1">
            <div className="text-left font-mono text-[9px] text-slate-400 space-y-0.5">
              <p><span className="text-slate-500 dark:text-slate-300 font-semibold">ID:</span> SEC-2026-MI</p>
              <p><span className="text-slate-500 dark:text-slate-300 font-semibold">ROLE:</span> FULLSTACK</p>
              <p><span className="text-slate-500 dark:text-slate-300 font-semibold">CLEARANCE:</span> L3</p>
            </div>

            {/* Stylized QR Code */}
            <div className="p-1 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center">
              <QrCode className="w-9 h-9 text-[#102A56] dark:text-white" />
            </div>
          </div>

          {/* Barcode bottom graphic */}
          <div className="w-full mt-3 pt-2 border-t border-dashed border-slate-200 dark:border-slate-800/80 flex items-center justify-center">
            <div className="h-4 flex items-center gap-[2px] opacity-70">
              {[2, 4, 1, 3, 2, 5, 1, 3, 4, 2, 1, 4, 3, 2, 1, 5, 2, 3, 1, 4].map((h, i) => (
                <div
                  key={i}
                  className="w-[2px] bg-slate-800 dark:bg-slate-300 rounded-full"
                  style={{ height: `${h * 3 + 4}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Subtle holographic sheen overlay */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity bg-gradient-to-tr from-transparent via-white/40 to-transparent"
          style={{ mixBlendMode: 'overlay' }}
        />
      </div>
    </div>
  );
};
