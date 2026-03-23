import { useState } from 'react';
import { useApp } from './TaskContext';
import KanbanView from './KanbanView';
import ListView from './ListView';
import TimelineView from './TimelineView';
import type { Task, Stage, Priority } from './types';

export default function App() {
  const { state, dispatch } = useApp();
  const [name, setName] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newTask: Task = {
      id: `T-${Date.now()}`,
      title: name,
      stage: 'To Do',
      priority: 'Medium',
      assignee: 'SS',
      startDate: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0]
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
    setName('');
  };

  // 🚀 UPDATED: Randomized Stress Test Logic
  const handleStress = () => {
    const stages: Stage[] = ['To Do', 'In Progress', 'In Review', 'Done'];
    const priorities: Priority[] = ['Low', 'Medium', 'High', 'Critical'];
    const users = ['JD', 'AS', 'RK', 'ML', 'SS', 'BOT-X'];

    const stressTasks = Array.from({ length: 500 }, (_, i) => {
      // Logic for random dates in March 2026
      const startDay = Math.floor(Math.random() * 20) + 1; // 1st to 20th
      const duration = Math.floor(Math.random() * 10) + 1; // 1 to 10 days
      const dueDay = Math.min(startDay + duration, 31); // Cap at 31st

      const startStr = `2026-03-${String(startDay).padStart(2, '0')}`;
      const dueStr = `2026-03-${String(dueDay).padStart(2, '0')}`;

      return {
        id: `STRESS-${1000 + i}`,
        title: `Dynamic Load Node #${i} - System Integrity Check`,
        stage: stages[Math.floor(Math.random() * 4)],
        priority: priorities[Math.floor(Math.random() * 4)],
        assignee: users[Math.floor(Math.random() * users.length)],
        startDate: startStr,
        dueDate: dueStr
      };
    });

    dispatch({ type: 'LOAD_STRESS', payload: stressTasks });
    alert("🔥 500 Randomized Tasks Injected! Check the Timeline for the data-cloud effect.");
  };

  const handleReset = () => {
    if (window.confirm("Format workspace and reset to 93 default tasks?")) {
      dispatch({ type: 'RESET' });
    }
  };

  return (
    <div className="min-h-screen relative px-4 py-4 md:px-10 md:py-8 flex flex-col selection:bg-indigo-500/30">
      <div className="mesh-bg" />
      
      {/* 🔮 Optimized Header */}
      <header className="max-w-[1500px] w-full mx-auto mb-6 glass-panel p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col gap-4 z-50 sticky top-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0a0c10] border border-white/10 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-xl text-indigo-500 shadow-lg shadow-indigo-500/20">V</div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">Velozity<span className="text-indigo-500"> Tracker</span></h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Made by Shivank Sharma</p>
              </div>
            </div>
          </div>

          <div className="flex bg-[#0a0c10]/80 p-1.5 rounded-xl border border-white/5 w-full sm:w-auto overflow-x-auto no-scrollbar">
            {['kanban', 'list', 'timeline'].map(v => (
              <button key={v} onClick={() => dispatch({ type: 'SET_VIEW', payload: v })} 
                className={`flex-1 sm:flex-none px-5 md:px-8 py-2.5 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-wider transition-all ${state.view === v ? 'bg-white/10 text-white shadow-md' : 'text-slate-500 hover:text-white'}`}>{v}</button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <form className="flex-1 relative" onSubmit={handleAdd}>
            <input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Initialize new objective..." 
              className="w-full bg-[#0a0c10]/50 border border-white/10 rounded-xl py-3.5 px-5 text-sm outline-none text-white focus:border-indigo-500/50 transition-all" 
            />
            <button type="submit" className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 rounded-lg text-[10px] font-black uppercase shadow-lg transition-all active:scale-95">+</button>
          </form>

          <div className="flex gap-2 w-full md:w-auto">
            <button onClick={handleReset} className="flex-1 md:flex-none px-6 py-3 rounded-xl border border-white/5 text-[9px] font-black uppercase text-slate-500 hover:text-white hover:bg-white/5 transition-all">
              Reset
            </button>
            <button onClick={handleStress} className="flex-1 md:flex-none px-6 py-3 rounded-xl border border-red-500/20 bg-red-500/5 text-[9px] font-black uppercase text-red-500 hover:bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all">
              Stress Test
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1600px] w-full mx-auto h-[calc(100vh-320px)] md:h-[calc(100vh-220px)] overflow-hidden">
        {state.view === 'kanban' && <KanbanView />}
        {state.view === 'list' && <ListView />}
        {state.view === 'timeline' && <TimelineView />}
      </main>
      
      <footer className="mt-auto py-4 text-center opacity-40">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Velozity Tracker System • Created by Shivank Sharma</p>
      </footer>
    </div>
  );
}