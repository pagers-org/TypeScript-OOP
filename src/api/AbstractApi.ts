import { Beverage, Material, Menu, MenuItem, Option, OptionGroup, Order, Recipe } from '@/domain';
import { nanoid } from 'nanoid';
import { getRandomRange } from '@/common';
import { BeverageName } from '@/@types';

export abstract class AbstractApi {
  protected abstract getBeverages(): Beverage[];

  protected abstract getOptionGroups(): OptionGroup[];

  protected abstract getOptions(): Option[];

  protected abstract getRecipes(): Recipe[];

  protected abstract getMaterials(): Material[];

  public createMenu(): Menu {
    const menuItems = this.getBeverages().map(item => new MenuItem(item.getId()));

    return new Menu(menuItems);
  }

  public createRandomOrder(beverageId: number): Order {
    const optionGroups = this.createRandomSelectedOptionGroups();

    return new Order(nanoid(), beverageId, optionGroups);
  }

  public createRandomBeverageOrder(): Order {
    return this.createRandomOrder(getRandomRange(1, this.getBeverages().length));
  }

  public createRandomSelectedOptionGroups() {
    return this.getOptionGroups().map(item => {
      const newGroup = item.clone();
      newGroup.resetSelected();
      newGroup.randomSelected();
      return newGroup;
    });
  }

  public findBeverage(id: number): Beverage {
    const beverage = this.getBeverages().find(beverage => beverage.getId() === id);

    if (!beverage) {
      throw new Error();
    }

    return beverage.clone();
  }

  public findBeverageName(id: number): BeverageName {
    return this.findBeverage(id).getName();
  }
}
