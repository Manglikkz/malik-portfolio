'use client';
import React from 'react';
import {
  Compass,
  Repeat,
  Sparkles,
  Search,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  GraduationCap,
  HeartHandshake,
  User,
  ExternalLink,
  Mail,
} from 'lucide-react';
import { useData } from '@/context/DataContext';

export const AboutView: React.FC = () => {
  const { aboutProfile, setContactModalOpen } = useData();

  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      {/* About Header Section */}
      <section className="space-y-8 pt-4 sm:pt-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#1769E8] dark:text-[#4DA3FF] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#1769E8]" />
          ABOUT ME
        </div>

        {/* 2-Column Headline & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102A56] dark:text-white tracking-tight leading-[1.2]">
              {aboutProfile.headline || 'Developer who likes to understand how things work.'}
            </h1>
          </div>

          <div className="lg:col-span-6 space-y-4 text-[#62708A] dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              {aboutProfile.bio ||
                "I'm a student and self-learner who is passionate about coding and cybersecurity. I enjoy building useful projects and solving real-world problems."}
            </p>
            <p>
              My goal is to become a professional who creates long-lasting impact through technology, continuous curiosity, and verified security practices.
            </p>
            <p className="text-xs text-[#1769E8] dark:text-[#4DA3FF] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Current Focus: {aboutProfile.currentFocus}</span>
            </p>
          </div>
        </div>

        {/* 4 Details Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {/* Name */}
          <div className="p-5 bg-white dark:bg-[#0D1C33] rounded-2xl border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Name
            </span>
            <p className="text-sm sm:text-base font-bold text-[#15233D] dark:text-white">
              {aboutProfile.name}
            </p>
          </div>

          {/* Education */}
          <div className="p-5 bg-white dark:bg-[#0D1C33] rounded-2xl border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Education
            </span>
            <p className="text-sm sm:text-base font-bold text-[#15233D] dark:text-white">
              {aboutProfile.education}
            </p>
          </div>

          {/* Location */}
          <div className="p-5 bg-white dark:bg-[#0D1C33] rounded-2xl border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Location
            </span>
            <p className="text-sm sm:text-base font-bold text-[#15233D] dark:text-white">
              {aboutProfile.publicLocation}
            </p>
          </div>

          {/* Interest */}
          <div className="p-5 bg-white dark:bg-[#0D1C33] rounded-2xl border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Interest
            </span>
            <p className="text-sm sm:text-base font-bold text-[#15233D] dark:text-white">
              {aboutProfile.interests}
            </p>
          </div>
        </div>
      </section>

      {/* What Drives Me Section */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#1769E8] dark:text-[#4DA3FF] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#1769E8]" />
          WHAT DRIVES ME
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Curious */}
          <div className="p-6 sm:p-7 bg-white dark:bg-[#0D1C33] rounded-3xl border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3FF] dark:bg-[#162C4E] text-[#1769E8] dark:text-[#4DA3FF] flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#15233D] dark:text-white">
                Curious
              </h3>
              <p className="text-xs sm:text-sm text-[#62708A] dark:text-slate-400 leading-relaxed">
                I love exploring how systems work behind the scenes, dissecting network protocols, and figuring out what makes things tick.
              </p>
            </div>
          </div>

          {/* Card 2: Consistent */}
          <div className="p-6 sm:p-7 bg-white dark:bg-[#0D1C33] rounded-3xl border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#15233D] dark:text-white">
                Consistent
              </h3>
              <p className="text-xs sm:text-sm text-[#62708A] dark:text-slate-400 leading-relaxed">
                I keep learning and building every single day, turning continuous curiosity into practical code and resilient software.
              </p>
            </div>
          </div>

          {/* Card 3: Impactful */}
          <div className="p-6 sm:p-7 bg-white dark:bg-[#0D1C33] rounded-3xl border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#15233D] dark:text-white">
                Impactful
              </h3>
              <p className="text-xs sm:text-sm text-[#62708A] dark:text-slate-400 leading-relaxed">
                I want to build things that help and protect others, designing digital experiences that are intuitive, safe, and robust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Banner */}
      <section className="p-8 bg-[#F2F7FF] dark:bg-[#0A1628] rounded-3xl border border-[#DCE7F5] dark:border-[#1E3A66] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-[#102A56] dark:text-white">
            Want to discuss tech, security, or a project?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            I'm always open to new connections, feedback, and learning opportunities.
          </p>
        </div>
        <button
          onClick={() => setContactModalOpen(true)}
          className="px-6 py-3 bg-[#1769E8] hover:bg-[#0D3B8E] text-white text-xs sm:text-sm font-semibold rounded-full shadow transition shrink-0 cursor-pointer"
        >
          Send a Message
        </button>
      </section>
    </div>
  );
};
