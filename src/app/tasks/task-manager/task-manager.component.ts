import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { TaskStorageService } from '../../core/storage/task-storage.service';
import { Task, TaskDraft } from '../models/task.model';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TaskFormComponent, TaskListComponent],
  selector: 'app-task-manager',
  styleUrl: './task-manager.component.scss',
  templateUrl: './task-manager.component.html',
})
export class TaskManagerComponent {
  private readonly taskStorage = inject(TaskStorageService);

  protected readonly editingTask = signal<Task | null>(null);
  protected readonly isFormOpen = signal(false);
  protected readonly tasks = this.taskStorage.tasks;

  protected closeForm(): void {
    this.isFormOpen.set(false);
    this.editingTask.set(null);
  }

  protected openCreateForm(): void {
    this.editingTask.set(null);
    this.isFormOpen.set(true);
  }

  protected openEditForm(task: Task): void {
    this.editingTask.set(task);
    this.isFormOpen.set(true);
  }

  protected saveTask(draft: TaskDraft): void {
    const task = this.editingTask();

    if (task) {
      this.taskStorage.updateTask(task.id, draft);
    } else {
      this.taskStorage.createTask(draft);
    }

    this.closeForm();
  }
}
