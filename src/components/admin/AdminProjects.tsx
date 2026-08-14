'use client';
import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Star,
  Eye,
  EyeOff,
  ExternalLink,
  CodeSquare,
  Layers,
  ArrowUpDown,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { Project } from '@/types';

export const AdminProjects: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useData();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'DEVELOPMENT',
    description: '',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    technologies: 'React, TypeScript, Tailwind CSS',
    liveUrl: '',
    sourceUrl: '',
    featured: true,
    published: true,
    order: 1,
    overview: '',
    problem: '',
    solution: '',
    implementation: '',
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      category: 'DEVELOPMENT',
      description: '',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
      technologies: 'React, TypeScript, Tailwind CSS',
      liveUrl: '',
      sourceUrl: '',
      featured: true,
      published: true,
      order: projects.length + 1,
      overview: '',
      problem: '',
      solution: '',
      implementation: '',
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      slug: project.slug,
      category: project.category,
      description: project.description,
      coverImage: project.coverImage,
      technologies: project.technologies.join(', '),
      liveUrl: project.liveUrl || '',
      sourceUrl: project.sourceUrl || '',
      featured: project.featured,
      published: project.published,
      order: project.order,
      overview: project.caseStudy?.overview || '',
      problem: project.caseStudy?.problem || '',
      solution: project.caseStudy?.solution || '',
      implementation: project.caseStudy?.implementation || '',
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = formData.technologies
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const projectPayload = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
      category: formData.category,
      description: formData.description,
      coverImage: formData.coverImage,
      technologies: techArray,
      liveUrl: formData.liveUrl,
      sourceUrl: formData.sourceUrl,
      featured: formData.featured,
      published: formData.published,
      order: Number(formData.order),
      caseStudy: {
        overview: formData.overview,
        problem: formData.problem,
        solution: formData.solution,
        implementation: formData.implementation,
      },
    };

    if (editingId) {
      updateProject(editingId, projectPayload);
    } else {
      addProject(projectPayload);
    }

    setIsEditing(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProject(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#15233D] dark:text-white">
            Projects Management ({projects.length})
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Add new projects, update screenshots, edit case studies, or toggle featured display.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#1769E8] hover:bg-[#0D3B8E] text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Table / Cards */}
      <div className="bg-white dark:bg-[#0D1C33] rounded-2xl border border-[#DCE7F5] dark:border-[#1E3A66] overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {projects.map(project => (
            <div
              key={project.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition"
            >
              {/* Left Info */}
              <div className="flex items-center gap-4">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-16 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#15233D] dark:text-white">
                      {project.title}
                    </h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-500" />
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 max-w-md">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                {/* Publish status toggle button */}
                <button
                  onClick={() => updateProject(project.id, { published: !project.published })}
                  title={project.published ? 'Click to unpublish' : 'Click to publish'}
                  className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${
                    project.published
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                      : 'bg-slate-100 text-slate-400 dark:bg-slate-800'
                  }`}
                >
                  {project.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                {/* Featured toggle */}
                <button
                  onClick={() => updateProject(project.id, { featured: !project.featured })}
                  title={project.featured ? 'Featured on Home' : 'Not featured'}
                  className={`p-2 rounded-xl text-xs transition cursor-pointer ${
                    project.featured
                      ? 'bg-amber-50 text-amber-500 dark:bg-amber-950/40'
                      : 'bg-slate-100 text-slate-400 dark:bg-slate-800'
                  }`}
                >
                  <Star className={`w-4 h-4 ${project.featured ? 'fill-amber-500' : ''}`} />
                </button>

                {/* Edit */}
                <button
                  onClick={() => handleOpenEdit(project)}
                  className="p-2 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 transition cursor-pointer"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(project.id, project.title)}
                  className="p-2 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-xl hover:bg-rose-100 transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit/Create Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div
            className="relative w-full max-w-2xl bg-white dark:bg-[#0D1C33] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#DCE7F5] dark:border-[#1E3A66] my-8"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#15233D] dark:text-white mb-4">
              {editingId ? 'Edit Project' : 'Create New Project'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
                  >
                    <option value="DEVELOPMENT">DEVELOPMENT</option>
                    <option value="CYBERSECURITY">CYBERSECURITY</option>
                    <option value="OPEN SOURCE">OPEN SOURCE</option>
                    <option value="FULLSTACK">FULLSTACK</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  required
                  value={formData.coverImage}
                  onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Technologies (Comma Separated)
                </label>
                <input
                  type="text"
                  required
                  placeholder="React, TypeScript, Node.js, Tailwind CSS"
                  value={formData.technologies}
                  onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.liveUrl}
                    onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Source Code URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={formData.sourceUrl}
                    onChange={e => setFormData({ ...formData, sourceUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A1628] border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Case Study Section */}
              <div className="p-4 bg-slate-50 dark:bg-[#0A1628] rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">
                  Optional Case Study Fields
                </h4>
                <div>
                  <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                    Problem & Challenge
                  </label>
                  <input
                    type="text"
                    value={formData.problem}
                    onChange={e => setFormData({ ...formData, problem: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#0D1C33] border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                    Solution & Approach
                  </label>
                  <input
                    type="text"
                    value={formData.solution}
                    onChange={e => setFormData({ ...formData, solution: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#0D1C33] border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span>Feature on Home Page</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={e => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span>Published (Publicly Visible)</span>
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
                  className="px-5 py-2 bg-[#1769E8] hover:bg-[#0D3B8E] text-white text-xs font-bold rounded-xl shadow"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
