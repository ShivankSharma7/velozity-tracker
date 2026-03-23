import { useState } from 'react';
import { useApp } from './TaskContext';
import type { Task, Priority } from './types';

export default function ListView() {
  const { state, dispatch } = useApp();
  const [scrollTop, setScrollTop] = useState(0);
  const rowH = 70;
  const start = Math.max(0, Math.floor(scrollTop / rowH) - 5);
  const visible = state.tasks.slice(start, start + 15);

  return (
    <div className="glass-panel rounded-[1.5rem] md:rounded-[2.5rem] h-full flex flex-col overflow-hidden">
      <div className="grid grid-cols-4 md:grid-cols-6 p-4 md:p-6 bg-white/[0.02] text-[9px] font-black uppercase text-slate-500 border-b border-white/5">
        <div className="col-span-2">Task Objective</div>
        <div className="hidden md:block">Stage</div>
        <div className="hidden md:block">Priority</div>
        <div className="text-right col-span-2 md:col-span-1">Due Date</div>
      </div>
      <div onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)} className="overflow-y-auto flex-1 custom-scrollbar">
        <div style={{ height: state.tasks.length * rowH, position: 'relative' }}>
          {visible.map((task: Task) => (
            <div key={task.id} className="absolute w-full grid grid-cols-4 md:grid-cols-6 items-center px-4 md:px-6 border-b border-white/[0.02] hover:bg-white/[0.03]" 
              style={{ height: rowH, top: state.tasks.indexOf(task) * rowH }}>
              
              <div className="col-span-2 text-sm font-bold truncate pr-4 text-slate-200">{task.title}</div>
              
              <div className="hidden md:block">
                <select aria-label="Status" value={task.stage} onChange={(e) => dispatch({ type: 'CHANGE_STATUS', id: task.id, stage: e.target.value })} 
                  className="bg-transparent text-[10px] font-black uppercase text-indigo-400 outline-none cursor-pointer">
                  {['To Do', 'In Progress', 'In Review', 'Done'].map(s => <option key={s} value={s} className="bg-[#0a0c10]">{s}</option>)}
                </select>
              </div>

              {/* 🚀 Priority Dropdown in List */}
              <div className="hidden md:block">
                <select aria-label="Priority" value={task.priority} onChange={(e) => dispatch({ type: 'CHANGE_PRIORITY', id: task.id, priority: e.target.value as Priority })} 
                  className={`bg-transparent text-[9px] font-black uppercase outline-none cursor-pointer ${task.priority === 'Critical' ? 'text-red-400' : 'text-slate-500'}`}>
                  {['Low', 'Medium', 'High', 'Critical'].map(p => <option key={p} value={p} className="bg-[#0a0c10]">{p}</option>)}
                </select>
              </div>

              <div className="text-right col-span-2 md:col-span-1 text-[11px] font-mono text-slate-600">{task.dueDate}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}