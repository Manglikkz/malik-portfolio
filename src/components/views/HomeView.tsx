'use client';
import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Layers,
  GraduationCap,
  FolderGit2,
  Briefcase,
  ExternalLink,
  CodeSquare,
  Award,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { InteractiveTerminal } from '../terminal/InteractiveTerminal';
import { LanyardBadge } from '../lanyard/LanyardBadge';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Project } from '@/types';

export const HomeView: React.FC = () => {
  const {
    siteSettings,
    aboutProfile,
    projects,
    achievements,
    setCurrentRoute,
    setContactModalOpen,
  } = useData();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredProjects = projects.filter(p => p.published && p.featured).slice(0, 4);
  const featuredAchievements = achievements.filter(a => a.published).slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Identity & Introduction */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Small eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3FF] dark:bg-[#132E56] text-[#1769E8] dark:text-[#4DA3FF] text-xs font-bold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#1769E8] animate-pulse" />
              <span>{siteSettings.heroEyebrow || 'WELCOME TO MY PORTFOLIO'}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <p className="text-xl sm:text-2xl font-bold text-slate-700 dark:text-slate-300">
                Hi, I'm
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#102A56] dark:text-white leading-[1.1]">
                {aboutProfile.name}
              </h1>
            </div>

            {/* Role title */}
            <h2 className="text-lg sm:text-xl font-bold text-[#1769E8] dark:text-[#4DA3FF]">
              {siteSettings.heroRole || 'Full-Stack Developer & Cybersecurity Enthusiast'}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#62708A] dark:text-slate-300 max-w-lg leading-relaxed">
              {siteSettings.heroDescription ||
                'I build digital products, explore how systems work, and continuously learn to secure them.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setCurrentRoute('projects')}
                className="px-6 py-3 bg-[#1769E8] hover:bg-[#0D3B8E] text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentRoute('about')}
                className="px-6 py-3 bg-white dark:bg-[#132542] hover:bg-slate-50 dark:hover:bg-[#1A3359] text-[#102A56] dark:text-white border border-[#DCE7F5] dark:border-[#1E3A66] text-sm font-semibold rounded-full shadow-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              >
                <span>Explore More</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Focus Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Full-Stack Development
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Cybersecurity
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Open Source
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Terminal + Lanyard */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-4 pt-4 lg:pt-0">
            {/* Interactive Terminal (Hero Highlight) */}
            <div className="w-full flex-1 min-w-[280px]">
              <InteractiveTerminal />
            </div>

            {/* Lanyard Physical ID Card */}
            <div className="shrink-0">
              <LanyardBadge />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon Bar */}
      <section className="w-full bg-white dark:bg-[#0D1C33] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#DCE7F5] dark:border-[#1E3A66]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
          <div className="flex flex-col items-center justify-center p-2">
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="w-5 h-5 text-[#1769E8]" />
              <span className="text-2xl sm:text-3xl font-black text-[#102A56] dark:text-white">2+</span>
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Years Learning</span>
            <span className="text-[11px] text-slate-400">Coding & Security</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-4 md:pt-2">
            <div className="flex items-center gap-2 mb-1">
              <FolderGit2 className="w-5 h-5 text-emerald-500" />
              <span className="text-2xl sm:text-3xl font-black text-[#102A56] dark:text-white">8+</span>
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Projects Completed</span>
            <span className="text-[11px] text-slate-400">Full-Stack & Tools</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-4 md:pt-2">
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-5 h-5 text-amber-500" />
              <span className="text-2xl sm:text-3xl font-black text-[#102A56] dark:text-white">15+</span>
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Technologies</span>
            <span className="text-[11px] text-slate-400">Frameworks & Tools</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-4 md:pt-2">
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-5 h-5 text-blue-400" />
              <span className="text-2xl sm:text-3xl font-black text-[#102A56] dark:text-white">Open</span>
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">To Work</span>
            <span className="text-[11px] text-slate-400">Collaborations</span>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#1769E8] dark:text-[#4DA3FF] uppercase mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1769E8]" />
              FEATURED PROJECTS
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A56] dark:text-white tracking-tight">
              Selected Works & Case Studies
            </h2>
          </div>

          <button
            onClick={() => setCurrentRoute('projects')}
            className="text-xs sm:text-sm font-bold text-[#1769E8] dark:text-[#4DA3FF] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>See all projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map(project => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-white dark:bg-[#0D1C33] rounded-3xl overflow-hidden border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm hover:shadow-xl hover:border-blue-400/60 dark:hover:border-blue-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Preview */}
              <div className="relative h-48 sm:h-52 w-full bg-slate-900 overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-md bg-[#1769E8] text-white shadow">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-[#15233D] dark:text-white group-hover:text-[#1769E8] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-[#F2F7FF] dark:bg-[#162C4E] text-[#1769E8] dark:text-[#4DA3FF]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-[#1769E8] dark:text-[#4DA3FF]">
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Preview & Certifications */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#1769E8] dark:text-[#4DA3FF] uppercase mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1769E8]" />
              VERIFIED RECOGNITIONS
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A56] dark:text-white tracking-tight">
              Certifications & Milestones
            </h2>
          </div>

          <button
            onClick={() => setCurrentRoute('achievements')}
            className="text-xs sm:text-sm font-bold text-[#1769E8] dark:text-[#4DA3FF] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View all achievements</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {featuredAchievements.map(ach => (
            <div
              key={ach.id}
              onClick={() => setCurrentRoute('achievements')}
              className="p-5 bg-white dark:bg-[#0D1C33] rounded-2xl border border-[#DCE7F5] dark:border-[#1E3A66] shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {ach.year}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#15233D] dark:text-white line-clamp-2">
                  {ach.title}
                </h4>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  {ach.issuer}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>{ach.category}</span>
                <span className="text-blue-500 font-semibold">View →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Collaboration CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#102A56] via-[#17458F] to-[#1769E8] rounded-3xl p-8 sm:p-12 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-blue-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LET'S BUILD SOMETHING SECURE & IMPACTFUL</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Have an exciting project or idea in mind?
          </h2>

          <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
            I'm constantly looking to collaborate on web development and cybersecurity challenges. Let's discuss how we can build something great together.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setContactModalOpen(true)}
              className="px-6 py-3 bg-white hover:bg-slate-100 text-[#102A56] text-sm font-bold rounded-full shadow-lg transition cursor-pointer"
            >
              Get In Touch
            </button>
            <button
              onClick={() => setCurrentRoute('about')}
              className="px-6 py-3 bg-white/15 hover:bg-white/25 text-white border border-white/20 text-sm font-semibold rounded-full backdrop-blur transition cursor-pointer"
            >
              Learn More About Me
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Project Case Study Modal */}
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};
