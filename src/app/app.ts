import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

type NavigationItemId =
  | 'task-manager'
  | 'kredite'
  | 'email'
  | 'password'
  | 'referral'
  | 'documents'
  | 'profile'
  | 'settings'
  | 'logout';

interface NavigationItem {
  readonly disabled?: boolean;
  readonly id: NavigationItemId;
  readonly label: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly activeNavigationItem = signal<NavigationItemId>('task-manager');
  protected readonly isMenuOpen = signal(false);
  protected readonly navigationItems: readonly NavigationItem[] = [
    { id: 'task-manager', label: 'Task Manager' },
    { disabled: true, id: 'kredite', label: 'Kredite' },
    { disabled: true, id: 'documents', label: 'Dokumente hochladen' },
    { disabled: true, id: 'profile', label: 'Persönliche Daten' },
    { disabled: true, id: 'email', label: 'E-Mail ändern' },
    { disabled: true, id: 'password', label: 'Kennwort ändern' },
    { disabled: true, id: 'referral', label: 'Kunden werben' },
    { disabled: true, id: 'logout', label: 'Abmelden' },
  ];

  protected selectNavigationItem(itemId: NavigationItemId): void {
    this.activeNavigationItem.set(itemId);
    this.isMenuOpen.set(false);
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }
}
