'use client';
import React, { useState } from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  Award,
  Layers,
  Calendar,
  User,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { AdminLoginModal } from './AdminLoginModal';
import { AdminDashboard } from './AdminDashboard';
import { AdminProjects } from './AdminProjects';
import { AdminAchievements } from './AdminAchievements';
import { AdminSkills } from './AdminSkills';
import { AdminJourney } from './AdminJourney';
import { AdminAbout } from './AdminAbout';
import { AdminSettings } from './AdminSettings';

export const AdminShell: React.FC = () => {
  const { isAdminAuthenticated, logoutAdmin, setCurrentRoute } = useData();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  if (!isAdminAuthenticated) {
    return <AdminLoginModal onCancel={() => setCurrentRoute('home')} />;
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'skills', label: 'Skills & Tech', icon: Layers },
    { id: 'journey', label: 'Journey Timeline', icon: Calendar },
    { id: 'about', label: 'About Profile', icon: User },
    { id: 'settings', label: 'Site Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen -mx-4 sm:-mx-6 -my-8 sm:-my-10 bg-slate-50 dark:bg-[#070F1C] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-30 h-screen w-64 bg-white dark:bg-[#0D1C33] border-r border-[#DCE7F5] dark:border-[#1E3A66] flex flex-col justify-between p-4 transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Brand header */}
          <div className="flex items-center justify-between px-2 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                M
              </div>
              <div>
                <h1 className="text-sm font-black text-[#102A56] dark:text-white">Malik CMS</h1>
                <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">Admin Workspace</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="space-y-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isActive
                      ? 'bg-[#1769E8] text-white shadow'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom links */}
        <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setCurrentRoute('home')}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-blue-500" />
            <span>View Public Site</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10 space-y-6">
        {/* Mobile Header Bar */}
        <div className="md:hidden flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 bg-white dark:bg-[#0D1C33] border border-slate-200 dark:border-slate-700 rounded-xl"
          >
            <Menu className="w-5 h-5 text-slate-700 dark:text-slate-200" />
          </button>
          <span className="text-sm font-bold text-slate-800 dark:text-white capitalize">
            {activeTab}
          </span>
          <button
            onClick={() => setCurrentRoute('home')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400"
          >
            Exit CMS
          </button>
        </div>

        {/* Render Tab Component */}
        {activeTab === 'dashboard' && <AdminDashboard onNavigateTab={setActiveTab} />}
        {activeTab === 'projects' && <AdminProjects />}
        {activeTab === 'achievements' && <AdminAchievements />}
        {activeTab === 'skills' && <AdminSkills />}
        {activeTab === 'journey' && <AdminJourney />}
        {activeTab === 'about' && <AdminAbout />}
        {activeTab === 'settings' && <AdminSettings />}
      </main>
    </div>
  );
};
