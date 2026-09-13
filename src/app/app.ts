import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { NavigationComponent, NavigationItemId } from './layout/navigation/navigation.component';
import { TaskManagerComponent } from './tasks/task-manager/task-manager.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavigationComponent, TaskManagerComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly activeNavigationItem = signal<NavigationItemId>('task-manager');

  protected selectNavigationItem(itemId: NavigationItemId): void {
    this.activeNavigationItem.set(itemId);
  }
}
