import { MenuItem } from '@/domain';

export class Menu {
  public menuItems: MenuItem[];

  constructor(menuItems: MenuItem[]) {
    this.menuItems = menuItems;
  }

  toElement(): HTMLElement[] {
    return this.menuItems.map((menuItem: MenuItem) => menuItem.toElement());
  }
}
