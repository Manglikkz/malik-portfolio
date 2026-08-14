'use client';
import React, { useState } from 'react';
import { Lock, KeyRound, ShieldAlert, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useData } from '@/context/DataContext';

export const AdminLoginModal: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const { loginAdmin } = useData();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (!success) {
      setError(true);
    }
  };

  const handleDemoBypass = () => {
    loginAdmin('admin123');
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#0D1C33] rounded-3xl p-8 shadow-2xl border border-[#DCE7F5] dark:border-[#1E3A66] space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#15233D] dark:text-white">
            Admin CMS Portal
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to manage projects, achievements, skills, and portfolio settings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Enter password (e.g. admin123)"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={`w-full px-4 py-3 bg-slate-50 dark:bg-[#0A1628] border ${
                  error ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                } rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition`}
              />
              <KeyRound className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-400" />
            </div>
            {error && (
              <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                Invalid credentials. Try "admin123" or use one-click access below.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#1769E8] hover:bg-[#0D3B8E] text-white font-semibold rounded-xl text-sm transition shadow flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Unlock Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <button
            type="button"
            onClick={handleDemoBypass}
            className="w-full py-2.5 bg-[#EBF3FF] dark:bg-[#162C4E] hover:bg-blue-100 dark:hover:bg-blue-900/50 text-[#1769E8] dark:text-[#4DA3FF] text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>One-Click Quick Admin Access</span>
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full text-center text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
          >
            ← Back to Public Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};
