import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Task } from '../models/task.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-task-list',
  styleUrl: './task-list.component.scss',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  readonly tasks = input.required<readonly Task[]>();
}
