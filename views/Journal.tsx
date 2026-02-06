
import React, { useState } from 'react';
import { JournalEntry } from '../types';

interface JournalProps { entries: JournalEntry[]; setEntries: React.Dispatch<React.SetStateAction<JournalEntry[]>>; }

const Journal: React.FC<JournalProps> = ({ entries, setEntries }) => {
  const [content, setContent] = useState('');
  const [feeling, setFeeling] = useState('سپاسگزار');

  const addEntry = () => {
    if (!content.trim()) return;
    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      content,
      feeling
    };
    setEntries([entry, ...entries]);
    setContent('');
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-1000 text-right">
      <header className="space-y-4">
        <h2 className="text-4xl font-bold text-glow">کتابِ شگفتی‌ها (Scripting)</h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          طوری بنویسید که انگار همه‌چیز انجام شده است. روز خود را از نقطه دیدِ آرزوی محقق شده توصیف کنید. "حسِ" موفقیت را ثبت کنید.
        </p>
      </header>

      <div className="glass-card rounded-[3rem] p-10 border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-3 h-full bg-gradient-to-b from-violet-600 to-fuchsia-600"></div>
        <div className="space-y-6">
          <div className="flex justify-between items-center px-4">
            <span className="text-sm font-black uppercase tracking-widest text-slate-500">یادداشت جدید واقعیت</span>
            <select 
              className="bg-slate-950 border border-slate-800 rounded-2xl text-sm px-4 py-2 text-violet-300 outline-none focus:ring-2 focus:ring-violet-500"
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
            >
              <option>سپاسگزار</option>
              <option>فوق‌العاده</option>
              <option>پیروزمندانه</option>
              <option>آرام</option>
              <option>رهیده</option>
            </select>
          </div>
          <textarea 
            className="w-full bg-transparent border-none text-white placeholder-slate-700 focus:ring-0 resize-none h-72 text-2xl italic leading-relaxed font-light"
            placeholder="امروز واقعاً بی‌نظیر بود. بیدار شدم و حس کردم..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button 
            onClick={addEntry}
            className="w-full py-5 bg-violet-600 hover:bg-violet-500 text-white rounded-[2rem] font-bold text-xl shadow-2xl shadow-violet-900/40 transition-all transform active:scale-95"
          >
            مُهر و موم کردن این واقعیت
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {entries.map(entry => (
          <div key={entry.id} className="group glass-card border-white/5 p-10 rounded-[3rem] relative hover:border-violet-500/30 transition-all">
             <button 
                onClick={() => deleteEntry(entry.id)}
                className="absolute top-10 left-10 text-slate-600 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                🗑️ حذف
              </button>
            <div className="mb-6 flex items-center gap-4">
              <span className="bg-violet-600 text-white text-[10px] px-4 py-1.5 rounded-full uppercase tracking-widest font-black shadow-lg shadow-violet-900/20">
                {entry.feeling}
              </span>
              <span className="text-xs text-slate-500 font-mono tracking-tighter">{entry.date}</span>
            </div>
            <p className="text-2xl text-slate-200 leading-relaxed whitespace-pre-wrap italic font-light">
              "{entry.content}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
