import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';

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
  protected readonly formScrollTarget = viewChild<ElementRef<HTMLElement>>('formScrollTarget');
  protected readonly isFormOpen = signal(false);
  protected readonly taskPendingDelete = signal<Task | null>(null);
  protected readonly tasks = this.taskStorage.tasks;

  protected closeDeleteConfirmation(): void {
    this.taskPendingDelete.set(null);
  }

  protected closeForm(): void {
    this.isFormOpen.set(false);
    this.editingTask.set(null);
  }

  protected confirmDeleteTask(): void {
    const task = this.taskPendingDelete();

    if (!task) {
      return;
    }

    this.taskStorage.deleteTask(task.id);
    this.closeDeleteConfirmation();
  }

  protected openCreateForm(): void {
    this.editingTask.set(null);
    this.isFormOpen.set(true);
    this.scrollToForm();
  }

  protected openDeleteConfirmation(task: Task): void {
    this.taskPendingDelete.set(task);
  }

  protected openEditForm(task: Task): void {
    this.editingTask.set(task);
    this.isFormOpen.set(true);
    this.scrollToForm();
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

  private scrollToForm(): void {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.formScrollTarget()?.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });
  }
}
