
import React, { useState, useEffect, useRef } from 'react';

const SATSTool: React.FC = () => {
  const [phase, setPhase] = useState<'idle' | 'relaxation' | 'visualization'>('idle');
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<any>(null);

  const startSATS = () => {
    setPhase('relaxation');
    setTimer(300); // 5 minutes
    setIsActive(true);
  };

  const skipToVisualization = () => {
    setPhase('visualization');
    setTimer(600); // 10 minutes
  };

  const stopSATS = () => {
    setIsActive(false);
    setPhase('idle');
    setTimer(0);
  };

  useEffect(() => {
    if (isActive && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer(t => {
          if (t <= 1) {
            if (phase === 'relaxation') {
              setPhase('visualization');
              return 600;
            } else {
              setIsActive(false);
              setPhase('idle');
              return 0;
            }
          }
          return t - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive, timer, phase]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-top-8 duration-700 text-center">
      <header className="space-y-4 max-w-2xl mx-auto">
        <h2 className="text-5xl font-bold text-glow">حالت مشابه خواب (SATS)</h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          لحظاتی پیش از خواب، پلی میان دنیای فیزیکی و معنوی است. از این زمان برای نقش بستن احساسِ "آرزوی محقق شده" در ضمیر ناخودآگاه خود استفاده کنید.
        </p>
      </header>

      {phase === 'idle' ? (
        <div className="glass-card p-12 rounded-[3rem] border-violet-500/20 space-y-8 max-w-xl mx-auto shadow-[0_0_50px_rgba(139,92,246,0.1)]">
          <div className="w-32 h-32 bg-gradient-to-tr from-violet-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-6xl mx-auto shadow-lg shadow-violet-900/40">
            🌙
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold">آماده شروع هستید؟</h3>
            <p className="text-slate-400">مکانی آرام پیدا کنید که کسی مزاحم شما نشود.</p>
          </div>
          <button 
            onClick={startSATS}
            className="w-full py-5 bg-violet-600 hover:bg-violet-500 text-white rounded-[2rem] font-bold text-xl shadow-xl shadow-violet-900/30 transition-all transform active:scale-95"
          >
            شروع جلسه تمرین
          </button>
        </div>
      ) : (
        <div className="space-y-16 py-10">
          <div className="flex justify-center gap-6">
            <div className={`px-8 py-3 rounded-full border-2 transition-all text-lg font-bold ${phase === 'relaxation' ? 'bg-violet-600 border-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.5)]' : 'bg-slate-900 border-slate-800 opacity-40'}`}>
              رهاسازی بدن
            </div>
            <div className={`px-8 py-3 rounded-full border-2 transition-all text-lg font-bold ${phase === 'visualization' ? 'bg-violet-600 border-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.5)]' : 'bg-slate-900 border-slate-800 opacity-40'}`}>
              تصویرسازی
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-12">
            <div className="relative w-80 h-80 flex items-center justify-center">
              <div className={`absolute inset-0 rounded-full border-[6px] border-violet-500/20 animate-ping duration-[3000ms]`}></div>
              <div className={`absolute inset-[-20px] rounded-full border border-violet-500/10`}></div>
              
              <div className={`w-64 h-64 rounded-full bg-gradient-to-br from-violet-600 to-indigo-800 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(139,92,246,0.5)] transition-transform duration-[4000ms] ${phase === 'relaxation' ? 'scale-110' : 'scale-100'}`}>
                <span className="text-6xl font-mono font-bold tracking-tighter text-white">{formatTime(timer)}</span>
                <span className="text-sm uppercase tracking-[0.3em] mt-4 opacity-70 font-bold">{phase === 'relaxation' ? 'آرامش' : 'خلق واقعیت'}</span>
              </div>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <h4 className="text-3xl font-bold text-violet-200 italic">
                {phase === 'relaxation' ? 'بگذارید تمام عضلات رها شوند...' : 'صحنه‌ای از محقق شدن آرزو را بسازید...'}
              </h4>
              <p className="text-slate-400 text-lg leading-relaxed">
                {phase === 'relaxation' 
                  ? 'بر تنفس خود تمرکز کنید. دم عمیق، بازدم کند. حس کنید بدنتان در عین سنگینی، سبک و بی‌وزن می‌شود.' 
                  : 'صحنه را در ذهن خود ببینید. چه می‌بینید؟ با چه کسی حرف می‌زنید؟ آن عمل را بارها تکرار کنید تا طعمِ واقعیت به خود بگیرد.'}
              </p>
            </div>

            <div className="flex gap-4 w-full max-w-sm">
              {phase === 'relaxation' && (
                <button 
                  onClick={skipToVisualization}
                  className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl font-bold transition-all border border-white/5"
                >
                  پرش به تصویرسازی
                </button>
              )}
              <button 
                onClick={stopSATS}
                className="flex-1 py-4 bg-rose-900/40 text-rose-300 border border-rose-500/30 rounded-2xl font-bold hover:bg-rose-900/60 transition-all"
              >
                پایان جلسه
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 pt-16">
        <div className="glass-card p-8 rounded-[2rem] text-right space-y-3">
          <h5 className="font-bold text-violet-400 text-xl">تکنیکِ تکرار (Loop)</h5>
          <p className="text-slate-400 italic">"یک عمل کوتاه را انتخاب کنید و آن را مدام در ذهن تکرار کنید تا جایی که حس واقعیت پیدا کند."</p>
        </div>
        <div className="glass-card p-8 rounded-[2rem] text-right space-y-3">
          <h5 className="font-bold text-violet-400 text-xl">حالتِ "چقدر عالی است"</h5>
          <p className="text-slate-400 italic">"این احساس را در خود بیدار کنید که هم‌اکنون اتفاقی فوق‌العاده برای شما افتاده است."</p>
        </div>
      </div>
    </div>
  );
};

export default SATSTool;
