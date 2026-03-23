import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import { generateSeedData } from './utils';
import type { Task } from './types';

interface AppState {
  tasks: Task[];
  view: 'kanban' | 'list' | 'timeline';
  activeUsers: any[];
  filters: { search: string };
}

const STORAGE_KEY = 'velozity_core_v5';
const AppContext = createContext<any>(null);

function appReducer(state: AppState, action: any): AppState {
  switch (action.type) {
    case 'ADD_TASK': return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'MOVE_TASK': return { ...state, tasks: state.tasks.map((t: Task) => t.id === action.id ? { ...t, stage: action.to } : t) };
    case 'CHANGE_STATUS': return { ...state, tasks: state.tasks.map((t: Task) => t.id === action.id ? { ...t, stage: action.stage } : t) };
    
    // 🚀 Priority Change Logic
    case 'CHANGE_PRIORITY': return { ...state, tasks: state.tasks.map((t: Task) => t.id === action.id ? { ...t, priority: action.priority } : t) };
    
    case 'SET_VIEW': return { ...state, view: action.payload };
    case 'LOAD_STRESS': return { ...state, tasks: [...state.tasks, ...action.payload] };
    case 'RESET': 
      localStorage.removeItem(STORAGE_KEY);
      return { ...state, tasks: generateSeedData() };
    case 'UPDATE_PRESENCE': return { ...state, activeUsers: action.payload };
    default: return state;
  }
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, {
    tasks: JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || generateSeedData(),
    view: 'kanban',
    activeUsers: [
      { id: 'u1', name: 'JD', color: '#ec4899', taskId: 'TASK-1001' },
      { id: 'u2', name: 'AS', color: '#6366f1', taskId: 'TASK-1005' }
    ],
    filters: { search: '' }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
  }, [state.tasks]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);