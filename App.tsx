
import React, { useState, useEffect } from 'react';
import { View, Manifestation, RevisionEntry, MentalConversation, JournalEntry } from './types';
import Navigation from './components/Navigation';
import Dashboard from './views/Dashboard';
import SATSTool from './views/SATSTool';
import RevisionTool from './views/RevisionTool';
import MentalDiet from './views/MentalDiet';
import Journal from './views/Journal';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  
  // Data State - Persistence via LocalStorage
  const [manifestations, setManifestations] = useState<Manifestation[]>(() => {
    const saved = localStorage.getItem('manifestations');
    return saved ? JSON.parse(saved) : [];
  });

  const [revisions, setRevisions] = useState<RevisionEntry[]>(() => {
    const saved = localStorage.getItem('revisions');
    return saved ? JSON.parse(saved) : [];
  });

  const [conversations, setConversations] = useState<MentalConversation[]>(() => {
    const saved = localStorage.getItem('conversations');
    return saved ? JSON.parse(saved) : [];
  });

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('journalEntries');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist data on changes
  useEffect(() => {
    localStorage.setItem('manifestations', JSON.stringify(manifestations));
  }, [manifestations]);

  useEffect(() => {
    localStorage.setItem('revisions', JSON.stringify(revisions));
  }, [revisions]);

  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard 
          manifestations={manifestations} 
          setManifestations={setManifestations} 
        />;
      case 'sats':
        return <SATSTool />;
      case 'revision':
        return <RevisionTool 
          revisions={revisions} 
          setRevisions={setRevisions} 
        />;
      case 'diet':
        return <MentalDiet 
          conversations={conversations} 
          setConversations={setConversations} 
        />;
      case 'journal':
        return <Journal 
          entries={journalEntries} 
          setEntries={setJournalEntries} 
        />;
      default:
        return <Dashboard 
          manifestations={manifestations} 
          setManifestations={setManifestations} 
        />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Navigation currentView={currentView} setView={setCurrentView} />
      <main className="flex-1 overflow-y-auto bg-[#0f172a] p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
