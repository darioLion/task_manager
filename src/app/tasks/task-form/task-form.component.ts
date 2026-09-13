import { ChangeDetectionStrategy, Component, computed, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  Task,
  TaskDraft,
  TaskPriority,
  TaskStatus,
} from '../models/task.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  selector: 'app-task-form',
  styleUrl: './task-form.component.scss',
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  readonly cancel = output<void>();
  readonly save = output<TaskDraft>();
  readonly task = input<Task | null>(null);

  protected readonly formTitle = computed(() => (this.task() ? 'Edit task' : 'Add task'));
  protected readonly priorities = TASK_PRIORITIES;
  protected readonly statuses = TASK_STATUSES;
  protected readonly submitLabel = computed(() => (this.task() ? 'Save changes' : 'Create task'));

  protected readonly form = new FormGroup({
    description: new FormControl('', { nonNullable: true }),
    dueDate: new FormControl('', { nonNullable: true }),
    priority: new FormControl<TaskPriority>('Medium', { nonNullable: true }),
    status: new FormControl<TaskStatus>('To Do', { nonNullable: true }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor() {
    effect(() => {
      const task = this.task();

      this.form.reset(
        {
          description: task?.description ?? '',
          dueDate: task?.dueDate ?? '',
          priority: task?.priority ?? 'Medium',
          status: task?.status ?? 'To Do',
          title: task?.title ?? '',
        },
        { emitEvent: false },
      );
    });
  }

  protected submitForm(): void {
    const rawValue = this.form.getRawValue();
    const title = rawValue.title.trim();

    if (!title) {
      this.form.controls.title.setErrors({ required: true });
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.save.emit({
      description: rawValue.description,
      dueDate: rawValue.dueDate,
      priority: rawValue.priority,
      status: rawValue.status,
      title,
    });
  }
}
