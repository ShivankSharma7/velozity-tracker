import { useAppStore } from './TaskContext';

export default function MainAdda() {
  const { state: saraData, dispatch: updateKoro } = useAppStore();
  const stages: any[] = ['Backlog', 'In Progress', 'Review', 'Done'];

  return (
    <div className="min-h-screen p-10 bg-[#0a0f1e] text-white">
      <header className="mb-10 flex justify-between items-center bg-white/5 p-8 rounded-[2rem] border border-white/10 shadow-2xl">
        <div>
           <h1 className="text-3xl font-black uppercase tracking-tighter">Velozity <span className="text-indigo-500">Tracker</span></h1>
           <p className="text-[10px] font-bold text-slate-500 mt-1">LOGGED AS: SHIVANK SHARMA</p>
        </div>
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black">SS</div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {stages.map(s => (
          <div key={s} className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5 backdrop-blur-xl">
            <h3 className="text-[10px] font-black uppercase mb-6 text-slate-500 tracking-[0.2em]">{s}</h3>
            <div className="space-y-4">
              {saraData.data.filter((i:any) => i.stage === s).map((item:any) => (
                <div key={item.id} className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-indigo-500/50 transition-all cursor-pointer group">
                  <p className="font-bold text-sm group-hover:text-indigo-400 transition-colors">{item.naam}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className={`text-[8px] font-black px-2 py-1 rounded-md ${item.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>{item.priority}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}