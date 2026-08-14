'use client';
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Code, X } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { Skill, SkillCategory } from '@/types';

export const AdminSkills: React.FC = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = useData();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    category: SkillCategory;
    icon: string;
    description: string;
    published: boolean;
    order: number;
  }>({
    name: '',
    category: 'DEVELOPMENT',
    icon: 'Code',
    description: '',
    published: true,
    order: 1,
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'DEVELOPMENT',
      icon: 'Code',
      description: '',
      published: true,
      order: skills.length + 1,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (s: Skill) => {
    setEditingId(s.id);
    setFormData({
      name: s.name,
      category: s.category,
      icon: s.icon || 'Code',
      description: s.description || '',
      published: s.published,
      order: s.order,
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateSkill(editingId, formData);
    } else {
      addSkill(formData);
    }
    setIsEditing(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete skill "${name}"?`)) {
      deleteSkill(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#15233D] dark:text-white">
            Skills & Tech Stack ({skills.length})
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Categorized skills across Development, Tools, and Cybersecurity learning.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#1769E8] hover:bg-[#0D3B8E] text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map(s => (
          <div
            key={s.id}
            className="p-4 bg-white dark:bg-[#0D1C33] rounded-2xl border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#15233D] dark:text-white">{s.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
                  {s.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{s.description || 'No description'}</p>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handleOpenEdit(s)}
                className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(s.id, s.name)}
                className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 rounded-lg"
              >
                <Trash2 className="w-3.5 h-3.5" />
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
              {editingId ? 'Edit Skill' : 'Add New Skill'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Skill Name
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
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as SkillCategory })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                >
                  <option value="DEVELOPMENT">DEVELOPMENT</option>
                  <option value="TOOLS">TOOLS</option>
                  <option value="CURRENTLY_LEARNING">CURRENTLY_LEARNING</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Short Description / Detail
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
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
