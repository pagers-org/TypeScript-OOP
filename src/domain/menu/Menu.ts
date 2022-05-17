import { MenuItem } from '@/domain';

export class Menu {
  private readonly menuItems: MenuItem[];

  constructor(menuItems: MenuItem[]) {
    this.menuItems = menuItems;
  }

  public getMenuItems() {
    return this.menuItems;
  }
}
