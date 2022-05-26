import { Beverage } from '@/domain';

export type MenuItemConstructor = {
  beverage: Beverage;
};

export class MenuItem {
  private readonly beverage: Beverage;

  constructor(constructor: MenuItemConstructor) {
    this.beverage = constructor.beverage;
  }

  public getBeverage() {
    return this.beverage;
  }
}
