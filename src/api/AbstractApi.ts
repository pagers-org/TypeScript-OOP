import { Beverage, Material, Option, OptionGroup, Recipe } from '@/domain';
import { BeverageName } from '@/@types';

export abstract class AbstractApi {
  public abstract getBeverages(): Beverage[];

  public abstract getOptionGroups(): OptionGroup[];

  public abstract getOptions(): Option[];

  public abstract getRecipes(): Recipe[];

  public abstract getMaterials(): Material[];

  public findBeverage(id: number): Beverage {
    const beverages = this.getBeverages();
    const beverage = beverages.find(beverage => beverage.getId() === id);

    if (!beverage) {
      throw new Error();
    }

    return beverage.clone();
  }

  public findBeverageName(id: number): BeverageName {
    const beverage = this.findBeverage(id);

    return beverage.getName();
  }

  public getBeveragesCount() {
    const beverages = this.getBeverages();
    return beverages.length;
  }
}
