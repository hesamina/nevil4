
import React, { useState } from 'react';
import { RevisionEntry } from '../types';

interface RevisionToolProps {
  revisions: RevisionEntry[];
  setRevisions: React.Dispatch<React.SetStateAction<RevisionEntry[]>>;
}

const RevisionTool: React.FC<RevisionToolProps> = ({ revisions, setRevisions }) => {
  const [original, setOriginal] = useState('');
  const [revised, setRevised] = useState('');

  const handleAdd = () => {
    if (!original || !revised) return;
    const newEntry: RevisionEntry = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString('fa-IR'),
      originalEvent: original,
      revisedEvent: revised
    };
    setRevisions([newEntry, ...revisions]);
    setOriginal('');
    setRevised('');
  };

  const deleteRevision = (id: string) => {
    setRevisions(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="space-y-4 text-right">
        <h2 className="text-4xl font-bold text-glow">هنر بازنگری (Revision)</h2>
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
          نویل گادارد می‌گوید گذشته ثابت نیست. با بازنویسیِ اتفاقات روز پیش از خواب، بذرهای قدیمی را از بین برده و بذرهای جدیدی برای فردا می‌کارید.
        </p>
      </header>

      <div className="glass-card p-10 rounded-[2.5rem] border-slate-700 space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-30"></div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3 text-right">
            <label className="text-xs uppercase tracking-[0.2em] text-slate-500 font-black pr-2">سایه (آنچه رخ داد)</label>
            <textarea 
              className="w-full bg-slate-950/50 border border-slate-800 rounded-3xl p-6 text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 h-40 transition-all text-lg"
              placeholder="مثلاً: امروز با مدیرم بحث کردم..."
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
            />
          </div>
          <div className="space-y-3 text-right">
            <label className="text-xs uppercase tracking-[0.2em] text-violet-400 font-black pr-2">نور (آنچه باید می‌شد)</label>
            <textarea 
              className="w-full bg-violet-950/10 border border-violet-500/20 rounded-3xl p-6 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 h-40 transition-all text-lg"
              placeholder="مدیرم از کارم تعریف کرد و پیشنهاد ارتقا داد..."
              value={revised}
              onChange={(e) => setRevised(e.target.value)}
            />
          </div>
        </div>
        <button 
          onClick={handleAdd}
          className="w-full py-5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-[2rem] font-bold text-xl shadow-xl shadow-violet-900/30 transition-all transform active:scale-95"
        >
          بازنویسی تاریخچه زندگی
        </button>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold pr-4">خط زمانیِ بازنگری شده شما</h3>
        <div className="grid gap-6">
          {revisions.length === 0 ? (
            <div className="text-center py-20 text-slate-600 border border-dashed border-slate-800 rounded-[2rem]">هنوز بازنگری‌ای ثبت نشده است. شروع به تغییر گذشته‌تان کنید!</div>
          ) : (
            revisions.map(r => (
              <div key={r.id} className="glass-card rounded-[2rem] overflow-hidden border-violet-500/10">
                <div className="bg-slate-900/80 px-6 py-3 border-b border-slate-800 flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-mono tracking-widest">{r.date}</span>
                  <button onClick={() => deleteRevision(r.id)} className="text-slate-500 hover:text-rose-500 transition-colors">🗑️ حذف</button>
                </div>
                <div className="p-8 grid md:grid-cols-2 gap-8 items-center">
                  <div className="p-5 bg-black/20 rounded-2xl text-slate-500 line-through italic decoration-rose-500/30">
                    {r.originalEvent}
                  </div>
                  <div className="p-5 bg-violet-600/10 rounded-2xl text-violet-100 font-bold border border-violet-500/20 relative">
                    <span className="absolute -top-3 -right-3 bg-violet-600 text-white p-1 rounded-full text-[10px]">✨</span>
                    "{r.revisedEvent}"
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RevisionTool;
