export const TASK_STATUSES = ['To Do', 'In Progress', 'Done'] as const;
export const TASK_PRIORITIES = ['Low', 'Medium', 'High'] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export interface Task {
  readonly description?: string;
  readonly dueDate: string;
  readonly id: string;
  readonly priority: TaskPriority;
  readonly status: TaskStatus;
  readonly title: string;
}

export type TaskDraft = Omit<Task, 'id'>;
