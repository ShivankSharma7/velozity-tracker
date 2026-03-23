export type Stage = 'To Do' | 'In Progress' | 'In Review' | 'Done';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Task {
  id: string;
  title: string;
  stage: Stage;
  priority: Priority;
  assignee: string;
  startDate: string;
  dueDate: string;
}