import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import {
  NAVIGATION_ITEMS,
  NavigationComponent,
  NavigationItemId,
} from './layout/navigation/navigation.component';
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
  protected readonly navigationTitleById = NAVIGATION_ITEMS.reduce(
    (titles, item) => ({
      ...titles,
      [item.id]: item.label,
    }),
    {} as Record<NavigationItemId, string>,
  );

  protected selectNavigationItem(itemId: NavigationItemId): void {
    this.activeNavigationItem.set(itemId);
  }
}
