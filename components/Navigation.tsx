
import React from 'react';
import { View } from '../types';

interface NavigationProps {
  currentView: View;
  setView: (view: View) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems: { id: View; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'آرزوی محقق شده', icon: '✨' },
    { id: 'sats', label: 'تمرین SATS', icon: '🧘' },
    { id: 'revision', label: 'بازنگری (Revision)', icon: '⏪' },
    { id: 'diet', label: 'رژیم ذهنی', icon: '🧠' },
    { id: 'journal', label: 'دفترچه شکرگزاری', icon: '📖' },
  ];

  return (
    <nav className="bg-[#0f172a]/80 backdrop-blur-xl border-l border-slate-800 w-full md:w-72 md:flex-shrink-0 flex md:flex-col items-center md:items-stretch py-8 overflow-x-auto md:overflow-x-hidden sticky top-0 z-50 md:h-screen shadow-2xl">
      <div className="hidden md:block px-8 mb-12 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 p-1 shadow-[0_0_20px_rgba(139,92,246,0.5)]">
            <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center text-2xl">👁️</div>
        </div>
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">نویل گادارد</h1>
        <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-[0.2em]">تخیل عین واقعیت است</p>
      </div>

      <div className="flex md:flex-col w-full px-4 gap-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
              currentView === item.id 
                ? 'bg-violet-600/20 text-violet-300 border border-violet-500/40 shadow-[0_0_15px_rgba(139,92,246,0.2)]' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-semibold text-sm">{item.label}</span>
          </button>
        ))}
      </div>
      
      <div className="hidden md:block mt-auto px-8 py-6">
        <div className="p-4 rounded-2xl bg-violet-900/10 border border-violet-500/10 text-[11px] text-slate-500 italic text-center leading-relaxed">
            "احساس کنید که در حال حاضر همان هستید که می‌خواهید باشید."
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
