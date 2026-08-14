'use client';
import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  ExternalLink,
  Calendar,
  X,
  Sparkles,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { Achievement } from '@/types';

export const AchievementsView: React.FC = () => {
  const { achievements } = useData();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const publishedAchievements = achievements.filter(a => a.published);

  return (
    <div className="space-y-12 pb-16">
      {/* Header Section */}
      <section className="space-y-4 pt-4 sm:pt-8 text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#1769E8] dark:text-[#4DA3FF] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#1769E8]" />
          ACHIEVEMENTS
        </div>

        <div className="max-w-2xl space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102A56] dark:text-white tracking-tight">
            Milestones & recognitions that keep me <span className="text-[#1769E8]">motivated.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#62708A] dark:text-slate-300">
            A verified record of certifications, workshops, seminars, and cybersecurity competitions participated in throughout my journey.
          </p>
        </div>
      </section>

      {/* Grid of Credentials (3 Columns on desktop, 1 on mobile) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishedAchievements.map(ach => (
          <div
            key={ach.id}
            onClick={() => setSelectedAchievement(ach)}
            className="group bg-white dark:bg-[#0D1C33] rounded-3xl p-6 sm:p-7 border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm hover:shadow-xl hover:border-blue-400/60 dark:hover:border-blue-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6"
          >
            {/* Top Seal & Category */}
            <div className="flex flex-col items-center text-center space-y-3">
              {/* Emblem / Badge Circle */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-800 dark:to-slate-900 border border-blue-200 dark:border-blue-900/50 shadow-inner flex items-center justify-center group-hover:scale-110 group-hover:border-blue-500 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#1769E8]/10 dark:bg-blue-500/20 text-[#1769E8] dark:text-[#4DA3FF] flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-extrabold text-[#15233D] dark:text-white group-hover:text-[#1769E8] transition-colors leading-snug">
                {ach.title}
              </h3>

              {/* Issuer */}
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {ach.issuer}
              </p>
            </div>

            {/* Bottom Meta & Year Badge */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="px-3 py-1 bg-[#F2F7FF] dark:bg-[#162C4E] text-[#1769E8] dark:text-[#4DA3FF] font-mono font-bold rounded-full text-[11px]">
                {ach.year}
              </span>
              <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                View Certificate →
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Certificate Viewer Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-xl bg-white dark:bg-[#0D1C33] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#DCE7F5] dark:border-[#1E3A66]"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAchievement(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1769E8] dark:text-[#4DA3FF] uppercase tracking-wider">
                    {selectedAchievement.category} • {selectedAchievement.year}
                  </span>
                  <h3 className="text-xl font-bold text-[#15233D] dark:text-white">
                    {selectedAchievement.title}
                  </h3>
                </div>
              </div>

              {/* Certificate Image Preview */}
              <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800">
                <img
                  src={selectedAchievement.image}
                  alt={selectedAchievement.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <p className="text-xs text-white/90 font-medium">
                    Issued by: {selectedAchievement.issuer}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Credential Description
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedAchievement.description}
                </p>
              </div>

              {/* Verification Info */}
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Official Certificate of Participation</span>
                </div>
                {selectedAchievement.credentialUrl && (
                  <a
                    href={selectedAchievement.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Issuer Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
