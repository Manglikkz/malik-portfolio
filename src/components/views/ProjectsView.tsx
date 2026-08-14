'use client';
import React, { useState } from 'react';
import {
  ExternalLink,
  CodeSquare,
  ArrowRight,
  Sparkles,
  Filter,
  Layers,
  CheckCircle,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Project } from '@/types';

export const ProjectsView: React.FC = () => {
  const { projects } = useData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const publishedProjects = projects.filter(p => p.published);
  
  const categories = ['ALL', ...Array.from(new Set(publishedProjects.map(p => p.category)))];

  const filteredProjects =
    activeCategory === 'ALL'
      ? publishedProjects
      : publishedProjects.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="space-y-12 pb-16">
      {/* Header Section */}
      <section className="space-y-4 pt-4 sm:pt-8 text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#1769E8] dark:text-[#4DA3FF] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#1769E8]" />
          MY PROJECTS
        </div>

        <div className="max-w-2xl space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102A56] dark:text-white tracking-tight">
            Things I've built to solve <span className="text-[#1769E8]">problems.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#62708A] dark:text-slate-300">
            Here are some of the selected projects I've worked on, ranging from full-stack applications to security tooling.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1769E8] text-white shadow-sm'
                  : 'bg-white dark:bg-[#0D1C33] text-slate-600 dark:text-slate-300 border border-[#DCE7F5] dark:border-[#1E3A66] hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat === 'ALL' ? 'All Projects' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects List */}
      <section className="space-y-8">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#0D1C33] rounded-3xl border border-[#DCE7F5] dark:border-[#1E3A66]">
            <p className="text-slate-500">No projects found in this category.</p>
          </div>
        ) : (
          filteredProjects.map(project => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-white dark:bg-[#0D1C33] rounded-3xl overflow-hidden border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              {/* Left: Device/Image Preview */}
              <div className="lg:col-span-5 relative h-56 sm:h-72 lg:h-auto min-h-[220px] bg-slate-950 overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase rounded-md bg-[#1769E8] text-white shadow">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Right: Info & Actions */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#15233D] dark:text-white group-hover:text-[#1769E8] transition-colors">
                      {project.title}
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-[#62708A] dark:text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Bullet Highlights if caseStudy exists */}
                  {project.caseStudy?.solution && (
                    <div className="text-xs text-slate-600 dark:text-slate-400 bg-[#F8FBFF] dark:bg-[#0A1628] p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">Key Feature: </span>
                      {project.caseStudy.solution}
                    </div>
                  )}
                </div>

                <div className="space-y-4 pt-2">
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map(tech => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 text-[11px] font-semibold rounded-md bg-[#EBF3FF] dark:bg-[#162C4E] text-[#1769E8] dark:text-[#4DA3FF]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4 text-xs font-bold">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="text-[#1769E8] hover:text-[#0D3B8E] dark:hover:text-blue-300 flex items-center gap-1 hover:underline"
                        >
                          <span>Live Demo</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.sourceUrl && (
                        <a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 hover:underline"
                        >
                          <CodeSquare className="w-3.5 h-3.5" />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>

                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Case Study Details →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Case study modal */}
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};
