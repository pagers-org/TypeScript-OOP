import { MenuItem } from '@/domain';

export type MenuConstructor = {
  menuItems: MenuItem[];
};

export class Menu {
  private readonly menuItems: MenuItem[];

  constructor(constructor: MenuConstructor) {
    this.menuItems = constructor.menuItems;
  }

  public getMenuItems() {
    return this.menuItems;
  }
}
