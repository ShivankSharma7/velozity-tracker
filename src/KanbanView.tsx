import { useState } from 'react';
import { useApp } from './TaskContext';
import { formatDueDate } from './utils';
import type { Stage, Task, Priority } from './types';

export default function KanbanView() {
  const { state, dispatch } = useApp();
  const stages: Stage[] = ['To Do', 'In Progress', 'In Review', 'Done'];
  const [dragOver, setDragOver] = useState<string | null>(null);

  const sortedTasks = [...state.tasks].sort((a: Task, b: Task) => a.id.localeCompare(b.id));

  return (
    <div className="flex gap-4 md:gap-6 h-full overflow-x-auto pb-4 custom-scrollbar snap-x">
      {stages.map(stage => (
        <div key={stage} onDragOver={(e) => { e.preventDefault(); setDragOver(stage); }} 
          onDrop={(e) => { dispatch({ type: 'MOVE_TASK', id: e.dataTransfer.getData("taskId"), to: stage }); setDragOver(null); }}
          className={`flex flex-col min-w-[85vw] md:min-w-[320px] w-[85vw] md:w-[320px] h-full snap-center rounded-[1.5rem] p-2 transition-all ${dragOver === stage ? 'bg-indigo-500/5 border border-indigo-500/20' : ''}`}>
          
          <div className="flex justify-between p-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stage}</h3>
            <span className="text-[10px] text-slate-600 font-mono">{state.tasks.filter((t:any) => t.stage === stage).length}</span>
          </div>

          <div className="space-y-3 overflow-y-auto flex-1 pr-1 custom-scrollbar">
            {sortedTasks.filter((t: Task) => t.stage === stage).map((task: Task) => (
              <div key={task.id} draggable onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)} 
                className="glass-panel p-5 rounded-[1.5rem] hover:border-indigo-500/30 transition-all cursor-grab active:cursor-grabbing group">
                
                <div className="flex justify-between items-start mb-3">
                  {/* 🚀 Priority Dropdown */}
                  <select 
                    aria-label="Priority"
                    value={task.priority}
                    onChange={(e) => dispatch({ type: 'CHANGE_PRIORITY', id: task.id, priority: e.target.value as Priority })}
                    className={`text-[8px] font-black px-2 py-0.5 rounded uppercase border outline-none cursor-pointer transition-all ${
                      task.priority === 'Critical' ? 'text-red-400 border-red-500/30 bg-red-500/5' : 
                      task.priority === 'High' ? 'text-orange-400 border-orange-500/30 bg-orange-500/5' :
                      'text-slate-500 border-white/5 bg-transparent'
                    }`}
                  >
                    <option value="Low" className="bg-[#0a0c10]">Low</option>
                    <option value="Medium" className="bg-[#0a0c10]">Medium</option>
                    <option value="High" className="bg-[#0a0c10]">High</option>
                    <option value="Critical" className="bg-[#0a0c10]">Critical</option>
                  </select>

                  <div className="flex -space-x-1.5">
                    {state.activeUsers.filter((u:any) => u.taskId === task.id).map((u:any) => (
                      <div key={u.id} className="w-5 h-5 rounded-full border-2 border-[#030509] flex items-center justify-center text-[7px] font-black text-white" style={{ backgroundColor: u.color }}>{u.name}</div>
                    ))}
                  </div>
                </div>

                <p className="text-sm font-bold text-slate-200 mb-3 leading-snug group-hover:text-white transition-colors">{task.title}</p>
                
                <div className="flex justify-between items-center pt-3 border-t border-white/5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-[9px] font-black text-indigo-400">{task.assignee}</div>
                  <div className="text-right">
                    <span className={`text-[10px] font-bold block ${formatDueDate(task.dueDate).includes('Overdue') ? 'text-red-500' : 'text-slate-600'}`}>{formatDueDate(task.dueDate)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}