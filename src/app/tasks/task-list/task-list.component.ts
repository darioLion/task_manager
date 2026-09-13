import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Task } from '../models/task.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-task-list',
  styleUrl: './task-list.component.scss',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  readonly editTask = output<Task>();
  readonly tasks = input.required<readonly Task[]>();
}
