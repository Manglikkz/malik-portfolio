'use client';

import { DataProvider, useData } from '@/context/DataContext';
import { HomeView } from '@/components/views/HomeView';
import { AboutView } from '@/components/views/AboutView';
import { ProjectsView } from '@/components/views/ProjectsView';
import { AchievementsView } from '@/components/views/AchievementsView';
import { SkillsView } from '@/components/views/SkillsView';
import { JourneyView } from '@/components/views/JourneyView';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactModal } from '@/components/layout/ContactModal';

function PortfolioContent() {
  const { currentRoute, contactModalOpen, setContactModalOpen } = useData();

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'home':
        return <HomeView />;
      case 'about':
        return <AboutView />;
      case 'projects':
        return <ProjectsView />;
      case 'achievements':
        return <AchievementsView />;
      case 'skills':
        return <SkillsView />;
      case 'journey':
        return <JourneyView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FBFF] dark:bg-[#070F1C] text-[#15233D] dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-60 z-0" /><div className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">{renderCurrentView()}</div>
      </main>
      <Footer />
      {contactModalOpen && (
        <ContactModal />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <DataProvider>
      <PortfolioContent />
    </DataProvider>
  );
}
