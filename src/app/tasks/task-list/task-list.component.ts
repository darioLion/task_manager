import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Task, TaskPriority } from '../models/task.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-task-list',
  styleUrl: './task-list.component.scss',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  readonly deleteTask = output<Task>();
  readonly editTask = output<Task>();
  readonly tasks = input.required<readonly Task[]>();

  protected getPriorityClass(priority: TaskPriority): string {
    return `task-priority--${priority.toLowerCase()}`;
  }
}
