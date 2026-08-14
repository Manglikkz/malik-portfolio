'use client';
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Award, Eye, EyeOff, X, ExternalLink } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { Achievement } from '@/types';

export const AdminAchievements: React.FC = () => {
  const { achievements, addAchievement, updateAchievement, deleteAchievement } = useData();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    year: '2024',
    category: 'Cybersecurity',
    description: '',
    image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=600&q=80',
    credentialUrl: '',
    published: true,
    order: 1,
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      issuer: '',
      year: new Date().getFullYear().toString(),
      category: 'Cybersecurity',
      description: '',
      image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=600&q=80',
      credentialUrl: '',
      published: true,
      order: achievements.length + 1,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (ach: Achievement) => {
    setEditingId(ach.id);
    setFormData({
      title: ach.title,
      issuer: ach.issuer,
      year: ach.year,
      category: ach.category,
      description: ach.description,
      image: ach.image,
      credentialUrl: ach.credentialUrl || '',
      published: ach.published,
      order: ach.order,
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      issuer: formData.issuer,
      year: formData.year,
      category: formData.category,
      description: formData.description,
      image: formData.image,
      credentialUrl: formData.credentialUrl,
      published: formData.published,
      order: Number(formData.order),
    };

    if (editingId) {
      updateAchievement(editingId, payload);
    } else {
      addAchievement(payload);
    }
    setIsEditing(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete achievement "${title}"?`)) {
      deleteAchievement(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#15233D] dark:text-white">
            Achievements & Certificates ({achievements.length})
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage official certificates, awards, government recognitions, and seminar participation.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#1769E8] hover:bg-[#0D3B8E] text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map(ach => (
          <div
            key={ach.id}
            className="p-5 bg-white dark:bg-[#0D1C33] rounded-2xl border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                  {ach.year}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    ach.published
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {ach.published ? 'Published' : 'Draft'}
                </span>
              </div>

              <h4 className="text-sm font-bold text-[#15233D] dark:text-white line-clamp-2">
                {ach.title}
              </h4>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                {ach.issuer}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {ach.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => updateAchievement(ach.id, { published: !ach.published })}
                className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
              >
                {ach.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{ach.published ? 'Visible' : 'Hidden'}</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(ach)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(ach.id, ach.title)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 rounded-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div
            className="relative w-full max-w-lg bg-white dark:bg-[#0D1C33] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#DCE7F5] dark:border-[#1E3A66]"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#15233D] dark:text-white mb-4">
              {editingId ? 'Edit Achievement' : 'Add Achievement'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Certificate Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Issuer / Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.issuer}
                    onChange={e => setFormData({ ...formData, issuer: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.year}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Credential / Verification URL
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.credentialUrl}
                  onChange={e => setFormData({ ...formData, credentialUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pub-ach"
                  checked={formData.published}
                  onChange={e => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="pub-ach" className="text-xs font-semibold">
                  Published (Publicly Visible)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1769E8] text-white text-xs font-bold rounded-xl"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
