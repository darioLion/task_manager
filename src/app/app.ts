import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { TaskStorageService } from './core/storage/task-storage.service';
import { NavigationComponent, NavigationItemId } from './layout/navigation/navigation.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavigationComponent, TaskListComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly taskStorage = inject(TaskStorageService);

  protected readonly activeNavigationItem = signal<NavigationItemId>('task-manager');
  protected readonly tasks = this.taskStorage.tasks;

  protected selectNavigationItem(itemId: NavigationItemId): void {
    this.activeNavigationItem.set(itemId);
  }
}
