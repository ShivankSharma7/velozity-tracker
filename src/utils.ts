import type { Task, Priority, Stage } from './types';

export const formatDueDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dateStr);
  due.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Due Today';
  if (diffDays < -7) return `${Math.abs(diffDays)} Days Overdue`;
  return dateStr;
};

export const generateSeedData = (): Task[] => {
  const stages: Stage[] = ['To Do', 'In Progress', 'In Review', 'Done'];
  const priorities: Priority[] = ['Low', 'Medium', 'High', 'Critical'];
  const users = ['SS', 'JD', 'RK', 'ML', 'AS', 'NK'];

  return Array.from({ length: 93 }, (_, i) => {
    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + (Math.floor(i / 3) - 10));
    const hasStart = i % 3 !== 0;
    const startDate = new Date(dueDate);
    startDate.setDate(dueDate.getDate() - 4);

    return {
      id: `TASK-${1000 + i}`,
      title: `System Module #${i + 1} Architecture`,
      stage: stages[Math.floor(i / 24) % 4],
      priority: priorities[i % 4],
      assignee: users[i % 6],
      startDate: hasStart ? startDate.toISOString().split('T')[0] : '',
      dueDate: dueDate.toISOString().split('T')[0]
    };
  });
};