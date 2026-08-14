'use client';
import React, { useState } from 'react';
import {
  Code,
  FileCode2,
  Atom,
  Globe,
  Server,
  GitBranch,
  CodeSquare,
  TerminalSquare,
  Box,
  Database,
  Terminal,
  ShieldAlert,
  Scan,
  Lock,
  Cpu,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { Skill, SkillCategory } from '@/types';
// Map icon string names to Lucide icons
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  FileCode2,
  Code,
  Atom,
  Globe,
  Server,
  GitBranch,
  CodeSquare,
  TerminalSquare,
  Box,
  Database,
  Terminal,
  ShieldAlert,
  Scan,
  Lock,
  Cpu,
  Layers,
};
export const SkillsView: React.FC = () => {
  const { skills } = useData();
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const publishedSkills = skills.filter(s => s.published);
  const devSkills = publishedSkills.filter(s => s.category === 'DEVELOPMENT');
  const toolSkills = publishedSkills.filter(s => s.category === 'TOOLS');
  const learningSkills = publishedSkills.filter(s => s.category === 'CURRENTLY_LEARNING');
  const renderSkillCard = (skill: Skill, colorTheme: 'blue' | 'emerald' | 'amber') => {
    const IconComponent = skill.icon && iconMap[skill.icon] ? iconMap[skill.icon] : Code;
    const bgMap = {
      blue: 'hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-blue-500/10',
      emerald: 'hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-emerald-500/10',
      amber: 'hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-amber-500/10',
    };
    const iconBgMap = {
      blue: 'bg-[#EBF3FF] dark:bg-[#162C4E] text-[#1769E8] dark:text-[#4DA3FF]',
      emerald: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
      amber: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400',
    };
    return (
      <div
        key={skill.id}
        onClick={() => setSelectedSkill(skill)}
        className={`group bg-white dark:bg-[#0D1C33] rounded-2xl p-4 sm:p-5 border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col items-center text-center space-y-3 ${bgMap[colorTheme]}`}
      >
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${iconBgMap[colorTheme]}`}>
          <IconComponent className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-[#15233D] dark:text-white group-hover:text-[#1769E8] transition-colors">
            {skill.name}
          </h4>
          {skill.description && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
              {skill.description}
            </p>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="space-y-14 pb-16">
      {/* Header */}
      <section className="space-y-4 pt-4 sm:pt-8 text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#1769E8] dark:text-[#4DA3FF] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#1769E8]" />
          MY SKILLS
        </div>
        <div className="max-w-2xl space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102A56] dark:text-white tracking-tight">
            Technologies & tools I work <span className="text-[#1769E8]">with.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#62708A] dark:text-slate-300">
            A comprehensive overview of programming languages, frameworks, developer tools, and security concepts in my active stack.
          </p>
        </div>
      </section>
      {/* 1. Development */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-[#102A56] dark:text-white">
            Development
          </h2>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#EBF3FF] dark:bg-[#132E56] text-[#1769E8]">
            {devSkills.length} Techs
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {devSkills.map(skill => renderSkillCard(skill, 'blue'))}
        </div>
      </section>
      {/* 2. Tools & Others */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-[#102A56] dark:text-white">
            Tools & Others
          </h2>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {toolSkills.length} Tools
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {toolSkills.map(skill => renderSkillCard(skill, 'emerald'))}
        </div>
      </section>
      {/* 3. Currently Learning */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-[#102A56] dark:text-white">
            Currently Learning & Cybersecurity Focus
          </h2>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
            Active Study
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {learningSkills.map(skill => renderSkillCard(skill, 'amber'))}
        </div>
      </section>
      {/* Skill Detail Tooltip / Info Toast */}
      {selectedSkill && (
        <div className="p-4 bg-[#F2F7FF] dark:bg-[#0A1628] rounded-2xl border border-[#DCE7F5] dark:border-[#1E3A66] flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-[#1769E8] shrink-0" />
            <div>
              <span className="font-bold text-[#15233D] dark:text-white">
                {selectedSkill.name}:
              </span>{' '}
              <span className="text-slate-600 dark:text-slate-300">
                {selectedSkill.description || 'Core technology used in daily software architecture and security exploration.'}
              </span>
            </div>
          </div>
          <button
            onClick={() => setSelectedSkill(null)}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-white ml-2"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};
