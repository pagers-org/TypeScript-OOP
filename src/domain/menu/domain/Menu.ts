import { MenuItem } from '@/domain';

export class Menu {
  public menuItems: MenuItem[];

  constructor(menuItems: MenuItem[]) {
    this.menuItems = menuItems;
  }

  getMenuItemElements(): HTMLElement[] {
    return this.menuItems.map((menuItem: MenuItem) => menuItem.toElement());
  }
}
