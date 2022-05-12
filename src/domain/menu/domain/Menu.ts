import { MenuItem } from '@/domain';

export class Menu {
  public menuItems: MenuItem[];

  constructor(menuItems: MenuItem[]) {
    this.menuItems = menuItems;
  }

  public getMenuItem(beverageId: number) {
    return this.menuItems.filter(menuItem => menuItem.beverageId === beverageId)[0];
  }
}
