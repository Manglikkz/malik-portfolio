'use client';
import React, { useState } from 'react';
import { Save, Check, User, Sparkles } from 'lucide-react';
import { useData } from '@/context/DataContext';

export const AdminAbout: React.FC = () => {
  const { aboutProfile, updateAboutProfile } = useData();
  const [formData, setFormData] = useState({ ...aboutProfile });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-[#15233D] dark:text-white">
          About Profile & Bio Editor
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Modify personal introduction, education, location, interests, and current focus.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-[#0D1C33] rounded-3xl border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Location
            </label>
            <input
              type="text"
              required
              value={formData.publicLocation}
              onChange={e => setFormData({ ...formData, publicLocation: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Headline (Left Hero Heading on About page)
          </label>
          <input
            type="text"
            required
            value={formData.headline}
            onChange={e => setFormData({ ...formData, headline: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Bio Paragraph
          </label>
          <textarea
            rows={3}
            required
            value={formData.bio}
            onChange={e => setFormData({ ...formData, bio: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Education
            </label>
            <input
              type="text"
              required
              value={formData.education}
              onChange={e => setFormData({ ...formData, education: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Interests
            </label>
            <input
              type="text"
              required
              value={formData.interests}
              onChange={e => setFormData({ ...formData, interests: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Current Focus
          </label>
          <input
            type="text"
            required
            value={formData.currentFocus}
            onChange={e => setFormData({ ...formData, currentFocus: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
          />
        </div>

        <div className="flex justify-end pt-3">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#1769E8] hover:bg-[#0D3B8E] text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Saved Successfully</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
