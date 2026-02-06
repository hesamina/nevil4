
import React, { useState } from 'react';
import { MentalConversation } from '../types';

interface MentalDietProps {
  conversations: MentalConversation[];
  setConversations: React.Dispatch<React.SetStateAction<MentalConversation[]>>;
}

const MentalDiet: React.FC<MentalDietProps> = ({ conversations, setConversations }) => {
  const [oldT, setOldT] = useState('');
  const [newT, setNewT] = useState('');

  const addConversation = () => {
    if (!oldT || !newT) return;
    const entry: MentalConversation = {
      id: crypto.randomUUID(),
      oldThought: oldT,
      newThought: newT,
      timestamp: Date.now()
    };
    setConversations([entry, ...conversations]);
    setOldT('');
    setNewT('');
  };

  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-10 animate-in slide-in-from-right-8 duration-700 text-right">
      <header className="space-y-4">
        <h2 className="text-4xl font-bold text-glow">رژیم ذهنی (Mental Diet)</h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          گفتگوی درونی شما، علت اتفاقات آینده است. کلام ذهنی خود را طوری تغییر دهید که با نسخه ایده‌آل شما که هم‌اکنون خواسته‌اش را دارد، هماهنگ باشد.
        </p>
      </header>

      <div className="glass-card p-10 rounded-[3rem] border-slate-700 space-y-6 shadow-2xl">
        <h3 className="text-2xl font-bold text-violet-400">تغییر آگاهانه سناریو</h3>
        <div className="space-y-4">
          <input 
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-5 text-slate-500 italic text-lg focus:outline-none focus:ring-1 focus:ring-rose-500/30 transition-all"
            placeholder="داستان قدیمی: 'من هیچ‌وقت پول کافی ندارم...'"
            value={oldT}
            onChange={(e) => setOldT(e.target.value)}
          />
          <div className="flex justify-center relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-b from-violet-600 to-fuchsia-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(139,92,246,0.6)] z-10">
                <span className="text-2xl">⚡</span>
            </div>
            <div className="absolute inset-y-1/2 w-full h-[1px] bg-slate-800 -z-0"></div>
          </div>
          <input 
            className="w-full bg-emerald-950/10 border border-emerald-500/30 rounded-2xl p-5 text-emerald-400 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.05)]"
            placeholder="حقیقت جدید: 'من بابت فراوانی و ثروت همیشگی‌ام سپاسگزارم...'"
            value={newT}
            onChange={(e) => setNewT(e.target.value)}
          />
        </div>
        <button 
          onClick={addConversation}
          className="w-full py-5 bg-violet-600 hover:bg-violet-500 text-white rounded-[2rem] font-bold text-xl transition-all shadow-xl shadow-violet-900/30 mt-4 transform active:scale-95"
        >
          تثبیت فرضِ جدید در ذهن
        </button>
      </div>

      <div className="grid gap-6">
        <h3 className="text-2xl font-bold pr-4">رصدخانه عادات ذهنی</h3>
        {conversations.length === 0 ? (
          <div className="text-center py-20 text-slate-600 border border-dashed border-slate-800 rounded-[2.5rem]">باغ ذهن شما منتظر کاشتن اولین بذرهاست.</div>
        ) : (
          conversations.map(c => (
            <div key={c.id} className="relative group glass-card rounded-[2.5rem] p-10 hover:border-emerald-500/50 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500/20"></div>
              <button 
                onClick={() => deleteConversation(c.id)}
                className="absolute top-6 left-6 text-slate-600 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                🗑️ حذف
              </button>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 text-slate-500 italic text-lg line-through decoration-rose-500/40">
                  "{c.oldThought}"
                </div>
                <div className="hidden md:block text-3xl animate-pulse text-violet-500">✨</div>
                <div className="flex-1 text-emerald-400 font-black text-2xl leading-relaxed">
                  "{c.newThought}"
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800/50 flex justify-between items-center text-[10px] text-slate-600 uppercase tracking-widest font-black">
                <span>تغییر کانسپت ذهنی</span>
                <span>{new Date(c.timestamp).toLocaleDateString('fa-IR')}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MentalDiet;
