import { Beverage, Recipe, Api } from '@/domain';
import { rangeRandom } from '@/common';

export class BeverageService {
  private api: Api;
  private beverages: Beverage[];
  private recipes: Recipe[];

  constructor(api: Api) {
    this.api = api;

    this.beverages = this.api.getBeverages();
    this.recipes = this.api.getRecipes();
  }

  public getRecipesByBeverageId(beverageId: number): Recipe[] {
    return this.recipes.filter(recipe => recipe.beverageId == beverageId);
  }

  public createRandomBeverage(): Beverage {
    return this.getById(rangeRandom(1, this.beverages.length));
  }

  public getById(id: number): Beverage {
    return this.beverages.filter(beverage => beverage?.id === id)[0];
  }
}
