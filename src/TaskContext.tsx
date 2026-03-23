import React, { createContext, useContext, useReducer, type ReactNode } from 'react';

export type Stage = 'Backlog' | 'In Progress' | 'Review' | 'Done';
export interface KaamItem { id: string; naam: string; stage: Stage; priority: 'Low' | 'High'; }
interface GlobalState { data: KaamItem[]; }

const initialState: GlobalState = {
  data: [
    { id: '1', naam: 'Fix API Bug', stage: 'Backlog', priority: 'High' },
    { id: '2', naam: 'Design Enterprise UI', stage: 'In Progress', priority: 'Low' },
    { id: '3', naam: 'Security Patch v1', stage: 'Review', priority: 'High' }
  ]
};

function appReducer(state: GlobalState, action: any): GlobalState {
  switch (action.type) {
    case 'MOVE':
      return { ...state, data: state.data.map(item => item.id === action.id ? { ...item, stage: action.to } : item) };
    default: return state;
  }
}

const Store = createContext<any>(null);
export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
};
export const useAppStore = () => useContext(Store);