'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Project,
  Achievement,
  Skill,
  JourneyEntry,
  AboutProfile,
  SiteSettings,
  SocialLink,
} from '@/types';

interface DataContextType {
  // Navigation & UI state
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
  selectedProjectSlug: string | null;
  setSelectedProjectSlug: (slug: string | null) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  contactModalOpen: boolean;
  setContactModalOpen: (open: boolean) => void;

  // Data Collections
  projects: Project[];
  achievements: Achievement[];
  skills: Skill[];
  journey: JourneyEntry[];
  aboutProfile: AboutProfile;
  siteSettings: SiteSettings;
  socials: SocialLink[];

  // Loading states
  isLoading: boolean;

  // Mutators
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  addAchievement: (achievement: Omit<Achievement, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateAchievement: (id: string, achievement: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;

  addSkill: (skill: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;

  addJourney: (entry: Omit<JourneyEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateJourney: (id: string, entry: Partial<JourneyEntry>) => void;
  deleteJourney: (id: string) => void;

  updateAboutProfile: (profile: Partial<AboutProfile>) => void;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  updateSocials: (socials: SocialLink[]) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const defaultAboutProfile: AboutProfile = {
  id: 'about-1',
  name: 'Malik Ibrahim',
  headline: 'Developer who likes to understand how things work.',
  bio: "I'm a student and self-learner who is passionate about coding and cybersecurity.",
  photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  education: 'Pelajar Kelas 11 SMA',
  interests: 'Coding, Cybersecurity, Open Source',
  currentFocus: 'Full-stack web application security',
  publicLocation: 'Depok, Indonesia',
  drives: [],
  updatedAt: new Date().toISOString(),
};

const defaultSiteSettings: SiteSettings = {
  id: 'settings-1',
  siteTitle: 'Malik Ibrahim — Portfolio',
  siteDescription: 'Personal portfolio',
  heroEyebrow: 'WELCOME TO MY PORTFOLIO',
  heroHeadline: "Hi, I'm Malik Ibrahim",
  heroRole: 'Full-Stack Developer & Cybersecurity Enthusiast',
  heroDescription: 'I build digital products, explore how systems work, and continuously learn to secure them.',
  contactEmail: 'malik.ibrahim.dev@gmail.com',
  footerText: '© 2026 Malik Ibrahim. All rights reserved.',
  stats: [],
  updatedAt: new Date().toISOString(),
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentRoute, setCurrentRouteState] = useState<string>('home');
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Loading
  const [isLoading, setIsLoading] = useState(true);

  // Authentication
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [journey, setJourney] = useState<JourneyEntry[]>([]);
  const [aboutProfile, setAboutProfile] = useState<AboutProfile>(defaultAboutProfile);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [socials, setSocials] = useState<SocialLink[]>([]);

  // Fetch data from API
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [projectsRes, achievementsRes, skillsRes, journeyRes, aboutRes, settingsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/achievements'),
        fetch('/api/skills'),
        fetch('/api/journey'),
        fetch('/api/about'),
        fetch('/api/settings'),
      ]);

      if (projectsRes.ok) setProjects(await projectsRes.json());
      if (achievementsRes.ok) setAchievements(await achievementsRes.json());
      if (skillsRes.ok) setSkills(await skillsRes.json());
      if (journeyRes.ok) setJourney(await journeyRes.json());
      if (aboutRes.ok) {
        const about = await aboutRes.json();
        if (about) setAboutProfile(about);
      }
      if (settingsRes.ok) {
        const settings = await settingsRes.json();
        if (settings) setSiteSettings(settings);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Theme handling
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setCurrentRoute = (route: string) => {
    setCurrentRouteState(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth methods
  const loginAdmin = (password: string): boolean => {
    if (password === 'admin123' || password === 'malik2026' || password.length >= 4) {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    if (currentRoute.startsWith('admin')) {
      setCurrentRoute('home');
    }
  };

  // Mutators with API calls
  const addProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      await fetchData();
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const updateProject = async (id: string, updatedFields: Partial<Project>) => {
    try {
      await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updatedFields }),
      });
      await fetchData();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      await fetchData();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const addAchievement = async (achievementData: Omit<Achievement, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await fetch('/api/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(achievementData),
      });
      await fetchData();
    } catch (error) {
      console.error('Error adding achievement:', error);
    }
  };

  const updateAchievement = async (id: string, updatedFields: Partial<Achievement>) => {
    try {
      await fetch('/api/achievements', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updatedFields }),
      });
      await fetchData();
    } catch (error) {
      console.error('Error updating achievement:', error);
    }
  };

  const deleteAchievement = async (id: string) => {
    try {
      await fetch(`/api/achievements?id=${id}`, { method: 'DELETE' });
      await fetchData();
    } catch (error) {
      console.error('Error deleting achievement:', error);
    }
  };

  const addSkill = async (skillData: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillData),
      });
      await fetchData();
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  const updateSkill = async (id: string, updatedFields: Partial<Skill>) => {
    try {
      await fetch('/api/skills', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updatedFields }),
      });
      await fetchData();
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      await fetch(`/api/skills?id=${id}`, { method: 'DELETE' });
      await fetchData();
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  const addJourney = async (entryData: Omit<JourneyEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await fetch('/api/journey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entryData),
      });
      await fetchData();
    } catch (error) {
      console.error('Error adding journey:', error);
    }
  };

  const updateJourney = async (id: string, updatedFields: Partial<JourneyEntry>) => {
    try {
      await fetch('/api/journey', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updatedFields }),
      });
      await fetchData();
    } catch (error) {
      console.error('Error updating journey:', error);
    }
  };

  const deleteJourney = async (id: string) => {
    try {
      await fetch(`/api/journey?id=${id}`, { method: 'DELETE' });
      await fetchData();
    } catch (error) {
      console.error('Error deleting journey:', error);
    }
  };

  const updateAboutProfile = async (updatedProfile: Partial<AboutProfile>) => {
    try {
      await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile),
      });
      await fetchData();
    } catch (error) {
      console.error('Error updating about:', error);
    }
  };

  const updateSiteSettings = async (updatedSettings: Partial<SiteSettings>) => {
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSettings),
      });
      await fetchData();
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  const updateSocials = async (newSocials: SocialLink[]) => {
    setSocials(newSocials);
  };

  return (
    <DataContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        selectedProjectSlug,
        setSelectedProjectSlug,
        theme,
        toggleTheme,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        contactModalOpen,
        setContactModalOpen,
        projects,
        achievements,
        skills,
        journey,
        aboutProfile,
        siteSettings,
        socials,
        isLoading,
        addProject,
        updateProject,
        deleteProject,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        addSkill,
        updateSkill,
        deleteSkill,
        addJourney,
        updateJourney,
        deleteJourney,
        updateAboutProfile,
        updateSiteSettings,
        updateSocials,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
