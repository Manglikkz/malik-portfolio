'use client';
import React from 'react';
import { X, ExternalLink, CodeSquare, CheckCircle, Layers, ArrowUpRight } from 'lucide-react';
import { Project } from '@/types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-[#0D1C33] rounded-3xl shadow-2xl border border-[#DCE7F5] dark:border-[#1E3A66] overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with Cover Image */}
        <div className="relative h-60 sm:h-72 w-full bg-slate-900 overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1C33] via-transparent to-black/40" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on cover */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase rounded-md bg-[#1769E8] text-white">
              {project.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {/* Tech Badges and Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-1.5">
              {project.technologies.map(tech => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#EBF3FF] dark:bg-[#162C4E] text-[#1769E8] dark:text-[#4DA3FF]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#1769E8] hover:bg-[#0D3B8E] text-white text-xs font-semibold rounded-full flex items-center gap-1.5 shadow transition"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {project.sourceUrl && (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-full flex items-center gap-1.5 transition"
                >
                  <CodeSquare className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Description</h4>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Case Study Details */}
          {project.caseStudy && (
            <div className="space-y-4">
              {project.caseStudy.overview && (
                <div className="p-4 bg-[#F8FBFF] dark:bg-[#0A1628] rounded-2xl border border-slate-200/70 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                    Project Overview
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {project.caseStudy.overview}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.caseStudy.problem && (
                  <div className="p-4 bg-rose-50/60 dark:bg-rose-950/20 rounded-2xl border border-rose-100 dark:border-rose-900/30">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1">
                      Problem & Challenge
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      {project.caseStudy.problem}
                    </p>
                  </div>
                )}
                {project.caseStudy.solution && (
                  <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                      Solution
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      {project.caseStudy.solution}
                    </p>
                  </div>
                )}
              </div>

              {project.caseStudy.implementation && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Technical Implementation
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {project.caseStudy.implementation}
                  </p>
                </div>
              )}

              {project.caseStudy.results && (
                <div className="flex items-start gap-2.5 p-3.5 bg-blue-50/80 dark:bg-blue-950/30 rounded-2xl border border-blue-100 dark:border-blue-900/40 text-xs sm:text-sm text-blue-900 dark:text-blue-200">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Results:</strong> {project.caseStudy.results}</span>
                </div>
              )}
            </div>
          )}

          {/* Gallery preview if any */}
          {project.gallery && project.gallery.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Screenshots & Gallery</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.gallery.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${project.title} gallery ${idx + 1}`}
                    className="w-full h-36 object-cover rounded-xl border border-slate-200 dark:border-slate-700"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
