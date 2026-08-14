'use client';
import React from 'react';
import { Sparkles, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useData } from '@/context/DataContext';

export const JourneyView: React.FC = () => {
  const { journey, setContactModalOpen } = useData();

  const publishedJourney = journey.filter(j => j.published);

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <section className="space-y-4 pt-4 sm:pt-8 text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#1769E8] dark:text-[#4DA3FF] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#1769E8]" />
          MY JOURNEY
        </div>

        <div className="max-w-2xl space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102A56] dark:text-white tracking-tight">
            My learning journey <span className="text-[#1769E8]">so far.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#62708A] dark:text-slate-300">
            A chronological timeline documenting my continuous growth from writing first lines of code to building full-stack platforms and learning cybersecurity defense.
          </p>
        </div>
      </section>

      {/* Vertical Timeline */}
      <section className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-2 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#DCE7F5] dark:before:bg-[#1E3A66]">
        {publishedJourney.map((item, idx) => (
          <div key={item.id} className="relative group">
            {/* Timeline Node Icon/Dot */}
            <div className="absolute -left-6 sm:-left-10 top-1.5 w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-white dark:bg-[#0A1628] border-2 border-[#1769E8] flex items-center justify-center shadow-sm group-hover:scale-125 group-hover:bg-[#1769E8] transition-all duration-300">
              <span className="w-2 h-2 rounded-full bg-[#1769E8] group-hover:bg-white transition-colors" />
            </div>

            {/* Timeline Card */}
            <div className="p-6 sm:p-7 bg-white dark:bg-[#0D1C33] rounded-3xl border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm hover:shadow-lg hover:border-blue-400/60 dark:hover:border-blue-500/50 transition-all duration-200 space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#EBF3FF] dark:bg-[#162C4E] text-[#1769E8] dark:text-[#4DA3FF] font-mono font-extrabold text-xs sm:text-sm rounded-full">
                  {item.dateOrYear}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-[#15233D] dark:text-white">
                  {item.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#62708A] dark:text-slate-300 leading-relaxed pl-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Future roadmap card */}
      <section className="p-8 bg-[#F8FBFF] dark:bg-[#0A1628] rounded-3xl border border-[#DCE7F5] dark:border-[#1E3A66] text-center space-y-3">
        <h3 className="text-lg font-bold text-[#102A56] dark:text-white">
          What's next on the horizon?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
          Deepening hands-on network penetration testing, mastering advanced TypeScript and cloud architectures, and publishing open-source security tools.
        </p>
        <div className="pt-2">
          <button
            onClick={() => setContactModalOpen(true)}
            className="px-6 py-2.5 bg-[#1769E8] hover:bg-[#0D3B8E] text-white text-xs sm:text-sm font-semibold rounded-full shadow transition cursor-pointer"
          >
            Connect with Malik
          </button>
        </div>
      </section>
    </div>
  );
};
