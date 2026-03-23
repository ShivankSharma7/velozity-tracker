import { useMemo } from 'react';
import { useApp } from './TaskContext';
import type { Task, Priority } from './types';

export default function TimelineView() {
  const { state } = useApp();
  
  // Requirement 1: Horizontal axis constants
  const dayW = 64; 
  const rowH = 52; 
  const days = 31; // March 2026
  
  // Today's Date Marker (Simulated: March 24, 2026)
  const today = 24; 

  // Stable Waterfall Sort: Earliest to Latest
  const sorted = useMemo(() => {
    return [...state.tasks].sort((a: Task, b: Task) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      if (dateA !== dateB) return dateA - dateB;
      return a.id.localeCompare(b.id);
    });
  }, [state.tasks]);

  // 🚀 Helper Function to set Priority Colors in Timeline
  const getPriorityClasses = (priority: Priority) => {
    switch (priority) {
      case 'Critical': 
        return 'bg-red-500/10 text-red-400 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:border-red-500/60 hover:bg-red-500/20';
      case 'High': 
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.2)] hover:border-orange-500/60 hover:bg-orange-500/20';
      case 'Medium': 
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:border-indigo-500/60 hover:bg-indigo-500/20';
      case 'Low': 
        return 'bg-slate-500/10 text-slate-500 border-white/5 hover:border-white/20 hover:bg-white/5';
      default: 
        return 'bg-white/5 text-slate-400 border-white/5';
    }
  };

  return (
    <div className="glass-panel rounded-[1.5rem] md:rounded-[2.5rem] h-full overflow-hidden flex flex-col shadow-2xl">
      
      {/* Scrollable Container */}
      <div className="overflow-auto custom-scrollbar flex-1 relative">
        <div style={{ width: days * dayW, height: sorted.length * rowH + 100, position: 'relative' }}>
          
          {/* Sticky Month Header */}
          <div className="flex sticky top-0 bg-[#0a0c10]/95 backdrop-blur-xl z-30 border-b border-white/10">
            {Array.from({length: days}).map((_, i) => (
              <div key={i} className="flex-none p-4 text-[9px] font-black text-slate-600 text-center uppercase border-r border-white/5 tracking-tighter" style={{ width: dayW }}>
                MAR {String(i + 1).padStart(2, '0')}
              </div>
            ))}
          </div>

          {/* Background Grid Lines */}
          <div className="absolute top-0 left-0 h-full flex z-0 pointer-events-none opacity-20 mt-12">
             {Array.from({length: days}).map((_, i) => (
                <div key={`grid-${i}`} className="flex-none border-r border-white/5 h-full" style={{ width: dayW }}></div>
             ))}
          </div>

          {/* 📍 Today's Vertical Line */}
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-indigo-500 shadow-[0_0_20px_#6366f1] z-20 pointer-events-none"
            style={{ left: (today - 1) * dayW + (dayW / 2) }}
          >
            <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded shadow-lg uppercase whitespace-nowrap">
              System Today
            </div>
          </div>

          {/* 🚀 Task Bars (Waterfall Layout) */}
          <div className="relative pt-10">
            {sorted.map((task: Task, index: number) => {
              const start = task.startDate ? new Date(task.startDate).getDate() : new Date(task.dueDate).getDate();
              const end = new Date(task.dueDate).getDate();
              const dur = Math.max(1, end - start + 1);

              return (
                <div key={task.id}
                  className={`absolute h-8 rounded-xl flex items-center px-4 text-[9px] font-black uppercase transition-all duration-300 cursor-pointer border group hover:scale-[1.02] hover:z-20
                    ${getPriorityClasses(task.priority)}
                  `}
                  style={{
                    left: (start - 1) * dayW + 6, 
                    width: dur * dayW - 12,
                    top: index * rowH
                  }}>
                  
                  <div className="flex-1 flex justify-between items-center gap-3 overflow-hidden">
                    <span className="truncate">{task.title}</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 shrink-0">
                      <span className="text-[7px] font-mono opacity-50">{task.priority}</span>
                      <div className="w-5 h-5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-[7px] text-white">
                        {task.assignee}
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
      
      {/* Legend Footer (Uniquely Identify) */}
      <div className="p-4 bg-black/20 border-t border-white/5 flex gap-6 overflow-x-auto no-scrollbar">
        {[
          { label: 'Critical', color: 'bg-red-400' },
          { label: 'High Priority', color: 'bg-orange-400' },
          { label: 'Medium', color: 'bg-indigo-400' },
          { label: 'Low', color: 'bg-slate-500' }
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2 shrink-0">
            <div className={`w-2 h-2 rounded-full ${item.color} shadow-[0_0_8px_currentColor]`}></div>
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}