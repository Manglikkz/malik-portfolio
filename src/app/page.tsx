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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        {renderCurrentView()}
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
