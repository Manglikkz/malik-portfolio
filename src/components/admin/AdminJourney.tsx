'use client';
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, X } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { JourneyEntry } from '@/types';

export const AdminJourney: React.FC = () => {
  const { journey, addJourney, updateJourney, deleteJourney } = useData();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    dateOrYear: '2026',
    title: '',
    description: '',
    published: true,
    order: 1,
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      dateOrYear: new Date().getFullYear().toString(),
      title: '',
      description: '',
      published: true,
      order: journey.length + 1,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (j: JourneyEntry) => {
    setEditingId(j.id);
    setFormData({
      dateOrYear: j.dateOrYear,
      title: j.title,
      description: j.description,
      published: j.published,
      order: j.order,
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateJourney(editingId, formData);
    } else {
      addJourney(formData);
    }
    setIsEditing(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete milestone "${title}"?`)) {
      deleteJourney(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#15233D] dark:text-white">
            Learning Timeline & Journey ({journey.length})
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Chronological growth milestones shown on the Journey page.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#1769E8] hover:bg-[#0D3B8E] text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Milestone</span>
        </button>
      </div>

      <div className="space-y-3">
        {journey.map(item => (
          <div
            key={item.id}
            className="p-5 bg-white dark:bg-[#0D1C33] rounded-2xl border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs rounded-full">
                  {item.dateOrYear}
                </span>
                <h4 className="text-sm font-bold text-[#15233D] dark:text-white">
                  {item.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 pl-1 max-w-xl">
                {item.description}
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => handleOpenEdit(item)}
                className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id, item.title)}
                className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div
            className="relative w-full max-w-md bg-white dark:bg-[#0D1C33] rounded-3xl p-6 shadow-2xl border border-[#DCE7F5] dark:border-[#1E3A66]"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#15233D] dark:text-white mb-4">
              {editingId ? 'Edit Milestone' : 'Add Milestone'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Year or Date Label
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2026 or Q1 2026"
                  value={formData.dateOrYear}
                  onChange={e => setFormData({ ...formData, dateOrYear: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Milestone Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm resize-none"
                />
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
