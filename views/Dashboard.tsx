
import React, { useState } from 'react';
import { Manifestation } from '../types';
import { NEVILLE_QUOTES } from '../constants';

interface DashboardProps {
  manifestations: Manifestation[];
  setManifestations: React.Dispatch<React.SetStateAction<Manifestation[]>>;
}

const Dashboard: React.FC<DashboardProps> = ({ manifestations, setManifestations }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newDesire, setNewDesire] = useState('');
  const [newDetails, setNewDetails] = useState('');

  const randomQuote = NEVILLE_QUOTES[Math.floor(Math.random() * NEVILLE_QUOTES.length)];

  const handleAdd = () => {
    if (!newDesire.trim()) return;
    const newItem: Manifestation = {
      id: crypto.randomUUID(),
      desire: newDesire,
      details: newDetails,
      createdAt: Date.now(),
      status: 'active'
    };
    setManifestations([newItem, ...manifestations]);
    setNewDesire('');
    setNewDetails('');
    setIsAdding(false);
  };

  const toggleFulfilled = (id: string) => {
    setManifestations(prev => prev.map(m => 
      m.id === id ? { ...m, status: m.status === 'active' ? 'fulfilled' : 'active' } : m
    ));
  };

  const deleteItem = (id: string) => {
    setManifestations(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <header className="flex flex-col md:flex-row items-center gap-8 bg-slate-900/40 p-8 rounded-[2rem] border border-white/5 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-violet-600/10 blur-[100px] rounded-full"></div>
        
        <div className="relative z-10 w-40 h-40 md:w-48 md:h-48 flex-shrink-0">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-500 animate-pulse opacity-20 blur-xl"></div>
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Neville_Goddard.jpg/220px-Neville_Goddard.jpg" 
                alt="Neville Goddard" 
                className="w-full h-full object-cover rounded-3xl border border-white/20 neville-glow grayscale hover:grayscale-0 transition-all duration-500"
            />
        </div>
        
        <div className="relative z-10 flex-1 text-center md:text-right space-y-4">
          <h2 className="text-4xl font-bold text-glow text-white">در حضورِ آرزو</h2>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 italic text-violet-200 leading-relaxed text-lg">
            "{randomQuote}"
          </div>
        </div>
      </header>

      <section className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,1)]"></span>
            فرض‌های فعال شما
            <span className="bg-violet-600/20 text-violet-400 text-xs px-3 py-1 rounded-full border border-violet-500/20">
              {manifestations.filter(m => m.status === 'active').length} مورد
            </span>
          </h3>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] text-white px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 transform active:scale-95"
          >
            + ثبت آرزوی جدید
          </button>
        </div>

        {isAdding && (
          <div className="glass-card p-8 rounded-[2rem] border-violet-500/30 space-y-6 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="space-y-2">
              <label className="text-sm text-slate-400 mr-2">خواسته شما چیست؟ (طوری بنویسید که انگار همین حالا داریدش)</label>
              <input 
                autoFocus
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                placeholder="مثلاً: من بابت شغل جدیدم بسیار سپاسگزارم..."
                value={newDesire}
                onChange={(e) => setNewDesire(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400 mr-2">احساس رسیدن به آن را توصیف کنید...</label>
              <textarea 
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 h-32"
                placeholder="چه حسی دارد؟ چه کسی به شما تبریک می‌گوید؟"
                value={newDetails}
                onChange={(e) => setNewDetails(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleAdd}
                className="flex-1 bg-violet-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-violet-500 shadow-lg shadow-violet-900/20 transition-all"
              >
                وارد حالتِ بودن شوید
              </button>
              <button 
                onClick={() => setIsAdding(false)}
                className="px-8 bg-slate-800 text-slate-400 py-4 rounded-2xl font-semibold hover:bg-slate-700 transition-all"
              >
                انصراف
              </button>
            </div>
          </div>
        )}

        <div className="grid gap-6">
          {manifestations.length === 0 ? (
            <div className="text-center py-20 text-slate-500 glass-card rounded-[2.5rem] border-dashed border-slate-700">
              <div className="text-5xl mb-4 opacity-20">🕯️</div>
              <p>لیست شما خالی است. با فرضِ داشتن اولین خواسته‌تان شروع کنید.</p>
            </div>
          ) : (
            manifestations.map(m => (
              <div 
                key={m.id} 
                className={`group p-8 rounded-[2rem] border transition-all glass-card ${
                  m.status === 'fulfilled' 
                    ? 'bg-emerald-900/10 border-emerald-500/20 opacity-80' 
                    : 'bg-slate-800/40 border-slate-700/50 hover:border-violet-500/50'
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-3 flex-1">
                    <h4 className={`text-2xl font-bold ${m.status === 'fulfilled' ? 'line-through text-slate-500' : 'text-white text-glow'}`}>
                      {m.desire}
                    </h4>
                    <p className="text-slate-400 leading-relaxed text-lg">{m.details}</p>
                    <div className="flex items-center gap-4 pt-4">
                        <span className="text-[10px] text-slate-600 uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full">
                          شروع فرض: {new Date(m.createdAt).toLocaleDateString('fa-IR')}
                        </span>
                        {m.status === 'fulfilled' && (
                            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">
                                محقق شده ✨
                            </span>
                        )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => toggleFulfilled(m.id)}
                      className={`p-3 rounded-xl transition-all ${m.status === 'fulfilled' ? 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30' : 'bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30'}`}
                      title={m.status === 'fulfilled' ? "فعال‌سازی مجدد" : "تثبیت در واقعیت"}
                    >
                      {m.status === 'fulfilled' ? '↩️' : '✅'}
                    </button>
                    <button 
                      onClick={() => deleteItem(m.id)}
                      className="p-3 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500/20 transition-all"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
