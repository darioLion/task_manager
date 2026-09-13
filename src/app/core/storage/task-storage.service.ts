import { Injectable, signal } from '@angular/core';

import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  Task,
  TaskDraft,
  TaskPriority,
  TaskStatus,
} from '../../tasks/models/task.model';

const TASK_STORAGE_KEY = 'task-manager.tasks';

@Injectable({ providedIn: 'root' })
export class TaskStorageService {
  private readonly tasksState = signal<readonly Task[]>(this.readTasks());

  readonly tasks = this.tasksState.asReadonly();

  createTask(draft: TaskDraft): Task {
    const task: Task = {
      ...this.normalizeDraft(draft),
      id: this.createId(),
    };

    this.setTasks([...this.tasksState(), task]);

    return task;
  }

  deleteTask(taskId: string): void {
    this.setTasks(this.tasksState().filter((task) => task.id !== taskId));
  }

  updateTask(taskId: string, draft: TaskDraft): void {
    const updatedTask = this.normalizeDraft(draft);

    this.setTasks(
      this.tasksState().map((task) =>
        task.id === taskId
          ? {
              ...updatedTask,
              id: task.id,
            }
          : task,
      ),
    );
  }

  private createId(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  private getStorage(): Storage | null {
    try {
      return typeof localStorage === 'undefined' ? null : localStorage;
    } catch {
      return null;
    }
  }

  private isTask(value: unknown): value is Task {
    if (!this.isRecord(value)) {
      return false;
    }

    return (
      typeof value['id'] === 'string' &&
      typeof value['title'] === 'string' &&
      typeof value['dueDate'] === 'string' &&
      this.isTaskStatus(value['status']) &&
      this.isTaskPriority(value['priority']) &&
      (typeof value['description'] === 'undefined' || typeof value['description'] === 'string')
    );
  }

  private isTaskPriority(value: unknown): value is TaskPriority {
    return TASK_PRIORITIES.some((priority) => priority === value);
  }

  private isTaskStatus(value: unknown): value is TaskStatus {
    return TASK_STATUSES.some((status) => status === value);
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  private normalizeDraft(draft: TaskDraft): TaskDraft {
    const description = draft.description?.trim();

    return {
      description: description || undefined,
      dueDate: draft.dueDate,
      priority: draft.priority,
      status: draft.status,
      title: draft.title.trim(),
    };
  }

  private readTasks(): readonly Task[] {
    const storage = this.getStorage();

    if (!storage) {
      return [];
    }

    const storedValue = storage.getItem(TASK_STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    try {
      const parsedValue: unknown = JSON.parse(storedValue);

      return Array.isArray(parsedValue) ? parsedValue.filter((task) => this.isTask(task)) : [];
    } catch {
      return [];
    }
  }

  private setTasks(tasks: readonly Task[]): void {
    this.tasksState.set(tasks);

    const storage = this.getStorage();

    if (storage) {
      storage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
    }
  }
}
