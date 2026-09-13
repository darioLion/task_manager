import { ChangeDetectionStrategy, Component, HostListener, input, output, signal } from '@angular/core';

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
  readonly icon: string;
  readonly id: NavigationItemId;
  readonly label: string;
}

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { id: 'task-manager', icon: 'bi-list-check', label: 'Task Manager' },
  { id: 'kredite', icon: 'bi-cash-stack', label: 'Kredite' },
  { id: 'documents', icon: 'bi-file-earmark-arrow-up', label: 'Dokumente hochladen' },
  { id: 'profile', icon: 'bi-person-circle', label: 'Persönliche Daten' },
  { id: 'email', icon: 'bi-envelope', label: 'E-Mail ändern' },
  { id: 'password', icon: 'bi-pencil-square', label: 'Kennwort ändern' },
  { id: 'referral', icon: 'bi-person-raised-hand', label: 'Kunden werben' },
  { id: 'logout', icon: 'bi-box-arrow-right', label: 'Abmelden' },
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-navigation',
  styleUrl: './navigation.component.scss',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  private readonly desktopHeaderHeight = 96;

  readonly activeItem = input.required<NavigationItemId>();
  readonly itemSelected = output<NavigationItemId>();

  protected readonly isMenuOpen = signal(false);
  protected readonly navigationItems = NAVIGATION_ITEMS;
  protected readonly sidebarOffset = signal(this.desktopHeaderHeight);

  protected selectNavigationItem(itemId: NavigationItemId): void {
    this.itemSelected.emit(itemId);
    this.isMenuOpen.set(false);
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  @HostListener('window:scroll')
  protected updateSidebarOffset(): void {
    this.sidebarOffset.set(Math.max(0, this.desktopHeaderHeight - window.scrollY));
  }
}
