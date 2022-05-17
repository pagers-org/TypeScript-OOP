import { MenuItem } from '@/domain';

export class Menu {
  private menuItems: MenuItem[];

  constructor(menuItems: MenuItem[]) {
    this.menuItems = menuItems;
  }

  public toMenuItemElements(): HTMLElement[] {
    return this.menuItems.map((menuItem: MenuItem) => menuItem.toElement());
  }
}
