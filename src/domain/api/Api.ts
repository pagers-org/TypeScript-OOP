import { Beverage, Material, Option, OptionGroup, Recipe } from '@/domain';

export interface Api {
  getBeverages(): Beverage[];

  getMaterials(): Material[];

  getOptionGroups(): OptionGroup[];

  getOptions(): Option[];

  getRecipes(): Recipe[];
}
