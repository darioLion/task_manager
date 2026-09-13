import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

export type NavigationItemId =
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
  readonly icon: string;
  readonly id: NavigationItemId;
  readonly label: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-navigation',
  styleUrl: './navigation.component.scss',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  readonly activeItem = input.required<NavigationItemId>();
  readonly itemSelected = output<NavigationItemId>();

  protected readonly isMenuOpen = signal(false);
  protected readonly navigationItems: readonly NavigationItem[] = [
    { id: 'task-manager', icon: 'bi-list-check', label: 'Task Manager' },
    { disabled: true, id: 'kredite', icon: 'bi-cash-stack', label: 'Kredite' },
    { disabled: true, id: 'documents', icon: 'bi-file-earmark-arrow-up', label: 'Dokumente hochladen' },
    { disabled: true, id: 'profile', icon: 'bi-person-circle', label: 'Persönliche Daten' },
    { disabled: true, id: 'email', icon: 'bi-envelope', label: 'E-Mail ändern' },
    { disabled: true, id: 'password', icon: 'bi-pencil-square', label: 'Kennwort ändern' },
    { disabled: true, id: 'referral', icon: 'bi-person-raised-hand', label: 'Kunden werben' },
    { disabled: true, id: 'logout', icon: 'bi-box-arrow-right', label: 'Abmelden' },
  ];

  protected selectNavigationItem(itemId: NavigationItemId): void {
    this.itemSelected.emit(itemId);
    this.isMenuOpen.set(false);
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }
}
