'use client';
import React from 'react';
import {
  FolderGit2,
  Award,
  Layers,
  Calendar,
  Sparkles,
  ArrowRight,
  Plus,
  ShieldCheck,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { useData } from '@/context/DataContext';

export const AdminDashboard: React.FC<{ onNavigateTab: (tab: string) => void }> = ({ onNavigateTab }) => {
  const { projects, achievements, skills, journey, aboutProfile } = useData();

  const publishedProjects = projects.filter(p => p.published).length;
  const publishedAchievements = achievements.filter(a => a.published).length;
  const totalItems = projects.length + achievements.length + skills.length + journey.length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#102A56] to-[#1769E8] rounded-3xl text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/15 text-xs font-semibold backdrop-blur">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Admin Active • {aboutProfile.name}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Portfolio CMS Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-md">
            Manage your public showcase without touching source code. Changes update instantly.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('projects')}
          className="px-5 py-2.5 bg-white hover:bg-slate-100 text-[#102A56] text-xs font-bold rounded-xl shadow transition shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateTab('projects')}
          className="p-5 bg-white dark:bg-[#0D1C33] rounded-2xl border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm hover:border-blue-400 transition cursor-pointer space-y-1"
        >
          <div className="flex items-center justify-between">
            <FolderGit2 className="w-5 h-5 text-blue-600" />
            <span className="text-xs text-slate-400 font-semibold">{publishedProjects} published</span>
          </div>
          <p className="text-2xl font-black text-[#15233D] dark:text-white pt-2">{projects.length}</p>
          <p className="text-xs font-semibold text-slate-500">Total Projects</p>
        </div>

        <div
          onClick={() => onNavigateTab('achievements')}
          className="p-5 bg-white dark:bg-[#0D1C33] rounded-2xl border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm hover:border-blue-400 transition cursor-pointer space-y-1"
        >
          <div className="flex items-center justify-between">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-xs text-slate-400 font-semibold">{publishedAchievements} published</span>
          </div>
          <p className="text-2xl font-black text-[#15233D] dark:text-white pt-2">{achievements.length}</p>
          <p className="text-xs font-semibold text-slate-500">Achievements</p>
        </div>

        <div
          onClick={() => onNavigateTab('skills')}
          className="p-5 bg-white dark:bg-[#0D1C33] rounded-2xl border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm hover:border-blue-400 transition cursor-pointer space-y-1"
        >
          <div className="flex items-center justify-between">
            <Layers className="w-5 h-5 text-emerald-500" />
            <span className="text-xs text-slate-400 font-semibold">3 categories</span>
          </div>
          <p className="text-2xl font-black text-[#15233D] dark:text-white pt-2">{skills.length}</p>
          <p className="text-xs font-semibold text-slate-500">Tech Skills</p>
        </div>

        <div
          onClick={() => onNavigateTab('journey')}
          className="p-5 bg-white dark:bg-[#0D1C33] rounded-2xl border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm hover:border-blue-400 transition cursor-pointer space-y-1"
        >
          <div className="flex items-center justify-between">
            <Calendar className="w-5 h-5 text-purple-500" />
            <span className="text-xs text-slate-400 font-semibold">Ordered</span>
          </div>
          <p className="text-2xl font-black text-[#15233D] dark:text-white pt-2">{journey.length}</p>
          <p className="text-xs font-semibold text-slate-500">Timeline Milestones</p>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Projects */}
        <div className="lg:col-span-7 bg-white dark:bg-[#0D1C33] rounded-3xl p-6 border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#15233D] dark:text-white">
              Recent Projects
            </h3>
            <button
              onClick={() => onNavigateTab('projects')}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Manage all →
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {projects.slice(0, 3).map(p => (
              <div key={p.id} className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#15233D] dark:text-white">{p.title}</h4>
                  <p className="text-xs text-slate-400">{p.technologies.slice(0, 3).join(', ')}</p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    p.published ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {p.published ? 'Active' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: CMS Capabilities & Status */}
        <div className="lg:col-span-5 bg-white dark:bg-[#0D1C33] rounded-3xl p-6 border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#15233D] dark:text-white">
            System & Sync Status
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Interactive CLI Terminal allowlist synced</span>
            </div>
            <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Local-first Persistent Storage online</span>
            </div>
            <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Light/Dark theme synchronization active</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <button
              onClick={() => onNavigateTab('about')}
              className="w-full py-2 bg-[#F2F7FF] dark:bg-[#162C4E] text-[#1769E8] dark:text-[#4DA3FF] text-xs font-bold rounded-xl hover:bg-blue-100 transition cursor-pointer text-center"
            >
              Edit About Profile Info
            </button>
            <button
              onClick={() => onNavigateTab('settings')}
              className="w-full py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-200 transition cursor-pointer text-center"
            >
              Edit Hero & Site Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
