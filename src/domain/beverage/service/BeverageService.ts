import { Beverage, Recipe, Api } from '@/domain';
import { getRandomRange } from '@/common';

export class BeverageService {
  private api: Api;
  private beverages: Beverage[];
  private recipes: Recipe[];

  constructor(api: Api) {
    this.api = api;

    this.beverages = this.api.getBeverages();
    this.recipes = this.api.getRecipes();
  }

  public createRandomBeverage(): Beverage {
    return this.getBeverageById(getRandomRange(1, this.beverages.length));
  }

  public getBeverageById(id: number): Beverage {
    const beverage = this.beverages.find(beverage => beverage.getId() === id);

    if (!beverage) {
      throw new Error();
    }

    return beverage;
  }
}
