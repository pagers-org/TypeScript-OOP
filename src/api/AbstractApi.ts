import { Beverage, Material, Option, OptionGroup, Recipe } from '@/domain';
import { BeverageName } from '@/@types';

export abstract class AbstractApi {
  public abstract getBeverages(): Beverage[];

  public abstract getOptionGroups(): OptionGroup[];

  public abstract getOptions(): Option[];

  public abstract getRecipes(): Recipe[];

  public abstract getMaterials(): Material[];

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
